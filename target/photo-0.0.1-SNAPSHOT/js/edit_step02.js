function on_loadedInitData(oj)
{
  //alert(oj.responseText);
  var res  =  oj.responseXML;
  var leftPicture = getColumnValue(res,"leftPicture");
  var rightPicture = getColumnValue(res,"rightPicture");
  var bookWidth = getColumnIntValue(res,"bookWidth");
  var bookHeight = getColumnIntValue(res,"bookHeight");
  var lstable = getColumnIntValue(res,"lstable");
  var lown = getColumnIntValue(res,"lown");
  var time = getColumnIntValue(res,"time");
  var page = getColumnIntValue(res,"page");
  var coverNum = getColumnIntValue(res,"coverNum");
  var multiCover = getColumnValue(res,"multiCover");
  kphoto.lstable = lstable;
  pg.w1 = bookWidth;
  pg.h1 = bookHeight;
  
  kphoto.styleW1 = getColumnValue(res,"styleW1");
  kphoto.styleW2 = getColumnValue(res,"styleW2");
  kphoto.styleW3 = getColumnValue(res,"styleW3");
  kphoto.styleH1 = getColumnValue(res,"styleH1");
  kphoto.styleH2 = getColumnValue(res,"styleH2");
  kphoto.styleH3 = getColumnValue(res,"styleH3");
  kphoto.mm = getColumnValue(res,"mm") * 1;
  
  kphoto.bookWidth = bookWidth;
  kphoto.bookHeight = bookHeight; 
  kphoto.lown = lown;   
  kphoto.page = page;   
  var spreads=$("spreads");
  for(m=spreads.options.length-1;m>=0;m--){
      spreads.options[m]=null;
  }
  for(var i = 1 ; i <= coverNum ; i++ ){
  	spreads.options[i-1]=new Option(""+i, ""+i);
  }
  if(multiCover==1){
  	$('multiCover1').checked = true;
  	$('spreads').value = kphoto.page;
  }else{
  	$('multiCover0').checked = true;
  }
  	if(coverNum==1){
  		$('multiCover0').checked = true;
  		$('multiCover1').checked = false;
  	}else{
  		$('multiCover0').checked = false;
  		$('multiCover1').checked = true;  
  	}
  	$("coverNum").value = coverNum;
  	if(leftPicture == ""){
  		leftPicture = "images/sp.gif"
 	}
  	if($('left-page')==null){
  		addImage("main-page","left-page",
			leftPicture,
			193,220,bookWidth,bookHeight,true,2);
		$j("#coverTable").height(bookHeight+30);
		ADD_DHTML("left-page");
    	dd.elements["left-page"].resizeTo(bookWidth,bookHeight);
    	dd.elements["left-page"].moveTo(193,220);	
		dd.elements["left-page"].setDraggable(false);
  	}else{
  		editImageSrc("left-page",leftPicture);
  	}
  	if($('left-page-bg')==null){
    	addDiv("main-page","left-page-bg",
			193-4,220-4,bookWidth+8,bookHeight+8,true,1);	
		$j("#left-page-bg").css('background-color',"gray");
	}else{
    	editPosition($("left-page-bg"),
			193-4,220-4,bookWidth+8,bookHeight+8);	
	}	
  	if(time==1){
  		kphoto.clear();
	  	var pic = res.getElementsByTagName("pic");
	  	for(var i = 0 ; i < pic.length ; i++ ){
		      var seq = getColumnValue(pic[i],"seq");
		      var category = getColumnValue(pic[i],"category");
		      var lpic = getColumnValue(pic[i],"lpic");
		      var step = getColumnValue(pic[i],"step");
		      var croplpic = getColumnValue(pic[i],"croplpic");
		      var rotatelpic = getColumnValue(pic[i],"rotatelpic");		      
		      var lwidth = getColumnValue(pic[i],"lwidth");
		      var lheight = getColumnValue(pic[i],"lheight");
		      
		      var caption = getColumnValue(pic[i],"caption");
		      var newlpic = getColumnValue(pic[i],"newlpic");
		      var nw = getColumnValue(pic[i],"nw");
		      var nh = getColumnValue(pic[i],"nh");
	      		      
		      var dwh = getColumnValue(pic[i],"dwh");
		      var isUsed = getColumnValue(pic[i],"isUsed");
		      if(isUsed == ""){
		    	  isUsed = "0";  
		      }      
		      var s = kphoto.addAlbumSource(seq,lpic,caption,dwh,lwidth,lheight,newlpic,category,nw,nh,step,croplpic,rotatelpic);
		      if(isUsed=="1"){
		      		s.isUsed = true;
		      }else{
		      		s.isUsed = false;
		      }      
	  	}
  	}else{
  		kphoto.clear2();
  	}
  	for(var i = 0 ; i < imageDropZones.length ; i++ ){
  		imageDropZones[i].free();
  		dd.elements[imageDropZones[i].name].del();
  	}
  	imageDropZones.length = 0;
   	var cseq = getColumnIntValue(res,"cseq");
   	var rectLeft = getColumnIntValue(res,"rectLeft")+pg.x1;
   	var rectTop = getColumnIntValue(res,"rectTop")+pg.y1;
   	var rectWidth = getColumnIntValue(res,"rectWidth");
   	var rectHeight = getColumnIntValue(res,"rectHeight");
   	
   	if(rectWidth != 0 && rectHeight != 0){
	   	imageDropZones[imageDropZones.length]= new DropZone("image-l-UserImage1", rectLeft,rectTop,rectWidth,rectHeight, false, 99, "image",false, i,"image-l-UserImage1", '','','');
	   	imageDropZones[imageDropZones.length-1].write();
	   	ADD_DHTML("image-l-UserImage1");
	   	dropTargets[dropTargets.length] = "image-l-UserImage1";
	   	dd.elements["image-l-UserImage1"].setDraggable(false);
	   	imageDropZones[imageDropZones.length-1].initTool();
	   	ModifyZoneData2("l",1,rectLeft,rectTop,rectWidth,rectHeight,cseq);
   	}
   	
  	var liconer = res.getElementsByTagName("liconer");
  	for(var i = 0 ; i < liconer.length ; i++ ){
      var key = getColumnValue(liconer[i],"key");  
      var viewID = getColumnValue(liconer[i],"viewID");
      var viewURI = getColumnValue(liconer[i],"viewURI");	  
      var top = getColumnIntValue(liconer[i],"top");
      var left = getColumnIntValue(liconer[i],"left");
      var height = getColumnIntValue(liconer[i],"height");
      var width = getColumnIntValue(liconer[i],"width");
      var sheight = getColumnIntValue(liconer[i],"sheight");
      var swidth = getColumnIntValue(liconer[i],"swidth");   
      if(viewURI==""){
      	continue;
      }       
      var icon= kphoto.addIconer("0",viewID, key, viewURI,left ,top, width, height, swidth, sheight);
      icon.back();
  }
  var riconer = res.getElementsByTagName("riconer");
  for(var i = 0 ; i < riconer.length ; i++ ){
      var key = getColumnValue(riconer[i],"key");  
      var viewID = getColumnValue(riconer[i],"viewID");
      var viewURI = getColumnValue(riconer[i],"viewURI");	  
      var top = getColumnIntValue(riconer[i],"top");
      var left = getColumnIntValue(riconer[i],"left");
      var height = getColumnIntValue(riconer[i],"height");
      var width = getColumnIntValue(riconer[i],"width");
      var sheight = getColumnIntValue(riconer[i],"sheight");
      var swidth = getColumnIntValue(riconer[i],"swidth"); 
      if(viewURI==""){
      	continue;
      }
      var icon= kphoto.addIconer("1",viewID, key, viewURI,left ,top, width, height, swidth, sheight);
      icon.back();
  }  
  var limager = res.getElementsByTagName("limager");
  for(var i = 0 ; i < limager.length ; i++ ){
      var viewID = getColumnValue(limager[i],"viewID");
      var viewURI = getColumnValue(limager[i],"viewURI");	
      var newURI = getColumnValue(limager[i],"newURI");
      var top = getColumnIntValue(limager[i],"top");
      var left = getColumnIntValue(limager[i],"left");
      var height = getColumnIntValue(limager[i],"height");
      var width = getColumnIntValue(limager[i],"width");
      var sheight = getColumnIntValue(limager[i],"sheight");
      var swidth = getColumnIntValue(limager[i],"swidth");   
      if(viewURI==""){
      	continue;
      }      
      var o = kphoto.addImager("0",viewID, viewURI,newURI,left ,top, width, height, swidth, sheight);
      o.back();
  }  
  var lctext = res.getElementsByTagName("lctext");
  for(var i = 0 ; i < lctext.length ; i++ ){
 	var fname = getColumnValue(lctext[i],"fname");
 	var text = getColumnValue(lctext[i],"text");	
 	var fontSize = getColumnIntValue(lctext[i],"fontSize");
 	var fontColor = getColumnValue(lctext[i],"fontColor");	
 	var fontType = getColumnIntValue(lctext[i],"fontType");
 	var fontName = getColumnValue(lctext[i],"fontName");	
 
 	var top = getColumnIntValue(lctext[i],"top");
 	var left = getColumnIntValue(lctext[i],"left");
 	var height = getColumnIntValue(lctext[i],"height");
 	var width = getColumnIntValue(lctext[i],"width");
    if(fname==""){
      	continue;
    } 
	var t = kphoto.addText("0", fname,text,fontSize,fontColor,fontType,fontName, width,height,left,top);
	addImage('main-page', t.id, fname, left+pg.x1, top+pg.y1, width, height, true, 13000);
	ADD_DHTML(t.id);	
	dd.elements[t.id].setDraggable(true);
	$j('#'+t.id).ctextMenu();
	$j('#'+t.id).unbind('click');
	$j('#'+t.id).click(function(event){
		mselect(event,this.id);
	});
	//YAHOO.util.Event.onContentReady(t.id, ctextMenu,t.id);
	t.back();
  }
  var rctext = res.getElementsByTagName("rctext");
  for(var i = 0 ; i < rctext.length ; i++ ){
    var fname = getColumnValue(rctext[i],"fname");
    var text = getColumnValue(rctext[i],"text");	
    var fontSize = getColumnIntValue(rctext[i],"fontSize");
    var fontColor = getColumnValue(rctext[i],"fontColor");	
    var fontType = getColumnIntValue(rctext[i],"fontType");
    var fontName = getColumnValue(rctext[i],"fontName");	
    
    var top = getColumnIntValue(rctext[i],"top");
    var left = getColumnIntValue(rctext[i],"left");
    var height = getColumnIntValue(rctext[i],"height");
    var width = getColumnIntValue(rctext[i],"width");
    if(fname==""){
      	continue;
    }           
	var t = kphoto.addText("1", fname,text,fontSize,fontColor,fontType,fontName, width,height,left,top);
	addImage('main-page', t.id, fname, left+pg.x2, top+pg.y2, width, height, true, 13000);
	ADD_DHTML(t.id);	
	dd.elements[t.id].setDraggable(true);
	$j('#'+t.id).ctextMenu();
	//YAHOO.util.Event.onContentReady(t.id, ctextMenu,t.id);
	t.back();
  } 
  var lmarginer = res.getElementsByTagName("lmarginer");
  for(var i = 0 ; i < lmarginer.length ; i++ ){
      var key = getColumnValue(lmarginer[i],"key");
      var viewID = getColumnValue(lmarginer[i],"viewID");
      var viewURI = getColumnValue(lmarginer[i],"viewURI");	  
      var top = getColumnIntValue(lmarginer[i],"top");
      var left = getColumnIntValue(lmarginer[i],"left");
      var height = getColumnIntValue(lmarginer[i],"height");
      var width = getColumnIntValue(lmarginer[i],"width");
      var sheight = getColumnIntValue(lmarginer[i],"sheight");
      var swidth = getColumnIntValue(lmarginer[i],"swidth");       
      var marginer= kphoto.addMarginer("0",viewID,key, viewURI,left ,top, width, height,swidth, sheight);
      marginer.back();
  }
  var rmarginer = res.getElementsByTagName("rmarginer");
  for(var i = 0 ; i < rmarginer.length ; i++ ){
  	  var key = getColumnValue(rmarginer[i],"key");
      var viewID = getColumnValue(rmarginer[i],"viewID");
      var viewURI = getColumnValue(rmarginer[i],"viewURI");	  
      var top = getColumnIntValue(rmarginer[i],"top");
      var left = getColumnIntValue(rmarginer[i],"left");
      var height = getColumnIntValue(rmarginer[i],"height");
      var width = getColumnIntValue(rmarginer[i],"width");
      var sheight = getColumnIntValue(rmarginer[i],"sheight");
      var swidth = getColumnIntValue(rmarginer[i],"swidth");      
      var marginer= kphoto.addMarginer("1",viewID,key, viewURI,left ,top, width, height,swidth, sheight);
      marginer.back();
  }   
  showTools();  
  kphoto.chooseAlbum($('nowCategory').value);
  hideWait();
  domRollover();
}


