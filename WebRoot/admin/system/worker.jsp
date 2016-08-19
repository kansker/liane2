<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="k" uri="/struts-kker" %>
<div id="content">
	<div id="page-wrapper">
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-12">
					<ol class="breadcrumb">
						<li class="active">
							<i class="fa fa-dashboard"></i> 管理 / 工作人員管理
						</li>
					</ol>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12 col-md-12 col-sm-12">
					<div id="custom-toolbar">
						<div class="form-inline" role="form">
							<div class="input-group">
								<div class="input-group-addon">關鍵字</div>
								<s:textfield id="keyword" cssClass="form-control" type="text" value="%{condition.getString('keyword')}" placeholder="關鍵字" size="10"/>
							</div>
							<button type="button" id="refresh" class="btn btn-default">搜尋</button>
							<button type="button" id="addBtn" class="btn btn-default">新增</button>
						</div>
					</div>
					<table
							id="datas"
							data-toggle="table"
							data-url="<s:property value="prefix"/>_datas.action"
							data-toolbar="#get"
							data-pagination="true"
							data-side-pagination="server"
							data-page-number="<s:property value="%{condition.getInt('offset') / condition.getInt('limit')  + 1}"/>"
							data-page-size=" <s:property value="%{condition.getInt('limit')}"/>"
							data-page-list="[5, 10, 20, 50, 100, 200]"
							data-search="false"
							data-toolbar="#custom-toolbar"
							data-query-params="queryParams"
					>
						<thead>
						<tr>
							<th data-field="exacode" data-align="center" data-sortable="true">代碼</th>
							<th data-field="exaname" data-align="center" data-sortable="true">姓名</th>
							<th data-field="exaid" data-align="center" data-sortable="true">身分證字號</th>
							<th data-field="operate" data-formatter="operateFormatter" data-events="operateEvents" data-align="left">功能</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	function operateFormatter(value, row, index) {
		return [
			'<a class="update ml10" href="javascript:void(0)" title="修改" style="margin-left: 15px;">',
			'<i class="glyphicon glyphicon-edit fa-lg"></i>修改',
			'</a>',
			'<a class="remove ml10" href="javascript:void(0)" title="刪除 " style="margin-left: 15px;">',
			'<i class="glyphicon glyphicon-edit fa-lg"></i>刪除 ',
			'</a>'
		].join('');
	}
	window.operateEvents = {
		'click .update': function (e, value, row, index) {
			window.location.href = '<s:property value="prefix"/>_update.action?condition.map.exacode=' + row.exacode + '&r=' + getKTagRandom();
		},
		'click .remove': function (e, value, row, index) {
			if (confirm("確定刪除?") == false) {
				return;
			}
			var con = {};
			con["r"] = getKTagRandom();
			con["condition.map.exacode"] = row.exacode;
			jQuery.post(
					'<s:property value="prefix"/>_remove.action', con, handleKTagResponse, "json"
			);
		}
	};
	$(function () {
		$('#refresh').click(function () {
			refresh();
		});

		$('#addBtn').click(function () {
			window.location.href = '<s:property value="prefix"/>_add.action?r=' + getKTagRandom();
		});
	});

	function refresh() {
		$('#datas').bootstrapTable('refresh', {
			url: '<s:property value="prefix"/>_datas.action'
		});
	}

	function queryParams(params) {
		params["condition.map.keyword"] = $('#keyword').val();
		params.r = getKTagRandom();
		return params;
	}
</script>