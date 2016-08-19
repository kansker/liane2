
// 圖塊被選準備備拖曳時
function itemPicked(fromAlbum, ddObj, viewID, name) {
	try {
		this.fromAlbum = fromAlbum;
		this.x = ddObj.x;
		this.y = ddObj.y;
		this.w = ddObj.w;
		this.h = ddObj.h;
		this.viewID = viewID;
		this.name = name; // 'null' when 'fromAlbum==true'
	} catch (e) {
		alert("itemPicked error");
	}
}
var pickedItem = null;
function cap_PickFunc() {
	pickedItem = null;
}

function icon_PickFunc() {
	pickedItem = null;
	if (dd.obj.name.indexOf("imager") == 0) {
		// from album area
		var cellFrom = parseInt(dd.obj.name.substr("imager".length + 3, 1));
		if (kphoto.imagerList[cellFrom] == null)
			return;
		pickedItem = new itemPicked(true, dd.obj,
				kphoto.imagerList[cellFrom].viewID);
		kphoto.sid = dd.obj.name;
		kphoto.showGrips("cap");
	} else if (dd.obj.name.indexOf("iconer") == 0) {
		// from album area
		var cellFrom = parseInt(dd.obj.name.substr("iconer".length + 3, 1));
		if (kphoto.iconerList[cellFrom] == null)
			return;
		pickedItem = new itemPicked(true, dd.obj,
				kphoto.iconerList[cellFrom].viewID);
		kphoto.sid = dd.obj.name;
		kphoto.showGrips("cap");
	} else if (dd.obj.name.indexOf("marginer") == 0) {
		// from album area
		var cellFrom = parseInt(dd.obj.name.substr("marginer".length + 3, 1));
		if (kphoto.marginerList[cellFrom] == null)
			return;
		pickedItem = new itemPicked(true, dd.obj,
				kphoto.marginerList[cellFrom].viewID);
		kphoto.sid = dd.obj.name;
		kphoto.showGrips("cap");
	} else if (dd.obj.name.indexOf("ctext_") == 0) {
		// from album area
		var cellFrom = parseInt(dd.obj.name.substr("ctext".length + 3, 1));
		if (kphoto.textList[cellFrom] == null)
			return;
		pickedItem = new itemPicked(true, dd.obj,
				kphoto.textList[cellFrom].viewID);
		kphoto.sid = dd.obj.name;
		kphoto.showGrips("cap");
	}
}
function cimg_PickFunc() {
	pickedItem = null;
	var cellFrom = parseInt(dd.obj.name.substr("cimg".length));
	if (kphoto.iconTray[cellFrom] == null)
		return;
	pickedItem = new itemPicked(true, dd.obj, kphoto.iconTray[cellFrom].viewID);
}
function mimg_PickFunc() {
	// from album area
	var cellFrom = parseInt(dd.obj.name.substr("mimg".length));
	if (kphoto.marginTray[cellFrom] == null)
		return;
	pickedItem = new itemPicked(true, dd.obj,
			kphoto.marginTray[cellFrom].viewID);
}
var cellToHighlight = "";

function cap_DragFunc() {
	var mainDD = kphoto.mainDD();
	var mainerObj = kphoto.mainerObj();
	if (mainDD != null) {
		var id = "cap_" + kphoto.mainerObj().pos;
		var p = "plLPage";
		if (kphoto.mainerObj().pos == "1") {
			p = "plRPage";
		}
		if (dd.obj == kphoto.grips[id].rb) {
			if ((kphoto.grips[id].rb.y + kphoto.grips[id].rb.h ) > dd.elements[p].h) {
				kphoto.grips[id].rb.moveTo(kphoto.grips[id].rb.x, dd.elements[p].h - kphoto.grips[id].rb.h );
			}
			if (kphoto.grips[id].rb.x - kphoto.grips[id].lb.x > 5
					&& kphoto.grips[id].rb.y - kphoto.grips[id].rt.y > 5) {
				mainDD.resizeTo(kphoto.grips[id].rb.x - kphoto.grips[id].lb.x + kphoto.grips[id].rb.w - 4,
						kphoto.grips[id].rb.y - kphoto.grips[id].rt.y + kphoto.grips[id].rb.h - 4);
			}
		} else if (dd.obj == kphoto.grips[id].rt) {
			if (kphoto.grips[id].rt.x - kphoto.grips[id].lt.x > 5 && kphoto.grips[id].rb.y - kphoto.grips[id].rt.y > 5) {
				mainDD.resizeTo(kphoto.grips[id].rt.x - kphoto.grips[id].lt.x + kphoto.grips[id].lt.w - 4, kphoto.grips[id].rb.y - kphoto.grips[id].rt.y + kphoto.grips[id].rt.h - 4);
				mainDD.moveTo(kphoto.grips[id].rt.x - mainDD.w	+ kphoto.grips[id].rt.w - 4, 
								kphoto.grips[id].rt.y);
			}
		} else if (dd.obj == kphoto.grips[id].lb) {
			if (kphoto.grips[id].rb.x - kphoto.grips[id].lb.x > 5 && kphoto.grips[id].lb.y - kphoto.grips[id].lt.y > 5) {
				mainDD.moveTo(
						kphoto.grips[id].lb.x,
						kphoto.grips[id].lt.y);
				mainDD.resizeTo(kphoto.grips[id].rb.x - kphoto.grips[id].lb.x + kphoto.grips[id].lb.w - 4,
						kphoto.grips[id].lb.y - kphoto.grips[id].lt.y + kphoto.grips[id].lb.h - 4);
			}
		} else if (dd.obj == kphoto.grips[id].lt) {
			if (kphoto.grips[id].rt.x - kphoto.grips[id].lt.x > 5
					&& kphoto.grips[id].lb.y - kphoto.grips[id].lt.y > 5) {
				mainDD.moveTo(
						kphoto.grips[id].lt.x ,
						kphoto.grips[id].lt.y );
				mainDD.resizeTo(kphoto.grips[id].rt.x - kphoto.grips[id].lt.x + kphoto.grips[id].lt.w - 4,
						kphoto.grips[id].lb.y - kphoto.grips[id].lt.y + + kphoto.grips[id].lt.h - 4);
			}
		}
		if (mainDD.name.indexOf("ctext_") == 0 && mainerObj.fontSize * 1 != 0) {
			EDIT_IMAGE(mainDD.name, "images/sp.gif");
		}
	}
}
function cap_DropFunc() {
	if (kphoto.mainDD() != null) {
		kphoto.showGrips("cap");
		var cellFrom = parseInt(kphoto.mainDD().name.substr("imager".length + 3, 1));
		$j('#lrectTop' + cellFrom).val(kphoto.mainDD().y);
		$j('#lrectLeft' + cellFrom).val(kphoto.mainDD().x);
		$j('#lrectWidth' + cellFrom).val(kphoto.mainDD().w);
		$j('#lrectHeight' + cellFrom).val(kphoto.mainDD().h);
	}
}

