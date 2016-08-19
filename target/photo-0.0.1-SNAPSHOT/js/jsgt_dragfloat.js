//=====================================================================
//  SYSTEM      :  DragableFloat DIV
//  PROGRAM     :  能夠拖曳，並在畫面捲動時固定在畫面特別位置的DIV
//  FILE NAME   :  jsgt_dragfloat.js
//  CALL FROM   :  HTML
//  AUTHER      :  Toshirou Takahashi http://jsgt.org/mt/01/
//  SUPPORT URL :  http://jsgt.org/mt/archives/01/000419.html
//  CREATE      :  2005.7.8
//  UPDATE      :  2005.9.26  v07 新增floatEnabled boundEnabled setBounds chkBounds
//  UPDATE      :  2005.9.22  v06 將getTOP getLEFT getMouseX getMouseY加入div的屬性
//  UPDATE      :  2005.8.12  v05 將拖曳時ie會發生的select以onselectstart無效化
//  UPDATE      :  2005.8.10  v04 一定程度上解決拖曳時無法捕捉iframe上之事件的問題
//  UPDATE      :  2005.8.8   新增dbg_echo()
//  UPDATE      :  2005.8.8   沒有body標籤時輸出假的body
//  UPDATE      :  2005.7.8   支援 DOCTYPE 標準模式
//                   參考 http://otd8.jbbs.livedoor.jp/877597/bbs_tree?base=9322&range=1
//
//
// 您可自由修改本指令碼或用於商業用途
// 為了保持這些自由，作者並不放棄著作權。
//---------------------------------------------------------------------
// 高橋登史朗 (Toshirou Takahashi http://jsgt.org/mt/01/) 2005.7.8

/*
//=====================================================================
// 以下範例

<-- 程式庫  jsgt_dragfloat.js-->
<script type    = 'text/javascript'
        charset = 'UTF-8'
        src     = 'jsgt_dragfloat.js'></script>
<script type='text/javascript'>
<!--

////
// 運作開始
//
// 在頁面載入後開始運作
//
window.onload = function ()
{
    setDragableFloat() //設定
}

////
// 設定
//
// @syntax oj = dragableFloat("DIV的ID名",初始位置X,初始位置Y)
//
// @sample              div1 = dragableFloat("aaa",100,200) //建立
// @sample              div1.innerHTML="床前明月光"         //插入HTML
// @sample              div1.style.backgroundColor='orange' //以CSS修飾
// @sample              doDragableFloat()                   //開始
//
function setDragableFloat()
{
    //建立可拖曳之浮動DIV
    div1 = dragableFloat("aaa",100,200)
    div2 = dragableFloat("fff",200,300)
    div3 = dragableFloat("ddd",250,300)

    //對各DIV插入HTML
    div1.innerHTML="aaaaaaaa"
    div2.innerHTML="fffffff"
    div3.innerHTML="xx"

    //以CSS修飾
    div1.style.backgroundColor ="orange"
    div2.style.fontSize  ="18px"

    //開始
    doDragableFloat()

}

//-->
</script>
<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>



// 範例到此為止
//=====================================================================
 */






////
// 全域變數
//
// @var    zcount             所有可拖曳DIV中，現在zindex的最大值
// @var    clickElement       現在正在拖曳的DIV之ID名
// @var    canvas             支援 document.body 的DOCTYPE標準模式
// @array  dragableFloatId    存放所有可拖曳DIV的ID名
//
var zcount = 0          ;
var clickElement = ""   ;
if(document.getElementsByTagName('BODY').length==0)document.write('<body>')//偽造body標籤
var canvas = document[ 'CSS1Compat' == document.compatMode ? 'documentElement' : 'body'];
var dragableFloatId=[]  ;
var recx1,recy1,recx2,recy2,recxOffset,recyOffset
var zoomrange = 5;
var write_back = 0;
////
// 將所有可拖曳DIV就緒
//
//
function doDragableFloat()
{

  for(i in dragableFloatId){
    var oj = document.getElementById(dragableFloatId[i]) ;
    if(oj.floatEnabled){

      if(!(is.safari || is.khtml))
      {
        // 拖曳時的動作
        window.onscroll = function(e){
            moveDiv(oj,oj.style.left,oj.style.top);
        }
      } else {
        aaa=setInterval(function(){
          moveDiv(oj,oj.style.left,oj.style.top);
        },100)
      }
    }
  }
}

