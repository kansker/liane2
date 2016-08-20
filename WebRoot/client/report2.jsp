<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="k" uri="/struts-kker" %>
<div id="content">
	<div id="page-wrapper">
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-12">
					<a href="cus_welcome.action">
						<IMG height=41 src="images/add_black.png" width=41 align=bottom border=0>回主頁
					</a>
					<a href="cus_user.action">
						<IMG height=41 src="images/browse_black.png" width=41 align=bottom border=0>修改密碼
					</a>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12 col-md-12 col-sm-12">
					<div id="custom-toolbar">
						<div class="form-inline" role="form">
							<div class="input-group" style="margin: 4px">
								<div class="input-group-addon">姓名</div>
								<%--<k:select cssClass="form-control" id="sitemd"--%>
								<%--name="condition.map.sitemd"--%>
								<%--value="%{data.getString('sitemd')}"--%>
								<%--code="condition1" param="condition"--%>
								<%--listKey="map.v" listValue="map.c"/>--%>
								<s:textfield cssClass="form-control" type="text"
								             id="itemd"
								             name="condition.map.itemd"
								             value="%{condition.getString('itemd')}"
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
								<s:textfield id="itemq" cssClass="form-control" type="text"
								             name="condition.map.itemq"
								             value="%{condition.getString('itemq')}"
								             placeholder="(skin, Endometrium, Gallbladder,Finger, Rectum, Cervix)" size="55"/>
							</div>
							<div class="input-group" style="margin: 4px">
								<div class="input-group-addon">手術日期</div>
								<s:textfield cssClass="form-control" type="text"
								             id="itemms"
								             name="condition.map.itemms"
								             value="%{condition.getString('itemms')}"
								             placeholder="手術日期" size="10"/>

								<div class="input-group-addon">~</div>
								<s:textfield cssClass="form-control" type="text"
								             id="itemme"
								             name="condition.map.itemme"
								             value="%{condition.getString('itemme')}"
								             placeholder="手術日期" size="10"/>
							</div>
							<button type="button" id="refresh" class="btn btn-default">搜尋</button>
							<button type="button" id="csv" class="btn btn-default">下載CSV</button>
							<button type="button" id="pdf" class="btn btn-default">下載此頁PDF</button>
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
							data-page-list="[10, 20, 50]"
							data-search="false"
							data-toolbar="#custom-toolbar"
							data-query-params="queryParams"
					>
						<thead>
						<tr>
							<th data-field="itemD" data-formatter="nFormatter" data-events="operateEvents" data-align="center" data-sortable="true">姓名</th>
							<th data-field="itemK" data-align="center" data-sortable="true">送檢單位</th>
							<th data-field="itemC" data-align="center" data-sortable="true">病理號碼</th>
							<th data-field="itemE" data-align="center" data-sortable="true">年齡</th>
							<th data-field="itemF" data-align="center" data-sortable="true">性別</th>
							<th data-field="itemM" data-align="center" data-sortable="true">手術日期</th>
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
<form action="cus_search2_pdf.action" id="form1" name="form1" method="post" target="_blank">
	<input type="hidden" id="seq" name="condition.map.seq" value=""/>
	<input type="hidden" id="kind" name="condition.map.kind" value="1"/>
</form>

<script type="text/javascript">

	function nFormatter(value, row, index) {
		return [
			'<a class="view ml10" href="javascript:void(0)" title="瀏覽" style="margin-left: 15px;">',
			value,
			'</a>'
		].join('');
	}
	window.operateEvents = {
		'click .view': function (e, value, row, index) {
			document.form1.action = "cus_search2_pdf.action";
			$('#seq').val(row.seq);
			$('#kind').val("2");
			document.form1.submit();
		}
	};
	$(function () {
		$('#pdf').click(function () {
			$('#kind').val("1");
			document.form1.action = "cus_search2_pdfs.action";
			document.form1.submit();
		});
		$('#csv').click(function () {
			$('#kind').val("1");
			document.form1.action = "cus_search2_csv.action";
			document.form1.submit();
		});
		$('#refresh').click(function () {
			refresh();
		});

		$('#itemms').datepicker({
			format: 'yyyy/mm/dd'
		});
		$('#itemms').on('changeDate', function (e) {
			$(this).datepicker('hide');
		});

		$('#itemme').datepicker({
			format: 'yyyy/mm/dd'
		});
		$('#itemme').on('changeDate', function (e) {
			$(this).datepicker('hide');
		});
	});

	function refresh() {
		$('#datas').bootstrapTable('refresh', {
			url: '<s:property value="prefix"/>_datas.action'
		});
	}

	function queryParams(params) {
		params["condition.map.itemc"] = $('#itemc').val();
		params["condition.map.itemd"] = $('#itemd').val();
		params["condition.map.itemq"] = $('#itemq').val();
		params["condition.map.itemms"] = $('#itemms').val();
		params["condition.map.itemme"] = $('#itemme').val();
		params.r = getKTagRandom();
		return params;
	}
</script>