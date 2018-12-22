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
							<i class="fa fa-dashboard"></i> 資料刪除 / 病理組織檢查報告單
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
								             id="itemns"
								             name="condition.map.itemns"
								             value="%{condition.getString('itemns')}"
								             placeholder="收件日期" size="10"/>

								<div class="input-group-addon">~</div>
								<s:textfield cssClass="form-control" type="text"
								             id="itemne"
								             name="condition.map.itemne"
								             value="%{condition.getString('itemne')}"
								             placeholder="收件日期" size="10"/>
							</div>
							<button type="button" id="refresh" class="btn btn-default">搜尋</button>
							<button type="button" id="csv" class="btn btn-default">刪除資料</button>
						</div>
					</div>
					<table
							id="datas"
							data-toggle="table"
							data-url="admin_exp2_datas.action"
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
							<th data-field="itemD" data-align="center" data-sortable="true">姓名</th>
							<th data-field="itemK" data-align="center" data-sortable="true">送檢單位</th>
							<th data-field="itemC" data-align="center" data-sortable="true">病理號碼</th>
							<th data-field="itemE" data-align="center" data-sortable="true">年齡</th>
							<th data-field="itemF" data-align="center" data-sortable="true">性別</th>
							<th data-field="itemN" data-align="center" data-sortable="true">收件日期</th>
							<th data-field="itemQ" data-align="center" data-sortable="true">組織來源</th>
							<th data-field="status" data-align="center" data-sortable="true">狀態</th>
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
			con["condition.map.itemns"] = $('#itemns').val();
			con["condition.map.itemne"] = $('#itemne').val();
			jQuery.post(
					'admin_del2_deldata.action', con, handleKTagResponse, "json"
			);
		});
		$('#itemns').datepicker({
			format: 'yyyy/mm/dd'
		});
		$('#itemns').on('changeDate', function (e) {
			$(this).datepicker('hide');
		});

		$('#itemne').datepicker({
			format: 'yyyy/mm/dd'
		});
		$('#itemne').on('changeDate', function (e) {
			$(this).datepicker('hide');
		});
	});

	function refresh() {
		$('#datas').bootstrapTable('refresh', {
			url: 'admin_exp2_datas.action'
		});
	}

	function queryParams(params) {
		params["condition.map.itemns"] = $('#itemns').val();
		params["condition.map.itemne"] = $('#itemne').val();
		params.r = getKTagRandom();
		return params;
	}
</script>