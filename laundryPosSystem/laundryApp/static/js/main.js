//Developer Desmond Ade Fon
//EMAIL: adedesmond6@gmail.com

var item = []// Holds the current selected items eg (Shirt, blouse)
var selectedItems = {}
var services = { Normal:1,Urgent:1.5,Premium:2 }
var activities = {WashAndPress:'Wash & Press',DryCleaning:'Dry cleaning',PressOnly:'Press Only'}
var allPrices = [] //keeps track of all prices
var  itemId = []
var items = {
              Shirt:{WashAndPress:4.00, DryCleaning:5.00, PressOnly:2.00},
              Tshirt:{WashAndPress:4.00, DryCleaning:5.00, PressOnly:2.00},
              Blouse:{WashAndPress:4.00, DryCleaning:5.00, PressOnly:2.00},
              DressDayWear:{DryCleaning:10.00, PressOnly:6.00},
              DressEveningWear:{DryCleaning:15.00, PressOnly:10.00},
              TwoPcSuite:{DryCleaning:25.00, PressOnly:10.00},
              ThreePcSuite:{DryCleaning:30.00, PressOnly:15.00},
              CoatSlashJacket:{DryCleaning:15.00, PressOnly:8.00},
              Jeans:{WashAndPress:4.00, DryCleaning:4.00, PressOnly:2.00},
              Trouser:{WashAndPress:4.00, DryCleaning:5.00, PressOnly:2.00},
              Abayya:{WashAndPress:10.00, DryCleaning:10.00, PressOnly:5.00},
              Apron:{WashAndPress:3.00, DryCleaning:3.00, PressOnly:2.00},
              Dishdasha:{WashAndPress:7.00, DryCleaning:7.00, PressOnly:5.00},
              Dupatta:{WashAndPress:3.00, DryCleaning:3.00, PressOnly:2.00},
              Ghatra:{WashAndPress:4.00, DryCleaning:4.00, PressOnly:3.00},
              JoggingBottoms:{WashAndPress:5.00, DryCleaning:5.00, PressOnly:2.00},
              JumperSlashCardigan:{WashAndPress:5.00, DryCleaning:6.00, PressOnly:3.00},
              LeatherJacketCoat:{DryCleaning:35.00},
              Lungi:{WashAndPress:4.00, DryCleaning:5.00, PressOnly:2.00},
              Nightgown:{WashAndPress:6.00, DryCleaning:8.00, PressOnly:4.00},
              Overcoat:{DryCleaning:15.00, PressOnly:10.00},
              Pyjamas:{WashAndPress:4.00, DryCleaning:5.00, PressOnly:2.00},
              SalwarKameez:{WashAndPress:8.00, DryCleaning:10.00},
              Saree:{WashAndPress:8.00, DryCleaning:10.00, PressOnly:6.00},
              Scarf:{WashAndPress:3.00, DryCleaning:4.00, PressOnly:6.00},
              Shawl:{DryCleaning:10.00, PressOnly:2.00},
              Shailah:{WashAndPress:3.00, DryCleaning:4.00, PressOnly:3.00},
              Shorts:{WashAndPress:3.00, DryCleaning:4.00, PressOnly:2.00},
              Skirt:{WashAndPress:5.00, DryCleaning:6.00, PressOnly:2.00},
              Sweater:{DryCleaning:8.00, PressOnly:2.00},
              Swimsuit:{WashAndPress:6.00, PressOnly:3.00},
              Thobe:{WashAndPress:4.00, DryCleaning:6.00},
              Tie:{DryCleaning:3.00, PressOnly:2.00},
              Undergarments:{WashAndPress:3.00, DryCleaning:3.00, PressOnly:2.00},
              Vest:{WashAndPress:3.00, DryCleaning:4.00},
              Waistcoat:{DryCleaning:5.00, PressOnly:2.00},
              HandTowel:{WashAndPress:3.00, DryCleaning:3.00},
              FaceTowel:{WashAndPress:2.00, DryCleaning:2.00},
              BathTowel:{WashAndPress:4.00, DryCleaning:4.00},
              BathRobe:{WashAndPress:5.00, DryCleaning:5.00, PressOnly:2.00},
              BeachTowel:{WashAndPress:5.00, DryCleaning:6.00},
              BathMat:{WashAndPress:3.00, DryCleaning:3.00},
              ComforterSm:{WashAndPress:15.00},
              ComforterLPlus:{WashAndPress:25.00},
              CushionCover:{WashAndPress:4.00, DryCleaning:4.00, PressOnly:2.00},
              SofaThrow:{WashAndPress:10.00, DryCleaning:15.00, PressOnly:4.00},
              SingleBedSheet:{WashAndPress:8.00, DryCleaning:10.00, PressOnly:5.00},
              DoubleBedSheet:{WashAndPress:10.00, DryCleaning:12.00, PressOnly:6.00},
              KingSizeBedSheet:{WashAndPress:12.00, DryCleaning:15.00, PressOnly:6.00},
              TableCloth:{WashAndPress:4.00, DryCleaning:6.00, PressOnly:3.00},
              Napkins:{WashAndPress:2.00, DryCleaning:6.00, PressOnly:1.00},
              BlanketsSm:{WashAndPress:15.00},
              BlanketsLPlus:{WashAndPress:25.00},
              BedRunner:{WashAndPress:5.00, DryCleaning:6.00, PressOnly:4.00},
              BedThrow:{WashAndPress:10.00, DryCleaning:12.00, PressOnly:6.00},
              DuvetCover:{WashAndPress:10.00, DryCleaning:12.00, PressOnly:6.00},
              Pillow:{WashAndPress:10.00},
              PillowCase:{WashAndPress:3.00, DryCleaning:4.00, PressOnly:2.00},
              FlatSheet:{WashAndPress:6.00, DryCleaning:8.00, PressOnly:4.00},
              MattressProtectorSingle:{WashAndPress:10.00},
              MattressProtectorDouble:{WashAndPress:15.00},
              HeavyAndLightCurtains:{}
            }

