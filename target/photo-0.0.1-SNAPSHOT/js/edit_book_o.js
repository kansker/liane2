//setPicture 設定 區塊圖形
/** startup
*  Revel handlers, avoid race conditions
*  caller - document.onload
*
*  kb
*/
function initPage() {
	setDraggableImages(true);
    setDefaultBorder();
}
function albumElement(viewID, viewURI, textCaption,d,w,h,newURI) {
	// constructor for 'albumList' object
	this.viewID  = viewID;
	this.viewURI = viewURI;
    this.newURI = newURI;
	this.textCaption = textCaption;
	this.isUsed = false;
    if(w=="" || h == ""){
        w= d;
        h= d;
    }else if(w>h){
        this.width = d ;
        this.height = Math.round((d/w)*h);
    }else{
        this.height = d ;
        this.width = Math.round((d/h)*w);
    }
}
function albumData(viewID, viewURI, textCaption,d,w,h,newURI,category,cw,ch) {
	// constructor for 'albumList' object
	this.viewID  = viewID;
	this.viewURI = viewURI;
    this.newURI = newURI;
	this.textCaption = textCaption;
	this.isUsed = false;
    this.dv = d;
    this.category = category;
    this.cw = cw;
    this.ch = ch;
    if(w=="" || h == ""){
        w= d;
        h= d;
    }else if(w>h){
        this.width = d ;
        this.height = Math.round((d/w)*h);
    }else{
        this.height = d ;
        this.width = Math.round((d/h)*w);
    }
}
function albumDataObj(viewID) {
	// return 'albumElement' object by 'viewID'
	for (var j=0; j < albumDataList.length; j++) {
		if (albumDataList[j].viewID == viewID)
			return albumDataList[j];
	}
	return null;
}
function albumObj(viewID) {
	// return 'albumElement' object by 'viewID'
	for (var j=0; j < albumList.length; j++) {
		if (albumList[j].viewID == viewID)
			return albumList[j];
	}
	return null;
}
function dropZoneObj(viewID) {
	// return 'DropZone' object by 'viewID'
	for (var i=0; i < imageDropZones.length; i++) {
		if (imageDropZones[i].viewID == viewID) return imageDropZones[i];
	}
	return null;
}
function albumIndex(viewID) {
	// return 'albumList' index by 'viewID'
	for (var j=0; j < albumList.length; j++) {
		if (albumList[j].viewID == viewID) return j;
	}
	return null;
}
function getTotUnusedAlbum() {
	return albumList.length;
}

//讀取相片清單選擇列
function albumPage(pauseDrag) {
	pauseDrag = pauseDrag || false;
	// display thumbnails for 'albumCurrPage'
	albumTray = new Array(albumNumThumbs);
	var numToSkip = (albumCurrPage-1) * albumNumThumbs;
	var totShown = 0;
	for (var i=0; i < albumList.length; i++) {
		if (!albumList[i].isUsed) {
			if (numToSkip > 0) {
				numToSkip--;
			}
			else {
				albumTray[totShown] = albumList[i];
				dd.elements["img" + totShown].swapImage(albumList[i].viewURI, true);
                dd.elements["img" + totShown].resizeTo(albumList[i].width,albumList[i].height);
				dd.elements["img" + totShown].setDraggable(!pauseDrag);
				totShown++;
				if (totShown == albumNumThumbs) break;
			}
		}
	}
	while (totShown < albumNumThumbs) {
		dd.elements["img" + totShown].swapImage(blankImg.src, true);
		dd.elements["img" + totShown].setDraggable(false);
		totShown++;
	}

	// display number unused pictures and page number
	var totUnused = getTotUnusedAlbum();
	var maxPage = Math.ceil(totUnused / albumNumThumbs);
	if (document.getElementById) {
		document.getElementById("albumUnused").innerHTML = totUnused;
		if (totUnused == 1){
			document.getElementById("albumUnusedText").innerHTML = "張圖未使用,目前為：";
		}else{
			document.getElementById("albumUnusedText").innerHTML = "張圖未使用,目前為：";
		}
		// rhernandez: There was a problem when displaying the amount of unused pictures the first time that the user landed on this page.
		if(albumCurrPage != 0){
			var pic_start = albumCurrPage * albumNumThumbs - albumNumThumbs + 1;
			var pic_end = ((albumCurrPage * albumNumThumbs +1) > totUnused) ? totUnused : (albumCurrPage * albumNumThumbs);
			document.getElementById("albumThumbsVisible").innerHTML = pic_start + " - " + pic_end;
		}
		else{
			var pic_start = 1 * albumNumThumbs - albumNumThumbs + 1;
			var pic_end = ((1 * albumNumThumbs +1) > totUnused) ? totUnused : (1 * albumNumThumbs);
			document.getElementById("albumThumbsVisible").innerHTML = pic_start + " - " + pic_end;
		}
	}
	// kb: set back to new last page if current page contains no thumbs
	if ((albumCurrPage * albumNumThumbs) - albumNumThumbs >= totUnused) {
		var lastPage = ((totUnused > 0) ? (parseInt((totUnused -1) / albumNumThumbs) +1) : 1);
		if (albumCurrPage > lastPage) {
			albumCurrPage = lastPage;
			albumPage(pauseDrag);
			return;
		}
	}
}


