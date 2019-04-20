

$("#demo").barcode(
      "1234567890128",
      "ean13",
);
function printReceipt(){

  var pageBody = document.getElementById('dashboardBody').innerHTML
  var receipt = document.getElementById('printingReceipt').innerHTML
  document.body.innerHTML = receipt
  window.print()
  document.body.innerHTML = ''
  location.reload(true)
}

document.getElementById('printFinalize').addEventListener('click', printReceipt)
document.getElementById('print').addEventListener('click', printReceipt)
