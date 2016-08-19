<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="k" uri="/struts-kker"%>
<div id="content">
	<div id="page-wrapper">
		<div class="container-fluid">
			<!-- Page Heading -->
			<div class="row">
				<div class="col-lg-12">
					<ol class="breadcrumb">
						<li class="active"><i class="fa fa-dashboard"></i> 產品管理-設計師版型</li>
					</ol>
				</div>
			</div>
			<!-- /.row -->
			<div class="row" style="width: 98%">
				<form action="<s:property value="prefix"/>_save2.action" id="form1" name="form1" method="post" class="form-horizontal" enctype="multipart/form-data">
					<k:token />
					<fieldset>
						<div class="form-group">
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">*名稱:</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<s:textfield cssClass="form-control" id="name" name="data.map.name" value="%{data.map.name}" maxlength="40" />
							</div>
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">*顯示順序:</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<s:textfield cssClass="form-control" id="prior" name="data.map.prior" value="%{data.getInt('prior')}" maxlength="3" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">*所屬產品</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<k:select name="data.map.productseq" cssClass="form-control" id="productseq" dao="qa_orderkinds" listKey="map.seq" listValue="map.name" value="%{data.getString('productseq')}" />
							</div>
							<label class="col-sm-2 col-md-2 col-lg-2 control-label"></label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label"></div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">預覽圖示:</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<s:file id="preview" name="preview"></s:file>
								<s:if test="data.isNotEmpty('preview')">
									<img id="img_preview" alt="" src="preview/<s:property value="%{data.map.preview}"/>" height="87" />
								</s:if>
								<s:else>
									<img id="img_preview" alt="" src="images/sp.gif" height="5" />
								</s:else>
							</div>
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">*狀態:</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<k:select name="data.map.status" cssClass="form-control" id="status" code="啟停用" listKey="map.id" listValue="map.name" value="%{data.getString('status')}" />
							</div>
						</div>
					</fieldset>
					<div class="form-group">
						<div class="col-sm-6 col-md-6 col-sm-offset-4 col-md-offset-4 ">
							<button type="button" id="btnSave" class="btn btn-primary" onclick="toSave();">
								<i class="fa fa-edit"></i>提交
							</button>
							<button type="button" class="btn btn-primary" onclick="parent.toClose();">
								<i class="fa fa-rotate-left"></i>返回
							</button>
						</div>
					</div>
				</form>
			</div>
			<!-- /.row -->
		</div>
		<!-- /.container-fluid -->
	</div>
	<!-- /#page-wrapper -->
</div>
<!-- /#wrapper -->
<!-- jQuery -->
<script type="text/javascript">
	$(function() {
		$('#form1').bootstrapValidator({
			message : 'This value is not valid',
			feedbackIcons : {
				valid : 'glyphicon glyphicon-ok',
				invalid : 'glyphicon glyphicon-remove',
				validating : 'glyphicon glyphicon-refresh'
			},
			fields : {
				"data.map.name" : {
					validators : {
						notEmpty : {
							message : '[名稱] 必須填寫.'
						}
					}
				},
				"data.map.prior" : {
					validators : {
						notEmpty : {
							message : '[顯示順序] 必須填寫.'
						},
						numeric : {
							message : '[顯示順序] 必須是數字.'
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
		var formData = new FormData($('#form1')[0]);
		$.ajax({
			type : "POST",
			dataType : 'json',
			enctype : 'multipart/form-data',
			processData : false, // tell jQuery not to process the data
			contentType : false, // tell jQuery not to set contentType
			url : "<s:property value="prefix"/>_save2.action",
			data : formData,//$('#form1').serialize(),
			success : handleKTagResponse,
			error : function() {
				alert("failure");
			}
		});
	}

	window.alert = function() {
		BootstrapDialog.alert(arguments[0]);
	};
</script>
<k:script />