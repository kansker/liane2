var lockTime = 800;
function showWait() {
	$j("#plWait").dialog({
				width : 400,
				height : 220,
				modal : true,
				zIndex : 999999999,
				position : ['center', 'middle'],
				draggable : false
			});
	$j("#plWait").dialog('open');
	$j(".ui-dialog-titlebar").hide();
}
function hideWait() {
	$j("#plWait").dialog('close');
}

function View(color) { // preview color
	if (color == "") {
		document.getElementById("ColorPreview").style.backgroundColor = '#ffffff';
		document.getElementById("fontColor").value = '透明';
	} else {
		if (color.indexOf("#") == 0) {
			//document.getElementById("ColorPreview").style.backgroundColor = color;
			$j('#ColorPreview').css({"background-color":color});
			document.getElementById("fontColor").value = color;
		} else {
			//document.getElementById("ColorPreview").style.backgroundColor = '#'+ color;
			$j('#ColorPreview').css({"background-color": "#"+ color});
			document.getElementById("fontColor").value = "#" + color;
		}
	}
}

function Set(color) { // select color
	// var color = ValidateColor(string);
	View(color); // show selected color
}

function View2(color) { // preview color
	if (color == "") {
		document.getElementById("ColorPreview2").style.backgroundColor = '#ffffff';
		document.getElementById("framecolor").value = '透明';
	} else {
		if (color.indexOf("#") == 0) {
			//document.getElementById("ColorPreview2").style.backgroundColor = color;
			$j('#ColorPreview2').css({"background-color":color});
			document.getElementById("framecolor").value = color;
		} else {
			//document.getElementById("ColorPreview2").style.backgroundColor = color;
			$j('#ColorPreview2').css({"background-color":"#"+color});
			document.getElementById("framecolor").value = color;
		}
	}
}

function Set2(color) { // select color
	// var color = ValidateColor(string);
	View2(color); // show selected color
}

function View3(color) { // preview color
/*	if (color == "") {
		document.getElementById("ColorPreview3").style.backgroundColor = '#ffffff';
		document.getElementById("revFrameColor").value = '透明';
	} else {
		if (color.indexOf("#") == 0) {
			$j('#ColorPreview3').css('background-color',color);
			document.getElementById("ColorPreview3").style.backgroundColor = color;
			document.getElementById("revFrameColor").value = color;
		} else {
			document.getElementById("ColorPreview3").style.backgroundColor = color;
			document.getElementById("revFrameColor").value = color;
		}
	}*/
}

function Set3(color) { // select color
	if (color == "") {
		document.getElementById("ColorPreview3").style.backgroundColor = '#ffffff';
		document.getElementById("revFrameColor").value = '透明';
	} else {
		if (color.indexOf("#") == 0) {
			$j('#ColorPreview3').css({"background-color":color});
			//document.getElementById("ColorPreview3").style.backgroundColor = color;
			document.getElementById("revFrameColor").value = color;
		} else {
			$j('#ColorPreview3').css({"background-color":"#"+color});
			//document.getElementById("ColorPreview3").style.backgroundColor = color;
			document.getElementById("revFrameColor").value = color;
		}
	}
}
function setMask(revMask) {
	$j('#maskType' + kphoto.crop.revMask)
			.css('border', 'solid transparent 2px');
	kphoto.crop.revMask = revMask;
	$j('#maskType' + kphoto.crop.revMask).css('border', 'solid red 2px');
}
function select_color(formName, fieldName, initValue) {
	$j('#colorPanel').load('select_color.ko', {
					method : 'detail',
					r : getAjaxRandom()
				}, function() {
					$j("#colorPanel").dialog({
								width : 780,
								height : 460,
								modal : false,
								zIndex : 99999999,
								//hide : 'slide',
								position : ['left', 'top'],
								//show : 'slide',
								draggable : true,
								title : '選擇顏色'
							});
					$j("#colorPanel").dialog('open');
					$j(".ui-dialog-titlebar").show();
				});
}
function ViewBorder(color) {                  // preview color
  if(color==""){
    document.getElementById("BorderColorPreview").style.backgroundColor = '#ffffff';
    document.getElementById("BorderColorHex").value = '透明';
  }else{
    document.getElementById("BorderColorPreview").style.backgroundColor = '#' + color;
    document.getElementById("BorderColorHex").value = '#' + color;
  }
}

function SetBorder(color) {
	if (color) {
		eval("setBorder('#" + color + "')");
	} else {
		eval("setBorder('transparent')");
	}
  	ViewBorder(color); 
  	$j('#colorPanel').dialog('close');
}

function ValidateColor(string) {                // return valid color code
  string = string || '';
  string = string + "";
  string = string.toUpperCase();
  var chars = '0123456789ABCDEF';
  var out   = '';

  for (var i=0; i<string.length; i++) {             // remove invalid color chars
    var schar = string.charAt(i);
    if (chars.indexOf(schar) != -1) { out += schar; }
  }

  if (out.length != 6) { return null; }            // check length
  return out;
}

function unlock() {
	lock = 0;
}

function centerWindow(theURL, winName, width, height, features) {
	var window_width = width;
	var window_height = height;
	var edfeatures = features;
	var window_top = (screen.height - window_height) / 2;
	var window_left = (screen.width - window_width) / 2;
	newWindow = window
			.open('' + theURL + '', '' + winName + '', 'width=' + window_width
							+ ',height=' + window_height + ',top=' + window_top
							+ ',left=' + window_left + ',' + features + '');
	newWindow.focus();
}

// -------------------------------------------------------------------------------------------------------------------------------------------
function showGrips() {
	if (kphoto.mainer() == null)
		return;
	moveGripsToCorners();
	var i = 4;
	while (i--) {
		grips[i].setZ(kphoto.zindexer.get("grip") + i);
		grips[i].show();
	}
}

function hideGrips() {
	var i = 4;
	while (i--) {
		grips[i].hide();
	}

}
function moveGripsToCorners() {
	var mainer = kphoto.mainer();
	lt.moveTo(mainer.x - lt.w / 2, mainer.y - lt.h / 2);
	rt.moveTo(mainer.x + mainer.w - lt.w / 2, mainer.y - lt.h / 2);
	rb.moveTo(mainer.x + mainer.w - lt.w / 2, mainer.y + mainer.h - lt.h / 2);
	lb.moveTo(mainer.x - lt.w / 2, mainer.y + mainer.h - lt.h / 2);
}
function showGrips4Crop() {
	var mainer = dd.elements["yui_img2"];
	if (mainer == null)
		return;
	moveGripsToCrop();
	var i = 4;
	while (i--) {
		grips2[i].setZ(kphoto.zindexer.get("grip") + i);
		grips2[i].show();
	}
}
function hideGrips4Crop() {
	var i = 4;
	while (i--) {
		grips2[i].hide();
	}

}
function moveGripsToCrop() {
	var mainer = dd.elements["yui_img2"];
	mainer.fetch();
	lt2.moveTo(mainer.x - lt.w / 2, mainer.y - lt.h / 2);
	rt2.moveTo(mainer.x + mainer.w - lt.w / 2, mainer.y - lt.h / 2);
	rb2.moveTo(mainer.x + mainer.w - lt.w / 2, mainer.y + mainer.h - lt.h / 2);
	lb2.moveTo(mainer.x - lt.w / 2, mainer.y + mainer.h - lt.h / 2);
}

