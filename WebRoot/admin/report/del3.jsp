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
							<i class="fa fa-dashboard"></i> 資料刪除 / 婦科抹片檢查報告單
						</li>
					</ol>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12 col-md-12 col-sm-12">
					<div id="custom-toolbar">
						<div class="form-inline" role="form">
							<div class="input-group" style="margin: 4px">
								<div class="input-group-addon">收件日期</div>
								<s:textfield cssClass="form-control" type="text"
								             id="chkrecs"
								             name="condition.map.chkrecs"
								             value="%{condition.getString('chkrecs')}"
								             placeholder="收件日期" size="10"/>

								<div class="input-group-addon">~</div>
								<s:textfield cssClass="form-control" type="text"
								             id="chkrece"
								             name="condition.map.chkrece"
								             value="%{condition.getString('chkrece')}"
								             placeholder="收件日期" size="10"/>
							</div>
							<button type="button" id="refresh" class="btn btn-default">搜尋</button>
							<button type="button" id="csv" class="btn btn-default">刪除資料</button>
						</div>
					</div>
					<table
							id="datas"
							data-toggle="table"
							data-url="admin_exp3_datas.action"
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
							<th data-field="PTNAME" data-align="center" data-sortable="true">姓名</th>
							<th data-field="PASCODE" data-align="center" data-sortable="true">送檢單位</th>
							<th data-field="CHARTNO" data-align="center" data-sortable="true">病理號碼</th>
							<th data-field="CHKREC" data-align="center" data-sortable="true">收件日期</th>
							<th data-field="CHKDATA" data-align="center" data-sortable="true">細胞病理診斷</th>
						</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	$(function () {
		$('#refresh').click(function () {
			refresh();
		});

		$('#csv').click(function () {
			if (confirm("確定刪除?") == false) {
				return;
			}
			var con = {};
			con["r"] = getKTagRandom();
			con["condition.map.chkrecs"] = $('#chkrecs').val();
			con["condition.map.chkrece"] = $('#chkrece').val();
			jQuery.post(
					'admin_del3_deldata.action', con, handleKTagResponse, "json"
			);
		});

		$('#chkrecs').datepicker({
			format: 'yyyy/mm/dd'
		});
		$('#chkrecs').on('changeDate', function (e) {
			$(this).datepicker('hide');
		});

		$('#chkrece').datepicker({
			format: 'yyyy/mm/dd'
		});
		$('#chkrece').on('changeDate', function (e) {
			$(this).datepicker('hide');
		});
	});

	function refresh() {
		$('#datas').bootstrapTable('refresh', {
			url: 'admin_exp3_datas.action'
		});
	}

	function queryParams(params) {
		params["condition.map.chkrecs"] = $('#chkrecs').val();
		params["condition.map.chkrece"] = $('#chkrece').val();
		params.r = getKTagRandom();
		return params;
	}
</script>