function pageAlbum(prevNext) {
	var totUnused = getTotUnusedAlbum();
	var maxPage = Math.ceil(totUnused / albumNumThumbs);
	if (prevNext == 2) {
		albumCurrPage = maxPage;
	}
	else if (prevNext == 0) {
		albumCurrPage = 1;
	}
	else {
		albumCurrPage = albumCurrPage + prevNext;
		if (albumCurrPage < 1) albumCurrPage = maxPage;
		else if (albumCurrPage > maxPage) albumCurrPage = 1;
	}
	setTimeout("albumPage()", 10);
}


function dzObj(name) {
	// return 'imageDropZones' object by 'name'
	for (var j=0; j < imageDropZones.length; j++)
		if (imageDropZones[j].name == name) return imageDropZones[j];
			return null;
}
function showTools() {
    //dbg("show");
	for (var j=0; j < imageDropZones.length; j++){
        //dbg(imageDropZones[j].hasPicture);
        if(!imageDropZones[j].hasPicture)
            continue;
        var t1 = document.getElementById(imageDropZones[j].name+"_tool1");
        var t3 = document.getElementById(imageDropZones[j].name+"_tool3");
        if(t1!=null){
            var alobj = albumDataObj(imageDropZones[j].viewID);
            var r1 = imageDropZones[j].width / imageDropZones[j].height;
            var r2 = alobj.cw / alobj.ch;
            var r3 = (r2-r1)/r1;
            if(r3 > 0.02 || r3 <= -0.02){
                t3.style.visibility = "visible";
                t1.style.visibility = "hidden";
            }else{
                t1.style.visibility = "visible";
                t3.style.visibility = "hidden";
            }
        }
        var t2 = document.getElementById(imageDropZones[j].name+"_tool2");
        if(t2!=null){
            t2.style.visibility = "visible";
        }
    }
}
function hideTools() {
	for (var j=0; j < imageDropZones.length; j++){
        var t1 = document.getElementById(imageDropZones[j].name+"_tool1");
        if(t1!=null){
            t1.style.visibility = "hidden";
        }
        var t3 = document.getElementById(imageDropZones[j].name+"_tool3");
        if(t3!=null){
            t3.style.visibility = "hidden";
        }
        var t2 = document.getElementById(imageDropZones[j].name+"_tool2");
        if(t2!=null){
            t2.style.visibility = "hidden";
        }
    }
}
function hideToolsById(id) {
	for (var j=0; j < imageDropZones.length; j++){
        if (imageDropZones[j].name != id) continue;
        var t1 = document.getElementById(imageDropZones[j].name+"_tool1");
        if(t1!=null){
            t1.style.visibility = "hidden";
        }
        var t2 = document.getElementById(imageDropZones[j].name+"_tool2");
        if(t2!=null){
            t2.style.visibility = "hidden";
        }
        var t3 = document.getElementById(imageDropZones[j].name+"_tool3");
        if(t3!=null){
            t3.style.visibility = "hidden";
        }
    }
}
function setPicture(dropzone, viewID, text) {
	var isEmpty = (viewID == "");
	if (isEmpty){
		dropzone.clearPicture();
	}else{
        //var obj1 = albumObj(viewID);
        var alobj = albumDataObj(viewID);
        alobj.isUsed = true;
        if(alobj.newURI!=""){
            dropzone.setPicture(viewID, alobj.newURI, text);
        }else{
            dropzone.setPicture(viewID, alobj.viewURI, text);
        }
	}
	dd.elements[dropzone.name].setDraggable(!isEmpty);
	try{
		//document.images["dzImg_" + dropzone.name].src = blankImg.src; // hide stretched thumbnail
	}catch(e){
		alert("setPicture error");
	}
}
//function hideTools() {
//	var temp = clickID;
//	clickID = "";
//	overOff(temp);
//	// rhernandez: Change limit to "6" instead of "5" since we added a new contextual button
//	for (var t=0; t<2; t++) dd.elements["toolPalette" + t].hide();
//}
function picRemove(id) {
	// remove pic from dropZone, restore to 'albumTray'
    dbg("picRemove---id:"+id);
	var toRemove = dzObj(id);
    var alobj = albumDataObj(toRemove.viewID);
    if(alobj!=null){
        dbg("picRemove---toRemove.viewID:"+toRemove.viewID);
        var nowCategory = document.getElementById("nowCategory");
        if(nowCategory[nowCategory.selectedIndex].value==alobj.category ||
            nowCategory.selectedIndex==0){
            albumList[albumList.length] = new albumElement(toRemove.viewID, alobj.viewURI, toRemove.getAssociatedText(),alobj.dv,alobj.width,alobj.height,alobj.newURI);
        }
        alobj.isUsed = false;
    }
	//albumList.push(new albumElement(toRemove.viewID, toRemove.thumbURL, toRemove.getAssociatedText()));
	setPicture(toRemove, "","");
	//albumPage(); // comment out extra call
}
function removePic(id) {
	picRemove(id);
	setTimeout("albumPage()", 10);
	hideToolsById(id);
}
//圖塊被選準備備拖曳時
function itemPicked(fromAlbum, ddObj, viewID, name) {
	// constructor for 'pickedItem' object
	try{
		this.fromAlbum = fromAlbum;
		this.x = ddObj.x;
		this.y = ddObj.y;
		this.w = ddObj.w;
		this.h = ddObj.h;
		this.viewID = viewID;
		this.name = name; // 'null' when 'fromAlbum==true'
	}catch(e){
			alert("itemPicked error");
	}
}
var pickedItem = null;
var clickTime = new Date(); // reset by 'my_PickFunc()'
var tookDragCheck = false;
function my_PickFunc() {
	pickedItem = null;
	if (dd.obj.name.indexOf("toolPalette") == 0) { // from toolPalette
		pickedItem = new itemPicked(false, dd.obj, "toolPalette", dd.obj.name);
	}else if(dd.obj.name.indexOf("text") == 0){
		pickedItem = new itemPicked(false, dd.obj, "text-rect", dd.obj.name);
	}else if(dd.obj.name == "caption"){
        hideGrips();
	}else if(dd.obj.name.indexOf("cap_") == 0){
        var i = 4; 
        while (i--)
        {
            if (grips[i] != dd.obj){
                //grips[i].hide();
            } 
        }
	}else {
		if (dd.obj.name.indexOf("img") == 0) {
			// from album area
			var cellFrom = parseInt(dd.obj.name.substr("img".length,1));
            if(albumTray[cellFrom]==null)
                return;
			pickedItem = new itemPicked(true, dd.obj, albumTray[cellFrom].viewID);
		}
		else if (dd.obj.name.indexOf("image") == 0) {
            tookDragCheck= true;
			// from dropZone
			var pickedZone = dzObj(dd.obj.name);
			//pickedZone.border("black");
			pickedItem = new itemPicked(false, dd.obj, pickedZone.viewID, pickedZone.name);
			try{
				document.images["dzImg_" + pickedZone.name].src = dropZoneObj(pickedZone.viewID).thumbURL;
			}catch(e){
				alert("my_PickFunc error");
			}
			clickTime = new Date();
		}
	}
}

