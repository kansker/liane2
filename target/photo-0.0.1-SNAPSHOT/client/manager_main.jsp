<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="java.io.*,java.util.*,org.apache.struts.util.*,org.apache.struts1.*,org.apache.struts1.util.*,org.apache.struts1.agent.*,org.w3c.dom.*,com.photo.common.*" %>
<%@page import="java.net.URLDecoder"%>
<%@page import="java.net.URLEncoder"%>
<%@taglib uri="/tags/struts-bean" prefix="bean"%>
<%@taglib uri="/tags/struts-html" prefix="html"%>
<%@taglib uri="/tags/struts-logic" prefix="logic"%>
<%@taglib uri="/tags/struts-page" prefix="pp"%>
<%
	UserBean bean = (UserBean)request.getSession().getAttribute("UserBean");
Param userPm = bean.getUserParam();
int count = 0;
%>
<html:html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=big5" />
<title><%=org.apache.struts1.agent.ConfigAgent.getConfigProperty("photo_title")%> - 我的相本</title>
<link href="css/editphoto.css" rel="stylesheet" type="text/css">
<script language="javascript" type="text/javascript" src="js/chrisdomroll.js"></script>
<link type="text/css" href="css/ui-lightness/jquery-ui-1.8.6.custom.css" rel="stylesheet" />
<script type="text/javascript" src="js/jquery-1.4.4.min.js"></script>
<script> 
	var $j = jQuery.noConflict();    
</script>
<script type="text/javascript" src="js/jquery-ui-1.8.7.custom.min.js"></script>
<script type="text/javascript" src="js/prototype.js"> </script>
<script type="text/javascript" src="js/prototype_ex.js"> </script>

<script type="text/JavaScript">
<!--
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
//-->
</script>

<style type="text/css">
<!--
#example {height:30em;}
label { display:block;float:left;width:45%;clear:left; }
.clear { clear:both; }
#resp { margin:10px;padding:5px;border:1px solid #ccc;background:#fff;}
#resp li { font-family:monospace }
-->
</style>

</head>
<body onLoad="MM_preloadImages('images/btn_myalbum_over.gif','images/btn_logout_over.gif','images/btn_support_over.gif')">
<html:form name="form1" action="edit_step01" method="post">
<pp:token method="POST"/>
<input type="hidden" name="task" value="">
<input type="hidden" name="seq" value="">
<jsp:include page="/common/client_head02.jsp" flush="true">
<jsp:param name="link" value="help/help0.html"/>
</jsp:include>
<div id="menu">
  <table align="left" width="991" border="0" cellpadding="0" cellspacing="0" background="images/mainbar_bg.gif">
    <tr>
      <td width="14"><div class="menubar_leftbg"></div></td>
      <td width="142"><img src="images/sub_myAlbum.gif" width="142" height="26" alt=""></td>
      <td width="775" align="center">
      <%if(userPm.getInt("register")==1){ %>
      	<%if(ProGlobals.product==2){%>
        <a href="http://www.youngbaby.com.tw/Store "><img src="images/btn_addAlbum.gif" name="Image15" width="100" height="24" border="0" class="domroll images/btn_addAlbum_over.gif"></a>
        <%}else{ %>
        <a href="javascript:toOrder();"><img src="images/btn_addAlbum.gif" name="Image15" width="100" height="24" border="0" class="domroll images/btn_addAlbum_over.gif"></a>
        <%} %>
      <%}%>&nbsp;
      </td>
      <td width="60" align="right"><img src="images/mainbar_right.gif" width="60" height="34"></td>
    </tr>
  </table>
</div>
 <div id="main">
<table width="991" height="500" border="0" align="left" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
    <tr>
      <td align="center" valign="top" class="mainArea2">
	  <table width="900" height="465" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td colspan="4"  align="center" valign="middle" class="txtArea6" id="link_tag1"></td>
        </tr>
        <tr>
          <td height="430" colspan="4" valign="top">
            <table width="900" border="0" cellspacing="0" cellpadding="0">
