// JavaScript Document

scrollheight = 165 ; // 卷軸高
lineNum = 1; 
boardheight=scrollheight * lineNum; // 跑馬燈高
scrollwidth= 150; // 跑馬燈寬
scrollTimeOut = 80; // 移動時間
scrollStopTime = 1 // 停留時間

doScroll = true // 是否要跑
scrollCountTime = 0; // 目前時間 
offSet = scrollheight; // 偏移量
startSetp = 0;
function ScrollBluezz(id){
　　var thisSc = document.getElementById(id);
	thisSc.style.width = scrollwidth;
	thisSc.style.height = boardheight;
	thisSc.style.overflowX = "hidden";
	thisSc.style.overflowY = "hidden";
	thisSc.scrollTop = 0
	setInterval("scrollUpBluezz('"+id+"')",scrollTimeOut)
}

function scrollUpBluezz(id){
	thisSc = document.getElementById(id);
	if (doScroll == false) return // 不跑
		offSet ++ 
	if (offSet == scrollheight + 1) {
　　			scrollCountTime ++ ;
　　			offSet -- ;
　　			if (scrollCountTime == scrollStopTime) {
　　				offSet = 0;
  				scrollCountTime = 0;
　　 		}
	}else {
　　			startSetp = thisSc.scrollTop + (scrollheight * lineNum);
　　			thisSc.scrollTop ++;
　　			if (startSetp == thisSc.scrollTop + (scrollheight * lineNum)) {
　　				thisSc.scrollTop = scrollheight * (lineNum-1);
  				thisSc.scrollTop ++ ;
　　			}
	}
}
