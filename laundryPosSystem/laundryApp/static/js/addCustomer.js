function notify(id, message, color){
  // Displays message to indicate data was successfully submitted
  //'Information added successfully'
  document.getElementById(id).innerHTML = message
  document.getElementById(id).style.color = color
  document.getElementById(id).style.backgroundColor = '#0097a7'
  document.getElementById(id).style.borderRadius = "5px"
  setTimeout(function(){
    document.getElementById(id).innerHTML =''
  }, 900000)
}

function validateCustomerForm() {
  //Validates and make sure all inputs are field with data
  var inputFieldIds = ['id_contact_', 'id_customer_name', 'id_apartment_name', 'id_flat_number']
  var completed = 0
  //loops through every form and check if value is empty.
  for (var i=0; i<inputFieldIds.length; i++){
    var inputValue = document.getElementById(inputFieldIds[i]).value
    if (inputValue !== ''){
      completed ++
    }else{
      //alert(inputFieldIds[i].slice(3) + ' cannot be empty')
      ''
    }
  }
  return completed === inputFieldIds.length
}

function addCustomer() {
  if (validateCustomerForm()){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        notify("nn",this.responseText, 'yellow')
      }
    };
    xhttp.open("POST", "/add_new_customer/", true);
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    var customer_name = document.getElementById('id_customer_name').value
    var contact = document.getElementById('id_contact_').value
    var apartment_name = document.getElementById('id_apartment_name').value
    var flat_number = document.getElementById('id_flat_number').value
    var data = 'customer_name=' + customer_name + '&contact=' + contact +
               '&apartment_name=' + apartment_name + '&flat_number=' + flat_number
    xhttp.send(data)
    document.getElementById('id_contact').value = contact
  }else{
    notify("error",'All fields are required', 'yellow')

  }

}

document.getElementById('addNewCustomer').addEventListener('click', addCustomer)
