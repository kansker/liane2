var spacer = 'transparentpixel.gif';
var dd_cursors = new Array(
	'c:default',
	'c:crosshair',
	'c:e-resize',
	'c:hand',
	'c:help',
	'c:move',
	'c:n-resize',
	'c:ne-resize',
	'c:nw-resize',
	'c:s-resize',
	'c:se-resize',
	'c:sw-resize',
	'c:text',
	'c:w-resize',
	'c:wait'
);
for(var dd_i = dd_cursors.length; dd_i;)
{
	--dd_i;
	eval('var CURSOR_' + (dd_cursors[dd_i].substring(2).toUpperCase().replace('-', '_')) + ' = "' + dd_cursors[dd_i] + '";');
}
var dd_u = "undefined";
function WZDD()
{
	this.elements = new Array(0);
	this.obj = null;
	this.px = 'px';
	this.cursor = "hand";
	this.z = 0 ;
}
var dd = new WZDD();

dd.Int = function(d_x, d_y)
{
	return isNaN(d_y = parseInt(d_x))? 0 : d_y;
};

dd.addElement = function(d_o)
{
	dd.elements[d_o.name] = dd.elements[d_o.index = dd.elements.length] = d_o;
};
dd.finlz = function()
{
	if(dd.ie && dd.elements)
	{
		for(var d_i = dd.elements.length; d_i;)
			dd.elements[--d_i].del();
	}
};
function DDObj(id)
{
	this.id = id;
	this.name = this.id;
	this.x = $j("#"+this.id).offset().left;
	this.y = $j("#"+this.id).offset().top;	
	this.w = $j('#'+this.id)[0].style.pixelWidth;
	this.h = $j('#'+this.id)[0].style.pixelHeight;
		
	this.defx = $j("#"+this.id).offset().left;
	this.defy = $j("#"+this.id).offset().top;
	this.defw = this.w || 0;
	this.defh = this.h || 0;
	this.defz = $j('#'+this.id).css('zIndex');
	this.z = $j('#'+this.id).css('zIndex');
	this.visible = true;
	this.cursor = dd.cursor;
}
DDObj.prototype.moveTo = function(d_x, d_y)
{
	this.x = d_x;
	this.y = d_y;
	$j('#'+this.id)[0].style.top = d_y*1 + 'px';
  	$j('#'+this.id)[0].style.left = d_x*1 + 'px';
};
DDObj.prototype.hide = function()
{
	$j("#"+this.id).hide();
	this.visible = false;
};
DDObj.prototype.show = function()
{
	$j("#"+this.id).show();
	this.visible = true;
};
DDObj.prototype.resizeTo = function(d_w, d_h)
{
	//dbg("this.id:"+this.id);
	//dbg("d_w:"+d_w);
	//dbg("d_h:"+d_h);
	//$j("#"+this.id).width(d_w);
	//$j("#"+this.id).height(d_h);
	$j('#'+this.id)[0].style.width = d_w*1 + 'px';
  	$j('#'+this.id)[0].style.height = d_h*1 + 'px';
  	
	this.w = $j("#"+this.id)[0].style.pixelWidth;
	this.h = $j("#"+this.id)[0].style.pixelHeight;	
};
DDObj.prototype.resizeBy = function(d_dw, d_dh)
{
	$j("#"+this.id).width($j("#"+this.id)[0].style.pixelWidth+d_w);
	$j("#"+this.id).height($j("#"+this.id)[0].style.pixelHeight+d_h);
	this.w = $j("#"+this.id)[0].style.pixelWidth;
	this.h = $j("#"+this.id)[0].style.pixelHeight;
};
DDObj.prototype.swapImage = function(src)
{
	$j("#"+this.id).attr("src", src);
};
DDObj.prototype.fetch = function()
{
	this.x = $j("#"+this.id)[0].style.pixelLeft;
	this.y = $j("#"+this.id)[0].style.pixelTop;	
	
	this.w = $j("#"+this.id)[0].style.pixelWidth;
	this.h = $j("#"+this.id)[0].style.pixelHeight;	
};
DDObj.prototype.setBgColor = function(d_x)
{
	$j(this.id).css({'background-color' : d_x});
};
DDObj.prototype.setZ = function(z)
{
	dd.z = Math.max(dd.z, z);
	$j('#'+this.id).css('zIndex',z);
	this.z = $j('#'+this.id).css('zIndex');
};
DDObj.prototype.maximizeZ = function()
{
	dd.z = Math.max(dd.z+1, $j('#'+this.id).css('zIndex'));
	$j('#'+this.id).css('zIndex',dd.z);
	this.z = $j('#'+this.id).css('zIndex');
};
DDObj.prototype._resetZ = function(d_o)
{
	$j('#'+this.id).css('zIndex',this.defz);
	this.z = $j('#'+this.id).css('zIndex');
};
DDObj.prototype.setDraggable = function(d_x)
{
	if(d_x==true){
		$j('#'+this.id).css("cursor","hand");
		$j('#'+this.id).draggable('enable');
   		if (this.id.indexOf("iconer") == 0 || this.id.indexOf("marginer") == 0 || this.id.indexOf("ctext_") == 0 ||
   				this.id.indexOf("imager") == 0) {
			$j('#'+this.id).click(function(){
	   			//$j('#'+this.id).effect("bounce");
	   			dd.obj = dd.elements[this.id];
	   			kphoto.sid = dd.obj.name;
	   			showGrips();
	   		});    		
			$j('#'+this.id).draggable({
				drag: function(event, ui) {
					if(window.icon_DragFunc) icon_DragFunc();
	            },
	   			stop:function(event, ui) {
	   				if(!oBrowser.isIE && this.id.indexOf("ctext_") != 0)
						$j(this).css("opacity", "1");
					dd.obj.fetch();
					dd.obj._resetZ();
					showGrips();
					if(window.icon_DropFunc) icon_DropFunc();
				},start:function(event, ui) {
					dd.obj = dd.elements[this.id];
					if(!oBrowser.isIE && this.id.indexOf("ctext_") != 0)
						$j(this).css("opacity", "0.6");
					if(window.icon_PickFunc) icon_PickFunc();
				}
			});   		
   		}
   		else if (this.id.indexOf("cap_") == 0) {
 			$j('#'+this.id).draggable({
				drag: function(event, ui) {
					dd.obj.fetch();
					if(window.cap_DragFunc) cap_DragFunc();
	            },
	   			stop:function(event, ui) {
	   				if(!oBrowser.isIE)
						$j(this).css("opacity", "1");
					dd.obj.fetch();
					dd.obj._resetZ();
					if(window.cap_DropFunc) cap_DropFunc();
					
				},start:function(event, ui) {
					if(!oBrowser.isIE)
						$j(this).css("opacity", "0.6");
					dd.obj = dd.elements[this.id];
					if(window.cap_PickFunc) cap_PickFunc();
				}
			});  	
   		}
   		else if (this.id.indexOf("cap2_") == 0) {
 			$j('#'+this.id).draggable({
				drag: function(event, ui) {
					dd.obj.fetch();
					if(window.cap2_DragFunc) cap2_DragFunc();
	            },
	   			stop:function(event, ui) {
	   				if(!oBrowser.isIE)
						$j(this).css("opacity", "1");
					dd.obj.fetch();
					//dd.obj._resetZ();
					if(window.cap2_DropFunc) cap2_DropFunc();
					
				},start:function(event, ui) {
					if(!oBrowser.isIE)
						$j(this).css("opacity", "0.6");
					dd.obj = dd.elements[this.id];
					if(window.cap2_PickFunc) cap2_PickFunc();
				}
			});  
   		}
   		else if (this.id.indexOf("cap3_") == 0) {
 			$j('#'+this.id).draggable({
				drag: function(event, ui) {
					dd.obj.fetch();
					if(window.cap3_DragFunc) cap3_DragFunc();
	            },
	   			stop:function(event, ui) {
	   				if(!oBrowser.isIE)
						$j(this).css("opacity", "1");
					dd.obj.fetch();
					//dd.obj._resetZ();
					if(window.cap3_DropFunc) cap3_DropFunc();
					
				},start:function(event, ui) {
					if(!oBrowser.isIE)
						$j(this).css("opacity", "0.6");
					dd.obj = dd.elements[this.id];
					if(window.cap3_PickFunc) cap3_PickFunc();
				}
			});  			
		}else if (this.id.indexOf("yui_img2") == 0) {
			$j('#'+this.id).draggable({
				drag: function(event, ui) {
					if(window.my_DragFunc) my_DragFunc();
	            },
	   			stop:function(event, ui) {
					dd.obj.fetch();
					dd.obj._resetZ();
					if(window.my_DropFunc) yui_DropFunc();
					
				},start:function(event, ui) {
					dd.obj = dd.elements[this.id];
					dd.obj.maximizeZ();
					if(window.my_PickFunc) my_PickFunc();
				}
			});
		}else if (this.id.indexOf("yui_img3") == 0) {
			$j('#'+this.id).draggable({
				drag: function(event, ui) {
					if(window.my_DragFunc) my_DragFunc();
	            },
	   			stop:function(event, ui) {
					dd.obj.fetch();
					dd.obj._resetZ();
					if(window.my_DropFunc) yui3_DropFunc();
					
				},start:function(event, ui) {
					dd.obj = dd.elements[this.id];
					dd.obj.maximizeZ();
					if(window.my_PickFunc) my_PickFunc();
				}
			});			
   		}else {
			$j('#'+this.id).draggable({
				drag: function(event, ui) {
					if(!oBrowser.isIE)
						$j(this).css("opacity", "0.6");
					if(window.my_DragFunc) my_DragFunc();
	            },
	   			stop:function(event, ui) {
	   				if(!oBrowser.isIE)
						$j(this).css("opacity", "1");
					dd.obj.fetch();
					dd.obj._resetZ();
					if(window.my_DropFunc) my_DropFunc();
					
				},start:function(event, ui) {
					dd.obj = dd.elements[this.id];
					dd.obj.maximizeZ();
					if(window.my_PickFunc) my_PickFunc();
				}
			});
		}
	}else{
		$j('#'+this.id).draggable('disable');
	}
	this.nodrag = !d_x*1;
};
DDObj.prototype.del = function()
{
	dd.elements[this.name] = null;
};
DDObj.prototype._free = function()
{
	dd.elements[this.name] = null;
};
dd.reszTo = function(d_w, d_h)
{
	if(dd.n4 && dd.obj.is_image) dd.n4Rect(d_w, d_h);
	else dd.obj.resizeTo(d_w, d_h);
};
function ADD_DHTML()
{
	var d_a = arguments, d_o, d_i = d_a.length; 
	while(d_i)
	{
		d_o = new DDObj(d_a[--d_i]);
		dd.addElement(d_o);
		dd.z = Math.max(dd.z, $j('#'+d_o.id).css('zIndex'));
	}
}
dd.d = document;
function my_PickFunc()
{
}
function my_DragFunc()
{
}
function my_ResizeFunc()
{
}
function my_DropFunc()
{
}
function cap_DragFunc()
{
}
function icon_DragFunc()
{
}
function icon_PickFunc()
{
}
function icon_DropFunc()
{
}
function cap_DropFunc()
{
}
function cap_PickFunc()
{
}
