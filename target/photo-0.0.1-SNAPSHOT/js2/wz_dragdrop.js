var spacer = 'transparentpixel.gif';
var dd_cursors = new Array('c:default', 'c:crosshair', 'c:e-resize', 'c:hand',
		'c:help', 'c:move', 'c:n-resize', 'c:ne-resize', 'c:nw-resize',
		'c:s-resize', 'c:se-resize', 'c:sw-resize', 'c:text', 'c:w-resize',
		'c:wait');
for (var dd_i = dd_cursors.length; dd_i;) {
	--dd_i;
	eval('var CURSOR_'
			+ (dd_cursors[dd_i].substring(2).toUpperCase().replace('-', '_'))
			+ ' = "' + dd_cursors[dd_i] + '";');
}
var dd_u = "undefined";
function WZDD() {
	this.elements = new Array(0);
	this.obj = null;
	this.px = 'px';
	this.cursor = "hand";
	this.z = 1;
}
var dd = new WZDD();

dd.Int = function(d_x, d_y) {
	return isNaN(d_y = parseInt(d_x)) ? 0 : d_y;
};

dd.addElement = function(d_o) {
	dd.elements[d_o.name] = dd.elements[d_o.index = dd.elements.length] = d_o;
};
dd.finlz = function() {
	if (dd.ie && dd.elements) {
		for (var d_i = dd.elements.length; d_i;)
			dd.elements[--d_i].del();
	}
};
dd.back = function() {
	for (var i = 0; i < dd.elements.length; i++) {
		dd.elements[i].back();
	}
};

function DDObj(id, pid) {
	this.pid = pid;
	this.id = id;
	this.name = this.id;
	this.x = $j("#" + this.id).offset().left;
	this.y = $j("#" + this.id).offset().top;
	if (this.pid != "" && this.pid != null) {
		this.rx = $j("#" + this.id).offset().left
				+ $j("#" + this.pid).offset().left;
		this.ry = $j("#" + this.id).offset().top
				+ $j("#" + this.pid).offset().top;
	} else {
		this.rx = this.x
		this.rx = this.y
	}
	this.w = $j('#' + this.id)[0].style.pixelWidth;
	this.h = $j('#' + this.id)[0].style.pixelHeight;
	this.z = $j('#' + this.id).css('zIndex');

	this.visible = true;
	this.cursor = dd.cursor;
}

DDObj.prototype.moveTo = function(d_x, d_y) {
	this.x = d_x;
	this.y = d_y;
	if (this.pid != "" && this.pid != null) {
		this.rx = d_x + $j("#" + this.pid).offset().left;
		this.ry = d_y + $j("#" + this.pid).offset().top;
		$j('#' + this.id).css({
					top : (d_y * 1 + $j("#" + this.pid).offset().top) + "px",
					left : (d_x * 1 + $j("#" + this.pid).offset().left) + 'px'
				});
	} else {
		this.rx = this.x
		this.rx = this.y
		$j('#' + this.id).css({
					top : d_y * 1 + 'px',
					left : d_x * 1 + 'px'
				});
	}
};
DDObj.prototype.back = function() {
	if ($j('#' + this.id).length > 0) {
		if (this.pid != "" && this.pid != null) {
			$j('#' + this.id)[0].style.top = (this.y * 1 + $j("#" + this.pid)
					.offset().top)
					+ 'px';
			$j('#' + this.id)[0].style.left = (this.x * 1 + $j("#" + this.pid)
					.offset().left)
					+ 'px';
		} else {
			$j('#' + this.id)[0].style.top = this.y * 1 + 'px';
			$j('#' + this.id)[0].style.left = this.x * 1 + 'px';
		}
	}
};
DDObj.prototype.draggable = function(d) {
	$j('#' + this.id).draggable(d);// disable enable
};
DDObj.prototype.hide = function() {
	$j("#" + this.id).hide();
	this.visible = false;
};
DDObj.prototype.show = function() {
	$j("#" + this.id).show();
	this.visible = true;
};
DDObj.prototype.resizeTo = function(d_w, d_h) {
	$j('#' + this.id)[0].style.width = d_w * 1 + 'px';
	$j('#' + this.id)[0].style.height = d_h * 1 + 'px';

	this.w = $j("#" + this.id)[0].style.pixelWidth;
	this.h = $j("#" + this.id)[0].style.pixelHeight;
};
DDObj.prototype.resizeBy = function(d_dw, d_dh) {
	$j("#" + this.id).width($j("#" + this.id)[0].style.pixelWidth + d_w);
	$j("#" + this.id).height($j("#" + this.id)[0].style.pixelHeight + d_h);
	this.w = $j("#" + this.id)[0].style.pixelWidth;
	this.h = $j("#" + this.id)[0].style.pixelHeight;
};
DDObj.prototype.swapImage = function(src) {
	$j("#" + this.id).attr("src", src);
};
DDObj.prototype.fetch = function() {
	if (this.pid != "" && this.pid != null) {
		this.x = $j("#" + this.id)[0].style.pixelLeft
				- $j("#" + this.pid).offset().left;
		this.y = $j("#" + this.id)[0].style.pixelTop
				- $j("#" + this.pid).offset().top;
		this.rx = $j("#" + this.id)[0].style.pixelLeft;
		this.ry = $j("#" + this.id)[0].style.pixelTop;
	} else {
		this.x = $j("#" + this.id)[0].style.pixelLeft;
		this.y = $j("#" + this.id)[0].style.pixelTop;
		this.rx = $j("#" + this.id)[0].style.pixelLeft;
		this.ry = $j("#" + this.id)[0].style.pixelTop;
	}
	this.w = $j("#" + this.id)[0].style.pixelWidth;
	this.h = $j("#" + this.id)[0].style.pixelHeight;
};
DDObj.prototype.setBgColor = function(d_x) {
	$j(this.id).css({
				'background-color' : d_x
			});
};
DDObj.prototype.setZ = function(z) {
	dd.z = Math.max(dd.z, z);
	$j('#' + this.id).css('zIndex', z);
	this.z = $j('#' + this.id).css('zIndex');
};
DDObj.prototype.maximizeZ = function() {
	dd.z = Math.max(dd.z + 1, $j('#' + this.id).css('zIndex'));
	$j('#' + this.id).css('zIndex', dd.z);
	this.z = $j('#' + this.id).css('zIndex');
};
DDObj.prototype._resetZ = function(d_o) {
	$j('#' + this.id).css('zIndex', this.z);
};
DDObj.prototype.setDraggable = function(bDrag) {
	if (bDrag == true) {
		$j('#' + this.id).css("cursor", "hand");
		$j('#' + this.id).draggable('enable');
		if (this.id.indexOf("imager") == 0) {
			$j('#' + this.id).click(function() {
						// $j('#'+this.id).effect("bounce");
						dd.obj = dd.elements[this.id];
						kphoto.sid = dd.obj.name;
						kphoto.showGrips("cap");
					});
			$j('#' + this.id).draggable({
						drag : function(event, ui) {
							if (window.icon_DragFunc)
								icon_DragFunc();
						},
						stop : function(event, ui) {
							if (!oBrowser.isIE
									&& this.id.indexOf("ctext_") != 0)
								$j(this).css("opacity", "1");
							dd.obj.fetch();
							dd.obj._resetZ();
							kphoto.showGrips("cap");
							if (window.icon_DropFunc)
								icon_DropFunc();
						},
						start : function(event, ui) {
							dd.obj = dd.elements[this.id];
							if (!oBrowser.isIE
									&& this.id.indexOf("ctext_") != 0)
								$j(this).css("opacity", "0.6");
							if (window.icon_PickFunc)
								icon_PickFunc();
						}
					});
		} else if (this.id.indexOf("cap_") == 0) {
			$j('#' + this.id).draggable({
						drag : function(event, ui) {
							dd.obj.fetch();
							if (window.cap_DragFunc)
								cap_DragFunc();
						},
						stop : function(event, ui) {
							if (!oBrowser.isIE)
								$j(this).css("opacity", "1");
							dd.obj.fetch();
							dd.obj._resetZ();
							if (window.cap_DropFunc)
								cap_DropFunc();

						},
						start : function(event, ui) {
							if (!oBrowser.isIE)
								$j(this).css("opacity", "0.6");
							dd.obj = dd.elements[this.id];
							if (window.cap_PickFunc)
								cap_PickFunc();
						}
					});
		}
	} else {
		$j('#' + this.id).draggable('disable');
	}
	this.nodrag = !bDrag * 1;
};