var cellToHighlight = "";
var backToTray = 0;
function my_DragFunc() {
    if( pickedItem== null){
        if (dd.obj == rb)
        {
            if(rb.x-lb.x > 5 && rb.y-rt.y > 5){
                caption.resizeTo(rb.x-lb.x, rb.y-rt.y);
            }
        }
        else if (dd.obj == rt)
        {
            if(rt.x-lt.x > 5 && rb.y-rt.y > 5){
                caption.resizeTo(rt.x-lt.x, rb.y-rt.y);
                caption.moveTo(rt.x-caption.w+rt.w/2, rt.y+rt.h/2);
            }
        }
        else if (dd.obj == lb)
        {
            if(rb.x-lb.x > 5 && lb.y-lt.y > 5){
                caption.moveTo(lb.x+lb.w/2, lt.y+lt.h/2);
                caption.resizeTo(rb.x-lb.x, lb.y-lt.y);
            }
        }
        else if (dd.obj == lt)
        {
            if(rt.x-lt.x>5 && lb.y-lt.y > 5){
                caption.moveTo(lt.x+lt.w/2, lt.y+lt.h/2);
                caption.resizeTo(rt.x-lt.x, lb.y-lt.y);
            }
        }
        return;
    }
	if (dd.obj.name.indexOf("toolPalette") != 0) {
        if(tookDragCheck){
            hideTools();
            tookDragCheck=false;
        }
		if (cellToHighlight != "") { // disable previous highlight
			dzObj(cellToHighlight).border(blue);
			cellToHighlight = "";
		}
		if (backToTray) {
			//setStroke("thumbs", "solid "+ blue +" 2px");
			backToTray = 0;
		}
		var toCell = dropCell();
		if (toCell != null) {// over "snap to" target cell - HIGHLIGHT CELL when hovering
			if (toCell.viewID != pickedItem.viewID) { // avoid highlighting self
				cellToHighlight = toCell.name;
				dzObj(cellToHighlight).border2(green);//被碰的圖塊變色
			}
		}
		else if ((dd.obj.name.indexOf("img") != 0) && (boxOverlap(dd.obj, pickedItem) == -1)) {
			backToTray = 1;
			//setStroke("thumbs", "solid "+ green +" 2px");
		}
	}
}