function showGrips4Crop3() {
	var mainer = dd.elements["yui_img3"];
	if (mainer == null)
		return;
	moveGripsToCrop3();
	var i = 4;
	while (i--) {
		grips3[i].setZ(kphoto.zindexer.get("grip") + i);
		grips3[i].show();
	}
}
function hideGrips4Crop3() {
	var i = 4;
	while (i--) {
		grips3[i].hide();
	}

}
function moveGripsToCrop3() {
	var mainer = dd.elements["yui_img3"];
	mainer.fetch();
	lt3.moveTo(mainer.x - lt.w / 2, mainer.y - lt.h / 2);
	rt3.moveTo(mainer.x + mainer.w - lt.w / 2, mainer.y - lt.h / 2);
	rb3.moveTo(mainer.x + mainer.w - lt.w / 2, mainer.y + mainer.h - lt.h / 2);
	lb3.moveTo(mainer.x - lt.w / 2, mainer.y + mainer.h - lt.h / 2);
}
// -------------------------------------------------------------------------------------------------------------------------------------------
function showCropper() {
	if (cropper != null) {
		cropper.remove();
	}
	if (kphoto.crop.zoneID.indexOf("imager_") == 0
			&& $('crop1').checked == false && $('crop2').checked == false
			&& $('crop3').checked == false && $('crop4').checked == false) {
			$('crop1').checked = true;
	}
	$j('#yui_img2').hide();
	$j('#yui_img3').hide();
	$j('#yui_imgDiv').show();
	$j('#yui_img').show();
	hideGrips4Crop();
	hideGrips4Crop3();
	if ($('crop1').checked) {
		var mw = 0;
		var mh = 0;
		if ($('yui_img').width * 1 > $('yui_img').height * 1) {
			mw = $('yui_img').height * 1 * 4 / 3;
			if (mw > $('yui_img').width * 1) {
				mw = $('yui_img').width * 1;
				mh = 3 * $('yui_img').height / 4;
			} else {
				mh = $('yui_img').height * 1;
			}
		} else {
			mh = $('yui_img').width * 1 * 3 / 4;
			if (mh > $('yui_img').height * 1) {
				mh = $('yui_img').height * 1;
				mw = 4 * $('yui_img').width / 3;
			} else {
				mw = $('yui_img').width * 1;
			}
		}
		if (oBrowser.isIE) {
			$j('#yui_img3').show();
			var mainer = dd.elements["yui_img3"];
			var x = $j('#yui_img')[0].style.pixelLeft * 1;
			var y = $j('#yui_img')[0].style.pixelTop * 1;
			var w = $j('#yui_img').width() * 1;
			var h = $j('#yui_img').height() * 1;
			mainer.resizeTo(w, h);
			mainer.moveTo(x, y);

			mainer.fetch();

			kphoto.crop.x1 = mainer.x;
			kphoto.crop.x2 = kphoto.crop.x1 + mainer.w;
			kphoto.crop.y1 = mainer.y;
			kphoto.crop.y2 = kphoto.crop.y1 + mainer.h;
			kphoto.crop.w = mainer.w;
			kphoto.crop.h = mainer.h;
			kphoto.crop.ratioDimW = mw;
			kphoto.crop.ratioDimH = mh;
			autoZoom3();
			showGrips4Crop3();
		} else {
			cropper = new Cropper.Img('yui_img', {
						ratioDim : {
							x : mw,
							y : mh
						},
						minWidth : 40,
						minHeight : 30,
						onEndCrop : onEndCrop,
						displayOnInit : true
					});
		}
	} else if ($('crop2').checked) {
		var mw = 0;
		var mh = 0;
		if ($('yui_img').width * 1 > $('yui_img').height * 1) {
			mw = $('yui_img').height * 1 * 3 / 4;
			if (mw > $('yui_img').width * 1) {
				mw = $('yui_img').width * 1;
				mh = 4 * $('yui_img').height / 3;
			} else {
				mh = $('yui_img').height * 1;
			}
		} else {
			mh = $('yui_img').width * 1 * 4 / 3;
			if (mh > $('yui_img').height * 1) {
				mh = $('yui_img').height * 1;
				mw = 3 * $('yui_img').width / 4;
			} else {
				mw = $('yui_img').width * 1;
			}
		}
		if (oBrowser.isIE) {
			$j('#yui_img3').show();
			var mainer = dd.elements["yui_img3"];
			var x = $j('#yui_img')[0].style.pixelLeft * 1;
			var y = $j('#yui_img')[0].style.pixelTop * 1;
			var w = $j('#yui_img').width() * 1;
			var h = $j('#yui_img').height() * 1;
			mainer.resizeTo(w, h);
			mainer.moveTo(x, y);

			mainer.fetch();
			kphoto.crop.x1 = mainer.x;
			kphoto.crop.x2 = kphoto.crop.x1 + mainer.w;
			kphoto.crop.y1 = mainer.y;
			kphoto.crop.y2 = kphoto.crop.y1 + mainer.h;
			kphoto.crop.w = mainer.w;
			kphoto.crop.h = mainer.h;
			kphoto.crop.ratioDimW = mw;
			kphoto.crop.ratioDimH = mh;
			autoZoom3();
			showGrips4Crop3();
		} else {
			cropper = new Cropper.Img('yui_img', {
						ratioDim : {
							x : mw,
							y : mh
						},
						minWidth : 30,
						minHeight : 40,
						onEndCrop : onEndCrop,
						displayOnInit : true
					});
		}
	} else if ($('crop3').checked) {
		if (oBrowser.isIE) {
			$j('#yui_img3').show();
			var mainer = dd.elements["yui_img3"];
			var x = $j('#yui_img')[0].style.pixelLeft * 1;
			var y = $j('#yui_img')[0].style.pixelTop * 1;
			var w = $j('#yui_img').width() * 1;
			var h = $j('#yui_img').height() * 1;
			mainer.resizeTo(w, h);
			mainer.moveTo(x, y);

			mainer.fetch();
			kphoto.crop.x1 = mainer.x;
			kphoto.crop.x2 = kphoto.crop.x1 + mainer.w;
			kphoto.crop.y1 = mainer.y;
			kphoto.crop.y2 = kphoto.crop.y1 + mainer.h;
			kphoto.crop.w = mainer.w;
			kphoto.crop.h = mainer.h;
			kphoto.crop.ratioDimW = 0;
			kphoto.crop.ratioDimH = 0;
			showGrips4Crop3();
		} else {
			cropper = new Cropper.Img('yui_img', {
						maxWidth : $('yui_img').width * 1,
						maxHeight : $('yui_img').height * 1,
						minWidth : 50,
						minHeight : 50,
						onEndCrop : onEndCrop,
						displayOnInit : true
					});
		}
	} else if ($('crop4').checked) {
		var mw = 0;
		var mh = 0;
		if ($('yui_img').width * 1 > $('yui_img').height * 1) {
			mw = $('yui_img').height * 1;
			if (mw > $('yui_img').width * 1) {
				mw = $('yui_img').width * 1;
				mh = 1 * $('yui_img').height ;
			} else {
				mh = $('yui_img').height * 1;
			}
		} else {
			mh = $('yui_img').width * 1 ;
			if (mh > $('yui_img').height * 1) {
				mh = $('yui_img').height * 1;
				mw = 1 * $('yui_img').width ;
			} else {
				mw = $('yui_img').width * 1;
			}
		}
		if (oBrowser.isIE) {
			$j('#yui_img3').show();
			var mainer = dd.elements["yui_img3"];
			var x = $j('#yui_img')[0].style.pixelLeft * 1;
			var y = $j('#yui_img')[0].style.pixelTop * 1;
			var w = $j('#yui_img').width() * 1;
			var h = $j('#yui_img').height() * 1;
			mainer.resizeTo(w, h);
			mainer.moveTo(x, y);

			mainer.fetch();
			kphoto.crop.x1 = mainer.x;
			kphoto.crop.x2 = kphoto.crop.x1 + mainer.w;
			kphoto.crop.y1 = mainer.y;
			kphoto.crop.y2 = kphoto.crop.y1 + mainer.h;
			kphoto.crop.w = mainer.w;
			kphoto.crop.h = mainer.h;
			kphoto.crop.ratioDimW = mw;
			kphoto.crop.ratioDimH = mh;
			autoZoom3();
			showGrips4Crop3();
		} else {
			cropper = new Cropper.Img('yui_img', {
						ratioDim : {
							x : mw,
							y : mh
						},
						minWidth : 50,
						minHeight : 50,
						onEndCrop : onEndCrop,
						displayOnInit : true
					});
		}
	}
	// else if($('crop4')!=null && $('crop4').checked)
	// {
	// $j('#yui_img2').show();
	// var mainer = dd.elements["yui_img2"];
	// var x = $j('#yui_img')[0].style.pixelLeft*1;
	// var y = $j('#yui_img')[0].style.pixelTop*1;
	// var w = $j('#yui_img').width()*1;
	// var h = $j('#yui_img').height()*1;
	// mainer.resizeTo(w,h);
	// mainer.moveTo(x,y);
	//   		
	// mainer.fetch();
	// kphoto.crop.x1 = mainer.x;
	// kphoto.crop.x2 = kphoto.crop.x1 + mainer.w;
	// kphoto.crop.y1 = mainer.y;
	// kphoto.crop.y2 = kphoto.crop.y1 + mainer.h;
	// kphoto.crop.w = mainer.w;
	// kphoto.crop.h = mainer.h;
	// kphoto.crop.free = 1;
	// showGrips4Crop();
	// }
	else {
		if (kphoto.crop.zoneID.indexOf("imager_") != 0) {
			var mw = 0;
			var mh = 0;
			var dropZone = dzObj(kphoto.crop.zoneID);
			var alobj = kphoto.albumSourceObj(dropZone.viewID);
			if (dropZone.width * 1 > dropZone.height * 1) {
				var r1 = alobj.w / dropZone.width;
				mw = alobj.w;
				mh = r1 * dropZone.height;
			} else {
				var r1 = alobj.h / dropZone.height;
				mh = alobj.h;
				mw = r1 * dropZone.width;
			}
			cropper = new Cropper.Img('yui_img', {
						ratioDim : {
							x : mw,
							y : mh
						},
						onEndCrop : onEndCrop,
						displayOnInit : true
					});
		}
	}
}