function loadInitData()
{
  toChangeCgy();
  showToolsPanels(0);
  createTool();
  showWait();
  loadAjaxData('edit_data_query.ko;jsessionid='+jsessionid,
        '&method=cover',on_loadedInitData,on_loadedInitData);
}

//--------------------------------------------------------------------------------------------------------------
function on_loadedStyleXML(oj)
{
  try{
    //以responseXML取得回應
    //alert(oj.responseText);
    var res  =  oj.responseXML;
    var photostyle = res.getElementsByTagName("photostyle");
    var layout = res.getElementsByTagName("photolayout");
    var styleSeq = res.getElementsByTagName("styleSeq");
    if(photostyle!=null){
      captionSelector.clear();
      for(var i = 0 ; i < photostyle.length ; i++ ){
        var seq = photostyle[i].getElementsByTagName("seq");
        var name = photostyle[i].getElementsByTagName("name");
        var optPicture = photostyle[i].getElementsByTagName("optPicture");
        if(name[0].firstChild.nodeValue==""){
          captionSelector.add({viewID:seq[0].firstChild.nodeValue,viewURI: 'opt/'+optPicture[0].firstChild.nodeValue,caption:"&nbsp;"});
        }else{
          captionSelector.add({viewID:seq[0].firstChild.nodeValue,viewURI: 'opt/'+optPicture[0].firstChild.nodeValue,caption:name[0].firstChild.nodeValue});
        }
        //captionSelector.value = styleSeq[0].firstChild.nodeValue;
      }
    }
    captionSelector.change(0);
    hideWait();
  }catch(e){
    alert("on_loadedStyleLayoutXML error");
  }
}

