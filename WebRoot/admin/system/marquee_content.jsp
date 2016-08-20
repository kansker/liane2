<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="k" uri="/struts-kker" %>
<div id="content">
	<div id="page-wrapper">
		<div class="container-fluid">
			<!-- Page Heading -->
			<div class="row">
				<div class="col-lg-12">
					<ol class="breadcrumb">
						<li class="active">
							<i class="fa fa-dashboard"></i> 管理 / 跑馬燈管理
						</li>
					</ol>
				</div>
			</div>
			<!-- /.row -->
			<div class="row" style="width: 98%">
				<form action="<s:property value="prefix"/>_save.action" id="form1" name="form1" method="post" class="form-horizontal">
					<k:token/>
					<fieldset>
						<div class="form-group">
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">*名稱:</label>
							<div class="col-sm-8 col-md-8 col-lg-8text-label">
								<s:textfield cssClass="form-control" id="title" name="data.map.title"
								             value="%{data.map.title}" autocomplete="new-password"
								/>
							</div>
						</div>
					</fieldset>
					<div class="form-group">
						<div class="col-sm-12" style="text-align: center;">
							<button type="button" id="btnSave" class="btn btn-primary" onclick="toSave();"><i class="fa fa-edit"></i>提交
							</button>
							<button type="button" class="btn btn-primary" onclick="window.location.href='<s:property value="prefix"/>_back.action';"><i class="fa fa-rotate-left"></i>返回
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	$(function () {
		$('#form1').bootstrapValidator({
			message: 'This value is not valid',
			feedbackIcons: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},
			fields: {
				"data.map.title": {
					validators: {
						notEmpty: {
							message: '[名稱] 必須填寫.'
						}
					}
				}
			}
		});
	});
	function toSave() {
		$('#form1').data('bootstrapValidator').validate();
		if ($('#form1').data('bootstrapValidator').isValid() == false) {
			alert("請更正紅色錯誤的錯誤消息！");
			return;
		}
		if (confirm('確定送出?') == false) {
			return;
		}
		$('#btnSave').hide();
		var formData = new FormData($('#form1')[0]);
		$.ajax({
			type: "POST",
			dataType: 'json',
			enctype: 'multipart/form-data',
			processData: false,  // tell jQuery not to process the data
			contentType: false,   // tell jQuery not to set contentType
			url: "<s:property value="prefix"/>_save.action",
			data: formData,
			success: handleKTagResponse,
			error: function () {
				alert("failure");
				loading1 = false;
				$('.pr1').hide();
			}
		});
	}
	window.alert = function () {
		BootstrapDialog.alert(arguments[0]);
	};
</script>
<k:script/>