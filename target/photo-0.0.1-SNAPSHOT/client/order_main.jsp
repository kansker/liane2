<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="kplug.vo.*,java.io.*,java.util.*,org.apache.struts.util.*,org.apache.struts1.*,org.apache.struts1.util.*,org.apache.struts1.agent.*,org.w3c.dom.*,com.photo.common.*" %>
<%@taglib uri="/tags/struts-bean" prefix="bean"%>
<%@taglib uri="/tags/struts-html" prefix="html"%>
<%@taglib uri="/tags/struts-logic" prefix="logic"%>
<%@taglib uri="/tags/struts-page" prefix="pp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">
<html:html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title><%=org.apache.struts1.agent.ConfigAgent.getConfigProperty("photo_title")%> - 選擇產品種類</title>
<link href="css/editphoto.css" rel="stylesheet" type="text/css">
<script language="javascript" type="text/javascript" src="js/chrisdomroll.js"></script>
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
</head>
<body onLoad="MM_preloadImages('images/btn_myalbum_over.gif','images/btn_logout_over.gif','images/btn_support_over.gif')">
<html:form name="form1" action="order_step01" method="post">
  <html:param/>
  <pp:token method="POST"/>
  <input type="hidden" name="task" value="new">
<jsp:include page="/common/client_head02.jsp" flush="true">
<jsp:param name="link" value="help0.html"/>
</jsp:include>
<div id="menu">
  <table align="left" width="991" border="0" cellpadding="0" cellspacing="0" background="images/mainbar_bg.gif">
    <tr>
      <td width="60"><img src="images/mainbar_left.gif" width="60" height="34"></td>
      <td width="82">&nbsp;</td>
      <td width="754" align="left"><table width="546" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="182"><img src="images/btn_step1_over.gif" width="182" height="34" border="0"></td>
          <td width="182"><img src="images/btn_step2.gif" width="182" height="34" border="0"></td>
          <td width="182"><img src="images/btn_step3.gif" width="182" height="34" border="0"></td>
        </tr>
      </table></td>
      <td width="95" align="right"><img src="images/mainbar_right.gif" width="60" height="34"></td>
    </tr>
  </table>
</div>
 <div id="main">
<table width="991" height="500" border="0" align="left" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
    <tr>
      <td align="center" valign="top" class="mainArea2">
	  <table width="803" height="465" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td width="120" height="35" align="right" valign="middle"><img src="images/sub_addAlbum.gif" width="106" height="22"></td>
          <td width="578" align="left" valign="middle" class="txt_color8">※ 製作過程無需支付費用，編輯完成並送出訂購單後，才需線上付款。(圖體將由業務人員跟您連絡及收費)</td>
          <td width="105" align="right" valign="middle"><a href="javascript:toStep01();"><img src="images/btn_next.gif" width="100" height="24" border="0" class="domroll images/btn_next_over.gif"></a></td>
        </tr>
        <tr>
          <td height="430" colspan="4" valign="top"><table width="803" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td height="66" align="right" valign="top"><table width="790" height="216" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg1">
                <tr>
                  <td width="25" height="20" align="center" class="titlebar_bg1"><img src="images/titlebar_arrow.gif" width="25" height="20"></td>
                  <td width="107" align="left" class="titlebar_bg2"><div id="txtArea_space"><strong>選擇產品種類 </strong></div></td>
                  <td width="656" align="left" class="titlebar_bg2"><div class="txt_color9" id="txtArea_space">請先選擇您要的產品型式：精裝、平裝的印刷方式，或是沖印方式</div></td>
                </tr>
                <tr>
                  <td height="98" colspan="3" align="center" valign="top">
                    <table width="776" border="0" cellspacing="0" cellpadding="0">
<pp:page scope="session" name="QueryShowProductKinds" mode="all">
<%
Param temp = (Param)request.getAttribute(Globals.PAGE_PARAM_TEMP);
String content= "";
if(content.length()==0){
  content = temp.getString("content").replaceAll("\r\n","<br>").replace("'","");
}
%>
                      <tr>
                        <td height="127" valign="bottom">
                          <table width="776" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td height="91">
                                <table width="776" height="120" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2">
                                  <tr>
                                   <td width="24" align="right" valign="middle" bgcolor="#FFEFCD"><input name="productKind" type="radio" value="<pp:field field="seq"/>"></td>
                                    <td width="60" align="center" valign="middle" bgcolor="#FFEFCD"><img src="preview/<pp:field field="captionPic"/>" width="60" height="89" alt=""></td>
                                    <td width="350" align="center" valign="middle"><img src="preview/<pp:field field="preview"/>" height="116" alt=""></td>
                                    <td width="340" align="left" valign="middle" class="txtArea16">
                                      <%=content%></td>
                                  </tr>
                                </table></td>
                            </tr>
                          </table></td>
                      </tr>
</pp:page>
                  </table></td>
                </tr>
                <tr>
                  <td colspan="3">&nbsp;</td>
                </tr>
              </table></td>
            </tr>
            <tr>
              <td height="66" align="center"><img src="images/spec.gif" width="458" height="271"></td>
            </tr>

          </table></td>
        </tr>
      </table>
      <!-- 
	  <table width="803" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td height="28" align="right" valign="middle"><table width="803" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="165" class="txtArea">&nbsp;</td>
                <td width="478" align="left" class="txtArea">&nbsp;</td>
                <td width="80" align="left" class="txtArea"><img src="images/icon_msg.gif" width="16" height="12" align="texttop"> <a href="mailto:mediafun@gmail.com" class="a1">我要留言</a></td>
                <td width="80" align="left" class="txtArea"><img src="images/icon_fowrd.gif" width="16" height="12" align="texttop"> <a href="#" class="a1">轉寄好友</a></td>
              </tr>
          </table></td>
        </tr>
      </table> --></td>
    </tr>
    <tr><td>
    <jsp:include page="/common/client_foot.jsp" flush="true"/>
    </td></tr>
 </table>
 
</div>

</html:form>
</body>
</html:html>
<SCRIPT language=javascript type=text/javascript>
function toStep01(){
  document.form1.task.value = "size";
  document.form1.submit();
}
<%
Param pm = (Param)request.getAttribute(Globals.PARAM_KEY);
%>
productKind = document.form1.productKind;
if(productKind.length==null){
  if(productKind.value == '<%=pm.getString("productKind")%>'){
    productKind.checked = true;
  }
}
var i = 0;
for(i = 0; i < productKind.length; i++){
  if (productKind[i].value == '<%=pm.getString("productKind")%>'){
	productKind[i].checked = true;
  }
}

domRollover();
</SCRIPT>
<pp:jsalert name="page_msg"/>
