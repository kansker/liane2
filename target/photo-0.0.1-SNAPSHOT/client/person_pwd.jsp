<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="kplug.vo.*,java.io.*,java.util.*,org.apache.struts.util.*,org.apache.struts1.*,org.apache.struts1.util.*,org.apache.struts1.agent.*,org.w3c.dom.*,com.photo.common.*" %>
<%@taglib uri="/tags/struts-bean" prefix="bean"%>
<%@taglib uri="/tags/struts-html" prefix="html"%>
<%@taglib uri="/tags/struts-logic" prefix="logic"%>
<%@taglib uri="/tags/struts-page" prefix="pp"%>
<%
	UserBean bean = (UserBean)request.getSession().getAttribute("UserBean");
Param userPm = bean.getUserParam();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">
<html:html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=big5" />
<title><%=org.apache.struts1.agent.ConfigAgent.getConfigProperty("photo_title")%> - 個人資料</title>
<link href="css/editphoto.css" rel="stylesheet" type="text/css">
<script language="javascript" type="text/javascript" src="js/chrisdomroll.js"></script>
<script language="javascript" type="text/javascript" src="js/pupdate3.js"></script>
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
<html:form name="form1" action="person_pwd" method="post">
<pp:token method="POST"/>
<input type="hidden" name="task" value="updatepwd">
<html:param/>
<jsp:include page="/common/client_head02.jsp" flush="true">
<jsp:param name="link" value="help0.html"/>
</jsp:include>
<div id="menu">
  <table align="left" width="991" border="0" cellpadding="0" cellspacing="0" background="images/mainbar_bg.gif">
    <tr>
      <td width="14"><div class="menubar_leftbg"></div></td>
      <td width="142">我的個人資料<!--<img src="images/sub_myAlbum.gif" width="142" height="26" alt="">--></td>
      <td width="775" align="center">
      &nbsp;
      </td>
      <td width="60" align="right"><img src="images/mainbar_right.gif" width="60" height="34"></td>
    </tr>
  </table>
</div>
 <div id="main">
<table width="991" height="500" border="0" align="left" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
    <tr>
      <td align="center" valign="top" class="mainArea2">
              <!-- -->
              <table cellspacing="3" cellpadding="0">
                <TR>
                  <TD height="20" colspan="2" align="center" valign="middle" class="txtArea4 "><span class="red_star">會員密碼修改,新密碼請用六碼以上英文數字組合：</span></TD>
                </TR>
                <TR>
                  <TD height="20" class="txtArea4" align="right">帳號</TD>
                  <TD align="left" width="400"><pp:write property="userId"/></TD>
                </TR>
                <TR>
                  <TD height="20" class="txtArea4" align="right">姓名</TD>
                  <TD align="left" width="400"><pp:write property="name"/></TD>
                </TR>
                <TR>
                  <TD height="20" class="txtArea4" align="right"><span class="red_star">* </span>舊密碼</TD>
                  <TD align="left"><html:param disabled="true"/><html:password property="oldUserPwd" maxlength="40" view="舊密碼" validator="required" styleClass="boxSize1"/></TD>
                </TR>
                <TR>
                  <TD height="20" class="txtArea4" align="right"><span class="red_star">* </span>新密碼</TD>
                  <TD align="left"><html:password property="userPwd" maxlength="40" view="新密碼" validator="required" styleClass="boxSize1"/></TD>
                </TR>
                <TR>
                  <TD height="20" class="txtArea4"><DIV align="right"><span class="red_star">* </span>新密碼確認</DIV></TD>
                  <TD align="left"><html:password property="userPwd2" maxlength="40" view="新密碼確認" validator="required" styleClass="boxSize1"/></TD>
                </TR>
                <TR>
                  <TD height="30" colspan="2" align="center" class="txtArea4">
                    <a href="javascript:toSend();">
                      <img height="20" alt="送出資料" width="78" src="images/btn_submit.gif" border="0"/>
                    </a>
                  </TD>
                </TR>
              </table>
              <!-- -->
	  </td>
    </tr>
 </table>
</div>
<jsp:include page="/common/client_foot.jsp" flush="true"/>
</html:form>
</body>

</html:html>
<SCRIPT language=javascript type=text/javascript>
function toSend()
{
  if(document.form1.oldUserPwd.value==""){
    document.form1.oldUserPwd.focus();
    alert("舊密碼未填寫");
    return;
  }
  if(document.form1.userPwd.value==""){
    document.form1.userPwd.focus();
    alert("新密碼未填寫");
    return;
  }
  if(document.form1.userPwd2.value==""){
    document.form1.userPwd.focus();
    alert("新密碼未填寫");
    return;
  }
  document.form1.submit();
}
domRollover();
</SCRIPT>
