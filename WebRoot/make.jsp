<%@ page language="java" import="java.util.*,kplug.db.*,com.photo.util.*,kplug.vo.*" pageEncoding="UTF-8"%>

<%
	WParam orderPm = new WParam();
	StringBuffer info = new StringBuffer("");

	orderPm.add("GPID", "MFCPG1");
	orderPm.add("orderNo", "1451542896-290");
	orderPm = QueryAgent.query("api_QueryOrderByOrderNo", orderPm);
	//PDFUtil2.MakePhotoPDF2(orderPm, 2);
	//PDFUtil.MakePhotoPDF(orderPm, info,2);
	FlashMaker2.make(orderPm, 0);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>KKer</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
</head>

<body>
	This is my JSP page.
	<%=info.toString()%>
	<br>
</body>
</html>
