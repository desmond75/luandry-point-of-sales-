(function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})
//(jQuery); // end of jQuery name space


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  });

  document.addEventListener('DOMContentLoaded', function() {
    var el = document.querySelectorAll('tabs');
    var instance = M.Tabs.init(el, {});

  });

  document.addEventListener('DOMContentLoaded', function() {
   var elems = document.querySelectorAll('.fixed-action-btn');
   var instances = M.FloatingActionButton.init(elems, {
     direction: 'left'
   });
 });
