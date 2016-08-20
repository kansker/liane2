<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="k" uri="/struts-kker" %>
<div id="content" style="max-width: 1024px">
	<div id="page-wrapper">
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-12">
					<a href="cus_welcome.action">
						<IMG height=41 src="images/add_black.png" width=41 align=bottom border=0>回主頁
					</a>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<ol class="breadcrumb">
						<li class="active">
							<i class="fa fa-dashboard"></i> 使用者密碼修改
						</li>
					</ol>
				</div>
			</div>
			<div class="row">
				<form action="<s:property value="prefix"/>_save.action" id="form1" name="form1" method="post" class="form-horizontal">
					<k:token/>
					<fieldset>
						<div class="form-group">
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">*新密碼:</label>
							<div class="col-sm-3 col-md-3 col-lg-3 text-label">
								<s:password cssClass="form-control" id="userpwd" name="data.map.userpwd"
								            value="%{data.map.userpwd}" autocomplete="new-password"
								/>
							</div>
							<label class="col-sm-2 col-md-2 col-lg-2 control-label">*新密碼確認:</label>
							<div class="col-sm-3 col-md-3 col-lg-3 text-label">
								<s:password cssClass="form-control" id="userpwd" name="data.map.userpwd"
								            value="%{data.map.userpwd}" autocomplete="new-password"
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
	});
	function toSave() {
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