var clickTimer = (is_mac && is_ie) ? 1400 : 400; // too fast and tools don't show - too slow and drag back to tray fails

function my_DropFunc() {
    if( pickedItem== null){
        if(caption.x < pg.x){
            caption.resizeTo(caption.x + caption.w - pg.x, caption.h);
            caption.moveTo(pg.x,caption.y);
        }
        if(caption.y < pg.y){
            caption.resizeTo(caption.w,caption.y + caption.h - pg.y);
            caption.moveTo(caption.x,pg.y);
        }
        if(caption.x + caption.w > pg.x + pg.w){
            caption.resizeTo(pg.x + pg.w - caption.x, caption.h);
        }
        if(caption.y + caption.h > pg.y + pg.h){
            caption.resizeTo(caption.w, pg.y + pg.h - caption.y);
        }
        if(caption.w<0){
            caption.resizeTo(10, caption.h);
        }
        if(caption.h<0){
            caption.resizeTo(caption.x, 10);
        }
        write_back_func();
        showGrips();
        return;
    }
    if(pickedItem.viewID == "text-rect"){
        dbg("**---2");
	}else {
        dbg("**---3");
		var dropTime = new Date();
		var toCell = dropCell();
		var bookAlbumObj = null;

		if (toCell != null) {
			dd.obj.moveTo(toCell.x, toCell.y); // "snap to" target cell feature - NOT NEEDED?
			var dzTarget = dzObj(toCell.name);
				if (pickedItem.fromAlbum) {
					var textCaption = albumList[albumIndex(pickedItem.viewID)].textCaption;
					if (dzTarget.hasPicture) {
						dbg("swap:"+textCaption);
                        var alobj = albumDataObj(dzTarget.viewID);
                        alobj.isUsed = false;
                        dbg("alobj.dv:"+alobj.dv);
						bookAlbumObj = new albumElement(dzTarget.viewID, alobj.viewURI, dzTarget.getAssociatedText(),alobj.dv,alobj.width,alobj.height,alobj.newURI);
						setPicture(dzTarget, pickedItem.viewID, textCaption);
                        var nowCategory = document.getElementById("nowCategory");
                        if(nowCategory[nowCategory.selectedIndex].value == alobj.category
                            || nowCategory.selectedIndex==0){
                            albumList[albumIndex(dzTarget.viewID)] = bookAlbumObj ; // restore existing pic to 'albumTray'
                        }else{
						    var i = parseInt(albumIndex(pickedItem.viewID));
						    albumList = albumList.slice(0,i).concat(albumList.slice(i+1));
                        }
					}
					else {
						dbg("add:"+textCaption);
						setPicture(dzTarget, pickedItem.viewID, textCaption);
						var i = parseInt(albumIndex(pickedItem.viewID));
						albumList = albumList.slice(0,i).concat(albumList.slice(i+1));
					}
				}
				else if (pickedItem.viewID != dzTarget.viewID) { // 'pickedItem' from a dropZone so swap items
					dbg("bookswap");
					var dzSource = dzObj(pickedItem.name);
					swapPictures(dzTarget, dzSource);
				}
		}
		else if (pickedItem!=null && !pickedItem.fromAlbum){
			if (dropTime.getTime() - clickTime.getTime() < clickTimer) { // dropZone clicked, set border and show tool palette - 1400 for Mac IE
					clickID = pickedItem.name;
//					var dzOver = dzObj(clickID);
//					//document.images["dzImg_" + dzOver.name].src = blankImg.src; // hide thumbnail when using tools
//					dzOver.border(orange);
//					var xPos = pickedItem.x;
//					var yPos = pickedItem.y + pickedItem.h - dd.elements.toolPalette1.h;
//					// rhernandez: Change limit to "6" instead of "5" since we added a new contextual button
////					for (var t=0; t<2; t++) {
////						dd.elements["toolPalette" + t].moveTo(xPos + (t * dd.elements.toolPalette1.w), yPos); // bottom edge (doesn't work!)
////						dd.elements["toolPalette" + t].show();
////						dd.elements["toolPalette" + t].maximizeZ();
////					}
			}
		}
		else if (!pickedItem.fromAlbum && boxOverlap(dd.obj, pickedItem) == -1){
			picRemove(pickedItem.name); // dropZone pic droppped off all targets
		}

		// reset all borders
		cellToHighlight = "";
		for (var i=0; i < dropTargets.length; i++) {
            var dzTarget = dzObj(dropTargets[i]);
            if (dzTarget.name == clickID)
                dzTarget.border2(orange);
            else {
                dzTarget.border2(dropZoneBorder);
            }
		}
		//setStroke("thumbs", "solid white 2px");
		setTimeout("albumPage()", 10);
		dd.obj.moveTo(pickedItem.x, pickedItem.y); // always return to original position!
	}
    tookDragCheck=false;

    showTools();
}

