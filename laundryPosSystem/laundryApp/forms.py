
from django import forms

class LoginForm(forms.Form):
    email = forms.CharField(max_length=50,
                widget=forms.EmailInput(attrs={'placeholder':"Enter your email", 'class':'browser-default'}))
    password = forms.CharField(max_length=50,
                widget=forms.PasswordInput(attrs={'placeholder':"Enter your password",'class':'browser-default'}))


class SearchForm(forms.Form):
    pass


class CustomerInfoForm(forms.Form):

    customer_name = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'placeholder':"Names", 'class':'browser-default'}))
    contact_ = forms.CharField(widget=forms.NumberInput(attrs={'placeholder':"Contact", 'class':'browser-default'}))
    apartment_name = forms.CharField(max_length=50,label="Apartment name (Business name)", widget=forms.TextInput(attrs={'placeholder':"Apartment",'class':"browser-default"}))
    flat_number = forms.CharField(label='Flat number (Business address number)', widget=forms.NumberInput(attrs={'placeholder':"Number",'class':"browser-default"}))


class TransactionForm(forms.Form):
    ACTIVITIES = (('WashAndPress','Wash & Press'), ('DryCleaning','Dry cleaning'), ('PressOnly', 'Press only'))
    SERVICES = (('Normal', 'Normal'), ('Urgent', 'Urgent'), ('Premium', 'Premium'))
    SALESMAN = (('salesman 1', 'salesman1'), ('salesman 2', 'salesman 2'),('salesman 3', 'salesman 3'))
    activity = forms.ChoiceField(choices=ACTIVITIES, widget=forms.Select(attrs={'class':"browser-default"}))
    contact = forms.CharField(widget=forms.NumberInput(attrs={'placeholder':"Contact", 'class':'browser-default'}))
    service_type = forms.ChoiceField(choices=SERVICES,widget=forms.Select(attrs={'class':"browser-default"}))
    price = forms.CharField(widget=forms.HiddenInput())
    salesman = forms.ChoiceField(choices=SALESMAN, widget=forms.Select(attrs={'class':"browser-default"}))
    item = forms.CharField(widget=forms.HiddenInput(),required = False)
    number = forms.CharField(label='Number of items',widget=forms.HiddenInput())
    price_per_item = forms.CharField(widget=forms.HiddenInput())
