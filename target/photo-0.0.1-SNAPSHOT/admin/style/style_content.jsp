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
                            <i class="fa fa-dashboard"></i> 風格管理 / 風格管理 
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
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                            	<s:textfield cssClass="form-control" id="name" name="data.map.name"
										value="%{data.map.name}"
										maxlength="20" />
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*類別:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                            	 <k:select name="data.map.cgyseq" cssClass="form-control"
								  		id="cgyseq" 
								  		code="cgy" 
										listKey="map.seq" 
										listValue="map.name" 
										value="%{data.getString('cgyseq')}" 
										/>
                            </div>
                        </div>
						<div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">*封面規格[寬,高]:</label>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="width" name="data.map.width"
										value="%{data.map.width}" placeholder="寬"
										maxlength="4" />
                            </div>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="height" name="data.map.height"
										value="%{data.map.height}" placeholder="高"
										maxlength="4" />
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*內頁規格[寬,高]:</label>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="width2" name="data.map.width2"
										value="%{data.map.width2}" placeholder="寬"
										maxlength="4" />
                            </div>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="height2" name="data.map.height2"
										value="%{data.map.height2}" placeholder="高"
										maxlength="4" />
                            </div>
                        </div>      
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">封面選擇圖示:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               	<s:file id="optpicture" name="optpicture"></s:file>
                               	<s:if test="data.isNotEmpty('optpicture')">
                            		<a class="fancybox"	rel="gallery1" id="img_optpicture2" href="opt/<s:property value="%{data.map.optpicture}"/>" target="_blank" title="封面選擇圖示"><img id="img_optpicture" alt="" src="opt/<s:property value="%{data.map.optpicture}"/>" height="87"/></a>
                            	</s:if>
                            	<s:else>
                            		<a class="fancybox"	rel="gallery1" id="img_optpicture2" href="images/sp.gif" target="_blank" title="封面選擇圖示"><img id="img_optpicture" alt="" src="images/sp.gif" height="5"/></a>
                            	</s:else>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*封面種類:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.coverkind" cssClass="form-control"
								  		id="coverkind" 
								  		code="封面種類" 
										listKey="map.v" 
										listValue="map.c" 
										value="%{data.getString('coverkind')}" 
										/>
                            </div>
                        </div>    
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">封面圖高檔:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               	<s:file id="hpicture" name="hpicture"></s:file>
                               	<s:if test="data.isNotEmpty('hpicture')">
                               		<a class="fancybox"	rel="gallery1" id="img_hpicture" href="hcover/<s:property value="%{data.map.hpicture}"/>" target="_blank" title="高檔預覽">高檔預覽</a>
                            	</s:if>
                            	<s:else>
                            		<a class="fancybox"	rel="gallery1" id="img_hpicture" href="images/sp.gif" target="_blank" title="高檔預覽">高檔預覽</a>
                            	</s:else>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">封面圖低檔:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               	<s:file id="lpicture" name="lpicture"></s:file>
                               	<s:if test="data.isNotEmpty('lpicture')">
                               		<a class="fancybox"	rel="gallery1" id="img_lpicture" href="lcover/<s:property value="%{data.map.lpicture}"/>" target="_blank" title="低檔預覽">低檔預覽</a>
                            	</s:if>
                            	<s:else>
                            		<a class="fancybox"	rel="gallery1" id="img_lpicture" href="images/sp.gif" target="_blank" title="低檔預覽">低檔預覽</a>
                            	</s:else>
                            </div>
                        </div>    
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">封底圖高檔:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               	<s:file id="hpicture2" name="hpicture2"></s:file>
                               	<s:if test="data.isNotEmpty('hpicture2')">
                               		<a class="fancybox"	rel="gallery1" id="img_hpicture2" href="hcover/<s:property value="%{data.map.hpicture2}"/>" target="_blank" title="高檔預覽">高檔預覽</a>
                            	</s:if>
                            	<s:else>
                            		<a class="fancybox"	rel="gallery1" id="img_hpicture2" href="images/sp.gif" target="_blank" title="高檔預覽">高檔預覽</a>
                            	</s:else>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">封底圖低檔:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               	<s:file id="lpicture2" name="lpicture2"></s:file>
                               	<s:if test="data.isNotEmpty('lpicture2')">
                               		<a class="fancybox"	rel="gallery1" id="img_lpicture2" href="lcover/<s:property value="%{data.map.lpicture2}"/>" target="_blank" title="低檔預覽">低檔預覽</a>
                            	</s:if>
                            	<s:else>
                            		<a class="fancybox"	rel="gallery1" id="img_lpicture2" href="images/sp.gif" target="_blank" title="低檔預覽">低檔預覽</a>
                            	</s:else>
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
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*風格屬性:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.type" cssClass="form-control"
								  		id="type" 
								  		code="風格屬性" 
										listKey="map.v" 
										listValue="map.c" 
										value="%{data.getString('type')}" 
										/>
                            </div>
                        </div>              
                        <div class="form-group">
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