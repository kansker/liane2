//_TextZone_handleClick:處理text zone按下,跳出視窗
//var que ：照片更新


var msg = {
    viewTools: "點擊可顯示影像工具列",
    dropPicture: "圖片拖拉到此",
    enterDescription: "在這裡輸入頁描述",
    enterCaption: "編輯文字"
}
var photo_space_img = "images/sp.gif";//透明圖
/*** que: IE bug fix ***/
// when multiple images are swapped IE often fails
// que waits for the cpu to catch up before requesting images
// -kb
var que = {
	wait: 10,
	imgName: new Array(),
	imgUrl: new Array(),
	index: -1,
	update: function(name, url) {
		this.imgName.push(name);
        if(url=="")
            this.imgUrl.push(photo_space_img);
        else
		    this.imgUrl.push(url);
		if (this.imgName.length == 1) { // not currently working que
			this.timer = setTimeout(que.getNext, que.wait);
		}
	},
	getNext: function() {
		with(que) {
			if (++index < imgName.length) {
				dbg("fetching: "+ index + " imgName.length: " + imgName.length + " name: " + imgName[index]);
				document.images[imgName[index]].src = imgUrl[index];
				timer = setTimeout(getNext, wait);
			}
			else { // done
				imgName.length = imgUrl.length = 0;
				index = -1;
			}
		}
	}
}
//產生div layer區塊層 開頭
function genLayerBegin(sName, sLeft, sTop, sWdh, sHgt, sVis, zIdx,sClass) {
    if (is_nav4)
        document.write("<layer name='" + sName + "' left=" + sLeft + " top=" + sTop + " width=" + sWdh + " height=" + sHgt + " clip='" + sWdh + "," + sHgt + "' visibility='" + (sVis ? "show" : "hide") + " z-Index='" + zIdx + ">");
    else{
        document.write("<div id='" + sName + "' class='"+sClass+"' style='position:absolute; overflow:hidden;word-break:break-all;left:" + sLeft + "px; top:" + sTop + "px; width:" + sWdh + "px; height:" + sHgt + "px;" + " visibility:" + (sVis ? "visible" : "hidden") + "; z-index:" + zIdx + "'>");
    }
    //dbg("<div id='" + sName + "' style='position:absolute; overflow:hidden; left:" + sLeft + "px; top:" + sTop + "px; width:" + sWdh + "px; height:" + sHgt + "px;" + " visibility:" + (sVis ? "visible" : "hidden") + "; z-index:" + zIdx + "'>");
}
//產生div layer區塊層 結尾
function genLayerEnd() {
    if (is_nav4)
        document.write("</layer>");
    else
        document.write("</div>");
}

function setIdProperty( id, property, value )
{
	var obj = getIdProperty( id );
	if (obj != null) {
		if (is_nav4) {
			obj[property] = value;
		}
		else {
			obj.style[property] = value;
		}
	} else {
		alert("unable to find object for id: " + id);
	}
}

