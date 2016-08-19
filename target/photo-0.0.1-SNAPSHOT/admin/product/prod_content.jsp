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
                            <i class="fa fa-dashboard"></i> 產品管理-產品管理-
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
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*產品名稱:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                            	<s:textfield cssClass="form-control" id="name" name="data.map.name"
										value="%{data.map.name}"
										maxlength="40" />
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*顯示順序:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                            	<s:textfield cssClass="form-control" id="prior" name="data.map.prior"
										value="%{data.map.prior}" 
										maxlength="3" />
                            </div>
                        </div>
                        <k:upanel id="upCondition">
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
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*所屬中項:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.cgy1seq" cssClass="form-control"
								  		id="cgy1seq" 
								  		dao="qa_productcgy1_select" 
								  		param="data"
										listKey="map.seq" 
										listValue="map.name" 
										value="%{data.getString('cgy1seq')}" 
										/>
                            </div>
                        </div>
                        </k:upanel>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">*所屬小項:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.productkind" cssClass="form-control"
								  		id="productkind" 
								  		dao="qa_productcgy2_select" 
								  		param="data"
										listKey="map.seq" 
										listValue="map.name" 
										value="%{data.getString('productkind')}" 
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
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">*適用風格:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4">
                               <k:select name="data.map.styles" cssClass="form-control" multiple="true" cssStyle="height:200px"
								  		id="styles" 
								  		dao="qa_photostyle_0" 
										listKey="getString('seq')" 
										listValue="%{map.type_name+':'+map.name + '['+map.width2+'*'+map.height2+']'}" 
										value="%{data.map.styles}" 
										/>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*適用版面配置:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4">
                               <k:select name="data.map.frames" cssClass="form-control" multiple="true" cssStyle="height:200px"
								  		id="frames" 
								  		dao="qa_frame" 
										listKey="getString('seq')" 
										listValue="%{map.name + '['+map.num+'個'+map.width+'*'+map.height+']'}" 
										value="%{data.map.frames}" 
										/>
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">*產品外觀尺寸[寬]:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:textfield cssClass="form-control" id="viewwidth" name="data.map.viewwidth"
										value="%{data.map.viewwidth}" 
										maxlength="4" />
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*產品外觀尺寸[高]:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:textfield cssClass="form-control" id="viewheight" name="data.map.viewheight"
										value="%{data.map.viewheight}" 
										maxlength="4" />
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">*內頁種類:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.pagekind" cssClass="form-control"
								  		id="pagekind" 
								  		code="內頁種類" 
										listKey="map.v" 
										listValue="map.c" 
										value="%{data.getString('pagekind')}" 
										/>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*內頁頁數:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:textfield cssClass="form-control" id="pagenum" name="data.map.pagenum"
										value="%{data.map.pagenum}" 
										maxlength="4" />
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">*內頁大小[寬]:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:textfield cssClass="form-control" id="width" name="data.map.width"
										value="%{data.map.width}" 
										maxlength="4" />
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*內頁大小[高]:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:textfield cssClass="form-control" id="height" name="data.map.height"
										value="%{data.map.height}" 
										maxlength="4" />
                            </div>
                        </div>
                        <div class="form-group">
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
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">*封面大小[寬,高]:</label>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="cwidth" name="data.map.cwidth"
										value="%{data.map.cwidth}" placeholder="寬"
										maxlength="4" />
                            </div>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="cheight" name="data.map.cheight"
										value="%{data.map.cheight}" placeholder="高"
										maxlength="4" />
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">*封面電子書裁切點[X,Y,寬,高]:</label>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="covercutx" name="data.map.covercutx"
										value="%{data.map.covercutx}" placeholder="X"
										maxlength="4" />
                            </div>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="covercuty" name="data.map.covercuty"
										value="%{data.map.covercuty}" placeholder="Y" 
										maxlength="4" />
                            </div>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="covercutw" name="data.map.covercutw"
										value="%{data.map.covercutw}" placeholder="寬" 
										maxlength="4" />
                            </div>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="covercuth" name="data.map.covercuth"
										value="%{data.map.covercuth}" placeholder="高" 
										maxlength="4" />
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">*封底電子書裁切點[X,Y,寬,高]:</label>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="covercutx2" name="data.map.covercutx2"
										value="%{data.map.covercutx2}" placeholder="X"
										maxlength="4" />
                            </div>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="covercuty2" name="data.map.covercuty2"
										value="%{data.map.covercuty2}" placeholder="Y" 
										maxlength="4" />
                            </div>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="covercutw2" name="data.map.covercutw2"
										value="%{data.map.covercutw2}" placeholder="寬" 
										maxlength="4" />
                            </div>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="covercuth2" name="data.map.covercuth2"
										value="%{data.map.covercuth2}" placeholder="高" 
										maxlength="4" />
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">*PDF 1mm等於多少螢幕pix:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:textfield cssClass="form-control" id="mm" name="data.map.mm"
										value="%{data.map.mm}" 
										maxlength="4" />
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*PDF 列印放大率:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:textfield cssClass="form-control" id="printrate" name="data.map.printrate"
										value="%{data.map.printrate}" 
										maxlength="8" />
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">預覽圖示:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               	<s:file id="picture" name="picture"></s:file>
                               	<s:if test="data.isNotEmpty('picture')">
                            		<img id="img_picture" alt="" src="preview/<s:property value="%{data.map.picture}"/>" height="87"/>
                            	</s:if>
                            	<s:else>
                            		<img id="img_picture" alt="" src="images/sp.gif" height="5"/>
                            	</s:else>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*建議價錢:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:textfield cssClass="form-control" id="valuation" name="data.map.valuation"
										value="%{data.map.valuation}" 
										maxlength="10" />
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">電子書:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.ebookseq" cssClass="form-control"
								  		id="ebookseq" 
								  		code="電子書" 
										listKey="map.seq" 
										listValue="map.name" 
										value="%{data.getString('ebookseq')}" 
										headerKey="" headerValue="%{pleaseChoose}"
										/>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">框數限制:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:textfield cssClass="form-control" id="layoutlimit" name="data.map.layoutlimit"
										value="%{data.map.layoutlimit}" placeholder="1#2,2#5,5#3,7#1"
										maxlength="200" />
								ex:一框2個、二框5個、五框3個、七框1個、其他5個<br/>
								1#2,2#5,5#3,7#1
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">是否需要書背:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.backflag" cssClass="form-control"
								  		id="backflag" 
								  		code="NoYes" 
										listKey="map.id" 
										listValue="map.name" 
										value="%{data.getString('backflag')}" 
										/>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">書背背景:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                            	<s:file id="backpic" name="backpic"></s:file>
                            	<s:if test="data.isNotEmpty('backpic')">
                            		<img id="img_backpic" alt="" src="product/<s:property value="%{data.map.backpic}"/>" height="87"/>
                            	</s:if>
                            	<s:else>
                            		<img id="img_backpic" alt="" src="images/sp.gif" height="5"/>
                            	</s:else>
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">紙張厚度:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:textfield cssClass="form-control" id="thickness" name="data.map.thickness"
										value="%{data.map.thickness}" 
										maxlength="10" />
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">*紙張厚度特定數值:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:textfield cssClass="form-control" id="thickspecial" name="data.map.thickspecial"
										value="%{data.map.thickspecial}" 
										maxlength="10" />
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">是否需要內封面:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.insideflag" cssClass="form-control"
								  		id="insideflag" 
								  		code="NoYes" 
										listKey="map.id" 
										listValue="map.name" 
										value="%{data.getString('insideflag')}" 
										/>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">內封面[寬,高]:</label>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="insidew" name="data.map.insidew"
										value="%{data.map.insidew}" placeholder="寬" 
										maxlength="4" />
                            </div>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="insideh" name="data.map.insideh"
										value="%{data.map.insideh}" placeholder="高" 
										maxlength="4" />
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">內封面左背景:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:file id="insidelpic" name="insidelpic"></s:file>
                            	<s:if test="data.isNotEmpty('insidelpic')">
                            		<img id="img_insidelpic" alt="" src="product/<s:property value="%{data.map.insidelpic}"/>" height="87"/>
                            	</s:if>
                           		<s:else>
                            		<img id="img_insidelpic" alt="" src="images/sp.gif" height="5"/>
                            	</s:else>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">內封面右背景:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                            	<s:file id="insiderpic" name="insiderpic"></s:file>
                            	<s:if test="data.isNotEmpty('insiderpic')">
                            		<img id="img_insiderpic" alt="" src="product/<s:property value="%{data.map.insiderpic}"/>" height="87"/>
                            	</s:if>
                            	<s:else>
                            		<img id="img_insiderpic" alt="" src="images/sp.gif" height="5"/>
                            	</s:else>
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">是否需要版權頁:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.copyrightflag" cssClass="form-control"
								  		id="copyrightflag" 
								  		code="NoYes" 
										listKey="map.id" 
										listValue="map.name" 
										value="%{data.getString('copyrightflag')}" 
										/>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">版權頁[寬,高]:</label>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="copyrightw" name="data.map.copyrightw"
										value="%{data.map.copyrightw}" placeholder="寬" 
										maxlength="4" />
                            </div>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="copyrighth" name="data.map.copyrighth"
										value="%{data.map.copyrighth}" placeholder="高" 
										maxlength="4" />
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">版權頁背景:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               	<s:file id="copyrightpic" name="copyrightpic"></s:file>
                            	<s:if test="data.isNotEmpty('copyrightpic')">
                            		<img id="img_copyrightpic" alt="" src="product/<s:property value="%{data.map.copyrightpic}"/>" height="87"/>
                            	</s:if>
                            	<s:else>
                            		<img id="img_copyrightpic" alt="" src="images/sp.gif" height="5"/>
                            	</s:else>
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">是否需要書名頁:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <k:select name="data.map.titleflag" cssClass="form-control"
								  		id="titleflag" 
								  		code="NoYes" 
										listKey="map.id" 
										listValue="map.name" 
										value="%{data.getString('titleflag')}" 
										/>
                            </div>
                            <label class="col-sm-2 col-md-2 col-lg-2 control-label">書名頁[寬,高]:</label>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="titlew" name="data.map.titlew"
										value="%{data.map.titlew}" placeholder="寬" 
										maxlength="4" />
                            </div>
                            <div class="col-sm-2 col-md-2 col-lg-2 text-label">
                               <s:textfield cssClass="form-control" id="titleh" name="data.map.titleh"
										value="%{data.map.titleh}" placeholder="高" 
										maxlength="4" />
                            </div>
                        </div>
                        <div class="form-group">
                        	<label class="col-sm-2 col-md-2 col-lg-2 control-label">書名頁背景:</label>
                            <div class="col-sm-4 col-md-4 col-lg-4 text-label">
                               <s:file id="titlepic" name="titlepic"></s:file>
                            	<s:if test="data.isNotEmpty('titlepic')">
                            		<img id="img_titlepic" alt="" src="product/<s:property value="%{data.map.titlepic}"/>" height="87"/>
                            	</s:if>
                            	<s:else>
                            		<img id="img_titlepic" alt="" src="images/sp.gif" height="87"/>
                            	</s:else>
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
		$('#frames').multiselect({ 
		    maxHeight: 320
		});
		$('#styles').multiselect({ 
		    maxHeight: 320
		});
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
							message: '[產品名稱] 必須填寫.'
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
				"data.map.viewwidth" :{
					validators: {
						notEmpty: {
							message: '[產品外觀尺寸[寬]] 必須填寫.'
						},					
						numeric: {
	                        message: '[產品外觀尺寸[寬]] 必須是數字.'
	                    }
					}
				},
				"data.map.viewheight" :{
					validators: {
						notEmpty: {
							message: '[產品外觀尺寸[高]] 必須填寫.'
						},					
						numeric: {
	                        message: '[產品外觀尺寸[高]] 必須是數字.'
	                    }
					}
				},
				"data.map.pagenum" :{
					validators: {
						notEmpty: {
							message: '[內頁頁數] 必須填寫.'
						},					
						numeric: {
	                        message: '[內頁頁數] 必須是數字.'
	                    }
					}
				},
				"data.map.width" :{
					validators: {
						notEmpty: {
							message: '[內頁大小[寬]] 必須填寫.'
						},					
						numeric: {
	                        message: '[內頁大小[寬]] 必須是數字.'
	                    }
					}
				},
				"data.map.height" :{
					validators: {
						notEmpty: {
							message: '[內頁大小[高]] 必須填寫.'
						},					
						numeric: {
	                        message: '[內頁大小[高]] 必須是數字.'
	                    }
					}
				},
				"data.map.cwidth" :{
					validators: {
						notEmpty: {
							message: '[封面大小[寬]] 必須填寫.'
						},					
						numeric: {
	                        message: '[封面大小[寬]] 必須是數字.'
	                    }
					}
				},
				"data.map.cheight" :{
					validators: {
						notEmpty: {
							message: '[封面大小[高]] 必須填寫.'
						},					
						numeric: {
	                        message: '[封面大小[高]] 必須是數字.'
	                    }
					}
				},
				"data.map.covercutx" :{
					validators: {
						notEmpty: {
							message: '[封面裁切點X] 必須填寫.'
						},					
						numeric: {
	                        message: '[封面裁切點X] 必須是數字.'
	                    }
					}
				},
				"data.map.covercuty" :{
					validators: {
						notEmpty: {
							message: '[封面裁切點Y] 必須填寫.'
						},					
						numeric: {
	                        message: '[封面裁切點Y] 必須是數字.'
	                    }
					}
				},
				"data.map.covercutw" :{
					validators: {
						notEmpty: {
							message: '[封面裁切點寬] 必須填寫.'
						},					
						numeric: {
	                        message: '[封面裁切點寬] 必須是數字.'
	                    }
					}
				},
				"data.map.covercuth" :{
					validators: {
						notEmpty: {
							message: '[封面裁切點高] 必須填寫.'
						},					
						numeric: {
	                        message: '[封面裁切點高] 必須是數字.'
	                    }
					}
				},
				"data.map.covercutx2" :{
					validators: {
						notEmpty: {
							message: '[封底裁切點X] 必須填寫.'
						},					
						numeric: {
	                        message: '[封底裁切點X] 必須是數字.'
	                    }
					}
				},
				"data.map.covercuty2" :{
					validators: {
						notEmpty: {
							message: '[封底裁切點Y] 必須填寫.'
						},					
						numeric: {
	                        message: '[封底裁切點Y] 必須是數字.'
	                    }
					}
				},
				"data.map.covercutw2" :{
					validators: {
						notEmpty: {
							message: '[封底裁切點寬] 必須填寫.'
						},					
						numeric: {
	                        message: '[封底裁切點寬] 必須是數字.'
	                    }
					}
				},
				"data.map.covercuth2" :{
					validators: {
						notEmpty: {
							message: '[封底裁切點高] 必須填寫.'
						},					
						numeric: {
	                        message: '[封底裁切點高] 必須是數字.'
	                    }
					}
				},
				"data.map.mm" :{
					validators: {
						notEmpty: {
							message: '[PDF 1mm等於多少螢幕pix] 必須填寫.'
						},					
						numeric: {
	                        message: '[PDF 1mm等於多少螢幕pix] 必須是數字.'
	                    }
					}
				},
				"data.map.printrate" :{
					validators: {
						notEmpty: {
							message: '[PDF 列印放大率] 必須填寫.'
						},					
						numeric: {
	                        message: '[PDF 列印放大率] 必須是數字.'
	                    }
					}
				},
				"data.map.valuation" :{
					validators: {
						notEmpty: {
							message: '[建議價錢] 必須填寫.'
						},					
						numeric: {
	                        message: '[建議價錢] 必須是數字.'
	                    }
					}
				},
				"data.map.thickness" :{
					validators: {
						numeric: {
	                        message: '[紙張厚度] 必須是數字.'
	                    }
					}
				},
				"data.map.thickspecial" :{
					validators: {
						numeric: {
	                        message: '[紙張厚度特定數值] 必須是數字.'
	                    }
					}
				},
				"data.map.insidew" :{
					validators: {
						numeric: {
	                        message: '[內封面寬] 必須是數字.'
	                    }
					}
				},
				"data.map.insideh" :{
					validators: {
						numeric: {
	                        message: '[內封面高] 必須是數字.'
	                    }
					}
				},
				"data.map.copyrightw" :{
					validators: {
						numeric: {
	                        message: '[版權頁寬] 必須是數字.'
	                    }
					}
				},
				"data.map.copyrighth" :{
					validators: {
						numeric: {
	                        message: '[版權頁高] 必須是數字.'
	                    }
					}
				},
				"data.map.titlew" :{
					validators: {
						numeric: {
	                        message: '[書名頁寬] 必須是數字.'
	                    }
					}
				},
				"data.map.titleh" :{
					validators: {
						numeric: {
	                        message: '[書名頁高] 必須是數字.'
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