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
							<i class="fa fa-dashboard"></i> 報表查詢 / 非婦科抹片檢查報告單
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
								<%--<k:select cssClass="form-control" id="siteme"--%>
								<%--name="condition.map.siteme"--%>
								<%--value="%{data.getString('siteme')}"--%>
								<%--code="condition1" param="condition"--%>
								<%--listKey="map.v" listValue="map.c"/>--%>
								<s:textfield cssClass="form-control" type="text"
								             id="iteme"
								             name="condition.map.iteme"
								             value="%{condition.getString('iteme')}"
								             placeholder="姓名" size="10"/>
							</div>
							<div class="input-group" style="margin: 4px">
								<div class="input-group-addon">病理號碼</div>
								<%--<k:select cssClass="form-control" id="sitemc"--%>
								<%--name="condition.map.sitemc"--%>
								<%--value="%{data.getString('sitemc')}"--%>
								<%--code="condition2" param="condition"--%>
								<%--listKey="map.v" listValue="map.c"/>--%>
								<s:textfield cssClass="form-control" type="text"
								             id="itemc"
								             name="condition.map.itemc"
								             value="%{condition.getString('itemc')}"
								             placeholder="病理號碼" size="10"/>
							</div>
							<div class="input-group" style="margin: 4px">
								<div class="input-group-addon">組織來源</div>
								<s:textfield id="iteml" cssClass="form-control" type="text"
								             name="condition.map.iteml"
								             value="%{condition.getString('iteml')}"
								             placeholder=" (skin, Endometrium, Gallbladder,Finger, Rectum, Cervix)" size="55"/>
							</div>
							<div class="input-group" style="margin: 4px">
								<div class="input-group-addon">取樣日期</div>
								<s:textfield cssClass="form-control" type="text"
								             id="itemhs"
								             name="condition.map.itemhs"
								             value="%{condition.getString('itemhs')}"
								             placeholder="取樣日期" size="10"/>

								<div class="input-group-addon">~</div>
								<s:textfield cssClass="form-control" type="text"
								             id="itemhe"
								             name="condition.map.itemhe"
								             value="%{condition.getString('itemhe')}"
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
							<th data-field="itemE" data-formatter="nFormatter" data-events="operateEvents" data-align="center" data-sortable="true">姓名</th>
							<th data-field="itemD" data-align="center" data-sortable="true">送檢單位</th>
							<th data-field="itemC" data-align="center" data-sortable="true">病理號碼</th>
							<th data-field="itemF" data-align="center" data-sortable="true">年齡</th>
							<th data-field="itemH" data-align="center" data-sortable="true">取樣日期</th>
							<th data-field="itemL" data-align="center" data-sortable="true">組織來源</th>
							<th data-field="status" data-align="center" data-sortable="true">狀態</th>
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

		$('#itemhs').datepicker({
			format: 'yyyy/mm/dd'
		});
		$('#itemhs').on('changeDate', function (e) {
			$(this).datepicker('hide');
		});

		$('#itemhe').datepicker({
			format: 'yyyy/mm/dd'
		});
		$('#itemhe').on('changeDate', function (e) {
			$(this).datepicker('hide');
		});
	});

	function refresh() {
		$('#datas').bootstrapTable('refresh', {
			url: '<s:property value="prefix"/>_datas.action'
		});
	}

	function queryParams(params) {
		params["condition.map.keyword"] = $('#keyword').val();
		params["condition.map.status"] = $('#status').val();
		params.r = getKTagRandom();
		return params;
	}
</script>