function getIdProperty( id )
{
    if (document.getElementById) {
        return document.getElementById( id );
    }
    else if (is_nav4) {
        return document[id];
    }
    else {
        return document.all[id];
    }
}
function setStroke(id, style) {
	setIdProperty( id, "border", style);
}
var gray = "#ccc"; // normal border color
var blue = "#1A8FFC"; // target border color
var green = "#9c3"; // target border color
var orange = "#f90"; // 'onMouseOver' border color
var clickID = ""; // id of clicked dropZone
function overOn(id) {
    // conditional 'onMouseOver' highlight, disabled when a dropZone has been clicked
    if (clickID == "" && dd.dragOn) {
        var dzOver = dzObj(id);
        if (dzOver.hasPicture){
            dzOver.border2(orange);
        }
    }
}
function overOff(id) {
    // conditional 'onMouseOut' highlight, disabled when a dropZone has been clicked
    if (clickID == "" && dd.dragOn) {
        var dzOver = dzObj(id);
        //  	dzOver.border(dzOver.hasPicture ? "transparent" : gray);
        dzOver.border2(dropZoneBorder);
    }
}
function dzMsgHTML(str, w, h, isTxt) {
    var tbClass = (isTxt) ? "txtMsg" : "zdMsg";
    var size = ((h > 50) && (w > 50)) ? "lgMsg" : "lgMsg";//"lgMsg" : "smMsg";
    str = (size == "smMsg") ? str : str.split(" ").join("<br>"); // add brs to large text
    if (h < 12) {
        return "<table width="+ w +" cellspacing='0' class='"+ tbClass +"'><tr><td height="+ h +" style='font-size:"+ h +"px;'>"+ str +"</td></tr></table>"; }
    return "<table width="+ w +" cellspacing='0' class='"+ tbClass +"'><tr><td height="+ h +" class='"+ size +"'>"+ str +"</td></tr></table>";
}
/* -- start of DropZone class -- */
function DropZone(name, left, top, width, height, visible, zIndex, type, hasPicture, pageIndex, imageName, thumbURL, viewID, assocDropZoneID) {
	this.name = name;
	this.left = left;
	this.top = top;
	this.width = width;
	this.height = height;// -1; // bug WEB-681
	this.visible = visible;
	this.zIndex = zIndex;
	this.type = type;
	this.hasPicture = (viewID) ? true : false;
	this.pageIndex = pageIndex;
	this.imageName = imageName;
	this.thumbURL = thumbURL;
	this.viewID = viewID;
	this.assocDropZoneID = assocDropZoneID;
	return this;
}
DropZone.prototype.showMessage = function() {
	setIdProperty(("dzMsg"+this.name), "visibility", ((this.hasPicture) ? hideName : showName));
	var tip = this.hasPicture ? msg.viewTools : msg.dropPicture;
	var e = document.getElementById(this.name);
	e.getElementsByTagName("a")[0].setAttribute("title", tip);
	e.getElementsByTagName("img")[0].setAttribute("alt", tip);
	var textZone = findTextZone(this.assocDropZoneID, this.pageIndex);
}
DropZone.prototype.setPicture = function(viewID, thumbURL, text) {
	this.viewID = viewID;
	this.thumbURL = thumbURL;
	this.hasPicture = true;
	var textZone = findTextZone(this.assocDropZoneID, this.pageIndex);
	if(textZone != null) {
        textZone.text = text;
        textZone.imageURL = thumbURL;

        var textDiv = document.getElementById(textZone.name);
        if(textZone.text!=""){
            textDiv.align = textZone.justification;
            textDiv.className = "textCaption";
            if(textZone.font !=""){
                textDiv.className = "textCaption"+textZone.font;
            }else{
                textDiv.className = "textCaption";
            }
            textDiv.innerHTML = '<div title="'+ textZone.text +'" style="cursor: pointer" onmouseover="textZone_handleOn(\'' + textZone.name + '\')" onmouseout="textZone_handleOff(\'' + textZone.name + '\')" onclick="textZone_handleClick(\'' + textZone.name + '\')">'
                +'<font color="'+textZone.fontColor+'">'+ReplaceAll(textZone.text,"\n","<br/>")+'</font></div>';
        }else{
            textDiv.innerHTML = '<div title="'+ msg.enterCaption +'" style="cursor: pointer" onmouseover="textZone_handleOn(\'' + textZone.name + '\')" onmouseout="textZone_handleOff(\'' + textZone.name + '\')" onclick="textZone_handleClick(\'' + textZone.name + '\')">' +dzMsgHTML(msg.enterCaption, textZone.width, textZone.height, true)+'</div>';
        }

	}
	this.showMessage();
   	que.update("dzImg_" + this.imageName, thumbURL);
}
DropZone.prototype.clearPicture = function() {

    var textZone = findTextZone(this.assocDropZoneID, this.pageIndex);
    if(textZone!=null){
        var tip = (this.type == "page-text") ? msg.enterDescription : msg.enterCaption;
        textZone.text = "";
        var textDiv = document.getElementById(textZone.name);
        textDiv.innerHTML = dzMsgHTML(tip, textZone.width, textZone.height, true);
    }
	que.update("dzImg_" + this.imageName,photo_space_img);
	this.thumbURL = this.viewID = "";
	this.hasPicture = false;
	this.showMessage();
}
DropZone.prototype.write = function() {
	var message = msg.dropPicture;
	var tip = this.hasPicture ? msg.viewTools : msg.dropPicture;
    //置圖區底層 kker
	genLayer(("dzMsg"+this.name), this.left, this.top, this.width, this.height, (!this.hasPicture),dzMsgHTML(msg.dropPicture, this.width, this.height, false));
    var tshow=false;
    if(this.thumbURL == ""){
    	genLayer(this.name, (this.left), (this.top), this.width, this.height, this.visible,
	        '<a href="javascript:void(0);" onmouseover="overOn(\'' + this.name + '\')" onmouseout="overOff(\'' + this.name + '\')"><img src="' + photo_space_img + '" style="border-width:0px;" name="dzImg_' + this.name + '" id="dzImg_' + this.name + '" width=' + this.width + ' height=' + this.height + '></a></div>');
    }else{
        tshow=true;
     	genLayer(this.name, (this.left), (this.top), this.width, this.height, this.visible,
	        '<a href="javascript:void(0);" onmouseover="overOn(\'' + this.name + '\')" onmouseout="overOff(\'' + this.name + '\')"><img src="' + this.thumbURL + '" style="border-width:0px;" name="dzImg_' + this.name + '" id="dzImg_' + this.name + '" width=' + this.width + ' height=' + this.height + '></a></div>');
    }
    //viewID
    var warn =false;
    if(tshow==true){
        var alobj = albumDataObj(this.viewID);
        if(alobj!=null){
            var r1 = this.width / this.height;
            var r2 = alobj.cw / alobj.ch;
            var r3 = (r2-r1)/r1;
            if(r3 > 0.02 || r3 <= -0.02){
                warn = true;
            }
        }
    }
    genToolLayer(this.name+"_tool3", (this.left), (this.top), 20, 20, tshow,'',
            '<img src="images/icon_warn.gif" style="border-width:2px;" alt="裁切相片" name="dzImg_' + this.name + '_tool3" width=20 height=20 onclick=enhancePicture("'+this.name+'")></div>');
    genToolLayer(this.name+"_tool1", (this.left), (this.top), 20, 20, tshow,'',
            '<img src="images/icon_cutimg.gif" style="border-width:2px;" alt="裁切相片" name="dzImg_' + this.name + '_tool1" width=20 height=20 onclick=enhancePicture("'+this.name+'")></div>');
    var t1 = document.getElementById(this.name+"_tool1");
    var t3 = document.getElementById(this.name+"_tool3");
    if(tshow==true){
        if(warn){
            t3.style.visibility = "visible";
            t1.style.visibility = "hidden";
        }else{
            t1.style.visibility = "visible";
            t3.style.visibility = "hidden";
        }
    }else{
       t1.style.visibility = "hidden";
       t3.style.visibility = "hidden";
    }
    genToolLayer(this.name+"_tool2", (this.left +20), (this.top), 20, 20, tshow,'',
	        '<img src="images/icon_delmg.gif" style="border-width:2px;" alt="刪除" name="dzImg_' + this.name + '_tool2" width=20 height=20 onclick=removePic("'+this.name+'")></div>');
	//genLayer(("lowRes"+this.name), this.left-4, this.top-12, 15, 15, showName,
	//'<img id="lowIcon'+ this.name +'" src="'+ blankImg.src +'" alt="Not recommended for printing" title="Not recommended for printing" width="15" height="15" border="0" align="absbottom">');
}
tranBorderStyle = (is_ie) ? "solid white 0" : "solid transparent 2px"; // win IE has a problem with transparent

