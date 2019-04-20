from django.urls import path
from . import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('change-password/', auth_views.LoginView.as_view(redirect_authenticated_user=True)),
    path('', views.index, name='index'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('add_item/', views.add_item, name='add_item'),
    path('result/', views.result, name='result'),
    path('add_new_customer/', views.add_new_customer, name='add_new_customer'),
    path('delete_item/', views.delete_item, name='delete_item'),
    path('finalize_order/', views.finalize_order, name='finalize_order'),
    path('add_order_as_credit/', views.add_order_as_credit, name='add_order_as_credit'),
    path('reset/', views.reset, name='reset'),
    path('toggle_pay/', views.toggle_pay, name='toggle_pay'),
    path('<int:order_id>/view_ordered_items', views.view_ordered_items, name='view_ordered_items'),
    path('update_price/', views.update_price, name='update_price')

]