function toChangeCgy()
{
  var cgySeq = document.getElementById("cgySeq");
  if(cgySeq[cgySeq.selectedIndex].value!=null){
     showWait();
     loadAjaxData('edit_style_query.ko;jsessionid='+jsessionid,
         '&method=style2&cgySeq='+cgySeq[cgySeq.selectedIndex].value,on_loadedStyleXML,on_loadedStyleXML);
  }  
}


function toAdd(){
  document.form1.task.value = "page";
  document.form1.from.value = "step2";
  document.form1.action="edit_add_pic.ko";
  document.form1.submit();
}
function toPhoto(){
  var data = getData();
  document.form1.data.value = data;
  document.form1.where.value = "2";
  document.form1.task.value = "cover_out";
  document.form1.action="edit_photo.ko";
  document.form1.submit();
}
function toStep01(){
  var data = getData();
  document.form1.data.value = data;
  document.form1.task.value = "cover_out";
  document.form1.action="edit_step01.ko";
  document.form1.submit();
}
function toStep03(){
  var data = getData();
  document.form1.data.value = data;
  document.form1.task.value = "cover_out";
  document.form1.action="edit_step03.ko";
  document.form1.submit();
}

function getData(){
  var nowCategory = document.getElementById("nowCategory");
  var styleSeq = document.form1.styleSeq;
  var cgySeq = document.getElementById("cgySeq");
  //var styleKinds = document.getElementById("styleKinds");
  var data = '<?xml version="1.0" encoding="UTF-8"?>'+
  '<root category="'+nowCategory[nowCategory.selectedIndex].value;
  if(styleSeq != null && styleSeq.value>0){
    data+='" styleSeq="'+styleSeq.value;
  }
  data+='" cgySeq="'+cgySeq[cgySeq.selectedIndex].value+'">';
  //data+=' styleKinds="'+styleKinds[styleKinds.selectedIndex].value+'">';
  data+='<cover ';
  for(var i=0;i<imageDropZones.length;i++){
    var dropData = imageDropZones[i];
    if(dropData.name.indexOf("image-l-UserImage1") == 0){
      if(dropData.visible==true && dropData.width !=0 && dropData.height !=0){
        data+='seq="'+dropData.viewID+'" ';
      }
    }
  }
  data+='></cover>';
  data+='</root>';
  return data;
}
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------

