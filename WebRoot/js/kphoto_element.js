//---------------------------------------------------------------------------------------------------------------------
//------------------------------------基本元素---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
function albumElement(viewID, viewURI, textCaption, d,w,h,newURI) {
	this.viewID  = viewID;//seq
	this.viewURI = viewURI;//檔名
	this.textCaption = textCaption;
    this.newURI = newURI;
	this.isUsed = false;
    if(w=="" || h == ""){
        this.width= d;
        this.height= d;
    }else if(w>h){
        this.width = d ;
        this.height = Math.round((d/w)*h);
    }else{
        this.height = d ;
        this.width = Math.round((d/h)*w);
    }
}
function albumSource(viewID, viewURI, textCaption, d,w,h,newURI,category,nw,nh,step,croplpic,rotatelpic) {
	this.viewID  = viewID;
	this.viewURI = viewURI;
	this.textCaption = textCaption;
    this.newURI = newURI;
	this.isUsed = false;
    this.dv = d;
    this.category = category;
    this.w = w;
    this.h = h;    
    this.nw = nw;
    this.nh = nh;
    if(w == "" || h == ""){
        this.width= d;
        this.height= d;
    }else if(w>h){
        this.width = d ;
        this.height = Math.round((d/w)*h);
    }else{
        this.height = d ;
        this.width = Math.round((d/h)*w);
    }
    this.step = step;
    this.croplpic = croplpic;
    this.rotatelpic = rotatelpic;
}
albumSource.prototype.toString = function() {
	return "viewID:"+this.viewID+",viewURI:"+this.viewURI+",textCaption:"+this.textCaption+",width:"+this.width+",height:"+this.height+",w:"+this.w+",h:"+this.h+",nw:"+this.nw+",nh:"+this.nh;
}

function iconElement(viewID, viewURI, d,w,h,name) {
	this.viewID  = viewID;
	this.viewURI = viewURI;
    if(w=="" || h == "" || w==0 || h == 0){
        this.width= d;
        this.height= d;
    }else if(w*1>h*1){
        this.width = d ;
        this.height = Math.round((d/w)*h);
    }else{
        this.height = d ;
        this.width = Math.round((d/h)*w);
    }
    this.name = name;
}
iconElement.prototype.toString = function() {
	return "viewID:"+this.viewID+",viewURI:"+this.viewURI+",width:"+this.width+",height:"+this.height;
}
function ZIndexer() {
	this.zer = new Array(0); 
}
ZIndexer.prototype.add = function(name,start) {
	this.zer[name] = start;
}
ZIndexer.prototype.get = function(name) {
	var n = this.zer[name];
	this.zer[name] = n + 1;
	return n;
}
ZIndexer.prototype.getJump = function(name,r) {
	var n = this.zer[name];
	this.zer[name] = n + 1*r;
	return n;
}
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------使用元素------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
function imager(parent,id,pos, viewID, viewURI,newURI, l, t, w, h,sw,sh,z) {
	dbg("add w:" + w);
	dbg("add h:" + h);
	this.id  = id;
	this.pos  = pos;
	this.parent  = parent;
	this.viewID  = viewID;
	this.viewURI = viewURI;
	this.newURI = newURI;
	this.left  = l;
	this.top  = t;
    this.width = w ;
    this.height = h;
    this.swidth = sw ;
    this.sheight = sh;    
    this.z = z;
}
imager.prototype.toString = function() {
	return "id:"+this.id
			+"\r\npos:"+this.pos
			+"\r\nviewID:"+this.viewID
			+"\r\nviewURI:"+this.viewURI
			+"\r\nleft:"+this.left
			+"\r\ntop:"+this.top
			+"\r\nwidth:"+this.width
			+"\r\nheight:"+this.height			
			+"\r\nswidth:"+this.swidth
			+"\r\nsheight:"+this.sheight
			+"\r\nz:"+this.z;
}
function iconer(parent,id,key,pos, viewID, viewURI, l, t, w, h,sw,sh,z) {
	this.id  = id;//div html id的代碼
	this.key  = key;//圖形處理識別碼
	this.pos  = pos;
	this.parent  = parent;
	this.viewID  = viewID;
	this.viewURI = viewURI;
	this.left  = l;
	this.top  = t;
    this.width = w ;
    this.height = h;
    this.swidth = sw ;
    this.sheight = sh;    
    this.z = z;
}
function ctexter(id,pos, fname,text,fontSize,fontColor,fontType,fontName, width,height,left,top,z) {
	this.id  = id;
	this.pos = pos;
	this.fname = fname;
	this.text= text;
	this.fontSize= fontSize;
	this.fontColor= fontColor;
	this.fontType= fontType;
	this.fontName= fontName;
  	this.width= width;
    this.height= height;
  	this.top= top;
    this.left= left;    
    this.swidth = 0;
    this.sheight = 0;       
    this.z = z;
}

