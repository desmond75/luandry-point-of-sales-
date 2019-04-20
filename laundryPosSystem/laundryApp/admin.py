from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Order, Customer, Item
admin.site.register(User, UserAdmin)
# Register your models here.


class ItemAdmin(admin.ModelAdmin):
    list_display = ('item', 'activity','service_type', 'number_of_items', 'price', 'date', 'order')
    list_filter = ('date',('order', admin.RelatedOnlyFieldListFilter))

    #list_display_links = ('item', 'price', 'activity')

class OrderAdmin(admin.ModelAdmin):
    list_display = ('customer_name','customer_contact','apartment_name', 'flat_number', 'salesman','price', 'paid','invoice_number', 'date')
    list_filter = ('paid', 'date', 'salesman')
    list_display_links = ('customer_name','customer_contact','date' )
    search_fields = ['customer_contact','customer_name','apartment_name', 'flat_number']


class CustomerAdmin(admin.ModelAdmin):
    list_display = ('customer_name','contact', 'apartment_name','flat_number','date')
    search_fields = ['contact','customer_name','apartment_name', 'flat_number']




admin.site.register(Order,OrderAdmin)
admin.site.register(Customer,CustomerAdmin)
admin.site.register(Item, ItemAdmin)


admin.site.site_header = 'Wonderwash admin'
admin.site.site_title = 'Wonderwash'