function notify(id, message, color){
  // Displays message to indicate data was successfully submitted
  //'Information added successfully'
  document.getElementById(id).innerHTML = message
  document.getElementById(id).style.color = color
  document.getElementById(id).style.backgroundColor = '#0097a7'
  document.getElementById(id).style.borderRadius = "5px"
  setTimeout(function(){
    document.getElementById(id).innerHTML =''
  }, 5000)
}

function update_price(){
  // Updates price with sum of all prices gotten from the database
    var request = new XMLHttpRequest()
    request.open('GET', '/update_price/', true)
    request.onreadystatechange = function(){
      if (this.status == 200 && this.readyState == 4){
        var price = JSON.parse(this.responseText)
        if (price['response']['price__sum'] == null){
          document.getElementById('totalPrice').innerHTML = 0
        }else{
          document.getElementById('totalPrice').innerHTML = price['response']['price__sum']
        }
      }
    }
    request.send()
  }

function addPriceIfPriceIsEmpty(){
  var price =  document.getElementById('totalPrice').innerHTML
  if (price == ''){
    update_price()
  }
}
addPriceIfPriceIsEmpty()

function validateForm() {
  //Validates and make sure all inputs are field with data
  var inputFieldIds = ['id_contact']
  var completed = 0
  //loops through every form and check if value is empty.
  for (var i=0; i<inputFieldIds.length; i++){
    var inputValue = document.getElementById(inputFieldIds[i]).value
    if (inputValue !== ''){
      completed ++
    }else{
      alert(inputFieldIds[i].slice(3) + ' cannot be empty')
    }
  }
  return completed === inputFieldIds.length
}


