/* sample
var selector = new ViewSelector("p","cap",5);
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
var ViewSelector = Class.create();
ViewSelector.prototype = {
  initialize: function(imgName,viewSize) {
  	this.imgName = imgName;
  	this.viewSize = viewSize;
  	this.nowPage = 0;
    this.totalPage = 0;
    this.list = new Array();
  },
  add: function(entity) {
    var entity = Object.extend({
      viewID:  0,
      viewURI: "#"
    }, entity || {});
    this.list[this.list.length]= entity;
    this.totalPage = Math.round(this.list.length /this.viewSize);
    if(this.totalPage*this.viewSize < this.list.length){
  		this.totalPage +=1;
    }
  },
  clear: function() {
    this.list = new Array();
  },
  change: function(index) {
  	for (var j=0; j < this.viewSize; j++) {
    	var img = $(this.imgName+j);
    	img.src = "images/sp.gif";
        img.border = 0;
  	}
  	this.nowPage =  Math.floor(index / this.viewSize) ;
  	for (var j= 0 + this.nowPage*this.viewSize; j < this.list.length && j < this.nowPage*this.viewSize+this.viewSize; j++) {
    	var img = $(this.imgName+(j-this.nowPage*this.viewSize));
    	img.src = this.list[j].viewURI;
    	img.style.visibility = 'visible';
  	}
  },
  next: function() {
  	if(this.nowPage+1 < this.totalPage){
        for (var j=0; j < this.viewSize; j++) {
            var img = $(this.imgName+j);
      	    img.src = "images/sp.gif";
      	    img.style.visibility = 'hidden';
            img.border = 0;
        }
    	this.nowPage += 1;
        for (var j= 0 + this.nowPage*this.viewSize; j < this.list.length && j <this.nowPage*this.viewSize+this.viewSize; j++) {
	        var img = $(this.imgName+(j-this.nowPage*this.viewSize));
  	        img.src = this.list[j].viewURI;
    	    img.style.visibility = 'visible';
        }
  	}
  },
  previous: function() {
  	if(this.nowPage-1 >= 0){
        for (var j=0; j < this.viewSize; j++) {
	        var img = $(this.imgName+j);
  	        img.src = "images/sp.gif";
            img.border = 0;
    	    img.style.visibility = 'hidden';
        }
    	this.nowPage -= 1;
        for (var j= 0 + this.nowPage*this.viewSize; j < this.list.length && j <this.nowPage*this.viewSize+this.viewSize; j++) {
      	    var img = $(this.imgName+(j-this.nowPage*this.viewSize));
      	    img.src = this.list[j].viewURI;
     	 	img.style.visibility = 'visible';
        }
  	}
  }
}
