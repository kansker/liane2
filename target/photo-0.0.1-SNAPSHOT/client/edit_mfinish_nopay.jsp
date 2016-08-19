<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="kplug.vo.*,java.io.*,java.util.*,org.apache.struts.util.*,org.apache.struts1.*,org.apache.struts1.util.*,org.apache.struts1.agent.*,org.w3c.dom.*,com.photo.common.*" %>
<%@taglib uri="/tags/struts-bean" prefix="bean"%>
<%@taglib uri="/tags/struts-html" prefix="html"%>
<%@taglib uri="/tags/struts-logic" prefix="logic"%>
<%@taglib uri="/tags/struts-page" prefix="pp"%>
<%
	UserBean bean = (UserBean) request.getSession().getAttribute("UserBean");
  Param orderPm = bean.getOrderParam();
  Param pm = (Param) request.getAttribute(Globals.PARAM_KEY);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">
<html:html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=big5" />
<title><%=org.apache.struts1.agent.ConfigAgent.getConfigProperty("photo_title")%> - 完成交易</title>
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
<jsp:include page="/common/client_head01.jsp" flush="true">
<jsp:param name="link" value="help0.html"/>
</jsp:include>
<div id="menu">
  <table align="left" width="991" border="0" cellpadding="0" cellspacing="0" background="images/mainbar_bg.gif">
    <tr>
      <td width="14"><div class="menubar_leftbg"></div></td>
      <td width="142"><img src="images/sub_comfirmOrder.gif" width="142" height="26"></td>
      <td width="775" align="right">&nbsp;</td>
      <td width="60" align="right"><img src="images/mainbar_right.gif" width="60" height="34"></td>
    </tr>
  </table>
</div>
<div id="main">
  <table align="left" width="991" height="500" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
    <tr>
      <td align="center" valign="top" class="mainArea2"><table width="830" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td height="13"><a href="#"></a><a href="#"></a><a href="#"></a></td>
          </tr>
        <tr>
          <td width="420" height="271" align="center" valign="top"><table width="825" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg1">
            <tr>
              <td width="25" height="20" align="center" class="titlebar_bg1"><img src="images/titlebar_arrow.gif" width="25" height="20" /></td>
              <td width="389" align="left" class="titlebar_bg2"><div id="txtArea_space"><strong>訂單編號：</strong><pp:write property="orderNo"/></div></td>
              <td width="269" align="left" class="titlebar_bg2"></td>
              <td width="140" align="left" class="titlebar_bg2"><div id="txtArea_space"><strong>訂購時間：</strong><pp:write property="createDate" format="yyyy/MM/dd"/></div></td>
            </tr>
            <tr>
              <td height="20" colspan="4" align="center" valign="top" class="photoArea_space"><table width="808" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2">
                <tr>
                  <td height="22" align="center" bgcolor="#FFEFCD" class="txtArea"><strong class="txt_color8">已成功完成交易！</strong></td>
                  </tr>
                <tr>
                  <td height="62" align="center" valign="middle"><table width="790" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">感謝您的訂購，我們將於5~7個工作天內將貨品寄送至您的府上。<br>
                                      系統已發送一封交易明細至您的信箱中(若沒發現信件，可能也麻煩在垃圾信箱中找尋)，請您確實保存，如對訂購商品有任何問題，歡迎您透過訂購明細資訊做查詢！</td>
                        </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
          </table></td>
          </tr>
      </table>
      </td>
    </tr>
  </table>
</div>
<jsp:include page="/common/client_foot.jsp" flush="true"/>
</body>
</html:html>
<SCRIPT language=javascript type=text/javascript>
domRollover();
</SCRIPT>
<%
  bean.setOrderParam(null);
  SessionAgent.removeData(request, "pageXpm");
%>
