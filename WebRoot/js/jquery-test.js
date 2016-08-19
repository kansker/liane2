(function($){
  $.fn.extend({
    kdialog: function(w,h,title) {
      	//alert('gmaps:'+this.attr('id'));
      	var kdialoger = $.data(this[0], 'kdialoger');
		if ( kdialoger ) {
			//alert('exits');
			return kdialoger;
		}
		kdialoger = new $.kdialoger(this);
		$.data(this[0], 'kdialoger', kdialoger); 
		this.dialog({ width: w, height: h,title: title,modal: true,zIndex:999999999,position: ['center','middle']  ,draggable:true});
		this.dialog('close');
      	return kdialoger;
      	//return this.each(function() {
	  	//		new $.kdialoger(this);
	  	//	});
    },imagerMenu: function() {
	  	this.contextMenu('imagerMenu', {
	      bindings: {
	        'autoZoom': function(t) {
	         	kphoto.autoZoom(t.id);
				showGrips();
	        },
	        'frame': function(t) {
	         	var obj = kphoto.imagerObj(t.id);
			 	kphoto.crop.zoneID = obj.id;
			 	kphoto.crop.seq = obj.viewID;
			 	kphoto.crop.kind = "2";//1:rect  2:imager
			 	showTool(1);
	        },
	        'rotate': function(t) {
	          	var obj = kphoto.imagerObj(t.id);
				kphoto.crop.zoneID = obj.id;//div的id
			 	kphoto.crop.seq = obj.viewID;//pic的流水號 	
			 	kphoto.crop.kind = "2";//1:rect  2:imager
			 	showTool(3);
	        },
	        'free': function(t) {
	          	var obj = kphoto.imagerObj(t.id);
	          	if(kphoto.smap.contains(t.id)==false){
					kphoto.sid = t.id;
					kphoto.smap.removeAll();	
					kphoto.smap.add(t.id);
					showGrips();
	          	}	          	
			 	kphoto.crop.zoneID = obj.id;
			 	kphoto.crop.seq = obj.viewID;
			 	kphoto.crop.kind = "2";//1:rect  2:imager
			 	kphoto.crop.free = 2;
			 	kphoto.crop.multi = 1;//單筆(已修都為多筆)
			 	showTool(4);
	        },
	        'merges': function(t) {
	          	var obj = kphoto.imagerObj(t.id);
	          	if(kphoto.smap.contains(t.id)==false){
					kphoto.sid = t.id;
					kphoto.smap.removeAll();	
					kphoto.smap.add(t.id);
					showGrips();
	          	}	          	
			 	kphoto.crop.zoneID = obj.id;
			 	kphoto.crop.seq = obj.viewID;
			 	kphoto.crop.kind = "2";//1:rect  2:imager
			 	kphoto.crop.multi = 1;//單筆(已修都為多筆)
			 	showTool(6);
	        },
	        'crop': function(t) {
	          	var obj = kphoto.imagerObj(t.id);
			 	kphoto.crop.zoneID = obj.id;
			 	kphoto.crop.seq = obj.viewID;
			 	kphoto.crop.kind = "2";//1:rect  2:imager
			 	kphoto.crop.free = 0;
			 	showTool(2);
	        },
	        'size': function(t) {
	          	var obj = kphoto.imagerObj(t.id);
	          	if(kphoto.smap.contains(t.id)==false){
					kphoto.sid = t.id;
					kphoto.smap.removeAll();	
					kphoto.smap.add(t.id);
					showGrips();
	          	}
				kphoto.crop.zoneID = obj.id;//div的id
			 	kphoto.crop.seq = obj.viewID;//pic的流水號 	
			 	kphoto.crop.kind = "2";//1:rect  2:imager
			 	showTool(5);
	        },
	        'recover': function(t) {
	         	var obj = kphoto.imagerObj(t.id);
				kphoto.crop.zoneID = obj.id;//div的id
			 	kphoto.crop.seq = obj.viewID;//pic的流水號 	
			 	kphoto.crop.kind = "2";
			 	goRecover();
	        },
	        'del': function(t) {
	          	var obj = kphoto.obj(t.id);
		    	var viewID = obj.viewID;
		    	kphoto.delImager(t.id);
		    	kphoto.setAlbumSourceUsed(viewID,false);
		    	kphoto.chooseAlbum($('#nowCategory').val());
				setTimeout("kphoto.showAlbum()", 10);
		      	hideGrips();
	        }
	      }
	    });
    },iconMenu: function() {
	  	this.contextMenu('iconMenu', {
	      bindings: {
	        'autoZoom': function(t) {
	          	;
				kphoto.autoZoom(t.id);
				showGrips();
	        },
	        'del': function(t) {
	        	if (t.id.indexOf("iconer") == 0) {
					kphoto.delIconer(t.id);
				}else if (t.id.indexOf("marginer") == 0) {
					kphoto.delMarginer(t.id);
				}else if (t.id.indexOf("ctext") == 0) {
					kphoto.delText(t.id);
				}
				hideGrips()
	        }
	      }
	    });
    },ctextMenu: function() {
	  	this.contextMenu('ctextMenu', {
	      bindings: {
	        'setup': function(t) {
	        	kphoto.sid = t.id;
				kphoto.smap.removeAll();	
				kphoto.smap.add(t.id);
				showGrips();
	         	showToolsPanels(3);
				showTextTool(1,t.id);
	        },
	        'del': function(t) {
				kphoto.delText(t.id);
				hideGrips();
	        }
	      }
	    });
    },rectMenu: function() {
	  	this.contextMenu('rectMenu', {
	      bindings: {
	        'del': function(t) {
				kphoto.picRemove(t.id);
	        }
	      }
	    });
	},showD: function() {
		this.dialog('open'); 
		$(".ui-dialog-titlebar").show();
	},hideD: function() {
		this.dialog('close'); 
	}
  });
  
  $.kdialoger = function(input) {
	  var $input = $(input);
	  /*
	  $input.click(function() {
		clicker();
	  });
	  tester();
	  function tester() {
		  alert('test');
	  }
	  function clicker() {
		  alert('click');
		  $.kdialoger.cache(123);
		  $input.result();
	  }*/
	  function tester() {
		  alert('tester');
	  }
  };
  /*
  $.kdialoger.cache = function(zindex) {
	  alert(zindex);
  };*/
})(jQuery);