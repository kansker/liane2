<%@ page import="com.liane.util.SystemAgent" %>
<%@page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="k" uri="/struts-kker" %>
<!DOCTYPE html>
<html>
<title><%=kplug.db.ConfigAgent.getConfigValue("title")%>
</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<link href="css/admin_login.css" rel="stylesheet" type="text/css">
<style type="text/css">
	<!--
	.p10 {
		font-family: "新細明體";
		font-size: 12px;
		font-style: normal;
		line-height: normal;
		font-weight: normal;
	}

	-->
</style>
</head>
<body bgcolor="#FFFFFF" link="#330000" vlink="#663300" alink="#CCCCCC" leftmargin="100" topmargin="50" marginwidth="100" marginheight="50">
<P>
<table WIDTH="58%" height="401" BORDER="1" align="center" CELLPADDING="0" cellspacing="0" bordercolor="#FFFFFF" bgcolor="#FFFFFF">
	<tr>
		<td height="399" align="left" VALIGN=top bordercolor="#999999">
			<table width=607 border=0 cellPadding=5 cellSpacing=0 bgcolor="#FFFFFF" id=table23>
				<tbody>
				<tr>
					<td width=512><h3><font color="#003300" face="Verdana, Arial, Helvetica, sans-serif">Welcome to Lian-e datebase program</font></h3></td>
					<td width=49 class="p10">
						<div align="right">回首頁</div>
					</td>
					<td width=19><a href="index.htm"><img src="images/menu-icon-home.gif" width="18" height="18" border="0"></a></td>
				</tr>
				<tr>
					<td height="400" colspan="3">
						<h3><font face="細明體"><img src="images/login.jpg" width="600" height="300"></font></h3>
						<table id=table24 style="BORDER-COLLAPSE: collapse" borderColor=#111111 cellSpacing=10 cellPadding=0 width="100%" border=0>
							<tbody>
							<tr align="center">
								<td>
									<img src="images/Folder.gif" width="16" height="16">
									<font color="#CC0033" face="細明體">
										<a href="cus_search2_main.action">
											病理組織切片檢查報告
										</a>
									</font></td>
								<td>
									<img src="images/Folder.gif" width="16" height="16">
									<a href="cus_search1_main.action">
										非婦科抹片檢查報告
									</a>
								</td>
								<td>
									<img src="images/Folder.gif" width="16" height="16">
									<a href="cus_search3_main.action">
										婦科抹片檢查報告單
									</a>
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
</body>
</html>
