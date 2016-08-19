function initDialog(name,left,top,width,height,title,content) {
  //setDraggableImages(false);
  var s = ["<form name='"+name+"Form'>",
  "<input type='hidden' name='width' value='"+width+"'>",
  "<input type='hidden' name='height' value='"+height+"'>",
  createDialogBoxTop("HideDialog('"+name+"')", title, width, (this.name+"Grip")).join(""),
  "<table width="+width+" cellspacing=0>",
  "<tr>",
  "<td width=2 bgcolor=#989898></td>",
  "<td valign=top bgcolor=white align=center>",
  content,
  "&nbsp;</td>",
  "<td width=2 bgcolor=#989898></td>",
  "</tr>",
  "</table>",
  createDialogBoxBottom(width).join(""),
  "</form>"];
  createDialogLayer(name,left,top,width,height, "hidden", s.join(""));
}
function createDialogBoxTop(hideF, heading, w, gripId) {
    return ["<table id="+ gripId +" width="+ w +" cellspacing=0 class='boxTop'>",
        "<tr>",
        "<td width=\"18\" rowspan=\"2\" style=\"background-color: transparent;\"><img src=\"images/win_TL_W.gif\" alt=\"\" width=\"18\" height=\"24\"></td>",
        "<td width="+ "365" +" colspan=\"2\"><img src=\"images/win_top_W.gif\" alt=\"\" width="+ "365" +" height=\"4\"></td>",
        "<td width=\"18\" rowspan=\"2\" style=\"background-color: transparent;\"><a href=\"javascript:"+ hideF +";\"><img src=\"images/win_TR_W.gif\" alt=\"\" width=\"18\" height=\"24\" border=\"0\"></a></td>",
        "</tr>",
        "<tr>",
        "<td height=\"20\"><b><span id=\"heading"+ "320" +"\" style=\"color:white\">"+ heading +"</span></b></td>",
        "<td align=\"right\"><a href=\"javascript:"+ hideF +";\" style=\"color:white; text-decoration:none;\">關閉&nbsp;</a></td>",
        "</tr>",
        "</table>"];
}
function createDialogBoxBottom(w) {
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
function createDialogLayer(sName, sLeft, sTop, sWdh, sHgt, sVis, content)
{
    sVis = ((sVis == showName) || (sVis == hideName)) ? sVis : ((sVis) ? showName : hideName); // accepts either true false or hide show
    if (is_nav4)
        opt('<layer name="' + sName + '" left=' + sLeft + ' top=' + sTop + ' width=' + sWdh + ' height=' + sHgt + ' clip="' + sWdh + ',' + sHgt + '" visibility="' + sVis + '" z-Index=999000>' + content + '</layer>');
    else
        opt('<div id="' + sName + '" style="position:absolute; overflow:hidden; left:' + sLeft + 'px; top:' + sTop + 'px; width:' + sWdh + 'px; height:' + sHgt + 'px;' + ' visibility:' + sVis + '; z-Index:999000">' + content + '</div>');
}
function ShowDialog(name,zindex) {
    var obj = document.getElementById(name);
    obj.style.visibility = "visible";
    obj.style.width = document.forms[name+"Form"].width.value+"px";
    obj.style.height = document.forms[name+"Form"].width.value+"px";
    obj.style.zIndex = zindex;
    setDraggableImages(false);
}
function HideDialog(name) {
  var obj = document.getElementById(name);
  obj.style.visibility = "hidden";//visible
  obj.style.zIndex = "0";
  obj.style.width = "0px";
  obj.style.height = "0px";
  setDraggableImages(true);
}

function slayoutElement(viewID, viewURI,caption) {
	this.viewID  = viewID;
	this.viewURI = viewURI;
    this.caption = caption;
}
var slayoutList = new Array();
var slayout_now = 0;
var slayout_init = 0;
var slayout_Len = 0;
var layout_direct = 0;
var layloutBoxStr = ['<table width="95%" border="0" cellspacing="0" cellpadding="0">',
        '<tr><td colspan="4"><br>',
        '<img src="pics/ctrlpan/prev_sq.jpg" width="71" height="15" alt="上一頁相框樣式" style="cursor: pointer;" onclick="toPreLayout()">&nbsp&nbsp',
        '<img src="pics/ctrlpan/next_sq.jpg" width="71" height="15" alt="下一頁相框樣式" style="cursor: pointer;" onclick="toNextLayout()">',
        '</td></tr>',
        '<tr><td width="90" height="60" align="center"><img alt="" id="layoutpic0" src="images/sp.gif" width="90" height="60" onclick="toChangeLayout2(0)" style="cursor: pointer;"></td>',
        '<td width="90" align="center"><img alt="" id="layoutpic1" src="images/sp.gif" width="90" height="60" onclick="toChangeLayout2(1)" style="cursor: pointer;"></td>',
        '<td width="90" align="center"><img alt="" id="layoutpic2" src="images/sp.gif" width="90" height="60" onclick="toChangeLayout2(2)" style="cursor: pointer;"></td>',
        '<td width="90" align="center"><img alt="" id="layoutpic3" src="images/sp.gif" width="90" height="60" onclick="toChangeLayout2(3)" style="cursor: pointer;"></td>',
        '</tr><tr>',
        '<td height="20" align="center" class="textBasic"><div id="caption0">&nbsp;</div></td>',
        '<td height="20" align="center" class="textBasic"><div id="caption1">&nbsp;</div></td>',
        '<td height="20" align="center" class="textBasic"><div id="caption2">&nbsp;</div></td>',
        '<td height="20" align="center" class="textBasic"><div id="caption3">&nbsp;</div></td>',
        '</tr><tr>',
        '<td width="90" height="60" align="center"><img alt="" id="layoutpic4" src="images/sp.gif" width="90" height="60" onclick="toChangeLayout2(4)" style="cursor: pointer;"></td>',
        '<td width="90" align="center"><img alt="" id="layoutpic5" src="images/sp.gif" width="90" height="60" onclick="toChangeLayout2(5)" style="cursor: pointer;"></td>',
        '<td width="90" align="center"><img alt="" id="layoutpic6" src="images/sp.gif" width="90" height="60" onclick="toChangeLayout2(6)" style="cursor: pointer;"></td>',
        '<td width="90" align="center"><img alt="" id="layoutpic7" src="images/sp.gif" width="90" height="60" onclick="toChangeLayout2(7)" style="cursor: pointer;"></td>',
        '</tr><tr>',
        '<td height="20" align="center" class="textBasic"><div id="caption4">&nbsp;</div></td>',
        '<td height="20" align="center" class="textBasic"><div id="caption5">&nbsp;</div></td>',
        '<td height="20" align="center" class="textBasic"><div id="caption6">&nbsp;</div></td>',
        '<td height="20" align="center" class="textBasic"><div id="caption7">&nbsp;</div></td>',
        '</tr><tr>',
        '<td width="90" height="60" align="center"><img alt="" id="layoutpic8" src="images/sp.gif" width="90" height="60" onclick="toChangeLayout2(8)" style="cursor: pointer;"></td>',
        '<td width="90" align="center"><img alt="" id="layoutpic9" src="images/sp.gif" width="90" height="60" onclick="toChangeLayout2(9)" style="cursor: pointer;"></td>',
        '<td width="90" align="center"><img alt="" id="layoutpic10" src="images/sp.gif" width="90" height="60" onclick="toChangeLayout2(10)" style="cursor: pointer;"></td>',
        '<td width="90" align="center"><img alt="" id="layoutpic11" src="images/sp.gif" width="90" height="60" onclick="toChangeLayout2(11)" style="cursor: pointer;"></td>',
        '</tr><tr>',
        '<td height="20" align="center" class="textBasic"><div id="caption8">&nbsp;</div></td>',
        '<td height="20" align="center" class="textBasic"><div id="caption9">&nbsp;</div></td>',
        '<td height="20" align="center" class="textBasic"><div id="caption10">&nbsp;</div></td>',
        '<td height="20" align="center" class="textBasic"><div id="caption11">&nbsp;</div></td>',
        '</tr><tr>',
        '<td width="90" height="60" align="center"><img alt="" id="layoutpic12" src="images/sp.gif" width="90" height="60" onclick="toChangeLayout2(12)" style="cursor: pointer;"></td>',
        '<td width="90" align="center"><img alt="" id="layoutpic13" src="images/sp.gif" width="90" height="60" onclick="toChangeLayout2(13)" style="cursor: pointer;"></td>',
        '<td width="90" align="center"><img alt="" id="layoutpic14" src="images/sp.gif" width="90" height="60" onclick="toChangeLayout2(14)" style="cursor: pointer;"></td>',
        '<td width="90" align="center"><img alt="" id="layoutpic15" src="images/sp.gif" width="90" height="60" onclick="toChangeLayout2(15)" style="cursor: pointer;"></td>',
        '</tr><tr>',
        '<td height="20" align="center" class="textBasic"><div id="caption12">&nbsp;</div></td>',
        '<td height="20" align="center" class="textBasic"><div id="caption13">&nbsp;</div></td>',
        '<td height="20" align="center" class="textBasic"><div id="caption14">&nbsp;</div></td>',
        '<td height="20" align="center" class="textBasic"><div id="caption15">&nbsp;</div></td>',
        '</tr></table>'];
function initLayoutDialog() {
    initDialog("layoutBox",280, 140,400, 600,
        "選擇相框位置",
        layloutBoxStr.join(""));
}
function toNextLayout()
{
  if(slayout_now+1 < slayout_Len){
	for (var j=0; j < 16; j++) {
      var img = document.getElementById("layoutpic"+j);
      img.src = "images/sp.gif";
      img.style.visibility = 'hidden';
      var cp = document.getElementById("caption"+j);
      cp.innerHTML="";
	}
    slayout_now += 1;
	for (var j= 0 + slayout_now*16; j < slayoutList.length && j <slayout_now*16+16; j++) {
      var img = document.getElementById("layoutpic"+(j-slayout_now*16));
      img.src = slayoutList[j].viewURI;
      img.style.visibility = 'visible';

      var cp = document.getElementById("caption"+(j-slayout_now*16));
      cp.innerHTML=slayoutList[j].caption;
	}
  }
}
function toPreLayout()
{
  if(slayout_now-1 >= 0){
	for (var j=0; j < 16; j++) {
      var img = document.getElementById("layoutpic"+j);
      img.src = "images/sp.gif";
      img.style.visibility = 'hidden';

      var cp = document.getElementById("caption"+j);
      cp.innerHTML="";
	}
    slayout_now -= 1;
	for (var j= 0 + slayout_now*16  ; j < slayoutList.length && j <slayout_now*16+16; j++) {
      var img = document.getElementById("layoutpic"+(j-slayout_now*16));
      img.src = slayoutList[j].viewURI;
      img.style.visibility = 'visible';

      var cp = document.getElementById("caption"+(j-slayout_now*16));
      cp.innerHTML=slayoutList[j].caption;
	}
  }
}
function ModifyZone(key,index,l,t,w,h,cl,ct,cw,ch){

    var dropData = findImageZone("image-"+key+"-UserImage"+index);
    if(dropData!=null){
        dropData.visible=true;
        var dzzone = document.getElementById("dzMsg"+dropData.name);
        var img_zone = document.getElementById("dzImg_"+dropData.name);
        var zone = document.getElementById(dropData.name);

        var zone_tool1 = document.getElementById(dropData.name+"_tool1");
        var zone_tool3 = document.getElementById(dropData.name+"_tool3");
        var zone_tool2 = document.getElementById(dropData.name+"_tool2");
        dzzone.innerHTML = dzMsgHTML(msg.dropPicture, w, h, false);

        zone_tool1.style.left = (l)+"px";
        zone_tool3.style.left = (l)+"px";
        zone_tool2.style.left = (l+21)+"px";
        zone_tool1.style.top = (t)+"px";
        zone_tool3.style.top = (t)+"px";
        zone_tool2.style.top = (t)+"px";

        img_zone.style.left = l+"px";
        img_zone.style.top = t+"px";
        img_zone.style.width = w+"px";
        img_zone.style.height = h+"px";
        img_zone.width = w+"px";
        img_zone.height = h+"px";

        dzzone.style.left = l+"px";
        dzzone.style.top = t+"px";
        dzzone.style.width = w+"px";
        dzzone.style.height = h+"px";

        zone.style.left = (l)+"px";
        zone.style.top = (t)+"px";
        zone.style.width = w+"px";
        zone.style.height = h+"px";

        var ddo1 = dd.elements["image-"+key+"-UserImage"+index];
        ddo1.moveTo(l+1,t+1);
        ddo1.resizeTo(w,h);
        ddo1.show();
        dropData.left = l;
        dropData.top = t;
        dropData.width = w;
        dropData.height = h;
        var textZone = findTextZone("image-text-"+key+"-UserText"+index,index);
        if(textZone!=null){
          var tzone = document.getElementById(textZone.name);
          tzone.style.left = cl+"px";
          tzone.style.top = ct+"px";
          tzone.style.width = cw+"px";
          tzone.style.height = ch+"px";

          textZone.left = cl;
          textZone.top = ct;
          textZone.width = cw;
          textZone.height = ch;

          var tip = (textZone.type == "page-text") ? msg.enterDescription : msg.enterCaption;
          if(textZone.text!=""){
            tzone.align = textZone.justification;
            tzone.className = "textCaption";
            tzone.innerHTML = '<div title="'+ tip +'" style="cursor: pointer" onmouseover="textZone_handleOn(\'' + textZone.name + '\')" onmouseout="textZone_handleOff(\'' + textZone.name + '\')" onclick="textZone_handleClick(\'' + textZone.name + '\')"><font color="'+textZone.fontColor+'">' +textZone.text+'</font></div>';
          }else{
            if(textZone.imageURL!=""){
              tzone.innerHTML = '<div title="'+ tip +'" style="cursor: pointer" onmouseover="textZone_handleOn(\'' + textZone.name + '\')" onmouseout="textZone_handleOff(\'' + textZone.name + '\')" onclick="textZone_handleClick(\'' + textZone.name + '\')">'+dzMsgHTML(tip, textZone.width, textZone.height, true)+'</div>';
            }else{
              tzone.innerHTML = dzMsgHTML(tip, textZone.width, textZone.height, true);
            }
          }
        }
      }
}

function ModifyZoneData(key,index,l,t,w,h,cl,ct,cw,ch,seq,text,align,color,font){

    var dropData = findImageZone("image-"+key+"-UserImage"+index);
    if(dropData!=null){
        dropData.visible=true;
        var dzzone = document.getElementById("dzMsg"+dropData.name);
        var img_zone = document.getElementById("dzImg_"+dropData.name);
        var zone = document.getElementById(dropData.name);

        var zone_tool1 = document.getElementById(dropData.name+"_tool1");
        var zone_tool3 = document.getElementById(dropData.name+"_tool3");
        var zone_tool2 = document.getElementById(dropData.name+"_tool2");
        dzzone.innerHTML = dzMsgHTML(msg.dropPicture, w, h, false);

        zone_tool1.style.left = (l)+"px";
        zone_tool3.style.left = (l)+"px";
        zone_tool2.style.left = (l+21)+"px";
        zone_tool1.style.top = (t)+"px";
        zone_tool3.style.top = (t)+"px";
        zone_tool2.style.top = (t)+"px";

        img_zone.style.left = l+"px";
        img_zone.style.top = t+"px";
        img_zone.style.width = w+"px";
        img_zone.style.height = h+"px";
        img_zone.width = w+"px";
        img_zone.height = h+"px";

        dzzone.style.left = l+"px";
        dzzone.style.top = t+"px";
        dzzone.style.width = w+"px";
        dzzone.style.height = h+"px";

        zone.style.left = (l)+"px";
        zone.style.top = (t)+"px";
        zone.style.width = w+"px";
        zone.style.height = h+"px";

        var ddo1 = dd.elements["image-"+key+"-UserImage"+index];
        ddo1.moveTo(l+1,t+1);
        ddo1.resizeTo(w,h);
        ddo1.show();
        dropData.left = l;
        dropData.top = t;
        dropData.width = w;
        dropData.height = h;
        var textZone = findTextZone("image-text-"+key+"-UserText"+index,index);
        if(textZone!=null){
          var tzone = document.getElementById(textZone.name);
          tzone.style.left = cl+"px";
          tzone.style.top = ct+"px";
          tzone.style.width = cw+"px";
          tzone.style.height = ch+"px";

          textZone.left = cl;
          textZone.top = ct;
          textZone.width = cw;
          textZone.height = ch;
          textZone.fontColor = color;
          textZone.font = font;
          textZone.justification = align;
          var tip = (textZone.type == "page-text") ? msg.enterDescription : msg.enterCaption;
          if(textZone.text!=""){
            tzone.align = textZone.justification;
            if(textZone.font !=""){
                tzone.className = "textCaption"+textZone.font;
            }else{
                tzone.className = "textCaption";
            }
            tzone.innerHTML = '<div title="'+ tip +'" style="cursor: pointer" onmouseover="textZone_handleOn(\'' + textZone.name + '\')" onmouseout="textZone_handleOff(\'' + textZone.name + '\')" onclick="textZone_handleClick(\'' + textZone.name + '\')"><font color="'+textZone.fontColor+'">' + ReplaceAll(textZone.text,"\n","<br/>") +'</font></div>';
          }else{
            if(textZone.imageURL!=""){
              tzone.innerHTML = '<div title="'+ tip +'" style="cursor: pointer" onmouseover="textZone_handleOn(\'' + textZone.name + '\')" onmouseout="textZone_handleOff(\'' + textZone.name + '\')" onclick="textZone_handleClick(\'' + textZone.name + '\')">'+dzMsgHTML(tip, textZone.width, textZone.height, true)+'</div>';
            }else{
              tzone.innerHTML = dzMsgHTML(tip, textZone.width, textZone.height, true);
            }
          }
        }
        setPicture(dropData, seq, text);
      }
}
//----------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------
var qrectList = new Array();
function cinit(left,top,width,height,gapx,gapy,datecolor,datefont) {
    for (var i=0; i<6; i++){
        for (var j=0; j<7; j++){
            var name= "day_rect"+i+""+j;
            var qrect = new QRect(name,"","",0,"",left+j*(gapx+width),top+i*(height+gapy),width,height,"10",'plane1.show('+qrectList.length+');',datecolor,datefont);
            qrect.create();
            qrectList[qrectList.length] = qrect;
        }
    }
}
var QRect = Class.create();
QRect.prototype = {
  initialize: function(name,day,text,viewID,viewURI,left,top,width,height,zIndex,event,datecolor,datefont) {
  	this.name = name;
    this.day = day;
  	this.left = left;
  	this.top = top;
  	this.width = width;
    this.height = height;
    this.zIndex = zIndex;
    this.event = event;
    this.text = text;
    this.viewID = viewID;
    this.viewURI = viewURI;
    this.datecolor = datecolor;
    this.datefont = datefont;
  },
  create: function() {
    var sw = ((this.height-16)*4/3);
    
    var content = [
        '<img id="spimg_',this.name,'" src="images/sp.gif" style="position:absolute;left:0px;top:0px;width:',this.width,
        ';height=',this.height,'" alt="透明底圖" name="dzImg_' ,this.name,
        '_tool3" width="',this.width,'" height="',this.height,'; z-Index:1">',

        '<img id="rimg_',this.name,'" src="',this.viewURI==''?'images/sp.gif':this.viewURI,
        '" style="position:absolute;left:0px;top:0px;width:',this.width,
        ';height=',this.height,'" alt="日期顯示之相片" name="rimg_',this.name,
        '" width="',this.width,'" height="',this.height,'; z-Index:2">',

        '<div id="date_',this.name,'" class="textDay',this.datefont,'" style="position:absolute; overflow:hidden;cursor: pointer; left:',
        this.width - 10 , 'px; top:' ,
        0 , 'px; width:' ,
        10 , 'px; height:' ,
        10 , 'px;' , ' visibility:visible; z-Index:4">','<font color="',this.datecolor,'">',
        this.day,
        '</font></div>',

        '<div  id="caption_',this.name,'" class="textDay" style="position:absolute; overflow:hidden;cursor: pointer; left:',
        0 , 'px; top:' ,
        this.height-10 , 'px; width:' ,
        this.width , 'px; height:' ,
        12 , 'px;' , ' visibility:visible; z-Index:5">',
        this.text,
        '</div>'];
     opt('<div id="' + this.name + '" style="position:absolute; overflow:hidden;cursor: pointer; left:' +
        this.left + 'px; top:' +
        this.top + 'px; width:' +
        this.width + 'px; height:' +
        this.height + 'px;' + ' visibility:visible; z-Index:' + this.zIndex + '" onclick="' + this.event +
        '">' + content.join("") + '</div>');
  },
  write: function(content) {
    var obj = document.getElementById("qw_content_"+this.name);
    obj.innerHTML = content;
  },
  change: function() {
    var obj = document.getElementById("rimg_"+this.name);
    obj.src = this.viewURI==''?'images/sp.gif':this.viewURI;
    var dobj = document.getElementById("date_"+this.name);
    dobj.innerHTML = '<font color="'+this.datecolor+'">'+this.day+'</font>';
    var cobj = document.getElementById("caption_"+this.name);
    cobj.innerHTML = this.text;
  },
  hide: function() {
    var obj = document.getElementById(this.name);
    obj.style.visibility = "hidden";
    obj.style.width = "0px";
    obj.style.height = "0px";
    obj.style.zIndex = "0";
  }
}

var QWindows = Class.create();
QWindows.prototype = {
  initialize: function(name,title,left,top,width,height,zIndex) {
  	this.name = name;
    this.title = title;
  	this.left = left;
  	this.top = top;
  	this.width = width;
    this.height = height;
    this.zIndex = zIndex;
    this.dnum = 0;
    this.viewID = 0;
    this.viewURI = "";
  },
  create: function() {
    var content = [
        '<div id="',this.name,'" style="position:absolute; overflow:hidden; left:',this.left,
        'px; top:' ,this.top, 'px; width:' ,this.width, 'px; height:' ,this.height,
        'px;' + ' visibility:hidden; z-Index:',this.zIndex,'">',
        '<table width="',this.width,'" height="',this.height,'" border="0" cellpadding="0" cellspacing="0">',
        '<tr>',
        '<td height="23" align="left" background="cimg/AlbumStep3_23.jpg" valign="middle">',

		'<table width="100%" height="23" border="0" cellpadding="0" cellspacing="0">',
        '<td height="23" align="left" valign="middle"><img src="cimg/AlbumStep1_26.jpg" width="28" height="23" /></td>',
        '<td height="23" align="left" valign="middle"><strong>',this.title,'</strong></td>',
        '<td width="35" height="23" align="center" valign="middle">',
        '<a href="javascript:'+this.name+'.hide();" style="color:white; text-decoration:none;">關閉&nbsp;</a></td>',
      	'</td></tr>',
    	'</table>',
	    '</td>',
        '</tr>',
        '<tr>',
        '<td align="center" valign="top">',
		'<table width="100%" height="',(this.height-23),'" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2">',
      	'<tr>',
       	'<td align="center" valign="top" id="qw_content_',this.name,'">&nbsp;</td>',
      	'</tr>',
    	'</table>',
	    '</td>',
        '</tr>',
        '</table>','</div>'];
     document.write(content.join(""));
  },
  write: function(content) {
    var obj = document.getElementById("qw_content_"+this.name);
    obj.innerHTML = content;
  },
  show: function(dnum) {
    this.dnum = dnum;
    for (var i=0; i < textZones.length; i++) {
        textZones[i].hide();
    }
    isCalendar = true;
    hideTools();
    if(dnum < qrectList.length){
        var obj = document.getElementById(this.name);
        if(obj!=null){
            obj.style.visibility = "visible";
            obj.style.top = this.top+"px";
            obj.style.left = this.left+"px";
            obj.width = this.width+"px";
            obj.height = this.height+"px";
            obj.style.width = this.width+"px";
            obj.style.height = this.height+"px";
            var plane1_describle = document.getElementById("plane1_describle");
            var plane1_img = document.getElementById("plane1_img");
            if( qrectList[dnum].viewURI == ""){
                plane1_img.src = "images/sp.gif";
                this.viewURI = "";
            }else{
                plane1_img.src = qrectList[dnum].viewURI;
                this.viewURI = qrectList[dnum].viewURI;
            }
            this.viewID = qrectList[dnum].viewID;

            plane1_describle.value = qrectList[dnum].text;

            dd.elements[this.name].maximizeZ();
            setDraggableImages2(false);
        }
    }
  },
  hide: function() {
    var obj = document.getElementById(this.name);
    obj.style.visibility = "hidden";
    obj.style.left = "0px";
    obj.style.top = "1000px";
    obj.width = "0px";
    obj.height = "0px";
    obj.style.width = "0px";
    obj.style.height = "0px";
    obj.style.zIndex = "0";

    qrectList[this.dnum].viewID = this.viewID;
    if( this.viewURI==null || this.viewURI == ""){
        qrectList[this.dnum].viewURI = "images/sp.gif";
    }else{
        qrectList[this.dnum].viewURI = this.viewURI;
    }
    var plane1_describle = document.getElementById("plane1_describle");
    qrectList[this.dnum].text = plane1_describle.value;
    qrectList[this.dnum].change();


    setDraggableImages(true);
    for (var i=0; i < textZones.length; i++) {
        textZones[i].show();
    }
    showTools();
    isCalendar = false;
  }
}


function GenDropHtml(str, w, h, isTxt) {
    var tbClass = (isTxt) ? "txtMsg" : "zdMsg";
    var size = ((h > 50) && (w > 50)) ? "lgMsg" : "lgMsg";//"lgMsg" : "smMsg";
    str = (size == "smMsg") ? str : str.split(" ").join("<br>"); // add brs to large text
    if (h < 12) {
        return "<table width="+ w +" cellspacing='0' class='"+ tbClass +"'><tr><td height="+ h +" style='font-size:"+ h +"px;'>"+ str +"</td></tr></table>"; }
    return "<table width="+ w +" cellspacing='0' class='"+ tbClass +"'><tr><td height="+ h +" class='"+ size +"'>"+ str +"</td></tr></table>";
}
