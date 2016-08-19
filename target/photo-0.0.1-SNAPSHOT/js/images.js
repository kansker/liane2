var que = {
	wait: 10,
	imgName: new Array(),
	imgUrl: new Array(),
	index: -1,
	update: function(name, url) {
		this.imgName.push(name);
        if(url=="")
            this.imgUrl.push(photo_space_img);
        else
		    this.imgUrl.push(url);
		if (this.imgName.length == 1) { // not currently working que
			this.timer = setTimeout(que.getNext, que.wait);
		}
	},
	getNext: function() {
		with(que) {
			if (++index < imgName.length) {
				//dbg("fetching: "+ index + " imgName.length: " + imgName.length + " name: " + imgName[index]);
				editImageSrc(imgName[index],imgUrl[index]);
				timer = setTimeout(getNext, wait);
			}
			else { // done
				imgName.length = imgUrl.length = 0;
				index = -1;
			}
		}
	}
}
function addImage(parent,id,u,l,t,w,h,vis,z)
{
	var elem = null; 
  	if(!oBrowser.isIE){
  		elem = addImg(parent,id,u,l,t,w,h,vis,z);
  	}else if(oBrowser.isIE){
  		elem = addDiv(parent,id,l,t,w,h,vis,z);
  		if(photo_space_img!=u){ 
  			//u = replaceAll(imgSrv+u,"/","\\");
  			elem.style.filter= "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src='"+ u +"',sizingMethod='scale')";
  		}else{
  			elem.style.filter= "";
  		}
  	}	
  	return elem;
}

function addImg(parent,id,u,l,t,w,h,vis,z)
{
	//u = replaceAll(imgSrv+u,"/","\\");
  	var elem = document.createElement("IMG");
	$(parent).appendChild(elem);
    elem.setAttribute("id",id);
    elem.src = u;
    editPosition(elem,l,t,w,h);
  	elem.style.position ="absolute";	
  	elem.style.visibility = (vis==true?"visible":"hidden");
  	elem.style.zIndex = z*1;   
  	return elem;
}
function addDiv(parent,id,l,t,w,h,vis,z)
{
	var elem = document.createElement("DIV");	
	$(parent).appendChild(elem);
    elem.setAttribute("id",id);
    
    editPosition(elem,l,t,w,h);
  	elem.style.position ="absolute";	
  	elem.style.visibility = (vis==true?"visible":"hidden");
  	elem.style.zIndex = z*1;    
  	return elem;
}
function editPosition(elem,l,t,w,h){
  	elem.style.top = t*1 + 'px';
  	elem.style.left = l*1 + 'px';
  	elem.style.height = h*1 + 'px';
  	elem.height = h*1;
  	elem.style.width = w*1 + 'px';
  	elem.width = w*1;
}
function editImageSrc(id,u)
{
	//if(JS_BRAMUS.loads[u]==null){
	//	var n = new JS_BRAMUS.lazierLoadImage($(id),u, Object.clone(lazierLoadDefaultOptions));
	//	setTimeout("JS_BRAMUS.temps['"+id+"'].lazyScroll()", 100);
	//}else{
	editImageSrc2(id,u);
	//}
}
function editImageSrc2(id,u)
{
	var elem = $(id);
  	if(!oBrowser.isIE){
  		//u = replaceAll(imgSrv+u,"/","\\");
  		$j("#"+id).attr("src", u);
  		//$(id).style.visibility = "visible";
  	}else{
  		//alert(u);
  		if(u.indexOf(photo_space_img) < 0){
  			elem.style.filter= "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src='"+ u +"',sizingMethod='scale')";
  		}else{	
  			elem.style.filter= "";
  		} 
  	}	
}
function editImageSrc3(id,u)
{
	var elem = $(id);
  	if(!oBrowser.isIE){
  		u = replaceAll(imgSrv+u,"/","\\");
  		$j("#"+id).attr("src", u);
  		//$(id).style.visibility = "visible";
  	}else{
  		elem.src = u;
  	}	
}

function replaceAll(text, strA, strB)
{
    return text.replace( new RegExp(strA,"g"), strB );    
}

this.imagePreview = function(){	
	/* CONFIG */
		xOffset = 10;
		yOffset = 30;
		// these 2 variable determine popup's distance from the cursor
		// you might want to adjust to get the right result
	/* END CONFIG */
	$j("a.preview").hover(function(e){
		this.t = this.title;
		this.title = "";	
		var c = (this.t != "") ? "<br/>" + this.t : "";
		$j("body").append("<p id='preview'><img src='"+ this.href +"' alt='Image preview' />"+ c +"</p>");								 
		$j("#preview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.fadeIn("fast");						
    },
	function(){
		this.title = this.t;	
		$j("#preview").remove();
    });	
	$j("a.preview").mousemove(function(e){
		$j("#preview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
	});			
};