DropZone.prototype.border = function(color) {
    if (color == "transparent"){
        setStroke(this.name, tranBorderStyle);
    }else{
        setStroke(this.name, "solid " + color + " 2px");
    }
}

DropZone.prototype.border2 = function(color) {
    if (color == "transparent"){
        var bimg = getIdProperty("dzImg_"+this.name);
        if(bimg.width != this.width){
            bimg.width = this.width;
            bimg.height = this.height;
            bimg.style.width = (this.width)+"px";
            bimg.style.height = (this.height)+"px";
            bimg = getIdProperty(this.name);
            bimg.width = this.width;
            bimg.height = this.height;
            bimg.style.width = (this.width)+"px";
            bimg.style.height = (this.height)+"px";
        }

        setStroke(this.name, tranBorderStyle);
    }else{
        if(this.width-4 >=0 && this.height-4 >=0){
            var bimg = getIdProperty("dzImg_"+this.name);
            bimg.width = this.width-4;
            bimg.height = this.height-4;
            bimg.style.width = (this.width-4)+"px";
            bimg.style.height = (this.height-4)+"px";
            bimg = getIdProperty(this.name);
            bimg.width = this.width-4;
            bimg.height = this.height-4;
            bimg.style.width = (this.width-4)+"px";
            bimg.style.height = (this.height-4)+"px";
        }
        setStroke(this.name, "solid " + color + " 2px");
    }
}
DropZone.prototype.getAssociatedText = function() {
    var textZone = findTextZone(this.assocDropZoneID, this.pageIndex);
    if(textZone != null) {
        return textZone.text;
    }
    return null;
}
/* -- end of DropZone class -- */
// box collision detector; returns area of overlap (if any) in pixels between dd.elements 'objectA' and 'objectB'
// http://www.gamedev.net/reference/articles/article754.asp
function boxOverlap(objectA, objectB) {
	var objAxTL = objectA.x; // AX1 - xTopLeft
	var objAyTL = objectA.y; // AY1 - yTopLeft
	var objAxBR = objectA.x + objectA.w; // AX2 - xBottomRight
	var objAyBR = objectA.y + objectA.h; // AY2 - yBottomRight
	var objBxTL = objectB.x; // BX1
	var objByTL = objectB.y; // BY1
	var objBxBR = objectB.x + objectB.w; // BX2
	var objByBR = objectB.y + objectB.h; // BY2
	/*
	reject the following conditions:
	AX2<BX1
	AY2<BY1
	BX2<AX1
	BY2<AY1
	*/
	if (objAxBR < objBxTL) return -1;
	if (objAyBR < objByTL) return -1;
	if (objBxBR < objAxTL) return -1;
	if (objByBR < objAyTL) return -1;
	var objCxTL;
	var objCyTL;
	var objCxBR;
	var objCyBR;
	/*
	If AX1<BX1 then CX1=BX1 and CX2=AX2, otherwise, CX1=AX1 and CX2=BX2
	If AY1<BY1 then CY1=BY1 and CY2=AY2, otherwise, CY1=AY1 and CY2=BY2
	*/
	if (objAxTL < objBxTL) {
		objCxTL = objBxTL;
		objCxBR = objAxBR;
	}
	else {
		objCxTL = objAxTL;
		objCxBR = objBxBR;
	}
	if (objAyTL < objByTL) {
		objCyTL = objByTL;
		objCyBR = objAyBR;
	}
	else {
		objCyTL = objAyTL;
		objCyBR = objByBR;
	}
	return (objCxBR - objCxTL) * (objCyBR - objCyTL);
}
// returns 'dd.elements' target object with greatest overlapping area (if any), otherwise null
function dropCell() {
	var cell = null;
	var area = -1;
	try{
	for (var i=0; i<dropTargets.length; i++)
		if (dd.obj.name != dropTargets[i]) {
			var overlap = boxOverlap(dd.obj, dd.elements[dropTargets[i]] );
			if (overlap > area) {
				area = overlap;
				cell = dd.elements[dropTargets[i]];
			}
		}
	}catch(e){
        alert("dropCell 248 "+e.description);
	}
	return cell;
}
/* -- end of DropZone class -- */
/* -- start of TextZone class -- */
function textZone_handleClick(id) {
    for(i=0; i < textZones.length; i++) {
        if(textZones[i].name == id) {
            textZones[i].handleClick();
            textZones[i].handleOff();
            break;
        }
    }
}
function textZone_handleOn(id) {
    for(i=0; i < textZones.length; i++) {
        if(textZones[i].name == id) {
            textZones[i].handleOn();
            break;
        }
    }
}
function textZone_handleOff(id) {
    for(i=0; i < textZones.length; i++) {
        if(textZones[i].name == id) {
            textZones[i].handleOff();
            break;
        }
    }
}
function _TextZone_write() {
    var tip = (this.type == "page-text") ? msg.enterDescription : msg.enterCaption;
    //產生layer

    if(this.text!=null && this.text!= ''){
        if(this.font !=""){
             genLayerBegin(this.name, this.left, this.top, this.width, this.height, true, this.zIndex,"textCaption"+textZone.font);
        }else{
            genLayerBegin(this.name, this.left, this.top, this.width, this.height, true, this.zIndex,"textCaption");
        }
        genLayerBegin(this.name, this.left, this.top, this.width, this.height, true, this.zIndex,"textCaption");
        document.write('<div title="'+ tip +'" style="cursor: pointer" onmouseover="textZone_handleOn(\'' + this.name + '\')" onmouseout="textZone_handleOff(\'' + this.name + '\')" onclick="textZone_handleClick(\'' + this.name + '\')"><font color="'+this.fontColor+'">' +this.text+'</font></div>');
    }else{
        //document.write(dzMsgHTML(tip, this.width, this.height, true));
        genLayerBegin(this.name, this.left, this.top, this.width, this.height, true, this.zIndex,"textBasic3");
        if(this.imageURL!=""){
            document.write('<div title="'+ tip +'" style="cursor: pointer" onmouseover="textZone_handleOn(\'' + this.name + '\')" onmouseout="textZone_handleOff(\'' + this.name + '\')" onclick="textZone_handleClick(\'' + this.name + '\')">' +dzMsgHTML(tip, this.width, this.height, true)+'</div>');
        }else{
            document.write(dzMsgHTML(tip, this.width, this.height, true));
        }
    }
    genLayerEnd();

    var textDiv = document.getElementById(this.name);
    textDiv.align = this.justification;
}
function _TextZone_border(color) {
    if (color == "transparent")
        setStroke(this.name, tranBorderStyle);
    else
        setStroke(this.name, "solid " + color + " 1px");
}
function _TextZone_handleOn() {
    this.border(orange);
}
function _TextZone_handleOff() {
    this.border((this.text) ? "transparent" : gray);
}
function _TextZone_setHasPicture(value) {
    this.hasPicture(value);
}