var fTextTool = false;
function showTextTool(old, cid) {
	if (fTextTool == false) {
		showWait();
		$j('#textPanel').load('edit_step_ctext.ko', {
					method : 'detail',
					r : getAjaxRandom()
				}, function() {
					initTypeSelector();
					$j("#textPanel").dialog({
								width : 700,
								height : 460,
								modal : false,
								zIndex : 99999999,
								//hide : 'slide',
								position : ['left', 'top'],
								//show : 'slide',
								draggable : true
							});
					$j("#textPanel").dialog('open');
					$j(".ui-dialog-titlebar").hide();
					if (old == 1) {
						// 若是作文字更新,帶入資料
						var ctext = kphoto.textObj(cid);
						$('addWord').value = ctext.text;
						$('fontSize').value = ctext.fontSize;
						$('fontColor').value = ctext.fontColor;
						typeSelector.find(ctext.fontName);
						View($('fontColor').value);
						$('ctextMethod').value = "setup";
						kphoto.nowCtext = ctext;
						$j('#plTextPos').show();
						if(ctext.pos==0){
							$('textPos0').checked = true;
							$('textPos1').checked = false;
						}else{
							$('textPos0').checked = false;
							$('textPos1').checked = true;
						}
						$j('#plTextPos2').hide();
						/*
						if(ctext.pos==0){
							$j('#plTextPos2').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;左頁');
						}else{
							$j('#plTextPos2').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;右頁');
						}*/
					}else{
						$j('#plTextPos').show();
						$j('#plTextPos2').html('');
					}
					fTextTool = true;
					hideWait();
				});
	} else {
		$j("#textPanel").dialog({
					width : 610,
					height : 460,
					modal : false,
					zIndex : 99999999,
					//hide : 'slide',
					position : ['left', 'top'],
					//show : 'slide',
					draggable : true
				});
		$j("#textPanel").dialog('open');
		$j(".ui-dialog-titlebar").hide();
		if (old == 1) {
			var ctext = kphoto.textObj(cid);
			$('addWord').value = ctext.text;
			$('fontSize').value = ctext.fontSize;
			$('fontColor').value = ctext.fontColor;
			typeSelector.find(ctext.fontName);
			View($('fontColor').value);
			$('ctextMethod').value = "setup";
			kphoto.nowCtext = ctext;
			$j('#plTextPos').show();
			if(ctext.pos==0){
				$('textPos0').checked = true;
				$('textPos1').checked = false;
			}else{
				$('textPos0').checked = false;
				$('textPos1').checked = true;
			}
			$j('#plTextPos2').hide();
			/*			
			if(ctext.pos==0){
				$j('#plTextPos2').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;左頁');
			}else{
				$j('#plTextPos2').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;右頁');
			}*/
		}else{
			$j('#plTextPos').show();
			$j('#plTextPos2').html('');
		}
	}
}
function hideTextTool() {
	$j("#textPanel").css('zIndex', 0);
	$j("#textPanel").dialog('close');
}
var fTool = false;
function createTool() {
	$j('#toolPanel').load('edit_step_tool.ko', {
					method : 'detail',
					r : getAjaxRandom()
				}, function() {
					fTool = true;
					$j("#toolPanel").dialog({
						width : 875,
						height : 630,
						modal : false,
						zIndex : 99999999,
						//hide : 'slide',
						position : ['left', 'top'],
						//show : 'slide',
						draggable : false,
						close: function(event, ui) { 
							hideTool2();
						}
					});
					$j("#toolPanel").dialog('close');
				});	
}
function showTool(id) {
	showDDL(false);
	if (fTool == true) {
		$j("#toolPanel").dialog('open');
		$j(".ui-dialog-titlebar").show();
		initTool(id);
		showTool2(id);
	}
}
function showTool2(id) {
	$j('#tool1').hide();
	$j('#tool2').hide();
	$j('#tool3').hide();
	$j('#tool4').hide();
	$j('#tool5').hide();
	$j('#tool6').hide();
	if (kphoto.crop.kind == 1) {
		$('crop1').checked = false;
		$('crop2').checked = false;
		$('crop3').checked = false;
		$j('#trCrop1').hide();
		$j('#trCrop2').hide();
		$j('#trCrop3').hide();
		$j('#trCrop4').hide();

		$j('#ImgTool3').hide();
		$j('#ImgTool4').hide();
		$j('#ImgTool5').hide();
		$j('#ImgTool6').hide();
		
		$j('#toolText').html("<strong>照片裁切</strong>");
		$j('#yui_imgDiv')[0].style.position = "absolute";
		$j('#yui_imgDiv')[0].style.left = '170px';
		$j('#yui_imgDiv')[0].style.top = '80px';
		$j("#yui_imgDiv").css("zIndex", 199999999);
		$j('#yui_imgDiv').show();
		$j('#yui_img').show();
		$j('#rotateImg').hide();
		$j('#frameImg').hide();
		$j('#tool2').show();
	} else {
		$j('#ImgTool3').show();
		$j('#ImgTool4').show();
		$j('#ImgTool5').show();
		$j('#ImgTool6').show();
		$j('#trCrop1').show();
		$j('#trCrop2').show();
		$j('#trCrop3').show();
		$j('#trCrop4').show();
		if (id == "1") {
			$j("#toolPanel").dialog({title : '照片加框'});
			$j('#yui_img').hide();
			$j('#yui_imgDiv').hide();
			$j('#rotateImg').hide();
			$j('#frameImg').show();
		} else if (id == "2") {
			$j("#toolPanel").dialog({title : '照片裁切'});
			$j('#yui_imgDiv')[0].style.position = "absolute";
			$j('#yui_imgDiv')[0].style.left = '170px';//(170 + $j("#toolPanel").offset().left* 1)+ 'px';
			$j('#yui_imgDiv')[0].style.top = '80px';//(80 + $j("#toolPanel").offset().top* 1)+ 'px';
			$j("#yui_imgDiv").css("zIndex", 99999999999999);
			$j('#yui_imgDiv').show();
			$j('#yui_img').show();
			$j('#rotateImg').hide();
			$j('#frameImg').hide();
		} else if (id == "3") {
			$j("#toolPanel").dialog({title : '照片旋轉'});
			$j('#yui_img').hide();
			$j('#yui_imgDiv').hide();
			$j('#frameImg').hide();
			$j('#rotateImg').show();
		} else if (id == "4") {
			$j("#toolPanel").dialog({title : '羽化裁切'});
			$j('#yui_imgDiv').hide();
			$j('#yui_img').hide();
			$j('#rotateImg').hide();
			$j('#frameImg').hide();
			
			$j('#yui_img1').hide();
			$j('#maskType' + kphoto.crop.revMask).css('border', 'solid transparent 2px');
			kphoto.crop.revMask = '1';
			$j('#maskType' + kphoto.crop.revMask).css('border', 'solid red 2px');
			hideGrips4Crop();			
		} else if (id == "5") {
			$j("#toolPanel").dialog({title : '套用樣式'});
			$j('#yui_imgDiv').hide();
			$j('#yui_img').hide();
			$j('#rotateImg').hide();
			$j('#frameImg').hide();
			
			$j('#styleW1').val(kphoto.styleW1);
  			$j('#styleW2').val(kphoto.styleW2);
  			$j('#styleW3').val(kphoto.styleW3);
  			$j('#styleH1').val(kphoto.styleH1);
  			$j('#styleH2').val(kphoto.styleH2);
  			$j('#styleH3').val(kphoto.styleH3);
		} else if (id == "6") {
			$j("#toolPanel").dialog({title : '套框大師'});
			$j('#yui_imgDiv').hide();
			$j('#yui_img').hide();
			$j('#rotateImg').hide();
			$j('#frameImg').hide();
			$j('#yui_img1').hide();
			toFrames();
			/*
			$j('#maskType' + kphoto.crop.revMask).css('border', 'solid transparent 2px');
			kphoto.crop.revMask = '1';
			$j('#maskType' + kphoto.crop.revMask).css('border', 'solid red 2px');
			hideGrips4Crop();	*/
		}
		$j('#tool' + id).show();
	}
}
function changeTool(id) {
	showTool(id);
}
function initTool(id) {
	var act = "";
	if (id == 1)
		act = "f";
	else if (id == 2)
		act = "c";
	else if (id == 3)
		act = "r";

	jQuery.post('edit_maker.ko;jsessionid=' + jsessionid, {
				method : 'next',
				seq : kphoto.crop.seq,
				act : act,
				r : getAjaxRandom()
			}, function(xml) {
				if ($j(xml).find('renew').text() == "") {
					return;
				}
				//dbg("ostep:" + $j(xml).find('ostep').text());
				//dbg("renew:" + $j(xml).find('renew').text());
				//dbg("lpic:" + $j(xml).find('lpic').text());
				if (id == "1") {
					// step 1:先裁切 2:先轉圖 3:裁切,後轉圖 4:轉圖,後裁切 5:frame 6:裁切,frame
					// 7:轉圖 frame 8: 3+frame 9:4+frame
					// frame 後 不能再做任一動作,不然都重新
					var alobj = kphoto.albumSourceObj(kphoto.crop.seq);
					// step 1:先裁切 2:先轉圖 3:裁切,後轉圖 4:轉圖,後裁切
					if ($j(xml).find('renew').text() == "1") {
						editImageSrc('frameImg', $j(xml).find('lpic').text());
						$('frameImg').width = alobj.w * 1;
						$('frameImg').height = alobj.h * 1;
						$('frameImg').style.height = alobj.h * 1 + 'px';
						$('frameImg').style.width = alobj.w * 1 + 'px';
						//alert(1);
					} else {
						editImageSrc('frameImg', $j(xml).find('lpic').text());
						$('frameImg').width = alobj.nw * 1;
						$('frameImg').height = alobj.nh * 1;
						$('frameImg').style.height = alobj.nh * 1 + 'px';
						$('frameImg').style.width = alobj.nw * 1 + 'px';	
						dbg("alobj.nw:"+alobj.nw);
						dbg("alobj.nh:"+alobj.nh);
					}
				} else if (id == "2") {
					var alobj = kphoto.albumSourceObj(kphoto.crop.seq);
					// step 1:先裁切 2:先轉圖 3:裁切,後轉圖 5:frame 6:裁切,frame
					editImageSrc('yui_img', $j(xml).find('lpic').text());
					$('yui_img').width = alobj.w * 1;
					$('yui_img').height = alobj.h * 1;
					$('yui_img').style.height = alobj.h * 1 + 'px';
					$('yui_img').style.width = alobj.w * 1 + 'px';

					$('yui_img2').width = alobj.w * 1;
					$('yui_img2').height = alobj.h * 1;
					$('yui_img2').style.height = alobj.h * 1 + 'px';
					$('yui_img2').style.width = alobj.w * 1 + 'px';
					$j('#yui_img2').hide();
					showCropper();
				} else if (id == "3") {
					var alobj = kphoto.albumSourceObj(kphoto.crop.seq);
					if ($j(xml).find('renew').text() == "1") {
						editImageSrc('rotateImg', $j(xml).find('lpic').text());
						$('rotateImg').width = alobj.w * 1;
						$('rotateImg').height = alobj.h * 1;
						$('rotateImg').style.height = alobj.h * 1 + 'px';
						$('rotateImg').style.width = alobj.w * 1 + 'px';
						
					} else {
						editImageSrc('rotateImg', $j(xml).find('lpic').text());
						$('rotateImg').width = alobj.nw * 1;
						$('rotateImg').height = alobj.nh * 1;
						$('rotateImg').style.height = alobj.nh * 1 + 'px';
						$('rotateImg').style.width = alobj.nw * 1 + 'px';						
					}
				}
			}, "xml");
}
function hideTool() {
	$j("#toolPanel").dialog('close');
	$j("#toolPanel").css('zIndex', 0);
	showDDL(true);
}
function hideTool2() {
	$j('#tool1').hide();
	$j('#tool2').hide();
	$j('#tool3').hide();
	$j('#tool4').hide();
	$j('#tool5').hide();
	$j('#yui_imgDiv').hide();
}
function on_frame(oj) {
	var res = oj.responseXML;
	var result = getColumnValue(res, "result");
	var msg = getColumnValue(res, "msg");
	if (result == "1") {
		var kind = getColumnValue(res, "kind");
		var seq = getColumnValue(res, "seq");
		loadSingleImager(seq);
	} else {
		alert(msg);
		hideWait();
	}
}

