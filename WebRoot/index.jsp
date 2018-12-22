<%@ page import="com.liane.util.SystemAgent" %>
<%@page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="k" uri="/struts-kker" %>
<!DOCTYPE html>
<html xml:lang="zh-CN" lang="zh-CN">
<title><%=kplug.db.ConfigAgent.getConfigValue("title")%>
</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<script type="text/javascript" src="/javascripts/jquery-1.11.2.min.js"></script>
<link href="css/admin_login.css" rel="stylesheet" type="text/css">
</head>
<body BGCOLOR="#FFFFFF" LINK="#330000" VLINK="#663300" ALINK="#CCCCCC" leftmargin="100" topmargin="50" marginwidth="100" marginheight="50">
<form name="form1" action="login.action" method="post">
	<P>
	<table WIDTH="58%" BORDER="1" align="center" CELLPADDING="0" cellspacing="0" bordercolor="#FFFFFF" bgcolor="#FFFFFF">
		<tr>
			<td height="399" align="left" VALIGN=top bordercolor="#999999">
				<div id="plNews" style="text-align: center;font-size: 16pt">
				</div>
				<table width=607 border=0 cellPadding=5 cellSpacing=0 bgcolor="#FFFFFF" id=table23>
					<tbody>
					<%
						com.liane.util.SystemAgent.set("liane_hot", "" + (com.liane.util.SystemAgent.getInt("liane_hot") + 1));
					%>
					<TR>
						<TD width=512>
							<h3>
								<font color="#003300" face="Verdana, Arial, Helvetica, sans-serif">Welcome to Lian-e datebase program</font>
							</h3>(瀏覽人數: <%=com.liane.util.SystemAgent.getInt("liane_hot")%>)
						</TD>
						<TD width=49 class="10p">
							<div align="right">回首頁</div>
						</TD>
						<TD width=19>
							<a href="index.htm">
								<img src="images/menu-icon-home.gif" width="18" height="18" border="0">
							</a>
						</TD>
					</TR>
					<tr>
						<td height="400" colspan="3">
							<H3>
								<font face="細明體">
									<img src="images/login.jpg" width="600" height="300">
								</font>
							</H3>
							<H3>
								<font color="#003300" size="2" face="細明體">各位使用者請您先輸入ID後，才能進入查詢系統。</font>
							</H3>
							<table cellSpacing="10" cellPadding="0" width="100%" border="0">
								<tbody>
								<tr>
									<td style="text-align: center">帳號: <input type="text" name="userId" maxlength="20" size="19" value="" style="width: 200px" autocomplete="new-password">
									</td>
								</tr>
								<tr>
									<td style="text-align: center">密碼: <input type="password" name="userPwd" maxlength="20" value="" style="width: 200px" autocomplete="new-password">
									</td>
								</tr>
								<tr>
									<td style="text-align: center">
										<input type="submit" name="submit" class="btn-blue" value="登入"/>&nbsp;
										<input type="reset" name="submit" class="btn-blue" value="清除"/>
									</td>
								</tr>
								</tbody>
							</table>
						</td>
					</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</table>
	</P>
</form>
</body>
<script language="javascript" type="text/javascript">
	$(function () {
		$('#plNews').load('marquee.action', {
			index: 1,
			r: new Date().getTime()
		}, function () {
		});
	});
</script>
</html>
