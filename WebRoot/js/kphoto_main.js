var KPHOTO = Class.create();
KPHOTO.prototype = {
  	initialize: function() {
		this.albumSourceList = new Array(0); 
		this.albumList = new Array(0); 
		this.albumTray = new Array(0); 
		this.albumNumThumbs = 10; 
		this.albumCurrPage = 1;
		this.iconTray = new Array(0);	
		this.iconList = new Array(0);
		this.iconNumThumbs = 10; 
		this.iconCurrPage = 1;	
		this.marginTray = new Array(0);	
		this.marginList = new Array(0);
		this.marginNumThumbs = 8; 
		this.marginCurrPage = 1;		
		this.toolsPanel = 0;
		
		this.textList = new Array(0);
		this.iconerList = new Array(0);
		this.marginerList = new Array(0);
		this.imagerList = new Array(0);
		
		this.rectMenus = new Array(0);//是否某rect menu //this.rectMenus[""] = "1";
		this.sid = "";
		this.smap = new KeMap();
		this.nowCtext;
		this.zindexer = new ZIndexer();
		this.zindexer.add("DropZone",100000);
		this.zindexer.add("TextZone",200000);
		this.zindexer.add("imager",450000);
		this.zindexer.add("iconer",500000);
		this.zindexer.add("marginer",600000);
		this.zindexer.add("ctext",700000);
		this.zindexer.add("dialog",900000);
		this.zindexer.add("grip",1000000);
		this.page = 0;//目前頁數
		this.rtime = 0;//計算重load pic,計時器.
		this.crop = new CROPPER("",0,0,0,0,0,0);
		this.lstable = "0";//0:可換版型1:不可換2:任意
		this.rstable = "0";
		this.lown = "0";//設否為自訂背景
		this.rown = "0";	
		this.bookWidth = 0;
		this.bookHeight = 0;	
		this.test = 0;
		this.styleW1 = "";//統一樣式
		this.styleW2 = "";//統一樣式
		this.styleW1 = "";//統一樣式
		this.styleH1 = "";//統一樣式
		this.styleH2 = "";//統一樣式
		this.styleH3 = "";//統一樣式
		this.mm = 1;
		this.textRenew = "";
	},
	toXML : function(pos) {//左邊 或 右邊 轉xml
		var xml = "";
		for (var j=0; j < this.imagerList.length; j++) {
			if(this.imagerList[j]!=null && this.imagerList[j].pos==pos){
				xml += ('<imager viewID="'+this.imagerList[j].viewID
					+'" viewURI="'+this.imagerList[j].viewURI
					+'" newURI="'+this.imagerList[j].newURI
					+'" left="'+this.imagerList[j].left
					+'" top="'+this.imagerList[j].top
					+'" width="'+this.imagerList[j].width
					+'" height="'+this.imagerList[j].height
					+'" swidth="'+this.imagerList[j].swidth
					+'" sheight="'+this.imagerList[j].sheight+'"></imager>');
			}
		}		
		for (var j=0; j < this.iconerList.length; j++) {
			if(this.iconerList[j]!=null && this.iconerList[j].pos==pos){
				xml += ('<iconer viewID="'+this.iconerList[j].viewID
					+'" viewURI="'+this.iconerList[j].viewURI
					+'" id="'+this.iconerList[j].id
					+'" key="'+this.iconerList[j].key
					+'" left="'+this.iconerList[j].left
					+'" top="'+this.iconerList[j].top
					+'" width="'+this.iconerList[j].width
					+'" height="'+this.iconerList[j].height
					+'" swidth="'+this.iconerList[j].swidth
					+'" sheight="'+this.iconerList[j].sheight+'"></iconer>');
			}
		}
		for (var j=0; j < this.marginerList.length; j++) {
			if(this.marginerList[j]!=null && this.marginerList[j].pos==pos){
				xml += ('<marginer viewID="'+this.marginerList[j].viewID
					+'" viewURI="'+this.marginerList[j].viewURI
					+'" id="'+this.marginerList[j].id
					+'" key="'+this.marginerList[j].key
					+'" left="'+this.marginerList[j].left
					+'" top="'+this.marginerList[j].top
					+'" width="'+this.marginerList[j].width
					+'" height="'+this.marginerList[j].height
					+'" swidth="'+this.marginerList[j].swidth
					+'" sheight="'+this.marginerList[j].sheight+'"></marginer>');
			}
		}	
		for (var j=0; j < this.textList.length; j++) {
			if(this.textList[j]!=null && this.textList[j].pos==pos){
				xml += ('<ctext fname="'+this.textList[j].fname
					+'" fontSize="'+this.textList[j].fontSize
					+'" fontColor="'+this.textList[j].fontColor
					+'" fontType="'+this.textList[j].fontType
					+'" fontName="'+this.textList[j].fontName
					+'" width="'+this.textList[j].width
					+'" height="'+this.textList[j].height
					+'" top="'+this.textList[j].top
					+'" left="'+this.textList[j].left+'">'+this.textList[j].text+'</ctext>');
			}
		}		

		return xml;
	},
	mainer : function() {
		if(this.sid==""){
			return null;
		} 
		dd.elements[this.sid].fetch();
		return dd.elements[this.sid];
	},
	mainerObj : function() {
		if(this.sid==""){
			return null;
		}
		for (var j=0; j < this.imagerList.length; j++) {
			if (this.imagerList[j]!=null && this.imagerList[j].id == this.sid)
				return this.imagerList[j];
		}		
		for (var j=0; j < this.iconerList.length; j++) {
			if (this.iconerList[j]!=null && this.iconerList[j].id == this.sid)
				return this.iconerList[j];
		}
		for (var j=0; j < this.marginerList.length; j++) {
			if (this.marginerList[j] != null && this.marginerList[j].id == this.sid)
				return this.marginerList[j];
		}	
		for (var j=0; j < this.textList.length; j++) {
			if (this.textList[j] != null && this.textList[j].id == this.sid)
				return this.textList[j];
		}		
		return null;
	},
	obj : function(id) {
		if(id==""){
			return null;
		}
		for (var j=0; j < this.imagerList.length; j++) {
			if (this.imagerList[j]!=null && this.imagerList[j].id == id)
				return this.imagerList[j];
		}		
		for (var j=0; j < this.iconerList.length; j++) {
			if (this.iconerList[j]!=null && this.iconerList[j].id == id)
				return this.iconerList[j];
		}
		for (var j=0; j < this.marginerList.length; j++) {
			if (this.marginerList[j] != null && this.marginerList[j].id == id)
				return this.marginerList[j];
		}
		for (var j=0; j < this.textList.length; j++) {
			if (this.textList[j] != null && this.textList[j].id == id)
				return this.textList[j];
		}			
		return null;
	}
}	
KPHOTO.prototype.addText = function(pos, fname,text,fontSize,fontColor,fontType,fontName, width,height,left,top) {
	var id = "ctext_"+pos+"_"+this.textList.length;
	this.textList[this.textList.length] = new ctexter(id,pos, fname,text,fontSize,fontColor,fontType,fontName, width,height,left,top,this.zindexer.get("ctext"));
	return this.textList[this.textList.length-1];
}
	