function goFrame() {
	if (lock == 0) {
		hideTool();
		lock = 1;
		showWait();
		var shadowratio = 1;
		if ($('shadowratio2').checked) {
			shadowratio = "0";
		}
		sendAjaxData('edit_maker.ko;jsessionid=' + jsessionid, '&method=frame'
						+ '&seq=' + kphoto.crop.seq + '&from='
						+ kphoto.crop.from + '&kind=' + kphoto.crop.kind
						+ '&shadowratio=' + shadowratio + '&frameratio='
						+ $('frameratio').value + '&framecolor='
						+ $('framecolor').value + '&data='
						+ encodeURIComponent(getData()), on_frame, on_frame);
		setTimeout("unlock()", lockTime);
	}
}
function goRotate() {
	if (lock == 0) {
		lock = 1;
		var angle = 0;
		if ($('angleL').value != "") {
			angle = -1 * $('angleL').value;
		} else if ($('angleR').value != "") {
			angle = 1 * $('angleR').value;
		}
		hideTool();
		showWait();
		sendAjaxData('edit_maker.ko;jsessionid=' + jsessionid, '&method=rotate'
						+ '&seq=' + kphoto.crop.seq + '&from='
						+ kphoto.crop.from + '&kind=' + kphoto.crop.kind
						+ '&angle=' + angle + '&data='
						+ encodeURIComponent(getData()), on_toRotate,
				on_toRotate);
		setTimeout("unlock()", lockTime);
	}
}
function goRecover() {
	if (lock == 0) {
		lock = 1;
		showWait();
		sendAjaxData('edit_maker.ko;jsessionid=' + jsessionid,
				'&method=recover' + '&seq=' + kphoto.crop.seq + '&from='
						+ kphoto.crop.from + '&kind=' + kphoto.crop.kind
						+ '&data=' + encodeURIComponent(getData()),
				on_toRotate, on_toRotate);
		setTimeout("unlock()", lockTime);
	}
}
function on_toRotate(oj) {
	var res = oj.responseXML;
	var result = getColumnValue(res, "result");
	var msg = getColumnValue(res, "msg");
	if (result == "1") {
		var kind = getColumnValue(res, "kind");
		var seq = getColumnValue(res, "seq");
		if (kind == "2") {
			loadSingleImager(seq);
		} else {
			loadSinglePic(seq);
		}
	} else {
		alert(msg);
		hideWait();
	}
}
// 裁切back event
function on_toCrop(oj) {
	var res = oj.responseXML;
	var result = getColumnValue(res, "result");
	var msg = getColumnValue(res, "msg");
	if (result == "1") {
		var id = getColumnValue(res, "id");
		var seq = getColumnValue(res, "seq");
		var newlpic = getColumnValue(res, "newlpic");
		//var croplpic = getColumnValue(res, "croplpic");
		var step = getColumnValue(res, "step");
		var nw = getColumnValue(res, "nw");
		var nh = getColumnValue(res, "nh");
		var ow = getColumnValue(res, "ow");
		var oh = getColumnValue(res, "oh");
		var kind = getColumnValue(res, "kind");
		var sobj = kphoto.albumSourceObj(seq);
		sobj.newURI = newlpic;
		sobj.nw = ow;
		sobj.nh = oh;
		sobj.step = step;
		//sobj.croplpic = croplpic;
		if (kind == "2") {
			kphoto.editImager2(id, newlpic, ow, oh, nw, nh);
			//kphoto.sid = kphoto.crop.zoneID;
			kphoto.adjuest(id);
			showGrips();
		} else {
			var dropZone = dzObj(id);
			setPicture(dropZone, sobj.viewID, sobj.textCaption);
		}
		showTools();
	} else {
		alert(msg);
	}
	hideWait();
}