function toPage()
{
  	showToolsPanels(0);
  	showWait();
  	loadAjaxData('edit_data_query.ko;jsessionid='+jsessionid,
        '&method=cover&save=1&time=2&page='+$('spreads').value,on_loadedInitData,on_loadedInitData);
	hideGrips();           
}
function toPre()
{
  	showToolsPanels(0);
  	showWait();
  	loadAjaxData('edit_data_query.ko;jsessionid='+jsessionid,
        '&method=cover&save=1&time=2&page='+($('spreads').value*1-+1)+
	        '&data='+encodeURIComponent(getData()),on_loadedInitData,on_loadedInitData);
	hideGrips();   	        
}
function toNext()
{
  	showToolsPanels(0);
  	showWait();
  	loadAjaxData('edit_data_query.ko;jsessionid='+jsessionid,
        '&method=cover&save=1&time=2&page='+($('spreads').value*1+1)+
	        '&data='+encodeURIComponent(getData()),on_loadedInitData,on_loadedInitData);
	hideGrips();        
}
function on_toPage(xml)
{
	var result = $j(xml).find('result').text();
	var msg = $j(xml).find('msg').text();		
	if(result=="1"){
		//alert(msg);
		loadInitData();
	}else{
		alert(msg);		
	}
}
//裁切back event
function on_toCrop(oj)
{
	var res = oj.responseXML;
	var result = getColumnValue(res,"result");
	var msg = getColumnValue(res,"msg");		
	if(result=="1"){
		var seq = getColumnValue(res,"seq");
		var newlpic = getColumnValue(res,"newlpic");
		var croplpic = getColumnValue(res,"croplpic");
		var step = getColumnValue(res,"step");
		var cw = getColumnValue(res,"cw");
		var ch = getColumnValue(res,"ch");
		var kind = getColumnValue(res,"kind");
		var sobj = kphoto.albumSourceObj(seq);
		sobj.newURI = newlpic;
		sobj.cw = cw;
		sobj.ch = ch;
		sobj.step = step;
		sobj.croplpic = croplpic;		
		if(kind=="2"){
			kphoto.editImager(kphoto.crop.zoneID,newlpic, cw, ch);
			showGrips();
		}else{
			var dropZone = dzObj(kphoto.crop.zoneID);
			setPicture(dropZone, sobj.viewID,sobj.textCaption);
		}
		showTools();
	}else{
		alert(msg);		
	}
	hideWait();
}
	
