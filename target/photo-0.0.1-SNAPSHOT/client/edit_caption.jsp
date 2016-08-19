<%@page contentType="text/html; charset=UTF-8"%>
<%@page import="kplug.vo.*,java.io.*,java.util.*,org.apache.struts.util.*,org.apache.struts1.*,org.apache.struts1.util.*,org.apache.struts1.agent.*,org.w3c.dom.*,com.photo.common.*" %>
<%@taglib uri="/tags/struts-bean" prefix="bean"%>
<%@taglib uri="/tags/struts-html" prefix="html"%>
<%@taglib uri="/tags/struts-logic" prefix="logic"%>
<%@taglib uri="/tags/struts-page" prefix="pp"%>
<%
	UserBean bean = (UserBean) request.getSession().getAttribute("UserBean");
XMLParam xpm = (XMLParam)SessionAgent.getData(session,"pageXpm");
int pix = 800;//
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">
<html:html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<script language="javascript" type="text/javascript" src="js/chrisdomroll.js"></script>
<title><%=org.apache.struts1.agent.ConfigAgent.getConfigProperty("photo_title")%> - 照片管理</title>
<link href="css/editphoto.css" rel="stylesheet" type="text/css">
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
<html:form name="form1" action="edit_caption" method="post">
<html:param/>
<html:hidden property="index" name="index"/>
<input type="hidden" name="task" value="savecaption">
<input type="hidden" name="actions" value="">
<input type="hidden" name="data" value="">
<jsp:include page="/common/client_head01.jsp" flush="true">
<jsp:param name="link" value="help0.html"/>
</jsp:include>
<div id="menu">
  <table align="left" width="991" border="0" cellpadding="0" cellspacing="0" background="images/mainbar_bg.gif">
    <tr>
      <td width="14" class="menubar_leftbg">&nbsp;</td>
      <td width="142"><img src="images/sub_editphoto.gif" width="142" height="26"></td>
      <td width="740" align="right">&nbsp;</td>
      <td width="95" align="right"><img src="images/mainbar_right.gif" width="60" height="34"></td>
    </tr>
  </table>
</div>
 <div id="main">