// 開始所有可拖曳DIV的浮動
function startDragableFloat()
{
    for(i in dragableFloat ){
        var oj = document.getElementById(dragableFloat[i].id) ;
        moveDiv(oj,oj.style.left,oj.style.top);
    }
}

// 令DIV漂浮
function moveDiv (oj,ofx,ofy)
{
    if(oj.draging)return  ;//拖曳中則忽略
    if(oj.dragcnt == 0 ){
        ofx = parseInt(ofx,10)
        ofy = parseInt(ofx,10)
        oj.dragcnt++
    } else {//偏移拖曳之結束位置
        ofx = parseInt(oj.pageOffLeft,10)
        ofy = parseInt(oj.pageOffTop,10)
    }
    var l = parseInt(canvas.scrollLeft,10)
    var t = parseInt(canvas.scrollTop,10)
    oj.style.left = l + ofx+"px"
    oj.style.top  = t + ofy+"px"
}


////
//瀏覽器判定
//
// @sample               alert(is.ie)
//
var is =
{
    ie     : !!document.all ,
    mac45  : navigator.userAgent.indexOf('MSIE 4.5; Mac_PowerPC') != -1 ,
    opera  : !!window.opera ,
    safari : navigator.userAgent.indexOf('Safari') != -1 ,
    khtml  : navigator.userAgent.indexOf('Konqueror') != -1
}

////
// 建立可拖曳之浮動DIV
//
// @sample          div1 = dragableFloat("aaa",100,200)
//