DDObj.prototype.del = function() {
	dd.elements[this.name] = null;
};
DDObj.prototype._free = function() {
	dd.elements[this.name] = null;
};
dd.reszTo = function(d_w, d_h) {
	if (dd.n4 && dd.obj.is_image)
		dd.n4Rect(d_w, d_h);
	else
		dd.obj.resizeTo(d_w, d_h);
};

function ADD_DHTML(id, pid) {
	var d_o = new DDObj(id, pid);
	dd.addElement(d_o);
	if ($j('#' + d_o.id).css('zIndex') != "auto") {
		dd.z = Math.max(dd.z, $j('#' + d_o.id).css('zIndex'));
	}
}
function ADD_DIV(pid, id, z) {
	if ($j("#" + id).length == 0) {
		$j("#" + pid).append("<div id='" + id + "'></div>");
	}
	$j('#' + id)[0].style.position = "absolute";
	$j('#' + id).css('zIndex', z);
	if (dd.elements[id] == null) {
		var d_o = new DDObj(id, pid);
		dd.addElement(d_o);
		dd.z = Math.max(dd.z, $j('#' + d_o.id).css('zIndex'));
	}
}
function ADD_IMAGE(pid, id, u, z) {
	if (!oBrowser.isIE) {
		if ($j("#" + id).length == 0) {
			$j("#" + pid).append("<img id='" + id + "'/>");
		}
		$j("#" + id).attr("src", u);
	} else if (oBrowser.isIE) {
		if ($j("#" + id).length == 0) {
			$j("#" + pid).append("<div id='" + id + "'></div>");
		}
		if (photo_space_img != u) {
			$(id).style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src='"
					+ u + "',sizingMethod='scale')";
		} else {
			$(id).style.filter = "";
		}
	}
	$j('#' + id)[0].style.position = "absolute";
	$j('#' + id).css('zIndex', z);
	if (dd.elements[id] == null) {
		var d_o = new DDObj(id, pid);
		dd.addElement(d_o);
		dd.z = Math.max(dd.z, $j('#' + d_o.id).css('zIndex'));
	}
}
function EDIT_IMAGE(id, u) {
	if (!oBrowser.isIE) {
		if ($j("#" + id).length >= 1) {
			$j("#" + id).attr("src", u);
		}
	} else if (oBrowser.isIE) {
		if ($j("#" + id).length >= 1) {
			if (photo_space_img != u) {
				$(id).style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src='"
						+ u + "',sizingMethod='scale')";
			} else {
				$(id).style.filter = "";
			}
		}
	}
}
dd.d = document;
function my_DragFunc() {
}
function my_ResizeFunc() {
}
function my_DropFunc() {
}
function cap_DragFunc() {
}
function icon_DragFunc() {
}
function icon_PickFunc() {
}
function icon_DropFunc() {
}
function cap_DropFunc() {
}
function cap_PickFunc() {
}
