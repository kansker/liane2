//Ajax功能;
function getAjaxRandom(){
	var vNum;
	vNum = Math.random();
	vNum = Math.round(vNum*1000000);
	return vNum;
}
function loadAjaxElement(e,u,p,f,l){
    if(arguments.length < 3){
        return ;
    }
    var o = $(e);
    o.innerHTML = l;
    if(typeof p != 'string'){
        p = $H(p).toQueryString();
    }
    p = p + '&rtime='+getAjaxRandom();    
    new Ajax.Updater( {success: e},u,{method: 'get', parameters: p, onFailure: f});
}
function loadAjaxData(u,p,s,f){
    if(arguments.length < 3){
        return ;
    }
    if(typeof p != 'string'){
        p = $H(p).toQueryString();
    }
    p = p + '&rtime='+getAjaxRandom();    
    new Ajax.Request( u,{method: 'get', parameters: p, onSuccess:s,onFailure: f});
}
function sendAjaxElement(e,u,p,f,l){
    if(arguments.length < 3){
        return ;
    }
    var o = $(e);
    o.innerHTML = l;
    if(typeof p != 'string'){
        p = $H(p).toQueryString();
    }
    p = p + '&rtime='+getAjaxRandom();    
    new Ajax.Updater( {success: e}, u, {method: 'post', parameters: p, onFailure: f});
}
function sendAjaxData(u,p,s,f){
    if(arguments.length < 3){
    return ;
    }
    if(typeof p != 'string'){
        p = $H(p).toQueryString();
    }
    p = p + '&rtime='+getAjaxRandom();
    new Ajax.Request( u, {method: 'post', parameters: p, onSuccess:s,onFailure: f});
}
function parseXML(s){
    try{
        var domParser = new DOMParser();
        var o = domParser.parseFromString(s, 'application/xml');
        return o.documentElement;
    }catch(e){
        try{
            var o = getIEXmlAX();
            o.loadXML(s);
            return o.documentElement;
        }catch(e){
            return null;
        }
    }
}
function importXML(u,s,f){
    new Ajax.Request( u, {method: 'get', parameters: null, onSuccess:function(v){s(v.responseXML.documentElement);},onFailure: f});
}
function getIEXmlAX(){
    var i,activeXarr;
    activeXarr = new Array(
                                "MSXML4.DOMDocument",
                                "MSXML3.DOMDocument",
                                "MSXML2.DOMDocument",
                                "MSXML.DOMDocument",
                                "Microsoft.XmlDom"
    );     for(i=0; i<activeXarr.length; i++){
        try {
            var o = new ActiveXObject(activeXarr[i]);
            return o;
        } catch(objException){}
    }
    return false;
}
function getTextNodeValue(d,n,e){
    if(typeof e == 'undefined'){
        e = false;
    }
    var a = d.getElementsByTagName(n);
    if(a==null){
        return null;
    }
    if(a.length==1){
        return (e)?unescape(a[0].firstChild.nodeValue):a[0].firstChild.nodeValue;
    }else{
        var ra = new Array();
        for(var i=0;i<a.length;i++){
            ra[i] = (e)?unescape(a[i].firstChild.nodeValue):a[i].firstChild.nodeValue;
        }
        return ra;
    }
}
function getParams(){
    var o = new Object()
    var a=document.location.search.substr(1).split('&');
    for (i=0;i<a.length;i++){
        try{
            var aa=a[i].split('=');
            var n=aa[0];
            var v=aa[1];
            o[n]=trim(v);
        }catch(e){
        }
    }
    return o;
}
function showLoading(c,b,a){
    switch(arguments.length){
        case 2:
            a = 0.9;
        case 1:
            b = "#000000";
        case 0:
            c = "#FFFFFF";
        break;
    }
    var d = document;
    if($("loading_div") == null){
    var s = '<div id="loading_div" style="position:absolute;left:0px;top:0px;width:100%;height:100%; z-index:auto;text-align: center;font-family: Courier New, Courier, mono;font-size: 12px;color:'+c+';padding-top: 30%;background-color:'+b+';"><h1>正在加載頁面...</h1></div>';
    	d.write(s);
    }
    var o = $("loading_div");
    if(o.style.MozOpacity){
        o.style.MozOpacity = a;
    }else if(o.style.opacity){
        o.style.opacity = a;
    }else{
        a = a * 100;
        o.style.filter='Alpha(Opacity='+a+')';
    }
}
function hideLoading(){
    $("loading_div").style.display = 'none';
}

function ajax2select(id,oj,from,key,value,comment)
{
	var res  =  oj.responseXML;
  	var fromTag = res.getElementsByTagName(from);
    var select=document.getElementById(id);
    for(m=select.options.length-1;m>=0;m--){
      select.options[m]=null;
    }
  	for(var i = 0 ; i < fromTag.length ; i++ ){
    	var keyTag = fromTag[i].getElementsByTagName(key);
    	var valueTag = fromTag[i].getElementsByTagName(value);
    	var commentTag = null;
    	if(comment!=null){
    		commentTag = fromTag[i].getElementsByTagName(comment);
    	}
    	var keyContent = "";
    	var valueContent = "";
    	var commentContent = "";
    	if(keyTag[0].firstChild.nodeValue!=null){
      		keyContent = keyTag[0].firstChild.nodeValue;
    	}
    	if(valueTag[0].firstChild!=null){
      		valueContent = valueTag[0].firstChild.nodeValue;
    	}
    	if(commentTag!=null && commentTag[0] !=null && commentTag[0].firstChild!=null){
      		commentContent = commentTag[0].firstChild.nodeValue;
    	}
    	if(commentContent==""){
    		select.options[i]=new Option(valueContent,keyContent);
    	}else{    	
    		select.options[i]=new Option(valueContent+"   ("+commentContent+")",keyContent);
    	}
  	}
}
function getColumnValue(column,name){
	var v = "";
	try{
		var vTag = column.getElementsByTagName(name);
		if(vTag[0].firstChild!=null){
			v = vTag[0].firstChild.nodeValue;
		}	
	}catch (e) {
		
	}
   return v;
}	
function getColumnIntValue(column,name){
	var v = 0;
	try{
		v = getColumnValue(column,name)*1;
	}catch (e) {
		v = 0;
	}
   return v;
}
