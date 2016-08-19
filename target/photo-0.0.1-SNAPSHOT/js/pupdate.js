function getCalendarFor(objDate)  {
   var val;

   val = window.showModalDialog("js/calendar.htm","","dialogwidth=150pt;dialogheight=170pt;status=no;help=no;")
   if (val  != -1 && val  != null) {
      objDate.value = val;
   }
}

function showCalendar(){

}