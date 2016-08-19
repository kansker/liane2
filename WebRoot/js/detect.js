function detectBrowser()//判斷是否用IE瀏覽器
 { 
  var sAgent = navigator.userAgent.toLowerCase();
  this.isIE = (sAgent.indexOf('msie')!=-1); //IE6.0-7
  if(this.isIE){
  	this.isIE = (sAgent.indexOf('msie 6')!=-1);
  }
 }
 var oBrowser = new detectBrowser();     