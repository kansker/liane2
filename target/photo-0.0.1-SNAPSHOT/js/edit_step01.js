function loadInitData()
{
  showToolsPanels(0);
  hideTool2();
  hideTextTool();
  createTool();
  showWait();
  loadAjaxData('edit_data_query.ko;jsessionid='+jsessionid,
        '&method=init',on_loadedInitData,on_loadedInitData);
}
/*
 * 載入資料
 */
function on_initBase(oj)
{
  var res  =  oj.responseXML; 
  var page = getColumnIntValue(res,"page"); 
  var pageNum = getColumnIntValue(res,"pageNum");
  var leftPicture = getColumnValue(res,"leftPicture"); 
  var rightPicture = getColumnValue(res,"rightPicture");
  var bookWidth = getColumnIntValue(res,"bookWidth");
  var bookHeight = getColumnIntValue(res,"bookHeight");
  var lstable = getColumnIntValue(res,"lstable");
  var rstable = getColumnIntValue(res,"rstable");
  var border = getColumnValue(res,"border");
  var lown = getColumnIntValue(res,"lown");
  var rown = getColumnIntValue(res,"rown");   
  var time = getColumnIntValue(res,"time");
  
//  $j('#styleW1').val(getColumnValue(res,"styleW1"));
//  $j('#styleW2').val(getColumnValue(res,"styleW2"));
//  $j('#styleW3').val(getColumnValue(res,"styleW3"));
//  $j('#styleH1').val(getColumnValue(res,"styleH1"));
//  $j('#styleH2').val(getColumnValue(res,"styleH2"));
//  $j('#styleH3').val(getColumnValue(res,"styleH3"));
  kphoto.styleW1 = getColumnValue(res,"styleW1");
  kphoto.styleW2 = getColumnValue(res,"styleW2");
  kphoto.styleW3 = getColumnValue(res,"styleW3");
  kphoto.styleH1 = getColumnValue(res,"styleH1");
  kphoto.styleH2 = getColumnValue(res,"styleH2");
  kphoto.styleH3 = getColumnValue(res,"styleH3");
  kphoto.mm = getColumnValue(res,"mm") * 1;
  
  kphoto.bookWidth = bookWidth;
  kphoto.bookHeight = bookHeight;
  kphoto.lstable = lstable;
  kphoto.rstable = rstable;
  kphoto.lown = lown; 
  kphoto.rown = rown;  
  dropZoneBorder = border;
  $('spreads').value = page;
  kphoto.page = page;
  if(leftPicture == ""){
  	leftPicture = "images/sp.gif"
  }
  if(rightPicture == ""){
  	rightPicture = "images/sp.gif"
  }  
  if($('left-page')==null){
  	addDiv("main-page","left-page1",
		8,223,bookWidth,bookHeight,true,1);
	ADD_DHTML("left-page1");
    dd.elements["left-page1"].resizeTo(bookWidth+4,bookHeight+4);
    dd.elements["left-page1"].moveTo(8+398-bookWidth - 2,223 -2);	
	dd.elements["left-page1"].setDraggable(false);
	$j('#left-page1').css('background-color','#505050');
	//  
  	addImage("main-page","left-page",
		leftPicture,
		8,223,bookWidth,bookHeight,true,2);
	ADD_DHTML("left-page");
    dd.elements["left-page"].resizeTo(bookWidth,bookHeight);
    dd.elements["left-page"].moveTo(8+398-bookWidth,223);	
	dd.elements["left-page"].setDraggable(false);
  }else{
  	editImageSrc("left-page",leftPicture);
  }
  if($('right-page')==null){
  	addDiv("main-page","right-page1",
		8+bookWidth+5,223,bookWidth,bookHeight,true,1);	
	ADD_DHTML("right-page1");
    dd.elements["right-page1"].resizeTo(bookWidth+4,bookHeight+4);
    dd.elements["right-page1"].moveTo(8+398+5-2,223-2);		
	dd.elements["right-page1"].setDraggable(false);
	$j('#right-page1').css('background-color','#505050');
	//  
  	addImage("main-page","right-page",
		rightPicture,
		8+bookWidth+5,223,bookWidth,bookHeight,true,2);	
	ADD_DHTML("right-page");
    dd.elements["right-page"].resizeTo(bookWidth,bookHeight);
    dd.elements["right-page"].moveTo(8+398+5,223);		
	dd.elements["right-page"].setDraggable(false);
  }else{
  	editImageSrc("right-page",rightPicture);
  }
  
  if($("leftBg")!=null){
    var hleftPicture = getColumnValue(res,"hleftPicture");
  	$("leftBg").href = hleftPicture;
  }
  if($("rightBg")!=null){
  	var hrightPicture = getColumnValue(res,"hrightPicture");
  	$("rightBg").href = hrightPicture;
  }
  if(kphoto.page>0){
  	  $('toolL1').style.visibility = "visible";
  	  //$('toolL2').style.visibility = "visible";
  	  $('toolL3').style.visibility = "visible";  
  	  if(lstable!="1"){
  	  	$('toolL4').style.visibility = "visible";
  	  }else{
  	  	$('toolL4').style.visibility = "hidden";
  	  }  
  }else{
  	  $('toolL1').style.visibility = "hidden";
  	  //$('toolL2').style.visibility = "hidden";
  	  $('toolL3').style.visibility = "hidden";
  	  $('toolL4').style.visibility = "hidden"; 
  }
  if((kphoto.page+1) <= pageNum){
  	  $('toolR1').style.visibility = "visible";
  	  //$('toolR2').style.visibility = "visible";
  	  $('toolR3').style.visibility = "visible";  
  	  if(rstable!="1"){
  	  	$('toolR4').style.visibility = "visible";
  	  }else{
  	  	$('toolR4').style.visibility = "hidden";
  	  }
  }else{
	  $('toolR1').style.visibility = "hidden";
	  //$('toolR2').style.visibility = "hidden";
	  $('toolR3').style.visibility = "hidden";
	  $('toolR4').style.visibility = "hidden"; 
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

	      dbg("nw:"+nw);
	      dbg("nh:"+nh);
	      var dwh = getColumnValue(pic[i],"dwh");
	      var isUsed = getColumnValue(pic[i],"isUsed");
	      if(isUsed == ""){
	    	  isUsed = "0";  
	      }

	      var s = kphoto.addAlbumSource(seq,lpic,caption,dwh,lwidth,lheight,newlpic,category,nw,nh,step,croplpic,rotatelpic);
	      
	      dbg("s.nw:"+s.nw);
	      dbg("s.nh:"+s.nh);
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
  for(var i = 0 ; i < textZones.length ; i++ ){
  	textZones[i].free();
  }  
  textZones.length = 0;
  dropTargets = new Array();
  var lrect = res.getElementsByTagName("lrect");
  for(var i = 0 ; i < lrect.length ; i++ ){
      var top = getColumnValue(lrect[i],"t");
      var left = getColumnValue(lrect[i],"l");
      var height = getColumnValue(lrect[i],"h");
      var width = getColumnValue(lrect[i],"w");

      var ctop = getColumnValue(lrect[i],"ct");
      var cleft = getColumnValue(lrect[i],"cl");
      var cheight = getColumnValue(lrect[i],"ch");
      var cwidth = getColumnValue(lrect[i],"cw");

      var seq = getColumnValue(lrect[i],"seq");
      var text = getColumnValue(lrect[i],"text");
      var align = getColumnValue(lrect[i],"align");
      var color = getColumnValue(lrect[i],"color");
      var font = getColumnValue(lrect[i],"font");
      //dbg("seq:"+seq+",text:"+text+",align:"+align+",color:"+color+",font:"+font+",top:"+top);
      //dbg("left:"+left+",height:"+height+",height:"+height+",ctop:"+ctop+",cleft:"+cleft+",cheight:"+cheight);
      var l = 0;
      var t = 0;
      var l = pg.x1+left*1;
      var t = pg.y1+top*1;
      var w = width*1;
      var h = height*1 -1;
      var cl = 0;
      var ct = 0;
      cl = pg.x1 + cleft * 1;
      ct = pg.y1 + ctop * 1;
      var cw = cwidth * 1;
      var ch = cheight * 1;
      //if(align==""){
      //  align = "center";
      //}
      //if(color==""){
      //	  color = "#000000";
      //}      
      //if(font==""){
      //  font = "1";
      //}        
      //ModifyZoneData("l",i,l,t,w,h,cl,ct,cw,ch,seq,text,align,color,font);
      //alert(1);
      //alert(i+"---"+imageDropZones.length);
      imageDropZones[imageDropZones.length]= new DropZone("image-l-UserImage"+i, l,t,w,h, false, 
      	kphoto.zindexer.getJump("DropZone",5), "image",false, i,"image-l-UserImage"+i, '','','image-text-l-UserText'+i);
      imageDropZones[i].write();
      ADD_DHTML("image-l-UserImage"+i);	
      dropTargets[dropTargets.length] = "image-l-UserImage"+i;
      dd.elements["image-l-UserImage"+i].setDraggable(false);
      imageDropZones[i].initTool();
	  textZones[textZones.length] = new TextZone("image-text-l-UserText"+i, cl,ct,cw,ch, false, kphoto.zindexer.get("TextZone"), "image-text",false, i,"image-text-l-UserText"+i, text, 'imageURL',
			250, 'center',
			'','transparent','');
	  textZones[textZones.length-1].write();
  	  if (textZones[textZones.length-1].text.length == 0)
      	textZones[textZones.length-1].border(gray);
 	  textZones[textZones.length-1].show();
 	  ModifyZoneData("l",i,l,t,w,h,cl,ct,cw,ch,seq,text,align,color,font);
 	  $j('#image-l-UserImage'+i).rectMenu();
 	  //YAHOO.util.Event.onContentReady("image-l-UserImage"+i, rectMenu,"image-l-UserImage"+i);
  }
  var rrect = res.getElementsByTagName("rrect");
  for(var i = 0 ; i < rrect.length ; i++ ){
      var t = getColumnIntValue(rrect[i],"t")+pg.y2;
      var l = getColumnIntValue(rrect[i],"l")+pg.x2;
      var h = getColumnIntValue(rrect[i],"h")-1;
      var w = getColumnIntValue(rrect[i],"w");
	  //alert(t+" "+l+" "+ h +" "+w);
      var ct = getColumnIntValue(rrect[i],"ct")+pg.y2;
      var cl = getColumnIntValue(rrect[i],"cl")+pg.x2;
      var ch = getColumnIntValue(rrect[i],"ch");
      var cw = getColumnIntValue(rrect[i],"cw");

      var seq = getColumnValue(rrect[i],"seq");
      var text = getColumnValue(rrect[i],"text");
      var align = getColumnValue(rrect[i],"align");
      var color = getColumnValue(rrect[i],"color");
      var font = getColumnValue(rrect[i],"font");
      if(align==""){
    	  align = "center";
      }
      if(color==""){
    	  color = "#000000";
      }      
      if(font==""){
    	  font = "1";
      }
      if(i >= imageDropZones.length-lrect.length){
      	imageDropZones[imageDropZones.length]= new DropZone("image-r-UserImage"+i, l,t,w,h, false, kphoto.zindexer.getJump("DropZone",5)*1, "image",false, i,"image-r-UserImage"+i, '','','image-text-r-UserText'+i);
      	imageDropZones[imageDropZones.length-1].write();
      	ADD_DHTML("image-r-UserImage"+i);
      	dropTargets[dropTargets.length] = "image-r-UserImage"+i;
      	dd.elements["image-r-UserImage"+i].setDraggable(false);
      	imageDropZones[imageDropZones.length-1].initTool();
	  }   
	  //alert(cl+" "+ct+" "+cw+" "+ch);
	  textZones[textZones.length] = new TextZone("image-text-r-UserText"+i, cl,ct,cw,ch, false, kphoto.zindexer.get("TextZone")*1, "image-text",false, i,"image-text-r-UserText"+i, text , 'imageURL',
			250, 'center',
			'','transparent','');
	  textZones[textZones.length-1].write();
  	  if (textZones[textZones.length-1].text.length == 0)
      	textZones[textZones.length-1].border(gray);
 	  textZones[textZones.length-1].show();	  
 	  ModifyZoneData("r",i,l,t,w,h,cl,ct,cw,ch,seq,text,align,color,font);
 	  $j('#image-r-UserImage'+i).rectMenu();
 	  //YAHOO.util.Event.onContentReady("image-r-UserImage"+i, rectMenu,"image-r-UserImage"+i);
  } 
  setDefaultBorder();//邊框
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
      var icon= kphoto.addIconer("0",viewID,key, viewURI,left ,top, width, height, swidth, sheight);
      icon.back();
  }
  var riconer = res.getElementsByTagName("riconer");
  for(var i = 0 ; i < riconer.length ; i++ ){
  	  var key = getColumnValue(liconer[i],"key");
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
  var rimager = res.getElementsByTagName("rimager");
  for(var i = 0 ; i < rimager.length ; i++ ){
      var viewID = getColumnValue(rimager[i],"viewID");
      var viewURI = getColumnValue(rimager[i],"viewURI");	
      var newURI = getColumnValue(rimager[i],"newURI");    
      var top = getColumnIntValue(rimager[i],"top");
      var left = getColumnIntValue(rimager[i],"left");
      var height = getColumnIntValue(rimager[i],"height");
      var width = getColumnIntValue(rimager[i],"width");
      var sheight = getColumnIntValue(rimager[i],"sheight");
      var swidth = getColumnIntValue(rimager[i],"swidth"); 
      if(viewURI==""){
      	continue;
      }
      var o= kphoto.addImager("1",viewID, viewURI,newURI,left ,top, width, height, swidth, sheight);
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
	$j('#'+t.id).unbind('click');
	$j('#'+t.id).click(function(event){
		mselect(event,this.id);
	});
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
  	  var key = getColumnValue(lmarginer[i],"key");
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
  setDraggableImages(true);
} 
function on_loadedInitData2(oj)
{
	on_initBase(oj); 
  	showTools();
  	kphoto.chooseAlbum($('nowCategory').value);
  	hideWait();
  	$j('#plLayout').hideD();
}
function on_loadedInitData(oj)
{
  var res  =  oj.responseXML;
  on_initBase(oj); 
  showTools();
  kphoto.chooseAlbum($('nowCategory').value);
  hideWait();
}


function loadInitData2()
{
  showWait();
  if(kphoto.rtime%5==0){
	  loadAjaxData('edit_data_query.ko;jsessionid='+jsessionid,
	        '&method=init',on_loadedInitData2,on_loadedInitData2);  
  }else{
	  loadAjaxData('edit_data_query.ko;jsessionid='+jsessionid,
	        '&method=init&time=2',on_loadedInitData2,on_loadedInitData2);
  }
}
function on_loadSinglePic(oj)
{
    var res  =  oj.responseXML;
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
      var s = kphoto.replaceAlbumSource(seq,lpic,caption,dwh,lwidth,lheight,newlpic,category,nw,nh,step,croplpic,rotatelpic);
      if(isUsed=="1"){
      		s.isUsed = true;
      }else{
      		s.isUsed = false;
      }
  	} 
  	var dropZone = dzObj(kphoto.crop.zoneID);
 	var alobj = kphoto.albumSourceObj(kphoto.crop.seq);
 	setPicture(dropZone, alobj.viewID,alobj.textCaption);
 	
  	showTools();
  	kphoto.chooseAlbum($('nowCategory').value);
  	hideWait();
}
function loadSinglePic(seq)
{
  showWait();
  loadAjaxData('edit_data_query.ko;jsessionid='+jsessionid,
        '&method=singlePic&seq='+seq,on_loadSinglePic,on_loadSinglePic);
}
//-------------------------------------------------------------------------------------------------------------------------------------------
//變換框框樣式(按下選擇的框框後,做置換)
function on_ChangeLayout(oj)
{
  var res  =  oj.responseXML;
  var dataDiv = res.getElementsByTagName("dataDiv");
  var layoutSeq = res.getElementsByTagName("layoutSeq");
  
  for(var i = 0 ; i < dataDiv.length ; i++ ){
  	var t = getColumnIntValue(dataDiv[i],"top");
  	var l = getColumnIntValue(dataDiv[i],"left");
  	var h = getColumnIntValue(dataDiv[i],"height")-1;
  	var w = getColumnIntValue(dataDiv[i],"width");
  	/*
   	var ct = getColumnIntValue(dataDiv[i],"ctop");
  	var cl = getColumnIntValue(dataDiv[i],"cleft");
  	var ch = getColumnIntValue(dataDiv[i],"cheight");
  	var cw = getColumnIntValue(dataDiv[i],"cwidth");
  	dbg("t:"+ct+",l:"+l);
  	dbg("ct:"+ct+",cl:"+cl);*/
    if(layout_direct==1){
      	l += pg.x1;
      	t += pg.y1;
    }else{
      	l += pg.x2;
      	t += pg.y2;    
    }
    /*
    if(layout_direct==1){
      	cl += pg.x1;
      	ct += pg.y1;
    }else{
      	cl += pg.x2;
      	ct += pg.y2;    
    }
    dbg("ct2:"+ct+",cl2:"+cl);*/
    if(layout_direct==1){
        document.form1.lLFlag.value = layoutSeq[0].firstChild.nodeValue;
        //ModifyZone("l",i,l,t,w,h,cl,ct,cw,ch);
        ModifyZone("l",i,l,t,w,h);
    }else{
        document.form1.rLFlag.value = layoutSeq[0].firstChild.nodeValue;
        ModifyZone("r",i,l,t,w,h);
    }
  }
  for(var i = dataDiv.length ; i <  15; i++ ){
    if(layout_direct==1){
	      ModifyZone("l",i,2,2,0,0,0,0,0,0);
	      var ddo1 = dd.elements["image-l-UserImage"+i];
	      ddo1.hide();
	      var dropData = findImageZone("image-l-UserImage"+i);
	      if(dropData.hasPicture){
	        dropData.hasPicture=false;
	        dropData.visible=false
	        removePic("image-l-UserImage"+i);
	      }
    }else{
	      ModifyZone("r",i,2,2,0,0,0,0,0,0);
	      var ddo1 = dd.elements["image-r-UserImage"+i];
	      ddo1.hide();
	      var dropData = findImageZone("image-r-UserImage"+i);
	      if(dropData.hasPicture){
	        dropData.hasPicture=false;
	        dropData.visible=false;
	        removePic("image-r-UserImage"+i);
	      }
    }
  }
  hideWait();
}
function toChangeLayout(index)
{
	if(lock==0){
		lock = 1;	
		showWait();
		if(layout_direct==1){
			jQuery.post('edit_data_query.ko;jsessionid=' + jsessionid, {
				method : 'updateLLayout',
				seq : slayoutList[index].viewID,
				data : getData(),
				r : getAjaxRandom()
			}, on_toPage, "xml");
		}else{
			jQuery.post('edit_data_query.ko;jsessionid=' + jsessionid, {
				method : 'updateRLayout',
				seq : slayoutList[index].viewID,
				data : getData(),
				r : getAjaxRandom()
			}, on_toPage, "xml");
	    }
	    $j('#plLayout').hideD();
	    setTimeout("unlock()", 1000);
    } 
  	//loadAjaxData('edit_layout_query.ko;jsessionid=<%=session.getId()%>',
    //    '&method=position&seq='+slayoutList[index].viewID,
    //    on_ChangeLayout,on_ChangeLayout);
}
function toChangeLayout2(index){
  toChangeLayout(slayout_now*16+index);
}
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//載入框框選項資料供選擇
function on_loadedLayout(oj)
{
  //以responseXML取得回應
  //alert(oj.responseText);
  var res  =  oj.responseXML;
  var layout = res.getElementsByTagName("layout");

  slayout_now = 0;
  slayout_Len = 0;

  for(var i = 0 ; i < layout.length ; i++ ){
    var name = layout[i].getElementsByTagName("name");
    var preview = layout[i].getElementsByTagName("preview");
    var seq = layout[i].getElementsByTagName("seq");
    slayoutList[slayoutList.length] = new slayoutElement(seq[0].firstChild.nodeValue,'layout/'+preview[0].firstChild.nodeValue,name[0].firstChild.nodeValue);
  }
  slayout_Len = Math.round(slayoutList.length /16);
  if(slayout_Len*16 < slayoutList.length){
    slayout_Len +=1;
  }
  for (var j=0; j < 4; j++) {
    var img = document.getElementById("fpreview"+j);
    img.src = "images/sp.gif";
    var cp = document.getElementById("caption"+j);
    cp.innerHTML="";
  }
  for (var j=0; j < slayoutList.length && j <4; j++) {
    var img = document.getElementById("layoutpic"+j);
    img.src = slayoutList[j].viewURI;
    var cp = document.getElementById("caption"+j);
    cp.innerHTML=slayoutList[j].caption;
  }
  slayout_init=1;
  hideWait();
}

function toLeftLayout()
{
	$j('#plLayout').showD();
    setDraggableImages(false);
    layout_direct=1;
    if(slayout_init==0){
      	loadAjaxData('edit_layout_query.ko;jsessionid='+jsessionid,
        	'&method=layout',
        on_loadedLayout,on_loadedLayout);
    }
}
function toRightLayout()
{
	$j('#plLayout').showD();
    setDraggableImages(false);
    layout_direct=2;
    if(slayout_init==0){
      	loadAjaxData('edit_layout_query.ko;jsessionid='+jsessionid,
        	'&method=layout',
        on_loadedLayout,on_loadedLayout);
    }
}
//-------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//工具panel的切換
function on_loadedStyleLayoutXML(oj)
{
	try{
    //以responseXML取得回應
    //alert(oj.responseText);
    var res  =  oj.responseXML;
    var layout = res.getElementsByTagName("photolayout");
    /*
    var designInfo = res.getElementsByTagName("designInfo");
    var designInfoDiv = document.getElementById("designInfo");
    if(designInfo!=null && designInfo[0].firstChild!=null){
      designInfoDiv.innerHTML="版型資訊：<br>"+designInfo[0].firstChild.nodeValue;
    }else{
      designInfoDiv.innerHTML="版型資訊：<br>";
    }**/
    
    captionSelector.clear();
    for(var i = 0 ; i < layout.length ; i++ ){
      var single = layout[i].getElementsByTagName("single");
      var preview = layout[i].getElementsByTagName("preview");
      var seq = layout[i].getElementsByTagName("seq");
      var stable = layout[i].getElementsByTagName("stable");
      if(stable[0].firstChild.nodeValue==1){
        captionSelector.add({viewID: seq[0].firstChild.nodeValue,viewURI:'bgpre/'+preview[0].firstChild.nodeValue,caption:"固定版面框配置",single:single[0].firstChild.nodeValue});
      }else if(stable[0].firstChild.nodeValue==2){
        captionSelector.add({viewID: seq[0].firstChild.nodeValue,viewURI:'bgpre/'+preview[0].firstChild.nodeValue,caption:"任意排版面",single:single[0].firstChild.nodeValue});
      }else{
        captionSelector.add({viewID: seq[0].firstChild.nodeValue,viewURI:'bgpre/'+preview[0].firstChild.nodeValue,caption:"可換版面框配置",single:single[0].firstChild.nodeValue});
      }
    }
    captionSelector.change(0);
    hideWait();
  	}catch(e){
    alert("on_loadedStyleLayoutXML error");
  }
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
function toChangeStyle()
{
  var styleSeq = document.getElementById("styleSeq");
  if(styleSeq[styleSeq.selectedIndex].value!=null){
    showWait();
    loadAjaxData('edit_style_layout_query.ko;jsessionid='+jsessionid,
        '&method=layout&seq='+styleSeq[styleSeq.selectedIndex].value,
        on_loadedStyleLayoutXML,on_loadedStyleLayoutXML);
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

function on_ChangeCgy(oj)
{
  try{
    //以responseXML取得回應
    var res  =  oj.responseXML;
    var photostyle = res.getElementsByTagName("photostyle");
    var layout = res.getElementsByTagName("photolayout");
    var styleSeq = res.getElementsByTagName("styleSeq");
    var sty=document.getElementById("styleSeq");//方便引用
    for(m=sty.options.length-1;m>=0;m--){
      //這個要看清楚,因為要重新填充下拉列表的話必須先清除裡面原有的項,清除和增加當然是有區別的了,所以用遞減
      sty.options[m]=null;//將該項設置為空,也就等於清除了
    }
    if(photostyle!=null){
      for(var i = 0 ; i < photostyle.length ; i++ ){
        var seq = photostyle[i].getElementsByTagName("seq");
        var name = photostyle[i].getElementsByTagName("name");
        sty.options[i]=new Option(name[0].firstChild.nodeValue,seq[0].firstChild.nodeValue)
        if(styleSeq[0].firstChild.nodeValue == seq[0].firstChild.nodeValue){
          sty.options[i].selected=true;//設置被選中的初始值
        }
      }
    }
    if(layout!=null){
      captionSelector.clear();
      for(var i = 0 ; i < layout.length ; i++ ){
        var single = layout[i].getElementsByTagName("single");
        var preview = layout[i].getElementsByTagName("preview");
        var seq = layout[i].getElementsByTagName("seq");
        var stable = layout[i].getElementsByTagName("stable");
        if(stable[0].firstChild.nodeValue==1){
          captionSelector.add({viewID: seq[0].firstChild.nodeValue,viewURI:'bgpre/'+preview[0].firstChild.nodeValue,caption:"固定位置版面",clickMethod:function (){toChange2(seq[0].firstChild.nodeValue);},single:single[0].firstChild.nodeValue});
        }else{
          captionSelector.add({viewID: seq[0].firstChild.nodeValue,viewURI:'bgpre/'+preview[0].firstChild.nodeValue,caption:"非固定位置版面",clickMethod:function (){toChange2(seq[0].firstChild.nodeValue);},single:single[0].firstChild.nodeValue});
        }
      }
    }
    captionSelector.change(0);
    hideWait();
  }catch(e){
    alert("on_loadedStyleXML error");
  }
}

function toChangeCgy()
{
  var cgySeq = document.getElementById("cgySeq");
  if(cgySeq[cgySeq.selectedIndex].value!=null){
     var styleSeq = document.getElementById("styleSeq");
     //var styleKinds = document.getElementById("styleKinds");
     showWait();
     var sSeq = 0;
     if(styleSeq.selectedIndex==-1){
       sSeq = -1;
     }else{
       sSeq = styleSeq[styleSeq.selectedIndex].value;
     }
     loadAjaxData('edit_style_query.ko;jsessionid='+jsessionid,
         '&method=style&cgySeq='+cgySeq[cgySeq.selectedIndex].value+
        '&styleSeq='+sSeq,
        on_ChangeCgy,on_ChangeCgy);
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------
function getDropPanel() {
	var area = -1;
	try{
		var overlap1 = boxOverlap(dd.obj, dd.elements["left-page"]);
		var overlap2 = boxOverlap(dd.obj, dd.elements["right-page"]);
		if(overlap1 < 0 && overlap2 < 0){
			return null;
		}
		if(overlap1 > overlap2){
			return dd.elements["left-page"];
		}
		return dd.elements["right-page"];
	}catch(e){
        alert("getDropPanel error:"+e.description);
	}
	return null;
}
//-------------------------------------------------------------------------------------------------------------------------------------------
function toSave(){
	if(lock==0){
		lock = 1;	
		showWait();
		jQuery.post('edit_data_query.ko;jsessionid=' + jsessionid, {
				method : 'savepage',
				test : kphoto.test,
				page : document.getElementById("spreads").value,
				data : getData(),
				r : getAjaxRandom()
			}, function(xml) {
				var result = $j(xml).find('result').text();
				var msg = $j(xml).find('msg').text();
				if(result=="1"){
					//alert(msg);
					kphoto.test = 0;
				}else{
					var test = $j(xml).find('test').text();
					kphoto.test = test * 1; 	
					alert(msg);		
				}
				hideWait();
			}, "xml");
	    setTimeout("unlock()", 1000);
    }   	        
}
function toAuto()
{
  document.form1.task.value = "autopage";
  document.form1.submit();
}

function toNextPage(){
	if(lock==0){
		lock = 1;
		showWait();
		kphoto.rtime++;
		jQuery.post('edit_data_query.ko;jsessionid=' + jsessionid, {
				actions : 'next',
				method : 'page',
				test : kphoto.test,
				page : document.getElementById("spreads").value,
				data : getData(),
				r : getAjaxRandom()
			}, on_toPage, "xml");
	    hideGrips();
	    setTimeout("unlock()", 1000);
    }
}
function toPrePage(){
	if(lock==0){
		lock = 1;	
		showWait();
		kphoto.rtime++;
		jQuery.post('edit_data_query.ko;jsessionid=' + jsessionid, {
				actions : 'pre',
				method : 'page',
				test : kphoto.test,
				page : document.getElementById("spreads").value,
				data : getData(),
				r : getAjaxRandom()
			}, on_toPage, "xml");
	    hideGrips();
	    setTimeout("unlock()", 1000);
    }        
}


function on_toPage(xml)
{
	var result = $j(xml).find('result').text();
	var msg = $j(xml).find('msg').text();	
	if(result=="1"){
		//alert(msg);
		kphoto.test = 0;
		loadInitData2();
	}else{
		var test = $j(xml).find('test').text();
		kphoto.test = test * 1; 
		alert(msg);		
		hideWait();
	}
}
function toPage(){
	if(lock==0){
		lock = 1;			
		showWait();
		kphoto.rtime++;
		jQuery.post('edit_data_query.ko;jsessionid=' + jsessionid, {
				actions : 'page',
				method : 'page',
				test : kphoto.test,
				page : document.getElementById("spreads").value,
				data : getData(),
				r : getAjaxRandom()
			}, on_toPage, "xml");
	    hideGrips();
	    setTimeout("unlock()", 1000);
    }
}
function toChangeConf(){
	
	if(lock==0){
		$j('#plSelectBox2').hideD();		
		lock = 1;
		lmode = "0";
	    if($('lmode2').checked){
      		lmode = "1";
    	}else{
     		lmode = "0";
    	}
		showWait();
		jQuery.post('edit_data_query.ko;jsessionid=' + jsessionid, {
				method : 'layout',
				lmode : lmode,
				styleLayoutSeq : captionSelector.get().viewID,
				data : getData(),
				r : getAjaxRandom()
			}, on_toPage, "xml");
	    setTimeout("unlock()", 1000);
    }    
}
function toChangeLeft(){
	if(lock==0){
  		$j('#plSelectBox').hideD();
		lock = 1;
		lmode = "0";
	    if($('lmode1').checked){
      		lmode = "1";
    	}else{
     		lmode = "0";
    	}	
		showWait();
		jQuery.post('edit_data_query.ko;jsessionid=' + jsessionid, {
				method : 'layoutLeft',
				lmode : lmode,
				styleLayoutSeq : captionSelector.get().viewID,
				data : getData(),
				r : getAjaxRandom()
			}, on_toPage, "xml");
	    setTimeout("unlock()", 1000);
    }
}
function toChangeRight(){
	if(lock==0){
		$j('#plSelectBox').hideD();
		lock = 1;
		lmode = "0";
	    if($('lmode1').checked){
      		lmode = "1";
    	}else{
     		lmode = "0";
    	}	
		showWait();
		jQuery.post('edit_data_query.ko;jsessionid=' + jsessionid, {
				method : 'layoutRight',
				lmode : lmode,
				styleLayoutSeq : captionSelector.get().viewID,
				data : getData(),
				r : getAjaxRandom()
			}, on_toPage, "xml");
	    setTimeout("unlock()", 1000);
    }
}

function selector_onclick(index){
  	captionSelector.value = index;
  	if(captionSelector.get().single==1){
  		$j('#plSelectBox').showD();
    	return;
  	}
  	$j('#plSelectBox2').showD();
}

function toAdd(){
  var data = getData();
  document.form1.data.value = data;
  document.form1.task.value = "page";
  document.form1.action="edit_add_pic.ko";
  document.form1.submit();
}
function toStep02(){
  var data = getData();
  document.form1.data.value = data;
  document.form1.task.value = "page";
  document.form1.action="edit_step02.ko";
  document.form1.submit();
}
function toStep03(){
  var data = getData();
  document.form1.data.value = data;
  document.form1.task.value = "page";
  document.form1.action="edit_step03.ko";
  document.form1.submit();
}