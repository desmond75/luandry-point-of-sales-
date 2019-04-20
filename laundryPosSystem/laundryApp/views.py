from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import LoginForm, CustomerInfoForm, TransactionForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from .models import Customer, Order, Item
from django.http import JsonResponse
import time
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Sum
import datetime


activities = {'WashAndPress':'W & P','DryCleaning':'DC', 'PressOnly':'PO'}
services = {'Normal':'Nor','Urgent':'Urg', 'Premium':'Pre'}



context = {'date':'{0:%Y-%m-%d %H:%M:%S}'.format(datetime.datetime.now())}

def index(request):
    return redirect('login')


@login_required
def dashboard(request):
    customer_form = CustomerInfoForm()
    form = TransactionForm(initial={'tax':0,'price':0, 'price_per_item':0})
    print('printing from global dasboard namespace ')
    try:
        #current_id = Hold_Id.objects.all().first()
        if 'id' in request.session:
            id =  request.session['id']
            order = Order.objects.get(pk=id)
            sum_of_price = order.item_set.all().aggregate(Sum('price'))
            #Get sum of all item prices.
            #if sum_of_price :
            context['price'] = sum_of_price['price__sum']
            context['current_order'] = order.item_set.all()
            context['order'] = order
            form = TransactionForm(initial={'tax':0,'price':0, 'price_per_item':0,'contact':order.customer_contact})
            context['form'] = form
            context['customer_form'] = customer_form
            return render(request, 'main/dashboard.html', context)
        else:
            return render(request, 'main/dashboard.html', {'form':form, 'customer_form':customer_form})
    except Exception as e:
        context['form'] = form
        return render(request, 'main/dashboard.html', context)


def update_price(request):
    try:
        id = request.session['id']
        order = Order.objects.get(pk=id)
        sum_of_price = order.item_set.all().aggregate(Sum('price'))
        return JsonResponse({'response':sum_of_price})
    except Exception as e:
        return JsonResponse({'response':'Error'})


@csrf_exempt
def add_item(request):
    try:
        contact = request.POST.get('contact')
        activity = activities[request.POST.get('activity')]
        service_type = services[request.POST.get('service_type')]
        salesman = request.POST.get('salesman')
        price = request.POST.get('price')
        item_name = request.POST.get('item')
        number = request.POST.get('number')
        price_per_item = request.POST.get('price_per_item')
        customer = Customer.objects.get(contact=contact)
        if customer:
            if 'id' in  request.session:
                id = request.session.get('id')
                order = Order.objects.get(pk=id)
                item = Item.objects.create(
                number_of_items=number,
                activity=activity,
                service_type=service_type,
                price=price,
                item=item_name,
                order=order,
                price_per_item=price_per_item
                )
                response = {'item_id':item.pk, 'success':True}
                return JsonResponse(response)
            else:
                order = Order.objects.create(
                customer_contact=contact,
                customer_name= customer.customer_name,
                apartment_name=customer.apartment_name,
                flat_number=customer.flat_number,
                salesman=salesman,
                )
                order = Order.objects.get(pk=order.pk)
                item = Item.objects.create(
                number_of_items=number,
                activity=activity,
                service_type=service_type,
                price=price,
                item=item_name,
                order=order,
                price_per_item=price_per_item
                )
                request.session['id'] = order.pk
                response = {'item_id':item.pk, 'success':True}
                return JsonResponse(response)
    except Exception as e:
        print('Error is '+ str(e))
        response = {'success':False}
        return JsonResponse(response)

def delete_item(request):
    try:
        item_id = request.GET.get('id')
        get_object_or_404(Item, pk=item_id).delete()
        return JsonResponse({'response':'Ok'})
    except Exception as e:
         return JsonResponse(str(e), safe=False)

@csrf_exempt
def add_new_customer(request):
    try:
        customer_name = request.POST.get('customer_name')
        contact = request.POST.get('contact')
        apartment_name = request.POST.get('apartment_name')
        flat_number = request.POST.get('flat_number')
        Customer(
                customer_name=customer_name,
                contact=contact,
                apartment_name=apartment_name,
                flat_number=flat_number
        ).save()
        print('added')
        return JsonResponse('New customer successfully added', safe=False)
    except Exception as e:
        print(e)
        return JsonResponse('A user with that contact already exist', safe=False)


def result(request):
    queryset_list = Order.objects.all().order_by("-date")
    query = request.GET.get("q")
    if query:
        queryset_list = queryset_list.filter(
            Q(flat_number=int(query)) | Q(customer_contact=int(query)))

    paginator = Paginator(queryset_list, 10) # Show 25 contacts per page
    page_request_var = "page"
    page = request.GET.get(page_request_var)
    try:
        queryset = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        queryset = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        queryset = paginator.page(paginator.num_pages)
    context = {
        "orders": queryset,
        'query':query
        }
    return render(request, 'main/results.html',context)

def view_ordered_items(request, order_id):
    try:
        items = Item.objects.filter(order=order_id)
        context['items'] = items
        context['order_id'] = order_id
        context['customer_details'] = Order.objects.get(pk=order_id)
        return render(request, 'main/items.html', context)
    except Exception as e:
        print(str(e))
        return render(request, 'main/404.html')

@csrf_exempt
def finalize_order(request):
    try:
        price = request.POST.get('price')
        id = request.session.get('id')
        order = Order.objects.get(pk=id)
        order.price = price
        order.paid = True
        order.save()
        del request.session['id']
        return JsonResponse('Order has been finalize', safe=False)
    except Exception as e:
        return JsonResponse('No order has been placed', safe=False)

@csrf_exempt
def add_order_as_credit(request):
    try:
        price = request.POST.get('price')
        id = request.session.get('id')
        order = Order.objects.get(pk=id)
        order.price = price
        order.save()
        del request.session['id']
        return JsonResponse('Order has been set as credit', safe=False)
    except (KeyError, Order.DoesNotExist):
        return JsonResponse('There is no order ', safe=False)

def reset(request):
    try:
        id = request.session.get('id')
        print('reset click')
        if id:
            Order.objects.get(pk=id).delete()
            Item.objects.filter(order=id).all().delete()
            del request.session['id']
            return JsonResponse('The current order has been delete', safe=False)
        else:
            return JsonResponse('There was no order', safe=False)
    except Exception as e:
        return JsonResponse('An error occured here ' + str(e), safe=False)


def toggle_pay(request):
    id = request.GET.get('order_id')
    order = Order.objects.get(pk=id)
    if order.paid == True:
        if request.user.is_staff:
            order.paid = False
            order.save()
            return JsonResponse('Order marked as unpayed', safe=True)
        return JsonResponse('Only admins can mark order as unpaid', safe=False)
    else:
        order.paid = True
        order.save()
        return JsonResponse('Order mark as paid', safe=False)