//This code inserts the current selected item
// in the item=[] array for reference in our program.
var itemButton = document.getElementsByClassName('item')
for (var i=0; i<itemButton.length; i++){
  itemButton[i].addEventListener('click', function(event){
    if (item.length > 0){
      notify('notification', item[0]+ "  "+ 'has already been selected', 'yellow')
      // M.toast({html: item[0]+ "  "+ 'has already been selected'})
    }else{
      item.push(event.target.id)
      document.getElementById('id_item').value = item[0]
      notify('notification', ' '+ event.target.id+' has been selected', 'yellow')
      console.log(event.target.id, 'was clicked', 'list', item)
    }
  })
}

var numberButton = document.getElementsByClassName('number')
for (var i=0; i<numberButton.length; i++){
  numberButton[i].addEventListener('click', function(event){
      var number = document.getElementById('id_number').value += event.target.id
      //alert('The number is => ' + document.getElementById('id_number').value)
      notify('notification',document.getElementById('id_number').value, 'yellow')
  })
}

function reset(){
  document.getElementById('id_number').value = ''
  clearTable()
  document.getElementById('totalPrice').innerHTML = 0

  var request = new XMLHttpRequest()
  request.open('GET', '/reset/', true)
  request.onreadystatechange = function(){
    if (this.status == 200 && this.readyState == 4){
      notify('notification','Application reset successfully', 'yellow')
    }
  }
  request.send()
  location.reload(true)
}
document.getElementById('resetButton').addEventListener('click', reset)


function addItem(){
  var number = document.getElementById('id_number').value
  var activity = document.getElementById('id_activity').value
  var serviceType = document.getElementById('id_service_type').value
  //var discount = document.getElementById('id_discount').value
  if (number === ''){
    notify('notification', 'Select number of items', 'yellow')
  }
  if (calculate(parseInt(number), activity, serviceType)){
      var price = calculate(number, activity, serviceType)
      document.getElementById('id_price').value = price// Sets price field which is a HiddenInput
      submitItemData(item[0], number, serviceType, activity, price)
      document.getElementById('id_number').value = '' //Removes HiddenInput number
      setTimeout(update_price , 50)
    }
  }

document.getElementById('addBtn').addEventListener('click', addItem)



function calculate(number, activity, serviceType){
  if (item.length < 1){
    var message = 'Nothing has been selected'
    notify('notification',message, 'red')
    return null
  }else if(items[item[0]][activity] === undefined){
    var message = item[0] +' can\'t be '+ activity + ' '+  'Please change activity and try again'
    notify('notification',message, 'yellow')
    return null
  } else{
    var _item = item[0]
    var price = items[_item][activity] * parseInt(number) * services[serviceType] //- parseInt(discount)
    return price
  }
}

function creatParagraph(text, className){
  var p = document.createElement('h6')
  p.textContent = text
  //p.className = className
  return p
}


function createDeleteButton(id){
  var b = document.createElement('button')
  b.textContent = 'X'
  b.className = 'quantity waves-effect blue-grey lighten-1 waves-light btn'
  b.id = id
  return b
}

function addTableRow(itemName, number, serviceType, activity,price){
  //selectedItems[itemName] = itemName
  // Adding selected values to selectedItems objects
  var table = document.getElementById('tableBody')//
  var row = table.insertRow(table.rows.length)
  row.id = 'row'+itemId[0]
  var singleItemPrice = items[itemName][activity] * services[serviceType]
  document.getElementById('id_price_per_item').value = singleItemPrice


  row.insertCell(0).appendChild(creatParagraph(itemName))//innerHTML = '<h6>'+itemName+'</h6>'
  row.insertCell(1).appendChild(createInput(parseInt(number), itemName))
  row.insertCell(2).innerHTML = '<h6>'+serviceType+'</h6>'
  row.insertCell(3).innerHTML = '<h6>'+activities[activity] +'</h6>'
  row.insertCell(4).innerHTML = '<h6>'+singleItemPrice+'</h6>'
  row.insertCell(5).innerHTML = '<h6>'+price+'</h6>'//appendChild(creatParagraph(price, itemName))//
  row.insertCell(6).appendChild(createDeleteButton(itemId[0]))
  allPrices.push(price) //Adds the current calculated price of selected items.
  item = []
  itemId = []
  return row
}

