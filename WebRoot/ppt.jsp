<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="k" uri="/struts-kker" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>病理切片</title>
	<link rel="stylesheet" type="text/css" href="/javascripts/bootstrap/bootstrap.min.css"/>
	<link rel="stylesheet" type="text/css" href="/javascripts/bootstrap/bootstrap.min.css"/>
	<link rel="stylesheet" type="text/css" href="/javascripts/bootstrap/bootstrap-table.css"/>
	<link rel="stylesheet" type="text/css" href="/javascripts/bootstrap/bootstrap-datepicker3.min.css"/>
	<link rel="stylesheet" type="text/css" href="/javascripts/bootstrap/bootstrap-dialog.css"/>
	<link rel="stylesheet" type="text/css" href="javascripts/bootstrap/font-awesome/css/font-awesome.min.css"/>
	<link rel="stylesheet" type="text/css" href="/javascripts/multiselect/css/bootstrap-multiselect.css"/>
	<link rel="stylesheet" type="text/css" href="/javascripts/fancybox/jquery.fancybox.css"/>
	<script type="text/javascript" src="/javascripts/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="/javascripts/bootstrap/bootstrap.min.js"></script>
	<script type="text/javascript" src="/javascripts/bootstrap/bootstrap-table.js"></script>
	<script type="text/javascript" src="/javascripts/bootstrap/locale/bootstrap-table-zh-TW.js"></script>
	<script type="text/javascript" src="/javascripts/bootstrap/bootstrap-datepicker.min.js"></script>
	<script type="text/javascript" src="/javascripts/bootstrap/bootstrapValidator.min.js"></script>
	<script type="text/javascript" src="/javascripts/bootstrap/bootstrap-dialog.js"></script>
	<script type="text/javascript" src="/javascripts/multiselect/js/bootstrap-multiselect.js"></script>
	<script type="text/javascript" src="/javascripts/fancybox/jquery.fancybox.pack.js"></script>
	<style type="text/css">
		<!--
		.style13 {
			font-size: 12px;
			color: #004f54;
			line-height: 20px;
		}

		.style16 {
			font-size: 12px;
			line-height: 20px;
			color: #333333;
			text-decoration: none;
			font-style: normal;
			font-weight: normal;
		}

		.style18 {
			font-size: 18pt;
			font-weight: bold;
			color: #ff8a15;
		}

		a:visited {
			color: #004F54;
		}

		a:hover {
			color: #990000;
		}

		a:link {
			color: #004F54;
		}

		a:active {
			color: #990000;
		}

		.style25 {
			line-height: 20px;
			text-decoration: none;
			font-style: normal;
			font-weight: normal;
			font-size: 16px;
			color: #0000FF;
		}

		.style27 {
			font-size: 12px;
			color: #666666;
			line-height: 20px;
		}

		-->
	</style>
	<script language="JavaScript" type="text/JavaScript">
		<!--
		function MM_preloadImages() { //v3.0
			var d = document;
			if (d.images) {
				if (!d.MM_p) d.MM_p = new Array();
				var i, j = d.MM_p.length, a = MM_preloadImages.arguments;
				for (i = 0; i < a.length; i++)
					if (a[i].indexOf("#") != 0) {
						d.MM_p[j] = new Image;
						d.MM_p[j++].src = a[i];
					}
			}
		}

		function MM_swapImgRestore() { //v3.0
			var i, x, a = document.MM_sr;
			for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) x.src = x.oSrc;
		}

		function MM_findObj(n, d) { //v4.01
			var p, i, x;
			if (!d) d = document;
			if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
				d = parent.frames[n.substring(p + 1)].document;
				n = n.substring(0, p);
			}
			if (!(x = d[n]) && d.all) x = d.all[n];
			for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
			for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
			if (!x && d.getElementById) x = d.getElementById(n);
			return x;
		}

		function MM_swapImage() { //v3.0
			var i, j = 0, x, a = MM_swapImage.arguments;
			document.MM_sr = new Array;
			for (i = 0; i < (a.length - 2); i += 3)
				if ((x = MM_findObj(a[i])) != null) {
					document.MM_sr[j++] = x;
					if (!x.oSrc) x.oSrc = x.src;
					x.src = a[i + 2];
				}
		}
		//-->
	</script>

	<script type="text/javascript">

		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', 'UA-5889518-4']);
		_gaq.push(['_trackPageview']);

		(function () {
			var ga = document.createElement('script');
			ga.type = 'text/javascript';
			ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(ga, s);
		})();

	</script>

</head>

