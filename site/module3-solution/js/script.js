var isShow=false;
$(document).ready(function(){
  $('#myNavbar').on('show.bs.collapse', function () {
    document.getElementById("main-menu").style.paddingTop="180px";
    isShow=true;
    // alert(document.getElementById("main-menu").style.paddingTop);
  });
  $('#myNavbar').on('hidden.bs.collapse', function () {
    document.getElementById("main-menu").style.paddingTop="40px";
    isShow=false;
  });
})

$( window ).resize(function() {
  if ($( window ).width() > 768) {
    document.getElementById("main-menu").style.paddingTop="40px";
  } else if (isShow==true) {
    document.getElementById("main-menu").style.paddingTop="180px";
  }
});
