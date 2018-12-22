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
							<i class="fa fa-dashboard"></i> 報表查詢 / 婦科抹片檢查報告單
						</li>
					</ol>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12 col-md-12 col-sm-12">
					<div id="custom-toolbar">
						<div class="form-inline" role="form">
							<div class="input-group" style="margin: 4px">
								<div class="input-group-addon">姓名</div>
								<s:textfield cssClass="form-control" type="text"
								             id="ptname"
								             name="condition.map.ptname"
								             value="%{condition.getString('ptname')}"
								             placeholder="姓名" size="10"/>
							</div>
							<div class="input-group" style="margin: 4px">
								<div class="input-group-addon">病歷號碼</div>
								<s:textfield cssClass="form-control" type="text"
								             id="chartno"
								             name="condition.map.chartno"
								             value="%{condition.getString('chartno')}"
								             placeholder="病歷號碼" size="10"/>
							</div>
							<div class="input-group" style="margin: 4px">
								<div class="input-group-addon">病理編號</div>
								<s:textfield cssClass="form-control" type="text"
								             id="chkno"
								             name="condition.map.chkno"
								             value="%{condition.getString('chkno')}"
								             placeholder="病理編號" size="10"/>
							</div>
							<div class="input-group" style="margin: 4px">
								<div class="input-group-addon">身分證號碼</div>
								<s:textfield cssClass="form-control" type="text"
								             id="ptid"
								             name="condition.map.ptid"
								             value="%{condition.getString('ptid')}"
								             placeholder="身分證號碼" size="10"/>
							</div>
							<div class="input-group" style="margin: 4px">
								<div class="input-group-addon">取樣日期</div>
								<s:textfield cssClass="form-control" type="text"
								             id="pasdates"
								             name="condition.map.pasdates"
								             value="%{condition.getString('pasdates')}"
								             placeholder="取樣日期" size="10"/>

								<div class="input-group-addon">~</div>
								<s:textfield cssClass="form-control" type="text"
								             id="pasdatee"
								             name="condition.map.pasdatee"
								             value="%{condition.getString('pasdatee')}"
								             placeholder="取樣日期" size="10"/>
							</div>
							<button type="button" id="refresh" class="btn btn-default">搜尋</button>
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
							<th data-field="PTNAME" data-align="center" data-sortable="true">姓名</th>
							<th data-field="PASCODE" data-align="center" data-sortable="true">送檢單位</th>
							<th data-field="CHARTNO" data-align="center" data-sortable="true">病歷號碼</th>
							<th data-field="PASDATE" data-align="center" data-sortable="true">取樣日期</th>
							<th data-field="CHKDATA" data-align="center" data-sortable="true">細胞病理診斷</th>
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

	function nFormatter(value, row, index) {
		return [
			'<a class="view ml10" href="javascript:void(0)" title="瀏覽" style="margin-left: 15px;">',
			value,
			'</a>'
		].join('');
	}
	function operateFormatter(value, row, index) {
		return [
			'<a class="remove ml10" href="javascript:void(0)" title="刪除 " style="margin-left: 15px;">',
			'<i class="glyphicon glyphicon-edit fa-lg"></i>刪除 ',
			'</a>'
		].join('');
	}
	window.operateEvents = {
		'click .update': function (e, value, row, index) {
			window.location.href = '<s:property value="prefix"/>_update.action?condition.map.seq=' + row.seq + '&r=' + getKTagRandom();
		},
		'click .view': function (e, value, row, index) {
			window.location.href = '<s:property value="prefix"/>_view.action?condition.map.seq=' + row.seq + '&r=' + getKTagRandom();
		},
		'click .remove': function (e, value, row, index) {
			if (confirm("確定刪除?") == false) {
				return;
			}
			var con = {};
			con["r"] = getKTagRandom();
			con["condition.map.seq"] = row.seq;
			jQuery.post(
					'<s:property value="prefix"/>_remove.action', con, handleKTagResponse, "json"
			);
		}
	};
	$(function () {
		$('#refresh').click(function () {
			refresh();
		});

		$('#pasdates').datepicker({
			format: 'yyyy/mm/dd'
		});
		$('#pasdates').on('changeDate', function (e) {
			$(this).datepicker('hide');
		});

		$('#pasdatee').datepicker({
			format: 'yyyy/mm/dd'
		});
		$('#pasdatee').on('changeDate', function (e) {
			$(this).datepicker('hide');
		});
	});

	function refresh() {
		$('#datas').bootstrapTable('refresh', {
			url: '<s:property value="prefix"/>_datas.action'
		});
	}

	function queryParams(params) {
		params["condition.map.ptname"] = $('#ptname').val();
		params["condition.map.chartno"] = $('#chartno').val();
		params["condition.map.chkno"] = $('#chkno').val();
		params["condition.map.ptid"] = $('#ptid').val();
		params["condition.map.pasdates"] = $('#pasdates').val();
		params["condition.map.pasdatee"] = $('#pasdatee').val();
		params.r = getKTagRandom();
		return params;
	}
</script>