<table width="991" height="500" border="0" align="left" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
    <tr>
      <td align="center" valign="top" class="mainArea2">
	  <table width="960" height="465" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td width="80" height="35" align="right" valign="middle"><img src="images/sub_photoitem.gif" width="73" height="22"></td>
          <td width="107" align="right" valign="top" class="photoArea_space">
            <select id="nowCategory" name="nowCategory" class="boxArea5" onchange="toCategory()">
              <option value="ALL">全部</option>
              <%
              String nowCategory = xpm.getAttributeValue("root","category");
              if(nowCategory.length()==0){
                nowCategory = "ALL";
              }
              NodeList aList = xpm.getNodeList("*//album");
              for(int i=0;i<aList.getLength();i++){
                Node aNode = aList.item(i);
                String category = XMLUtil.getAttributeValue(aNode,"category");
                if(category.length()==0){
                  continue;
                }
                String selected="";
                if(nowCategory.equals(category)){
                  selected = "selected";
                }
                %>
                <option value="<%=category%>" <%=selected%>><%=category%></option>
                <%
              }
              %>
            </select>
          </td>
          <td width="100" align="right" valign="middle" class="txtArea6"> <a href="edit_pcategory.ko?task=init_pcgy" class="a3"> 照片類別設定</a> </td>
          <td width="488" align="right" valign="middle" class="txtArea6" id="link_tag1"></td>
          <td width="205" align="right" valign="middle">
            <table width="205" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td><a href="javascript:toSave();"><img src="images/btn_saveEditTxt.gif" width="100" height="24" border="0" class="domroll images/btn_saveEditTxt_over.gif"></a></td>
              <td width="105" align="right"><span class="txtArea6"><a href="edit_photo.ko?back=back"><img src="images/btn_backeditPhoto.gif" width="100" height="24" border="0" class="domroll images/btn_backeditPhoto_over.gif"></a></span></td>
            </tr>
          </table></td>
        </tr>
        <tr>
          <td height="430" colspan="5" valign="top">
            <table width="803" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td height="132" align="right" valign="top"><table width="960" height="125" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg1">
                <tr>
                  <td width="25" height="20" align="center" class="titlebar_bg1"><img src="images/titlebar_arrow.gif" width="25" height="20"></td>
                  <td width="281" align="left" class="titlebar_bg2"><div id="txtArea_space"><strong>編輯照片內文</strong></div></td>
                  <td width="493" align="left" class="titlebar_bg2">&nbsp;</td>
                  <td width="159" align="left" class="titlebar_bg2">&nbsp;</td>
                </tr>
                <tr>
                  <td height="410" colspan="4" align="left" valign="top">
                    <table width="952" border="0" cellpadding="0" cellspacing="0" class="photoArea_space2">
                    <tr>
                    <%
                    int i = 0;
                    %>
                    <pp:page scope="session" name="QueryOderPic" psize="16" gsize="8" temp="photo_manager">
                    <%
                    Param temp = (Param)request.getAttribute(Globals.PAGE_PARAM_TEMP);
                    String caption  = temp.getString("caption");
                    if(xpm.getNode("*//album/pic[@seq="+temp.getInt("seq")+"]")!=null){
                      caption = xpm.getNodeValue("*//album/pic[@seq="+temp.getInt("seq")+"]");
                    }
                    float w = temp.getFloat("lwidth");
                    float h = temp.getFloat("lheight");
                    int width=0,height=0,max=0;
                    if(w>h){
                      max = temp.getInt("hwidth");
                      width = 90 ;
                      height = Math.round((90/w)*h);
                    }else{
                      max = temp.getInt("hheight");
                      height = 90 ;
                      width = Math.round((90/h)*w);
                    }
                    %>
                      <td align="right" valign="top">
                        <input type="hidden" id="seq<%=i%>" name="seq<%=i%>" value="<%=temp.getInt("seq")%>">
                        <table width="112" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg4">
                          <tr>
                            <td width="26" height="25" align="center" valign="middle" bgcolor="#FFEFCD"></td>
                            <td width="84" align="right" bgcolor="#FFEFCD">
                            <%if(max < pix){ %><img src="images/icon_lowdpi.gif" width="23" height="18" alt="解析度不足"><%} %>
                            <%
                            if(xpm.getNode("*//rect[@seq="+temp.getLong("seq")+"]")!=null || xpm.getNode("*//imager[@viewID="+temp.getLong("seq")+"]")!=null){
                            %>
                            <img src="images/icon_used.gif" width="23" height="18" alt="圖片已使用">
                            <%}%>
                            </td>
                          </tr>
                          <tr>
                            <td height="100" colspan="2" align="center" valign="middle"><img alt="" id="p0" src="<pp:field field="lpic"/>" width="<%=width%>" height="<%=height%>"/></td>
                          </tr>
                          <tr>
                            <td colspan="2" align="left" valign="middle" class="txtArea12">照片類別</td>
                          </tr>
                          <tr>
                            <td height="18" colspan="2" align="left" valign="top">
                            <select name="category<%=i%>" class="boxArea7" id="category<%=i%>">
                            <%
                            for(int j=0;j<aList.getLength();j++){
                              Node aNode = aList.item(j);
                              String category = XMLUtil.getAttributeValue(aNode,"category");
                              if(category.length()==0){
                                continue;
                              }
                              String selected="";
                              if(temp.getString("category").equals(category)){
                                selected = "selected";
                              }
                              %>
                              <option value="<%=category%>" <%=selected%>><%=category%></option>
                              <%
                              }%>
                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td height="60" colspan="2" align="left" valign="top">
                              <textarea id="caption<%=i%>" name="caption<%=i%>" cols="30" rows="3" class="boxArea8"><%=caption%></textarea>
                            </td>
                          </tr>
                      </table></td>
                      <%
                      i++;
                      if(i%8==0){
                        out.println("</tr><tr>");
                      }
                      %>
                    </pp:page>
                    <%
                    while(i%8 !=0)
                    {
                    %>
                      <td align="right" valign="top">
                        <table width="112" border="0" cellpadding="0" cellspacing="0" class="myAlbum_bg4">
                          <tr>
                            <td width="26" height="25" align="center" valign="middle" bgcolor="#FFEFCD"></td>
                            <td width="84" align="right" bgcolor="#FFEFCD"></td>
                          </tr>
                          <tr>
                            <td height="100" colspan="2" align="center" valign="bottom"></td>
                          </tr>
                          <tr>
                            <td colspan="2" align="left" valign="middle" class="txtArea12"></td>
                          </tr>
                          <tr>
                            <td height="18" colspan="2" align="left" valign="top"></td>
                          </tr>
                          <tr>
                            <td height="85" colspan="2" align="left" valign="top"></td>
                          </tr>
                      </table></td>
                      <%
                      i++;
                    }
                    if(i==0){%>
                    <td align="center"><br /><br /><br />此類別沒任何照片,請觀看其他類別(左上角可選觀看類別)或上傳照片</td>
                    <%}
                    %>
                    </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
          </table></td>
        </tr>
      </table>
	  <table width="960" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td height="28" align="right" valign="middle"><table width="960" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="90" align="left" class="txtArea"><img src="images/icon_lowdpi.gif" width="23" height="18" align="absbottom">解析度不足</td>
                <td width="62" align="left" class="txtArea"><img src="images/icon_used.gif" width="23" height="18" align="absbottom">已使用</td>
                <td width="648" align="left" class="txtArea" id="link_tag2"><pp:tlink  tname="default" name="QueryOderPic" npcolor="#000000" pcolor="#ff0000"/></td>
                <!-- 
                <td width="80" align="left" class="txtArea"><img src="images/icon_msg.gif" width="16" height="12" align="texttop"> <a href="mailto:mediafun@gmail.com" class="a1">我要留言</a></td>
                <td width="80" align="left" class="txtArea"><img src="images/icon_fowrd.gif" width="16" height="12" align="texttop"> <a href="#" class="a1">轉寄好友</a></td>
                 -->
              </tr>
          </table></td>
        </tr>
      </table></td>
    </tr>
    <Tr>
    	<td>
    	<jsp:include page="/common/client_foot.jsp" flush="true"/>
    	</td>
    </Tr>    
 </table>
