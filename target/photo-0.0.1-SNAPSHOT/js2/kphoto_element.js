// ------------------------------------基本元素---------------------------------------------------------------------------------
function Grip(pid, id) {
	this.pid = pid;
	this.id = id;

	ADD_IMAGE(this.pid, this.id + "_lefttop", "images/marker_rect.gif", 3);
	ADD_IMAGE(this.pid, this.id + "_righttop", "images/marker_rect.gif", 3);
	ADD_IMAGE(this.pid, this.id + "_rightbottom", "images/marker_rect.gif", 3);
	ADD_IMAGE(this.pid, this.id + "_leftbottom", "images/marker_rect.gif", 3);

	$j("#" + id + "_lefttop").draggable({
				containment : 'parent'
			});
	$j("#" + id + "_righttop").draggable({
				containment : 'parent'
			});
	$j("#" + id + "_rightbottom").draggable({
				containment : 'parent'
			});
	$j("#" + id + "_leftbottom").draggable({
				containment : 'parent'
			});
	var gw = 12;
	dd.elements[id + "_lefttop"].moveTo(0, 0);
	dd.elements[id + "_lefttop"].resizeTo(gw, gw);

	dd.elements[id + "_righttop"].moveTo(0, 0);
	dd.elements[id + "_righttop"].resizeTo(gw, gw);

	dd.elements[id + "_rightbottom"].moveTo(0, 0);
	dd.elements[id + "_rightbottom"].resizeTo(gw, gw);

	dd.elements[id + "_leftbottom"].moveTo(0, 0);
	dd.elements[id + "_leftbottom"].resizeTo(gw, gw);

	dd.elements[id + "_lefttop"].setDraggable(true);
	dd.elements[id + "_righttop"].setDraggable(true);
	dd.elements[id + "_rightbottom"].setDraggable(true);
	dd.elements[id + "_leftbottom"].setDraggable(true);

	this.lt = dd.elements[id + "_lefttop"];
	this.rt = dd.elements[id + "_righttop"];
	this.rb = dd.elements[id + "_rightbottom"];
	this.lb = dd.elements[id + "_leftbottom"];
}
function ZIndexer() {
	this.zer = new Array(0);
}
ZIndexer.prototype.add = function(name, start) {
	this.zer[name] = start;
}
ZIndexer.prototype.get = function(name) {
	var n = this.zer[name];
	this.zer[name] = n + 1;
	return n;
}
ZIndexer.prototype.getJump = function(name, r) {
	var n = this.zer[name];
	this.zer[name] = n + 1 * r;
	return n;
}
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------使用元素------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
function imager(parent, id, pos, viewID, viewURI, newURI, l, t, w, h, sw, sh, z) {
	dbg("add w:" + w);
	dbg("add h:" + h);
	this.id = id;
	this.pos = pos;
	this.parent = parent;
	this.viewID = viewID;
	this.viewURI = viewURI;
	this.newURI = newURI;
	this.left = l;
	this.top = t;
	this.width = w;
	this.height = h;
	this.swidth = sw;
	this.sheight = sh;
	this.z = z;
}
imager.prototype.toString = function() {
	return "id:" + this.id + "\r\npos:" + this.pos + "\r\nviewID:"
			+ this.viewID + "\r\nviewURI:" + this.viewURI + "\r\nleft:"
			+ this.left + "\r\ntop:" + this.top + "\r\nwidth:" + this.width
			+ "\r\nheight:" + this.height + "\r\nswidth:" + this.swidth
			+ "\r\nsheight:" + this.sheight + "\r\nz:" + this.z;
}

imager.prototype.back = function() {
	if (this.pos == "0") {
		dd.elements[this.id].moveTo(this.left, this.top);
	} else {
		dd.elements[this.id].moveTo(this.left, this.top);
	}
	dd.elements[this.id].resizeTo(this.width, this.height);
	$(this.id).style.zIndex = this.z;
}

imager.prototype.resetZ = function() {
	$(this.id).style.zIndex = this.z;
}
function KeMap() {
	this.sids = new Array(0);
	this.sids2 = {};
}
KeMap.prototype.add = function(sid) {
	if (this.sids2[sid] == null || this.sids2[sid] == "") {
		this.sids[this.sids.length] = sid;
		this.sids2[sid] = "" + (this.sids.length - 1);
		$j("#" + sid).css("border", "solid red 1px");
		dbg("add:" + sid);
	} else {
		dbg("contain:" + sid);
	}
}
KeMap.prototype.remove = function(sid) {
	if (this.sids2[sid] != null && this.sids2[sid] != "") {
		var i = this.sids2[sid] * 1;
		this.sids = this.sids.slice(0, i).concat(this.sids.slice(i + 1));
		this.sids2[sid] = "";
		$j("#" + sid).css("border", "0px");
	}
}
KeMap.prototype.removeAll = function() {
	for (var i = 0; i < this.sids.length; i++) {
		$j("#" + this.sids[i]).css("border", "0px");
	}
	this.sids = new Array(0);
	this.sids2 = {};
}
KeMap.prototype.contains = function(sid) {
	if (this.sids2[sid] != null && this.sids2[sid] != "") {
		return true;
	}
	return false;
}
KeMap.prototype.size = function() {
	dbg('length:' + this.sids.length);
	return this.sids.length;
}
KeMap.prototype.alert = function() {
	for (var i = 0; i < this.sids.length; i++) {
		alert(this.sids[i]);
	}
}
