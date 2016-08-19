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
                            <i class="fa fa-dashboard"></i> 產品管理-中項管理-
                        </li>
                    </ol>
                </div>
            </div>
            <!-- /.row -->
            <div class="row" style="width: 98%">
                <form action="admin_pcgy1_save.action" id="form1" name="form1" method="post" class="form-horizontal">
                <k:token/>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*中項名稱:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                            	<s:textfield cssClass="form-control" id="name" name="data.map.name"
										value="%{data.map.name}"
										maxlength="20" />
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*顯示順序:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                            	<s:textfield cssClass="form-control" id="prior" name="data.map.prior"
										value="%{data.map.prior}" 
										maxlength="3" />
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">*所屬大項:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.cgyseq" cssClass="form-control"
								  		id="cgyseq" 
								  		dao="qa_productcgy" 
										listKey="map.seq" 
										listValue="map.name" 
										value="%{data.getString('cgyseq')}" 
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
                        <div class="col-sm-6 col-md-6 col-sm-offset-4 col-md-offset-4 ">
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
				"data.map.name" :{
					validators: {
						notEmpty: {
							message: '[大項名稱] 必須填寫.'
						}
					}
				},
				"data.map.prior" :{
					validators: {
						notEmpty: {
							message: '[顯示順序] 必須填寫.'
						},					
						numeric: {
	                        message: '[顯示順序] 必須是數字.'
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
		 	url: "admin_pcgy1_save.action",
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