function loadSingleImager(seq) {
	showWait();
	loadAjaxData('edit_data_query.ko;jsessionid=' + jsessionid,
			'&method=singlePic&seq=' + seq, on_loadSingleImager,
			on_loadSingleImager);
}

function on_loadSingleImager(oj) {
	// alert(oj.responseText);
	var res = oj.responseXML;
	var pic = res.getElementsByTagName("pic");
	for (var i = 0; i < pic.length; i++) {
		var seq = getColumnValue(pic[i], "seq");
		var category = getColumnValue(pic[i], "category");
		var lpic = getColumnValue(pic[i], "lpic");
		var step = getColumnValue(pic[i], "step");
		var croplpic = getColumnValue(pic[i], "croplpic");
		var rotatelpic = getColumnValue(pic[i], "rotatelpic");
		var lwidth = getColumnValue(pic[i], "lwidth");
		var lheight = getColumnValue(pic[i], "lheight");

		var caption = getColumnValue(pic[i], "caption");
		var newlpic = getColumnValue(pic[i], "newlpic");
		var nw = getColumnValue(pic[i], "nw");
		var nh = getColumnValue(pic[i], "nh");
		var dwh = getColumnValue(pic[i], "dwh");
		var isUsed = getColumnValue(pic[i], "isUsed");
		if (isUsed == "") {
			isUsed = "0";
		}
		var s = kphoto.replaceAlbumSource(seq, lpic, caption, dwh, lwidth,
				lheight, newlpic, category, nw, nh, step,
				croplpic, rotatelpic);
		s.isUsed = true;
	}
	var obj = kphoto.imagerObj(kphoto.crop.zoneID);
	var alobj = kphoto.albumSourceObj(kphoto.crop.seq);
	if (alobj.step * 1 > 0) {
		obj.swidth = nw;
		obj.sheight = nh;
	} else {
		obj.swidth = lwidth;
		obj.sheight = lheight;
	}
	obj.newURI = alobj.newURI;
	if (obj.newURI != "") {
		editImageSrc(obj.id, obj.newURI);
	} else {
		editImageSrc(obj.id, obj.viewURI);
	}
	kphoto.autoZoom(obj.id);
	kphoto.adjuest(obj.id);
	showGrips();
	kphoto.chooseAlbum($('nowCategory').value);
	hideWait();
}
var cropper;
function onEndCrop(coords, dimensions) {
	kphoto.crop.x1 = coords.x1;
	kphoto.crop.x2 = coords.x2;
	kphoto.crop.y1 = coords.y1;
	kphoto.crop.y2 = coords.y2;
	kphoto.crop.w = dimensions.width;
	kphoto.crop.h = dimensions.height;
	//kphoto.crop.free = 0;
	//dbg("gogogog");
	// window.status =kphoto.crop.x1+","+kphoto.crop.y1+"
	// "+kphoto.crop.x2+","+kphoto.crop.y2+" "+kphoto.crop.w+","+kphoto.crop.h;
}
function toCrop() {
	if (lock == 0) {
		hideTool();
		lock = 1;
		showWait();
		if (kphoto.crop.free == 2) {
			var revFrame = "0";
			if ($('revFrame1').checked) {
				revFrame = "1";
			}else if ($('revFrame2').checked) {
				revFrame = "2";
			}
			var revShadow = "0";
			if ($('revShadow1').checked) {
				revShadow = "1";
			}
			dbg("revShadow:" +　revShadow);
			if(kphoto.crop.multi==1){
				if(kphoto.smap.sids.length > 10){
					alert('最多同時10個圖片進行羽化加框');
					hideWait();
					lock = 0;
					return;
				}
				for(var i=0;i< kphoto.smap.sids.length;i++){
					var obj = kphoto.imagerObj(kphoto.smap.sids[i]);
					sendAjaxData('edit_maker.ko;jsessionid=' + jsessionid,
							'&method=crop'+ '&id=' + kphoto.smap.sids[i] + '&seq=' + obj.viewID + '&from='
									+ kphoto.crop.from + '&kind=' + kphoto.crop.kind
									+ '&free=' + kphoto.crop.free + 
									'&revMask=' + kphoto.crop.revMask + 
									'&revFrameColor='+ $j('#revFrameColor').val() + 
									'&revFrameRatio='+ $j('#revFrameRatio').val() + 
									'&revFrame='+ revFrame + 
									'&revShadow=' + revShadow + 
									'&ow=' + obj.width + 
									'&oh=' + obj.height + 
									'&data='+ encodeURIComponent(getData()), on_toCrop,
							on_toCrop);				
				}
			}else{
				//dbg("revFrameColor:"+$j('#revFrameColor').val());
				var obj = kphoto.imagerObj(kphoto.crop.zoneID);
				sendAjaxData('edit_maker.ko;jsessionid=' + jsessionid,
						'&method=crop' + '&id=' + kphoto.crop.zoneID + '&seq=' + kphoto.crop.seq + '&from='
								+ kphoto.crop.from + '&kind=' + kphoto.crop.kind
								+ '&free=' + kphoto.crop.free + 
								'&revMask=' + kphoto.crop.revMask + 
								'&revFrameColor='+ $j('#revFrameColor').val() + 
								'&revFrameRatio='+ $j('#revFrameRatio').val() + 
								'&revFrame='+ revFrame + 
								'&revShadow=' + revShadow + 
								'&ow=' + obj.width + 
								'&oh=' + obj.height + 								
								'&data='+ encodeURIComponent(getData()), on_toCrop,
						on_toCrop);
			}
		} else {
			if(kphoto.crop.w == 0 || kphoto.crop.h == 0){
				alert("請先框選要裁切的部分!");
				return;
			}
			if(kphoto.crop.kind ==1){
				sendAjaxData('edit_maker.ko;jsessionid=' + jsessionid,
						'&method=crop' + '&id=' + kphoto.crop.zoneID + '&seq=' + kphoto.crop.seq + '&x='
								+ kphoto.crop.x1 + '&y=' + kphoto.crop.y1 + '&w='
								+ kphoto.crop.w + '&h=' + kphoto.crop.h + '&from='
								+ kphoto.crop.from + '&kind=' + kphoto.crop.kind
								+ '&free=' + kphoto.crop.free + '&rate=1'
								+ '&data=' + encodeURIComponent(getData()),
						on_toCrop, on_toCrop);				
			}else{
				var obj = kphoto.imagerObj(kphoto.crop.zoneID);
				sendAjaxData('edit_maker.ko;jsessionid=' + jsessionid,
						'&method=crop' + '&id=' + kphoto.crop.zoneID + '&seq=' + kphoto.crop.seq + '&x='
								+ kphoto.crop.x1 + '&y=' + kphoto.crop.y1 + '&w='
								+ kphoto.crop.w + '&h=' + kphoto.crop.h + '&from='
								+ kphoto.crop.from + '&kind=' + kphoto.crop.kind
								+ '&free=' + kphoto.crop.free + '&rate=1'
								+ '&ow=' + obj.width  
								+ '&oh=' + obj.height  							
								+ '&data=' + encodeURIComponent(getData()),
						on_toCrop, on_toCrop);
			}
		}
		setTimeout("unlock()", lockTime);
	}
}
function enhancePicture(clickID) {
	var dropZone = dzObj(clickID);
	kphoto.crop.zoneID = dropZone.name;
	kphoto.crop.seq = dropZone.viewID;
	kphoto.crop.kind = "1";// 1:rect 2:imager
	kphoto.crop.free = 0;
	showTool(2);
}
// -------------------------------------------------------------------------------------------------------------------------------------------
// 顯示工具箱
function showToolsPanels(p) {
	kphoto.toolsPanel = p;
	if (kphoto.toolsPanel == 0) {
		//$("styleArea_top").style.display = "inline";// none
		$("toolsPanel0").style.display = "inline";
		//$("styleArea_top1").style.display = "none";// none
		$("toolsPanel1").style.display = "none";
		//$("styleArea_top2").style.display = "none";// none
		$("toolsPanel2").style.display = "none";
		//$("styleArea_top3").style.display = "none";// none
		$("toolsPanel3").style.display = "none";
		setTimeout("kphoto.hideIcon()", 10);
		setTimeout("kphoto.hideMargin()", 10);
	} else if (kphoto.toolsPanel == 1) {
		//$("styleArea_top").style.display = "none";
		$("toolsPanel0").style.display = "none";
		//$("styleArea_top1").style.display = "inline";
		$("toolsPanel1").style.display = "inline";
		//$("styleArea_top2").style.display = "none";
		$("toolsPanel2").style.display = "none";
		//$("styleArea_top3").style.display = "none";
		$("toolsPanel3").style.display = "none";
		toChangeCgy1();
		setTimeout("kphoto.hideMargin()", 10);
	} else if (kphoto.toolsPanel == 2) {
		//$("styleArea_top").style.display = "none";
		$("toolsPanel0").style.display = "none";
		//$("styleArea_top1").style.display = "none";
		$("toolsPanel1").style.display = "none";
		//$("styleArea_top2").style.display = "inline";
		$("toolsPanel2").style.display = "inline";
		//$("styleArea_top3").style.display = "none";
		$("toolsPanel3").style.display = "none";
		toChangeCgy2();
		setTimeout("kphoto.hideIcon()", 10);
	} else if (kphoto.toolsPanel == 3) {
		//$("styleArea_top").style.display = "none";
		$("toolsPanel0").style.display = "none";
		//$("styleArea_top1").style.display = "none";
		$("toolsPanel1").style.display = "none";
		//$("styleArea_top2").style.display = "none";
		$("toolsPanel2").style.display = "none";
		//$("styleArea_top3").style.display = "inline";
		$("toolsPanel3").style.display = "inline";
		setTimeout("kphoto.hideIcon()", 10);
		setTimeout("kphoto.hideMargin()", 10);
	}
}
// -------------------------------------------------------------------------------------------------------------------------------------------
function showDDL(b) {
	if (b == true) {
		$('nowCategory').style.visibility = "visible";
	} else {
		$('nowCategory').style.visibility = "hidden";
	}
}
function mselect(event,id){
	if(event!=null){
		if(event.ctrlKey){
			if(kphoto.smap.contains(id)){
				if(kphoto.smap.size()>1){
					kphoto.smap.remove(id);
				}
			}else{ 
				//dbg("pos size:"+kphoto.smap.size());
				//dbg("pos:"+kphoto.obj(kphoto.smap.sids[0]).pos);
				//dbg("pos:"+kphoto.obj(id).pos);
				if(kphoto.smap.size() >= 1 && ((kphoto.obj(kphoto.smap.sids[0]).pos != kphoto.obj(id).pos) || kphoto.smap.same(id)==false)){
					kphoto.smap.removeAll();	
					kphoto.smap.add(id);
					kphoto.sid = id;
					showGrips();
				}else{
					kphoto.smap.add(id);
				}
			}
		}else{
			kphoto.sid = id;
			kphoto.smap.removeAll();	
			kphoto.smap.add(id);
			showGrips();
		}
	}else{
		kphoto.sid = id;
		kphoto.smap.removeAll();	
		kphoto.smap.add(id);
		showGrips();
	}
	//dbg("smap:" + kphoto.smap.size());
	if(kphoto.smap.size()>=2){
		hideGrips();
		//dbg("scrollTop:" + $j(window).scrollTop());
		//dbg("m y:" + (pg.y2 - 80 - $j(window).scrollTop()));
		$j("#plSort").dialog({
				width : 240,
				height : 68,
				minHeight: 68,
				title: '圖片對齊',
				position:[pg.x2 + 180, pg.y2 - 80 - $j(window).scrollTop()],
				modal : false,
				zIndex : 999999998,
				position : ['center', 'middle'],
				draggable : true,
				close: function(event, ui) { 
					showGrips();
				},
				open: function(event, ui) {
					hideGrips();
				}
			});
		$j("#plSort").dialog('open');
		$j(".ui-dialog-titlebar").show();
		/*	
		$j('#plSort')[0].style.position ="absolute";	
		$j('#plSort')[0].style.top  = (pg.y2-30) + 'px';
  		$j('#plSort')[0].style.left = (pg.x2+20) + 'px';		
  		$j('#plSort').css('zIndex',10000000000);
  		$j('#plSort').show();*/
	}else{
		$j("#plSort").dialog('close');
	}
	//selector.showDay();
}

