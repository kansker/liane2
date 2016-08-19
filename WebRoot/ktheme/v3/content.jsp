<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="k" uri="/struts-kker"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<!DOCTYPE html>
<html lang="zh-Hans-CN">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="expires" content="0"> 
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="Sentir, Responsive admin and dashboard UI kits template">
		<title><%=kplug.db.ConfigAgent.getConfigValue("title")%></title>
		<link rel="stylesheet" type="text/css" href="<s:url value='/javascripts/bootstrap/bootstrap.min.css' />"/>
		<link rel="stylesheet" type="text/css" href="<s:url value='/javascripts/bootstrap/bootstrap.min.css' />"/>
		<link rel="stylesheet" type="text/css" href="<s:url value='/javascripts/bootstrap/bootstrap-table.css' />"/>
		<link rel="stylesheet" type="text/css" href="<s:url value='/javascripts/bootstrap/bootstrap-datepicker3.min.css' />"/>
		<link rel="stylesheet" type="text/css" href="<s:url value='/javascripts/bootstrap/bootstrap-dialog.css' />"/>
		
		
		<link rel="stylesheet" type="text/css" href="<s:url value='javascripts/bootstrap/font-awesome/css/font-awesome.min.css' />"/>
		<link rel="stylesheet" type="text/css" href="<s:url value='/javascripts/multiselect/css/bootstrap-multiselect.css' />"/>
		<link rel="stylesheet" type="text/css" href="<s:url value='/javascripts/fancybox/jquery.fancybox.css' />"/>
		
		<script type="text/javascript" src="<s:url value='/javascripts/jquery-1.11.2.min.js'/>"></script>
		<script type="text/javascript" src="<s:url value='/javascripts/bootstrap/bootstrap.min.js'/>"></script>		
	   	<script type="text/javascript" src="<s:url value='/javascripts/bootstrap/bootstrap-table.js' />"></script>
	   	<script type="text/javascript" src="<s:url value='/javascripts/bootstrap/locale/bootstrap-table-zh-TW.js' />"></script>
	   	<script type="text/javascript" src="<s:url value='/javascripts/bootstrap/bootstrap-datepicker.min.js' />"></script>		
	   	<script type="text/javascript" src="<s:url value='/javascripts/bootstrap/bootstrapValidator.min.js' />"></script>
	   	<script type="text/javascript" src="<s:url value='/javascripts/bootstrap/bootstrap-dialog.js' />"></script>
	    <script type="text/javascript" src="<s:url value='/javascripts/multiselect/js/bootstrap-multiselect.js' />"></script>	
	    <script type="text/javascript" src="<s:url value='/javascripts/fancybox/jquery.fancybox.pack.js' />"></script>
	   	<script type="text/javascript" src="<s:url value='/ktag.action' />"></script>	
	</head>
	<body>
		<tiles:insertAttribute name="body" />
	</body>
</html>