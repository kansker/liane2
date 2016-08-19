var kphoto = new KPHOTO();
function initPage() {
	setDraggableImages(true);
}
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
function dropZoneObj(viewID) {
	// return 'DropZone' object by 'viewID'
	for (var i=0; i < imageDropZones.length; i++) {
		if (imageDropZones[i].viewID == viewID) return imageDropZones[i];
	}
	return null;
}
function dzObj(name) {
	// return 'imageDropZones' object by 'name'
	for (var j=0; j < imageDropZones.length; j++)
		if (imageDropZones[j].name == name) return imageDropZones[j];
			return null;
}

function showTools() {
	for (var j=0; j < imageDropZones.length; j++){
        var t1 = $(imageDropZones[j].name+"_tool1");
        var t3 = $(imageDropZones[j].name+"_tool3");	
        var t2 = $(imageDropZones[j].name+"_tool2");
        if(!imageDropZones[j].hasPicture){
            t1.style.visibility = "hidden";
            t2.style.visibility = "hidden";  
            t3.style.visibility = "hidden";   	
            continue;
        }
        if(t1!=null){
            var alobj = kphoto.albumSourceObj(imageDropZones[j].viewID);
            var r1 = imageDropZones[j].width / imageDropZones[j].height;
            var r2 = alobj.nw / alobj.nh;
            var r3 = (r2 - r1)/r1;
            //alert(alobj.cw + alobj.ch +"   "+imageDropZones[j].width+" "+imageDropZones[j].height);
            if(r3 > 0.02 || r3 <= -0.02){
                t3.style.visibility = "visible";
                t1.style.visibility = "hidden";
            }else{
                t1.style.visibility = "visible";
                t3.style.visibility = "hidden";
            }
        }
        if(t2!=null){
            t2.style.visibility = "visible";
        }
    }
}

