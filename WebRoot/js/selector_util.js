/* sample a
var selector = new Selector("p","rd",5);
selector.add({viewID: 1,viewURI:"http://kker.no-ip.org/01.jpg"});
selector.add({viewID: 2,viewURI:"http://kker.no-ip.org/02.jpg"});
selector.add({viewID: 3,viewURI:"http://kker.no-ip.org/03.jpg"});
selector.add({viewID: 4,viewURI:"http://kker.no-ip.org/04.jpg"});
selector.add({viewID: 5,viewURI:"http://kker.no-ip.org/05.jpg"});
selector.add({viewID: 6,viewURI:"http://kker.no-ip.org/06.jpg"});
selector.add({viewID: 7,viewURI:"http://kker.no-ip.org/07.jpg"});
selector.add({viewID: 8,viewURI:"http://kker.no-ip.org/08.jpg"});
selector.add({viewID: 9,viewURI:"http://kker.no-ip.org/09.jpg"});
//selector.change(0);
selector.find(3);
//selector.next();
//selector.previous();
*/
var Selector = Class.create();
Selector.prototype = {
  initialize: function(imgName,rdName,viewSize) {
  	this.imgName = imgName;
  	this.viewSize = viewSize;
  	this.rdName = rdName;
  	this.nowPage = 0;
    this.totalPage = 0;
    this.list = new Array();
    this.value = 0;
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
  change: function(index) {
  	for (var j=0; j < this.viewSize; j++) {
    	var img = $(this.imgName+j);
    	editImageSrc3(this.imgName+j,"images/sp.gif");
    	//img.src = "images/sp.gif";
    	var rd = $(this.rdName+j);
    	rd.style.visibility = 'hidden';
    	rd.checked=false;
    	rd.value = 0;
  	}

  	this.nowPage =  Math.floor(index / this.viewSize) ;
  	for (var j= 0 + this.nowPage*this.viewSize; j < this.list.length && j < this.nowPage*this.viewSize+this.viewSize; j++) {
    	var img = $(this.imgName+(j-this.nowPage*this.viewSize));
    	editImageSrc3(this.imgName+(j-this.nowPage*this.viewSize),this.list[j].viewURI);
    	//alert(this.list[j].viewURI);
    	//img.src = this.list[j].viewURI;
    	img.style.visibility = 'visible';

    	var rd = $(this.rdName+(j-this.nowPage*this.viewSize));
    	rd.style.visibility = 'visible';
    	rd.value= this.list[j].viewID;
    	if(rd.value == this.value){
      	rd.checked = true;
    	}
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
      	    var rd = $(this.rdName+j);
      	    rd.style.visibility = 'hidden';
      	    rd.checked=false;
      	    rd.value= 0;
        }
    	this.nowPage += 1;
        for (var j= 0 + this.nowPage*this.viewSize; j < this.list.length && j <this.nowPage*this.viewSize+this.viewSize; j++) {
	        var img = $(this.imgName+(j-this.nowPage*this.viewSize));
	        editImageSrc3(this.imgName+(j-this.nowPage*this.viewSize),this.list[j].viewURI);
  	        //img.src = this.list[j].viewURI;
    	    img.style.visibility = 'visible';

      	    var rd = $(this.rdName+(j-this.nowPage*this.viewSize));
      	    rd.style.visibility = 'visible';
      	    rd.value= this.list[j].viewID;
      	    if(rd.value == this.value){
        	    rd.checked = true;
      	    }
        }
  	}
  },
  previous: function() {
  	if(this.nowPage-1 >= 0){
        for (var j=0; j < this.viewSize; j++) {
	        var img = $(this.imgName+j);
	        editImageSrc3(this.imgName+j,"images/sp.gif");
  	        //img.src = "images/sp.gif";
    	    img.style.visibility = 'hidden';
	        var rd = $(this.rdName+j);
  	        rd.style.visibility = 'hidden';
    	    rd.checked=false;
      	    rd.value= 0;
        }
    	this.nowPage -= 1;
        for (var j= 0 + this.nowPage*this.viewSize; j < this.list.length && j <this.nowPage*this.viewSize+this.viewSize; j++) {
      	    var img = $(this.imgName+(j-this.nowPage*this.viewSize));
      	    editImageSrc3(this.imgName+(j-this.nowPage*this.viewSize),this.list[j].viewURI);
      	    //img.src = this.list[j].viewURI;
     	 	img.style.visibility = 'visible';
     	 	var rd = $(this.rdName+(j-this.nowPage*this.viewSize));
      	    rd.style.visibility = 'visible';
      	    rd.value= this.list[j].viewID;
      	    if(rd.value == this.value){
        	    rd.checked = true;
      	    }
        }
  	}
  },
  show: function() {
        for (var j=0; j < this.viewSize; j++) {
	        var img = $(this.imgName+j);
	        editImageSrc3(this.imgName+j,"images/sp.gif");
  	        //img.src = "images/sp.gif";
    	    img.style.visibility = 'hidden';
	        var rd = $(this.rdName+j);
  	        rd.style.visibility = 'hidden';
    	    rd.checked=false;
      	    rd.value= 0;
        }
        for (var j= 0 + this.nowPage*this.viewSize; j < this.list.length && j <this.nowPage*this.viewSize+this.viewSize; j++) {
      	    var img = $(this.imgName+(j-this.nowPage*this.viewSize));
      	    editImageSrc3(this.imgName+(j-this.nowPage*this.viewSize),this.list[j].viewURI);
      	    //img.src = this.list[j].viewURI;
     	 	img.style.visibility = 'visible';
     	 	var rd = $(this.rdName+(j-this.nowPage*this.viewSize));
      	    rd.style.visibility = 'visible';
      	    rd.value= this.list[j].viewID;
      	    if(rd.value == this.value){
        	    rd.checked = true;
      	    }
        }
  }  
}
