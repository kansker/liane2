//_TextZone_handleClick:處理text zone按下,跳出視窗
//var que ：照片更新
var msg = {
    viewTools: "點擊可顯示影像工具列",
    dropPicture: "圖片拖拉到此",
    enterDescription: "在這裡輸入頁描述",
    enterCaption: "編輯文字"
}
var photo_space_img = "images/sp.gif";//透明圖

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
		alert("unable to find object for id:: " + id);
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
	$j("#"+id).css("border", style);
}
var gray = "#ccc"; // normal border color
var blue = "#1A8FFC"; // target border color
var green = "#9c3"; // target border color
var orange = "#f90"; // 'onMouseOver' border color
var clickID = ""; // id of clicked dropZone
function overOn(id) {
    if (clickID == "" && dd.dragOn) {
        var dzOver = dzObj(id);
        if (dzOver.hasPicture){
            dzOver.border2(orange);
        }
    }
}
function overOff(id) {
    if (clickID == "") {
        var dzOver = dzObj(id);
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
DropZone.prototype.setPicture = function(viewID, thumbURL,text) {
	this.viewID = viewID;
	this.thumbURL = thumbURL;
    this.hasPicture = (this.viewID) ? true : false;
    if(this.hasPicture==true){
    	$(this.name).style.visibility = "visible";
    }else{
    	$(this.name).style.visibility = "hidden";
    }
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
   	que.update(this.imageName, thumbURL);//@kker
}
DropZone.prototype.clearPicture = function() {
	var textZone = findTextZone(this.assocDropZoneID, this.pageIndex);
    if(textZone!=null){
        var tip = (this.type == "page-text") ? msg.enterDescription : msg.enterCaption;
        textZone.text = "";
        var textDiv = document.getElementById(textZone.name);
        textDiv.innerHTML = dzMsgHTML(tip, textZone.width, textZone.height, true);
    }
	que.update(this.imageName,photo_space_img);//@kker
	this.thumbURL = this.viewID = "";
	this.hasPicture = false;
}
DropZone.prototype.resetZ = function() {
	
    $("dzMsg"+this.name).style.zIndex = this.zIndex*1;//底框灰
    $(this.name).style.zIndex = this.zIndex*1+1;//圖
   	$(this.name+"_tool1").style.zIndex = this.zIndex*1+2;//工具
   	$(this.name+"_tool2").style.zIndex = this.zIndex*1+2;//工具
   	$(this.name+"_tool3").style.zIndex = this.zIndex*1+2;//工具
   	dd.elements[this.name].setDraggable(true);
}
DropZone.prototype.free = function() {
	$('main-page').removeChild($("dzMsg"+this.name));
	$('main-page').removeChild($(this.name));
	$('main-page').removeChild($(this.name+"_tool1"));
	$('main-page').removeChild($(this.name+"_tool2"));
	$('main-page').removeChild($(this.name+"_tool3"));
}
DropZone.prototype.write = function() {
    //置圖區底層 kker
    var zoneDiv = addDiv("main-page","dzMsg"+this.name,this.left, this.top, this.width, this.height,(!this.hasPicture),this.zIndex);
	if(this.thumbURL == ""){
		//photo_space_img
		addImage("main-page",this.name,"pics/titlepage.jpg",this.left, this.top,this.width,this.height,this.visible,this.zIndex+1);
	}else{
		addImage("main-page",this.name,this.thumbURL,this.left, this.top,this.width,this.height,this.visible,this.zIndex+1);
	}
  	//ADD_DHTML(this.name);	
	 $j("#"+this.name).mouseover(
		 	function(){  
                overOn($j(this)[0].id);
            }
		 );
	 $j("#"+this.name).mouseout(
		 	function(){  
                overOff($j(this)[0].id);
            }
		 );
}
DropZone.prototype.initTool = function() {
    var warn =false;
	var tshow=false;
	if(this.thumbURL != ""){
		tshow=true;
	}   
    var t1 = addImage("main-page",this.name+"_tool1","images/icon_cutimg.gif",this.left, this.top, 20, 20,tshow,this.zIndex+2);
    var t2 = addImage("main-page",this.name+"_tool2","images/icon_delmg.gif",this.left+20, this.top, 20, 20,tshow,this.zIndex+2);
    var t3 = addImage("main-page",this.name+"_tool3","images/icon_warn.gif",this.left, this.top, 20, 20,tshow,this.zIndex+2);
    ADD_DHTML(t1.id);
    ADD_DHTML(t2.id);
    ADD_DHTML(t3.id);
  
    $j("#"+this.name+"_tool1").click(
		 	function(){  
                enhancePicture($j(this)[0].id.substr(0,$j(this)[0].id.length-6));
            }
		 );
    $j("#"+this.name+"_tool2").click(
		 	function(){  
                removePic($j(this)[0].id.substr(0,$j(this)[0].id.length-6));
            }
		 );
    $j("#"+this.name+"_tool3").click(
		 	function(){  
                enhancePicture($j(this)[0].id.substr(0,$j(this)[0].id.length-6));
            }
		 );
    
    $j("#"+this.name+"_tool1").mouseover(
		 	function(){  
                disabledZone($j(this)[0].id.substr(0,$j(this)[0].id.length-6));
            }
		 );
    $j("#"+this.name+"_tool2").mouseover(
		 	function(){  
                disabledZone($j(this)[0].id.substr(0,$j(this)[0].id.length-6));
            }
		 );
    
    $j("#"+this.name+"_tool3").mouseover(
		 	function(){  
                disabledZone($j(this)[0].id.substr(0,$j(this)[0].id.length-6));
            }
		 );
    
    $j("#"+this.name+"_tool1").mouseout(
		 	function(){  
                enabledZone($j(this)[0].id.substr(0,$j(this)[0].id.length-6));
            }
		 );
    $j("#"+this.name+"_tool2").mouseout(
		 	function(){  
                enabledZone($j(this)[0].id.substr(0,$j(this)[0].id.length-6));
            }
		 );
    
    $j("#"+this.name+"_tool3").mouseout(
		 	function(){  
                enabledZone($j(this)[0].id.substr(0,$j(this)[0].id.length-6));
            }
		 );
}
function disabledZone(clickID) {
	dd.elements[clickID].setDraggable(false);
}
function enabledZone(clickID) {
	dd.elements[clickID].setDraggable(true);
}
tranBorderStyle = (is_ie) ? "solid white 0" : "solid transparent 2px"; // win IE has a problem with transparent
DropZone.prototype.border = function(color) {
    if (color == "transparent" || this.hasPicture == false){
        setStroke(this.name, tranBorderStyle);
    }else{
        setStroke(this.name, "solid " + color + " 2px");
    }
}

DropZone.prototype.border2 = function(color) {
    if (color == "transparent" || this.hasPicture == false){
        //var bimg = getIdProperty("dzImg_"+this.name);
        var bimg = getIdProperty(this.name);//@kker
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
        //$j("#dzMsg"+this.name).css("border", tranBorderStyle);
    }else{
        if(this.width-1 >=0 && this.height-1 >=0){
            //var bimg = getIdProperty("dzImg_"+this.name);
            var bimg = getIdProperty(this.name);//@kker
            bimg.width = this.width-1;
            bimg.height = this.height-1;
            bimg.style.width = (this.width-1)+"px";
            bimg.style.height = (this.height-1)+"px";
            bimg = getIdProperty(this.name);
            bimg.width = this.width-1;
            bimg.height = this.height-1;
            bimg.style.width = (this.width-1)+"px";
            bimg.style.height = (this.height-1)+"px";
        }
        setStroke(this.name, "solid " + color + " 2px");
        //$j("#dzMsg"+this.name).css("border", "solid "+color+" 2px");
    }
}
DropZone.prototype.getAssociatedText = function() {
    var textZone = findTextZone(this.assocDropZoneID, this.pageIndex);
    if(textZone != null) {
        return textZone.text;
    }
    return null;
}
function boxOverlap(objectA, objectB) {
	if(objectB==null || objectB.id == null){
		return -1;
	}
	var objAxTL = $j("#"+objectA.id).offset().left;// objectA.x; // AX1 - xTopLeft
	var objAyTL = $j("#"+objectA.id).offset().top;//objectA.y; // AY1 - yTopLeft
	var objAxBR = $j("#"+objectA.id).offset().left+$j("#"+objectA.id)[0].style.pixelWidth*1;//objectA.x + objectA.w; // AX2 - xBottomRight
	var objAyBR = $j("#"+objectA.id).offset().top+$j("#"+objectA.id)[0].style.pixelHeight*1;//objectA.y + objectA.h; // AY2 - yBottomRight
	var objBxTL = $j("#"+objectB.id).offset().left;//objectB.x; // BX1
	var objByTL = $j("#"+objectB.id).offset().top;//objectB.y; // BY1
	var objBxBR = $j("#"+objectB.id).offset().left+$j("#"+objectB.id)[0].style.pixelWidth*1;//objectB.x + objectB.w; // BX2
	var objByBR =$j("#"+objectB.id).offset().top+$j("#"+objectB.id)[0].style.pixelHeight*1;// objectB.y + objectB.h; // BY2
	
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
			if (overlap > area && dzObj(dropTargets[i]).visible == true) {
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
    if(this.text!=null && this.text!= ''){
    	var textDiv = addDiv("main-page",this.name,this.left, this.top, this.width, this.height,true,this.zIndex);
    	if(this.font !=""){
    		textDiv.setAttribute("className", "textCaption"+this.font); 
    	}else{
    		textDiv.setAttribute("className", "textCaption"); 
    	}
        textDiv.innerHTML = '<div title="'+ tip +'" style="cursor: pointer" onmouseover="textZone_handleOn(\'' + this.name + '\')" onmouseout="textZone_handleOff(\'' + this.name + '\')" onclick="textZone_handleClick(\'' + this.name + '\')"><font color="'+this.fontColor+'">' +this.text+'</font></div>';
    }else{
        //document.write(dzMsgHTML(tip, this.width, this.height, true));
    	var textDiv = addDiv("main-page",this.name,this.left, this.top, this.width, this.height,true,this.zIndex);
    	textDiv.setAttribute("className", "textBasic3");
    	textDiv.innerHTML = dzMsgHTML(tip, this.width, this.height, true);
        if(this.imageURL!=""){
           textDiv.innerHTML = '<div title="'+ tip +'" style="cursor: pointer" onmouseover="textZone_handleOn(\'' + this.name + '\')" onmouseout="textZone_handleOff(\'' + this.name + '\')" onclick="textZone_handleClick(\'' + this.name + '\')">' +dzMsgHTML(tip, this.width, this.height, true)+'</div>';
        }else{
           textDiv.innerHTML = dzMsgHTML(tip, this.width, this.height, true);
        }
    }
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
	if(this.width*1>0 && this.height*1>0){
    	setIdProperty(this.name, "visibility", showName);
    }else{
    	 setIdProperty(this.name, "visibility", hideName);
    }
}
function _TextZone_handleClick() {
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
    //alert("box.show()");
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
TextZone.prototype.free = function() {
	$('main-page').removeChild($(this.name));
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