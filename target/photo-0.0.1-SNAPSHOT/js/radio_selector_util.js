var RadioSelector = Class.create();
RadioSelector.prototype = {
  initialize: function(imgName,captionName,radioName,viewSize) {
  	this.imgName = imgName;
  	this.viewSize = viewSize;
  	this.captionName = captionName;
    this.radioName = radioName;
    this.clickMethod = "";
    this.rclickMethod = "";
  	this.nowPage = 0;
    this.totalPage = 0;
    this.list = new Array();
    this.value = 0;
  },
  add: function(entity) {
    var entity = Object.extend({
      viewID:  0,
      viewURI: "#",
      caption: "",
      designInfo: "#"
    }, entity || {});
    entity.clickMethod = function (){selector_onclick(entity.viewID);};
    entity.rclickMethod = function (){radio_onclick(entity.viewID);};
    this.list[this.list.length]= entity;
    this.totalPage = Math.round(this.list.length /this.viewSize);
    if(this.totalPage*this.viewSize < this.list.length){
  		this.totalPage +=1;
    }
  },
  clear: function() {
    this.list = new Array();
  },
  get: function() {
    for (var j= 0; j < this.list.length; j++) {
        if(this.list[j].viewID == this.value){
            return this.list[j];
        }
    }
    return null;
  },
  change: function(index) {
  	for (var j=0; j < this.viewSize; j++) {
    	var img = $(this.imgName+j);
    	img.src = "images/sp.gif";
        img.border = 0;
        img.onclick = "";

        var rd = $(this.radioName+j);
        rd.value =  0;
        rd.onclick = "";
        rd.checked = false;
        rd.style.visibility = 'hidden';
    	var cap = $(this.captionName+j);
    	cap.innerHTML = "&nbsp;";
  	}
  	this.nowPage =  Math.floor(index / this.viewSize) ;
  	for (var j= 0 + this.nowPage*this.viewSize; j < this.list.length && j < this.nowPage*this.viewSize+this.viewSize; j++) {
    	var img = $(this.imgName+(j-this.nowPage*this.viewSize));
    	img.src = this.list[j].viewURI;
    	img.style.visibility = 'visible';
        img.onclick = this.list[j].clickMethod;
        var rd = $(this.radioName+(j-this.nowPage*this.viewSize));
        rd.value =  this.list[j].viewID;
        rd.onclick = this.list[j].rclickMethod;
        rd.style.visibility = 'visible';
        if(this.value == this.list[j].viewID){
            rd.checked = true;
        }
    	var cap = $(this.captionName+(j-this.nowPage*this.viewSize));
        cap.innerHTML = this.list[j].caption;
  	}
  },
  find: function(value) {
		var index = 0;
		for (var j=0; j < this.list.length; j++) {
  		    if(this.list[j].viewID==value){
  			    this.value = value;
    		    index = j;
    		    break;
  		    }
		}
        if(index==0 && this.list.length>0){
            this.value = this.list[0].viewID;
        }
		this.change(index);
  },
  next: function() {
  	if(this.nowPage+1 < this.totalPage){
        for (var j=0; j < this.viewSize; j++) {
            var img = $(this.imgName+j);
      	    img.src = "images/sp.gif";
      	    img.style.visibility = 'hidden';
            img.border = 0;
            img.onclick = "";
            var rd = $(this.radioName+j);
            rd.value =  0;
            rd.onclick = "";
            rd.checked = false;
            rd.style.visibility = 'hidden';
      	    var cap = $(this.captionName+j);
            cap.innerHTML = "&nbsp;";
        }
    	this.nowPage += 1;
        for (var j= 0 + this.nowPage*this.viewSize; j < this.list.length && j <this.nowPage*this.viewSize+this.viewSize; j++) {
	        var img = $(this.imgName+(j-this.nowPage*this.viewSize));
  	        img.src = this.list[j].viewURI;
    	    img.style.visibility = 'visible';

            img.onclick = this.list[j].clickMethod;

            var rd = $(this.radioName+(j-this.nowPage*this.viewSize));
            rd.value =  this.list[j].viewID;
            rd.onclick = this.list[j].rclickMethod;
            rd.style.visibility = 'visible';
            if(this.value == this.list[j].viewID){
                rd.checked = true;
            }
      	    var cap = $(this.captionName+(j-this.nowPage*this.viewSize));
            cap.innerHTML = this.list[j].caption;
        }
  	}
  },
  previous: function() {
  	if(this.nowPage-1 >= 0){
        for (var j=0; j < this.viewSize; j++) {
	        var img = $(this.imgName+j);
  	        img.src = "images/sp.gif";
            img.border = 0;
            img.onclick = "";

            var rd = $(this.radioName+j);
            rd.value =  0;
            rd.onclick = "";
            rd.checked = false;
            rd.style.visibility = 'hidden';
    	    img.style.visibility = 'hidden';
	        var cap = $(this.captionName+j);
            cap.innerHTML = "&nbsp;";
        }
    	this.nowPage -= 1;
        for (var j= 0 + this.nowPage*this.viewSize; j < this.list.length && j <this.nowPage*this.viewSize+this.viewSize; j++) {
      	    var img = $(this.imgName+(j-this.nowPage*this.viewSize));
      	    img.src = this.list[j].viewURI;
     	 	img.style.visibility = 'visible';

            img.onclick = this.list[j].clickMethod;

            var rd = $(this.radioName+(j-this.nowPage*this.viewSize));
            rd.value =  this.list[j].viewID;
            rd.onclick = this.list[j].rclickMethod;
            rd.style.visibility = 'visible';
            if(this.value == this.list[j].viewID){
                rd.checked = true;
            }
     	 	var cap = $(this.captionName+(j-this.nowPage*this.viewSize));
            cap.innerHTML = this.list[j].caption;
        }
  	}
  }
}