<body>
<DIV align=center>
	<TABLE id=table5 cellSpacing=15 cellPadding=0 width=600 align=center bgColor=#FFFFFF border=0><!--DWLayoutTable-->
		<TBODY>
		<tr vAlign=top>
			<TD height="15" align="center" valign="top" bgColor=#FFFFFF
			    style="BORDER-RIGHT: #bdbdbd 1px solid; BORDER-TOP: #bdbdbd 1px solid; BORDER-LEFT: #bdbdbd 1px solid; BORDER-BOTTOM: #bdbdbd 1px solid"><a href="index.htm"><img src="image/Lianlogo.gif" width="92" height="49" border="0"></a></TD>
			<td width="594" rowspan="2" align=middle valign="top" bgColor=#ffffff>
				<TABLE id=table8 height=96 cellSpacing=0 cellPadding=0 width="587"
				       bgColor=#bdbdbd border=0>
					<TBODY>
					<TR>
						<TD width="587" height="96" align="left" valign="middle" background="image/services.jpg"
						    bgColor=#ffffff class="style18"><FONT style="FONT-SIZE: 16pt">&nbsp;</FONT></TD>
					</TR>
					</TBODY>
				</TABLE>
				<DIV align=center>
					<CENTER>
						<TABLE id=table10 cellSpacing=0 cellPadding=0 width="100%" border=0>
							<TBODY>
							<TR>
								<TD width="100%">　</TD>
							</TR>
							</TBODY>
						</TABLE>
					</CENTER>
				</DIV>
				<center>
					<table width="100%" border=1 align="center" cellPadding=3
					       cellSpacing=3 borderColor=#CCCCCC bgcolor="#FFFFFF" id=table11 style="BORDER-COLLAPSE: collapse"><!--DWLayoutTable-->
						<tbody>
						<tr>
							<td width="584" height="10" align="left" valign="middle" bordercolor="#CCCCCC" bgColor=#FFFFFF class="style13">
								病理圖像
							</td>
						</tr>
						<tr>
							<td height=247 class=content style="text-align: center;padding: 5pt;vertical-align: top">
								<table
										id="datas"
										data-toggle="table"
										data-url="ppt_datas.action"
										data-toolbar="#get"
										data-pagination="true"
										data-side-pagination="server"
										data-page-list="[5, 10, 20, 50, 100, 200]"
										data-search="false"
										data-toolbar="#custom-toolbar"
										data-query-params="queryParams"
								>
									<thead>
									<tr>
										<th data-field="title" data-align="center" data-sortable="true">名稱</th>
										<th data-field="operate" data-formatter="operateFormatter" data-events="operateEvents" data-align="left">功能</th>
									</tr>
									</thead>
								</table>
							</td>
						</tr>
						</tbody>
					</table>
				</center>
			</td>
		</tr>
		<tr vAlign=top>
			<td width=113 height="266" valign="top" bgColor=#FFFFFF style="BORDER-RIGHT: #bdbdbd 1px solid; BORDER-TOP: #bdbdbd 1px solid; BORDER-LEFT: #bdbdbd 1px solid; BORDER-BOTTOM: #bdbdbd 1px solid">
				<table width="100%" border=0 align="center" cellPadding=0 cellSpacing=0 bgcolor="#FFFFFF" id=table2>
					<tbody>
					<tr align="center" valign="middle" bgcolor="#FFFFFF">
						<TD height="8" colspan="3"><FONT color=#1032c6><IMG height=8 src="image/BLank3.gif" width=111></FONT></TD>
					</tr>
					<tr onmouseover=" this.style.backgroundColor='#ff8a15'" onmouseout="MM_swapImgRestore(); this.style.backgroundColor=''">
						<TD width="13">　</TD>
						<TD width=26><IMG id=m1 height=12 src="image/point04.gif" width=12 name=m1></TD>
						<TD width="72" align="left" valign="middle"><a class=style13
						                                               href="index2.htm">中心簡介</a></TD>
					</tr>
					<tr>
						<TD><img height=10 src="image/blank.gif" width=10></TD>
						<TD width=26><IMG height=10 src="image/blank.gif" width=10></TD>
						<TD><IMG height=10 src="image/blank.gif" width=10></TD>
					</tr>
					<TR onmouseover="MM_swapImage('m2','','/company/images/arrow_on.gif',1); this.style.backgroundColor='#ff8a15'" onmouseout="MM_swapImgRestore(); this.style.backgroundColor=''">
						<TD><a href="member.htm"></a></TD>
						<TD width=26><IMG id=m1 height=12 src="image/point04.gif" width=12 name=m1></TD>
						<TD align="left" valign="middle"><a class=style13 href="member.htm">組織架構</a></TD>
					</TR>
					<TR>
						<TD><IMG height=10 src="image/blank.gif" width=10></TD>
						<TD width=26><IMG height=10 src="image/blank.gif" width=10></TD>
						<TD><IMG height=10 src="image/blank.gif" width=10></TD>
					</TR>
					<TR onmouseover="MM_swapImage('m3','','/company/images/arrow_on.gif',1); this.style.backgroundColor='#ff8a15'"
					    onmouseout="MM_swapImgRestore(); this.style.backgroundColor=''">
						<TD><a href="services.htm"></a></TD>
						<TD width=26><IMG id=m1 height=12 src="image/point04.gif" width=12 name=m1></TD>
						<TD align="left" valign="middle"><a class=style13 href="services1.htm">服務內容</a></TD>
					</TR>
					<TR>
						<TD><IMG height=10 src="image/blank.gif" width=10></TD>
						<TD width=26><IMG height=10 src="image/blank.gif" width=10></TD>
						<TD><IMG height=10 src="image/blank.gif" width=10></TD>
					</TR>
					<TR onmouseover="MM_swapImage('m7','','/company/images/arrow_on.gif',1); this.style.backgroundColor='#ff8a15'"
					    onmouseout="MM_swapImgRestore(); this.style.backgroundColor=''">
						<TD>　</TD>
						<TD width=26><IMG id=m1 height=12 src="image/point04.gif" width=12 name=m1></TD>
						<TD align="left" valign="middle"><a class=style13 href="ppt.htm">病理圖像</a></TD>
					</TR>
					<TR>
						<TD><IMG height=10 src="image/blank.gif" width=10></TD>
						<TD width=26><IMG height=10 src="image/blank.gif" width=10></TD>
						<TD><IMG height=10 src="image/blank.gif" width=10></TD>
					</TR>
					<TR onmouseover="MM_swapImage('m8','','/company/images/arrow_on.gif',1); this.style.backgroundColor='#ff8a15'" onmouseout="MM_swapImgRestore(); this.style.backgroundColor=''">
						<TD>　</TD>
						<TD width=26><IMG id=m1 height=12 src="image/point04.gif" width=12 name=m1></TD>
						<TD align="left" valign="middle"><a class=style13 href="index.jsp">資料查詢</a></TD>
					</TR>
					<TR>
						<TD><IMG height=10 src="image/blank.gif" width=10></TD>
						<TD width=26><IMG height=10 src="image/blank.gif" width=10></TD>
						<TD><IMG height=10 src="image/blank.gif" width=10></TD>
					</TR>
					<TR onmouseover="MM_swapImage('m9','','/company/images/arrow_on.gif',1); this.style.backgroundColor='#ff8a15'"
					    onmouseout="MM_swapImgRestore(); this.style.backgroundColor=''">
						<TD>　</TD>
						<TD width=26><IMG id=m1 height=12 src="image/point04.gif" width=12 name=m1></TD>
						<TD align="left" valign="middle"><a class=style13 href="cost.htm">計費方式</a></TD>
					</TR>
					<TR>
						<TD><IMG height=10 src="image/blank.gif" width=10></TD>
						<TD width=26><IMG height=10 src="image/blank.gif" width=10></TD>
						<TD><IMG height=10 src="image/blank.gif" width=10></TD>
					</TR>
					<TR onmouseover=" this.style.backgroundColor='#ff8a15'" onmouseout="MM_swapImgRestore(); this.style.backgroundColor=''">
						<TD>　</TD>
						<TD><IMG id=m1 height=12 src="image/point04.gif" width=12 name=m1></TD>
						<TD align="left" valign="middle"><a class=style13 href="hotnews.htm">最新消息</a></TD>
					</TR>
					<TR>
						<TD><IMG height=10 src="image/blank.gif" width=10></TD>
						<TD><IMG height=10 src="image/blank.gif" width=10></TD>
						<TD><IMG height=10 src="image/blank.gif" width=10></TD>
					</TR>
					<TR>
						<TD><!--DWLayoutEmptyCell-->　</TD>
						<TD><IMG id=m1 height=10 src="image/mail.jpg" width=14 name=m1></TD>
						<TD align="left" valign="middle"><a class=style13 href="mailto:8704pp@pchome.com.tw">連絡我們</a></TD>
					</TR>
					<TR>
						<TD><!--DWLayoutEmptyCell-->　</TD>
						<TD><!--DWLayoutEmptyCell-->　</TD>
						<TD><!--DWLayoutEmptyCell-->　</TD>
					</TR>
					<TR>
						<TD colspan="3"><!--DWLayoutEmptyCell-->　</TD>
					</TR>
					</tbody>
				</table>
			</td>
		</tr>
		<TR align="center" vAlign=middle bgcolor="#FFFFDF">
			<TD height="10" colspan="2" class="style16"
			    style="BORDER-RIGHT: #bdbdbd 0px solid; BORDER-TOP: #bdbdbd 0px solid; BORDER-LEFT: #bdbdbd 0px solid; BORDER-BOTTOM: #bdbdbd 0px solid"><span class="style27"><FONT size=2>Tel: 886-02-27024782　 Fax: 886-02-27840201　 地址：台北市仁愛路四段112巷9弄7號7樓 (原中山醫院病理科 )<BR>
  Lian-e, Inc. Copyright (c) 2005 all rights reserved. </font></span></TD>
		</TR>
		</TBODY>
	</TABLE>
</DIV>
<script type="text/javascript">
	function operateFormatter(value, row, index) {
		return [
			'<a class="update ml10" href="ppt_dwn.action?seq=', row.seq, '" title="下載" style="margin-left: 15px;" target="_blank">',
			'<i class="glyphicon glyphicon-edit fa-lg"></i>下載',
			'</a>'
		].join('');
	}
	$(function () {
	});

	function refresh() {
		$('#datas').bootstrapTable('refresh', {
			url: 'ppt_datas.action'
		});
	}

	function queryParams(params) {
		params.r = new Date().getTime();
		return params;
	}
</script>
</body>
</html>