ctexter.prototype.toString = function() {
	return "id:"+this.id
			+",pos:"+this.pos
			+",fname:"+this.fname
			+",text:"+this.text
			+",fontSize:"+this.fontSize
			+",fontColor:"+this.fontColor
			+",fontType:"+this.fontType
			+",fontName:"+this.fontName			
			+",width:"+this.width
			+",height:"+this.height
			+",top:"+this.top
			+",left:"+this.left;
}
imager.prototype.back = function() {
	if(this.pos=="0"){
		dd.elements[this.id].moveTo(this.left+pg.x1,this.top+pg.y1);
	}else{
		dd.elements[this.id].moveTo(this.left+pg.x2,this.top+pg.y2);
	}
	dd.elements[this.id].resizeTo(this.width, this.height);
	$(this.id).style.zIndex = this.z;
}
iconer.prototype.back = function() {
	if(this.pos=="0"){
		dd.elements[this.id].moveTo(this.left+pg.x1,this.top+pg.y1);
	}else{
		dd.elements[this.id].moveTo(this.left+pg.x2,this.top+pg.y2);
	}
	dd.elements[this.id].resizeTo(this.width, this.height);
	$(this.id).style.zIndex = this.z;
}
ctexter.prototype.back = function() {
	if(this.pos=="0"){
		dd.elements[this.id].moveTo(this.left+pg.x1,this.top+pg.y1);
	}else{
		dd.elements[this.id].moveTo(this.left+pg.x2,this.top+pg.y2);
	}
	dd.elements[this.id].resizeTo(this.width, this.height);
	$(this.id).style.zIndex = this.z;
}
imager.prototype.resetZ = function() {
	$(this.id).style.zIndex = this.z;
}
iconer.prototype.resetZ = function() {
	$(this.id).style.zIndex = this.z;
}
ctexter.prototype.resetZ = function() {
	$(this.id).style.zIndex = this.z;
}

function CROPPER(x1,x2, y1,y2,w,h) {
	this.seq = "";
	this.kind = "1";//1:zone的 2:imager的
	this.x1 = 0;
	this.x2 = 0;
	this.y1 = 0;
	this.y2 = 0;	
	this.w = 0;
	this.h = 0;
	this.free = 0;
	this.ratioDimW = 0;
	this.ratioDimH = 0;
	this.revMask = "1";
	this.multi = 0;
	this.zoneID = "";
	this.frames = "";
}
CROPPER.prototype.toString = function() {
	var s = "CROPPER:";
	s += "<br/>seq:" + this.seq;
	s += "<br/>zoneID:" + this.zoneID;
	s += "<br/>kind:" + this.kind;
	s += "<br/>free:" + this.free;
	s += "<br/>ratioDimW:" + this.ratioDimW;
	s += "<br/>ratioDimH:" + this.ratioDimH;
	s += "<br/>revMask:" + this.revMask;
	s += "<br/>multi:" + this.multi;
	return s;
}
function KeMap() {
	this.sids = new Array(0);
	this.sids2 = {};
	this.isText = 0;
}
KeMap.prototype.add = function(sid) {
	if(sid.indexOf("ctext_") == 0){
		this.isText = 1;
	}else{
		this.isText = 0;
	}
	if(this.sids2[sid] == null || this.sids2[sid] == ""){
		this.sids[this.sids.length] = sid;
		this.sids2[sid] = "" + (this.sids.length-1);
		$j("#"+sid).css("border", "solid red 1px");
		dbg("add:"+sid);
	}else{
		dbg("contain:"+sid);
	}
}
KeMap.prototype.remove = function(sid) {
	if(this.sids2[sid] != null && this.sids2[sid] != ""){
		var i = this.sids2[sid] * 1;
		this.sids = this.sids.slice(0,i).concat(this.sids.slice(i+1));
		this.sids2[sid] = "";
		$j("#"+sid).css("border", "0px");
	}
}
KeMap.prototype.removeAll = function() {
	for(var i=0;i< this.sids.length;i++){
		$j("#"+this.sids[i]).css("border", "0px");
	}
	this.sids = new Array(0);
	this.sids2 = {};
}
KeMap.prototype.contains = function(sid) {
	if(this.sids2[sid] != null && this.sids2[sid] != ""){
		return true;
	}
	return false;
}
KeMap.prototype.same = function(sid) {
	var test = 0;
	if(sid.indexOf("ctext_") == 0){
		test = 1;
	}else{
		test = 0;
	}
	return this.isText == test;
}
KeMap.prototype.size= function() {
	dbg('length:' + this.sids.length);
	return this.sids.length;
}
KeMap.prototype.alert = function() {
	for(var i=0;i< this.sids.length;i++){
		alert(this.sids[i]);
	}
}