function setDraggableImages(dragOn) {
	for (var i=0; i < imageDropZones.length; i++)
		if (imageDropZones[i].hasPicture)
			dd.elements[imageDropZones[i].name].setDraggable(dragOn);
	setTimeout("albumPage("+!dragOn+")", 10);
	dd.dragOn = dragOn;
//	if (!dragOn)
//		hideTools();
}

function findTextZone(dropZoneID, pageIndex) {
	if(dropZoneID != null && dropZoneID != "") {
		for(i=0; i < textZones.length; i++) {
			if(textZones[i].name.indexOf(dropZoneID) != -1 && textZones[i].pageIndex == pageIndex) {
				return textZones[i];
			}
		}
	}
	return null;
}
function findImageZone(dropZoneID) {
    if(dropZoneID != null && dropZoneID != "") {
        for(i=0; i < imageDropZones.length; i++) {
            if(imageDropZones[i].name.indexOf(dropZoneID) != -1) {
                return imageDropZones[i];
            }
        }
    }
    return null;
}
function showTextBox() {
    box.show();
}
function hideTextBox() {
    box.hide();
}
function swapPictures(dzTarget, dzSource) {
	var swap = [dzTarget.hasPicture, dzTarget.viewID, dzTarget.thumbURL];
//    dbg(swap[0]+"_"+swap[1]+"_"+swap[2]);
	que.update("dzImg_" + dzTarget.imageName, dzSource.thumbURL);
//    dbg(dzSource.hasPicture+"_"+dzSource.viewID+"_"+dzSource.thumbURL);
	dzTarget.hasPicture = dzSource.hasPicture;
	dzTarget.viewID = dzSource.viewID;
	dzTarget.thumbURL = dzSource.thumbURL;

	dzSource.hasPicture = swap[0];
	dzSource.viewID = swap[1];
	dzSource.thumbURL = swap[2];
    // Swap text zones.
    var textTarget = findTextZone(dzTarget.assocDropZoneID, dzTarget.pageIndex);
    var textSource = findTextZone(dzSource.assocDropZoneID, dzSource.pageIndex);
    if(textTarget != null && textSource != null) {
	    var temp = textTarget.text;
	    textTarget.text = textSource.text;
	    textSource.text = temp;

	    temp = textTarget.fontColor;
	    textTarget.fontColor = textSource.fontColor;
	    textSource.fontColor = temp;

	    temp = textTarget.font;
	    textTarget.font = textSource.font;
	    textSource.font = temp;

        temp = textTarget.imageURL;
        textTarget.imageURL = textSource.imageURL;
        textSource.imageURL = temp;
        var tip = (this.type == "page-text") ? msg.enterDescription : msg.enterCaption;
        var textDivTarget = document.getElementById(textTarget.name);
        var textDivSource = document.getElementById(textSource.name);
        if(textTarget.text!=""){
            if(textTarget.font !=""){
                textDivTarget.className = "textCaption"+textTarget.font;
            }else{
                textDivTarget.className = "textCaption";
            }
            textDivTarget.innerHTML = '<div title="'+ tip +'" style="cursor: pointer" onmouseover="textZone_handleOn(\'' + textTarget.name + '\')" onmouseout="textZone_handleOff(\'' + textTarget.name + '\')" onclick="textZone_handleClick(\'' + textTarget.name + '\')"><font color="'+textTarget.fontColor+'">' +textTarget.text+'</font></div>';
        }else{
            textDivTarget.innerHTML = '<div title="'+ tip +'" style="cursor: pointer" onmouseover="textZone_handleOn(\'' + textTarget.name + '\')" onmouseout="textZone_handleOff(\'' + textTarget.name + '\')" onclick="textZone_handleClick(\'' + textTarget.name + '\')">' +dzMsgHTML(tip, textTarget.width, textTarget.height, true)+'</div>';
        }
        if(textSource.text!=""){
            if(textSource.font !=""){
                textDivSource.className = "textCaption"+textSource.font;
            }else{
                textDivSource.className = "textCaption";
            }
	        textDivSource.innerHTML = '<div title="'+ tip +'" style="cursor: pointer" onmouseover="textZone_handleOn(\'' + textSource.name + '\')" onmouseout="textZone_handleOff(\'' + textSource.name + '\')" onclick="textZone_handleClick(\'' + textSource.name + '\')"><font color="'+textSource.fontColor+'">' +textSource.text+'</font></div>';
        }else{
            textDivSource.innerHTML = '<div title="'+ tip +'" style="cursor: pointer" onmouseover="textZone_handleOn(\'' + textSource.name + '\')" onmouseout="textZone_handleOff(\'' + textSource.name + '\')" onclick="textZone_handleClick(\'' + textSource.name + '\')">' +dzMsgHTML(tip, textSource.width, textSource.height, true)+'</div>';
        }
    } else if(textTarget != null && textSource == null) {
        //幾乎沒發生
	    // The target has a text box, the source does not.
        var textDivTarget = document.getElementById(textTarget.name);
        var textDivSource = document.getElementById(textSource.name);
        textTarget.imageURL = dzTarget.thumbURL;
	    textDivTarget.innerHTML = textDivSource.innerHTML;
	    if(dzSource.text != null) {
		    textTarget.text = dzSource.text;
	    }

    } else if(textTarget == null && textSource != null) {
//	    textSource.imageURL = dzSource.thumbURL;
//	    if(dzTarget.text != null) {
//		    textSource.text = dzTarget.text;
//	    }
    }

	dd.elements[dzSource.name].setDraggable(dzSource.hasPicture);
	//dzSource.showMessage();
	dd.elements[dzTarget.name].setDraggable(true);
	//dzTarget.showMessage();
    if(dzSource.thumbURL == "")
        setPicture(dzSource, "");
    else
    	que.update("dzImg_" + dzSource.name, dzSource.thumbURL); // hide stretched thumbnail

}
//
//function enhancePicture(dropZone) {
//    location.href = "edit_crod.ko?task=page&seq="+dropZone.viewID;
//}
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
function charFilter(st) {
  var newSt = "";
  for (var i=0; i<st.length; i++) {
    var aChar = st.charAt(i);
    if(aChar=='\\' || aChar=='\''){
    }else{
      newSt += aChar;
    }
  }
  return newSt;
}
function TextBox_handleUpdate() {
    var originalLength = box.getText().length;
    box.setText(charFilter(box.getText()));
    //document.textBox.textBox_text.value=foreignCharFilter(document.textBox.textBox_text.value);
    document.textBox.textBox_text.value=convertSmrtQuotes(document.textBox.textBox_text.value);
    if(originalLength == box.getText().length) {
        box.hide();
        for(i=0; i < textZones.length; i++) {
            if(textZones[i].name == box.getTextZone()) {
                textZones[i].setJustification(box.getJustification());
                for(var k=0;k<document.textBox.color.length;k++){
                    if(document.textBox.color[k].selected == true)
                    {
                        box.setFontColor(document.textBox.color[k].value);
                    }
                }
                for(var k=0;k<document.textBox.font.length;k++){
                    if(document.textBox.font[k].selected == true)
                    {
                        box.setFont(document.textBox.font[k].value);
                    }
                }
                textZones[i].setFontColor(box.getFontColor());
                textZones[i].setFont(box.getFont());
                textZones[i].setText(box.getText());
                dbg(box.getJustification());
                dbg(box.getText());
                break;
            }
        }
    }
}
var bxText = 484;
var bxLayout = 424;

