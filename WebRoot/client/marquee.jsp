<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<marquee direction='left' scrollamount='2' id="news" style="height:22px;width:100%;" onmouseover="news.stop();" onmouseout="news.start();">
	<s:iterator value="list" id="news">
		<s:property value="%{#news.map.title}"/>&nbsp;
	</s:iterator>
</marquee>