function setDefaultBorder(){
    for (var i=0; i < dropTargets.length; i++) {
      var dzTarget = dzObj(dropTargets[i]);
      if (dzTarget.name == clickID){
        dzTarget.border(orange);
      }else{
        dzTarget.border(dropZoneBorder);
      }
    }
}
function setBorder(color){
  document.form1.captionColor.value = color;
}

function select_color(formName, fieldName, initValue)
{
  Dialog("select_color.ko",
  function(color)
  {
    if (color)
    {
      eval("setBorder('#"+color+"')");
    }else{
      eval("setBorder('"+initValue+"')");
    }
  },initValue);
}


function write_back_func(){
  document.form1.textTop.value = caption.y - pg.y1;
  document.form1.textLeft.value = caption.x - pg.x1;
  document.form1.textWidth.value = caption.w;
  document.form1.textHeight.value = caption.h;
  document.form1.textPos.value = "1";
  window.status = "caption.y:"+caption.y+" caption.x:"+caption.x;
}

function on_ChangeCgy1(oj)
{
	try{
		//alert(oj.responseText);
  		var res  =  oj.responseXML;
  		var pic = res.getElementsByTagName("photostyle");
  		kphoto.clearIcon();
  		for(var i = 0 ; i < pic.length ; i++ ){
  			var seq = getColumnValue(pic[i],"seq");
  			var lpicture = getColumnValue(pic[i],"lpicture");
  			var lwidth = getColumnValue(pic[i],"lwidth");
  			var lheight = getColumnValue(pic[i],"lheight");
		    var s = kphoto.addIcon(seq,"licon/"+lpicture,60,lwidth,lheight);
  		}
  		setTimeout("kphoto.showIcon()", 10);
    	hideWait();
  	}catch(e){
    	alert("on_loadedStyleLayoutXML error:"+e.name);
  	}
}
function on_ChangeCgy2(oj)
{
	try{
		//alert(oj.responseText);
  		var res  =  oj.responseXML;
  		var pic = res.getElementsByTagName("photostyle");
  		kphoto.clearMargin();
  		for(var i = 0 ; i < pic.length ; i++ ){
  			var name = getColumnValue(pic[i],"name");
  			var seq = getColumnValue(pic[i],"seq");
  			var lpicture = getColumnValue(pic[i],"lpicture");
  			var lwidth = getColumnValue(pic[i],"lwidth");
  			var lheight = getColumnValue(pic[i],"lheight");
		    var s = kphoto.addMargin(seq,"lmargin/"+lpicture,60,lwidth,lheight,name);
  		}
  		setTimeout("kphoto.showMargin()", 10);
    	hideWait();
  	}catch(e){
    	alert("on_loadedStyleLayoutXML error");
  	}
}
function toChangeCgy1()
{
  var cgySeq1 = $("cgySeq1");
  if(cgySeq1[cgySeq1.selectedIndex].value!=null){
    showWait();
    loadAjaxData('edit_style_query.ko;jsessionid='+jsessionid,
        '&method=style&forWho=1&cgySeq='+cgySeq1[cgySeq1.selectedIndex].value,
        on_ChangeCgy1,on_ChangeCgy1);
  }
}
function toChangeCgy2()
{
  var cgySeq2 = $("cgySeq2");
  if(cgySeq2[cgySeq2.selectedIndex].value!=null){
    showWait();
    loadAjaxData('edit_style_query.ko;jsessionid='+jsessionid,
        '&method=style&forWho=2&cgySeq='+cgySeq2[cgySeq2.selectedIndex].value,
        on_ChangeCgy2,on_ChangeCgy2);
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------
function getDropPanel() {
	return dd.elements["left-page"];
}

function toChangeConf(){
	$j('#plSelectBox2').hideD();
	if(lock==0){
		lock = 1;	
		showWait();
	    jQuery.post('edit_data_query.ko;jsessionid=' + jsessionid, {
				method : 'selectstyle',
				styleSeq : captionSelector.get().viewID,
				data : getData(),
				r : getAjaxRandom()
			}, on_toPage, "xml");
	    setTimeout("unlock()", 1000);
    } 
}

function toWant(){
	$j('#plLayout').showD();
}
function toCoverNum()
{
	$j('#plLayout').hideD();
	if(lock==0){
			lock = 1;	
			var coverNum = $('coverNum').value*1;
			showWait();
	    	jQuery.post('edit_data_query.ko;jsessionid=' + jsessionid, {
				method : 'coverNum',
				coverNum : coverNum,
				page : document.getElementById("spreads").value,
				data : getData(),
				r : getAjaxRandom()
			}, on_toPage, "xml")
			setTimeout("unlock()", 1000);
	}
}
//-------------------------------------------------------------------------------------------------------------------------------------------
function toSave(){
	if(lock==0){
		lock = 1;	
		showWait();
	    jQuery.post('edit_data_query.ko;jsessionid=' + jsessionid, {
				method : 'savecover',
				page : document.getElementById("spreads").value,
				data : getData(),
				r : getAjaxRandom()
			}, function(xml) {
				var result = $j(xml).find('result').text();
				var msg = $j(xml).find('msg').text();
				if(result=="1"){
				}else{
					alert(msg);		
				}
				hideWait();
			}, "xml")
	    setTimeout("unlock()", 1000);
    } 
}