function hideTools() {
	for (var j=0; j < imageDropZones.length; j++){
        var t1 = $(imageDropZones[j].name+"_tool1");
        if(t1!=null){
            t1.style.visibility = "hidden";
        }
        var t3 = $(imageDropZones[j].name+"_tool3");
        if(t3!=null){
            t3.style.visibility = "hidden";
        }
        var t2 = $(imageDropZones[j].name+"_tool2");
        if(t2!=null){
            t2.style.visibility = "hidden";
        }
    }
}
function hideToolsById(id) {
	for (var j=0; j < imageDropZones.length; j++){
        if (imageDropZones[j].name != id) continue;
        var t1 = $(imageDropZones[j].name+"_tool1");
        if(t1!=null){
            t1.style.visibility = "hidden";
        }
        var t2 = $(imageDropZones[j].name+"_tool2");
        if(t2!=null){
            t2.style.visibility = "hidden";
        }
        var t3 = $(imageDropZones[j].name+"_tool3");
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
        var alobj = kphoto.albumSourceObj(viewID);
        if(alobj==null){
        	return;
        }
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
function cap_PickFunc() {
	pickedItem = null;
}

function icon_PickFunc() {
	pickedItem = null;
	if (dd.obj.name.indexOf("imager") == 0) {
		// from album area
		var cellFrom = parseInt(dd.obj.name.substr("imager".length+3,1));
           if(kphoto.imagerList[cellFrom]==null)
               return;
		pickedItem = new itemPicked(true, dd.obj, kphoto.imagerList[cellFrom].viewID);
		kphoto.sid = dd.obj.name;
		showGrips();			
	}else if (dd.obj.name.indexOf("iconer") == 0) {
		// from album area
		var cellFrom = parseInt(dd.obj.name.substr("iconer".length+3,1));
           if(kphoto.iconerList[cellFrom]==null)
               return;
		pickedItem = new itemPicked(true, dd.obj, kphoto.iconerList[cellFrom].viewID);
		kphoto.sid = dd.obj.name;
		showGrips();
	}else if (dd.obj.name.indexOf("marginer") == 0) {
		// from album area
		var cellFrom = parseInt(dd.obj.name.substr("marginer".length+3,1));
           if(kphoto.marginerList[cellFrom]==null)
               return;
		pickedItem = new itemPicked(true, dd.obj, kphoto.marginerList[cellFrom].viewID);
		kphoto.sid = dd.obj.name;
		showGrips();
	}else if (dd.obj.name.indexOf("ctext_") == 0) {
		// from album area
		var cellFrom = parseInt(dd.obj.name.substr("ctext".length+3,1));
           if(kphoto.textList[cellFrom]==null)
               return;
		pickedItem = new itemPicked(true, dd.obj, kphoto.textList[cellFrom].viewID);
		kphoto.sid = dd.obj.name;
		showGrips();
	}	
}

function my_PickFunc() {
	pickedItem = null;
	if (dd.obj.name.indexOf("toolPalette") == 0) { // from toolPalette
		pickedItem = new itemPicked(false, dd.obj, "toolPalette", dd.obj.name);
	}else if(dd.obj.name.indexOf("text") == 0){
		pickedItem = new itemPicked(false, dd.obj, "text-rect", dd.obj.name);
	}else if(dd.obj.name == "caption"){
        hideGrips();
	}else {
		if (dd.obj.name.indexOf("img") == 0) {
			// from album area
			var cellFrom = parseInt(dd.obj.name.substr("img".length,1));
            if(kphoto.albumTray[cellFrom]==null)
                return;
			pickedItem = new itemPicked(true, dd.obj, kphoto.albumTray[cellFrom].viewID);
		}else if (dd.obj.name.indexOf("cimg") == 0) {
			// from album area
			//dbg("選:"+dd.obj.name);
			var cellFrom = parseInt(dd.obj.name.substr("cimg".length,1));
            if(kphoto.iconTray[cellFrom]==null)
                return;
			pickedItem = new itemPicked(true, dd.obj, kphoto.iconTray[cellFrom].viewID);
		}else if (dd.obj.name.indexOf("mimg") == 0) {
			// from album area
			var cellFrom = parseInt(dd.obj.name.substr("mimg".length,1));
            if(kphoto.marginTray[cellFrom]==null)
                return;
			pickedItem = new itemPicked(true, dd.obj, kphoto.marginTray[cellFrom].viewID);
		}			
		else if (dd.obj.name.indexOf("image-") == 0) {
			if(dd.obj.name.indexOf("tool") > 0){
			
			
			}else{
	            tookDragCheck= true;
				// from dropZone
				var pickedZone = dzObj(dd.obj.name);
				//pickedZone.border("black");
				pickedItem = new itemPicked(false, dd.obj, pickedZone.viewID, pickedZone.name);
				try{
					//document.images["dzImg_" + pickedZone.name].src = dropZoneObj(pickedZone.viewID).thumbURL;
					editImageSrc(pickedZone.name,dropZoneObj(pickedZone.viewID).thumbURL);
				}catch(e){
					alert("my_PickFunc error");
				}
			}
			clickTime = new Date();
		}
	}
}

var cellToHighlight = "";
var backToTray = 0;

function cap_DragFunc() {
	var mainer = kphoto.mainer();
	var mainerObj = kphoto.mainerObj();
    if(kphoto.mainer()!=null){
        if (dd.obj == rb)
        {
            if(rb.x-lb.x > 5 && rb.y-rt.y > 5){
                mainer.resizeTo(rb.x-lb.x, rb.y-rt.y);
            }
        }
        else if (dd.obj == rt)
        {
            if(rt.x-lt.x > 5 && rb.y-rt.y > 5){
                mainer.resizeTo(rt.x-lt.x, rb.y-rt.y);
                mainer.moveTo(rt.x-mainer.w+rt.w/2, rt.y+rt.h/2);
            }
        }
        else if (dd.obj == lb)
        {
            if(rb.x-lb.x > 5 && lb.y-lt.y > 5){
                mainer.moveTo(lb.x+lb.w/2, lt.y+lt.h/2);
                mainer.resizeTo(rb.x-lb.x, lb.y-lt.y);
            }
        }
        else if (dd.obj == lt)
        {
            if(rt.x-lt.x>5 && lb.y-lt.y > 5){
                mainer.moveTo(lt.x+lt.w/2, lt.y+lt.h/2);
                mainer.resizeTo(rt.x-lt.x, lb.y-lt.y);
            }
        }
		if(mainer.name.indexOf("ctext_")==0 && mainerObj.fontSize*1 != 0){
			editImageSrc(mainer.name,"images/sp.gif");
		}
    }
}


function icon_DragFunc() {

}
function my_DragFunc() {
	if (dd.obj.name.indexOf("toolPalette") != 0 && dd.obj.name.indexOf("ctext_") != 0 && dd.obj.name.indexOf("cimg") != 0 
			&& dd.obj.name.indexOf("mimg") != 0) {
		if (dd.obj.name.indexOf("tool") > 0){
			return;
		}	
        if(tookDragCheck){
            //hideTools();
            tookDragCheck=false;
        }
		if (cellToHighlight != "") { // disable previous highlight
			if(dzObj(cellToHighlight)!=null){
				dzObj(cellToHighlight).border(blue);
			}
			cellToHighlight = "";
		}
		if (backToTray) {
			//setStroke("thumbs", "solid "+ blue +" 2px");
			backToTray = 0;
		}
		var toCell = dropCell();
		
		if (toCell != null) {// over "snap to" target cell - HIGHLIGHT CELL when hovering
			//dbg("toCell:"+toCell.id + " pickedItem:"+pickedItem.viewID);
			if (pickedItem!=null && toCell.id != pickedItem.viewID) { // avoid highlighting self
				cellToHighlight = toCell.id;
				dzObj(cellToHighlight).border2("green");//被碰的圖塊變色
			}else{
			}
		}
		else if ((dd.obj.name.indexOf("img") != 0) && (boxOverlap(dd.obj, pickedItem) == -1)) {
			backToTray = 1;
		}else{
			if(kphoto.lstable=="2" || kphoto.rstable=="2" || kphoto.lown=="1" || kphoto.rown=="1"){
				if (cellToHighlight != "") { // disable previous highlight
					setIdProperty(cellToHighlight, "border", "solid blue 2px");
					cellToHighlight = "";
				}
				var toCell = getDropPanel();
				if(toCell != null){
					cellToHighlight = toCell.name;
					//setIdProperty(toCell.name, "border", "solid red 2px");
				}	
			}
		}
	}else if(dd.obj.name.indexOf("cimg")==0 || dd.obj.name.indexOf("mimg")==0 || dd.obj.name.indexOf("ctext_")==0){
		if (cellToHighlight != "") { // disable previous highlight
			setIdProperty(cellToHighlight, "border", "solid blue 2px");
			cellToHighlight = "";
		}
		var toCell = getDropPanel();
		if(toCell != null){
			cellToHighlight = toCell.name;
			//setIdProperty(toCell.name, "border", "solid red 2px");
		}
	}
}

var clickTimer = (is_mac && is_ie) ? 1400 : 400; // too fast and tools don't show - too slow and drag back to tray fails

function icon_DropFunc() {
    var mainer = kphoto.mainer();
    if(mainer==null){
    	return;
    }
   	var mainerObj = kphoto.mainerObj();
    if(mainerObj==null){
      	return;
    }    	
   	//dbg("icon_DropFunc mainer.name:"+mainer.name);
   	var back = 0;
	var x = mainer.x;
	var y = mainer.y;
	var w = mainer.w;
	var h = mainer.h;	
	//dbg("y0:"+y);
   	if(mainerObj.pos=="0"){
   		if(mainer.x < pg.x1){
   			back = 1;
   			x = pg.x1;
   		}
   		if(mainer.y < pg.y1){
   			back = 1;
   			y = pg.y1;
   		} 
   		if(mainer.x + mainer.w > pg.x1 + pg.w1){
   			back = 1;
   			x = pg.x1 + pg.w1 - mainer.w;
   		} 
   		if(mainer.y + mainer.h > pg.y1 + pg.h1){
   			back = 1;
   			y = pg.y1 + pg.h1 - mainer.h;
   		}
   	}else{
   		if(mainer.x < pg.x2){
   			back = 1;
   			x = pg.x2;
   		}
		if(mainer.y < pg.y2){
   			back = 1;
   			y = pg.y2;
   		}
   		if(mainer.x + mainer.w > pg.x2 + pg.w2){
   			back = 1;
   			x = pg.x2 + pg.w2 - mainer.w;
   		}
   		if(mainer.y + mainer.h > pg.y2 + pg.h2){
   			back = 1;
   			y = pg.y2 + pg.h2 - mainer.h;
   		} 		
   	}   
   	//dbg("pg.y1:"+pg.y1);
   	//dbg("pg.y1:"+(pg.y1 + pg.h2));
   	//dbg("y:"+y);
   	//dbg("h:"+h);
   	if(back==1){
  		//mainer.resizeTo(mainerObj.width,mainerObj.height);
        if(mainerObj.pos=="0"){
        	mainerObj.left = x - pg.x1;
			mainerObj.top = y - pg.y1;          	
        	mainer.moveTo(mainerObj.left+pg.x1,mainerObj.top+pg.y1);
        }else{
        	mainerObj.left = x - pg.x2;
			mainerObj.top = y - pg.y2;          	
        	mainer.moveTo(mainerObj.left+pg.x2,mainerObj.top+pg.y2);      	
        }			
   	}else{
   		if(mainerObj.pos=="0"){
   			mainerObj.left = mainer.x - pg.x1;
   			mainerObj.top = mainer.y - pg.y1;
   		}else{
   			mainerObj.left = mainer.x - pg.x2;
   			mainerObj.top = mainer.y - pg.y2;			
   		}
   	}
   	mainerObj.resetZ();
   	if(mainerObj.id.indexOf("imager_")==0){
   		kphoto.renewImager(mainerObj.id);
   	}
   	showGrips();
   	cellToHighlight = "";
	kphoto.smap.removeAll();	
	kphoto.smap.add(mainerObj.id);
	//dbg('icon_DropFunc');
	$j("#plSort").dialog('close');
}
function cap_DropFunc() {
 	if(kphoto.mainer() != null){
 		//dbg("cap_DropFunc:"+dd.obj.id);
    	var mainer = kphoto.mainer();
    	var mainerObj = kphoto.mainerObj();
    	if(mainerObj==null){
    		cellToHighlight = "";
    		return;
    	}
    	//dbg("mainer.name:"+mainer.name);
    	if(mainerObj.pos=="0"){
    		if(mainer.x < pg.x1){
    			mainer.resizeTo(mainer.x + mainer.w - pg.x1, mainer.h);
    			mainer.moveTo(pg.x1,mainer.y);
    			kphoto.autoZoom(mainerObj.id);
    		}
    		if(mainer.y < pg.y1){
    			mainer.resizeTo(mainer.w,mainer.y + mainer.h - pg.y1);
    			mainer.moveTo(mainer.x,pg.y1);
    			kphoto.autoZoom(mainerObj.id);
    		}
    		if(mainer.x + mainer.w > pg.x1 + pg.w1){
    			mainer.resizeTo(pg.x1 + pg.w1 - mainer.x, mainer.h);
    			kphoto.autoZoom(mainerObj.id);
    		}
    		if(mainer.y + mainer.h > pg.y1 + pg.h1){
    			mainer.resizeTo(mainer.w, pg.y1 + pg.h1 - mainer.y);
    			kphoto.autoZoom(mainerObj.id);
    		}
    	}else{
    		if(mainer.x < pg.x2){
    			mainer.resizeTo(mainer.x + mainer.w - pg.x2, mainer.h);
    			mainer.moveTo(pg.x2,mainer.y);
    			kphoto.autoZoom(mainerObj.id);
    		}
    		if(mainer.y < pg.y2){
    			mainer.resizeTo(mainer.w,mainer.y + mainer.h - pg.y2);
    			mainer.moveTo(mainer.x,pg.y2);
    			kphoto.autoZoom(mainerObj.id);
    		}
    		if(mainer.x + mainer.w > pg.x2 + pg.w2){
    			mainer.resizeTo(pg.x2 + pg.w2 - mainer.x, mainer.h);
    			kphoto.autoZoom(mainerObj.id);
    		}
    		if(mainer.y + mainer.h > pg.y2 + pg.h2){
    			mainer.resizeTo(mainer.w, pg.y2 + pg.h2 - mainer.y);
    			kphoto.autoZoom(mainerObj.id);
    		} 		
    	}
        if(mainer.w<0){
            mainer.resizeTo(10, mainer.h);
        }
        if(mainer.h<0){
            mainer.resizeTo(mainer.x, 10);
        }
        /*
        if(oBrowser.isFF){
            var image = $("img_"+mainer.id);
            image.style.height = mainer.h + 'px';
			image.height = mainer.h;
			image.style.width = mainer.w + 'px';
			image.width = mainer.w;        
		}         
        */
        mainerObj.width = mainer.w;
        mainerObj.height = mainer.h;
        if(mainerObj.pos=="0"){
        	mainerObj.left = mainer.x - pg.x1;
        	mainerObj.top = mainer.y - pg.y1;   
        }else{
        	mainerObj.left = mainer.x - pg.x2;
        	mainerObj.top = mainer.y - pg.y2;       	
        }
   		if(mainerObj.id.indexOf("ctext_")==0){
   			if(mainerObj.fontSize*1 != 0 ){
   				kphoto.renewText(mainerObj.id);
   			}
   			if(mainer.w < 10 && mainer.h < 10){
   				mainer.resizeTo(10,10);
        		mainerObj.width = mainer.w;
        		mainerObj.height = mainer.h;   				
   			}
   			if(mainerObj.fontSize*1 == 0 ){
   				kphoto.autoZoom(mainerObj.id);
   			}
   		}        
   		if(mainerObj.id.indexOf("imager_")==0){
   			if(mainer.w < 30 || mainer.h < 30){
   				mainer.resizeTo(30,30);
        		mainerObj.width = mainer.w;
        		mainerObj.height = mainer.h;   				
   			}
   			kphoto.autoZoom(mainerObj.id);
   		}
   		if(mainerObj.id.indexOf("imager_")==0){
   			kphoto.renewImager(mainerObj.id);
   		}
        showGrips();
    }
}
function autoZoomYUI(){

}

function cap2_PickFunc() {
	pickedItem = null;
}
function cap2_DragFunc() {
	var mainer = dd.elements["yui_img2"];
	//var mainerObj = kphoto.mainerObj();
    if(mainer!=null){
		rb2.fetch();
		lb2.fetch();
		rt2.fetch();
		lt2.fetch() 
        if (dd.obj == rb2)
        {
            if(rb2.x - lb2.x > 5 && rb2.y - rt2.y > 5){
                mainer.resizeTo(rb2.x - lb2.x, rb2.y - rt2.y);
                //dbg("x:"+rb2.x +" " +lb2.x);
                //dbg("y:"+rb2.y +" " +rt2.y);
                //dbg("w:"+(rb2.x - lb2.x));
                //dbg("h:"+(rb2.y - rt2.y));
            }
        }
        else if (dd.obj == rt2)
        {
            if(rt2.x-lt2.x > 5 && rb2.y-rt2.y > 5){
                mainer.resizeTo(rt2.x-lt2.x, rb2.y-rt2.y);
                mainer.moveTo(rt2.x - mainer.w+ rt2.w/2, rt2.y+rt2.h/2);
            }
        }
        else if (dd.obj == lb2)
        {
            if(rb2.x-lb2.x > 5 && lb2.y-lt2.y > 5){
                mainer.moveTo(lb2.x+lb2.w/2, lt2.y+lt2.h/2);
                mainer.resizeTo(rb2.x-lb2.x, lb2.y-lt2.y);
            }
        }
        else if (dd.obj == lt2)
        {
            if(rt2.x-lt2.x>5 && lb2.y-lt2.y > 5){
                mainer.moveTo(lt2.x+lt2.w/2, lt2.y+lt2.h/2);
                mainer.resizeTo(rt2.x-lt2.x, lb2.y-lt2.y);
            }
        }
    }
}
function cap2_DropFunc() {
	var mainer = dd.elements["yui_img2"];
 	if(mainer != null){
 		mainer.fetch();
 		var x = $j('#yui_img')[0].style.pixelLeft*1;
		var y = $j('#yui_img')[0].style.pixelTop*1;
		var w = $j('#yui_img')[0].style.pixelWidth*1;
		var h = $j('#yui_img')[0].style.pixelHeight*1;
		//dbg("cap2_DropFunc1:"+x+" "+y+" "+w+" "+h);
		//dbg("cap2_DropFunc2:"+mainer.x+" "+mainer.y+" "+mainer.w+" "+mainer.h);
   		if(mainer.x < x){
   			mainer.resizeTo(mainer.x + mainer.w - x, mainer.h);
   			mainer.moveTo(x,mainer.y);
   			autoZoomYUI();
   		}
   		if(mainer.y < y){
   			mainer.resizeTo(mainer.w, mainer.y + mainer.h - y);
   			mainer.moveTo(mainer.x,y);
   			autoZoomYUI();
   		}
   		if(mainer.x + mainer.w > x + w){
   			mainer.resizeTo(x + w - mainer.x, mainer.h);
   			autoZoomYUI();
   		}
   		if(mainer.y + mainer.h > y + h){
   			mainer.resizeTo(mainer.w, y + h - mainer.y);
   			autoZoomYUI();
   		}
        if(mainer.w<0){
            mainer.resizeTo(10, mainer.h);
        }
        if(mainer.h<0){
            mainer.resizeTo(mainer.x, 10);
        }
   		if(mainer.w < 30 || mainer.h < 30){
   			mainer.resizeTo(30,30);
   		}
   		autoZoomYUI();
   		
   		mainer.fetch();
   		
   		kphoto.crop.x1 = mainer.x;
		kphoto.crop.x2 = kphoto.crop.x1 + mainer.w;
		kphoto.crop.y1 = mainer.y;
		kphoto.crop.y2 = kphoto.crop.y1 + mainer.h;
		kphoto.crop.w = mainer.w;
		kphoto.crop.h = mainer.h;
		kphoto.crop.free = 1;
		//dbg("kphoto.crop.x1:"+kphoto.crop.x1);
		//dbg("kphoto.crop.y1:"+kphoto.crop.y1);
		//dbg("kphoto.crop.x2:"+kphoto.crop.x2);
		//dbg("kphoto.crop.y2:"+kphoto.crop.y2);
		//dbg("kphoto.crop.w:"+kphoto.crop.w);
		//dbg("kphoto.crop.h:"+kphoto.crop.h);
		//alert("gogo:"+kphoto.crop.x1);
        showGrips4Crop();
    }
}



function cap3_PickFunc() {
	pickedItem = null;
}
function cap3_DragFunc() {
	var mainer = dd.elements["yui_img3"];
	//var mainerObj = kphoto.mainerObj();
    if(mainer!=null){
		rb3.fetch();
		lb3.fetch();
		rt3.fetch();
		lt3.fetch() 
        if (dd.obj == rb3)
        {
            if(rb3.x - lb3.x > 5 && rb3.y - rt3.y > 5){
                mainer.resizeTo(rb3.x - lb3.x, rb3.y - rt3.y);
            }
        }
        else if (dd.obj == rt3)
        {
            if(rt3.x-lt3.x > 5 && rb3.y-rt3.y > 5){
                mainer.resizeTo(rt3.x-lt3.x, rb3.y-rt3.y);
                mainer.moveTo(rt3.x - mainer.w+ rt3.w/2, rt3.y+rt3.h/2);
            }
        }
        else if (dd.obj == lb3)
        {
            if(rb3.x-lb3.x > 5 && lb3.y-lt3.y > 5){
                mainer.moveTo(lb3.x+lb3.w/2, lt3.y+lt3.h/2);
                mainer.resizeTo(rb3.x-lb3.x, lb3.y-lt3.y);
            }
        }
        else if (dd.obj == lt3)
        {
            if(rt3.x-lt3.x>5 && lb3.y-lt3.y > 5){
                mainer.moveTo(lt3.x+lt3.w/2, lt3.y+lt3.h/2);
                mainer.resizeTo(rt3.x-lt3.x, lb3.y-lt3.y);
            }
        }
    }
}
function cap3_DropFunc() {
	var mainer = dd.elements["yui_img3"];
 	if(mainer != null){
 		mainer.fetch();
 		var x = $j('#yui_img')[0].style.pixelLeft*1;
		var y = $j('#yui_img')[0].style.pixelTop*1;
		var w = $j('#yui_img')[0].style.pixelWidth*1;
		var h = $j('#yui_img')[0].style.pixelHeight*1;
		//dbg("cap2_DropFunc1:"+x+" "+y+" "+w+" "+h);
		//dbg("cap2_DropFunc2:"+mainer.x+" "+mainer.y+" "+mainer.w+" "+mainer.h);
   		if(mainer.x < x){
   			mainer.resizeTo(mainer.x + mainer.w - x, mainer.h);
   			mainer.moveTo(x,mainer.y);
   			autoZoomYUI();
   		}
   		if(mainer.y < y){
   			mainer.resizeTo(mainer.w, mainer.y + mainer.h - y);
   			mainer.moveTo(mainer.x,y);
   			autoZoomYUI();
   		}
   		if(mainer.x + mainer.w > x + w){
   			mainer.resizeTo(x + w - mainer.x, mainer.h);
   			autoZoomYUI();
   		}
   		if(mainer.y + mainer.h > y + h){
   			mainer.resizeTo(mainer.w, y + h - mainer.y);
   			autoZoomYUI();
   		}
        if(mainer.w<0){
            mainer.resizeTo(10, mainer.h);
        }
        if(mainer.h<0){
            mainer.resizeTo(mainer.x, 10);
        }
   		if(mainer.w < 30 || mainer.h < 30){
   			mainer.resizeTo(30,30);
   		}
   		autoZoomYUI();
   		
   		mainer.fetch();
   		autoZoom3();
   		
   		kphoto.crop.x1 = mainer.x;
		kphoto.crop.x2 = kphoto.crop.x1 + mainer.w;
		kphoto.crop.y1 = mainer.y;
		kphoto.crop.y2 = kphoto.crop.y1 + mainer.h;
		kphoto.crop.w = mainer.w;
		kphoto.crop.h = mainer.h;
		kphoto.crop.free = 0;
		//dbg("kphoto.crop.x1:"+kphoto.crop.x1);
		//dbg("kphoto.crop.y1:"+kphoto.crop.y1);
		//dbg("kphoto.crop.x2:"+kphoto.crop.x2);
		//dbg("kphoto.crop.y2:"+kphoto.crop.y2);
		//dbg("kphoto.crop.w:"+kphoto.crop.w);
		//dbg("kphoto.crop.h:"+kphoto.crop.h);
		//alert("gogo:"+kphoto.crop.x1);
        showGrips4Crop3();
    }
}

function autoZoom3() {
	if(kphoto.crop.ratioDimW == 0 || kphoto.crop.ratioDimH == 0){
		return;
	}
	var mainer = dd.elements["yui_img3"];
 	if(mainer != null){
	 	mainer.fetch();
		
		if(mainer.w <= mainer.h){
			var z =  kphoto.crop.ratioDimW / kphoto.crop.ratioDimH;
			mainer.resizeTo(mainer.w, mainer.w/z);
		}else{
			var z =  kphoto.crop.ratioDimH /  kphoto.crop.ratioDimW;
			mainer.resizeTo(mainer.h/z, mainer.h);
		}
		mainer.fetch();
	}
}

function yui_DropFunc() {
 	var sx = $j('#yui_img')[0].style.pixelLeft*1;
	var sy = $j('#yui_img')[0].style.pixelTop*1;
	var sw = $j('#yui_img')[0].style.pixelWidth*1;
	var sh = $j('#yui_img')[0].style.pixelHeight*1;
		
	var x = dd.obj.x;
	var y = dd.obj.y;
	var w = dd.obj.w;
	var h = dd.obj.h;
	if(x + w > sx+ sw){
		x = sx+ sw - w;
		dd.obj.moveTo(x,y);
	}else if(x < sx){
		x = sx;
		dd.obj.moveTo(x,y);
	}
	if(y + h > sy+ sh){
		y = sy+ sh - h;
		dd.obj.moveTo(x,y);
	}else if(y < sy){
		y = sy;
		dd.obj.moveTo(x,y);
	}    	 
	var mainer = dd.elements["yui_img2"];
 	if(mainer != null){
 		mainer.fetch();
		kphoto.crop.x1 = mainer.x;
		kphoto.crop.x2 = kphoto.crop.x1 + mainer.w;
		kphoto.crop.y1 = mainer.y;
		kphoto.crop.y2 = kphoto.crop.y1 + mainer.h;
		kphoto.crop.w = mainer.w;
		kphoto.crop.h = mainer.h;
		kphoto.crop.free = 1; 
	}
	showGrips4Crop();
}
function yui3_DropFunc() {
 	var sx = $j('#yui_img')[0].style.pixelLeft*1;
	var sy = $j('#yui_img')[0].style.pixelTop*1;
	var sw = $j('#yui_img')[0].style.pixelWidth*1;
	var sh = $j('#yui_img')[0].style.pixelHeight*1;
		
	var x = dd.obj.x;
	var y = dd.obj.y;
	var w = dd.obj.w;
	var h = dd.obj.h;
	if(x + w > sx+ sw){
		x = sx+ sw - w;
		dd.obj.moveTo(x,y);
	}else if(x < sx){
		x = sx;
		dd.obj.moveTo(x,y);
	}
	if(y + h > sy+ sh){
		y = sy+ sh - h;
		dd.obj.moveTo(x,y);
	}else if(y < sy){
		y = sy;
		dd.obj.moveTo(x,y);
	}    	 
	var mainer = dd.elements["yui_img3"];
 	if(mainer != null){
 		mainer.fetch();
		kphoto.crop.x1 = mainer.x;
		kphoto.crop.x2 = kphoto.crop.x1 + mainer.w;
		kphoto.crop.y1 = mainer.y;
		kphoto.crop.y2 = kphoto.crop.y1 + mainer.h;
		kphoto.crop.w = mainer.w;
		kphoto.crop.h = mainer.h;
		kphoto.crop.free = 0; 
	}
	showGrips4Crop3();
}
function my_DropFunc() {
	
    if( pickedItem== null){
    	return;
    }
    if (dd.obj.name.indexOf("cimg") == 0) {
    	setIdProperty("left-page", "border", tranBorderStyle);
    	setIdProperty("right-page", "border", tranBorderStyle);
    	if(cellToHighlight == "left-page" ){
     		var icon = kphoto.iconObj(pickedItem.viewID);
     		var x = dd.obj.x;
     		var y = dd.obj.y;
     		var w = dd.obj.w;
     		var h = dd.obj.h;
     		if(x + w > pg.x1+ pg.w1){
     			x = pg.x1+ pg.w1 - w;
     		}else if(x < pg.x1){
     			x = pg.x1;
     		}
     		if(y + h > pg.y1+ pg.h1){
     			x = pg.y1+ pg.h1 - h;
     		}else if(y < pg.y1){
     			y = pg.y1;
     		}
    		kphoto.addIconer("0",icon.viewID,"", icon.viewURI,x - pg.x1 ,y - pg.y1, dd.obj.w, dd.obj.h, dd.obj.w, dd.obj.h);
    	}else if(cellToHighlight == "right-page" ){
    	    var icon = kphoto.iconObj(pickedItem.viewID);
     		var x = dd.obj.x;
     		var y = dd.obj.y;
     		var w = dd.obj.w;
     		var h = dd.obj.h;
     		if(x + w > pg.x2+ pg.w2){
     			x = pg.x2+ pg.w2 - w;
     		}else if(x < pg.x2){
     			x = pg.x2;
     		}
     		if(y + h > pg.y2+ pg.h2){
     			x = pg.y2+ pg.h2 - h;
     		}else if(y < pg.y2){
     			y = pg.y2;
     		}    	    
    		kphoto.addIconer("1",icon.viewID,"", icon.viewURI,x - pg.x2 ,y - pg.y2, dd.obj.w, dd.obj.h, dd.obj.w, dd.obj.h);
    	}
    	dd.obj.moveTo(pickedItem.x, pickedItem.y);   
		cellToHighlight = "";
    	return;
    }
    if (dd.obj.name.indexOf("mimg") == 0) {
    	setIdProperty("left-page", "border", tranBorderStyle);
    	setIdProperty("right-page", "border", tranBorderStyle);
    	if(cellToHighlight == "left-page" ){
     		var margin = kphoto.marginObj(pickedItem.viewID);
     		var x = dd.obj.x;
     		var y = dd.obj.y;
     		var w = dd.obj.w;
     		var h = dd.obj.h;
     		if(x + w > pg.x1+ pg.w1){
     			x = pg.x1+ pg.w1 - w;
     		}else if(x < pg.x1){
     			x = pg.x1;
     		}
     		if(y + h > pg.y1+ pg.h1){
     			x = pg.y1+ pg.h1 - h;
     		}else if(y < pg.y1){
     			y = pg.y1;
     		}
    		kphoto.addMarginer("0",margin.viewID,"", margin.viewURI,x - pg.x1 ,y - pg.y1, dd.obj.w, dd.obj.h, dd.obj.w, dd.obj.h);
    	}else if(cellToHighlight == "right-page" ){
    	    var margin = kphoto.marginObj(pickedItem.viewID);
     		var x = dd.obj.x;
     		var y = dd.obj.y;
     		var w = dd.obj.w;
     		var h = dd.obj.h;
     		if(x + w > pg.x2+ pg.w2){
     			x = pg.x2+ pg.w2 - w;
     		}else if(x < pg.x2){
     			x = pg.x2;
     		}
     		if(y + h > pg.y2+ pg.h2){
     			x = pg.y2+ pg.h2 - h;
     		}else if(y < pg.y2){
     			y = pg.y2;
     		}    	    
    		kphoto.addMarginer("1",margin.viewID,"", margin.viewURI,x - pg.x2 ,y - pg.y2, dd.obj.w, dd.obj.h, dd.obj.w, dd.obj.h);
    	}
    	dd.obj.moveTo(pickedItem.x, pickedItem.y);   
		cellToHighlight = "";
    	return;
    }
    
    if (dd.obj.name.indexOf("tool") > 0){
		return;
	}
    if(pickedItem.viewID == "text-rect"){
    
	}else {
		var dropTime = new Date();
		var toCell = dropCell();
		var bookAlbumObj = null;
		var reloadAlbum = true;
		if (toCell != null) {
			dd.obj.moveTo(toCell.x, toCell.y); // "snap to" target cell feature - NOT NEEDED?
			var dzTarget = dzObj(toCell.name);
				if (pickedItem.fromAlbum) {
					var textCaption = kphoto.albumList[kphoto.albumIndex(pickedItem.viewID)].textCaption;
					if (dzTarget.hasPicture) {
						//dbg("swap:"+textCaption);
                        var alobj = kphoto.albumSourceObj(dzTarget.viewID);
                        alobj.isUsed = false;
                        //dbg("alobj.dv:"+alobj.dv);
						bookAlbumObj = new albumElement(dzTarget.viewID, alobj.viewURI, dzTarget.getAssociatedText(), alobj.dv,alobj.width,alobj.height,alobj.newURI);
						setPicture(dzTarget, pickedItem.viewID,textCaption);
                        var nowCategory = $("nowCategory");
                        if(nowCategory[nowCategory.selectedIndex].value == alobj.category
                            || nowCategory.selectedIndex==0){
                            kphoto.albumList[kphoto.albumIndex(dzTarget.viewID)] = bookAlbumObj ; // restore existing pic to 'albumTray'
                        }else{
						    var i = parseInt(kphoto.albumIndex(pickedItem.viewID));
						    kphoto.albumList = kphoto.albumList.slice(0,i).concat(kphoto.albumList.slice(i+1));
                        }
					}
					else {
						//dbg("setPicture:"+pickedItem.viewID);
						setPicture(dzTarget, pickedItem.viewID,textCaption);
						var i = parseInt(kphoto.albumIndex(pickedItem.viewID));
						kphoto.albumList = kphoto.albumList.slice(0,i).concat(kphoto.albumList.slice(i+1));
					}
				}
				else if (pickedItem.viewID != dzTarget.viewID) { // 'pickedItem' from a dropZone so swap items
					//dbg("bookswap");
					var dzSource = dzObj(pickedItem.name);
					swapPictures(dzTarget, dzSource);
					reloadAlbum = false;
				}
		}
		else if (pickedItem!=null && !pickedItem.fromAlbum){
			//代表某zone被點擊
			if (dropTime.getTime() - clickTime.getTime() < clickTimer) { // dropZone clicked, set border and show tool palette - 1400 for Mac IE
				clickID = pickedItem.name;
			}
		}
		else if (!pickedItem.fromAlbum && boxOverlap(dd.obj, pickedItem) == -1){
			kphoto.picRemove(pickedItem.name); // dropZone pic droppped off all targets
		}else{
			if(kphoto.lstable=="2" || kphoto.lown=="1"){
				//任意位置圖加入
		    	if(cellToHighlight == "left-page" ){
				    var alobj = kphoto.albumSourceObj(pickedItem.viewID);
				    alobj.isUsed = true;
		     		var x = dd.obj.x;
		     		var y = dd.obj.y;
		     		var w = dd.obj.w;
		     		var h = dd.obj.h;
		     		if(x + w > pg.x1+ pg.w1){
		     			x = pg.x1+ pg.w1 - w;
		     		}else if(x < pg.x1){
		     			x = pg.x1;
		     		}
		     		if(y + h > pg.y1+ pg.h1){
		     			x = pg.y1+ pg.h1 - h;
		     		}else if(y < pg.y1){
		     			y = pg.y1;
		     		}   
		     		dbg("dd.obj.nw:" + dd.obj.nw);
		     		var iobj;
		     		if(alobj.step * 1 > 0){
		    			iobj = kphoto.addImager("0",pickedItem.viewID, alobj.viewURI, alobj.newURI,x - pg.x1 ,y - pg.y1, dd.obj.w, dd.obj.h, alobj.nw, alobj.nh);
		    			kphoto.autoZoom(iobj.id);
		    		}else{
		    			iobj = kphoto.addImager("0",pickedItem.viewID, alobj.viewURI, alobj.newURI,x - pg.x1 ,y - pg.y1, dd.obj.w, dd.obj.h, dd.obj.w, dd.obj.h);
		    		}
		    		kphoto.setAlbumSourceUsed(pickedItem.viewID,true);
					var i = parseInt(kphoto.albumIndex(pickedItem.viewID));
					kphoto.albumList = kphoto.albumList.slice(0,i).concat(kphoto.albumList.slice(i+1));	
					kphoto.sid = iobj.id;
					showGrips();
		    	} 
		    }
			if(kphoto.rstable=="2" || kphoto.rown=="1"){		    	
		    	if(cellToHighlight == "right-page" ){
				    var alobj = kphoto.albumSourceObj(pickedItem.viewID);
				    alobj.isUsed = true;
		     		var x = dd.obj.x;
		     		var y = dd.obj.y;
		     		var w = dd.obj.w;
		     		var h = dd.obj.h;
		     		if(x + w > pg.x2+ pg.w2){
		     			x = pg.x2+ pg.w2 - w;
		     		}else if(x < pg.x2){
		     			x = pg.x2;
		     		}
		     		if(y + h > pg.y2+ pg.h2){
		     			x = pg.y2+ pg.h2 - h;
		     		}else if(y < pg.y2){
		     			y = pg.y2;
		     		}   
		     		// step 1:先裁切 2:先轉圖 3:裁切,後轉圖 4:轉圖,後裁切
		     		var iobj;
		     		if(alobj.step * 1 > 0){ 
		    			iobj = kphoto.addImager("1",pickedItem.viewID, alobj.viewURI, alobj.newURI,x - pg.x2 ,y - pg.y2, dd.obj.w, dd.obj.h, alobj.nw, alobj.nh);
		    		}else{
		    			iobj = kphoto.addImager("1",pickedItem.viewID, alobj.viewURI, alobj.newURI,x - pg.x2 ,y - pg.y2, dd.obj.w, dd.obj.h, dd.obj.w, dd.obj.h);
		    		}
		    		kphoto.setAlbumSourceUsed(pickedItem.viewID,true);
					var i = parseInt(kphoto.albumIndex(pickedItem.viewID));
					kphoto.albumList = kphoto.albumList.slice(0,i).concat(kphoto.albumList.slice(i+1));	    	
					kphoto.sid = iobj.id;
					showGrips();	
		    	}
		    	dd.obj.moveTo(pickedItem.x, pickedItem.y);   
				cellToHighlight = "";
			}
		}
	    setIdProperty("left-page", "border", tranBorderStyle);
	    setIdProperty("right-page", "border", tranBorderStyle);
	    			
		// reset all borders
		cellToHighlight = "";
		for (var i=0; i < dropTargets.length; i++) {
           	var dzTarget = dzObj(dropTargets[i]);
            dzTarget.border2(dropZoneBorder);
		}
		//setStroke("thumbs", "solid white 2px");
		if(reloadAlbum==true){
			setTimeout("kphoto.showAlbum()", 10);
		}
		dd.obj.moveTo(pickedItem.x, pickedItem.y); // always return to original position!
		var sourceDZ = dzObj(dd.obj.name);
		if(sourceDZ!=null){
			sourceDZ.resetZ();
		}
	}
    tookDragCheck=false;
    showTools();
}

function setDraggableImages(dragOn) {
	for (var i=0; i < imageDropZones.length; i++)
		if (imageDropZones[i].hasPicture)
			dd.elements[imageDropZones[i].name].setDraggable(dragOn);
	setTimeout("kphoto.showAlbum("+!dragOn+")", 10);
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
	//dbg(swap[0]+"_"+swap[1]+"_"+swap[2]);
	que.update(dzTarget.imageName, dzSource.thumbURL);
	//dbg(dzSource.hasPicture+"_"+dzSource.viewID+"_"+dzSource.thumbURL);
	dzTarget.hasPicture = dzSource.hasPicture;
	dzTarget.viewID = dzSource.viewID;
    dzTarget.hasPicture = (dzTarget.viewID) ? true : false;
    if(dzTarget.hasPicture==true){
    	$(dzTarget.name).style.visibility = "visible";
    }else{
    	$(dzTarget.name).style.visibility = "hidden";
    }	
	dzTarget.thumbURL = dzSource.thumbURL;

	dzSource.hasPicture = swap[0];
	dzSource.viewID = swap[1];
    dzSource.hasPicture = (dzSource.viewID) ? true : false;
    if(dzSource.hasPicture==true){
    	$(dzSource.name).style.visibility = "visible";
    }else{
    	$(dzSource.name).style.visibility = "hidden";
    }	
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
        var textDivTarget = $(textTarget.name);
        var textDivSource = $(textSource.name);
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
        var textDivTarget = $(textTarget.name);
        var textDivSource = $(textSource.name);
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
	dd.elements[dzTarget.name].setDraggable(true);
    if(dzSource.thumbURL == "")
        setPicture(dzSource, "");
    else
    	que.update(dzSource.name, dzSource.thumbURL); // hide stretched thumbnail

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
                //dbg(box.getJustification());
                //dbg(box.getText());
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
    $('textBoxWarningImg').src = blankImg.src;
}
function _show() {
    if (!dd.dragOn)
        return false; // check if other dialog is already open
    var caption = getIdProperty( "textBox_text", "value" );
    var captionLength = caption.value.length;
    updateMessageCount(captionLength);
    setDraggableImages(false);
    showBox(this.name);
    $(this.name).style.zIndex = kphoto.zindexer.get("dialog");
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
	if($("messageCount"))
	{
		$("messageCount").innerHTML = cnt;
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
//------------------------------------------------------------------------------------
var imageDropZones = new Array();
var textZones = new Array();
var dropTargets = new Array(); // 'imageDropZones' for "image" areas only, not "text"
var dropZoneBorder = "transparent";

//var dialog = new Object();
	box = new TextBox(pg.x1+80, pg.y1+25, "", "images/sp.gif");
	box.out();

	var textZones = new Array();
	var blankImg = new Image();
	blankImg.src ="images/sp.gif";//kansker

	function hideBox(n) {
		var obj = $(n);
		obj.style.visibility = "hidden";
		obj.style.zIndex = "0";
		$("spreads").style.display = "block";
	}
	function showBox(n) {
		var obj = $(n);
		obj.style.visibility = "visible";
		obj.style.zIndex = "5000";
		if (is_ie) { // ie6 select options show thru floats
			var select = $("spreads");
			select.style.display = "none";
		}
	}
	function dbg(msg) {
		if ($("debug")) {
		    var debug = $("debug");
		    debug.innerHTML = msg+"<br>"+debug.innerHTML;
		    //var p = document.createElement("p");
		    //p.appendChild(document.createTextNode(msg));
		    //debug.appendChild(p);
	    }
    }
