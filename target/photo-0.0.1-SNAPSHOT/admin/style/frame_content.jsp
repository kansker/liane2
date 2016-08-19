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
                            <i class="fa fa-dashboard"></i> 風格管理 / 版面配置管理
                        </li>
                    </ol>
                </div>
            </div>
            <!-- /.row -->
            <div class="row" style="width: 98%">
                <form action="<s:property value="prefix"/>_save.action" id="form1" name="form1" method="post" class="form-horizontal" enctype="multipart/form-data">
                <k:token/>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*名稱:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                            	<s:textfield cssClass="form-control" id="name" name="data.map.name"
										value="%{data.map.name}"
										maxlength="20" />
                            </div>
                            <%-- <label class="col-sm-2 col-md-2 col-lg-2 control-label">預覽圖示:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               	<s:file id="preview" name="preview"></s:file>
                               	<s:if test="data.isNotEmpty('preview')">
                            		<img id="img_preview" alt="" src="layout/<s:property value="%{data.map.preview}"/>" height="87"/>
                            	</s:if>
                            	<s:else>
                            		<img id="img_preview" alt="" src="images/sp.gif" height="5"/>
                            	</s:else>
                            </div> --%>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">*適合頁面尺寸[寬]:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:textfield cssClass="form-control" id="width" name="data.map.width"
										value="%{data.map.width}" 
										maxlength="4" />
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*適合頁面尺寸[高]:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:textfield cssClass="form-control" id="height" name="data.map.height"
										value="%{data.map.height}" 
										maxlength="4" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*適用產品:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.products" cssClass="form-control" multiple="true" cssStyle="height:200px"
								  		id="products" 
								  		dao="qa_orderkinds" 
										listKey="getString('seq')" 
										listValue="map.name" 
										value="%{data.map.products}" 
										/>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*版面範圍:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.kind" cssClass="form-control"
								  		id="kind" 
								  		code="版面範圍" 
										listKey="map.v" 
										listValue="map.c" 
										value="%{data.getString('kind')}" 
										/>
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">*設置數目:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:textfield cssClass="form-control" id="num" name="data.map.num"
										value="%{data.map.num}" 
										maxlength="4" />
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
		$('#products').multiselect();
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
				},
				"data.map.width" :{
					validators: {
						notEmpty: {
							message: '[適合頁面尺寸[寬]] 必須填寫.'
						},					
						numeric: {
	                        message: '[適合頁面尺寸[寬]] 必須是數字.'
	                    }
					}
				},
				"data.map.height" :{
					validators: {
						notEmpty: {
							message: '[適合頁面尺寸[高]] 必須填寫.'
						},					
						numeric: {
	                        message: '[適合頁面尺寸[高]] 必須是數字.'
	                    }
					}
				},
				"data.map.height" :{
					validators: {
						notEmpty: {
							message: '[設置數目] 必須填寫.'
						},					
						numeric: {
	                        message: '[設置數目] 必須是數字.'
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
		var formData = new FormData($('#form1')[0]);
		$.ajax({
		    type: "POST",
		    dataType: 'json',
		    enctype: 'multipart/form-data',
		    processData: false,  // tell jQuery not to process the data
            contentType: false,   // tell jQuery not to set contentType
            url: "<s:property value="prefix"/>_save.action",
		 	data: formData,//$('#form1').serialize(),
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