function showFree(pos){
	if(kphoto.smap.size() == 0 || kphoto.obj(kphoto.smap.sids[0]).pos != pos || kphoto.smap.isText){
		alert('請先選擇要羽化加框的圖片(配合按住Ctrl鍵+滑鼠點選,可以多選圖片進行羽化加框)');
		return;
	}
	var obj = kphoto.mainerObj();
 	kphoto.crop.zoneID = obj.id;
 	kphoto.crop.seq = obj.viewID;
 	kphoto.crop.kind = "2";//1:rect  2:imager
 	kphoto.crop.free = 2;
 	kphoto.crop.multi = 1;
 	//dbg(kphoto.crop.toString());
 	showTool(4);
}
function showSize(pos){
	if(kphoto.smap.size() == 0 || kphoto.obj(kphoto.smap.sids[0]).pos != pos){
		alert('請先選擇要統一尺寸的圖片或文字(配合按住Ctrl鍵+滑鼠點選,可以多選圖片進行統一尺寸)');
		return;
	}
	var obj = kphoto.mainerObj();
	kphoto.crop.zoneID = obj.id;//div的id
 	kphoto.crop.seq = obj.viewID;//pic的流水號 	
 	kphoto.crop.kind = "2";//1:rect  2:imager
 	showTool(5);
}
function showAlignHelp(pos){
	if(kphoto.smap.size() == 0 || kphoto.obj(kphoto.smap.sids[0]).pos != pos){
		alert('請先選擇要對齊的圖片或文字(配合按住Ctrl鍵+滑鼠點選,可以多選圖片進行對齊)');
		return;
	}
	$j('#plAlignHelp').load('edit_step_align.ko', {
					method : 'detail',
					r : getAjaxRandom()
				}, function() {
					$j("#plAlignHelp").dialog({
								width : 700,
								height : 480,
								modal : false,
								zIndex : 99999998,
								//hide : 'slide',
								position : ['left', 'top'],
								//show : 'slide',
								draggable : true
							});
					$j("#plAlignHelp").dialog('open');
					$j(".ui-dialog-titlebar").show();
				});
}

