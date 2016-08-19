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
          <td width="420" height="271" align="center" valign="top">
          		 <%if(ProGlobals.product==2){%>
          		 		<table width="825" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg1">
				            <tr>
				              <td width="25" height="20" align="center" class="titlebar_bg1"><img src="images/titlebar_arrow.gif" width="25" height="20" /></td>
				              <td width="389" align="left" class="titlebar_bg2"><div id="txtArea_space"><strong>訂單編號：</strong><pp:write property="orderNo"/></div></td>
				              <td width="269" align="left" class="titlebar_bg2"></td>
				              <td width="140" align="left" class="titlebar_bg2"><div id="txtArea_space"><strong>訂購時間：</strong><pp:write property="createDate" format="yyyy/MM/dd"/></div></td>
				            </tr>
				            <tr>
				              <td height="20" colspan="4" align="center" valign="top" class="photoArea_space">
				              	<table width="808" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2">
				                <tr>
				                  <td height="22" align="center" bgcolor="#FFEFCD" class="txtArea"><strong class="txt_color8">已成功完成交易！</strong></td>
				                </tr>
				                </table>
				              </td>
				            </tr>
				        </table>
          		 <%}else{%>
			          <table width="825" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg1">
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
			                        <td align="center">感謝您的訂購，在轉帳付款後，我們將於5~7個工作天內將貨品寄送至您的府上，轉帳資訊於本頁面下方。<br>
			                          		系統已發送一封交易明細至您的信箱中(若沒發現信件，可能也麻煩在垃圾信箱中找尋)，請您確實保存，如對訂購商品有任何問題，歡迎您透過訂購明細資訊做查詢！</td>
			                        </tr>
			                  </table></td>
			                </tr>
			              </table></td>
			            </tr>
			            <tr>
			              <td colspan="2" rowspan="2" align="center" valign="top" class="photoArea_space3"><table width="400" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2">
			                <tr>
			                  <td width="16" height="22" align="center" bgcolor="#FFEFCD" class="txtArea">&nbsp;</td>
			                  <td width="230" align="left" bgcolor="#FFEFCD" class="txtArea"><strong>訂購資訊</strong></td>
			                  <td width="154" align="center" bgcolor="#FFEFCD" class="txtArea">&nbsp;</td>
			                </tr>
			                <tr>
			                  <td height="200" colspan="3" align="left" valign="top">
			                    <table width="400" border="0" cellpadding="0" cellspacing="0" class="txtArea14">
			                      <tr>
			                        <td width="70" align="right" class="txt_color5">相本類別</td>
			                        <td width="150">&nbsp;&nbsp;<%=CodeAgent.getCodeValue("productKind",new Param(),false,bean.getOrderParam().getString("productKind"))%></td>
			                        <td width="46" align="right"><span class="txt_color5">尺寸</span></td>
			                        <td width="134">&nbsp;&nbsp;<pp:write property="pageSize"/></td>
			                      </tr>
			                      <tr>
			                        <td align="right" class="txt_color5">頁數</td>
			                        <td>&nbsp;&nbsp;<pp:write property="pageNum"/>頁</td>
			                        <td align="right" width="60" class="txt_color5"><%if(bean.getOrderParam().getString("skin").length()>0){%>書皮顏色<%}%></td>
			                        <td>&nbsp;&nbsp;<pp:write property="skin"/></td>
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
			                              <td align="left" bgcolor="#6C5E4C" class="txtArea15 color5">
			                                <logic:string property="onsalesNum" method="length" value="0" condition="false">
			                                  		註:使用優惠券:<pp:write property="onsalesNum"/><br>
			                                    <%if (orderPm.getInt("onsalesType") == 0) {%>
			                                   		 優惠券打<%=bean.getOrderParam().getInt("onsalesRate")%>%折(不包含運費)
			                                    <%}else{%>
			                                    	優惠券減價<%=bean.getOrderParam().getInt("onsalesRate")%>元
			                                    <%}%>
			                                </logic:string>
			                              </td>
			                              <td align="right" bgcolor="#6C5E4C" class="txtArea15 color5">&nbsp;</td>
			                              <td align="center" bgcolor="#6C5E4C" class="txtArea15 color5">合計</td>
			                              <td align="center" bgcolor="#6C5E4C" class="txtArea15 color5"><pp:write property="total"/></td>
			                            </tr>
			                         </table>
			                        </td>
			                      </tr>
			                  </table></td>
			                </tr>
			              </table></td>
			              <td colspan="2" align="left" valign="top" class="photoArea_space"><table width="400" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2">
			                <tr>
			                  <td width="16" height="22" align="center" bgcolor="#FFEFCD" class="txtArea">&nbsp;</td>
			                  <td width="167" align="left" bgcolor="#FFEFCD" class="txtArea"><strong>收件人資訊</strong></td>
			                  <td width="201" align="right" bgcolor="#FFEFCD" class="txtArea">會員帳號：<pp:write property="userId"/></td>
			                  <td width="16" bgcolor="#FFEFCD" class="txtArea">&nbsp;</td>
			                </tr>
			                <tr>
			                  <td colspan="4" align="left" valign="top"><table width="400" border="0" cellpadding="0" cellspacing="0" class="txtArea14">
			                    <!--DWLayoutTable-->
			                      <tr>
			                        <td width="70" height="20" align="right" class="txt_color5">收件人</td>
			                        <td width="330" class="txtArea15"><pp:write property="userName"/></td>
			                      </tr>
			                      <tr>
			                        <td height="20" align="right" class="txt_color5">收件地址</td>
			                        <td class="txtArea15"><pp:write property="address"/></td>
			                      </tr>
			                      <tr>
			                        <td height="20" align="right" class="txt_color5">E-mail</td>
			                        <td valign="top" class="txtArea15"><pp:write property="email"/></td>
			                        </tr>
			                      <tr>
			                        <td height="20" align="right" class="txt_color5">聯絡電話</td>
			                        <td valign="top" class="txtArea15"><pp:write property="tel"/></td>
			                        </tr>
			                      <tr>
			                        <td height="20" align="right" class="txt_color5">行動電話</td>
			                        <td valign="top" class="txtArea15"><pp:write property="mobile"/></td>
			                        </tr>
			                  </table></td>
			                </tr>
			              </table></td>
			            </tr>
			            <tr>
			              <td colspan="2" align="left" valign="top" class="photoArea_space3"><table width="400" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2">
			                <tr>
			                  <td width="16" height="22" align="center" bgcolor="#FFEFCD" class="txtArea">&nbsp;</td>
			                  <td width="793" align="left" bgcolor="#FFEFCD" class="txtArea"><strong>發票資訊</strong></td>
			                </tr>
			                <tr>
			                  <td colspan="2" align="left">
			                    <table width="400" border="0" cellpadding="0" cellspacing="0" class="txtArea14">
			<%
			if(bean.getOrderParam().getInt("invoiceType")==1){
			%>
			                      <tr>
			                        <td width="70" align="right" class="txt_color5"></td>
			                        <td width="330">捐贈社福單位</td>
			                      </tr>
			<%
			}else if(bean.getOrderParam().getInt("invoiceType")==2){
			%>
			                      <tr>
			                        <td width="70" align="right" class="txt_color5">二聯發票</td>
			                        <td width="330">&nbsp;&nbsp;買受人：<pp:write property="invoiceBuyer"/></td>
			                      </tr>
			                      <tr>
			                        <td align="right" class="txt_color5">發票地址</td>
			                        <td>&nbsp;&nbsp;<pp:write property="invoiceAddress"/></td>
			                      </tr>
			<%
			}else if(bean.getOrderParam().getInt("invoiceType")==3){
			%>
			                      <tr>
			                        <td width="70" align="right" class="txt_color5">三聯發票</td>
			                        <td width="330" class="txtArea15">統一編號：<pp:write property="invoiceNumber"/></td>
			                      </tr>
			                      <tr>
			                        <td align="right" class="txt_color5">&nbsp;</td>
			                        <td>&nbsp;&nbsp;發票抬頭：<pp:write property="invoiceTitle"/></td>
			                      </tr>
			                      <tr>
			                        <td align="right" class="txt_color5">發票地址</td>
			                        <td>&nbsp;&nbsp;<pp:write property="invoiceAddress"/></td>
			                      </tr>
			<%
			}
			%>
			                  </table></td>
			                </tr>
			              </table></td>
			            </tr>
			            <tr>
			                  <td colspan="2" align="center" valign="top" class="photoArea_space">
			                    <table width="400" border="0" cellpadding="5" cellspacing="0" class="myAlbum_bg2" height="175">
			                      <tr>
			                        <td width="16" height="22" align="center" bgcolor="#FFEFCD" class="txtArea">&nbsp;</td>
			                        <td width="230" align="left" bgcolor="#FFEFCD" class="txtArea"><strong>付款資訊</strong></td>
			                        <td width="154" align="center" bgcolor="#FFEFCD" class="txtArea">&nbsp;</td>
			                      </tr>
			                      <tr>
			                        <td colspan="3" align="left">
			                          <table width="390" border="0" cellpadding="0" cellspacing="0" class="txtArea14">
			                            <tr>
			                              <td align="left" class="txt_color5" valign="top">
			                                1.轉帳<br>
			                               	請您就近選擇任一部金融行庫或郵局的ATM自動提款機轉帳繳款，只要輸入下列13個數字及轉帳金額，就能輕鬆完成付款：
			                                 <table width="360" border="1" cellpadding="4" cellspacing="0" class="txtArea14">
			                                   <tr>
			                                     <td align="left" class="txt_color5" valign="top">
			                                     轉帳銀行代號
			                                     </td>
			                                     <td align="left" class="txt_color8" valign="top">
			                                     006（這是合作金庫銀行代碼，共3位）
			                                     </td>
			                                   </tr>
			                                   <tr>
			                                     <td align="left" class="txt_color5" valign="top">
			                                     轉帳帳號
			                                     </td>
			                                     <td align="left" class="txt_color8" valign="top">
			                                     0855-717-167363（共13位）
			                                     </td>
			                                   </tr>
			                                 </table>
			                                2.線上付款<br>
			                               <a href='https://funcashier.sinopac.com/WebSite/Pages/Disclaimer.aspx?RID=58832&RVC=c29c4b9e-931e-4de8-b751-a1a1b0d35b03' target='_blank'><img src='https://funcashier.sinopac.com/WebSite/FunCashierBackend/images/buy_btt.png' width='174' height='66' alt='收款去' /></a>
			                               <br/>
			                                 1.	隨後我們也會將轉帳的資料mail一封到您指定的電子信箱。 <br>
			                                 2.	mediafun印象館 再次提醒您，您愈早完成付款動作，我們就能優先處理您熱騰騰的訂單喔！歡迎您再次光臨！
			                              </td>
			                            </tr>
			                          </table>
			                        </td>
			                      </tr>
			                    </table>
			                  </td>
			            </tr>
			          </table>
          		<%} %>
          
          
          </td>
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