<%
	String pdfDir =org.apache.struts1.service.ServiceManager.getRootDir() + java.io.File.separator;
%>            
<pp:page scope="session" name="QueryOrder" psize="4">
<%
Param temp = (Param)request.getAttribute(Globals.PAGE_PARAM_TEMP);
String pdfPath = pdfDir + temp.getString("pdfPath");
System.out.println("lcoverPic:"+temp.getString("lcoverPic"));

int w = 1000;
int h= 680;
if(temp.getInt("width") < temp.getInt("height")){
	w = 1000;
	h= 778;	
}
String path = "";
if(temp.getInt("swfStatus")==2) {
  String swfPAth = ConfigAgent.getConfigProperty("photo_user_jpg")+File.separator+ temp.getString("seq")+File.separator+temp.getTimeString("createDate","yyyyMMddmmhhss")+File.separator+"book.html";
  if(FileUtil.exists(swfPAth)){
    path = "jpg/"+temp.getString("seq")+"/"+temp.getTimeString("createDate","yyyyMMddmmhhss")+"/book.html";
  }else{
    swfPAth = ConfigAgent.getConfigProperty("photo_user_jpg")+File.separator+ temp.getString("seq")+File.separator+"book.html";
    if(FileUtil.exists(swfPAth)){
      path = "jpg/"+temp.getString("seq")+"/book.html";
    }
  }
}else if(temp.getInt("demoStatus")==1){
  String swfPAth = ConfigAgent.getConfigProperty("photo_demo_jpg")+File.separator+ temp.getString("seq")+File.separator+temp.getTimeString("createDate","yyyyMMddmmhhss")+File.separator+"book.html";
  if(FileUtil.exists(swfPAth)){
    path = "djpg/"+temp.getString("seq")+"/"+temp.getTimeString("createDate","yyyyMMddmmhhss")+"/book.html";
  }else{
    swfPAth = ConfigAgent.getConfigProperty("photo_demo_jpg")+File.separator+ temp.getString("seq")+File.separator+"book.html";
    if(FileUtil.exists(swfPAth)){
      path = "djpg/"+temp.getString("seq")+"/book.html";
    }
  }
}
//URLEncoder encode = new URLEncoder();
%>
            <tr>
              <td height="170" align="right" valign="top">
                <table width="878" height="165" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg1">
                <tr>
                  <td width="25" height="20" align="center" class="titlebar_bg1"><pp:field field="index"/></td>
                  <td width="227" align="left" class="titlebar_bg2"><div id="txtArea_space"><strong>訂單編號：</strong><pp:field field="orderNo"/></div></td>
                  <td width="406" align="left" class="titlebar_bg2"><div id="txtArea_space"><strong>訂購本數：</strong><pp:field field="bookNum"/></div></td>
                  <td width="130" align="left" class="titlebar_bg2"><div id="txtArea_space"><strong>建立時間</strong><pp:field field="createDate" format="yyyy/MM/dd"/></div></td>
                </tr>
                <tr>
                  <td height="105" colspan="4" align="center" valign="middle">
                  <table width="866" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                      <td width="123" height="91"><table width="123" height="91" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2">
                        <tr>
                          <td width="61" bgcolor="#FFEFCD" class="myAlbum_txtspace1">類別</td>
                          <td width="60" class="myAlbum_txtspace2"><pp:field field="productSeq" code="productKind" reload="false"/></td>
                        </tr>
                        <tr>
                          <td bgcolor="#FFEFCD" class="myAlbum_txtspace1">尺寸</td>
                          <td class="myAlbum_txtspace2"><pp:field field="pageSize"/>(<pp:field field="width"/>*<pp:field field="height"/>)</td>
                        </tr>
                        <tr>
                          <td bgcolor="#FFEFCD" class="myAlbum_txtspace1">頁數</td>
                          <td class="myAlbum_txtspace2"><pp:field field="pageNum"/></td>
                        </tr>
                        <logic:string property="skin" method="length" value="0" condition="flase">
                        <tr>
                          <td bgcolor="#FFEFCD" class="myAlbum_txtspace1">顏色</td>
                          <td class="myAlbum_txtspace2"><pp:field field="skin"/></td>
                        </tr>
                        </logic:string>
                    </table></td>
                  <td width="412" align="center" valign="middle">
                    <table width="400" height="91" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2">
                      <tr>
                        <td width="120" align="center" valign="middle">
                          <%
                          	if(path.length()>0){
                          %>
                          <img alt="" src="<%=path.replace("book.html","images/swf0001.jpg")%>" height="75" class="photoArea2"/>
                          <%
                          	}else{
                          %>
                          <logic:string property="lpicture" method="length" value="0" condition="false">
                            <img alt="" src="<%=bean.getUserParam().getString("imgSrv")%>lcover/<pp:field field="lpicture"/>" width="106" height="75" class="photoArea2"/>
                          </logic:string>
                          <logic:string property="lpicture" method="length" value="0" condition="true">
                            <img src="images/albumSize.gif" width="106" height="75" class="photoArea2" alt="">
                          </logic:string>
                          <%}%>
                        </td>
                        <td width="349" align="left"><strong>分享名稱：</strong><pp:field field="captionText"/></td>
                      </tr>
                    </table></td>
                  <td width="153"><table width="154" height="91" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2">
                        <tr>
                          <td width="74" align="right" valign="middle"><table width="61" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td height="24" align="center"><img src="images/sub_status.gif" width="61" height="17"></td>
                              </tr>
                              <tr>
                                <td height="20" align="center" class="txt_color5"><pp:field field="status" code="order2" reload="false"/></td>
                              </tr>
                          </table></td>
                          <td width="80" valign="middle">
                            <%
                            if(temp.getInt("status")!=-10 && !bean.isAdmin()&& !bean.isArt()){
                              if(temp.getInt("status")==1){
                              %>
                              	<%if(temp.getInt("version")==2){%>
                                <a href="javascript:toEdit2('<pp:field field="seq"/>');"><img src="images/icon_edit.gif" class="domroll images/icon_edit_over.gif" width="80" height="75" border="0"></a>
                                <%}else{ %>
                                <a href="javascript:toEdit('<pp:field field="seq"/>');"><img src="images/icon_edit.gif" class="domroll images/icon_edit_over.gif" width="80" height="75" border="0"></a>
                                <%}%>
                            <%}else if(temp.getInt("status")<8){%>
                            	 <%if(temp.getInt("version")==2){%>
                            	 <a href="javascript:toPreview2('<pp:field field="seq"/>');"><img src="images/icon_view.gif" class="domroll images/icon_view_over.gif" width="80" height="75" border="0"></a>
                            	 <%}else{ %>
                              	 <a href="view_main.ko?seq=<pp:field field="seq"/>"><img src="images/icon_view.gif" class="domroll images/icon_view_over.gif" width="80" height="75" border="0"></a>
                               	 <%}%>
                            <%}else{%>
                              &nbsp;
                            <%}
                            }else if(bean.isAdmin() || bean.isArt()){%>
                            	<%if(temp.getInt("version")==2){%>
                            	<a href="javascript:toEdit2('<pp:field field="seq"/>');"><img src="images/icon_edit.gif" class="domroll images/icon_edit_over.gif" width="80" height="75" border="0"></a>
                            	<%}else{ %>
                                <a href="javascript:toEdit('<pp:field field="seq"/>');"><img src="images/icon_edit.gif" class="domroll images/icon_edit_over.gif" width="80" height="75" border="0"></a>
                                <%}%>
                            <%}%>
                          </td>
                        </tr>
                      </table></td>
                      <td width="88" align="right">
                        <table width="82" height="91" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2">
                          <tr>
                            <td>
                            <%
                            if(path.length()>0){
                               %>
                               <a href="#" onClick="centerWindow('<%=path%>','viewSWF','<%=w%>','<%=h%>','scrollbars=yes')"><img src="images/icon_viewebook.gif" class="domroll images/icon_viewebook_over.gif" width="80" height="75" border="0" alt="翻頁電子相簿"></a>
                               <%
                            }
                            %>
                            </td>
                          </tr>
                      </table></td>
                      <td width="88" align="center">
                        <table width="78" height="91" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2">
                          <tr>
                            <td>
                              <%if(temp.getInt("shareStatus")==1 && (temp.getInt("swfStatus")==2 || temp.getInt("demoStatus")==1) ){ %>
                              <a href="javascript:centerWindow2('share_show.ko?orderSeq=<%=temp.getInt("seq")%>','viewSWF','1024','680','')" class="a1">電子書藝廊</a><br>
                              <%}else{ %>
                              <a href="javascript:centerWindow2('share_list.ko','viewSWF','<%=w%>','<%=h%>','scrollbars=yes')" class="a1">電子書藝廊</a><br>
                              <%}%>
                              <%if(bean.isArt()){ %>
                              	<%if( temp.getString("pdfPath").length()>0 &&FileUtil.exists(pdfPath)){%>
                              	<a href="<pp:field field="pdfPath"/>" class="a1"  target="_blank">下載PDF</a><br>
                              	<%}%>
                              	<a href="javascript:toEmail('<pp:field field="seq"/>');" class="a1">Email老師</a><br>
                              <%}else{%>
                              <%if(temp.getInt("status")==0 || temp.getInt("status")==1){%>
                              <a href="javascript:toDelete('<pp:field field="seq"/>');" class="a1">刪除相本</a><br>
                              <%}%>
                              <%if(temp.getInt("shareStatus")==0){%>
                              <a href="javascript:toOpen('<pp:field field="seq"/>','<pp:field field="captionText"/>');" class="a1">分享相本</a><br>
                              <%}else{%>
                              <a href="javascript:toClose('<pp:field field="seq"/>');" class="a1">關閉分享</a><br>
                              <%}%>
                              <%}%>
                              <%if(temp.getInt("status")==1){ %>
                              <a href="javascript:toPrint('<pp:field field="seq"/>');" class="a1">製作電子書(<%=3-temp.getInt("userMakeNumber")%>)</a>
                              <%}%>
                              <!-- <a href="javascript:toPrint('<pp:field field="seq"/>');" class="a1">我要多印</a> -->
                              <%if(bean.isArt()){ %>
                              <br><a href="javascript:toZero('<pp:field field="seq"/>');" class="a1">次數歸零</a>
                              <%}%>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <table width="864" height="32" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2 space_mtop_01">
                      <tr>
                        <td width="80" align="left" class="area_01">
                        	<a href="javascript:toRemark('<pp:field field="seq"/>');" class="a1">
                        		<img src="images/btn_pstxt.gif" width="80" height="22" border="0" 
                        		class="domroll images/btn_pstxt_over.gif" style="cursor: pointer;"/>
                        	</a>
                        </td>
                        <td align="left" class="area_01">
                        	<textarea name="tdClientRemark<pp:field field="seq"/>" rows="5" cols="90" id="tdClientRemark<pp:field field="seq"/>"><%=temp.getString("clientRemark").replaceAll("<br>","\r\n") %></textarea>
                        </td>                        
                      </tr>
                  </table>
                  </td>
                </tr>
              </table></td>
            </tr>
