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

var base_url ='images/';
var newWidth = 0; 
var newHeight = 0;
var VnbMode = 0;

function urlEncode(st) {
	st = escape(st);
	var newSt = ""; 
	for (var i=0; i<st.length; i++)
		if (st.charAt(i) == "+")
			newSt += "%2B";
		else
			newSt += st.charAt(i);
	return newSt;
}
function opt(str) {document.write(str);}


var g5h = 0;
var portrait = 0;
CROPHANDLESIZE = 17;
CROPHANDLEOUTER = 7;
opt('<STYLE type="text/css"><!-- .SFDYNEL{position:absolute; visibility:hidden} --></STYLE>');

//DivStore div的list儲存
function DivStore(id, html)
{
	this.id = id;
	this.html = html;
	opt('<SPAN id=' + id + ' class=SFDYNEL>' + html + '</SPAN>');
	DivStore.list[DivStore.list.length] = this;
}
DivStore.list = new Array();
DivStore.init = function()
{
	for (var i = 0; i < DivStore.list.length; ++i)
		DivStore.list[i].p_init();
	DivStore.list.length = 0;
}
DivStore.prototype.show = function(enable)
{
	this.p_show((arguments.length == 0 || enable) ? 'visible' : 'hidden');
}
DivStore.prototype.move = function(x, y)
{
	this.p_move(x ? Math.floor(x) : this.getX(), y ? Math.floor(y) : this.getY());
}
DivStore.prototype.clip = function(x, y, w, h)
{
	this.p_clip(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
}
if (document.all) {
	DivStore.prototype.getX = function()
	{
		return this.style.pixelLeft;
	}
	DivStore.prototype.getY = function()
	{
		return this.style.pixelTop;
	}
	DivStore.prototype.getImage = function(name)
	{
		return this.element.all[name];
	}
	DivStore.prototype.cursor = function(name)
	{
		this.style.cursor = name;
	}
	DivStore.prototype.p_init = function()
	{
		this.element = document.all[this.id];
		this.style   = this.element.style;
		this.style.width     = this.element.scrollWidth;
		this.style.height    = this.element.scrollHeight;
		this.style.pixelLeft = this.element.offsetLeft;
		this.style.pixelTop  = this.element.offsetTop;
		this.style.overflow  = 'hidden';
	}
	DivStore.prototype.p_show = function(state)
	{
		this.style.visibility = state;
	}
	DivStore.prototype.p_move = function(x, y)
	{
		this.style.pixelLeft = x;
		this.style.pixelTop  = y;
	}
	DivStore.prototype.p_clip = function(x, y, w, h)
	{
		this.style.clip = 'rect(' + y + ' ' + (x + w) +
			' ' + (y + h) + ' ' + x + ')';
	}
	DivStore.prototype.setBody = function(html)
	{
		this.element.innerHTML = html;
	}
	DivStore.prototype.setZ = function(z)
	{
		this.style.zIndex = z;
	}
	DivStore.prototype.p_upGrabRelease = function(e)
	{
		if (e.type == 'mousedown')
		document.onmouseup  = this.upFunc;
		else if (e.type == 'mouseup')
		document.onmouseup  = null;
	}
	DivStore.prototype.onevent = function(name, object, method)
	{
		var self = this;
		var func = function() {
			var e = event;
			e.cancelBubble = true;
			self.p_upGrabRelease(e);
			return object[method](this, e.type, e.x, e.y, e.button);
		}
		this.element[name] = func;
		if (name == 'onmouseup')
			this.upFunc = func;
	}
}
else if (is_nav6) {
	DivStore.prototype.getX = function()
	{
		return parseInt(this.style.left);
	}
	DivStore.prototype.getY = function()
	{
		return parseInt(this.style.top);
	}
	DivStore.prototype.getImage = function(name)
	{
		var s = 'find ' + name + '\n' + typeof(this.element) + '\n';
		for (var p in this.element) s += p + ': ' + this.element[p] + '\n';
			return this.element.firstChild;
	}
	DivStore.prototype.cursor = function(name)
	{
		this.style.cursor = name;
	}
	DivStore.prototype.p_init = function()
	{
		this.element = document.getElementById( this.id );
		this.style   = this.element.style;
		this.style.overflow  = 'hidden';
	}
	DivStore.prototype.p_show = function(state)
	{
		this.style.visibility = state;
	}
	DivStore.prototype.p_move = function(x, y)
	{
		this.style.left = x + "px";
		this.style.top  = y + "px";
	}
	DivStore.prototype.p_clip = function(x, y, w, h)
	{
		this.style.clip = 'rect(' + y + 'px, ' + (x + w) +
			'px, ' + (y + h) + 'px, ' + x + ')';
	}
	DivStore.prototype.setBody = function(html)
	{
		this.element.innerHTML = html;
	}
	DivStore.prototype.setZ = function(z)
	{
		this.style.zIndex = z;
	}
	DivStore.prototype.p_upGrabRelease = function(e)
	{
		if (e.type == 'mousedown')
			document.addEventListener("mouseup", this.upFunc, false);
		else if (e.type == 'mouseup')
			document.removeEventListener("mouseup", this.upFunc, false);
	}
	DivStore.prototype.onevent = function(name, object, method)
	{
			var self = this;
			var func = function(e) {
			e.stopPropagation();
			e.preventDefault();
			self.p_upGrabRelease(e);
			return object[method](this, e.type, (e.clientX + window.pageXOffset), (e.clientY + window.pageYOffset), e.button);
	}
	this.element[name] = func;
	if (name == 'onmouseup') {
			this.upFunc = func;
	}
	}
} else {
	DivStore.prototype.getX = function()
	{
		return this.layer.left;
	}
	DivStore.prototype.getY = function()
	{
		return this.layer.top;
	}
	DivStore.prototype.getImage = function(name)
	{
		return this.layer.document[name];
	}
	DivStore.prototype.cursor = function(name)
	{
	}
	DivStore.prototype.p_init = function()
	{
		this.layer = document[this.id];
		this.layer.document.write(this.html);
		this.layer.document.close();
	}
	DivStore.prototype.p_show = function(state)
	{
		this.layer.visibility = state;
	}
	DivStore.prototype.p_move = function(x, y)
	{
		this.layer.moveTo(x, y);
	}
	DivStore.prototype.p_clip = function(x, y, w, h)
	{
		this.layer.clip.left   = x;
		this.layer.clip.top    = y;
		this.layer.clip.width  = w;
		this.layer.clip.height = h;
	}
	DivStore.EVENTMASKS = {
		onmousedown:Event.MOUSEDOWN,
		onmouseup:Event.MOUSEUP,
		onmousemove:Event.MOUSEMOVE
	};
	DivStore.prototype.p_upGrabRelease = function(e)
	{
		if (e.type == 'mousedown')
		window.captureEvents(Event.MOUSEUP);
		else if (e.type == 'mouseup')
		window.releaseEvents(Event.MOUSEUP);
	}
	DivStore.prototype.onevent = function(name, object, method)
	{
		if (!DivStore.EVENTMASKS[name])
			return;
		this.layer.captureEvents(DivStore.EVENTMASKS[name]);
		var self = this;
		var func = function(e) {
			self.p_upGrabRelease(e);
			return object[method](self, e.type, e.pageX, e.pageY, e.which);
		}
		this.layer[name] = func;
		if (name == 'onmouseup')
			window.onmouseup = func;
	}
}
function Crod(id, src, srcWidth, srcHeight, minSize)
{
	dbg("Crod()-----");
	this.sWidth   = srcWidth;
	this.sHeight  = srcHeight;
	this.sMinSize = minSize;
	this.src      = src;
	this.srcid    = id + 'src';
	this.isMacIntExp4 = (is_ie && is_mac && parseInt(navigator.appVersion) == 4 && agt.indexOf('msie 5') == -1);
	this.isMacIntExp45 = (this.isMacIntExp4 && parseFloat(navigator.appVersion) == 4.5);
	this.masked = new DivStore(id + 'masked',   '<IMG NAME="' + this.srcid + '" SRC="' + src + '" WIDTH=' + srcWidth + ' HEIGHT=' + srcHeight + ' BORDER=0>');
	if (!this.isMacIntExp4) {
		this.mask     = new DivStore(id + 'mask',     '<IMG SRC="' + base_url + 'cromask.gif" WIDTH=' + srcWidth + ' HEIGHT=' + srcHeight + ' BORDER=0>');
		this.border   = new DivStore(id + 'border',   '<IMG SRC="' + base_url + 'croblack.gif" WIDTH=' + srcWidth + ' HEIGHT=' + srcHeight + ' BORDER=0>');
		this.mark = new Array();
		for (var i = 0; i < Crod.MARK.length; ++i)
			this.mark[i] = new DivStore(id + 'mark' + i, '<IMG SRC="' + base_url + 'crowhite.gif" WIDTH=' + srcWidth + ' HEIGHT=' + srcHeight + ' BORDER=0>');
		this.unmasked = new DivStore(id + 'unmasked', '<IMG SRC="' + src + '" WIDTH=' + srcWidth + ' HEIGHT=' + srcHeight + ' BORDER=0>');
	}

	this.handleUL = new DivStore(id + 'handleUL', '<IMG SRC="' + base_url + 'crohdlul.gif" WIDTH='+CROPHANDLESIZE+' HEIGHT='+CROPHANDLESIZE+' BORDER=0>');
	this.handleUR = new DivStore(id + 'handleUR', '<IMG SRC="' + base_url + 'crohdlur.gif" WIDTH='+CROPHANDLESIZE+' HEIGHT='+CROPHANDLESIZE+' BORDER=0>');
	this.handleLL = new DivStore(id + 'handleLL', '<IMG SRC="' + base_url + 'crohdlll.gif" WIDTH='+CROPHANDLESIZE+' HEIGHT='+CROPHANDLESIZE+' BORDER=0>');
	this.handleLR = new DivStore(id + 'handleLR', '<IMG SRC="' + base_url + 'crohdllr.gif" WIDTH='+CROPHANDLESIZE+' HEIGHT='+CROPHANDLESIZE+' BORDER=0>');
	if (this.isMacIntExp4) {
		this.mask = new DivStore(id + 'mask', '<IMG SRC="' + base_url + 'sp.gif" WIDTH=' + (srcWidth + 2) + ' HEIGHT=' + (srcHeight + 3) + ' BORDER=0>');
	}
	var html = '<IMG SRC="' + base_url + 'sp.gif" WIDTH=' + (srcWidth + Crod.TOL) + ' HEIGHT=' + (srcHeight + Crod.TOL) + ' BORDER=0>';
	if (is_nav4 || this.isMacIntExp45)
		html = '<A HREF="javascript:void(0);">' + html + '</A>';
	this.events   = new DivStore(id + 'events', html);
}
Crod.TOL    = 25;
Crod.NONE   = 0;
Crod.XSIDE  = 1;
Crod.YSIDE  = 4;
Crod.LEFT   = 1;
Crod.RIGHT  = 2;
Crod.TOP    = 4;
Crod.BOTTOM = 8;
Crod.ALL    = 15;
Crod.HANDLES = [ 0, 5, 10, 15, 3, 1, 2, 15, 12, 4, 8, 15, 15, 15, 15, 15 ];
Crod.MARK = [
{ x:1.0/3.0, y:0, width:2, height:"100%" },
{ x:2.0/3.0, y:0, width:2, height:"100%" },
{ x:0, y:1.0/3.0, width:"100%", height:1 },
{ x:0, y:2.0/3.0, width:"100%", height:1 }
];
Crod.prototype.init = function(x, y, w, h)
{
	dbg("prototype.init()");
	this.width    = w;
	this.height   = h;
	this.deadLeft = Math.floor((this.sWidth  - w) / 2);
	this.deadTop  = Math.ceil((this.sHeight - h) / 2);
	this.callback = null;
	if (!this.isMacIntExp4) {
		this.mask.clip(this.deadLeft, this.deadTop, this.width, this.height);
		this.masked.clip(this.deadLeft, this.deadTop, this.width, this.height);
	}
	if (this.isMacIntExp4) {
		this.handleUL.setZ(1);
		this.handleUR.setZ(1);
		this.handleLL.setZ(1);
		this.handleLR.setZ(1);
		this.events.setZ(2);
	}
	this.clip    = new Object();
	this.tmpClip = new Object();
	//    this.setShape('whole_auto');
	this.setWholeAutoShape();
	//y += Crod.TOL;
	this.move(x, y);
	this.sideMove = 0;
	this.events.onevent('onmousemove', this, 'onmove');
	this.events.onevent('onmousedown', this, 'ondown');
	this.events.onevent('onmouseup',   this, 'onup');
	this.events.onevent('ondrag',      this, 'ondrag');
	this.events.onevent('ondragstart', this, 'ondrag');
	this.events.onevent('onselectstart', this, 'ondrag');
}

Crod.prototype.getX1 = function()
{
	dbg("prototype.getX1()");
	return this.clip.x / this.width;
}
Crod.prototype.getY1 = function()
{
	dbg("prototype.getY1()");
	return 1.0 - (this.clip.y + this.clip.h) / this.height;
}
Crod.prototype.getX2 = function()
{
	dbg("prototype.getX2()");
	return (this.clip.x + this.clip.w) / this.width;
}
Crod.prototype.getY2 = function()
{
	dbg("prototype.getY2()");
	return 1.0 - this.clip.y / this.height;
}
Crod.prototype.set = function(x, y, w, h)
{
	dbg("prototype.set()");
	this.crop( 	Math.round(x * this.width),
	Math.round(y * this.height),
	Math.round(w * this.width),
	Math.round(h * this.height));
}
Crod.prototype.setCallback = function(callback)
{
	dbg("prototype.setCallback()");
	this.callback = callback;
}
Crod.prototype.show = function(enable)
{
	dbg("prototype.show()");
	if (enable == null)
		enable = true;
	this.mask.show(enable);
	this.masked.show(enable);
	if (!this.isMacIntExp4) {
		this.border.show(enable);
		this.unmasked.show(enable);
	}
	this.events.show(enable);
	if (enable)
		this.showHandles(0);
	else if (!this.isMacIntExp4) {
		for (var i = 0; i < Crod.MARK.length; ++i)
			this.mark[i].show(false);
		// SUQ ADDED
		// For NS - explicity hide handles
		this.handleUL.show(false);
		this.handleUR.show(false);
		this.handleLL.show(false);
		this.handleLR.show(false);
	}
}
Crod.prototype.move = function(x, y)
{
	dbg("prototype.move()");
	this.x = x;
	this.y = y;
	this.mask.move(x, y);
	this.masked.move(x, y);
	if (!this.isMacIntExp4) {
		this.border.move(x, y);
		this.unmasked.move(x, y);
		for (var i = 0; i < Crod.MARK.length; ++i)
			this.mark[i].move(x, y);
	} else {
		this.mask.move(x, y - 1);
	}
	this.events.move(x - 0.5*Crod.TOL, y - 0.5*Crod.TOL);
	this.moveHandles(this.clip.x, this.clip.y, this.clip.w, this.clip.h);
}
Crod.prototype.crop = function(x, y, w, h)
{
	dbg("prototype.crop()");
	this.clip.x = x;
	this.clip.y = y;
	this.clip.w = w;
	this.clip.h = h;
	this.showCrop(x, y, w, h);
	if (this.callback)
		this.callback(this);
	if (typeof showOrderOrShareButton != 'undefined')
		showOrderOrShareButton();
}
Crod.prototype.setNormalizedCropCorners = function(x1, y1, x2, y2)
{
	dbg("prototype.setNormalizedCropCorners()");
	x2 -= x1;
	y2 -= y1;
	x1 = Math.floor(x1 * this.width);
	y1 = Math.floor(y1 * this.height);
	x2 = Math.floor(x2 * this.width);
	y2 = Math.floor(y2 * this.height);
	this.clip.aspectRatio = x2 / y2;
	this.minSize = this.sMinSize;
	this.crop(x1, y1, x2, y2);
}

Crod.prototype.setWholeAutoShape = function()
{
	dbg("prototype.setWholeAutoShape()");
	this.clip.aspectRatio = this.width / this.height;
	this.minSize = this.sMinSize;
	this.crop(0, 0, this.width, this.height);
}

Crod.prototype.adaptAspect = function(newAspect, maxWidth)
{
	dbg("prototype.adaptAspect()");
	var cx = this.clip.x + 0.5 * this.clip.w;
	var cy = this.clip.y + 0.5 * this.clip.h;
	var a = this.clip.w * this.clip.h;
	var h = Math.sqrt(a / newAspect);
	var w = Math.floor(a / h + 0.5);
	h = Math.floor(h + 0.5);
	if (w > this.width) {
		w = this.width;
		h = Math.floor(w / newAspect + 0.5);
	}
	if (h > this.height) {
		h = this.height;
		w = Math.floor(h * newAspect + 0.5);
	}
	var x = Math.floor(cx - 0.5 * w);
	var y = Math.floor(cy - 0.5 * h);
	if (x < 0)
		x = 0;
	else if (x + w > this.width)
		x = this.width - w;
	if (y < 0)
		y = 0;
	else if (y + h > this.height)
	y = this.height - h;
	this.clip.aspectRatio = newAspect;
	if ( (w / this.width) > maxWidth) {
		var oldW = w;
		var oldH = h;
		/* the current w and h does not match maxWidth..
		need to recalculate w and h and recenter */
		w = Math.floor(this.width * maxWidth);
		h = Math.floor(w / newAspect);
		x += (oldW - w) / 2.0;
		y += (oldH - h) / 2.0;
	}
	this.crop(x, y, w, h);
}
Crod.prototype.getSides = function(x, y)
{
	//dbg("prototype.getSides()");
	var FscrollX = FscrollY = 0;
	if (document.all) { // fix scrolling bug : KB
		FscrollX = document.body.scrollLeft * -1;
		FscrollY = document.body.scrollTop * -1;
	}
	else if (agt.indexOf('safari') > -1) {
		FscrollX = document.body.scrollLeft;
		FscrollY = document.body.scrollTop;
	}
	x -= this.deadLeft + this.clip.x + FscrollX;
	y -= this.deadTop  + this.clip.y + FscrollY;
	if (x < -Crod.TOL)
	return 0;
	if (x > this.clip.w + Crod.TOL)
		return 0;
	if (y < -Crod.TOL)
		return 0;
	if (y > this.clip.h + Crod.TOL)
		return 0;
	var e  = Math.floor(((this.clip.w < this.clip.h) ? this.clip.w : this.clip.h) / 3.0);
	var e2 = Math.floor(e / 2);
	var x1 = e;
	var x2 = this.clip.w - e;
	var y1 = e;
	var y2 = this.clip.h - e;
	if (x >= e2 && x < this.clip.w - e2 && y >= e2 && y < this.clip.h - e2)
		return Crod.ALL;
	if (x < 0)
		x = 0;
	else if (x >= this.clip.w)
		x = this.clip.w - 1;
	if (y < 0)
		y = 0;
	else if (y >= this.clip.h)
		y = this.clip.h - 1;
	if (x + y < x1)
		return Crod.LEFT + Crod.TOP;
	if (y - x > y2)
		return Crod.LEFT + Crod.BOTTOM;
	if (x - y > x2)
		return Crod.RIGHT + Crod.TOP;
	if (x + y > x2 + this.clip.h)
		return Crod.RIGHT + Crod.BOTTOM;
	if (x < x1)
		if (y < y1)
			return (x - x1 < y - y1) ? Crod.LEFT : Crod.TOP;
		else
			return (x - x1 < y2 - y) ? Crod.LEFT : Crod.BOTTOM;
	else
		if (y < y1)
			return (x2 - x < y - y1) ? Crod.RIGHT : Crod.TOP;
		else
			return (x2 - x < y2 - y) ? Crod.RIGHT : Crod.BOTTOM;
}


Crod.prototype.ondown = function(e, type, x, y, button)
{
	dbg("prototype.ondown()");
	x -= this.x;
	y -= this.y;
	this.mx = x;
	this.my = y;
	this.copyClipToTmp();
	this.sideMove = this.getSides(x, y);
	this.showHandles(this.sideMove);
	return false;
}
Crod.prototype.onup = function(e, type, x, y, button)
{
	dbg("prototype.onup()");
	this.sideMove = 0;
	this.onmove(e, type, x, y, button);
	this.crop(this.tmpClip.x1, this.tmpClip.y1,
	this.tmpClip.x2 - this.tmpClip.x1,
	this.tmpClip.y2 - this.tmpClip.y1);
	return false;
}
Crod.prototype.onmove = function(e, type, x, y, button)
{
	//dbg("prototype.onmove()");
	if (this.sideMove == 0) {
		var sides = this.getSides(x - this.x, y - this.y);
		this.events.cursor(this.showHandles(sides) ? 'move' : 'auto');
		return false;
	}
	x -= this.x;
	y -= this.y;
	var dx = x - this.mx;
	var dy = y - this.my;
	if (this.sideMove == Crod.ALL)
	this.domove(dx, dy);
	else
		this.dosize(dx, dy);
	this.showCrop(this.tmpClip.x1, this.tmpClip.y1,
	this.tmpClip.x2 - this.tmpClip.x1,
	this.tmpClip.y2 - this.tmpClip.y1);
	return false;
}
Crod.prototype.ondrag = function()
{
	dbg("prototype.ondrag()");
	return false;
}
Crod.prototype.showHandles = function(sides)
{
	//dbg("prototype.showHandles()");
	var mask = (this.minSize == this.sMinSize) ? Crod.HANDLES[sides] : 0;
	var mask2 = (mask == 0) ? Crod.ALL : mask;
	mask2 = Crod.ALL;
	this.handleUL.show((mask2 & 1) != 0);
	this.handleUR.show((mask2 & 2) != 0);
	this.handleLL.show((mask2 & 4) != 0);
	this.handleLR.show((mask2 & 8) != 0);
	return (mask != 0);
}
Crod.prototype.showCrop = function(x, y, w, h)
{
	dbg("prototype.showCrop()");
	if (!this.isMacIntExp4) {
		this.border.clip(this.deadLeft + x, this.deadTop + y, w, h);
		this.unmasked.clip(this.deadLeft + x + 1, this.deadTop + y + 1, w - 2, h - 2);
		for (var i = 0; i < Crod.MARK.length; ++i) {
			var mx = x + Crod.MARK[i].x * w;
			var my = y + Crod.MARK[i].y * h;
			var mw, mh;
			if (typeof(Crod.MARK[i].width) == 'string')
				mw = 0.01 * parseFloat(Crod.MARK[i].width) * w;
			else
				mw = Crod.MARK[i].width;
			if (typeof(Crod.MARK[i].height) == 'string')
				mh = 0.01 * parseFloat(Crod.MARK[i].height) * h;
			else
				mh = Crod.MARK[i].height;
			this.mark[i].clip(this.deadLeft + mx, this.deadTop + my, mw, mh);
		}
	} else {
		x += this.deadLeft;
		y += this.deadTop;
		var body = '';
		body += '<IMG SRC="' + base_url + 'sp.gif" BORDER=0 WIDTH=' + this.sWidth + ' HEIGHT=1>';
		body += '<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0>';
		body += '<TR>';
		body += '<TD background="' + base_url + 'cromask.gif"><IMG BORDER=0 WIDTH=' + this.sWidth + ' HEIGHT=' + y + ' SRC="' + base_url + 'sp.gif"></TD>';
		body += '</TR>';
		body += '</TABLE>';
		body += '<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0>';
		body += '<TR>';
		body += '<TD background="' + base_url + 'cromask.gif"><IMG BORDER=0 WIDTH=' + x + ' HEIGHT=' + h + ' SRC="' + base_url + 'sp.gif"></TD>';
		body += '<TD background="' + base_url + 'sp.gif">';
		body += '<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0>';
		body += '<TR><TD bgcolor=black colspan=3><IMG BORDER=0 WIDTH=' + w + ' HEIGHT=1 SRC="' + base_url + 'sp.gif"></TD></TR>';
		body += '<TR><TD bgcolor=black><IMG BORDER=0 WIDTH=1 HEIGHT=' + (h - 2) + ' SRC="' + base_url + 'sp.gif"></TD>';
		body += '<TD><IMG BORDER=0 WIDTH=' + (w - 2) + ' HEIGHT=' + (h - 2) + ' SRC="' + base_url + 'sp.gif"></TD>';
		body += '<TD bgcolor=black><IMG BORDER=0 WIDTH=1 HEIGHT=' + (h - 2) + ' SRC="' + base_url + 'sp.gif"></TD></TR>';
		body += '<TR><TD bgcolor=black colspan=3><IMG BORDER=0 WIDTH=' + w + ' HEIGHT=1 SRC="' + base_url + 'sp.gif"></TD></TR>';
		body += '</TABLE>';
		body += '</TD>';
		body += '<TD background="' + base_url + 'cromask.gif"><IMG BORDER=0 WIDTH=' + (this.sWidth - x - w) + ' HEIGHT=' + h + ' SRC="' + base_url + 'sp.gif"></TD>';
		body += '</TR>';
		body += '</TABLE>';
		body += '<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0>';
		body += '<TR>';
		body += '<TD background="' + base_url + 'cromask.gif"><IMG BORDER=0 WIDTH=' + this.sWidth + ' HEIGHT=' + (this.sHeight - y - h) + ' SRC="' + base_url + 'sp.gif"></TD>';
		body += '</TR>';
		body += '</TABLE>';
		this.mask.setBody(body);
		x -= this.deadLeft;
		y -= this.deadTop;
	}
	this.moveHandles(x, y, w, h);
}
Crod.prototype.moveHandles = function(x, y, w, h)
{
	dbg("prototype.moveHandles()");
	x += this.x + this.deadLeft;
	y += this.y + this.deadTop;
	this.handleUL.move(x - CROPHANDLEOUTER, y - CROPHANDLEOUTER);
	this.handleUR.move(x + w + CROPHANDLEOUTER - CROPHANDLESIZE, y - CROPHANDLEOUTER);
	this.handleLL.move(x - CROPHANDLEOUTER, y + h + CROPHANDLEOUTER - CROPHANDLESIZE);
	this.handleLR.move(x + w + CROPHANDLEOUTER - CROPHANDLESIZE, y + h + CROPHANDLEOUTER - CROPHANDLESIZE);
}
Crod.prototype.widthToHeight = function(n, h)
{
	dbg("prototype.widthToHeight()");
	if (crodRateType == 6) {
		return h;
	}
	n = Math.floor(n / this.clip.aspectRatio + 0.5);
	if (n < this.minSize)
		return this.minSize;
	if (n > this.height)
		return this.height;
	return n;
}

Crod.prototype.heightToWidth = function(n, w)
{
	dbg("prototype.heightToWidth()");
	if (crodRateType == 6) {
		return w;
	}
	n = Math.floor(n * this.clip.aspectRatio + 0.5);
	if (n < this.minSize)
		return this.minSize;
	if (n > this.width)
		return this.width;
	return n;
}

Crod.prototype.copyClipToTmp = function()
{
	dbg("prototype.copyClipToTmp()");
	this.tmpClip.x1 = this.clip.x;
	this.tmpClip.x2 = this.clip.x + this.clip.w;
	this.tmpClip.y1 = this.clip.y;
	this.tmpClip.y2 = this.clip.y + this.clip.h;
}

Crod.prototype.domove = function(dx, dy)
{
	dbg("prototype.domove()");
	this.copyClipToTmp();
	if (dx < 0 && this.tmpClip.x1 + dx <           0) dx =             - this.tmpClip.x1;
	if (dx > 0 && this.tmpClip.x2 + dx >  this.width) dx = this.width  - this.tmpClip.x2;
	if (dy < 0 && this.tmpClip.y1 + dy <           0) dy =             - this.tmpClip.y1;
	if (dy > 0 && this.tmpClip.y2 + dy > this.height) dy = this.height - this.tmpClip.y2;
	this.tmpClip.x1 += dx;
	this.tmpClip.x2 += dx;
	this.tmpClip.y1 += dy;
	this.tmpClip.y2 += dy;
}

Crod.prototype.dosize = function(dx, dy)
{
	dbg("prototype.dosize()");
	var w, h;
	var wMax, hMax;
	switch (this.sideMove & (3 * Crod.XSIDE)) {
		case 1:
			w    = this.clip.w - dx;
			wMax = this.clip.x + this.clip.w;
			break;
		case 2:
			w    = this.clip.w + dx;
			wMax = this.width - this.clip.x;
			break;
		default:
			w = this.clip.w;
			wMax = this.width;
			break;
	}
	switch (this.sideMove & (3 * Crod.YSIDE)) {
		case 4:
			h    = this.clip.h - dy;
			hMax = this.clip.y + this.clip.h;
			break;
		case 8:
			h    = this.clip.h + dy;
			hMax = this.height - this.clip.y;
			break;
		default:
			h = this.clip.h;
			break;
	}
	/*****************************************
	* safe crop max width
	*/
	if (crodRateType == 7) {
		var safeCropMaxWidthInNorCoord = 0;
		if (isCropPortrait()) {
			safeCropMaxWidthInNorCord = Crod.MAXWIDTH['safeCropPortrait'];
		} else {
			safeCropMaxWidthInNorCord = Crod.MAXWIDTH['safeCropLandscape'];
		}
		var safeCropMaxWidthInScreenCoord = safeCropMaxWidthInNorCord * this.width;
		if (wMax > safeCropMaxWidthInScreenCoord) {
			wMax = safeCropMaxWidthInScreenCoord;
		}
	}
	if (w < this.minSize) w = this.minSize;
	if (wMax && w > wMax) w = wMax;
	if (h < this.minSize) h = this.minSize;
	if (hMax && h > hMax) h = hMax;
	var x2, y2;
	switch (this.sideMove) {
		case 1:
		case 2:
			h = this.widthToHeight(w, h);
			y2 = this.clip.y + 0.5 * (this.clip.h - h);
			if (y2 < 0)
				y2 = 0;
			if (y2 + h > this.height)
				y2 = this.height - h;
			y2 += h;
			w = this.heightToWidth(h, w);
			break;
		case 4:
		case 8:
			w = this.heightToWidth(h, w);
			if (w > safeCropMaxWidthInScreenCoord) {
				w = safeCropMaxWidthInScreenCoord;
			}
			x2 = this.clip.x + 0.5 * (this.clip.w - w);
			if (x2 < 0)
				x2 = 0;
			if (x2 + w > this.width)
				x2 = this.width - w;
			x2 += w;
			h = this.widthToHeight(w, h);
			break;
		default:
			if (this.heightToWidth(h, w) > w) {
				w = this.heightToWidth(h, w);
				if (wMax && w > wMax) w = wMax;
				h = this.widthToHeight(w, h);
			}
			else {
				h = this.widthToHeight(w, h);
				if (hMax && h > hMax) h = hMax;
				w = this.heightToWidth(h, w);
			}
			break;
	}
	switch (this.sideMove & (3 * Crod.XSIDE)) {
		case 1:
			this.tmpClip.x2 = this.clip.x + this.clip.w;
			break;
		case 2:
			this.tmpClip.x2 = this.clip.x + Math.floor(w);
			break;
		default:
			if (x2)
				this.tmpClip.x2 = x2;
			else
				this.tmpClip.x2 = this.clip.x + Math.floor(0.5 * (this.clip.w + w));
			break;
		}
	switch (this.sideMove & (3 * Crod.YSIDE)) {
		case 4:
			this.tmpClip.y2 = this.clip.y + this.clip.h;
			break;
		case 8:
			this.tmpClip.y2 = this.clip.y + Math.floor(h);
			break;
		default:
			if (y2)
				this.tmpClip.y2 = y2;
			else
				this.tmpClip.y2 = this.clip.y + Math.floor(0.5 * (this.clip.h + h));
			break;
	}
	this.tmpClip.x1 = this.tmpClip.x2 - Math.floor(w);
	this.tmpClip.y1 = this.tmpClip.y2 - Math.floor(h);
}

function setCropPortrait(arg)
{
	dbg("setCropPortrait()");
	portrait = arg;
	goStyle();
}

function goStyle()
{
	dbg("goStyle() crodRateType:"+crodRateType);
	if (crodRateType == 7) {					// SAFE crop
		if (isCropPortrait())
			cropper.adaptAspect(Crod.ASPECTRATIO['safeCropPortrait'], Crod.MAXWIDTH['safeCropPortrait']);
		else
			cropper.adaptAspect(Crod.ASPECTRATIO['safeCropLandscape'], Crod.MAXWIDTH['safeCropLandscape']);
	} else if (crodRateType == 0) {		// 4x6 crop
		if (isCropPortrait())
			cropper.adaptAspect(Crod.ASPECTRATIO['p4x6CropPortrait'], Crod.MAXWIDTH['p4x6CropPortrait']);
		else
			cropper.adaptAspect(Crod.ASPECTRATIO['p4x6CropLandscape'], Crod.MAXWIDTH['p4x6CropLandscape']);
	} else if (crodRateType == 1) {		// 5x7 crop
		if (isCropPortrait())
			cropper.adaptAspect(Crod.ASPECTRATIO['p5x7CropPortrait'], Crod.MAXWIDTH['p5x7CropPortrait']);
		else
			cropper.adaptAspect(Crod.ASPECTRATIO['p5x7CropLandscape'], Crod.MAXWIDTH['p5x7CropLandscape']);
	} else if (crodRateType == 2) {		// 8x10 crop
		if (isCropPortrait())
			cropper.adaptAspect(Crod.ASPECTRATIO['p8x10CropPortrait'], Crod.MAXWIDTH['p8x10CropPortrait']);
		else
			cropper.adaptAspect(Crod.ASPECTRATIO['p8x10CropLandscape'], Crod.MAXWIDTH['p8x10CropLandscape']);
	} else if (crodRateType == 3) {		// SQUARE crop
		cropper.adaptAspect(Crod.ASPECTRATIO['squareCrop'], Crod.MAXWIDTH['squareCrop']);
	} else if (crodRateType == 4) {		// 8x6 crop
		if (isCropPortrait())
			cropper.adaptAspect(Crod.ASPECTRATIO['p8x6CropPortrait'], Crod.MAXWIDTH['p8x6CropPortrait']);
		else
			cropper.adaptAspect(Crod.ASPECTRATIO['p8x6CropLandscape'], Crod.MAXWIDTH['p8x6CropLandscape']);
	} else if (crodRateType == 10) {		// 8x6 crop
        cropper.adaptAspect(zoneW/zoneH, 1.0);
	}
}

function isCropPortrait() {
	dbg("isCropPortrait()");
	return (portrait == 1);
}
function FcrodGetPagePos(o, c, p, m)
{
	dbg("FcrodGetPagePos()");
	var x = o[c];
	o = o[p];
	while (o != null && typeof(o[c]) != 'undefined') {
		if (o.tagName != 'FONT')
			x += parseInt(o[c]);
		if (o.tagName == 'BODY' && m && typeof(o[m]) != 'undefined')
			x += parseInt(o[m]);
		if (o.tagName == 'HTML')
			break;
		o = o[p];
	}
	return x;
}

function CrodInit() {
	dbg("CrodInit()");
	DivStore.init();
	var x, y;
	var posimg = document['cropperpos'];
	if (!is_nav4) {
		var ua = navigator.userAgent.toLowerCase();
		var intExp = parseInt(navigator.appVersion);
		if (intExp >= 4 && ua.indexOf('msie 5') != -1)
			intExp = 5;
		var macIntExp = (ua.indexOf('mac') == -1) ? 0.0 : intExp;
		x = FcrodGetPagePos(posimg, 'offsetLeft',(macIntExp == 4) ? 'parentElement' : 'offsetParent',
			(macIntExp >= 5) ? 'leftMargin' : null);
		y = FcrodGetPagePos(posimg, 'offsetTop',
			(macIntExp == 4) ? 'parentElement' : 'offsetParent',
			(macIntExp >= 5) ? 'topMargin' : null);
	} else {
			x = posimg.x;
			y = posimg.y;
	}
	dbg("x:"+x);
	dbg("y:"+y);

	cropper.init(x, y, newWidth, newHeight);//控制編輯範圍

	portrait = crodType;
	dbg("portrait:"+portrait);
	cropper.show();
	goStyle();
}


function Fputdhtml() {
	cropper = new Crod('cropper', getSourcePic(), newWidth, newHeight, 30);
}

function dbg(msg) {
	if (document.getElementById("debug")) {
		 var debug = document.getElementById("debug");
		 var p = document.createElement("p");
		 p.appendChild(document.createTextNode(msg));
		 debug.appendChild(p);
	}
}
