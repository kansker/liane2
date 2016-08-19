if (top != self && self.location.pathname.indexOf("pro") != 1 && self.location.pathname.indexOf("osc4p") != 1) top.location=self.location;	// see #16999
var currURL = location.pathname;
function opt(str) {document.write(str);}
function write2ColumnDefinition() {
opt('<tr><td width=15 height=1 nowrap></td><td width=15 nowrap></td><td width=200 nowrap></td><td width=260 nowrap></td><td width=15 nowrap></td><td width=20 nowrap></td><td width=170 nowrap></td><td width=5 nowrap></td></tr>\n');
}
function closeWin(winRef) {
if (winRef)
if (!winRef.closed) winRef.close();
return null;
}
function swapImg(imgName, imgSrc) {
if (typeof document[imgName] != 'undefined') document[imgName].src = imgSrc;
}
var agt = navigator.userAgent.toLowerCase();
is_major = parseInt(navigator.appVersion);
is_minor = parseFloat(navigator.appVersion);
is_ie  = ((agt.indexOf("msie") != -1) && (agt.lastIndexOf(")") == agt.length-1) || ((typeof window.opera != "undefined") && window.opera ));
is_ie5  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")!=-1) );
is_ie5up = (is_ie && (is_major == 4) && (agt.indexOf("msie 4.0")==-1) );
is_nav = (navigator.appName.indexOf("Netscape") != -1);
is_win = ( (agt.indexOf("win")!=-1) || (agt.indexOf("16bit")!=-1) );
is_mac = (agt.indexOf("mac")!=-1);
is_nav4 = (is_nav && is_major == 4);
is_nav6 = (is_nav && (is_major > 4));
is_safari = agt.indexOf("safari") != -1;
function handleResize() { document.location.reload(false); }
if (is_nav4 && (is_minor > 4.08 )) {
window.captureEvents(Event.RESIZE);
window.onResize = handleResize;
}
OliveButton.width = OliveButton.height = 15;
OliveButton.counter = 0;
OliveButton.im = new Array(16);
OliveButton.im[0] = uiBase + "/cross1_B.gif";
OliveButton.im[1] = uiBase + "/cross1_R.gif";
OliveButton.im[2] = uiBase + "/arrow1_B.gif";
OliveButton.im[3] = uiBase + "/arrow1_R.gif";
OliveButton.im[4] = uiBase + "/arrow2_B.gif";
OliveButton.im[5] = uiBase + "/arrow2_R.gif";
OliveButton.im[6] = uiBase + "/arrow3_B.gif";
OliveButton.im[7] = uiBase + "/arrow3_R.gif";
OliveButton.im[8] = uiBase + "/arrow4_B.gif";
OliveButton.im[9] = uiBase + "/arrow4_R.gif";
OliveButton.im[10] = uiBase + "/arrow5_B.gif";
OliveButton.im[11] = uiBase + "/arrow5_R.gif";
OliveButton.im[12] = uiBase + "/arrow6_B.gif";
OliveButton.im[13] = uiBase + "/arrow6_R.gif";
OliveButton.im[14] = uiBase + "/check6_B.gif";
OliveButton.im[15] = uiBase + "/check6_R.gif";
OliveButton.noneSelectedMsg = "Please make a selection first.";
var obWid = false;
// var obWid = true;
function OliveButton(btn, label, onclick, mode, vGap) {
if (!mode) mode = "2col";
if (!vGap) vGap = 9;
if (!OliveButton.prototype.over) {
OliveButton.prototype.over = _OliveButton_over;
OliveButton.prototype.out = _OliveButton_out;
OliveButton.prototype.click = _OliveButton_click;
}
this.btn = btn;
this.status = label;
this.checked = 0;
this.preload = new Image(15,15);
this.preload.src = OliveButton.im[(2*btn)+1];
this.onclick = onclick;
if (typeof this.onclick == "string") this.onclick = new Function("state", this.onclick);
var imgOliveName = ("imgOlive" + OliveButton.counter++);
var linkHTML  = '<a href="#" name="&lid='+ label +'" onMouseOver="if (document.' + imgOliveName + ') return document.' + imgOliveName + '._ob.over();" onMouseOut="if (document.' + imgOliveName + ') return document.' + imgOliveName + '._ob.out();" onClick="return document.' + imgOliveName + '._ob.click();">';
var linkImgHTML  = '<a href="#" class="orgOliveImg" name="&lid='+ label +'" onMouseOver="if (document.' + imgOliveName + ') return document.' + imgOliveName + '._ob.over();" onMouseOut="if (document.' + imgOliveName + ') return document.' + imgOliveName + '._ob.out();" onClick="return document.' + imgOliveName + '._ob.click();">';
var imageHTML = '<img name="'+ imgOliveName +'" src="' + OliveButton.im[(2*btn)] +'" width=' + OliveButton.width + ' height=' + OliveButton.height + ' alt="" border=0 align=top>'
var tab1 = '<tr><td valign=top width=15 nowrap>';
var tab2 = '</td><td' + ((obWid) ? " width=155 nowrap" : "") + '>';
var tab3 = '</td></tr><tr><td colspan=2 height=' + vGap + '><spacer type=block width=1 height=' + vGap + '></td></tr>';
var str = "";
if (mode.indexOf("2col") == 0) {
if (mode == "2colB") label = "<b>" + label + "</b>";
str = tab1 + linkImgHTML + imageHTML + '</a>' + tab2 + linkHTML + label + '</a>' + tab3;
}
else if (mode.indexOf("inline") == 0) {
str = linkImgHTML + imageHTML+ '</a>' + linkHTML + label + '</a>';
if (mode == "inline") str = '<span class=sm>' + str + '</span>';
}
else if (mode == "currentPic")
str = tab1 +  imageHTML +  tab2 + "<span class=label>" + label + "</span>" + tab3;
document.writeln(str);
this.image = document.images[imgOliveName];
this.image._ob = this;
}
function _OliveButton_over() {
this.image.src = OliveButton.im[(2*this.btn + 1)];
self.status = this.status;
return true;
}
function _OliveButton_out() {
this.image.src = OliveButton.im[(2*this.btn)];
self.status = "";
return true;
}
function _OliveButton_click() {
this.checked = !this.checked;
this.onclick(this.checked);
return false;
}
function writeSelectOptions() {
opt('<p class=sm>Select: <a href="javascript:selectAll()">all</a> | <a href="javascript:deselectAll()">none</a></p>');
}
function sfConfirm(msgInfo, msgType) {
if (!msgType) msgType = "con";
return confirm(sfMsgFmt(msgInfo, msgType));
}
function Cookie(document, name, hours, path, domain, secure) {
this.$document = document;
this.$name = name;
if (hours)
this.$expiration = new Date((new Date()).getTime() + hours*3600000);
else this.$expiration = null;
if (path) this.$path = path; else this.$path = null;
if (domain) this.$domain = domain; else this.$domain = null;
if (secure) this.$secure = true; else this.$secure = false;
}
function _Cookie_store() {
var cookieval = "";
for(var prop in this) {
if ((prop.charAt(0) == '$') || ((typeof this[prop]) == 'function')) continue;
if (cookieval != "") cookieval += '&';
cookieval += prop + ':' + escape(this[prop]);
}
var cookie = this.$name + '=' + cookieval;
if (this.$expiration) cookie += '; expires=' + this.$expiration.toGMTString();
if (this.$path) cookie += '; path=' + this.$path;
if (this.$domain) cookie += '; domain=' + this.$domain;
if (this.$secure) cookie += '; secure';
this.$document.cookie = cookie;
}
function _Cookie_load() {
var allcookies = this.$document.cookie;
if (allcookies == "") return false;
var start = allcookies.indexOf(this.$name + '=');
if (start == -1) return false;
start += this.$name.length + 1;
var end = allcookies.indexOf(';', start);
if (end == -1) end = allcookies.length;
var cookieval = allcookies.substring(start, end);
var a = cookieval.split('&');
for(var i=0; i < a.length; i++)
a[i] = a[i].split(':');
for(var i = 0; i < a.length; i++) {this[a[i][0]] = unescape(a[i][1])};
return true;
}
function _Cookie_remove() {
var cookie;
cookie = this.$name + '=';
if (this.$path) cookie += '; path=' + this.$path;
if (this.$domain) cookie += '; domain=' + this.$domain;
cookie += '; expires=Fri, 02-Jan-1970 00:00:00 GMT';
this.$document.cookie = cookie;
}
new Cookie();
Cookie.prototype.store = _Cookie_store;
Cookie.prototype.load = _Cookie_load;
Cookie.prototype.remove = _Cookie_remove;
var userData = new Cookie(document, "sflyData2", 8640, "/"); // one year
userData.load();
var q5i = 1;
if (userData.pSize) q5i = userData.pSize;
// if (!document.getElementById && !userData.bw && location.href.indexOf("/error/") == -1) document.location.replace("/error/upgrade.jsp?from=" + location.href);
function openInMain(url) {
if (!url) url = "/help/index.jsp";
if (self.opener) self.opener.location.href = url;
self.close();
return false;
}
var popup=null;
function openPopup(url) {
closeWin(popup);
popup = window.open(url,"pop_win","height=400,width=500,location=no,menubars=no,scrollbars=yes,toolbars=no,resizable=yes");
}
function openPopupToSize(url, width, height) {
closeWin(popup);
popup = window.open(url,"pop_win","height="+height+",width="+width+",location=no,menubars=no,scrollbars=yes,toolbars=no,resizable=yes");
}
function openDemoPopupToSize(url, width, height) {
closeWin(popup);
popup = window.open(url,"pop_win","height="+height+",width="+width+",location=no,menubars=no,scrollbars=no,toolbars=no,resizable=yes");
}
function openHelpPopup(url) {
openPopupToSize(url, 700, 500);
}
function openSlideWin(auto, aid, idx) {
document.location.href = "slideshow.jsp"+((auto)?"?auto=1":"?auto=0")+((aid)?("&aid="+aid):"")+((idx)?("&idx="+idx):"") + "&js="+ new Date().getTime();
return false;
}
function rmBreak(str) {
var idx = str.indexOf("<br>");
return ((idx > -1) ? (str.substring(0, idx) +" "+ str.substring(idx + 4)) : str);
}
function showKey(evt) {
var theKey
if (is_nav4) {
theKey = evt.which;
}
else if (is_ie) { // not for nav6
theKey = window.event.keyCode;
keyStroke(theKey);
}
return false;
}
function nn4KP() {
if (is_nav4) {
document.captureEvents(Event.KEYPRESS);
document.onKeyPress = showKey;
}
}
function hbxStrip(a){
a = a.split("|").join("");
a = a.split("&").join("");
a = a.split("'").join("");
a = a.split("#").join("");
a = a.split("$").join("");
a = a.split("%").join("");
a = a.split("^").join("");
a = a.split("*").join("");
a = a.split(":").join("");
a = a.split("!").join("");
a = a.split("<").join("");
a = a.split(">").join("");
a = a.split("~").join("");
a = a.split(";").join("");
a = a.split(" ").join("+");
return a;
}
var errorCount = 0;
function jsError(msg, url, line) {
var tmpData = new Cookie(document, "sT", "", "/");
tmpData.load();
if (errorCount++ == 0) {
if ( !((tmpData.err) && (tmpData.err == 1)) ) {
openPopup("/error/script.jsp?msg="+ escape(msg) +"&url="+ url +"&line="+ line);
tmpData.err = 1;
tmpData.store();
}
if (is_ie) return true;
else return false;
}
return false;
}
self.onerror = jsError;
// returns true for the following browsers:  NS7+, IE6, 'gecko' browsers, Opera 7)
function canJSBookmark() {
// these don't really work.  If we wanted to use 'sidebar' bookmarking capabilities in gecko browsers / opera, we could use it.
//    if ((window.sidebar && window.sidebar.addPanel) ||
//        (window.external && ( navigator.platform == 'Win32' || ( window.ScriptEngine && ScriptEngine().indexOf('InScript') + 1 ) ) ) ||
//        (window.opera && window.print)) {
if (window.external && ( navigator.platform == 'Win32' || ( window.ScriptEngine && ScriptEngine().indexOf('InScript') + 1 ) ) ) {
return true;
} else {
return false;
}
}
function optBookmark(img, label) {
if (canJSBookmark()) {
opt('<a href="" onclick="bookmark(');
opt(')" ');
if (window.opera && window.print) {
opt('rel="sidebar" ');
}
opt('/>');
if (typeof label != "undefined" && label != null && (typeof img == "undefined" || img == null)) {
opt(label);
} else if (typeof img != "undefined" && img != null) {
opt('<img src="');
opt(img);
opt('"/>');
} else {
opt('Bookmark');
}
opt('</a>');
}
}
function bookmark(url, title) {
if (typeof url == "undefined" || url == null) {
url = location.href;
}
if (typeof title == "undefined" || title == null) {
if (document.title) {
title = document.title;
} else {
title = "";
}
}
if( window.sidebar && window.sidebar.addPanel ) {
//Gecko (Netscape 6 etc.) - add to Sidebar
window.sidebar.addPanel(title, url, "");
} else if( window.external && ( navigator.platform == 'Win32' ||
( window.ScriptEngine && ScriptEngine().indexOf('InScript') + 1 ) ) ) {
//IE Win32 or iCab
window.external.AddFavorite( url, title );
} else if( window.opera && window.print ) {
//Opera 6+ - add as sidebar panel to Hotlist.
return true;
} else if( document.layers ) {
//NS4 & Escape - tell them how to add a bookmark quickly (adds current page, not target page)
//window.alert( 'Please click OK then press Ctrl+D to create a bookmark' );
} else {
//other browsers - tell them to add a bookmark (adds current page, not target page)
//window.alert( 'Please use your browser\'s bookmarking facility to create a bookmark' );
}
}
/**************************************************
* dom-drag.js
* 09.25.2001
* www.youngpup.net
**************************************************
* 10.28.2001 - fixed minor bug where events
* sometimes fired off the handle, not the root.
**************************************************/
var Drag = {
obj : null,
init : function(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
{
o.onmousedown  = Drag.start;
o.hmode      = bSwapHorzRef ? false : true ;
o.vmode      = bSwapVertRef ? false : true ;
o.root = oRoot && oRoot != null ? oRoot : o ;
if (o.hmode  && isNaN(parseInt(o.root.style.left  ))) o.root.style.left   = "0px";
if (o.vmode  && isNaN(parseInt(o.root.style.top   ))) o.root.style.top    = "0px";
if (!o.hmode && isNaN(parseInt(o.root.style.right ))) o.root.style.right  = "0px";
if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";
o.minX  = typeof minX != 'undefined' ? minX : null;
o.minY  = typeof minY != 'undefined' ? minY : null;
o.maxX  = typeof maxX != 'undefined' ? maxX : null;
o.maxY  = typeof maxY != 'undefined' ? maxY : null;
o.xMapper = fXMapper ? fXMapper : null;
o.yMapper = fYMapper ? fYMapper : null;
o.root.onDragStart  = new Function();
o.root.onDragEnd  = new Function();
o.root.onDrag    = new Function();
},
start : function(e)
{
var o = Drag.obj = this;
e = Drag.fixE(e);
var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
o.root.onDragStart(x, y);
o.lastMouseX  = e.clientX;
o.lastMouseY  = e.clientY;
if (o.hmode) {
if (o.minX != null)  o.minMouseX  = e.clientX - x + o.minX;
if (o.maxX != null)  o.maxMouseX  = o.minMouseX + o.maxX - o.minX;
} else {
if (o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
if (o.maxX != null) o.minMouseX = -o.maxX + e.clientX + x;
}
if (o.vmode) {
if (o.minY != null)  o.minMouseY  = e.clientY - y + o.minY;
if (o.maxY != null)  o.maxMouseY  = o.minMouseY + o.maxY - o.minY;
} else {
if (o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
if (o.maxY != null) o.minMouseY = -o.maxY + e.clientY + y;
}
document.onmousemove  = Drag.drag;
document.onmouseup    = Drag.end;
return false;
},
drag : function(e)
{
e = Drag.fixE(e);
var o = Drag.obj;
var ey  = e.clientY;
var ex  = e.clientX;
var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
var nx, ny;
if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);
nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));
if (o.xMapper)    nx = o.xMapper(y)
else if (o.yMapper)  ny = o.yMapper(x)
Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
Drag.obj.lastMouseX  = ex;
Drag.obj.lastMouseY  = ey;
Drag.obj.root.onDrag(nx, ny);
return false;
},
end : function()
{
document.onmousemove = null;
document.onmouseup   = null;
Drag.obj.root.onDragEnd(  parseInt(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]),
parseInt(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));
Drag.obj = null;
},
fixE : function(e)
{
if (typeof e == 'undefined') e = window.event;
if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
return e;
}
};
function go(url) { document.location.href = url; }
function animateCSS(element, numFrames, timePerFrame, animation, whendone) {
var frame = 0;
var time = 0;
var intervalId = setInterval(displayNextFrame, timePerFrame);
function displayNextFrame() {
if (frame >= numFrames) {
clearInterval(intervalId);
if (whendone) whendone(element);
return;
}
for(var cssprop in animation) {
try {
element.style[cssprop] = animation[cssprop](frame, time);
} catch(e) {}
}
frame++;
time += timePerFrame;
}
}
var popAreaObj;
function popShow() {
if (document.all) setSelect("hidden");
var startY = popHandleObj.lastMouseY;
popShadeRtObj.style.visibility = popShadeBtObj.style.visibility = "visible";
animateCSS(popAreaObj, 12, 30,  // Animate image for 12 frames of 30ms each
{
top: function(frame,time) { return  + startY + (frame*21) - 232 + "px"; },
clip: function(frame,time) { return "rect("+ (220-(frame*(21))) +"px 566px 286px 0)";},
visibility: function() { return "visible"; }
});
return false;
}
function popHide() {
if (document.all) setSelect("visible");
var startY = popHandleObj.lastMouseY;
animateCSS(popAreaObj, 12, 30,  // Animate image for 12 frames of 30ms each
{
top: function(frame,time) {  return  + startY + ((11-frame)*21) - 232 + "px"; },
clip: function(frame,time) { return "rect("+ (220-((11-frame)*21)) +"px 566px 286px 0)";},
visibility: function() { return "visible"; }
},
function() {
popAreaObj.style.visibility = popShadeRtObj.style.visibility = popShadeBtObj.style.visibility = "hidden";
prShow(popAreaObj.getAttribute("prOpener"));
});
return false;
}
function prShow(id) {
if (id) { // no well selected
if (document.getElementById("well"+id).className == "hideWell") {
document.getElementById("well"+id).className = "well";
var wellAbsObj = document.getElementById("wellAbs"+id);
wellAbsObj.style.position = "absolute"; // safari 1.0 positioning bug fix
wellAbsObj.style.zIndex = "1";
wellAbsObj.style.clip="rect(0px 0px 0px 0px)"; // avoid flashing in some browsers
animateCSS(wellAbsObj, 8, 30,
{
clip: function(frame,time) { return "rect("+ (105 - (15*frame)) +"px 150px 110px 0px)";},
marginTop: function(frame,time) { return  + ((-105) + (15*frame)) + "px"; }
});
}
}
}
var xmlReq;
function loadXMLDoc(url) {
xmlReq = false;
// branch for native XMLHttpRequest object
if(window.XMLHttpRequest) {
try {
xmlReq = new XMLHttpRequest();
} catch(e) {
xmlReq = false;
}
// branch for IE/Windows ActiveX version
} else if(window.ActiveXObject) {
try {
xmlReq = new ActiveXObject("Msxml2.XMLHTTP");
} catch(e) {
try {
xmlReq = new ActiveXObject("Microsoft.XMLHTTP");
} catch(e) {
xmlReq = false;
}
}
}
if(xmlReq && url) {
xmlReq.onreadystatechange = processReqChange;
xmlReq.open("GET", url, true);
xmlReq.send("");
}
return xmlReq;
}
// set xmlReq to true for false
loadXMLDoc();
function processReqChange() {
// only if req shows "loaded"
if (xmlReq.readyState == 4) {
// only if "OK"
if (xmlReq.status == 200) {
updateDisplay();
} else {
alert("There was a problem retrieving the XML data:\n" + xmlReq.statusText);
}
}
}
function updateDisplay() {
popContentObj.innerHTML = xmlReq.responseText;
popShow();
}
function setPromoWindow(url) {
var myWidth = 800, myHeight = 600;
if( typeof( window.innerWidth ) == 'number' ) {
//Non-IE
myWidth = window.innerWidth;
myHeight = window.innerHeight;
} else if( document.documentElement &&
( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
//IE 6+ in 'standards compliant mode'
myWidth = document.documentElement.clientWidth;
myHeight = document.documentElement.clientHeight;
}
popX = myWidth - 566;
popY = myHeight - 300;
try {
var tmp = document.createElement('div');
tmp.setAttribute('id','popArea');
tmp.style.zIndex = "100";
tmp.style.left = popX + 'px';
popAreaObj = document.body.appendChild(tmp);
tmp = document.createElement('div');
tmp.setAttribute('id','popShadeRt');
popShadeRtObj = popAreaObj.appendChild(tmp);
tmp = document.createElement('div');
tmp.setAttribute('id','popShadeBt');
popShadeBtObj = popAreaObj.appendChild(tmp);
tmp = document.createElement('div');
tmp.setAttribute('id','popFrame');
popFrameObj = popAreaObj.appendChild(tmp);
tmp = document.createElement('div');
tmp.setAttribute('id','popHandle');
popHandleObj = popFrameObj.appendChild(tmp);
tmp = document.createElement('input');
tmp.setAttribute('type','button');
tmp.setAttribute('value','close');
popInputBtnObj = popHandleObj.appendChild(tmp);
popInputBtnObj.onclick = function() { return popHide() };
tmp = document.createElement('div');
tmp.setAttribute('id','popContent');
popContentObj = popFrameObj.appendChild(tmp);
Drag.init(popHandleObj, popAreaObj); // requires dom-drag.js
popHandleObj.lastMouseY = popY;
}
catch(e) { popWindowPromo(url) }
}
function popPromo(url, well) {
var well = well || "";
if (document.location.href.indexOf("https://") == -1)
if (xmlReq) {
var xmlURL = url + ((url.indexOf("?") == -1) ? "?" : "&") + "layer=1";
if (!popAreaObj)
setPromoWindow(url);
loadXMLDoc(xmlURL);
popAreaObj.setAttribute("prOpener", well);
return false;
}
else {
popWindowPromo(url); // old style
}
return false;
}
//gchaverri duplicate this function, because we don't want to affect other functionality
//correction for photocontest problem in winners and popup
function popPromoPhotoContest(url, well) {
var well = well || "";
if (document.location.href.indexOf("https://") == -1)
if (xmlReq) {
var xmlURL = url + ((url.indexOf("?") == -1) ? "?" : "&") + "layer=1";
if (!popAreaObj) setPromoWindow(url);
if (loadXMLDoc(xmlURL)) {
popAreaObj.setAttribute("prOpener", well);
return false;
}
return false;
}
popWindowPromo(url); // old style
return false;
}
function popWindowPromo(url) {
var xpos = screen.width - 570;
var ypos = screen.height - 320;
dotWin = window.open(url,"Offer","height=232,width=507,location=no,menubars=no,scrollbars=no,toolbars=no,resizable=no, screenX="+ xpos +",screenY="+ ypos +",left="+ xpos +",top="+ ypos);
}
function initPromo(url, well) {
var page = currURL.substring(currURL.lastIndexOf("/") +1,currURL.lastIndexOf("."));
var tmpData = new Cookie(document, "sT", "", "/");
tmpData.load();
// show pop only once even if back button used
if (!(tmpData.pop && (tmpData.pop.indexOf(page) > -1))) {
tmpData.pop = (tmpData.pop) ? (tmpData.pop + page) : page;
tmpData.store();
popPromo(url, well);
if (xmlReq) document.getElementById("well" + well).className = "hideWell";
}
return false;
}
function setSelect(hiddenVisible) {
for (j=0; j<document.forms.length; j++) {
var theForm = document.forms[j]
for(i=0; i<theForm.elements.length; i++) {
if(theForm.elements[i].type == "select-one")
theForm.elements[i].style.visibility = hiddenVisible;
}
}
}
var dotWin = null;
function pop(url) { popPromo(url); }