<%
count++;
%>
</pp:page>
<%if(count==0){
%>
<tr><td class="footer" align="center">目前您未新增相本,請按下右上角的新增相本按鈕,進行新增相本.</td></tr>
<%
}%>
            <!--________________________________________________________________-->
          </table></td>
        </tr>
      </table>
	  <table width="803" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td height="28" align="right" valign="top">
            <table width="803" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="165" class="txtArea">&nbsp;</td>
                <td width="478" align="left" class="txtArea" id="link_tag2"><pp:tlink tname="default" name="QueryOrder" npcolor="#000000" pcolor="#ff0000"/></td>
                <!-- 
                <td width="80" align="left" class="txtArea"><img src="images/icon_msg.gif" width="16" height="12" align="texttop"> <a href="mailto:mediafun@gmail.com" class="a1">我要留言</a></td>
                <td width="80" align="left" class="txtArea"><img src="images/icon_fowrd.gif" width="16" height="12" align="texttop"> <a href="#" class="a1">轉寄好友</a></td>
                 -->
              </tr>
          	</table>
          </td>
        </tr>
      </table>
      
      </td>
    </tr>
    <tr bgcolor="#f4f4f7">
    	<td> 
    		<jsp:include page="/common/client_foot.jsp" flush="true"/>
    	</td>
    </tr>
 </table>
 <Br>

