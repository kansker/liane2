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
                        <li class="active">
                            <i class="fa fa-dashboard"></i> 管理 / 管理員管理 
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
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*帳號:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                            	<s:textfield cssClass="form-control" id="userid" name="data.map.userid"
										value="%{data.map.userid}"
										/>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*姓名:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:textfield cssClass="form-control" id="username" name="data.map.username"
										value="%{data.map.username}"
										/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*密碼:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                            	<s:password cssClass="form-control" id="userpwd" name="data.map.userpwd"
										value="%{data.map.userpwd}"
										/>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*E-mail:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                            	<s:textfield cssClass="form-control" id="email" name="data.map.email"
										value="%{data.map.email}"
										/>
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">*角色:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.roles" cssClass="form-control"
								  		id="roles" 
								  		code="roles" 
										listKey="map.v" 
										listValue="map.c" 
										value="%{data.getString('roles')}" 
										/>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*狀態:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.status" cssClass="form-control"
								  		id="status" 
								  		code="啟停用" 
										listKey="map.id" 
										listValue="map.name" 
										value="%{data.getString('status')}" 
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
            <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
    </div>
    <!-- /#page-wrapper -->
</div>
<!-- /#wrapper -->
<!-- jQuery -->
<script type="text/javascript">
	$(function(){
		$('#form1').bootstrapValidator({
			message: 'This value is not valid',
			feedbackIcons: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},
			fields: {
				"data.map.userid" :{
					validators: {
						notEmpty: {
							message: '[帳號] 必須填寫.'
						}
					}
				},
				"data.map.username" :{
					validators: {
						notEmpty: {
							message: '[姓名] 必須填寫.'
						}
					}
				},
				"data.map.email" :{
					validators: {
						notEmpty: {
							message: '[E-mail] 必須填寫.'
						}
					}
				}
			}
		});
	});
    function toSave() {
    	$('#form1').data('bootstrapValidator').validate();
		if($('#form1').data('bootstrapValidator').isValid() == false){
			alert("請更正紅色錯誤的錯誤消息！");
			return;
		}
		if(confirm('確定送出?')==false){
			return;
		}	
		$.ajax({
		    type: "POST",
		    dataType: 'json',
		 	url: "<s:property value="prefix"/>_save.action",
		 	data: $('#form1').serialize(),
		    success: handleKTagResponse,
		 	error: function(){
		 		alert("failure");
		 	}
		});
    }
    window.alert = function() {
		BootstrapDialog.alert(arguments[0]);
  	};
</script>
<k:script/>