/* Javascript Contents Starts */


/* Disabling Right Click and Ctrl+U Starts */

/*var isCtrl = false;
document.onkeyup=function(e)
{
    if(e.which == 17)
    isCtrl=false;
}
document.onkeydown=function(e)
{
    if(e.which == 17)
    isCtrl=true;
    if((e.which == 85) || (e.which == 67) && (isCtrl == true))
    {
        return false;
    }
}
var isNS = (navigator.appName == "Netscape") ? 1 : 0;
if(navigator.appName == "Netscape") document.captureEvents(Event.MOUSEDOWN||Event.MOUSEUP);
function mischandler(){
    return false;
}
function mousehandler(e){
    var myevent = (isNS) ? e : event;
    var eventbutton = (isNS) ? myevent.which : myevent.button;
    if((eventbutton==2)||(eventbutton==3)) return false;
}
document.oncontextmenu = mischandler;
document.onmousedown = mousehandler;
document.onmouseup = mousehandler;*/

/* Disabling Right Click and Ctrl+U Ends */


/* Javascript Contents Ends */








/* Jquery Contents Starts */

$(document).ready(function(){
	
$("#speed_dial_parent").click(function() {
$("#speed_dial_child_01").fadeIn(1000);
});	
$("#speed_dial_parent").click(function() {
$("#speed_dial_child_01").fadeOut(2000);
});

$("#speed_dial_parent").click(function() {
$("#speed_dial_child_02").fadeIn(1000);
});	
$("#speed_dial_parent").click(function() {
$("#speed_dial_child_02").fadeOut(2000);
});

$(".navbar-nav li a").click(function(event) {
$(".navbar-collapse").collapse('hide');
});

$(".obj,.logo").click(function(){
$(".exp").removeClass("active");
$(".edu").removeClass("active");
$(".skill").removeClass("active");
$(".port").removeClass("active");
$(".personal").removeClass("active");
$(".contact").removeClass("active");
$(".obj").addClass("active");
});

$(".exp").click(function(){
$(".obj").removeClass("active");
$(".edu").removeClass("active");
$(".skill").removeClass("active");
$(".port").removeClass("active");
$(".personal").removeClass("active");
$(".contact").removeClass("active");
$(".exp").addClass("active");
});

$(".edu").click(function(){
$(".obj").removeClass("active");
$(".exp").removeClass("active");
$(".skill").removeClass("active");
$(".port").removeClass("active");
$(".personal").removeClass("active");
$(".contact").removeClass("active");
$(".edu").addClass("active");
});

$(".skill").click(function(){
$(".obj").removeClass("active");
$(".exp").removeClass("active");
$(".edu").removeClass("active");
$(".port").removeClass("active");
$(".personal").removeClass("active");
$(".contact").removeClass("active");
$(".skill").addClass("active");
});

$(".port").click(function(){
$(".obj").removeClass("active");
$(".exp").removeClass("active");
$(".edu").removeClass("active");
$(".skill").removeClass("active");
$(".personal").removeClass("active");
$(".contact").removeClass("active");
$(".port").addClass("active");
});

$(".personal").click(function(){
$(".obj").removeClass("active");
$(".exp").removeClass("active");
$(".edu").removeClass("active");
$(".skill").removeClass("active");
$(".port").removeClass("active");
$(".contact").removeClass("active");
$(".personal").addClass("active");
});

$(".contact").click(function(){
$(".obj").removeClass("active");
$(".exp").removeClass("active");
$(".edu").removeClass("active");
$(".skill").removeClass("active");
$(".port").removeClass("active");
$(".personal").removeClass("active");
$(".contact").addClass("active");
});

});


/* Jquery Contents Ends */