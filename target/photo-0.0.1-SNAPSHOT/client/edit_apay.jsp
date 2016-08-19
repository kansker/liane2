<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="kplug.vo.*,java.io.*,java.util.*,org.apache.struts.util.*,org.apache.struts1.*,org.apache.struts1.util.*,org.apache.struts1.agent.*,org.w3c.dom.*,com.photo.common.*" %>
<%@taglib uri="/tags/struts-bean" prefix="bean"%>
<%@taglib uri="/tags/struts-html" prefix="html"%>
<%@taglib uri="/tags/struts-logic" prefix="logic"%>
<%@taglib uri="/tags/struts-page" prefix="pp"%>
<%
	UserBean bean = (UserBean) request.getSession().getAttribute("UserBean");
  	Param orderPm = bean.getOrderParam();
 	WParam seller = SellerAgent.getSeller(bean.getOrderParam().getString("GPID"));
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">
<html:html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title><%=org.apache.struts1.agent.ConfigAgent.getConfigProperty("photo_title")%> - ATM轉帳付款</title>
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
<body onLoad="MM_preloadImages('images/btn_myalbum_over.gif','images/btn_logout_over.gif','images/btn_support_over.gif')" oncontextmenu="window.event.returnValue=false" ondragstart="window.event.returnValue=false" onselectstart="event.returnValue=false">
<html:form name="form1" action="edit_confirm" method="post">
  <pp:token method="POST"/>
  <html:param/>
  <input type="hidden" name="task" value="">
  <html:hidden property="page" name="page"/>
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
      <td align="center" valign="top" class="mainArea2">
        <table width="878" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td height="13" colspan="2"></td>
        </tr>
        <tr>
          <td align="center" valign="top">
            <table width="835" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg1">
            <tr>
              <td width="25" height="20" align="center" class="titlebar_bg1"><img src="images/titlebar_arrow.gif" width="25" height="20" /></td>
              <td width="253" align="left" class="titlebar_bg2"><div id="txtArea_space"><strong>訂單編號：</strong><pp:write property="orderNo"/></div></td>
              <td width="140" align="left" class="titlebar_bg2"><div id="txtArea_space"><strong>訂購時間：</strong><pp:write property="createDate" format="yyyy/MM/dd"/></div></td>
              <td align="left" class="titlebar_bg2"></td>
              <td align="left" class="titlebar_bg2"></td>
              <td align="left" class="titlebar_bg2"></td>
            </tr>
            <tr>
              <td colspan="3" align="center" class="photoArea_space">
                <table width="400" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2" height="180">
                  <tr>
                    <td width="16" height="22" align="center" bgcolor="#FFEFCD" class="txtArea">&nbsp;</td>
                    <td width="230" align="left" bgcolor="#FFEFCD" class="txtArea"><strong>訂購資訊</strong></td>
                    <td width="154" align="center" bgcolor="#FFEFCD" class="txtArea">&nbsp;</td>
                  </tr>
                  <tr>
                    <td colspan="3" align="left">
                      <table width="400" border="0" cellpadding="0" cellspacing="0" class="txtArea14">
                        <tr>
                          <td width="70" align="right" class="txt_color5">相本類別</td>
                          <td width="150">&nbsp;&nbsp;<%=CodeAgent.getCodeValue("productKind",new Param(),false,bean.getOrderParam().getString("productKind"))%></td>
                          <td width="46" align="right"><span class="txt_color5">尺寸</span></td>
                          <td width="134">&nbsp;&nbsp;<%=bean.getOrderParam().getString("pageSize")%></td>
                        </tr>
                        <tr>
                          <td align="right" class="txt_color5">頁數</td>
                          <td align="left">&nbsp;&nbsp;<%=bean.getOrderParam().getString("pageNum")%>頁</td>
                          <td width="60" align="right" class="txt_color5"><%if(bean.getOrderParam().getString("skin").length()>0){%>書皮顏色<%}%></td>
                          <td valign="top">&nbsp;&nbsp;<%=bean.getOrderParam().getString("skin")%></td>
                        </tr>
                        <tr>
                          <td height="90" colspan="4" align="center" valign="bottom">
                            <table width="380" border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td width="181" align="center" bgcolor="#6C5E4C" class="txtArea15 color5">項目</td>
                                <td width="72" align="center" bgcolor="#6C5E4C" class="txtArea15 color5">單價</td>
                                <td width="50" align="center" bgcolor="#6C5E4C" class="txtArea15 color5">數量</td>
                                <td width="72" align="center" bgcolor="#6C5E4C" class="txtArea15 color5">小計</td>
                              </tr>
                              <tr>
                                <td align="left" bgcolor="#FFF7E5" class="txtform15">相本</td>
                                <td align="center" bgcolor="#FFF7E5" class="txtform15"><pp:write property="valuation"/></td>
                                <td align="center" bgcolor="#FFF7E5" class="txtform15"><pp:write property="bookNum"/></td>
                                <td align="center" bgcolor="#FFF7E5" class="txtform15"><%=bean.getOrderParam().getInt("bookNum")*bean.getOrderParam().getInt("valuation")%></td>
                              </tr>
                              <tr>
                                <td align="left" bgcolor="#FFF7E5" class="txtArea15">台灣島內運費</td>
                                <td align="center" bgcolor="#FFF7E5" class="txtArea15">&nbsp;</td>
                                <td align="center" bgcolor="#FFF7E5" class="txtArea15">&nbsp;</td>
                                <td align="center" bgcolor="#FFF7E5" class="txtArea15"><pp:write property="freight"/></td>
                              </tr>
                              <tr>
                                <td align="right" bgcolor="#6C5E4C" class="txtArea15 color5">&nbsp;</td>
                                <td align="right" bgcolor="#6C5E4C" class="txtArea15 color5">&nbsp;</td>
                                <td align="center" bgcolor="#6C5E4C" class="txtArea15 color5">合計</td>
                                <td align="center" bgcolor="#6C5E4C" class="txtArea15 color5"><pp:write property="total"/></td>
                              </tr>
                            </table></td>
                        </tr>
                      </table></td>
                  </tr>
                </table></td>
                <!-- -->
               <td colspan="3" align="center" class="photoArea_space">
                  <table width="400" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2" height="180">
                    <tr>
                      <td width="16" height="22" align="center" bgcolor="#FFEFCD" class="txtArea">&nbsp;</td>
                      <td width="230" align="left" bgcolor="#FFEFCD" class="txtArea"><strong>發票資訊</strong></td>
                      <td width="154" align="center" bgcolor="#FFEFCD" class="txtArea">&nbsp;</td>
                    </tr>
                    <tr>
                      <td colspan="3" align="left">
                        <table width="400" border="0" cellpadding="0" cellspacing="0" class="txtArea14">
                          <tr>
                            <td width="32" align="right" class="txt_color5"><html:radio property="invoiceType" value="1" disabled="true"/></td>
                            <td colspan="3" align="left" class="txt_color5">捐贈社福單位</td>
                          </tr>
                          <tr>
                            <td align="right" class="txt_color5"><html:radio property="invoiceType" value="2" disabled="true"/></td>
                            <td width="64" align="left" class="txt_color5">二聯發票</td>
                            <td align="left">買受人</td>
                            <td align="left" class="txtArea3">
                              <html:text property="invoiceBuyer" size="14" maxlength="50" view="買受人" validator="" styleClass="boxArea10" disabled="true"/>
                            </td>
                          </tr>
                          <tr>
                            <td align="right" class="txt_color5"><html:radio property="invoiceType" value="3" disabled="true"/></td>
                            <td align="left" class="txt_color5">三聯發票</td>
                            <td align="left">統一編號</td>
                            <td align="left" class="txtArea3">
                              <html:text property="invoiceNumber" size="14" maxlength="20" view="統一編號" validator="" styleClass="boxArea10" disabled="true"/>
                            </td>
                          </tr>
                          <tr>
                            <td align="right" class="txt_color5">&nbsp;</td>
                            <td align="left" class="txt_color5">&nbsp;</td>
                            <td width="50" align="left">發票抬頭</td>
                            <td width="254" align="left" class="txtArea3">
                              <html:text property="invoiceTitle" size="30" maxlength="100" view="發票抬頭" validator="" styleClass="boxArea10" disabled="true"/>
                            </td>
                          </tr>
                          <tr>
                            <td align="right" class="txt_color5">&nbsp;</td>
                            <td align="left" class="txt_color5">發票寄送址</td>
                            <td colspan="2" align="left">
                              <html:text property="invoiceAddress" size="52" maxlength="200" view="發票寄送址" validator="" styleClass="boxArea10" disabled="true"/>
                            </td>
                          </tr>
                        </table></td>
                    </tr>
                  </table></td>
                  <!-- -->
            </tr>
            <tr>
              <td height="20" colspan="3" align="center" valign="top" class="photoArea_space">
                <table width="400" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2">
                  <tr>
                    <td width="16" height="22" align="center" bgcolor="#FFEFCD" class="txtArea">&nbsp;</td>
                    <td width="167" align="left" bgcolor="#FFEFCD" class="txtArea"><strong>收件人資訊</strong></td>
                    <td width="201" align="right" bgcolor="#FFEFCD" class="txtArea">會員帳號：<pp:write property="userId"/></td>
                    <td width="16" bgcolor="#FFEFCD" class="txtArea">&nbsp;</td>
                  </tr>
                  <tr>
                    <td height="120" colspan="4" align="left">
                      <table width="400" border="0" cellpadding="0" cellspacing="0" class="txtArea14">
                        <tr>
                          <td width="70" align="right" class="txt_color5">收件人</td>
                          <td colspan="2" class="txtArea15"><pp:write property="userName"/></td>
                        </tr>
                        <tr>
                          <td align="right" class="txt_color5">收件地址</td>
                          <td colspan="2" class="txtArea15"><pp:write property="address"/></td>
                        </tr>
                        <tr>
                          <td align="right" class="txt_color5">E-mail</td>
                          <td width="168" class="txtArea15"><pp:write property="email"/></td>
                          <td width="162" rowspan="3" valign="top" class="txtArea15">&nbsp;</td>
                        </tr>
                        <tr>
                          <td align="right" class="txt_color5">聯絡電話</td>
                          <td class="txtArea15"><pp:write property="tel"/></td>
                        </tr>
                        <tr>
                          <td align="right" class="txt_color5">行動電話</td>
                          <td class="txtArea15"><pp:write property="mobile"/></td>
                      </tr>
                      <tr>
                        <td height="48" colspan="3" align="center" valign="bottom">
                          <table width="370" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td height="40" align="left" class="txt_color8">※ 我們將以此E-mail與手機電話與您連絡，訂單亦是依據您的帳號、密碼及填寫的E-mail資料做查詢，請務必正確填寫您的資料，謝謝！</td>
                            </tr>
                          </table></td>
                      </tr>
                      </table></td>
                  </tr>
                </table></td>
                <td height="20" colspan="3" align="center" valign="top" class="photoArea_space">
            </tr>
            <tr>
              <td height="5" colspan="6" align="center" valign="top" class="photoArea_space">
              </td>
            </tr>
            <tr>
              <td height="40" colspan="6" align="center">
                <table width="400" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="180" align="center">
                      <a href="javascript:toSend2();">
                        <img src="images/btn_submitOrder2.gif" width="80" height="22" border="0" class="domroll images/btn_submitOrder_over2.gif" alt="用ATM轉帳付款">
                      </a>
                    </td>
                  </tr>
                </table></td>
            </tr>
         </table>
        </td>
        </tr>
      </table>
      </td>
    </tr>
  </table>
</div>
<jsp:include page="/common/client_foot.jsp" flush="true"/>
</html:form>
</body>
</html:html>
<SCRIPT language=javascript type=text/javascript>
function toSend1(){
  if(confirm('確定完成編輯?')){
    document.form1.task.value = "finish1";
    document.form1.submit();
  }
}
function toSend2(){
  if(confirm('確定用ATM轉帳付款?')){
    document.form1.task.value = "finish2";
    document.form1.submit();
  }
}
function toSend3(){
  if(confirm('確定用信用卡付款?')){
    document.form1.task.value = "finish3";
    document.form1.submit();
  }
}
domRollover();
</SCRIPT>
