<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="kplug.vo.*,java.io.*,java.util.*,org.apache.struts.util.*,org.apache.struts1.*,org.apache.struts1.util.*,org.apache.struts1.agent.*,org.w3c.dom.*,com.photo.common.*" %>
<%@taglib uri="/tags/struts-bean" prefix="bean"%>
<%@taglib uri="/tags/struts-html" prefix="html"%>
<%@taglib uri="/tags/struts-logic" prefix="logic"%>
<%@taglib uri="/tags/struts-page" prefix="pp"%>
<%
UserBean bean = (UserBean) request.getSession().getAttribute("UserBean");
XMLParam xpm = (XMLParam)SessionAgent.getData(session,"pageXpm");
NodeList aList = xpm.getNodeList("*//album");
String[] category = {"","","","","","","","","",""};
for(int i=0;i<10;i++){
  Node aNode = xpm.getNode("*//album[@id = "+i+"]");
  if(aNode!=null){
    category[i] = XMLUtil.getAttributeValue(aNode,"category");
  }
}

Param pm = (Param)request.getAttribute(org.apache.struts1.Globals.PARAM_KEY);
String goString = "";
if(pm!=null && pm.getString("from").equalsIgnoreCase("upload")){
  goString = "edit_add_pic.ko";
}else if(pm!=null && pm.getString("from").equalsIgnoreCase("photo")){
  goString = "edit_photo.ko";
}else{
  goString = "edit_caption.ko";
}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">
<html:html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=big5" />
<title>MediaFun - 相簿類別名稱修改</title>
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
<html:form name="form1" action="edit_pcategory" method="post">
<html:param/>
<html:hidden property="index" name="index"/>
<html:hidden property="from" name="from"/>
<input type="hidden" name="task" value="savepcategory">
<input type="hidden" name="ocgy0" value="<%=category[0]%>">
<input type="hidden" name="ocgy1" value="<%=category[1]%>">
<input type="hidden" name="ocgy2" value="<%=category[2]%>">
<input type="hidden" name="ocgy3" value="<%=category[3]%>">
<input type="hidden" name="ocgy4" value="<%=category[4]%>">
<input type="hidden" name="ocgy5" value="<%=category[5]%>">
<input type="hidden" name="ocgy6" value="<%=category[6]%>">
<input type="hidden" name="ocgy7" value="<%=category[7]%>">
<input type="hidden" name="ocgy8" value="<%=category[8]%>">
<input type="hidden" name="ocgy9" value="<%=category[9]%>">
<jsp:include page="/common/client_head01.jsp" flush="true">
<jsp:param name="link" value="help0.html"/>
</jsp:include>
<div id="menu">
  <table align="left" width="991" border="0" cellpadding="0" cellspacing="0" background="images/mainbar_bg.gif">
    <tr>
      <td width="14"><div class="menubar_leftbg"></div></td>
      <td width="142" class="txt_color8">&nbsp;</td>
      <td width="775" align="right">&nbsp;</td>
      <td width="60" align="right"><img src="images/mainbar_right.gif" width="60" height="34"></td>
    </tr>
  </table>
</div>
<div id="main">
  <table align="left" width="991" height="500" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
    <tr>
      <td align="center" valign="top" class="mainArea2">
      <!-- -->
        <table width="420" border="0" align="center" cellpadding="0" cellspacing="0" class="myAlbum_bg1">
        <tr>
          <td width="25" height="20" align="center" class="titlebar_bg1"><img src="images/titlebar_arrow.gif" width="25" height="20" /></td>
          <td width="253" align="center" class="titlebar_bg2">相簿類別名稱修改</td>
          <td width="140" align="left" class="titlebar_bg2">&nbsp;</td>
        </tr>
        <tr>
          <td colspan="3" align="center" valign="top" class="photoArea_space">
            <table width="400" height="250" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg2">
              <tr>
                <td width="32" height="22" align="center" bgcolor="#FFEFCD" class="txtArea">&nbsp;</td>
                <td width="368" align="left" bgcolor="#FFEFCD" class="txtArea"><strong>類別名稱</strong></td>
              </tr>
              <tr>
                <td colspan="2" align="left"><table width="400" height="250" border="0" cellpadding="0" cellspacing="0" class="txtArea15">
                    <tr>
                      <td width="32" class="txt_color5" align="center">1</td>
                      <td align="left" class="txt_color5"><input name="category0" type="text" class="boxArea10" size="60" value="<%=category[0]%>">
                      </td>
                    </tr>
                    <tr>
                      <td class="txt_color5" align="center">2</td>
                      <td align="left" class="txt_color5"><input name="category1" type="text" class="boxArea10" size="60" value="<%=category[1]%>">
                      </td>
                    </tr>
                    <tr>
                      <td class="txt_color5" align="center">3</td>
                      <td align="left" class="txt_color5"><input name="category2" type="text" class="boxArea10" size="60" value="<%=category[2]%>">
                      </td>
                    </tr>
                    <tr>
                      <td class="txt_color5" align="center">4</td>
                      <td align="left" class="txt_color5"><input name="category3" type="text" class="boxArea10" size="60" value="<%=category[3]%>">
                      </td>
                    </tr>
                    <tr>
                      <td class="txt_color5" align="center">5</td>
                      <td align="left" class="txt_color5"><input name="category4" type="text" class="boxArea10" size="60" value="<%=category[4]%>">
                      </td>
                    </tr>
                    <tr>
                      <td class="txt_color5" align="center">6</td>
                      <td align="left" class="txt_color5"><input name="category5" type="text" class="boxArea10" size="60" value="<%=category[5]%>">
                      </td>
                    </tr>
                    <tr>
                      <td class="txt_color5" align="center">7</td>
                      <td align="left" class="txt_color5"><input name="category6" type="text" class="boxArea10" size="60" value="<%=category[6]%>">
                      </td>
                    </tr>
                    <tr>
                      <td class="txt_color5" align="center">8</td>
                      <td align="left" class="txt_color5"><input name="category7" type="text" class="boxArea10" size="60" value="<%=category[7]%>">
                      </td>
                    </tr>
                    <tr>
                      <td class="txt_color5" align="center">9</td>
                      <td align="left" class="txt_color5"><input name="category8" type="text" class="boxArea10" size="60" value="<%=category[8]%>">
                      </td>
                    </tr>
                    <tr>
                      <td class="txt_color5" align="center">10</td>
                      <td align="left" class="txt_color5"><input name="category9" type="text" class="boxArea10" size="60" value="<%=category[9]%>">
                      </td>
                    </tr>
                </table></td>
              </tr>
          </table></td>
        </tr>
        <tr>
          <td height="40" colspan="3" align="center">
            <table width="400" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center"><a href="javascript:toSave();"><img src="images/btn_saveEditTxt.gif" width="100" height="24" border="0" class="domroll images/btn_saveEditTxt_over.gif" alt=""></a></td>
                <td align="center"><a href="<%=goString%>"><img src="images/btn_backeditPhoto.gif" width="100" height="24" border="0" class="domroll images/btn_backeditPhoto_over.gif" alt=""></a></td>
              </tr>
          </table></td>
        </tr>
      </table></td>




    <!-- -->
    </tr>
  </table>
</div>
<jsp:include page="/common/client_foot.jsp" flush="true"/>
</html:form>
</body>
</html:html>

<SCRIPT language=javascript type=text/javascript>
function toSave(){
  document.form1.submit();
}
domRollover();
</SCRIPT>
<pp:jsalert name="page_msg"/>
