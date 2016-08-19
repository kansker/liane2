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
                            <i class="fa fa-dashboard"></i> 風格管理 / 風格管理 / 版面
                        </li>
                    </ol>
                </div>
            </div>
            <!-- /.row -->
            <div class="row" style="width: 98%">
                <form action="<s:property value="prefix"/>_save2.action" id="form1" name="form1" method="post" class="form-horizontal">
                <k:token/>
                    <fieldset>
                        <div class="form-group">
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*頁面種類:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.single" cssClass="form-control"
								  		id="single" 
								  		code="single" 
										listKey="map.v" 
										listValue="map.c" 
										value="%{data.getString('single')}" 
										/>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*用戶變動:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.stable" cssClass="form-control"
								  		id="stable" 
								  		code="stable" 
										listKey="map.v" 
										listValue="map.c" 
										value="%{data.getString('stable')}" 
										/>
                            </div>
                        </div> 
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">預覽圖示:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               	<s:file id="preview" name="preview"></s:file>
                               	<s:if test="data.isNotEmpty('preview')">
                            		<a class="fancybox"	rel="gallery1" id="img_preview2" href="bgpre/<s:property value="%{data.map.preview}"/>" target="_blank" title="預覽圖示"><img id="img_preview" alt="" src="bgpre/<s:property value="%{data.map.preview}"/>" height="87"/></a>
                            	</s:if>
                            	<s:else>
                            		<a class="fancybox"	rel="gallery1" id="img_preview2" href="images/sp.gif" target="_blank" title="預覽圖示"><img id="img_preview" alt="" src="images/sp.gif" height="5"/></a>
                            	</s:else>
                            </div>
                        </div>    
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">左圖低檔:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               	<s:file id="leftPicture" name="leftPicture"></s:file>
                               	<s:if test="data.isNotEmpty('leftPicture')">
                               		<a class="fancybox"	rel="gallery1" id="img_leftPicture" href="bg/<s:property value="%{data.map.leftpicture}"/>" target="_blank" title=預覽">預覽</a>
                            	</s:if>
                            	<s:else>
                            		<a class="fancybox"	rel="gallery1" id="img_leftPicture" href="images/sp.gif" target="_blank" title="高預覽">預覽</a>
                            	</s:else>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">左圖高檔:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               	<s:file id="leftPicture2" name="leftPicture2"></s:file>
                               	<s:if test="data.isNotEmpty('leftPicture2')">
                               		<a class="fancybox"	rel="gallery1" id="img_leftPicture2" href="hbg/<s:property value="%{data.map.leftpicture2}"/>" target="_blank" title="預覽">預覽</a>
                            	</s:if>
                            	<s:else>
                            		<a class="fancybox"	rel="gallery1" id="img_leftPicture2" href="images/sp.gif" target="_blank" title="預覽">預覽</a>
                            	</s:else>
                            </div>
                        </div>    
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">右圖低檔:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               	<s:file id="rightPicture" name="rightPicture"></s:file>
                               	<s:if test="data.isNotEmpty('rightPicture')">
                               		<a class="fancybox"	rel="gallery1" id="img_rightPicture" href="bg/<s:property value="%{data.map.rightpicture}"/>" target="_blank" title="預覽">預覽</a>
                            	</s:if>
                            	<s:else>
                            		<a class="fancybox"	rel="gallery1" id="img_rightPicture" href="images/sp.gif" target="_blank" title="預覽">預覽</a>
                            	</s:else>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">右圖高檔:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               	<s:file id="rightPicture2" name="rightPicture2"></s:file>
                               	<s:if test="data.isNotEmpty('rightPicture2')">
                               		<a class="fancybox"	rel="gallery1" id="img_rightPicture2" href="hbg/<s:property value="%{data.map.rightpicture2}"/>" target="_blank" title="預覽">預覽</a>
                            	</s:if>
                            	<s:else>
                            		<a class="fancybox"	rel="gallery1" id="img_rightPicture2" href="images/sp.gif" target="_blank" title="預覽">預覽</a>
                            	</s:else>
                            </div>
                        </div>  
                    </fieldset>
                    <div class="form-group">
                        <div class="col-sm-12" style="text-align: center;">
                            <button type="button" id="btnSave" class="btn btn-primary" onclick="toSave();"><i class="fa fa-edit"></i>提交
                            </button>
                            <button type="button" class="btn btn-primary" onclick="parent.toClose();"><i class="fa fa-rotate-left"></i>返回
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
		$(".fancybox").fancybox({
			openEffect	: 'none',
			closeEffect	: 'none'
		});
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
							message: '[類別名稱] 必須填寫.'
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
            url: "<s:property value="prefix"/>_save2.action",
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