KPHOTO.prototype.on_AddWord = function(oj) {
	var res = oj.responseXML;
	var result = getColumnValue(res,"result");
	var msg = getColumnValue(res,"msg");	
		
	if(result=="1"){
		var fname = getColumnValue(res,"fname");
		var pos = getColumnValue(res,"pos");
		var text = getColumnValue(res,"text");
		var fontSize = getColumnIntValue(res,"fontSize");
		var fontColor = getColumnValue(res,"fontColor");
		var fontType = getColumnIntValue(res,"fontType");
		var fontName = getColumnValue(res,"fontName");
		var width = getColumnIntValue(res,"width");
		var height = getColumnIntValue(res,"height");
		var left = getColumnIntValue(res,"left");
		var top = getColumnIntValue(res,"top");
		
		if(width > kphoto.bookWidth*1){
			height = kphoto.bookWidth*1 / width * height;
			width = kphoto.bookWidth*1;
		}
		var t = kphoto.addText(pos, fname,text,fontSize,fontColor,fontType,fontName, width,height,left,top);
		if(pos == "0"){
			addImage('main-page', t.id, fname, left+pg.x1, top+pg.y1, width, height, true, t.z);
		}else{
			addImage('main-page', t.id, fname, left+pg.x2, top+pg.y2, width, height, true, t.z);
		}
  		ADD_DHTML(t.id);	
  		dd.elements[t.id].setDraggable(true);
  		$j('#'+t.id).ctextMenu();
  		$j('#'+t.id).unbind('click');
		$j('#'+t.id).click(function(event){
			mselect(event,this.id);
		});
	}else{
		alert(msg);		
	}
	if(kphoto.textRenew!=""){
		kphoto.delText(kphoto.textRenew)
		kphoto.textRenew = "";
	}
}
	
KPHOTO.prototype.createText = function(pos, text,fontSize,fontColor,fontType,fontName, width,height,left,top) {
  	sendAjaxData('edit_image.ko;jsessionid='+jsessionid,
  		'&pos='+pos+
        '&method=text'+
        '&new=1'+
        '&left='+left+        
        '&top='+top+             
        '&width='+width+
        '&height='+height+
        '&fontSize='+fontSize+
        '&fontName='+encodeURIComponent(fontName)+
        '&fontType='+Font_ROMAN_BASELINE+
        '&text='+encodeURIComponent(text)+
        '&fontColor='+encodeURIComponent(fontColor),this.on_AddWord,this.on_AddWord);
}
	
KPHOTO.prototype.on_renewText = function(oj) {
	var res = oj.responseXML;
	var result = getColumnValue(res,"result");
	var msg = getColumnValue(res,"msg");	
	
	if(result=="1"){
		var id = getColumnValue(res,"id");
		var fname = getColumnValue(res,"fname");
		var left = getColumnIntValue(res,"left");
		var top = getColumnIntValue(res,"top");
		var c = kphoto.textObj(id);
		
		if(c.width > kphoto.bookWidth*1){
			c.height = kphoto.bookWidth*1 /c.width  * c.height;
			c.width = kphoto.bookWidth*1;
			c.back();
		}
		c.fname = fname;
		editImageSrc(c.id,fname);
	}else{
		alert(msg);		
	}
}
	
KPHOTO.prototype.renewText = function(id) {
	var ctext = this.textObj(id);
	//if(ctext.fontSize*1 >0 ){
	  	sendAjaxData('edit_image.ko;jsessionid='+jsessionid,
	        '&method=text'+
	        '&new=0'+
	        '&id='+ctext.id+   	        
	        '&left='+ctext.left+        
	        '&top='+ctext.top+             
	        '&width='+ctext.width+
	        '&height='+ctext.height+
	        '&fontSize='+ctext.fontSize+
	        '&fontName='+encodeURIComponent(ctext.fontName)+
	        '&fontType='+Font_ROMAN_BASELINE+
	        '&text='+encodeURIComponent(ctext.text)+
	        '&fontColor='+encodeURIComponent(ctext.fontColor),this.on_renewText,this.on_renewText);
	//}
}

KPHOTO.prototype.textObj = function(id) {
	for (var j=0; j < this.textList.length; j++) {
		if (this.textList[j]!=null && this.textList[j].id == id){
			return this.textList[j];
		}
	}
	return null;	
}