function dialogBoxTop(hideF, heading, w, gripId) {
    var boxType = (w == 550) ? bxText : bxLayout;
    return ["<table id="+ gripId +" width="+ w +" cellspacing=0 class='boxTop'>",
        "<tr>",
        "<td width=\"18\" rowspan=\"2\" style=\"background-color: transparent;\"><img src=\"images/win_TL_W.gif\" alt=\"\" width=\"18\" height=\"24\"></td>",
        "<td width="+ (w-35) +" colspan=\"2\"><img src=\"images/win_top_W.gif\" alt=\"\" width="+ (w-35) +" height=\"4\"></td>",
        "<td width=\"48\" rowspan=\"2\" style=\"background-color: transparent;\"><a href=\"javascript:"+ hideF +";\"><img src=\"images/win_TR_W.gif\" alt=\"\" width=\"18\" height=\"24\" border=\"0\"></a></td>",
        "</tr>",
        "<tr>",
        "<td height=\"20\"><b><span id=\"heading"+ boxType +"\" style=\"color:white\">"+ heading +"</span></b></td>",
        "<td align=\"right\"><a href=\"javascript:"+ hideF +";\" style=\"color:white; text-decoration:none;\">關閉&nbsp;</a></td>",
        "</tr>",
        "</table>"];
}
function dialogBoxBottom(w) {
    return ["<table width="+ w +" cellspacing=0>",
        "<tr>",
        "<td width=6 rowspan=2><img src=\"images/win_BL_W.gif\" alt=\"\" width=6 height=6></td>",
        "<td width=488 height=4 bgcolor=white></td>",
        "<td width=6 rowspan=2><img src=\"images/win_BR_W.gif\" alt=\"\" width=6 height=6></td>",
        "</tr>",
        "<tr>",
        "<td height=2 bgcolor=#989898></td>",
        "</tr>",
        "</table>"];
}

