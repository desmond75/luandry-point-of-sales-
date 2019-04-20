function addOrderAsCredit(){
  // Sends a request to the server and delete the
  // item with specific item_id recieved from button index.
	var request = new XMLHttpRequest()
	request.open('POST', '/add_order_as_credit/',  true)
	request.onreadystatechange = function(){
		if (this.status == 200 && this.readyState == 4){
      notify("notification",this.responseText, 'yellow')
		}
	}
  request.setRequestHeader("Content-type","application/x-www-form-urlencoded")
  var price = document.getElementById('totalPrice').innerHTML
	request.send('price='+price)
  //Clears the table and leaves it empty except the thead.
  clearTable()
  allPrices = []// Resets allPrices list to an empty array
  document.getElementById('totalPrice').innerHTML = Math.round(calculateTotalPrice())
  close()

}


document.getElementById('add_order_as_credit').addEventListener('click',addOrderAsCredit)