KPHOTO.prototype.delText = function(id) {
	for (var j=0; j < this.textList.length; j++) {
		if (this.textList[j]!=null && this.textList[j].id == id){
			$(this.textList[j].id).remove();
			this.textList[j] = null;
			this.sid = "";
		}
	}
}
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
KPHOTO.prototype.addIcon = function(viewID, viewURI, d, w, h) {
	this.iconList[this.iconList.length] = new iconElement(viewID, viewURI, d, w, h);
	return this.iconList[this.iconList.length-1];
}
KPHOTO.prototype.addIconer = function(pos,viewID,key, viewURI,l ,t, w, h, sw, sh) {
	var id = "iconer_"+pos+"_"+this.iconerList.length;
  	var iconObj = new iconer(this,id,key,pos,viewID, viewURI,l ,t, w, h, sw, sh,this.zindexer.get("iconer"));
	this.iconerList[this.iconerList.length] = iconObj;	
	if(pos == "0"){
		addImage("main-page",id,
				viewURI,
				l+pg.x1,
				t+pg.y1,	
				w,
				h,
				true, 
				iconObj.z);	
	}else{
		addImage("main-page",id,
				viewURI,
				l+pg.x2,
				t+pg.y2,	
				w,
				h,
				true,
				iconObj.z);		
		
	}
  	ADD_DHTML(id);
  	dd.elements[id].setDraggable(true);
  	$j('#'+id).iconMenu();
  	
  	$j('#'+id).unbind('click');
	$j('#'+id).click(function(event){
			mselect(event,id);
		});
	//YAHOO.util.Event.onContentReady(id, context,id);
	return iconObj;
}
KPHOTO.prototype.renewImager = function(id) {
	for(var i=0; i < this.imagerList.length;i++){
		var imagerObj = this.imagerList[i];
		if(imagerObj.id == id){
			if(imagerObj!=null){
				dd.elements[imagerObj.id].del();
			}
			if(imagerObj != null && $(imagerObj.id)!=null){
				$(imagerObj.id).remove();
			}
			var uri = imagerObj.viewURI;
			if(imagerObj.newURI!=""){
				uri = imagerObj.newURI;
			}
			if(imagerObj.pos == "0"){
				addImage("main-page",imagerObj.id,
						uri,
						imagerObj.left+pg.x1,
						imagerObj.top+pg.y1,	
						imagerObj.width,
						imagerObj.height,
						true, 
						imagerObj.z);	
			}else{
				addImage("main-page",imagerObj.id,
						uri,
						imagerObj.left+pg.x2,
						imagerObj.top+pg.y2,	
						imagerObj.width,
						imagerObj.height,
						true,
						imagerObj.z);		
				
			}
		  	ADD_DHTML(imagerObj.id);
		  	dd.elements[imagerObj.id].setDraggable(true);
		  	$j('#'+imagerObj.id).imagerMenu();
		  	
		  	$j('#'+imagerObj.id).unbind('click');
			$j('#'+imagerObj.id).click(function(event){
					mselect(event,id);
				});
		  	break;
		}
	}	
}
KPHOTO.prototype.clear = function() {
	while(this.albumSourceList.length>0){
		this.albumSourceList[this.albumSourceList.length-1] = null;	
		this.albumSourceList.length = this.albumSourceList.length - 1;
	}
	while(this.imagerList.length>0){
		if(this.imagerList[this.imagerList.length-1]!=null){
			dd.elements[this.imagerList[this.imagerList.length-1].id].del();
		}
		if(this.imagerList[this.imagerList.length-1] != null && $(this.imagerList[this.imagerList.length-1].id)!=null){
			$(this.imagerList[this.imagerList.length-1].id).remove();
		}
		this.imagerList[this.imagerList.length-1] = null;	
		this.imagerList.length = this.imagerList.length - 1;		
	}	
	while(this.iconerList.length>0){
		if(this.iconerList[this.iconerList.length-1] != null){
			dd.elements[this.iconerList[this.iconerList.length-1].id].del();
		}
		if(this.iconerList[this.iconerList.length-1] != null && $(this.iconerList[this.iconerList.length-1].id)!=null){
			$(this.iconerList[this.iconerList.length-1].id).remove();
		}
		this.iconerList[this.iconerList.length-1] = null;	
		this.iconerList.length = this.iconerList.length - 1;
	}
	while(this.marginerList.length>0){
		if(this.marginerList[this.marginerList.length-1] != null){
			dd.elements[this.marginerList[this.marginerList.length-1].id].del();
		}
		if(this.marginerList[this.marginerList.length-1] != null && $(this.marginerList[this.marginerList.length-1].id)!=null){
			$(this.marginerList[this.marginerList.length-1].id).remove();
		}
		this.marginerList[this.marginerList.length-1] = null;	
		this.marginerList.length = this.marginerList.length - 1;
	}
	while(this.textList.length>0){
		if(this.textList[this.textList.length-1] != null){
			dd.elements[this.textList[this.textList.length-1].id].del();
		}
		if(this.textList[this.textList.length-1] != null && $(this.textList[this.textList.length-1].id)!=null){
			$(this.textList[this.textList.length-1].id).remove();
		}
		this.textList[this.textList.length-1] = null;	
		this.textList.length = this.textList.length - 1;
	}
	this.sid = "";		
}
KPHOTO.prototype.clear2 = function() {
	while(this.imagerList.length>0){
		if(this.imagerList[this.imagerList.length-1]!=null){
			dd.elements[this.imagerList[this.imagerList.length-1].id].del();
		}
		if(this.imagerList[this.imagerList.length-1] != null && $(this.imagerList[this.imagerList.length-1].id)!=null){
			$(this.imagerList[this.imagerList.length-1].id).remove();
		}
		this.imagerList[this.imagerList.length-1] = null;	
		this.imagerList.length = this.imagerList.length - 1;	
	}	
	while(this.iconerList.length>0){
		if(this.iconerList[this.iconerList.length-1] != null){
			dd.elements[this.iconerList[this.iconerList.length-1].id].del();
		}
		if(this.iconerList[this.iconerList.length-1] != null && $(this.iconerList[this.iconerList.length-1].id)!=null){
			$(this.iconerList[this.iconerList.length-1].id).remove();
		}
		this.iconerList[this.iconerList.length-1] = null;	
		this.iconerList.length = this.iconerList.length - 1;
	}
	while(this.marginerList.length>0){
		if(this.marginerList[this.marginerList.length-1] != null){
			dd.elements[this.marginerList[this.marginerList.length-1].id].del();
		}
		if(this.marginerList[this.marginerList.length-1] != null && $(this.marginerList[this.marginerList.length-1].id)!=null){
			$(this.marginerList[this.marginerList.length-1].id).remove();
		}
		this.marginerList[this.marginerList.length-1] = null;	
		this.marginerList.length = this.marginerList.length - 1;
	}
	while(this.textList.length>0){
		if(this.textList[this.textList.length-1] != null){ 
			dd.elements[this.textList[this.textList.length-1].id].del();
		}
		if(this.textList[this.textList.length-1] != null && $(this.textList[this.textList.length-1].id)!=null){
			$(this.textList[this.textList.length-1].id).remove();
		}
		this.textList[this.textList.length-1] = null;	
		this.textList.length = this.textList.length - 1;
	}
	this.sid = "";		
}
KPHOTO.prototype.delImager = function(id) {
	for (var j=0; j < this.imagerList.length; j++) {
		if (this.imagerList[j]!=null && this.imagerList[j].id == id){
			$(this.imagerList[j].id).remove();
			this.imagerList[j] = null;
			this.imagerList = this.imagerList.slice(0,j).concat(this.imagerList.slice(j+1));	
			this.sid = "";
			break;
		}
	}
	
}
KPHOTO.prototype.delIconer = function(id) {
	for (var j=0; j < this.iconerList.length; j++) {
		if (this.iconerList[j]!=null && this.iconerList[j].id == id){
			$(this.iconerList[j].id).remove();
			this.iconerList[j] = null;
			this.sid = "";
		}
	}
}