function _out() {
var s = ["<form name='textBox'>",
dialogBoxTop("box.hide()", "輸入描述", 550, (this.name+"Grip")).join(""),
"<table width='550' cellspacing=0>",
"<tr>",
"<td width='2' bgcolor='#989898'></td>",
"<td valign='top' width='400' bgcolor='white' colspan='2'>&nbsp;<img id='textBox_image' name='textBox_image' valign=top src='" + this.imageURL + "' width=96 height=96/>&nbsp;<textarea class='photoTextarea' id=\"textBox_text\" name=\"textBox_text\" rows=7 cols=30 onKeyUp=\"box.checkText()\" onBlur=\"isChanged=1\" wrap=virtual>' + this.text + '</textarea></td>",
"<td valign='top' width='135' align='left' bgcolor='white' rowspan='2'><img src='images/sp.gif' height='2' width=135><img src=\"images/updtxt.jpg\" onclick=\"TextBox_handleUpdate()\" height=21 style=\"cursor: hand;\"><img id=\"textBoxWarningImg\" src=\"images/sp.gif\" height=80 width=130>",
"</td>",
"<td width=2 bgcolor=#989898></td>",
"</tr>",
"</table>",
"<table width=550 cellspacing=0>",
"<tr>",
"<td width=2 bgcolor=#989898></td>",
"<td valign=middle bgcolor=white align=left colspan='2'><img src=\"images/sp.gif\" height=15 width=110>",
"字型:<select name='font' onchange='box.setFont()'><option value='1'>標楷體</option><option value='2'>細明體</option><option value='3'>粗黑體</option></select>&nbsp;&nbsp;&nbsp;&nbsp;",
"字體顏色:<select name='color' onchange='box.setFontColor()'><option value='#000000'>黑</option><option value='#FFFFFF'>白</option><option value='#CC3399'>紫</option><option value='#FF0000'>紅</option><option value='#FF6600'>橙</option><option value='#FFCC00'>黃</option><option value='#33CC00'>綠</option><option value='#0099FF'>藍</option></select>&nbsp;&nbsp;&nbsp;&nbsp;",
"<img id='j_left_img' src='images/left_up.gif' style=\"cursor: hand;\" onclick='box.setJustification(\"left\")' width=33 height=21>&nbsp;<img id='j_center_img' src='images/center_up.gif' style=\"cursor: hand;\" onclick='box.setJustification(\"center\")'width=33 height=21>&nbsp;<img id='j_right_img' src='images/right_up.gif' style=\"cursor: hand;\" onclick='box.setJustification(\"right\")'width=33 height=21>",
"<span class=sm>字數: <b id=\"messageCount\">0</b></span> <span id=limitText class=sm valign=top></span></td>",
"<td width=2 bgcolor=#989898></td>",
"</tr>",
"</table>",
dialogBoxBottom(550).join(""),
"</form>"];
genLayer(this.name, this.left, this.top, this.width, this.height, this.visible, s.join(""));
}

function _hide() {
    hideBox(this.name);
    setDraggableImages(true);
    document.getElementById('textBoxWarningImg').src = blankImg.src;
}
function _show() {
    if (!dd.dragOn)
        return false; // check if other dialog is already open
    var caption = getIdProperty( "textBox_text", "value" );
    var captionLength = caption.value.length;
    updateMessageCount(captionLength);
    setDraggableImages(false);
    showBox(this.name);
    document.textBox.textBox_text.focus();
    for(i=0; i < textZones.length; i++) {
        if(textZones[i].name == box.getTextZone()) {
            //textWarningMessage(textZones[i], caption.value);
            //顯示caption 文字
            break;
        }
    }
}
function _setText(text) {
var obj = getIdProperty( "textBox_text", "value" );
obj.value = text;
this.text = text;
}
function _getText() {
var obj = getIdProperty( "textBox_text", "value" );
return obj.value;
}
function _setImageURL(imageURL) {
var obj = getIdProperty( "textBox_image", "value" );
obj.src = imageURL;
this.imageURL = imageURL;
}
function _setTextZone(textZone) {
this.textZone = textZone;
}
function _getTextZone() {
return this.textZone;
}
function _setLimit(limit) {
    var obj = getIdProperty( "limitText", "value" );
    obj.innerHTML = "最多 " + limit + " 字";
    this.limit = limit;
}
function _getLimit() {
    return this.limit;
}
function _setHeading(heading) {
    var obj = getIdProperty( ("heading"+bxText), "value" );
    obj.innerHTML = heading;
}
function _setFontColor() {
    for(var i=0;i<document.textBox.color.length;i++){
        if(document.textBox.color[i].selected == true)
        {
            this.fontColor = document.textBox.color[i].value;
        }
    }
}
function _setFont() {
    for(var i=0;i<document.textBox.font.length;i++){
        if(document.textBox.font[i].selected == true)
        {
            this.font = document.textBox.font[i].value;
        }
    }
}

function _setJustification(justification) {
    this.justification = justification;
    turnOffAllIcons();
    turnOnIcon("j_" + justification + "_img", justification);
}
function turnOffAllIcons() {
    turnOffIcon("j_left_img", "left");
    turnOffIcon("j_center_img", "center");
    turnOffIcon("j_right_img", "right");
}
function turnOnIcon(name, type) {
	var obj = getIdProperty(name, "value");
	obj.src ="images/"+ type + "_down.gif";
	//alert(obj.src);
}
function turnOffIcon(name, type) {
	var obj = getIdProperty(name, "value");
	obj.src ="images/"+ type + "_up.gif";
}
function _getJustification() {
	return this.justification;
}
function _getFontColor() {
	return this.fontColor;
}
function _getFont() {
	return this.font;
}
var textChanged = false;
function textFontShrinkTimerFunction(name) {
    if(textChanged == true)
    {
        var caption = getIdProperty( "textBox_text", "value" );
        for(i=0; i < textZones.length; i++) {
            if(textZones[i].name == name) {
                textWarningMessage(textZones[i], caption.value);
                break;
            }
        }
    }
    textChanged = false;
}