function ReplaceAll(strOrg,strFind,strReplace){
    var index = 0;
    while(strOrg.indexOf(strFind,index) != -1){
        strOrg = strOrg.replace(strFind,strReplace);
        index = strOrg.indexOf(strFind,index);
    }
    return strOrg
}


function _TextZone_setText(text) {
	this.text = text;
	text = convertSmartQuotes(text);
	this.text = text;
    var textDiv = document.getElementById(this.name);
    var tip = (this.type == "page-text") ? msg.enterDescription : msg.enterCaption;
    if(this.text!=""){
        textDiv.align = this.justification;
        if(this.font !=""){
           textDiv.className = "textCaption"+this.font;
        }else{
           textDiv.className = "textCaption";
        }
        textDiv.innerHTML = '<div title="'+ tip +'" style="cursor: pointer" onmouseover="textZone_handleOn(\'' + this.name + '\')" onmouseout="textZone_handleOff(\'' + this.name + '\')" onclick="textZone_handleClick(\'' + this.name + '\')"><font color="'+this.fontColor+'">' + ReplaceAll(this.text,"\n","<br/>")+'</font></div>';
    }else{
        if(this.imageURL!=""){
            textDiv.innerHTML = '<div title="'+ tip +'" style="cursor: pointer" onmouseover="textZone_handleOn(\'' + this.name + '\')" onmouseout="textZone_handleOff(\'' + this.name + '\')" onclick="textZone_handleClick(\'' + this.name + '\')">'+dzMsgHTML(tip, this.width, this.height, true)+'</div>';
        }else{
            textDiv.innerHTML = dzMsgHTML(tip, this.width, this.height, true);
        }
    }
	this.showMessage();
	this.border((text) ? "transparent" : gray);
}
function convertSmartQuotes(text) {
    var newText = "";
    for(i = 0; i < text.length; i++){
    if(text.charAt(i) == '\u201C' || text.charAt(i) == '\u201D'){
        newText += '"';
    } else if(text.charAt(i) == '\u2018' || text.charAt(i) == '\u2019') {
        newText += '\'';
    } else
        newText += text.charAt(i);
}
    return newText;
}
function _TextZone_setLimit(limit) {
    this.limit = limit;
}
function _TextZone_setJustification(justification) {
    this.justification = justification;
}
function _TextZone_setFontColor(fontColor) {
    this.fontColor = fontColor;
}
function _TextZone_setFont(font) {
    this.font = font;
}
function _TextZone_hide() {
    setIdProperty(this.name, "visibility", hideName);
}
function _TextZone_show() {
    setIdProperty(this.name, "visibility", showName);
}
function _TextZone_handleClick() {
    dbg(this.text);
    box.setText(this.text);
    box.setLimit(this.limit);
    if(this.imageURL == '') {
        box.setImageURL(photo_space_img);
    } else {
        box.setImageURL(this.imageURL);
    }
    box.setTextZone(this.name);
    box.setJustification(this.justification);
    for(var k=0;k<document.textBox.color.length;k++){
        if(document.textBox.color[k].value == this.fontColor)
        {
            document.textBox.color[k].selected = true;
        }
    }
    for(var k=0;k<document.textBox.font.length;k++){
        if(document.textBox.font[k].value == this.font)
        {
            document.textBox.font[k].selected = true;
        }
    }
    var page = new Number(this.pageIndex).valueOf();
    if(this.type == 'page-text') {
        box.setHeading("Edit Page Description for page " + (parseInt(this.pageIndex)+2));
    } else {
        box.setHeading("編輯描述");
    }
    box.show();
}
function TextZone(name, left, top, width, height, visible, zIndex, type, hasPicture,
    pageIndex, imageName, text, imageURL, limit, justification, associatedDropZoneID,fontColor,font) {
    this.name = name;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.visible = visible;
    this.zIndex = zIndex;
    this.type = type;
    this.hasPicture = hasPicture;
    this.pageIndex = pageIndex;
    this.text = text;
    this.imageURL = imageURL;
    this.imageName = imageName;
    this.limit = limit;
    this.justification = justification;
    this.type = type;
    this.associatedDropZoneID = associatedDropZoneID;
    this.fontColor = fontColor;
    this.font = font;
    return this;
}
TextZone.prototype.showMessage = function() {
    //setIdProperty(("dzMsg"+this.name), "visibility", ((this.text) ? hideName : showName));
}
TextZone.prototype.write = _TextZone_write;
TextZone.prototype.border = _TextZone_border;
TextZone.prototype.setText = _TextZone_setText;
TextZone.prototype.show = _TextZone_show;
TextZone.prototype.hide = _TextZone_hide;
TextZone.prototype.handleClick = _TextZone_handleClick;
TextZone.prototype.setLimit = _TextZone_setLimit;
TextZone.prototype.setJustification = _TextZone_setJustification;
TextZone.prototype.setFontColor = _TextZone_setFontColor;
TextZone.prototype.setFont = _TextZone_setFont;
TextZone.prototype.handleOn = _TextZone_handleOn;
TextZone.prototype.handleOff = _TextZone_handleOff;
/* -- end of DropZone class -- */
