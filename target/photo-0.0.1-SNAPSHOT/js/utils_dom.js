function setIdProperty( id, property, value )
{
	if (document.getElementById) {
	var styleObject = document.getElementById( id );
	if (styleObject != null) {
		styleObject = styleObject.style;
		styleObject[ property ] = value;
	}
}
else if (is_nav4) {
document[id][property] = value;
}
else {
document.all[id].style[property] = value;
}
}
function getPagePos(o, c, p, m, s)
{
    var x = parseInt(o[c]);
    o = o[p];
    while (o != null && typeof(o[c]) != 'undefined') {
        if (o.tagName != 'FONT')
            x += parseInt(o[c]);
        if (o.tagName == 'BODY' && m && typeof(o[m]) != 'undefined')
            x += parseInt(o[m]);
        if (o.tagName == 'BODY' && s && typeof(o[s]) != 'undefined')
            x -= parseInt(o[s]);
        if (o.tagName == 'HTML')
            break;
        o = o[p];
    }
    return x;
}
function setY(obj)
{
	if (is_nav4) {
		var y = document[obj].pageY;
	}
	else {
		var posimg = null;
		if (document.getElementById)
            posimg = document.getElementById(obj);
		else if (is_ie && (typeof document.all[obj] == "object"))
            posimg = document.all[obj];
		    /* return for IE incase posimg is undefined */
		else
            return (((typeof mb != "undefined") && mb.y) ? mb.y : 0);
		// IE mac is goofy
		var ua = navigator.userAgent.toLowerCase();
		var intExp = parseInt(navigator.appVersion);
		if (intExp >= 4 && ua.indexOf('msie 5') != -1) intExp = 5;
		var macIntExp = (ua.indexOf('mac') == -1) ? 0.0 : intExp;
		var y = getPagePos(posimg, 'offsetTop',
			(macIntExp == 4) ? 'parentElement' : 'offsetParent',
			(macIntExp >= 5) ? 'topMargin' : null,
			null);
	}
	return y;
}
function genLayer(sName, sLeft, sTop, sWdh, sHgt, sVis, content)
{
    sVis = ((sVis == showName) || (sVis == hideName)) ? sVis : ((sVis) ? showName : hideName); // accepts either true false or hide show
    if (is_nav4)
        opt('<layer name="' + sName + '" left=' + sLeft + ' top=' + sTop + ' width=' + sWdh + ' height=' + sHgt + ' clip="' + sWdh + ',' + sHgt + '" visibility="' + sVis + '" z-Index=' + (++zIdx) + '>' + content + '</layer>');
    else
        opt('<div id="' + sName + '" style="position:absolute; overflow:hidden; left:' + sLeft + 'px; top:' + sTop + 'px; width:' + sWdh + 'px; height:' + sHgt + 'px;' + ' visibility:' + sVis + '; z-Index:' + (++zIdx) + '">' + content + '</div>');
}
function genToolLayer(sName, sLeft, sTop, sWdh, sHgt, sVis, events, content)
{
    sVis = ((sVis == showName) || (sVis == hideName)) ? sVis : ((sVis) ? showName : hideName); // accepts either true false or hide show
    if (is_nav4)
        opt('<layer '+events+' name="' + sName + '" left=' + sLeft + ' top=' + sTop + ' width=' + sWdh + ' height=' + sHgt + ' clip="' + sWdh + ',' + sHgt + '" visibility="' + sVis + '" z-Index=' + (zIdx+1500) + '>' + content + '</layer>');
    else
        opt('<div '+events+' id="' + sName + '" style="position:absolute; overflow:hidden;cursor: pointer; left:' + sLeft + 'px; top:' + sTop + 'px; width:' + sWdh + 'px; height:' + sHgt + 'px;' + ' visibility:' + sVis + '; z-Index:' + (zIdx+1500) + '">' + content + '</div>');
}
function hideLayer(name) { setIdProperty(name, "visibility", hideName); }
function showLayer(name) { setIdProperty(name, "visibility", showName); }
var zIdx = -1;
var hideName = (is_nav4 ? 'hide' : 'hidden');
var showName = (is_nav4 ? 'show' : 'visible');
/* Floater Class */
Floater.counter = 0;
Floater.currLayer = "";
Floater.prevLayer = "";
Floater.leftTxt   = "";
Floater.rightTxt  = "";
Floater.ok = uiBase + "/okay_B.gif";
Floater.cancel = uiBase + "/cancel_B.gif";
Floater.yes = uiBase + "/yes_B.gif";
Floater.no = uiBase + "/no_B.gif";
Floater.save = uiBase + "/save_B.gif";
Floater.dontSave = uiBase + "/dont_save_B.gif";
Floater.chek = uiBase + "/prompt_c_W.gif";
Floater.ques = uiBase + "/prompt_q_W.gif";
Floater.warn = uiBase + "/prompt_w_W.gif";
Floater.autoPrompt = 1;
Floater.x = 70;
Floater.y = 90;
Floater.w = 660;
Floater.h = 500;
Floater.frmMax = 32;
Floater.frmLen = 34;
Floater.frmLabel = "<b class=sub>Project Name&nbsp; </b>";
Floater.top = "<table width="+Floater.w+" border=0 cellspacing=0 cellpadding=0><tr><td height="+Floater.h+" valign=top><div><img src='images/sp.gif' width=2 height="+ (84 + Floater.partnerNav) +" alt=''></div><table bgcolor=white border=0 cellspacing=0 cellpadding=0><tr><td colspan=3><img src='http://web1.shutterfly.com/img_/misc/prompt_top.gif' alt='' width=400 height=4></td></tr><tr><td background='images/prompt_left.gif' width=4><br></td><td width=391 valign=top>";
Floater.t18 = Floater.top + "<table border=0 cellspacing=0 cellpadding=18 align=center><tr><td style='padding:18px;'>";
Floater.t0 = Floater.top + "<table border=0 cellspacing=0 cellpadding=0><tr><td width=18 nowrap><br></td><td width=228 valign=top><br><br>";
Floater.b = "</td></tr></table></td><td background='images/prompt_right.gif' width=5 nowrap><br></td></tr><tr><td colspan=3 nowrap><img src='images/prompt_bottom.gif' alt='' width=400 height=5></td></tr></table></td></tr></table>";
Floater.skipProject = new Function("sPJ", "userData.sPJ=(sPJ)?1:0; userData.store();");
Floater.now = new Date();
function Floater(typ, txt, action, noShow, defmsg) {
if (!Floater.prototype.show) {
Floater.prototype.show = _PromptLayer_show;
Floater.prototype.hide = _PromptLayer_hide;
Floater.prototype.validate = _PromptLayer_validate;
Floater.prototype.click = _PromptLayer_click;
}
var nnLayer = (is_nav4) ? "layer" : "";
this.txt = txt;
this.typ = typ;
this.id = "Prompt" + Floater.counter++;
this.input = defmsg || "";
this.action = action;
this.buttonPress = "";
// IE bug: form select box showing through, move to side. Can be overridden by setting these windows properties
this.overrideX = window.overridePromptX;
this.overrideY = window.overridePromptY;
if (typeof this.action == "string") this.action = new Function("x",this.action);
var formHTML = '<form id="'+ this.id +'_FRM" name="'+ this.id +'_FRM" onSubmit="return false;">';
var inputHTML = Floater.frmLabel+'<br><input type=text size='+Floater.frmLen+' maxlength='+Floater.frmMax+' class=frm value="'+this.input +'">';
var yeslinkHTML  = '<br><a href ="javascript:;" onClick="document.'+ nnLayer + this.id +'._lp.click(\'yes\'); return false;">';
var validateHTML  = '<br><a href ="javascript:;" onClick="document.'+ nnLayer + this.id +'._lp.validate('+ !noShow +'); return false;">';
var imageHTML    = '<img name="'+ this.id +'" src="'+ Floater.ok  +'" height=26 alt="" vspace=3 hspace=5 border=0></a>';
var yesimageHTML = '<img name="'+ this.id +'" src="'+ Floater.yes +'" height=26 alt="" vspace=3 hspace=5 border=0></a>';
var saveHTML = '<img name="'+ this.id +'" src="'+ Floater.save +'" height=26 alt="" vspace=3 hspace=5 border=0></a>';
var nolinkHTML  = '<br><a href ="javascript:;" onClick="document.'+ nnLayer + this.id +'._lp.click(\'no\'); return false;">';
var noimageHTML = '<img src="' + Floater.no +'" height=26 alt="" vspace=3 hspace=15 border=0></a>';
var cancelimageHTML = '<img src="' + Floater.cancel +'" height=26 alt="" vspace=3 hspace=15 border=0></a>';
var dontSaveHTML = '<img src="' + Floater.dontSave +'" height=26 alt="" vspace=3 hspace=15 border=0></a>';
var noShowHTML = ((noShow) ? ('<table border=0><tr><td align=right nowrap><input type=checkbox onClick="Floater.skipProject(!(Floater.autoPrompt = !Floater.autoPrompt)); return true;"></td><td class=sm nowrap> Don\'t show project reminders again.</td></tr></table>') : '');
var progHTML = '</td><td width=145 nowrap><img name="'+ this.id +'" src="http://web1.shutterfly.com/img_/misc/ul_anim.gif?js='+ Floater.now.getHours() +'" width=139 height=168 border=0 hspace=3 alt="">';
var icon = Floater.ques;
if (typ.indexOf("w") > -1) icon = Floater.warn;
else if (typ.indexOf("c") > -1) icon = Floater.chek;
var iconHTML = '<img src="' + icon +'" width=44 height=38 border=0 alt="">';
this.txt_style = (typ.indexOf("b") > -1) ? " class=sub" : " class=fbody";
txt = (is_nav4) ? '<layer id="'+ this.id +'_TXT" name="'+ this.id +'_TXT"'+ this.txt_style +'>'+ txt +'</layer><br><br>' : '<div id="'+ this.id +'_TXT"'+ this.txt_style +'>' + txt + '</div>';
if (typ=="p") {
var out = Floater.t0 + txt + progHTML + Floater.b;
} else {
var out = Floater.t18 + "<table width=344 border=0 cellspacing=0 cellpadding=0 align=center>" +
"  <tr><td width=44>" + iconHTML +"</td><td width=300>"+ txt +"</td></tr>"+
"</table><table cellpadding=0 cellspacing=0 width=300 border=0 align=center>";
if (typ.indexOf("i") > -1) out += "<tr><td colspan=2>" + formHTML + inputHTML + "</td></tr><tr><td align=center>"+ validateHTML;
else                       out += "<tr><td align=center>" + yeslinkHTML ;
if (typ.indexOf("sq") > -1)      out += saveHTML     +"</td><td align=center>" + nolinkHTML + dontSaveHTML;
else if (typ.indexOf("iq") > -1) out += imageHTML    +"</td><td align=center>" + nolinkHTML + cancelimageHTML;
else if (typ.indexOf("q") > -1)  out += yesimageHTML +"</td><td align=center>" + nolinkHTML + noimageHTML;
else if (typ.indexOf("o") > -1)  out += imageHTML    +"</td><td align=center>" + nolinkHTML + cancelimageHTML;
else out += imageHTML;
out += "</td></tr>"
if ((Floater.leftTxt != "") && (Floater.rightTxt != "")) {
out += "<tr><td align=center class=sm>" + Floater.leftTxt + "</td><td align=center class=sm>" + Floater.rightTxt+ "</td></tr>";
}
out += "</table>";
if (typ.indexOf("i") > -1) out += noShowHTML + '</form>';
out += Floater.b;
}
genLayer(("layer"+this.id), ((this.overrideX != null)? this.overrideX:Floater.x), ((this.overrideY != null)? this.overrideY:Floater.y), Floater.w, Floater.h, hideName, out);
if (is_nav4) {
this.layer = document[("layer"+this.id)];
this.layer._lp = this;
}
else {
this.image = document.images[this.id];
this.image._lp = this;
}
}
function _PromptLayer_hide() {
setIdProperty(("layer"+this.id), "visibility", hideName);
}
function promptShow(name) {
if (Floater.currLayer != Floater.prevLayer) Floater.prevLayer = Floater.currLayer;
if (Floater.currLayer != "") hideLayer(Floater.currLayer);
Floater.currLayer = name;
setIdProperty(name, "visibility", showName);
}
function _PromptLayer_show() {
window.scroll(0,0);
var txtObj = getObj((this.id+"_TXT"), ("layer"+this.id));
if (!is_nav4) {
txtObj.innerHTML = this.txt;
}
else {
txtObj.left = (this.typ == "p") ? "22" : "68";
txtObj.top = 102 + Floater.partnerNav;
txtObj.bgColor = "white";
txtObj.document.open();
txtObj.document.write('<span'+ this.txt_style+'>'+ this.txt +'</span>');
txtObj.document.close();
}
promptShow("layer"+this.id);
if (is_nav4) { if (document.layers["layer"+this.id].document.forms[this.id + "_FRM"]) document.layers["layer"+this.id].document.forms[this.id + "_FRM"].elements[0].focus(); }
else { if (document.forms[this.id + "_FRM"]) document.forms[this.id + "_FRM"].elements[0].focus(); }
}
function _PromptLayer_validate(validate) {
var frm_input = (is_nav4) ? (document.layers["layer"+this.id].document.forms[this.id + "_FRM"].elements[0].value) : (document.forms[this.id + "_FRM"].elements[0].value);
if ( (validate && (frm_input != "") ) || !validate) {
this.hide();
this.input = frm_input;
this.buttonPress = "yes";
this.action("yes");
}
return false;
}
function _PromptLayer_click(x) {
this.buttonPress = x;
this.hide();
this.action(x);
return false;
}
function getObj(id,id1) {
var returnObj = null;
if (is_nav4) returnObj =  document[id1].document[id];
else if (document.getElementById) returnObj =  document.getElementById(id);
else returnObj =  document.all[id];
return returnObj;
}
/* End Floater Class */
function getStyleBySelector( selector )
{
if (!is_nav6) return null;
var sheetList = document.styleSheets;
var ruleList;
var i, j;
/* look through stylesheets in reverse order that
they appear in the document */
for (i=sheetList.length-1; i >= 0; i--) {
ruleList = sheetList[i].cssRules;
for (j=0; j<ruleList.length; j++) {
if (ruleList[j].type == CSSRule.STYLE_RULE && ruleList[j].selectorText == selector)
return ruleList[j].style;
}
}
return null;
}
function getIdProperty( id, property )
{
    if (document.getElementById) {
        var styleObject = document.getElementById( id );
        if (styleObject != null) {
            styleObject = styleObject.style;
            if (styleObject[property]) {
                return styleObject[ property ];
            }
        }
        styleObject = getStyleBySelector( "#" + id );
        return (styleObject != null) ? styleObject[property] : null;
    }
    else if (is_nav4) {
        return document[id][property];
    }
    else {
        return document.all[id].style[property];
    }
}
function move( id, xValue, yValue, additive )
{
var left = getIdProperty(id, "left");
var top = getIdProperty(id, "top");
var leftMatch, topMatch;
if (is_nav4) {
leftMatch = new Array( 0, left, "");
topMatch = new Array( 0, top, "");
}
else {
var splitexp = /([-0-9.]+)(\w+)/;
leftMatch = splitexp.exec( left );
topMatch = splitexp.exec( top );
if (leftMatch == null || topMatch == null) {
leftMatch = new Array(0, 0, "px");
topMatch = new Array(0, 0, "px");
}
}
left = ((additive) ? parseFloat( leftMatch[1] ) : 0) + xValue;
top = ((additive) ? parseFloat( topMatch[1] ) : 0) + yValue;
setIdProperty( id, "left", left + leftMatch[2] );
setIdProperty( id, "top", top + topMatch[2] );
}
function brkStr(st, len) {
len--; /* leave a space between columns */
if (st.length <= len) return st;
var w = 0;
var i = 0;
var st2 = "";
while ( i < st.length ) {
if (w == len) {
st2 += "<br>";   w = 0;
}
if (st.charAt(i) == "&") {
var cmd = "";
var c=0;
var endCmd = false;
while (!endCmd) {
cmd += st.charAt(i + c);
endCmd = (st.charAt(i + c) == ";") || (c==6) || ((i + c + 1) == st.length);
c++;
}
if ("&lt;&gt;&quot;&#39;&#92;&amp;".indexOf(cmd) != -1) {
st2 += cmd;   i = i + c - 1;
}
else st2 += st.charAt(i);
}
else st2 += st.charAt(i);
if (st.charAt(i) == " ") w = 0;
else w++;
i++;
}
return st2;
}