function refresh(){
  location.reload(true)
}
document.getElementById('refresh').addEventListener('click', refresh)

function submitItemData(itemName, number, serviceType, activity,price_) {
  if (validateForm()){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText)
        if (response['success'] === true){
          //Create table of items if success if is true hence indicating that a user
          //with the submitted contact exist else no table will be created
          itemId.push(response['item_id'])
          addTableRow(itemName, number, serviceType, activity, price_)
          //addReceiptTableRow(itemName, number, serviceType, activity,price_)//Add items to receipt table
        }else{
          notify("notification",'Customer is not registered, register customer to continue', 'yellow')
        }
      }
    };
    xhttp.open("POST", "/add_item/", true);
    xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded")

    //Gets and sets the price_per_item input value which is a HiddenInput field
    var singleItemPrice = items[itemName][activity] * services[serviceType]
    document.getElementById('id_price_per_item').value = singleItemPrice

    var contact = document.getElementById('id_contact').value
    var activity = document.getElementById('id_activity').value
    var service_type = document.getElementById('id_service_type').value
    //var discount = document.getElementById('id_discount').value
    var salesman = document.getElementById('id_salesman').value
    var number  = document.getElementById('id_number').value
    var price = document.getElementById('id_price').value
    var item = document.getElementById('id_item').value
    var price_per_item = document.getElementById('id_price_per_item').value
    var data = 'contact=' + contact + '&activity=' + activity + '&service_type=' + service_type +
              '&salesman=' + salesman + '&number='+ number + '&price='+ price + '&item='+ item + '&price_per_item='+ price_per_item
    xhttp.send(data)
    document.getElementById('id_price').value = 0 //Sets price back to 0.
  }else{
    console.log('Some fields were empty')
  }
}

function calculateDiscount(discountPercentage, price){
  //Calculates the discount of any entered price.
  var discount  = (parseInt(discountPercentage) / 100) * price
  var finalPrice = price - discount
  return finalPrice
}

function discountCalc(){
  var discount = document.getElementById('discountId').value
  var price =   document.getElementById('totalPrice').innerHTML
  var calculatedPriceAndDiscount = calculateDiscount(parseInt(discount), price)
  document.getElementById('totalPrice').innerHTML = Math.round(calculatedPriceAndDiscount)
  notify('notification',discount + '% discount applied','yellow')
  document.getElementById('discountId').value = 0
}

document.getElementById('discountBtn').addEventListener('click', discountCalc)


document.getElementById('revertButton').addEventListener('click', function(){
  //This function resets total price to whatever amount it was, before discount was appllied.
  location.reload(true)
})


function calculateVAT(){
  var price = document.getElementById('totalPrice').innerHTML
  var result = (5/100) * parseInt(price)
  document.getElementById('totalPrice').innerHTML =  result + parseInt(price)
}
document.getElementById('vatButton').addEventListener('click', calculateVAT)

//
function createInput(value, id){
  //Creates an input and sets default value to
  //the quantity of the item added which can
  //then be increase or decrease.
  var input = document.createElement('input')
  input.setAttribute('type', 'number')
  input.setAttribute('class', 'browser-default')
  input.setAttribute('value', value)
  input.setAttribute('disabled', true)

  input.style.width = '50px'
  input.id = id+'11'
  //Adding change event to quantity input by delaying for 1 second
  setTimeout(deleteTableRow, 1000)
  return input
}

function deleteTableRow(){
  var inputs = document.getElementsByClassName('quantity')
  for (var i=0; i<inputs.length; i++){
    inputs[i].addEventListener('click', function(event){
      var row =  document.getElementById('row'+this.id)
      allPrices.splice(row.rowIndex-1, 1);//Remove price from price allPrices by using rowIndex
      deleteItem(this.id)
      row.parentNode.removeChild(row);
      })
  }
}