<div id="dialog1">
	<textarea id="clientRemark" name="clientRemark" rows="15" cols="50" style="border:none;overflow:auto;"></textarea>
	<div class="clear">
		<input type="button" name="btnSend" value="送出" onclick="toSend();"/>
		<input type="button" name="btnCancel" value="取消" onclick="toCancel();"/>	
	</div>
</div>

<div id="dialog2">
	<table>
		<tr>
			<td width="70">
				分享名稱:
			</td>
			<td width="180">
				<html:text property="captionText" styleId="captionText"></html:text>
			</td>
		</tr>
		<tr>
			<td>
				分享類別:
			</td>
			<td>
				<html:cselect property="shareCgy" use="ShareCgy" reload="true" />
			</td>
		</tr>
		<tr>
			<td colspan="2">
				<input type="button" name="btnSend2" value="送出" onclick="toSend2();"/>
				<input type="button" name="btnCancel2" value="取消" onclick="toCancel2();"/>
			</td>
		</tr>
	</table>
</div>
</html:form>
</body>
</html:html>
<SCRIPT language="javascript" type="text/javascript">
var jsessionid = '<%=session.getId()%>';
var orderSeq = "";
function centerWindow(theURL,winName,width,height,features) {
    var window_width = width;
    var window_height = height;
    var edfeatures= features;
    var window_top = (screen.height-window_height)/2;
    var window_left = (screen.width-window_width)/2;
    newWindow=window.open(''+ theURL + '',''+ winName + '','width=' + window_width + ',height=' + window_height + ',top=' + window_top + ',left=' + window_left + ',' + features + '');
    newWindow.focus();
}
function centerWindow2(theURL,winName,width,height,features) {
    var window_width = width;
    var window_height = height;
    var edfeatures= features;
    var window_top = (screen.height-window_height)/2;
    var window_left = (screen.width-window_width)/2;
    newWindow=window.open(''+ theURL + '',''+ winName + '','width=' + window_width + ',height=' + window_height + ',top=' + window_top + ',left=' + window_left + ',scrollbars=yes,features=' + edfeatures + '');
    newWindow.focus();
}
function toEdit(seq)
{
  document.form1.seq.value = seq;
  document.form1.submit();
}