function toValueStyle(obj){
	//alert(obj.id);
	if (obj.id.indexOf("styleW") == 0) {
		//alert(obj.id.substr(6));
		if($j('#'+obj.id).val()!=""){
			$j('#styleH'+obj.id.substr(6)).val("");
		}
		if(obj.id=="styleW1"){
			kphoto.styleW1 = $j('#'+obj.id).val();
			kphoto.styleH1 = "";
		}else if(obj.id=="styleW2"){
			kphoto.styleW2 = $j('#'+obj.id).val();
			kphoto.styleH2 = "";
		}else if(obj.id=="styleW3"){
			kphoto.styleW3 = $j('#'+obj.id).val();
			kphoto.styleH3 = "";
		}
	}else if (obj.id.indexOf("styleH") == 0) {
		//alert(obj.id.substr(6));
		if($j('#'+obj.id).val()!=""){
			$j('#styleW'+obj.id.substr(6)).val("");
		}
		if(obj.id=="styleH1"){
			kphoto.styleH1 = $j('#'+obj.id).val();
			kphoto.styleW1 = "";
		}else if(obj.id=="styleH2"){
			kphoto.styleH2 = $j('#'+obj.id).val();
			kphoto.styleW2 = "";
		}else if(obj.id=="styleH3"){
			kphoto.styleH3 = $j('#'+obj.id).val();
			kphoto.styleW3 = "";
		}
	}
//			$j('#styleW1').val(kphoto.styleW1);
//  			$j('#styleW2').val(kphoto.styleW2);
//  			$j('#styleW3').val(kphoto.styleW3);
//  			$j('#styleH1').val(kphoto.styleH1);
//  			$j('#styleH2').val(kphoto.styleH2);
//  			$j('#styleH3').val(kphoto.styleH3);
}

