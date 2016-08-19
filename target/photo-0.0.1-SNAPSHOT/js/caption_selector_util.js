/* sample
var selector = new CaptionSelector("p","cap",5);
selector.add({viewID: 1,viewURI:"http://kker.no-ip.org/01.jpg",caption:""});
selector.add({viewID: 2,viewURI:"http://kker.no-ip.org/02.jpg",caption:""});
selector.add({viewID: 3,viewURI:"http://kker.no-ip.org/03.jpg",caption:""});
selector.add({viewID: 4,viewURI:"http://kker.no-ip.org/04.jpg",caption:""});
selector.add({viewID: 5,viewURI:"http://kker.no-ip.org/05.jpg",caption:""});
selector.add({viewID: 6,viewURI:"http://kker.no-ip.org/06.jpg",caption:""});
selector.add({viewID: 7,viewURI:"http://kker.no-ip.org/07.jpg",caption:""});
selector.add({viewID: 8,viewURI:"http://kker.no-ip.org/08.jpg",caption:""});
selector.add({viewID: 9,viewURI:"http://kker.no-ip.org/09.jpg",caption:""});
//selector.change(0);
selector.find(3);
//selector.next();
//selector.previous();
*/
var CaptionSelector = Class.create();
CaptionSelector.prototype = {
  initialize: function(imgName,captionName,viewSize,unselectBorder,selectBorder) {
  	this.imgName = imgName;
  	this.viewSize = viewSize;
  	this.captionName = captionName;
    this.clickMethod = "";
  	this.nowPage = 0;
    this.totalPage = 0;
    this.list = new Array();
    this.value = 0;
    this.unselectBorder = unselectBorder;
    this.selectBorder = selectBorder;
  },
  add: function(entity) {
    var entity = Object.extend({
      viewID:  0,
      viewURI: "#",
      caption: "",
      designInfo: "#"
    }, entity || {});
    entity.clickMethod = function (){selector_onclick(entity.viewID);};
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
    	editImageSrc3(this.imgName+j,"images/sp.gif");
    	//img.src = "images/sp.gif";
        img.border = 0;
        img.onclick = "";
        $(this.imgName+j).removeClassName(this.selectBorder);
        $(this.imgName+j).addClassName(this.unselectBorder);
    	var cap = $(this.captionName+j);
    	cap.innerHTML = "&nbsp;";
  	}
  	this.nowPage =  Math.floor(index / this.viewSize) ;
  	for (var j= 0 + this.nowPage*this.viewSize; j < this.list.length && j < this.nowPage*this.viewSize+this.viewSize; j++) {
    	var img = $(this.imgName+(j-this.nowPage*this.viewSize));
    	editImageSrc3(this.imgName+(j-this.nowPage*this.viewSize),this.list[j].viewURI);
    	//img.src = this.list[j].viewURI;
    	img.style.visibility = 'visible';
        if(this.value == this.list[j].viewID){
            $(this.imgName+(j-this.nowPage*this.viewSize)).removeClassName(this.unselectBorder);
            $(this.imgName+(j-this.nowPage*this.viewSize)).addClassName(this.selectBorder);
        }
        img.onclick = this.list[j].clickMethod;
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
            editImageSrc3(this.imgName+j,"images/sp.gif");
      	    //img.src = "images/sp.gif";
      	    img.style.visibility = 'hidden';
            img.border = 0;
            img.onclick = "";
            $(this.imgName+j).removeClassName(this.selectBorder);
            $(this.imgName+j).addClassName(this.unselectBorder);
      	    var cap = $(this.captionName+j);
            cap.innerHTML = "&nbsp;";
        }
    	this.nowPage += 1;
        for (var j= 0 + this.nowPage*this.viewSize; j < this.list.length && j <this.nowPage*this.viewSize+this.viewSize; j++) {
	        var img = $(this.imgName+(j-this.nowPage*this.viewSize));
	        editImageSrc3(this.imgName+(j-this.nowPage*this.viewSize),this.list[j].viewURI);
  	        //img.src = this.list[j].viewURI;
    	    img.style.visibility = 'visible';
            if(this.value == this.list[j].viewID){
                $(this.imgName+(j-this.nowPage*this.viewSize)).removeClassName(this.unselectBorder);
                $(this.imgName+(j-this.nowPage*this.viewSize)).addClassName(this.selectBorder);
            }
            img.onclick = this.list[j].clickMethod;
      	    var cap = $(this.captionName+(j-this.nowPage*this.viewSize));
            cap.innerHTML = this.list[j].caption;
        }
  	}
  },
  previous: function() {
  	if(this.nowPage-1 >= 0){
        for (var j=0; j < this.viewSize; j++) {
	        var img = $(this.imgName+j);
	        editImageSrc3(this.imgName+j,"images/sp.gif");
  	        //img.src = "images/sp.gif";
            img.border = 0;
            img.onclick = "";
            $(this.imgName+j).removeClassName(this.selectBorder);
            $(this.imgName+j).addClassName(this.unselectBorder);
    	    img.style.visibility = 'hidden';
	        var cap = $(this.captionName+j);
            cap.innerHTML = "&nbsp;";
        }
    	this.nowPage -= 1;
        for (var j= 0 + this.nowPage*this.viewSize; j < this.list.length && j <this.nowPage*this.viewSize+this.viewSize; j++) {
      	    var img = $(this.imgName+(j-this.nowPage*this.viewSize));
      	    editImageSrc3(this.imgName+(j-this.nowPage*this.viewSize),this.list[j].viewURI);
      	    //img.src = this.list[j].viewURI;
     	 	img.style.visibility = 'visible';
            if(this.value == this.list[j].viewID){
                $(this.imgName+(j-this.nowPage*this.viewSize)).removeClassName(this.unselectBorder);
                $(this.imgName+(j-this.nowPage*this.viewSize)).addClassName(this.selectBorder);
            }
            img.onclick = this.list[j].clickMethod;
     	 	var cap = $(this.captionName+(j-this.nowPage*this.viewSize));
            cap.innerHTML = this.list[j].caption;
        }
  	}
  }
}
