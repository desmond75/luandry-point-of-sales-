from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime

YEAR = datetime.datetime.today().year

class User(AbstractUser):
    pass

class Customer(models.Model):
    customer_name = models.CharField(db_index=True, max_length=100)
    contact = models.IntegerField(unique=True)
    apartment_name = models.CharField(db_index=True, max_length=20)
    flat_number = models.IntegerField()
    #tax = models.IntegerField()
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.customer_name)


class Order(models.Model):
    customer_contact = models.IntegerField()
    paid = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now=True)
    salesman = models.CharField(db_index=True, max_length=20)
    discount = models.IntegerField(default=0)
    price =  models.IntegerField(default=0)
    customer_name = models.CharField(db_index=True, max_length=20)
    apartment_name = models.CharField(db_index=True, max_length=20)
    flat_number = models.IntegerField()
    invoice_number = models.CharField(max_length=20)
    
    def save(self, **kwargs):
        created = not self.pk
        super().save(**kwargs)
        if created:
            self.invoice_number = f'{YEAR}/INV/000{self.pk}'
            self.save()

    def __str__(self):
        return str(self.customer_name)

class Item(models.Model):
    #salesman = models.CharField(db_index=True, max_length=20)
    activity = models.CharField(max_length=20)
    service_type = models.CharField(max_length=20)
    price = models.IntegerField(blank=True, null=True)
    date = models.DateField(auto_now=True)
    number_of_items = models.IntegerField()
    item = models.CharField(max_length=20,blank=True, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    price_per_item = models.IntegerField(blank=True, null=True)
    def __str__(self):
        return str(self.item)