function toEdit2(seq)
{
  document.form1.seq.value = seq;
  document.form1.action = 'edit_go.ko';
  document.form1.submit();
}

function toPreview2(seq)
{
  document.form1.seq.value = seq;
  document.form1.action = 'edit_go2.ko';
  document.form1.submit();
}

function toOpen(seq,captionText)
{
	orderSeq = seq;
	$('captionText').value = captionText;
	$j("#dialog2").dialog({
		width : 400,
		height : 300,
		modal : true,
		zIndex : 999999999,
		position : ['center', 'middle'],
		draggable : false,
		title: '輸入分享資料'
	});	
	$j("#dialog2").dialog('open');
	$j(".ui-dialog-titlebar").show();	
}

function toClose(seq)
{
  if(confirm('確定關閉分享電子翻頁相本?')){
    document.form1.task.value = "close";
    document.form1.seq.value = seq;
    document.form1.action="manager_main.ko";
    document.form1.submit();
  }
}
function toZero(seq)
{
  if(confirm('確定要次數歸零?')){
    document.form1.task.value = "zero";
    document.form1.seq.value = seq;
    document.form1.action="manager_main.ko";
    document.form1.submit();
  }
}
function on_save(oj)
{
	var res = oj.responseXML;
	var result = getColumnValue(res,"result");
	var msg = getColumnValue(res,"msg");		
	if(result=="1"){
		var seq = getColumnValue(res,"seq");
		var clientRemark = getColumnValue(res,"clientRemark");		
		$('tdClientRemark'+seq).value = clientRemark;
		alert(msg);	
		toCancel();	
	}else{
		alert(msg);		
	}
	$('clientRemark').value = "";
}

