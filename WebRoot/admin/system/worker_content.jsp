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
							<i class="fa fa-dashboard"></i> 管理 / 工作人員管理
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
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">*代碼:</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<s:if test="data.equals('method','update')">
									<s:property value="%{data.map.exacode}"/>
								</s:if>
								<s:else>
									<s:textfield cssClass="form-control" id="exacode" name="data.map.exacode"
									             value="%{data.map.exacode}" autocomplete="new-password"
									/>
								</s:else>
							</div>
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">*姓名:</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<s:textfield cssClass="form-control" id="exaname" name="data.map.exaname"
								             value="%{data.map.exaname}" autocomplete="new-password"
								/>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">*身分證字號:</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<s:textfield cssClass="form-control" id="exaid" name="data.map.exaid"
								             value="%{data.map.exaid}" autocomplete="new-password"
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
				"data.map.exacode": {
					validators: {
						notEmpty: {
							message: '[代碼] 必須填寫.'
						}
					}
				},
				"data.map.exaname": {
					validators: {
						notEmpty: {
							message: '[姓名] 必須填寫.'
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
		$.ajax({
			type: "POST",
			dataType: 'json',
			url: "<s:property value="prefix"/>_save.action",
			data: $('#form1').serialize(),
			success: handleKTagResponse,
			error: function () {
				alert("failure");
			}
		});
	}
	window.alert = function () {
		BootstrapDialog.alert(arguments[0]);
	};
</script>
<k:script/>