</div>
</html:form>
</body>
</html:html>
<SCRIPT language=javascript type=text/javascript>
var link_tag1 = document.getElementById("link_tag1");
var link_tag2 = document.getElementById("link_tag2");
link_tag1.innerHTML = link_tag2.innerHTML;
link_tag2.innerHTML = "";
function toSave(){
  var data = getData();
  document.form1.data.value = data;
  document.form1.submit();
}

function toNext()
{
  var data = getData();
  document.form1.data.value = data;
  document.form1.task.value = "page";
  document.form1.actions.value = "next";
  document.form1.submit();
}
function toPre()
{
  var data = getData();
  document.form1.data.value = data;
  document.form1.task.value = "page";
  document.form1.actions.value = "pre";
  document.form1.submit();
}
function getData(){
    var data = '<?xml version="1.0" encoding="UTF-8"?><root>';
    var i=0;
    while(document.getElementById("seq"+i)!=null){
      var seq = document.getElementById("seq"+i);
      var category = document.getElementById("category"+i)
      var caption = document.getElementById("caption"+i);
      data+='<pic seq="'+seq.value+'" category="'+category.value+'">'+foreignCharFilter(caption.value)+'</pic>';
      i++;
    }
    data+='</root>';
    return data;
}
function foreignCharFilter(st) {
  var newSt = "";
  for (var i=0; i<st.length; i++) {
    var aChar = st.charAt(i);
    if(aChar=='\\' || aChar=='\''){
    }else{
      newSt += aChar;
    }
  }
  return newSt;
}
function toCategory()
{
    document.form1.task.value = "changecategory";
    document.form1.submit();
}
domRollover();
</SCRIPT>
