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
						<li class="active"><i class="fa fa-dashboard"></i> 風格管理 / 套框大師管理</li>
					</ol>
				</div>
			</div>
			<!-- /.row -->
			<div class="row" style="width: 98%">
				<form action="<s:property value="prefix"/>_save.action" id="form1" name="form1" method="post" class="form-horizontal">
					<k:token />
					<fieldset>
						<div class="form-group">
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">*名稱:</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<s:textfield cssClass="form-control" id="name" name="data.map.name" value="%{data.map.name}" maxlength="20" />
							</div>
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">*類別:</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<k:select name="data.map.cgyseq" cssClass="form-control" id="cgyseq" code="framesCgy" listKey="map.seq" listValue="map.name" value="%{data.getString('cgyseq')}" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">描述:</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<s:textfield cssClass="form-control" id="title" name="data.map.title" value="%{data.map.title}" maxlength="20" />
							</div>
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">canvas參數(直):</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<s:textfield cssClass="form-control" id="canvas1" name="data.map.canvas1" value="%{data.map.canvas1}" maxlength="20" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">canvas參數(方):</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<s:textfield cssClass="form-control" id="canvas2" name="data.map.canvas2" value="%{data.map.canvas2}" maxlength="20" />
							</div>
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">canvas參數(橫):</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<s:textfield cssClass="form-control" id="canvas3" name="data.map.canvas3" value="%{data.map.canvas3}" maxlength="20" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">FMD:</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<s:file id="fmd1" name="fmd1"></s:file>
								<div id="div_fmd1">
									<s:property value="%{data.map.fmd1}" />
								</div>
							</div>
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">預覽圖示:</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<s:file id="preview1" name="preview1"></s:file>
								<s:if test="data.isNotEmpty('preview1')">
									<a class="fancybox" rel="gallery1" id="a_preview1" href="fpreview/<s:property value="%{data.map.preview1}"/>" target="_blank" title="預覽"><img id="img_preview1" alt="" src="fpreview/<s:property value="%{data.map.preview1}"/>" height="87" /></a>
								</s:if>
								<s:else>
									<a class="fancybox" rel="gallery1" id="a_preview1" href="images/sp.gif" target="_blank" title="預覽"><img id="img_preview1" alt="" src="images/sp.gif" height="87" /></a>
								</s:else>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">*顯示順序:</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<s:textfield cssClass="form-control" id="vieworder" name="data.map.vieworder" value="%{data.map.vieworder}" maxlength="3" />
							</div>
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">*狀態:</label>
							<div class="col-sm-4 col-md-4 col-lg-4 text-label">
								<k:select name="data.map.status" cssClass="form-control" id="status" code="啟停用" listKey="map.id" listValue="map.name" value="%{data.getString('status')}" />
							</div>
						</div>
					</fieldset>
					<div class="form-group">
						<div class="col-sm-12" style="text-align: center;">
							<button type="button" id="btnSave" class="btn btn-primary" onclick="toSave();">
								<i class="fa fa-edit"></i>提交
							</button>
							<button type="button" class="btn btn-primary" onclick="window.location.href='<s:property value="prefix"/>_back.action';">
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
		$(".fancybox").fancybox({
			openEffect : 'none',
			closeEffect : 'none'
		});
		$('#products').multiselect();

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
				"data.map.vieworder" :{
					validators: {
						notEmpty: {
							message: '[顯示順序] 必須填寫.'
						},					
						numeric: {
	                        message: '[顯示順序] 必須是數字.'
	                    }
					}
				},
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
			url : "<s:property value="prefix"/>_save.action",
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