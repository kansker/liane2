var KPHOTO = Class.create();
KPHOTO.prototype = {
	initialize : function() {
		this.toolsPanel = 0;
		this.imagerList = new Array(0);
		this.rectMenus = new Array(0);// 是否某rect menu //this.rectMenus[""] =
		// "1";
		this.sid = "";
		this.smap = new KeMap();
		this.zindexer = new ZIndexer();
		this.zindexer.add("DropZone", 100000);
		this.zindexer.add("TextZone", 200000);
		this.zindexer.add("imager", 450000);
		this.zindexer.add("iconer", 500000);
		this.zindexer.add("marginer", 600000);
		this.zindexer.add("dialog", 900000);
		this.zindexer.add("grip", 1000000);
		this.page = 0;// 目前頁數
		this.rtime = 0;// 計算重load pic,計時器.
		this.lstable = "0";// 0:可換版型1:不可換2:任意
		this.rstable = "0";
		this.lown = "0";// 設否為自訂背景
		this.rown = "0";
		this.luse = "1";// 左頁是否使用
		this.ruse = "1";// 右頁是否使用

		this.bookWidth = 0;
		this.bookHeight = 0;
		this.bookCenter = 0;// 書背寬

		this.test = 0;
		this.styleW1 = "";// 統一樣式
		this.styleW2 = "";// 統一樣式
		this.styleW1 = "";// 統一樣式
		this.styleH1 = "";// 統一樣式
		this.styleH2 = "";// 統一樣式
		this.styleH3 = "";// 統一樣式
		this.fontSizes = {};
		this.fontSizeNames = {};
		this.captionFonts = {};
		this.fontColors = {};
		this.mm = 1;
		this.grips = {};
		this.toolStatus = {};
		this.toolFlag = "11";
		this.pageKind = "1";// 1:內頁2:cover
		this.pageKind2 = "1";// 1:內頁2:cover
		this.tsFlag = 0;// modify Text Style的項目是誰1~4
		this.tsMode = 0;// 1:update
		this.photo_product = 1;
	},
	toXML : function() {
		var xml = '<?xml version="1.0" encoding="UTF-8"?>';
		xml += '<root>';
		for (var j = 0; j < this.imagerList.length; j++) {
			if (this.imagerList[j] != null) {
				var dobj = dd.elements[this.imagerList[j].id];
				dobj.fetch();
				xml += ('<imager api="' + this.imagerList[j].api
						+ '" fontType="' + this.imagerList[j].fontType
						+ '" fontSize="' + this.imagerList[j].fontSize 
						+ '" x="' + dobj.x 
						+ '" y="' + dobj.y 
						+ '" w="' + dobj.w
						+ '" h="' + dobj.h 
						+ '" fontKind="' + this.imagerList[j].fontKind 
						+ '" fontAlign="' + this.imagerList[j].fontAlign + '"/>');
			}
		}
		xml += '</root>';
		return xml;
	},
	initGrips : function() {
		if (this.grips["cap_0"] == null || this.grips["cap_1"] == null) {
			this.grips["cap_0"] = new Grip("plLPage", "cap_0");
			this.grips["cap_1"] = new Grip("plRPage", "cap_1");
		}
	},
	showGrips : function(id) {
		if (kphoto.mainDD() == null)
			return;
		this.moveGripsToCorners(id);
		var nid = id + "_" + kphoto.mainerObj().pos;
		this.grips[nid].lt.setZ(kphoto.zindexer.get("grip"));
		this.grips[nid].rt.setZ(kphoto.zindexer.get("grip"));
		this.grips[nid].rb.setZ(kphoto.zindexer.get("grip"));
		this.grips[nid].lb.setZ(kphoto.zindexer.get("grip"));
		this.grips[nid].lt.show();
		this.grips[nid].rt.show();
		this.grips[nid].rb.show();
		this.grips[nid].lb.show();
		if (kphoto.mainerObj().pos == "1") {
			nid = id + "_0";
		} else {
			nid = id + "_1";
		}
		this.grips[nid].lt.hide();
		this.grips[nid].rt.hide();
		this.grips[nid].rb.hide();
		this.grips[nid].lb.hide();
	},
	moveGripsToCorners : function(id) {
		var mainDD = kphoto.mainDD();
		var m = 0;
		var nid = id + "_" + kphoto.mainerObj().pos;
		this.grips[nid].lt.moveTo(m + mainDD.x, mainDD.y);
		this.grips[nid].rt.moveTo(m + mainDD.x + mainDD.w - this.grips[nid].lt.w + 2, mainDD.y);
		this.grips[nid].rb.moveTo(m + mainDD.x + mainDD.w - this.grips[nid].lt.w + 2, mainDD.y + mainDD.h - this.grips[nid].lt.h+ 2);
		this.grips[nid].lb.moveTo(m + mainDD.x , mainDD.y + mainDD.h - this.grips[nid].lt.h + 2);
	},
	hideGrips : function(id) {
		if (kphoto.pageKind == "3") {
			return;
		}
		if (kphoto.mainerObj() == null) {
			var nid = id + "_0";
			this.grips[nid].lt.hide();
			this.grips[nid].rt.hide();
			this.grips[nid].rb.hide();
			this.grips[nid].lb.hide();

			nid = id + "_1";
			this.grips[nid].lt.hide();
			this.grips[nid].rt.hide();
			this.grips[nid].rb.hide();
			this.grips[nid].lb.hide();
			return;
		}
		var nid = id + "_" + kphoto.mainerObj().pos;
		this.grips[nid].lt.hide();
		this.grips[nid].rt.hide();
		this.grips[nid].rb.hide();
		this.grips[nid].lb.hide();
	},
	mainDD : function() {
		if (this.sid == "") {
			return null;
		}
		dd.elements[this.sid].fetch();
		return dd.elements[this.sid];
	},
	mainerObj : function() {
		if (this.sid == "") {
			return null;
		}
		for (var j = 0; j < this.imagerList.length; j++) {
			if (this.imagerList[j] != null && this.imagerList[j].id == this.sid)
				return this.imagerList[j];
		}
		return null;
	},
	obj : function(id) {
		if (id == "") {
			return null;
		}
		for (var j = 0; j < this.imagerList.length; j++) {
			if (this.imagerList[j] != null && this.imagerList[j].id == id)
				return this.imagerList[j];
		}
		return null;
	}
}
KPHOTO.prototype.setMainer = function(id) {
	this.sid = id;
	this.smap.removeAll();
	this.smap.add(id);
	this.showGrips("cap");
}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
KPHOTO.prototype.renewImager = function(id) {
	for (var i = 0; i < this.imagerList.length; i++) {
		var imagerObj = this.imagerList[i];
		if (imagerObj.id == id) {
			var test = true;
			if (dd.elements[imagerObj.id] == null) {
				test = false;
			}
			var uri = imagerObj.viewURI;
			if (imagerObj.newURI != "") {
				uri = imagerObj.newURI;
			}

			if (imagerObj.pos == "0") {
				ADD_IMAGE("plLPage", id, uri, imagerObj.z);
				dd.elements[id].moveTo(imagerObj.left, imagerObj.top);
				dd.elements[id].resizeTo(imagerObj.width, imagerObj.height);
			} else {
				ADD_IMAGE("plRPage", id, uri, imagerObj.z);
				dd.elements[id].moveTo(imagerObj.left, imagerObj.top);
				dd.elements[id].resizeTo(imagerObj.width, imagerObj.height);
			}
			if (test == false) {
				dd.elements[imagerObj.id].setDraggable(true);
			}
			// $j('#'+imagerObj.id).imagerMenu();
			$j('#' + imagerObj.id).unbind('click');
			$j('#' + imagerObj.id).click(function(event) {
						//mselect(event, id);
					});
			break;
		}
	}
}
KPHOTO.prototype.clear = function() {
	while (this.albumSourceList.length > 0) {
		this.albumSourceList[this.albumSourceList.length - 1] = null;
		this.albumSourceList.length = this.albumSourceList.length - 1;
	}
	while (this.imagerList.length > 0) {
		if (this.imagerList[this.imagerList.length - 1] != null) {
			dd.elements[this.imagerList[this.imagerList.length - 1].id].del();
		}
		if (this.imagerList[this.imagerList.length - 1] != null
				&& $(this.imagerList[this.imagerList.length - 1].id) != null) {
			$(this.imagerList[this.imagerList.length - 1].id).remove();
		}
		this.imagerList[this.imagerList.length - 1] = null;
		this.imagerList.length = this.imagerList.length - 1;
	}
	this.sid = "";
}
KPHOTO.prototype.clear2 = function() {
	while (this.imagerList.length > 0) {
		if (this.imagerList[this.imagerList.length - 1] != null) {
			dd.elements[this.imagerList[this.imagerList.length - 1].id].del();
		}
		if (this.imagerList[this.imagerList.length - 1] != null
				&& $(this.imagerList[this.imagerList.length - 1].id) != null) {
			$(this.imagerList[this.imagerList.length - 1].id).remove();
		}
		this.imagerList[this.imagerList.length - 1] = null;
		this.imagerList.length = this.imagerList.length - 1;
	}
	this.sid = "";
}
KPHOTO.prototype.delImager = function(id) {
	for (var j = 0; j < this.imagerList.length; j++) {
		if (this.imagerList[j] != null && this.imagerList[j].id == id) {
			$(this.imagerList[j].id).remove();
			this.imagerList[j] = null;
			this.imagerList = this.imagerList.slice(0, j).concat(this.imagerList.slice(j + 1));
			this.sid = "";
			break;
		}
	}

}

