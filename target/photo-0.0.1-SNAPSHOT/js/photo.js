function slayoutElement(viewID, viewURI,caption) {
	this.viewID  = viewID;
	this.viewURI = viewURI;
    this.caption = caption;
}
var slayoutList = new Array();
var slayout_now = 0;
var slayout_init = 0;
var slayout_Len = 0;


var framesList = new Array();
var frames_now = 0;
var frames_init = 0;
var frames_Len = 0;

var layout_direct = 0;
function toNextLayout()
{
  if(slayout_now+1 < slayout_Len){
	for (var j=0; j < 16; j++) {
      var img = document.getElementById("layoutpic"+j);
      img.src = "images/sp.gif";
      //img.style.visibility = 'hidden';
      var cp = document.getElementById("caption"+j);
      cp.innerHTML="";
	}
    slayout_now += 1;
	for (var j= 0 + slayout_now*16; j < slayoutList.length && j <slayout_now*16+16; j++) {
      var img = document.getElementById("layoutpic"+(j-slayout_now*16));
      img.src = slayoutList[j].viewURI;
      //img.style.visibility = 'visible';

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
      //img.style.visibility = 'hidden';

      var cp = document.getElementById("caption"+j);
      cp.innerHTML="";
	}
    slayout_now -= 1;
	for (var j= 0 + slayout_now*16  ; j < slayoutList.length && j <slayout_now*16+16; j++) {
      var img = document.getElementById("layoutpic"+(j-slayout_now*16));
      img.src = slayoutList[j].viewURI;
      //img.style.visibility = 'visible';

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
       	//dzzone.innerHTML = dzMsgHTML(msg.dropPicture, w, h, false);

       	zone_tool1.style.left = (l)+"px";
       	zone_tool3.style.left = (l)+"px";
       	zone_tool2.style.left = (l+21)+"px";
       	zone_tool1.style.top = (t)+"px";
       	zone_tool3.style.top = (t)+"px";
       	zone_tool2.style.top = (t)+"px";

		//editPosition(img_zone,l,t,w,h);
		editPosition(dzzone,l,t,w,h);
		//editPosition(zone,l,t,w,h);

       	var ddo1 = dd.elements["image-"+key+"-UserImage"+index];
       	ddo1.moveTo(l,t);
       	ddo1.resizeTo(w,h);
       	ddo1.show();
       
       	dropData.left = l;
       	dropData.top = t;
       	dropData.width = w;
       	dropData.height = h;
       	
       	var textZone = findTextZone("image-text-"+key+"-UserText"+index,index);
       	if(textZone!=null){
       		dbg("textZone.name:"+textZone.name);
         	var tzone = $(textZone.name);
         	dbg("image-text-"+key+"-UserText"+index);
         	dbg("cl:"+cl);
         	dbg("ct:"+ct);
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
        var dzzone = $("dzMsg"+dropData.name);
        var zone = $(dropData.name);
        var zone_tool1 = $(dropData.name+"_tool1");
        var zone_tool3 = $(dropData.name+"_tool3");
        var zone_tool2 = $(dropData.name+"_tool2");
        dzzone.innerHTML = dzMsgHTML(msg.dropPicture, w, h, false);
        /*zone_tool1.style.left = (l)+"px";
        zone_tool3.style.left = (l)+"px";
        zone_tool2.style.left = (l+21)+"px";
        zone_tool1.style.top = (t)+"px";
        zone_tool3.style.top = (t)+"px";
        zone_tool2.style.top = (t)+"px";*/
        dd.elements[zone_tool1.id].moveTo(l,t);
        dd.elements[zone_tool2.id].moveTo(l+21,t);
        dd.elements[zone_tool3.id].moveTo(l,t);
        
        
		//editPosition(dzzone,l,t,w,h);
        var ddo1 = dd.elements["image-"+key+"-UserImage"+index];
        ddo1.moveTo(l,t);
        ddo1.resizeTo(w,h);
        ddo1.show();
        dbg("ddo1:"+ddo1.x+" "+ddo1.y);
        /*
        dropData.left = l;
        dropData.top = t;
        dropData.width = w;
        dropData.height = h;
        */
        var textZone = findTextZone("image-text-"+key+"-UserText"+index,index);
        if(textZone!=null){
	          var tzone = $(textZone.name);
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

function ModifyZoneData2(key,index,l,t,w,h,cseq){
    var dropData = findImageZone("image-"+key+"-UserImage"+index);
    if(dropData!=null){
        dropData.visible=true;
        var dzzone = $("dzMsg"+dropData.name);
        var zone = $(dropData.name);
        var zone_tool1 = $(dropData.name+"_tool1");
        var zone_tool3 = $(dropData.name+"_tool3");
        var zone_tool2 = $(dropData.name+"_tool2");
        dzzone.innerHTML = dzMsgHTML(msg.dropPicture, w, h, false);
        dd.elements[zone_tool1.id].moveTo(l,t);
        dd.elements[zone_tool2.id].moveTo(l+21,t);
        dd.elements[zone_tool3.id].moveTo(l,t);
        var ddo1 = dd.elements["image-"+key+"-UserImage"+index];
        ddo1.moveTo(l,t);
        ddo1.resizeTo(w,h);
        ddo1.show();
        //dbg("ddo1:"+ddo1.x+" "+ddo1.y);
        setPicture(dropData, cseq, '');
    }
}