function toRemark(seq) {
	orderSeq = seq;
	$j("#dialog1").dialog({
		width : 500,
		height : 480,
		modal : true,
		zIndex : 999999999,
		position : ['center', 'middle'],
		draggable : false,
		title: '輸入備註說明'
	});		
	$j("#dialog1").dialog('open');
	$j(".ui-dialog-titlebar").show();	
}

function on_toEmail(oj)
{
	var res = oj.responseXML;
	var result = getColumnValue(res,"result");
	var msg = getColumnValue(res,"msg");		
	if(result=="1"){
		var seq = getColumnValue(res,"seq");
		var email = getColumnValue(res,"email");		
		window.location.href= email;
	}else{
		alert(msg);		
	}
}

function toEmail(seq) {
  	sendAjaxData('manager_query.ko;jsessionid='+jsessionid,
        '&method=toEmail'+
        '&seq='+encodeURIComponent(seq),on_toEmail,on_toEmail);	
}

function toRemark2(bname) {
	Windows.close(bname);
		
}  	
function toDelete(seq)
{
  if(confirm('確定刪除相本?')){
    document.form1.task.value = "delete";
    document.form1.seq.value = seq;
    document.form1.action="manager_main.ko";
    document.form1.submit();
  }
}

function toPrint(seq)
{
    document.form1.task.value = "print";
    document.form1.seq.value = seq;
    document.form1.action="manager_main.ko";
    document.form1.submit();
}

function toOrder(seq)
{
  document.form1.task.value = "neworder";
  document.form1.action="<%=ConfigAgent.getConfigProperty("photo_neworder_url")%>";
  document.form1.submit();
}
var link_tag2 = document.getElementById("link_tag2");
<%
if(count!=0){
%>
var link_tag1 = document.getElementById("link_tag1");
link_tag1.innerHTML = link_tag2.innerHTML;
<%
}else{
%>
link_tag2.innerHTML = "";
<%
}
%>
domRollover();

function toSend() {
	if($F('clientRemark')==""){
		alert("未填寫備註說明!!");
		return;
	}
	sendAjaxData('manager_query.ko;jsessionid='+jsessionid,
    	'&method=save_remark'+
    	'&seq='+encodeURIComponent(orderSeq)+
    	'&clientRemark='+encodeURIComponent($F('clientRemark')),on_save,on_save);
}
function toSend2() {
	document.form1.task.value = "open";
	document.form1.seq.value = orderSeq;
	document.form1.action="manager_main.ko";
	document.form1.submit();	
}
function toCancel() {
	$j("#dialog1").dialog('close');
}
function toCancel2() {
	$j("#dialog2").dialog('close');
}
$j(function() {
	$j("#dialog1").hide();
	$j("#dialog2").hide();
	//$j("#dialog").dialog('close');
	//$j("#dialog2").dialog('close');	
});
</SCRIPT>
<pp:jsalert name="page_msg" filter="false"/>
<pp:jsalert name="page_msg" scope="agent" filter="false"/>