function icon_DragFunc() {

}

function cimg_DragFunc() {
	if (cellToHighlight != "") {
		// setIdProperty(cellToHighlight, "border", "solid blue 2px");
		cellToHighlight = "";
	}
	var toCell = getDropPanel();
	if (toCell != null) {
		cellToHighlight = toCell.name;
	}
}

function icon_DropFunc() {
	var mainDD = kphoto.mainDD();
	if (mainDD == null) {
		return;
	}
	var mainerObj = kphoto.mainerObj();
	if (mainerObj == null) {
		return;
	}
	// dbg("icon_DropFunc mainDD.name:"+mainDD.name);
	var back = 0;
	var x = mainDD.x;
	var y = mainDD.y;
	var w = mainDD.w;
	var h = mainDD.h;
	// dbg("y0:"+y);
	if (mainerObj.pos == "0") {
		if (mainDD.x < 0) {
			back = 1;
			x = 0;
		}
		if (mainDD.y < 0) {
			back = 1;
			y = 0;
		}
		if (mainDD.x + mainDD.w > dd.elements["plLPage"].w) {
			back = 1;
			x = dd.elements["plLPage"].w - mainDD.w;
		}
		if (mainDD.y + mainDD.h > dd.elements["plLPage"].h) {
			back = 1;
			y = dd.elements["plLPage"].h - mainDD.h;
		}
	} else {
		if (mainDD.x < 0) {
			back = 1;
			x = 0;
		}
		if (mainDD.y < 0) {
			back = 1;
			y = 0;
		}
		if (mainDD.x + mainDD.w > dd.elements["plLPage"].w) {
			back = 1;
			x = dd.elements["plLPage"].w - mainDD.w;
		}
		if (mainDD.y + mainDD.h > dd.elements["plLPage"].h) {
			back = 1;
			y = dd.elements["plLPage"].h - mainDD.h;
		}
	}
	if (back == 1) {
		// mainDD.resizeTo(mainerObj.width,mainerObj.height);
		if (mainerObj.pos == "0") {
			mainerObj.left = x;
			mainerObj.top = y;
			mainDD.moveTo(mainerObj.left, mainerObj.top);
		} else {
			mainerObj.left = x;
			mainerObj.top = y;
			mainDD.moveTo(mainerObj.left, mainerObj.top);
		}
	} else {
		if (mainerObj.pos == "0") {
			mainerObj.left = mainDD.x;
			mainerObj.top = mainDD.y;
		} else {
			mainerObj.left = mainDD.x;
			mainerObj.top = mainDD.y;
		}
	}
	mainerObj.resetZ();
	var cellFrom = parseInt(mainDD.name.substr("imager".length + 3, 1));
	$j('#lrectTop' + cellFrom).val(mainDD.y);
	$j('#lrectLeft' + cellFrom).val(mainDD.x);
	$j('#lrectWidth' + cellFrom).val(mainDD.w);
	$j('#lrectHeight' + cellFrom).val(mainDD.h);
	kphoto.showGrips("cap");
	cellToHighlight = "";
	kphoto.smap.removeAll();
	kphoto.smap.add(mainerObj.id);
	//$j("#plSort").dialog('close');
}

// ------------------------------------------------------------------------------------
var blankImg = new Image();
blankImg.src = "images/sp.gif";// kansker
function dbg(msg) {
	if (checkKTagExist("debug")) {
		$j("#debug").html( msg + "<br>" + $j("#debug").html());
	}
}
