var nowSelectedData;
function getCalendarFor(objDate)  {
   var val;
   var isMSIE= (navigator.appName == "Microsoft Internet Explorer");
   if (isMSIE) {    
   		val = window.showModalDialog("js/calendar2.htm","","dialogwidth=150pt;dialogheight=170pt;status=no;help=no;")
   		if (val  != -1 && val  != null) {
      		objDate.value = val;
   		}
   }else{
   		nowSelectedData = objDate;
   		var width = 300;
   		var height = 300;
		var x = parseInt(screen.width / 2.0) - (width / 2.0);  
    	var y = parseInt(screen.height / 2.0) - (height / 2.0);    
   		var win = window.open("js/calendar2.htm", "mcePopup", "top=" + y + ",left=" + x + ",scrollbars=no,dialog=yes,modal=yes,width=" + width + ",height=" + height + ",resizable=no" ); 
        eval('try { win.resizeTo(width, height); } catch(e) { }'); 
        win.focus();   
   }
}

function showCalendar(){

}