function _checkText() {
	isChanged=1;
	textChanged = true;
	var caption = getIdProperty( "textBox_text", "value" );
	var captionLength = caption.value.length;
	if ( captionLength > this.limit) {
		caption.value = caption.value.substring( 0, this.limit );
		captionLength = this.limit;
	}
	updateMessageCount(captionLength);
}
function updateMessageCount(cnt) {
	if(document.getElementById("messageCount"))
	{
		document.getElementById("messageCount").innerHTML = cnt;
	}
}
function TextBox(left, top, text, imageURL, textZone) {
	this.name = "textBoxLayer";
	this.left = left;
	this.top = top;
	this.width = 550;
	this.height = 260;
	this.visible = false;
	this.text = text;
	this.imageURL = imageURL;
	this.textZone = textZone;
	this.limit = 250;
	return this;
}
	TextBox.prototype.out = _out;
	TextBox.prototype.hide = _hide;
	TextBox.prototype.show = _show;
	TextBox.prototype.setText = _setText;
	TextBox.prototype.setImageURL = _setImageURL;
	TextBox.prototype.getText = _getText;
	TextBox.prototype.setTextZone = _setTextZone;
	TextBox.prototype.getTextZone = _getTextZone;
	TextBox.prototype.getLimit = _getLimit;
	TextBox.prototype.setLimit = _setLimit;
	TextBox.prototype.getJustification = _getJustification;
	TextBox.prototype.setJustification = _setJustification;
    TextBox.prototype.setFontColor = _setFontColor;
    TextBox.prototype.getFontColor = _getFontColor;
    TextBox.prototype.setFont = _setFont;
    TextBox.prototype.getFont = _getFont;
	TextBox.prototype.checkText = _checkText;
	TextBox.prototype.setHeading = _setHeading;

// generic layout dialog
function dialog_hide() {
	hideBox("dialogLayer");
	setDraggableImages(true);
}
// rhernandez: Zoom page dialog functions
function zoomDialog_hide() {
	var imgContainer = getIdProperty(("pageZoomContainer"),"value");
	imgContainer.src = blankImg.src;
	hideBox("zoomDialogLayer");
	setDraggableImages(true);
}
//------------------------------------------------------------------------------------
	// rhernandez: Zoom pciture dialog
	function ZoomPictureDialog(){
	this.name = "ZoomPictureLayer";
	this.heading = "";
	this.pageNum = 0;
	this.hrefEnhance = "";
	this.hrefRemove = "";
	return this;
}
//------------------------------------------------------------------------------------
var albumNumThumbs = 10; // capacity of 'albumTray'
var albumCurrPage = 1;
var imageDropZones = new Array();
var dropTargets = new Array(); // 'imageDropZones' for "image" areas only, not "text"
var dropZoneBorder = "transparent";

var dialog = new Object();
	box = new TextBox(pg.leftX+80, pg.leftY+25, "", "images/sp.gif");
	box.out();

	var textZones = new Array();
	var blankImg = new Image();
	blankImg.src ="images/sp.gif";//kansker
	var albumList = new Array(); // 'albumElement' for all pics in album
    var albumDataList = new Array();
	var albumTray = new Array(albumNumThumbs); // 'albumElement' for visible pics on bottom of page

	function hideBox(n) {
		var obj = document.getElementById(n);
		obj.style.visibility = "hidden";
		obj.style.zIndex = "0";
		document.getElementById("spreads").style.display = "block";
	}
	function showBox(n) {
		var obj = document.getElementById(n);
		obj.style.visibility = "visible";
		obj.style.zIndex = "5000";
		if (is_ie) { // ie6 select options show thru floats
			var select = document.getElementById("spreads");
			select.style.display = "none";
		}
	}
	// Function to toggle between the different layout modes in the browser
	function selectLayoutPage(){
		var selectObj = document.getElementById("selectLayoutOption");
		if(selectObj){
			hideLayoutBrowserPages();
			document.getElementById("layoutBrowserPage" + (selectObj.selectedIndex + 1)).style.display = "block";
		}
	}
	function dbg(msg) {
		if (document.getElementById("debug")) {
		    var debug = document.getElementById("debug");
		    var p = document.createElement("p");
		    p.appendChild(document.createTextNode(msg));
		    debug.appendChild(p);
	    }
    }

function parseJSON(text) {
	try {
		return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(text.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + text + ')');
	} catch (e) {
		return false;
	}
}