function toSize(){
	if($('rdStyle0').checked){
		kphoto.adjuestSize(0,0);
	}else if($('rdStyle1').checked){
		kphoto.adjuestSize($j('#styleW1').val()*1*kphoto.mm,$j('#styleH1').val()*1*kphoto.mm);
	}else if($('rdStyle2').checked){
		kphoto.adjuestSize($j('#styleW2').val()*1*kphoto.mm,$j('#styleH2').val()*1*kphoto.mm);
	}else if($('rdStyle3').checked){
		kphoto.adjuestSize($j('#styleW3').val()*1*kphoto.mm,$j('#styleH3').val()*1*kphoto.mm);
	}
	hideTool();
}


function toFrames()
{
	jQuery.post('edit_layout_query.ko;jsessionid=' + jsessionid, {
				method : 'frames',
				cgySeq : $('fcgySeq').value,
				r : getAjaxRandom()
			}, on_toFrames, "xml");
}
function changeFCgy()
{
	toFrames();
}
function on_toFrames(xml)
{
  //以responseXML取得回應
  //alert(oj.responseText);
  //var showYearMonth =  $j(xml).find('showYearMonth').text();
  frames_now = 0;
  frames_Len = 0;
  framesList = new Array();
  $j(xml).find('frame').each(function(){
		var seq = $j("seq", this).text();
  		var title = $j("title", this).text();
  		var preview1 = $j("preview1", this).text();
    	framesList[framesList.length] = new slayoutElement(seq,'fpreview/'+preview1,title);
  });
  
  $j('#plFmdtype1').hide();
  $('fmdtype1').checked = false;
  
  $j('#plFmdtype2').hide();
  $('fmdtype2').checked = false;
  
  $j('#plFmdtype3').hide();
  $('fmdtype3').checked = false; 
  
  frames_Len = Math.round(framesList.length /8);
  if(frames_Len*8 < framesList.length){
    frames_Len +=1;
  }
  for (var j=0; j < 8; j++) {
    var img = document.getElementById("fpreview"+j);
    img.src = "images/sp.gif";
    var cp = document.getElementById("frameName"+j);
    cp.innerHTML="";
  }
  for (var j=0; j < framesList.length && j <8; j++) {
    var img = document.getElementById("fpreview"+j);
    img.src = framesList[j].viewURI;
    var cp = document.getElementById("frameName"+j);
    cp.innerHTML=framesList[j].caption;
  }
  frames_init=1;
  hideWait();
  toChangeFrames(0);
}
function toNextFrames()
{
  if(frames_now+1 < frames_Len){
	for (var j=0; j < 8; j++) {
      var img = document.getElementById("fpreview"+j);
      img.src = "images/sp.gif";
      //img.style.visibility = 'hidden';
      var cp = document.getElementById("frameName"+j);
      cp.innerHTML="";
	}
    frames_now += 1;
	for (var j= 0 + frames_now*8; j < framesList.length && j < frames_now*8 + 8; j++) {
      var img = document.getElementById("fpreview"+(j-frames_now*8));
      img.src = framesList[j].viewURI;
      //img.style.visibility = 'visible';
      var cp = document.getElementById("frameName"+(j-frames_now*8));
      cp.innerHTML=framesList[j].caption;
	}
  }
  toChangeFrames((frames_now)*8);
}

function toPreFrames()
{
  if(frames_now-1 >= 0){
	for (var j=0; j < 8; j++) {
      var img = document.getElementById("fpreview"+j);
      img.src = "images/sp.gif";
      //img.style.visibility = 'hidden';

      var cp = document.getElementById("frameName"+j);
      cp.innerHTML="";
	}
    frames_now -= 1;
	for (var j= 0 + frames_now*8  ; j < framesList.length && j <frames_now*8+8; j++) {
      var img = document.getElementById("fpreview"+(j-frames_now*8));
      img.src = framesList[j].viewURI;
      //img.style.visibility = 'visible';

      var cp = document.getElementById("frameName"+(j-frames_now*8));
      cp.innerHTML=framesList[j].caption;
	}
  }
  toChangeFrames((frames_now)*8);
}
var oframes = "";
function on_toChangeFrames(xml)
{
  //以responseXML取得回應
  //alert(oj.responseText);
  var seq =  $j(xml).find('seq').text();
  var canvas1 =  $j(xml).find('canvas1').text();
  var canvas2 =  $j(xml).find('canvas2').text();
  var canvas3 =  $j(xml).find('canvas3').text();
  if(canvas1.length>0){
      $j('#plFmdtype1').show();
      $j('#fmdtype1')[0].checked = true;
  }else{
      $j('#plFmdtype1').hide();
  }
  if(canvas2.length>0){
      $j('#plFmdtype2').show();
      if(canvas1.length==0){
       		$j('#fmdtype2')[0].checked = true;
      }
  }else{
      $j('#plFmdtype2').hide();
  }
  if(canvas3.length>0){
   	  $j('#plFmdtype3').show();
   	  if(canvas1.length==0 && canvas2.length==0){
       		$j('#fmdtype3')[0].checked = true;
       }
  }else{
      $j('#plFmdtype3').hide();
  }
}
function toChangeFrames(idx)
{
	if((idx+frames_now*8) >= framesList.length){
		return;
	}
	//alert(frames_now);
	//alert((idx+frames_now*4) + "_" + framesList.length);
	$j('#fpreview' + oframes).css('border', 'solid transparent 2px');
	oframes = idx;
	$j('#fpreview' + idx).css('border', 'solid red 2px');
	kphoto.crop.frames = framesList[(idx+frames_now*8)].viewID*1;
	jQuery.post('edit_layout_query.ko;jsessionid=' + jsessionid, {
				method : 'frames2',
				seq: framesList[(idx+frames_now*8)].viewID,
				r : getAjaxRandom()
			}, on_toChangeFrames, "xml");
}



function goFrames()
{
	if (lock == 0) {
		var fmdtype = "0";
		if ($('fmdtype1').checked) {
			fmdtype = "1";
		}else if ($('fmdtype2').checked) {
			fmdtype = "2";
		}else if ($('fmdtype3').checked) {
			fmdtype = "3";
		}
		if(fmdtype=="0"){
			alert("未選擇框");
			return;
		}
		lock = 1;
		hideTool();
		showWait();
		var revShadow = "0";
		if ($('revShadow1').checked) {
			revShadow = "1";
		}
		dbg("revShadow:" +　revShadow);
		
		if(kphoto.smap.sids.length > 10){
			alert('最多同時10個圖片進行套框大師');
			hideWait();
			lock = 0;
			return;
		}
		for(var i=0;i< kphoto.smap.sids.length;i++){
			var obj = kphoto.imagerObj(kphoto.smap.sids[i]);
			sendAjaxData('edit_maker.ko;jsessionid=' + jsessionid,
							'&method=frames'+ 
							'&kind=' + kphoto.crop.kind + 
							'&id=' + kphoto.smap.sids[i] + 
							'&seq=' + obj.viewID + 
							'&framesseq=' + kphoto.crop.frames + 
							'&fmdtype=' + fmdtype + 
							'&ow=' + obj.width + 
							'&oh=' + obj.height + 
							'&data='+ encodeURIComponent(getData()), on_toCrop,
					on_toCrop);				
		}
		setTimeout("unlock()", lockTime);
	}
}