KPHOTO.prototype.delMarginer = function(id) {
	for (var j=0; j < this.marginerList.length; j++) {
		if (this.marginerList[j]!=null && this.marginerList[j].id == id){
			$(this.marginerList[j].id).remove();
			this.marginerList[j] = null;
			this.sid = "";
		}
	}
}
KPHOTO.prototype.imagerObj = function(id) {//使用者
	for (var j=0; j < this.imagerList.length; j++) {
		if (this.imagerList[j]!=null && this.imagerList[j].id == id)
			return this.imagerList[j];
	}
	return null;
}
KPHOTO.prototype.iconerObj = function(id) {//使用者
	for (var j=0; j < this.iconerList.length; j++) {
		if (this.iconerList[j]!=null && this.iconerList[j].id == id)
			return this.iconerList[j];
	}
	return null;
}
KPHOTO.prototype.iconObj = function(viewID) {//元素
	for (var j=0; j < this.iconList.length; j++) {
		if (this.iconList[j].viewID == viewID)
			return this.iconList[j];
	}
	return null;
}
KPHOTO.prototype.clearIcon = function() {
	this.iconList = new Array(0);
}
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
KPHOTO.prototype.addMarginer = function(pos,viewID,key, viewURI,l ,t, w, h, sw, sh) {
	var id = "marginer_"+pos+"_"+this.marginerList.length;
	var marginObj = new iconer(this,id,key,pos,viewID, viewURI,l ,t, w, h, sw, sh,this.zindexer.get("iconer"))
	this.marginerList[this.marginerList.length] = marginObj;
	if(pos == "0"){
		addImage("main-page",id,
				viewURI,
				l+pg.x1,
				t+pg.y1,	
				w,
				h,
				true,
				marginObj.z);	
	}else{
		addImage("main-page",id,
				viewURI,
				l+pg.x2,
				t+pg.y2,	
				w,
				h,
				true,
				marginObj.z);		
	}	
  	ADD_DHTML(id);
  	dd.elements[id].setDraggable(true);
  	$j('#'+id).iconMenu();
  	
  	$j('#'+id).unbind('click');
	$j('#'+id).click(function(event){
			mselect(event,id);
		});
  	//YAHOO.util.Event.onContentReady(id, context,id);
	return this.marginerList[this.marginerList.length-1];
}
KPHOTO.prototype.marginerObj = function(id) {//使用者
	for (var j=0; j < this.marginerList.length; j++) {
		if (this.marginerList[j]!=null && this.marginerList[j].id == id)
			return this.marginerList[j];
	}
	return null;
}
KPHOTO.prototype.marginObj = function(viewID) {//元素
	for (var j=0; j < this.marginList.length; j++) {
		if (this.marginList[j].viewID == viewID)
			return this.marginList[j];
	}
	return null;
}
KPHOTO.prototype.addMargin = function(viewID, viewURI, d, w, h,name) {
	this.marginList[this.marginList.length] = new iconElement(viewID, viewURI, d, w, h,name);
	return this.marginList[this.marginList.length-1];
}