var inputs = document.getElementsByClassName('cancel')
for (var i=0; i<inputs.length; i++){
  inputs[i].addEventListener('click', function(event){
    //document.getElementById('itemTable').removeChild(this.parentNode.parentNode.id)
    var row =  document.getElementById('row'+this.id)
    //alert(row)
    allPrices.splice(row.rowIndex-1, 1);//Remove price from price allPrices by using rowIndex
    deleteItem(this.id)
    row.parentNode.removeChild(row);
    document.getElementById('totalPrice').innerHTML = 0
    })
}

function deleteItem(item_id){
  // Sends a request to the server and delete the
  // item with specific item_id recieved from button index.
  var request = new XMLHttpRequest()
  request.open('GET', '/delete_item/?id='+item_id, true)
  request.onreadystatechange = function(){
    if (this.status == 200 && this.readyState == 4){
       update_price()
    }
  }
  request.send()
}

function clear(){
  // Sets item to an emapty array.
  if (item.length < 1){
    var message = 'No item was selected'
    notify('notification',message, 'yellow')
  }else{
    var message = item[0] + ' ' + 'has been removed.'
    notify('notification',message, 'yellow')
    item = []
  }
}
document.getElementById('clear').addEventListener('click', clear)

document.getElementById('cashButton').addEventListener('click', function(){
  var price = document.getElementById('totalPrice').innerHTML
  document.getElementById('subtotal').innerHTML = price
})

var events = ['change', 'keyup', 'keydown']
events.forEach(function(event){
  //Subscribing the tender input field to multiple events
  document.getElementById('tender').addEventListener(event, function(){
    if (document.getElementById('tender').value == ''){
      document.getElementById('change').innerHTML = ''
    }
    var subtotal = document.getElementById('subtotal').innerHTML
    if (parseInt(subtotal) && parseInt(this.value)){
      document.getElementById('change').innerHTML = (parseInt(this.value)-parseInt(subtotal)) + ' '+ 'AED'
    }
  })
})

function close(){
  //Function is called by the close button on finalize
  //order  modal which resets the tender and change values
  //to their defaults.
    document.getElementById('tender').value = 0
    document.getElementById('change').innerHTML = ''

}
document.getElementById('closeButton').addEventListener('click', close )

function finalizeOrder(){
  // Sends a request to the server and mark the
  // order as paid and close.
  var request = new XMLHttpRequest()
  request.open('POST', '/finalize_order/',  true)
  request.onreadystatechange = function(){
    if (this.status == 200 && this.readyState == 4){
      notify("completed",this.responseText, 'yellow')
    }
  }
  request.setRequestHeader("Content-type","application/x-www-form-urlencoded")
  var price = document.getElementById('subtotal').innerHTML
  request.send('price='+price)
  document.getElementById('subtotal').innerHTML = 0
  //Clears the table and leaves it empty except the thead.
  clearTable()
  allPrices = []// Resets allPrices list to an empty array
  close()

}

document.getElementById('finalizeOrderButton').addEventListener('click', finalizeOrder)

function clearTable(){
  // This will remove all children within tbody which in your case are <tr> elements
  // https://stackoverflow.com/questions/48468672/delete-all-rows-in-an-html-table-except-for-header-with-js
  var body = document.getElementById('tableBody')//querySelector('tbody');
  while (body.firstChild) {
  body.removeChild(body.firstChild);
}
}

function deleteNumber(){
  //Get the current value of the number input field and
  //gets its length and and minus one from it to before slicing
  var number = document.getElementById('id_number').value
  document.getElementById('id_number').value = number.slice(0, number.length - 1)
  notify('notification',document.getElementById('id_number').value, 'yellow')
}
document.getElementById('deleteNumberButton').addEventListener('click', deleteNumber)