KPHOTO.prototype.del = function() {
	for (var i = 0; i < this.smap.sids.length; i++) {
		var obj = this.obj(this.smap.sids[i]);
		if (this.smap.sids[i].indexOf("imager") == 0) {
			var obj = kphoto.obj(this.smap.sids[i]);
			if (obj != null) {
				var viewID = obj.viewID;
				kphoto.delImager(this.smap.sids[i]);
			}
		} 
	}
	kphoto.hideGrips("cap");
}

KPHOTO.prototype.imagerObj = function(id) {// 使用者
	for (var j = 0; j < this.imagerList.length; j++) {
		if (this.imagerList[j] != null && this.imagerList[j].id == id)
			return this.imagerList[j];
	}
	return null;
}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
KPHOTO.prototype.addImager = function(pos, viewID, viewURI, newURI, l, t, w, h,
		sw, sh) {
	var id = "imager_" + pos + "_" + this.imagerList.length;
	var imagerObj = new imager(this, id, pos, viewID, viewURI, newURI, l, t, w,
			h, sw, sh, this.zindexer.get("imager"));
	this.imagerList[this.imagerList.length] = imagerObj;
	var uri = imagerObj.viewURI;
	if (imagerObj.newURI != "") {
		uri = imagerObj.newURI;
	}
	if (pos == "0") {
		ADD_IMAGE("plLPage", id, uri, imagerObj.z);
		dd.elements[id].moveTo(l, t);
		dd.elements[id].resizeTo(w, h);
	} else {
		ADD_IMAGE("plRPage", id, uri, imagerObj.z);
		dd.elements[id].moveTo(l, t);
		dd.elements[id].resizeTo(w, h);
	}
	if (this.pageKind == "1" || this.pageKind == "2") {
		dd.elements[id].setDraggable(true);
		$j('#' + id).unbind('click');
		$j('#' + id).click(function(event) {
					mselect(event, id);
				});
	}
	return imagerObj;
}
KPHOTO.prototype.editImager = function(id, newlpic, w, h) {
	var obj = this.imagerObj(id);
	obj.newURI = newlpic;
	obj.width = w;
	obj.height = h;
	obj.swidth = w;
	obj.sheight = h;
	var uri = obj.viewURI;
	if (obj.newURI != "") {
		uri = obj.newURI;
	}
	EDIT_IMAGE(obj.id, uri);

	dd.elements[obj.id].moveTo(obj.left, obj.top);
	dd.elements[obj.id].resizeTo(obj.width, obj.height);
}

KPHOTO.prototype.editImager2 = function(id, newlpic, w, h, sw, sh) {
	var obj = this.imagerObj(id);
	obj.newURI = newlpic;
	obj.width = w;
	obj.height = h;
	obj.swidth = sw;
	obj.sheight = sh;
	var uri = obj.viewURI;
	if (obj.newURI != "") {
		uri = obj.newURI;
	}
	EDIT_IMAGE(obj.id, uri);
	dd.elements[obj.id].moveTo(obj.left, obj.top);
	dd.elements[obj.id].resizeTo(obj.width, obj.height);
}
// ---------------------------------------------------------------------------------------------------------------------
