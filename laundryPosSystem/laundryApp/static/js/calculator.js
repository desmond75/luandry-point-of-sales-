
var buttons = document.getElementsByClassName('calNumber')

for (var i=0;  i<buttons.length; i++){
  buttons[i].addEventListener('click', function(event){
    document.getElementById('screen').value += event.target.id
  })
}

function answer(){
  var value = document.getElementById('screen').value
  document.getElementById('screen').value = eval(value)
}

document.getElementById('equal').addEventListener('click', answer)

document.getElementById('AC').addEventListener('click', function(){
  document.getElementById('screen').value = ''
})

function deleteButton(){
  //Get the current value of the number input field and
  //gets its length and and minus one from it to before slicing
  var number = document.getElementById('screen').value
  document.getElementById('screen').value = number.slice(0, number.length - 1)
}

document.getElementById('calculatorDeleteButton').addEventListener('click', deleteButton)

document.getElementById('closeCalculator').addEventListener('click', function(){
  document.getElementById('screen').value = ''
})