function dragableFloat(id,page,x,y)
{
    //if(!!dragableFloatId[id]) return document.getElementById(id)

    ////
    // 建立DIV生成
    // @param  id             DIV的ID
    //
    this.mkDiv = function (id,page)
    {

        var canvas = document[ 'CSS1Compat' == document.compatMode ? 'documentElement' : 'body'];
        var doc   = document; // document物件
        var body  = doc.body;
        var old = (document.getElementById(id)==null);
        var elem  = old? doc.createElement("DIV"):document.getElementById(id); // 建立DIV元素

        var div   = page.appendChild(elem);
        if(old){
            div.setAttribute("id",id);
        }
            div.style.position = "absolute";
            div.style.visibility = "visible";
            div.style.left     = x + "px";
            div.style.top      = y + "px";
            div.width = 0;
            div.height = 0;
            div.innerHTML      = ""                   ;
            div.offLeft        = 0                    ;
            div.offTop         = 0                    ;
            div.parentLeft     = 0                    ;
            div.parentTop      = 0                    ;
            div.parentWidth     = 0                   ;
            div.parentHeight      = 0                 ;
            div.pageOffLeft    = x-parseInt(canvas.scrollLeft,10)+ "px";
            div.pageOffTop     = y-parseInt(canvas.scrollTop,10) + "px";
            div.dragcnt        = 0                    ;
            div.draging        = false                ;
            div.zooming        = 0                ;
            div.getTOP         = getTOP               ;
            div.getETOP         = getETOP               ;
            div.getLEFT        = getLEFT              ;
            div.getELEFT        = getELEFT              ;
            div.getWIDTH = getWIDTH;
            div.getHEIGHT = getHEIGHT;
            div.getMouseX      = getMouseX            ;
            div.getMouseY      = getMouseY            ;
            recx1              = x;
            recy1              = y;

            div.floatEnabled   = true                 ; //可浮動 true|false
            div.boundEnabled   = false                ; //限制可拖曳範圍 true|false
            div.setBounds      = function (a,b,c,d){
                div.minX=a;
                div.minY=b;
                div.maxX=c;
                div.maxY=d;
                div.boundEnabled = true;
            }
            div.onmouseout     = function (e){

                if(!clickElement) return
                selLay=document.getElementById(clickElement);

                // 當xy錯誤時用來類推追跡用的xy值
                x =  recx2+=recxOffset
                y =  recy2+=recyOffset
                dofollow(x,y)
                x =  recx2+=recxOffset
                y =  recy2+=recyOffset
                setTimeout('"dofollow('+x+','+y+')"',10)

                //follow(e)
                //dbg.innerHTML += getMouseX(e)+"--"+getMouseY(e)+"<br>"
                div.style.zIndex = zcount++
                return false
            }
            div.onselectstart  = function (e){ return false }
            div.onmouseover    = function (e){ return false }
            div.onmousedown    = function (e)
            {
                selLay=div;
                clickElement = selLay.id;
                checkZoom(e);
                //window.status = "onmousedown";
                if(div.zooming==0){
                    div.draging    = true  ;
                    div.dragcnt ++         ;
                    // 捕捉DIV的left,top直到游標位置之間的偏移值
                }else{

                }
                if (selLay){
                    selLay.offLeft = getMouseX(e) - getLEFT(selLay.id);
                    selLay.offTop  = getMouseY(e) - getTOP(selLay.id);
                    //window.status = "onmousedown getMouseX(e) "+getMouseX(e)+" "+getMouseY(e) + " " + selLay.offLeft+" "+selLay.offTop;
                }
                return false
            }

        dragableFloatId[div.id] = div.id;//對window登錄
        div.index++;

        return div;
    }

    // 滑鼠移動時的動作
    document.onmousemove  = function (e)
    {
        recTimeOffset(e) //rec
        follow(e)
        //return false
    }
    // 滑鼠釋放時的動作
    document.onmouseup  = function (e)
    {
        if(!clickElement) return
        selLay=document.getElementById(clickElement);
        window.status = "";
        // 在拖曳中途跳開時
        follow(e)
        // 停止拖曳
        if(selLay!=null){
            selLay.draging   = false ;
            selLay.style.zIndex = zcount++;
            selLay.zooming = -1;
        }
        // 捕捉畫面內left,top的偏移位置
        if (selLay){
            var sl = parseInt(canvas.scrollLeft,10);
            var st = parseInt(canvas.scrollTop,10);
            selLay.pageOffLeft = getLEFT(selLay.id)-sl;
            selLay.pageOffTop  = getTOP(selLay.id)-st;
            window.status = " getLEFT(selLay.id) :"+getLEFT(selLay.id);
            window.status += " getTOP(selLay.id) :"+getTOP(selLay.id);
            window.status += " getHEIGHT(selLay.id) :"+getHEIGHT(selLay.id);
            window.status += " getWIDTH(selLay.id) :"+getWIDTH(selLay.id);
            if(write_back==1){
                write_back_func(selLay);
            }
        }
        selLay==null;
        clickElement=null;
        return false
    }

    // 拖曳失敗時的類推追跡
    function follow(e)
    {
        if(!clickElement) return
        selLay=document.getElementById(clickElement);
        // 取得滑鼠位置
        var x = getMouseX(e)
        var y = getMouseY(e)
        // 當xy錯誤時用來類推追跡用的xy值
        x = (x == -1)? recx2+=recxOffset : x ;
        y = (y == -1)? recy2+=recyOffset : y ;
        if(x == -1 && y == -1)
            setTimeout('follow('+e+')',100);
        dofollow(x,y);
    }

    // 滑鼠追跡
    function dofollow(x,y)
    {
        if(!clickElement) return
        selLay=document.getElementById(clickElement);
        if(!chkBounds(selLay)){
          return
        } else {
          if(selLay.draging){
            // 減掉偏移值追蹤之
            movetoX = x - selLay.offLeft;
            movetoY = y - selLay.offTop;
            selLay.style.left = parseInt(movetoX,10) +"px";
            selLay.style.top  = parseInt(movetoY,10) +"px";
          }else if(selLay.zooming == 2){
            movetoY = y - selLay.offTop;
            if(movetoY>=0){
                zoomh = selLay.style.pixelTop - parseInt(movetoY,10);
                if(selLay.style.pixelHeight+zoomh>=30){
                    selLay.style.top  = parseInt(movetoY,10) +"px";
                    selLay.style.height =(selLay.style.pixelHeight+zoomh)+"px";
                }
            }
          }else if(selLay.zooming == 6){
            movetoY = y - selLay.offTop;
            zoomh = parseInt(movetoY,10) - selLay.style.pixelTop ;
            if( (movetoY+selLay.style.pixelHeight+zoomh) <= selLay.parentHeight && (selLay.style.pixelHeight+zoomh) >=30){
                selLay.style.height =(selLay.style.pixelHeight+zoomh)+"px";
                selLay.offTop  = y - getTOP(selLay.id);
            }
          }else if(selLay.zooming == 8){
            movetoX = x - selLay.offLeft;
            if(movetoX>=0){
                zoomw = selLay.style.pixelLeft - parseInt(movetoX,10);
                if(selLay.style.pixelWidth+zoomw>=30){
                    selLay.style.left = parseInt(movetoX,10) +"px";
                    selLay.style.width =(selLay.style.pixelWidth+zoomw)+"px";
                }
            }
          }else if(selLay.zooming == 4){
            movetoX = x - selLay.offLeft;
            zoomw = parseInt(movetoX,10) - selLay.style.pixelLeft ;
            if( (movetoX+selLay.style.pixelWidth+zoomw) <= selLay.parentWidth && (selLay.style.pixelWidth+zoomw) >=30){
                selLay.style.width =(selLay.style.pixelWidth+zoomw)+"px";
                selLay.offLeft  = x - getLEFT(selLay.id);
            }
          }else if(selLay.zooming == 1){
            movetoY = y - selLay.offTop;
            movetoX = x - selLay.offLeft;
            zoomh = selLay.style.pixelTop - parseInt(movetoY,10);
            zoomw = selLay.style.pixelLeft - parseInt(movetoX,10);
            if( movetoY>=0 && movetoX>=0 &&
                selLay.style.pixelHeight+zoomh>=30 && selLay.style.pixelWidth+zoomw>=30){
                selLay.style.top  = parseInt(movetoY,10) +"px";
                selLay.style.height =(selLay.style.pixelHeight+zoomh)+"px";
                selLay.style.left = parseInt(movetoX,10) +"px";
                selLay.style.width =(selLay.style.pixelWidth+zoomw)+"px";
            }
          }else if(selLay.zooming == 3){
            movetoY = y - selLay.offTop;
            zoomh = selLay.style.pixelTop - parseInt(movetoY,10);
            movetoX = x - selLay.offLeft;
            zoomw = parseInt(movetoX,10) - selLay.style.pixelLeft ;
            if( movetoY>=0 && (movetoX+selLay.style.pixelWidth+zoomw) <= selLay.parentWidth &&
                    selLay.style.pixelHeight+zoomh>=30 && selLay.style.pixelWidth+zoomw>=30){
                selLay.style.top  = parseInt(movetoY,10) +"px";
                selLay.style.height =(selLay.style.pixelHeight+zoomh)+"px";
                selLay.style.width =(selLay.style.pixelWidth+zoomw)+"px";
                selLay.offLeft  = x - getLEFT(selLay.id);
            }
          }else if(selLay.zooming == 5){
            movetoX = x - selLay.offLeft;
            zoomw = parseInt(movetoX,10) - selLay.style.pixelLeft ;
            movetoY = y - selLay.offTop;
            zoomh = parseInt(movetoY,10) - selLay.style.pixelTop ;
            if((movetoY+selLay.style.pixelHeight+zoomh) <= selLay.parentHeight && (movetoX+selLay.style.pixelWidth+zoomw) <= selLay.parentWidth &&
                    selLay.style.pixelWidth+zoomw>=30 && selLay.style.pixelHeight+zoomh>=30){
                selLay.style.width =(selLay.style.pixelWidth+zoomw)+"px";
                selLay.offLeft  = x - getLEFT(selLay.id);
                selLay.style.height =(selLay.style.pixelHeight+zoomh)+"px";
                selLay.offTop  = y - getTOP(selLay.id);
            }
          }else if(selLay.zooming == 7){
            movetoX = x - selLay.offLeft;
            zoomw = selLay.style.pixelLeft - parseInt(movetoX,10);
            movetoY = y - selLay.offTop;
            zoomh = parseInt(movetoY,10) - selLay.style.pixelTop ;
            if(movetoX>=0 && (movetoY+selLay.style.pixelHeight+zoomh) <= selLay.parentHeight &&
                    selLay.style.pixelWidth+zoomw>=30 && selLay.style.pixelHeight+zoomh>=30){
                selLay.style.left = parseInt(movetoX,10) +"px";
                selLay.style.width =(selLay.style.pixelWidth+zoomw)+"px";
                selLay.style.height =(selLay.style.pixelHeight+zoomh)+"px";
                selLay.offTop  = y - getTOP(selLay.id);
            }
          }
        }
       // window.status = selLay.style.left
    }

    // 記錄滑鼠位置
    function recTimeOffset(e)
    {
        if(x == -1 || y == -1)return
        recx2= recx1
        recy2= recy1
        recx1= getMouseX(e)
        recy1= getMouseY(e)
        recxOffset= recx1 - recx2
        recyOffset= recy1 - recy2

    }

    // 檢查是否在指定區域內
    function chkBounds(oj){
      if(oj==null)
        return;
      var layName = oj.id
      if(oj.boundEnabled){

        // 取得現在位置
        var nowX = getLEFT(layName);
        var nowY = getTOP(layName);
        var nowEX = getELEFT(layName);
        var nowEY = getETOP(layName);
        //window.status = "nowEX "+nowEX+" nowEY "+nowEY;

        // 檢查
        if(
          nowX >= oj.minX &&
          nowY >= oj.minY &&
          nowX <= oj.maxX &&
          nowY <= oj.maxY
        ){
            if(nowEX >= oj.minX &&
                nowEY >= oj.minY &&
                nowEX <= oj.maxX &&
                nowEY <= oj.maxY   ){
                return true //若在指定區域內則true
            }else{
                returnPOS2(nowEX,nowEY,oj)
            }
        } else {
          returnPOS(nowX,nowY,oj);
          return false
        }
      } else {
        return true
      }
    }
    function checkZoom(e){
      if(!clickElement) return
      selLay=document.getElementById(clickElement);
      var x = getMouseX(e) - selLay.parentLeft;
      var y = getMouseY(e) - selLay.parentTop;
      selLay.zooming = 0;
      if(x < getLEFT(selLay.id) + zoomrange){
        if(y < getTOP(selLay.id) + zoomrange){
            selLay.zooming = 1;
        }else if(y > getTOP(selLay.id) + getHEIGHT(selLay.id) - zoomrange){
            selLay.zooming = 7;
        }else{
            selLay.zooming = 8;
        }
      }else if(x > getLEFT(selLay.id) + getWIDTH(selLay.id) - zoomrange){
        if(y < getTOP(selLay.id) + zoomrange){
            selLay.zooming = 3;
        }else if(y > getTOP(selLay.id) + getHEIGHT(selLay.id) - zoomrange){
            selLay.zooming = 5;
        }else{
            selLay.zooming = 4;
        }
      }else{
        if(y < getTOP(selLay.id) + zoomrange){
            selLay.zooming = 2;
        }else if(y > getTOP(selLay.id) + getHEIGHT(selLay.id) - zoomrange){
            selLay.zooming = 6;
        }else{
            selLay.zooming = 0;
        }
      }
//      window.status = "zooming :"+selLay.zooming;
//      window.status += " x :"+x;
//      window.status += " y :"+y;
//      window.status += " getLEFT(selLay.id) :"+getLEFT(selLay.id);
//      window.status += " getTOP(selLay.id) :"+getTOP(selLay.id);
//      window.status += " selLay.parentLeft :"+selLay.parentLeft;
//      window.status += " selLay.parentTop :"+selLay.parentTop;
    }
    // 回到區域內
    function returnPOS(nowX,nowY,oj){
      if(nowX < oj.minX) oj.style.left = oj.minX+1 +"px"
      if(nowY < oj.minY) oj.style.top  = oj.minY+1 +"px"
      if(nowX > oj.maxX) oj.style.left = oj.maxX +"px"
      if(nowY > oj.maxY) oj.style.top  = oj.maxY +"px"
    }
    // 回到區域內
    function returnPOS2(nowX,nowY,oj){
//      if(nowX < oj.minX) oj.style.left = oj.minX+1 +"px"
//      if(nowY < oj.minY) oj.style.top  = oj.minY+1 +"px"
      if(nowX > oj.maxX) oj.style.left = oj.maxX-oj.width-2 +"px"
      if(nowY > oj.maxY) oj.style.top  = oj.maxY-oj.height-2 +"px"
    }
    // 取得滑鼠X座標
    function getMouseX(e)
    {
        if(document.all)               //e4,e5,e6用
            return canvas.scrollLeft+event.clientX
        else if(document.getElementById)    //n6,n7,m1,o7,s1用
            return e.pageX
    }

    // 取得滑鼠Y座標
    function getMouseY(e)
    {
        if(document.all)               //e4,e5,e6用
            return canvas.scrollTop+event.clientY
        else if(document.getElementById)    //n6,n7,m1,o7,s1用
            return e.pageY
    }


    // 取得圖層左端X座標
    function getLEFT(layName){
        //偵錯
        //document.getElementById('aaa').innerHTML+=layName+'<BR>'

        if(document.all)                    //e4,e5,e6,o6,o7用
            return document.all(layName).style.pixelLeft
        else if(document.getElementById)    //n6,n7,m1,s1用
            return (document.getElementById(layName).style.left!="")
                ?parseInt(document.getElementById(layName).style.left):""
    }

    //取得圖層上端Y座標
    function getTOP(layName){
        if(document.all)                    //e4,e5,e6,o6,o7用
            return document.all(layName).style.pixelTop
        else if(document.getElementById)    //n6,n7,m1,s1用
            return (document.getElementById(layName).style.top!="")
                    ?parseInt(document.getElementById(layName).style.top):""
    }

    function getHEIGHT(layName){
        if(document.all)                    //e4,e5,e6,o6,o7用
            return document.all(layName).style.pixelHeight
        else if(document.getElementById)    //n6,n7,m1,s1用
            return (document.getElementById(layName).style.height!="")
                ?parseInt(document.getElementById(layName).style.height):""
    }

    function getWIDTH(layName){
        if(document.all)                    //e4,e5,e6,o6,o7用
            return document.all(layName).style.pixelWidth
        else if(document.getElementById)    //n6,n7,m1,s1用
            return (document.getElementById(layName).style.width!="")
                    ?parseInt(document.getElementById(layName).style.width):""
    }

    // 取得圖層左端X座標
    function getELEFT(layName){
        //偵錯
        //document.getElementById('aaa').innerHTML+=layName+'<BR>'

        if(document.all)                    //e4,e5,e6,o6,o7用
            return document.all(layName).style.pixelLeft + document.all(layName).style.pixelWidth
        else if(document.getElementById)    //n6,n7,m1,s1用
            return (document.getElementById(layName).style.left!="")
                ?parseInt(document.getElementById(layName).style.left)+parseInt(document.getElementById(layName).style.width):""
    }

    //取得圖層上端Y座標
    function getETOP(layName){
        if(document.all)                    //e4,e5,e6,o6,o7用
            return document.all(layName).style.pixelTop + document.all(layName).style.pixelHeight
        else if(document.getElementById)    //n6,n7,m1,s1用
            return (document.getElementById(layName).style.top!="")
                    ?parseInt(document.getElementById(layName).style.top)+parseInt(document.getElementById(layName).style.height):""
    }

    // 偵錯
    function dbg_echo(){
            ////////dbg.innerHTML += selLay.draging+"<br>"

        var debugDIV  = document.createElement("DIV")  ; //建立DIV元素
        var dbg   = document.body.appendChild(debugDIV);
            dbg.setAttribute("id","dbg")                   ;
            dbg.style.position = "absolute"           ;
            dbg.style.left     =  "400px"             ;
            dbg.style.top      = "0px"             ;
            dbg.innerHTML      = "dbg"                   ;
            return dbg;
    }  //dbg = dbg_echo()


	function db1(e)
	{
		dbg.innerHTML += getMouseX(e)+"-1000-"+getMouseY(e)+"<br>"
	}


	return this.mkDiv(id,page) ;

}

