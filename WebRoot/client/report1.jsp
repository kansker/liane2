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
								<div class="input-group-addon">病歷號碼</div>
								<%--<k:select cssClass="form-control" id="sitemc"--%>
								<%--name="condition.map.sitemc"--%>
								<%--value="%{data.getString('sitemc')}"--%>
								<%--code="condition2" param="condition"--%>
								<%--listKey="map.v" listValue="map.c"/>--%>
								<s:textfield cssClass="form-control" type="text"
								             id="itemg"
								             name="condition.map.itemg"
								             value="%{condition.getString('itemg')}"
								             placeholder="病歷號碼" size="10"/>
							</div>
							<div class="input-group" style="margin: 4px">
								<div class="input-group-addon">病理號碼</div>
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
							<th data-field="itemE" data-formatter="nFormatter" data-events="operateEvents" data-align="center" data-sortable="true">姓名</th>
							<th data-field="itemD" data-align="center" data-sortable="true">送檢單位</th>
							<th data-field="itemG" data-align="center" data-sortable="true">病歷號碼</th>
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
<form action="cus_search1_pdf.action" id="form1" name="form1" method="post" target="_blank">
	<input type="hidden" id="seq" name="condition.map.seq" value=""/>
	<input type="hidden" id="kind" name="condition.map.kind" value="1"/>
</form>
<script type="text/javascript">
	function operateFormatter(value, row, index) {
		return [
			'<a class="pdf ml10" href="javascript:void(0)" title="PDF" style="margin-left: 15px;">',
			'<i class="glyphicon glyphicon-edit fa-lg"></i>PDF',
			'</a>'
		].join('');
	}
	function nFormatter(value, row, index) {
		return [
			'<a class="view ml10" href="javascript:void(0)" title="瀏覽" style="margin-left: 15px;">',
			value,
			'</a>'
		].join('');
	}
	window.operateEvents = {
		'click .view': function (e, value, row, index) {
			showD('瀏覽', 'cus_search1_view.action?r=' + new Date().getTime() + '&condition.map.seq=' + row.seq, function () {
			});
		},
		'click .pdf': function (e, value, row, index) {
			document.form1.action = "cus_search1_pdf.action";
			$('#seq').val(row.seq);
			$('#kind').val("2");
			document.form1.submit();
		}
	};
	$(function () {
		$('#pdf').click(function () {
			$('#kind').val("1");
			document.form1.action = "cus_search1_pdfs.action";
			document.form1.submit();
		});
		$('#csv').click(function () {
			$('#kind').val("1");
			document.form1.action = "cus_search1_csv.action";
			document.form1.submit();
		});
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
		params["condition.map.itemc"] = $('#itemc').val();
		params["condition.map.iteme"] = $('#iteme').val();
		params["condition.map.itemg"] = $('#itemg').val();
		params["condition.map.iteml"] = $('#iteml').val();
		params["condition.map.itemhs"] = $('#itemhs').val();
		params["condition.map.itemhe"] = $('#itemhe').val();
		params.r = getKTagRandom();
		return params;
	}
</script>