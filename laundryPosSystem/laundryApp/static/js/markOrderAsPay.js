var buttons = document.getElementsByClassName('paidButton')

for (var i=0;  i<buttons.length; i++){
  buttons[i].addEventListener('click', toggle_pay)
}


function toggle_pay(event){
  var request = new XMLHttpRequest()
  request.open('GET', '/toggle_pay/?order_id='+event.target.id, true)
  request.onreadystatechange = function(){
    if (this.status == 200 && this.readyState == 4){
      //alert(JSON.parse(this.responseText)['d'] === 'mark')
      document.getElementById("order_response").innerHTML = this.responseText
    }
  }
  request.send()
}
