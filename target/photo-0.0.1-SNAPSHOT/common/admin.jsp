<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="k" uri="/struts-kker"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<title><%=kplug.db.ConfigAgent.getConfigValue("title")%></title>
<!-- Bootstrap Core CSS -->
<link rel="stylesheet" type="text/css" href="<s:url value='/javascripts/bootstrap/bootstrap.min.css' />" />
<link rel="stylesheet" type="text/css" href="<s:url value='/javascripts/bootstrap/sb-admin.css' />" />
<link rel="stylesheet" type="text/css" href="<s:url value='/javascripts/bootstrap/font-awesome/css/font-awesome.min.css' />" />
<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<script type="text/javascript" src="<s:url value='/javascripts/common.js'/>"></script>
</head>
<body>
	<div id="wrapper">
		<!-- Navigation -->
		<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
					<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="admin.action"><%=kplug.db.ConfigAgent.getConfigValue("title")%></a>
			</div>
			<!-- Top Menu Items -->
			<ul class="nav navbar-right top-nav">
				<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> <s:property value="%{#session.AdminBean.userParam.map.username}" /> <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<!--<li>-->
						<!--<a href="#"><i class="fa fa-fw fa-user"></i> Profile</a>-->
						<!--</li>
                                        <li class="divider"></li>-->
						<li><a href="javascript:toLogout();"><i class="fa fa-fw fa-power-off"></i> 登出</a></li>
					</ul></li>
			</ul>
			<!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
			<div class="collapse navbar-collapse navbar-ex1-collapse">
				<ul class="nav navbar-nav side-nav">
					<li><a href="javascript:;" data-toggle="collapse" data-target="#menu1"><i class="fa fa-fw fa-desktop"></i> 管理 <i class="fa fa-fw fa-caret-down"></i></a>
						<ul id="menu1" class="collapse">
							<li><a href="javascript:toPage('admin_manager.action?task=query');"><i class="fa fa-fw fa-desktop"></i>使用者管理</a></li>
							<li><a href="javascript:toPage('admin_seller.action?task=query');"><i class="fa fa-fw fa-paypal"></i>廠商管理</a></li>
							
							<!-- <li><a href="javascript:toPage('admin_back_admin.ko?task=query');"><i class="fa fa-fw fa-desktop"></i>使用者管理</a></li>
							<li><a href="javascript:toPage('admin_seller.ko?task=query');"><i class="fa fa-fw fa-paypal"></i>廠商管理</a></li> -->
							<!-- <li><a href="javascript:toPage('admin_member.ko?task=query');"><i class="fa fa-fw fa-paypal"></i>會員管理</a></li> -->
							<!-- <li><a href="javascript:toPage('admin_register.ko?task=query');"><i class="fa fa-fw fa-paypal"></i>審核註冊</a></li> -->
							<!-- <li>
	                            <a href="javascript:toPage('admin_oproducts.ko?task=query');"><i class="fa fa-fw fa-paypal"></i>產品種類</a>
	                        </li>
	                        <li>
	                            <a href="javascript:toPage('admin_okinds.ko?task=query');"><i class="fa fa-fw fa-paypal"></i>訂單種類</a>
	                        </li> -->
							<!-- <li>
	                            <a href="javascript:toPage('admin_member2.ko?task=query');"><i class="fa fa-fw fa-paypal"></i>會員管理</a>
	                        </li> -->
						</ul></li>
					<li><a href="javascript:;" data-toggle="collapse" data-target="#menu5"><i class="fa fa-fw fa-desktop"></i> 產品管理 <i class="fa fa-fw fa-caret-down"></i></a>
						<ul id="menu5" class="collapse">
							<li><a href="javascript:toPage('admin_pcgy.action?1=1');"><i class="fa fa-fw fa-paypal"></i>大項管理</a></li>
							<li><a href="javascript:toPage('admin_pcgy1.action?1=1');"><i class="fa fa-fw fa-paypal"></i>中項管理</a></li>
							<li><a href="javascript:toPage('admin_pcgy2.action?1=1');"><i class="fa fa-fw fa-paypal"></i>小項管理</a></li>
							<li><a href="javascript:toPage('admin_prod.action?1=1');"><i class="fa fa-fw fa-paypal"></i>產品管理</a></li>
							<li><a href="javascript:toPage('admin_designer.action?1=1');"><i class="fa fa-fw fa-paypal"></i>設計師版型</a></li>
							<!-- <li><a href="javascript:toPage('admin_pcgy.ko?task=query');"><i class="fa fa-fw fa-paypal"></i>產品管理</a></li> -->
						</ul></li>
					<li><a href="javascript:;" data-toggle="collapse" data-target="#menu2"><i class="fa fa-fw fa-desktop"></i> 風格管理 <i class="fa fa-fw fa-caret-down"></i></a>
						<ul id="menu2" class="collapse">
							<li><a href="javascript:toPage('admin_stylecgy.action?task=query');"><i class="fa fa-fw fa-desktop"></i>類別管理</a></li>
							<li><a href="javascript:toPage('admin_style.action?task=query');"><i class="fa fa-fw fa-paypal"></i>風格管理</a></li>
							<!-- <li><a href="javascript:toPage('admin_style_main.ko?task=query');"><i class="fa fa-fw fa-paypal"></i>風格管理</a></li> -->
							<!-- <li><a href="javascript:toPage('admin_style_main.ko?task=cover');"><i class="fa fa-fw fa-paypal"></i>封面管理</a></li> -->
							<!-- <li><a href="javascript:toPage('admin_style_main.ko?task=free');"><i class="fa fa-fw fa-paypal"></i>創意商品管理</a></li> -->
							<!-- <li><a href="javascript:toPage('admin_layout_main.ko?task=query');"><i class="fa fa-fw fa-paypal"></i>版面配置管理</a></li> -->
							<li><a href="javascript:toPage('admin_frame.action?task=query');"><i class="fa fa-fw fa-paypal"></i>版面配置管理</a></li>
						</ul></li>
					<li><a href="javascript:;" data-toggle="collapse" data-target="#menu6"><i class="fa fa-fw fa-desktop"></i> 素材管理 <i class="fa fa-fw fa-caret-down"></i></a>
						<ul id="menu6" class="collapse">
							<li><a href="javascript:toPage('admin_icon.action?task=query');"><i class="fa fa-fw fa-desktop"></i>圖庫管理</a></li>
							<li><a href="javascript:toPage('admin_margin.action?task=query');"><i class="fa fa-fw fa-desktop"></i>標語管理</a></li>
							<!-- <li>
                            <a href="javascript:toPage('admin_style3_main.ko?task=query');"><i class="fa fa-fw fa-paypal"></i>文案管理</a>
                        	</li> -->
							<li><a href="javascript:toPage('admin_framescgy.action?task=query');"><i class="fa fa-fw fa-desktop"></i>套框大師類別管理</a></li>
							<li><a href="javascript:toPage('admin_frames.action?task=query');"><i class="fa fa-fw fa-desktop"></i>套框大師管理</a></li>
						</ul></li>
					<li><a href="javascript:;" data-toggle="collapse" data-target="#menu3"><i class="fa fa-fw fa-money"></i> 訂單管理 <i class="fa fa-fw fa-caret-down"></i></a>
						<ul id="menu3" class="collapse">
							<li><a href="javascript:toPage('order.action?1=1');"><i class="fa fa-fw fa-desktop"></i>訂單管理</a></li>
						</ul></li>
					<li><a href="javascript:;" data-toggle="collapse" data-target="#menu4"><i class="fa fa-fw fa-gear"></i> 參數管理 <i class="fa fa-fw fa-caret-down"></i></a>
						<ul id="menu4" class="collapse">
							<li><a href="javascript:toPage('admin_ebooks.action?task=query');"><i class="fa fa-fw fa-desktop"></i>電子書管理</a></li>
							<li><a href="javascript:toPage('admin_fonttype.action?task=query');"><i class="fa fa-fw fa-desktop"></i>字型種類管理</a></li>
							<!-- <li><a href="javascript:toPage('admin_font.ko?task=query');"><i class="fa fa-fw fa-desktop"></i>字型特效管理</a></li> -->
							<!-- <li>
                            <a href="javascript:toPage('admin_system_main.ko');"><i class="fa fa-fw fa-desktop"></i>系統參數管理</a>
                        </li>
                        <li>
                            <a href="javascript:toPage('admin_batch_main.ko?task=query');"><i class="fa fa-fw fa-desktop"></i>排程管理</a>
                        </li> -->
							<!-- <li><a href="javascript:toPage('admin_content.ko?task=query');"><i class="fa fa-fw fa-desktop"></i>郵件內容管理</a></li> -->
						</ul></li>
				</ul>
			</div>
			<!-- /.navbar-collapse -->
		</nav>

		<div id="page-wrapper">
			<div class="container-fluid" id="pl_content">
				<!-- Page Heading -->
				<div class="row" style="min-height: 400px">
					<div class="col-lg-12">
						<h1 class="page-header">
							欢迎使用 <small><%=kplug.db.ConfigAgent.getConfigValue("title")%></small>
						</h1>
					</div>
				</div>
			</div>
			<!-- /.container-fluid -->
		</div>
		<!-- /#page-wrapper -->
	</div>

	<div id="dgHistory" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="dgHistoryLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
					<h4 class="modal-title" id="dgHistoryLabel">內容</h4>
				</div>
				<div class="modal-body" id="plHistory"></div>
			</div>
		</div>
	</div>

	<!-- /#wrapper -->
	<!-- jQuery -->
	<script type="text/javascript" src="<s:url value='/javascripts/jquery-1.11.2.min.js'/>"></script>
	<script type="text/javascript" src="<s:url value='/javascripts/bootstrap/bootstrap.min.js'/>"></script>

	<script type="text/javascript">
		function toPage(url) {
			var h = ($(window).height() - $('.navbar-header').height() - ($(window).width() > 768 ? 30 : 60));
			$("#pl_content").html(
					'<iframe id="ifContent" marginwidth="0" marginheight="0" scrolling="auto" frameborder="0" src="' + url + '&r=' + getAjaxRandom() + '" style="width:100%;height:' + h
							+ 'px"></iframe>');
		}
		$(window).resize(function() {
			var h = ($(window).height() - $('.navbar-header').height() - ($(window).width() > 768 ? 30 : 60));
			$("#ifContent").height(h);
		});
		function toLogout() {
			window.location.href = 'adminLogout.ko';
		}
		function openPage(u, t) {
			$('#dgHistoryLabel').html(t);
			$('#plHistory').html('<iframe id="ifHistory" src="' + u + '" style="width:100%" height="' + ($(window).height() - 70) + '" scrolling="auto" frameborder="0"></iframe>');
			$('#dgHistory').modal({
				keyboard : false
			});
			$('#dgHistory').modal('show');
			$('.modal-dialog').css('width', '90%');
			$('.modal-dialog').css('margin', '10px auto 10px auto');
			$('.modal-header').hide();
		}
		
		function closePage() {
			$('#dgHistory').modal('hide');
		}
	</script>
</body>
</html>