KPHOTO.prototype.clearMargin = function() {
	this.marginList = new Array(0);
}
//---------------------------------------------------------------------------------------------------------------------
KPHOTO.prototype.addImager = function(pos,viewID, viewURI,newURI,l ,t, w, h, sw, sh) {
	var id = "imager_"+pos+"_"+this.imagerList.length;
  	var imagerObj = new imager(this,id,pos,viewID, viewURI,newURI,l ,t, w, h, sw, sh,this.zindexer.get("imager"));
	this.imagerList[this.imagerList.length] = imagerObj;	
	var uri = imagerObj.viewURI;
	if(imagerObj.newURI!=""){
		uri = imagerObj.newURI;
	}
	if(pos == "0"){
		addImage("main-page",id,
				uri,
				l+pg.x1,
				t+pg.y1,	
				w,
				h,
				true, 
				imagerObj.z);	
	}else{
		addImage("main-page",id,
				uri,
				l+pg.x2,
				t+pg.y2,	
				w,
				h,
				true,
				imagerObj.z);		
		
	}
  	ADD_DHTML(id);
  	dd.elements[id].setDraggable(true);
  	$j('#'+id).imagerMenu();
  	
  	$j('#'+id).unbind('click');
	$j('#'+id).click(function(event){
			mselect(event,id);
		});
	//YAHOO.util.Event.onContentReady(id, imagerMenu,id);
	return imagerObj;
}
KPHOTO.prototype.editImager = function(id,newlpic, w, h) {
	var obj = this.imagerObj(id);
	obj.newURI = newlpic;
	obj.width = w;
	obj.height = h;
	obj.swidth = w;
	obj.sheight = h;
	var uri = obj.viewURI;
	if(obj.newURI!=""){
		uri = obj.newURI;
	}
	editImageSrc(obj.id,uri);
	if(obj.pos=="0"){
		editPosition($(obj.id),
			obj.left+pg.x1,
			obj.top+pg.y1,	
			obj.width,
			obj.height);
	}else{
		editPosition($(obj.id),
			obj.left+pg.x2,
			obj.top+pg.y2,	
			obj.width,
			obj.height);	
	}
}
KPHOTO.prototype.editImager2 = function(id,newlpic, w, h , sw ,sh) {
	var obj = this.imagerObj(id);
	obj.newURI = newlpic;
	obj.width = w;
	obj.height = h;
	obj.swidth = sw;
	obj.sheight = sh;
	var uri = obj.viewURI;
	if(obj.newURI!=""){
		uri = obj.newURI;
	}
	editImageSrc(obj.id,uri);
	if(obj.pos=="0"){
		editPosition($(obj.id),
			obj.left+pg.x1,
			obj.top+pg.y1,	
			obj.width,
			obj.height);
	}else{
		editPosition($(obj.id),
			obj.left+pg.x2,
			obj.top+pg.y2,	
			obj.width,
			obj.height);	
	}
}
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
KPHOTO.prototype.clearAlbum = function() {
	this.albumSourceList = new Array(0);
	this.albumList = new Array(0);
}
KPHOTO.prototype.addAlbumSource = function(viewID, viewURI,textCaption, d,w,h,newURI,category,nw,nh,step,croplpic,rotatelpic) {
	this.albumSourceList[this.albumSourceList.length] = new albumSource(viewID, viewURI,textCaption, d,w,h,newURI,category,nw,nh,step,croplpic,rotatelpic);
	return this.albumSourceList[this.albumSourceList.length-1];
}
KPHOTO.prototype.replaceAlbumSource = function(viewID, viewURI,textCaption, d,w,h,newURI,category,nw,nh,step,croplpic,rotatelpic) {
	var obj = this.albumSourceObj(viewID);
	obj.viewURI = viewURI;
	obj.textCaption = textCaption;
	obj.d = d;
	obj.w = w;
	obj.h = h;
	obj.newURI = newURI;
	obj.category = category;
	obj.nw = nw;
	obj.nh = nh;
	obj.step = step;
	obj.croplpic = croplpic;
	obj.rotatelpic = rotatelpic;
	return obj;
}
KPHOTO.prototype.chooseAlbum = function(category) {
  	this.albumList.length = 0;
  	for (var j=0; j < this.albumSourceList.length; j++) {
    	if (this.albumSourceList[j].isUsed==false && (category == "ALL" || this.albumSourceList[j].category == category)){
      		this.albumList[this.albumList.length] = new albumElement(this.albumSourceList[j].viewID,
      															this.albumSourceList[j].viewURI,
      															this.albumSourceList[j].textCaption,
      															this.albumSourceList[j].dv,
      															this.albumSourceList[j].width,
      															this.albumSourceList[j].height,
      															this.albumSourceList[j].newURI);
    	}
  	}
  	setTimeout("kphoto.showAlbum()", 10);
}
KPHOTO.prototype.getTotUnusedAlbum = function() {
	return this.albumList.length;
}
KPHOTO.prototype.albumSourceObj = function(viewID) {
	for (var j=0; j < this.albumSourceList.length; j++) {
		if (this.albumSourceList[j].viewID == viewID)
			return this.albumSourceList[j];
	}
	return null;
}
KPHOTO.prototype.setAlbumSourceUsed = function(viewID,used) {
	for (var j=0; j < this.albumSourceList.length; j++) {
		if (this.albumSourceList[j].viewID == viewID){
			this.albumSourceList[j].isUsed = used;
			return;
		}
	}
}
KPHOTO.prototype.albumObj = function(viewID) {
	for (var j=0; j < this.albumList.length; j++) {
		if (this.albumList[j].viewID == viewID)
			return this.albumList[j];
	}
	return null;
}
KPHOTO.prototype.albumIndex = function(viewID) {
	for (var j=0; j < this.albumList.length; j++) {
		if (this.albumList[j].viewID == viewID) return j;
	}
	return null;
}
KPHOTO.prototype.showAlbum = function(pauseDrag) {
	try{
		pauseDrag = pauseDrag || false;
		this.albumTray = new Array(this.albumNumThumbs);
		var numToSkip = (this.albumCurrPage-1) * this.albumNumThumbs;
		var totShown = 0;
		
		for (var i=0; i < this.albumList.length; i++) {
			
			if (!this.albumList[i].isUsed) {
				if (numToSkip > 0) {
					numToSkip--;
				}
				else {
					this.albumTray[totShown] = this.albumList[i];
					if(!oBrowser.isIE){
						dd.elements["img" + totShown].swapImage(this.albumList[i].viewURI, true);
						//$("img" + totShown).src = this.albumList[i].viewURI; 
						editImageSrc("img" + totShown,this.albumList[i].viewURI);
					}else{
						que.update("img" + totShown,this.albumList[i].viewURI);
						//editImageSrc("img" + totShown,this.albumList[i].viewURI);
						//dbg("this.albumList[i].viewURI:"+this.albumList[i].viewURI);
					}
	                dd.elements["img" + totShown].resizeTo(this.albumList[i].width,this.albumList[i].height);
					dd.elements["img" + totShown].setDraggable(!pauseDrag);
					totShown++;
					if (totShown == this.albumNumThumbs){
						break;
					}
				}
			}
		}
		while (totShown < this.albumNumThumbs) {
			if(!oBrowser.isIE){
				dd.elements["img" + totShown].swapImage(blankImg.src);
			}else{
				editImageSrc("img" + totShown,blankImg.src);
			}
			dd.elements["img" + totShown].setDraggable(false);
			totShown++;
		}
		// display number unused pictures and page number
		var totUnused = this.getTotUnusedAlbum();
		var maxPage = Math.ceil(totUnused / this.albumNumThumbs);
		if (document.getElementById) {
			$("albumUnused").innerHTML = totUnused;
			if (totUnused == 1){
				$("albumUnusedText").innerHTML = "張圖未使用,目前為：";
			}else{
				$("albumUnusedText").innerHTML = "張圖未使用,目前為：";
			}
			// rhernandez: There was a problem when displaying the amount of unused pictures the first time that the user landed on this page.
			if(this.albumCurrPage != 0){
				var pic_start = this.albumCurrPage * this.albumNumThumbs - this.albumNumThumbs + 1;
				var pic_end = ((this.albumCurrPage * this.albumNumThumbs +1) > totUnused) ? totUnused : (this.albumCurrPage * this.albumNumThumbs);
				$("albumThumbsVisible").innerHTML = pic_start + " - " + pic_end;
			}
			else{
				var pic_start = 1 * this.albumNumThumbs - this.albumNumThumbs + 1;
				var pic_end = ((1 * this.albumNumThumbs +1) > totUnused) ? totUnused : (1 * this.albumNumThumbs);
				$("albumThumbsVisible").innerHTML = pic_start + " - " + pic_end;
			}
		}
		// kb: set back to new last page if current page contains no thumbs
		if ((this.albumCurrPage * this.albumNumThumbs) - this.albumNumThumbs >= totUnused) {
			var lastPage = ((totUnused > 0) ? (parseInt((totUnused -1) / this.albumNumThumbs) +1) : 1);
			if (this.albumCurrPage > lastPage) {
				this.albumCurrPage = lastPage;
				this.showAlbum(pauseDrag);
				return;
			}
		}
	}catch(e){
	}
}
KPHOTO.prototype.clearIcon = function() {
	this.iconList.length = 0;
}
KPHOTO.prototype.clearMargin = function() {
	this.marginList.length = 0;
}
KPHOTO.prototype.showIcon = function(pauseDrag) {
	pauseDrag = pauseDrag || false;
	this.iconTray = new Array(this.iconNumThumbs);
	var numToSkip = (this.iconCurrPage-1) * this.iconNumThumbs;
	var maxPage = Math.ceil(this.iconList.length / this.iconNumThumbs);
	var totShown = 0;
	if(this.iconCurrPage>maxPage){
		this.iconCurrPage = maxPage;
	}else if(this.iconCurrPage<1){
		this.iconCurrPage = 1;
	}

	for (var i=0; i < this.iconList.length; i++) {
		if (numToSkip > 0) {
			numToSkip--;
		}
		else {
			this.iconTray[totShown] = this.iconList[i];
			$("cimg" + totShown).style.visibility = "visible";
			if(oBrowser.isFF){
				dd.elements["cimg" + totShown].swapImage(this.iconList[i].viewURI, true);
			}else{
				que.update("cimg" + totShown,this.iconList[i].viewURI);
				//editImageSrc("cimg" + totShown,this.iconList[i].viewURI);
			}
            dd.elements["cimg" + totShown].resizeTo(this.iconList[i].width,this.iconList[i].height);
			dd.elements["cimg" + totShown].setDraggable(!pauseDrag);
			totShown++;
			if (totShown == this.iconNumThumbs){
				break;
			}
		}
	}
	while (totShown < this.iconNumThumbs) {
		$("cimg" + totShown).style.visibility = "hidden";
		if(oBrowser.isFF){
			dd.elements["cimg" + totShown].swapImage(blankImg.src, true);
		}else{
			editImageSrc("cimg" + totShown,blankImg.src);
		}
		dd.elements["cimg" + totShown].resizeTo(60,60);
		dd.elements["cimg" + totShown].setDraggable(false);
		totShown++;
	}
}
KPHOTO.prototype.showMargin = function(pauseDrag) {
	pauseDrag = pauseDrag || false;
	this.marginTray = new Array(this.marginNumThumbs);
	var numToSkip = (this.marginCurrPage-1) * this.marginNumThumbs;
	var maxPage = Math.ceil(this.marginList.length / this.marginNumThumbs);
	var totShown = 0;
	if(this.marginCurrPage>maxPage){
		this.marginCurrPage = maxPage;
	}else if(this.marginCurrPage<1){
		this.marginCurrPage = 1;
	}
	
	for (var i=0; i < this.marginList.length; i++) {
		if (numToSkip > 0) {
			numToSkip--;
		}
		else {
			this.marginTray[totShown] = this.marginList[i];
			$("mtext" + totShown).style.visibility = "visible";
			$("mtext" + totShown).innerHTML = this.marginTray[totShown].name;
			$j('#mtext' + totShown).css('fontSize','12px');
			$("mimg" + totShown).style.visibility = "visible";
			if(oBrowser.isFF){
				dd.elements["mimg" + totShown].swapImage(this.marginList[i].viewURI, true);
			}else{
				que.update("mimg" + totShown,this.marginList[i].viewURI);
				//editImageSrc("mimg" + totShown,this.marginList[i].viewURI);
			}
            dd.elements["mimg" + totShown].resizeTo(this.marginList[i].width,this.marginList[i].height);
			dd.elements["mimg" + totShown].setDraggable(!pauseDrag);
			totShown++;
			if (totShown == this.marginNumThumbs){
				break;
			}
		}
	}
	
	while (totShown < this.marginNumThumbs) {
		$("mimg" + totShown).style.visibility = "hidden";
		if(oBrowser.isFF){
			dd.elements["mimg" + totShown].swapImage(blankImg.src, true);
		}else{
			editImageSrc("mimg" + totShown,blankImg.src);
		}
		dd.elements["mimg" + totShown].setDraggable(false);
		dd.elements["mimg" + totShown].resizeTo(60,60);
		totShown++;
	}
}
KPHOTO.prototype.hideIcon = function() {
	for (var i=0; i < this.iconNumThumbs; i++) {
		$("cimg" + i).style.visibility = "hidden";
		dd.elements["cimg" + i].resizeTo(0,0);
	}
}
KPHOTO.prototype.hideMargin = function() {
	for (var i=0; i < this.marginNumThumbs; i++) {
		$("mimg" + i).style.visibility = "hidden";
		$("mtext" + i).style.visibility = "hidden";
		dd.elements["mimg" + i].resizeTo(0,0);
	}
}
KPHOTO.prototype.pageAlbum = function(prevNext) {
	var totUnused = this.getTotUnusedAlbum();
	var maxPage = Math.ceil(totUnused / this.albumNumThumbs);
	if (prevNext == 2) {
		this.albumCurrPage = maxPage;
	}
	else if (prevNext == 0) {
		this.albumCurrPage = 1;
	}
	else {
		this.albumCurrPage = this.albumCurrPage + prevNext;
		if (this.albumCurrPage < 1){
			this.albumCurrPage = maxPage;
		}else if (this.albumCurrPage > maxPage){
			this.albumCurrPage = 1;
		}
	}
	setTimeout("kphoto.showAlbum()", 10);
}
KPHOTO.prototype.pageIcon = function(prevNext) {
	var maxPage = Math.ceil(this.iconList.length / this.iconNumThumbs);
	if (prevNext == 2) {
		this.iconCurrPage = maxPage;
	}
	else if (prevNext == 0) {
		this.iconCurrPage = 1;
	}
	else {
		this.iconCurrPage = this.iconCurrPage + prevNext;
		if (this.iconCurrPage < 1){
			this.iconCurrPage = maxPage;
		}else if (this.iconCurrPage > maxPage){
			this.iconCurrPage = 1;
		}
	}
	setTimeout("kphoto.showIcon()", 10);
}
KPHOTO.prototype.pageMargin = function(prevNext) {
	var maxPage = Math.ceil(this.marginList.length / this.marginNumThumbs);
	if (prevNext == 2) {
		this.marginCurrPage = maxPage;
	}
	else if (prevNext == 0) {
		this.marginCurrPage = 1;
	}
	else {
		this.marginCurrPage = this.marginCurrPage + prevNext;
		if (this.marginCurrPage < 1){
			this.marginCurrPage = maxPage;
		}else if (this.marginCurrPage > maxPage){
			this.marginCurrPage = 1;
		}
	}
	setTimeout("kphoto.showMargin()", 10);
}
KPHOTO.prototype.picRemove = function(id) {
	var toRemove = dzObj(id);
	if(toRemove==null){
		return ;
	}
    var alobj = this.albumSourceObj(toRemove.viewID);
    if(alobj!=null){
        var nowCategory = $("nowCategory");
        if(nowCategory[nowCategory.selectedIndex].value==alobj.category ||
            nowCategory.selectedIndex==0){
            this.albumList[this.albumList.length] = new albumElement(toRemove.viewID, alobj.viewURI, alobj.textCaption, alobj.dv,alobj.width,alobj.height,alobj.newURI);
        }
        alobj.isUsed = false;
    }
	//albumList.push(new albumElement(toRemove.viewID, toRemove.thumbURL, toRemove.getAssociatedText()));
	setPicture(toRemove, "","");
	//albumPage(); // comment out extra call
}
KPHOTO.prototype.removePic = function(id) {
	picRemove(id);
	setTimeout("kphoto.showAlbum()", 10);
	hideToolsById(id);
}
function removePic(id) {
	kphoto.picRemove(id);
	setTimeout("kphoto.showAlbum()", 10);
	hideToolsById(id);
}

//自動恢復原比例
KPHOTO.prototype.autoZoom = function(id) {
	var obj = this.obj(id);
	if(obj==null){
		return;
	}
	if(obj.swidth != 0 && obj.sheight != 0){
	    var z = obj.swidth / obj.sheight;
		if(obj.width <= obj.height){
			obj.height = obj.width / z;
		}else{
			obj.width = obj.height * z;
		}
	}
	obj.back();	
	//check(id);
}
/*
KPHOTO.prototype.check = function(id) {
	var cobjer = dd.elements[id];
	var cobj = obj(id);
}*/
KPHOTO.prototype.align = function(position) {
	if(position=="right"){
		var max = 0;
		for(var i=0;i< this.smap.sids.length;i++){
			var obj = this.obj(this.smap.sids[i]);
			if( (obj.left*1 + obj.width*1) > max){
				max = (obj.left*1 + obj.width*1);
			}
		}
		for(var i=0;i< this.smap.sids.length;i++){
			var obj = this.obj(this.smap.sids[i]);
			obj.left = max - obj.width*1;
			obj.back();	
		}
	}else if(position=="left"){
		var min = 10000;
		for(var i=0;i< this.smap.sids.length;i++){
			var obj = this.obj(this.smap.sids[i]);
			if(obj.left*1 < min){
				min = obj.left*1;
			}
		}
		for(var i=0;i< this.smap.sids.length;i++){
			var obj = this.obj(this.smap.sids[i]);
			obj.left = min;
			obj.back();	
		}
	}else if(position=="top"){
		var min = 10000;
		for(var i=0;i< this.smap.sids.length;i++){
			var obj = this.obj(this.smap.sids[i]);
			if(obj.top*1 < min){
				min = obj.top*1;
			}
		}
		for(var i=0;i< this.smap.sids.length;i++){
			var obj = this.obj(this.smap.sids[i]);
			obj.top = min;
			obj.back();	
		}
	}else if(position=="bottom"){
		var max = 0;
		for(var i=0;i< this.smap.sids.length;i++){
			var obj = this.obj(this.smap.sids[i]);
			if( (obj.top*1 + obj.height*1) > max){
				max = (obj.top*1 + obj.height*1);
			}
		}
		for(var i=0;i< this.smap.sids.length;i++){
			var obj = this.obj(this.smap.sids[i]);
			obj.top = max - obj.height*1;
			obj.back();	
		}
	}
	kphoto.smap.removeAll();
	$j("#plSort").dialog('close');
	$j("#plAlignHelp").dialog('close');
}
KPHOTO.prototype.same = function(position) {
	if(position=="width"){
		var min = 10000;
		for(var i=0;i< this.smap.sids.length;i++){
			var obj = this.obj(this.smap.sids[i]);
			if(obj.width*1 < min){
				min = obj.width*1;
			}
		}
		for(var i=0;i< this.smap.sids.length;i++){
			var obj = this.obj(this.smap.sids[i]);
			if(this.smap.isText && obj.fontSize*1 != 0){
				obj.width = min;
				obj.back();
				editImageSrc(obj.id,"images/sp.gif");
   				this.renewText(obj.id);
			}else{
				obj.width = min;
				var z = obj.swidth / obj.sheight;
				obj.height = obj.width / z;
				obj.back();		
			}
		}
	}else if(position=="height"){
		var min = 10000;
		for(var i=0;i< this.smap.sids.length;i++){
			var obj = this.obj(this.smap.sids[i]);
			if(obj.height*1 < min){
				min = obj.height*1;
			}
		}
		for(var i=0;i< this.smap.sids.length;i++){
			var obj = this.obj(this.smap.sids[i]);
			if(this.smap.isText && obj.fontSize*1 != 0){
				obj.height = min;
				obj.back();
				editImageSrc(obj.id,"images/sp.gif");
   				this.renewText(obj.id);
			}else{
				obj.height = min;
				var z = obj.sheight / obj.swidth;
				obj.width = obj.height / z;
				obj.back();		
			}
		}
	}
	kphoto.smap.removeAll();
	$j("#plSort").dialog('close');
}
KPHOTO.prototype.adjuest = function(id) {
	var mainer = dd.elements[id];
	mainer.fetch();
	var mainerObj = this.obj(id);
	if(mainerObj==null || mainer == null){
      	return;
    }  
   	//dbg("icon_DropFunc mainer.name:"+mainer.name);
   	var back = 0;
	var x = mainer.x;
	var y = mainer.y;
	var w = mainer.w;
	var h = mainer.h;	
	//dbg("adjuest w:"+w);
	//dbg("adjuest h:"+h);
   	if(mainerObj.pos=="0"){
   		if(x < pg.x1){
   			back = 1;
   			x = pg.x1;
   		}
   		if(y < pg.y1){
   			back = 1;
   			y = pg.y1;
   		}
		if(x + w > pg.x1 + pg.w1){
			back = 1;
   			w =  pg.x1 + pg.w1 - x;
   			if(x + w > pg.x1 + pg.w1){
	   			back = 1;
	   			x = pg.x1 + pg.w1 - w;
	   		}
   		}
		if(y + h > pg.y1 + pg.h1){
			back = 1;
   			h =  pg.y1 + pg.h1 - y;
   			if(y + h > pg.y1 + pg.h1){
	   			back = 1;
	   			y = pg.y1 + pg.h1 - h;
	   		}
   		}
   	}else{
   		if(x < pg.x2){
   			back = 1;
   			x = pg.x2;
   		}
   		if(y < pg.y2){
   			back = 1;
   			y2 = pg.y2;
   		}
   		if(x + w > pg.x2 + pg.w2){
   			back = 1;
   			w = pg.x2 + pg.w2 - x;
   			if(x + w > pg.x2 + pg.w2){
	   			back = 1;
	   			x = pg.x2 + pg.w2 - w;
	   		}
   		}
		if(y + h > pg.y2 + pg.h2){
			back = 1;
   			h = pg.y2 + pg.h2 - y;
	   		if(y + h > pg.y2 + pg.h2){
				back = 1;
	   			y = pg.y2+ pg.h2 - h;
	   		}
   		} 
   	}
   	if(back==1){
   		if(mainerObj.swidth != 0 && mainerObj.sheight != 0){
		    var z = mainerObj.swidth / mainerObj.sheight;
			if(mainerObj.nw >= mainerObj.nh){
				h = w / z;
			}else{
				w = h * z;
			}
		}
		mainerObj.width = w;
		mainerObj.height = h;
		if(mainerObj.pos=="0"){
			mainerObj.left = x - pg.x1;
			mainerObj.top = y - pg.y1;
		}else{
			mainerObj.left = x - pg.x2;
			mainerObj.top = y - pg.y2;
		}
		mainerObj.back();	
   	}else{
   		if(mainerObj.swidth != 0 && mainerObj.sheight != 0){
   			//dbg("adjuest2");
   			//dbg("adjuest2 mainerObj.swidth:"+mainerObj.swidth);
   			//dbg("adjuest2 mainerObj.sheight:"+mainerObj.sheight);
		    var z = mainerObj.swidth / mainerObj.sheight;
			if(mainerObj.nw >= mainerObj.nh){
				h = w / z;
				//dbg("adjuest2 1");
			}else{
				//dbg("adjuest2 z:"+z);
				w = h * z;
				//dbg("adjuest2 w:"+w);
				//dbg("adjuest2 2");
			}
		}
		mainerObj.width = w;
		mainerObj.height = h;
		mainerObj.back();
		//dbg("adjuest2 w:"+w);
		//dbg("adjuest2 h:"+h);		
   	}
}
KPHOTO.prototype.adjuestSize = function(sw,sh) {
	var minW = 10000;
	var minH = 10000;	
	if(sw == 0 && sh == 0){
		for(var i=0;i< this.smap.sids.length;i++){
			var obj = this.obj(this.smap.sids[i]);
			if(obj.width*1 < minW){
				minW = obj.width*1;
			}
			if(obj.height*1 < minH){
				minH = obj.height*1;
			}
		}
		if(minW < minH){
			sw = minW;
		}else{
			sh = minH;
		}
	}
	for(var i=0;i< this.smap.sids.length;i++){
		var obj = this.obj(this.smap.sids[i]);
		if(this.smap.isText && obj.fontSize*1 != 0){
			obj.width = minW;
			obj.height = minH;
			obj.back();
			editImageSrc(obj.id,"images/sp.gif");
			this.renewText(obj.id);
		}else{
			var z = obj.swidth / obj.sheight;
			if(sw != 0){
				obj.width = sw;
				obj.height = sw / z;
				obj.back();
			}else if(sh != 0){
				obj.width = sh * z;
				obj.height = sh;
				obj.back();	
			}		
		}
	}
	kphoto.smap.removeAll();
	$j("#plSort").dialog('close');		
}