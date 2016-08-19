<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="k" uri="/struts-kker"%>
<div id="content">
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <ol class="breadcrumb">
                        <li class="active">
                            <i class="fa fa-dashboard"></i> 產品管理-產品管理
                        </li>
                    </ol>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12" id="t1">
                    <div id="custom-toolbar">
                        <div class="form-inline" role="form">
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-addon">狀態</div>
                                    <k:select name="condition.map.status" cssClass="form-control"
								  		id="status" 
								  		code="啟停用" 
										listKey="map.id" 
										listValue="map.name" 
										value="%{condition.getString('status')}"
										headerKey="" headerValue="%{pleaseChoose}"
										/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-addon">特性</div>
                                    <k:select name="condition.map.feature" cssClass="form-control"
								  		id="feature" 
								  		code="特性" 
										listKey="map.v" 
										listValue="map.c" 
										value="%{condition.getString('feature')}"
										headerKey="" headerValue="%{pleaseChoose}"
										/>
                                </div>
                            </div>
                            <k:upanel id="upCondition">
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-addon">所屬大項</div>
                                    <k:select name="condition.map.cgyseq" cssClass="form-control"
								  		id="cgyseq" 
								  		dao="qa_productcgy" 
										listKey="map.seq" 
										listValue="map.name" 
										value="%{condition.getString('cgyseq')}"
										headerKey="" headerValue="%{pleaseChoose}"
										/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-addon">所屬中項</div>
                                    <k:select name="condition.map.cgy1seq" cssClass="form-control"
								  		id="cgy1seq" 
								  		dao="qa_productcgy1_select" 
										listKey="map.seq" 
										listValue="map.name" 
										value=""
										headerKey="" headerValue="%{pleaseChoose}"
										/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-addon">所屬小項</div>
                                    <k:select name="condition.map.productkind" cssClass="form-control"
								  		id="productkind" 
								  		dao="qa_productcgy2_select" 
										listKey="map.seq" 
										listValue="map.name" 
										value=""
										headerKey="" headerValue="%{pleaseChoose}"
										/>
                                </div>
                            </div>
                            </k:upanel>
                            <div class="input-group">
                                <div class="input-group-addon">名稱</div>
                                <s:textfield id="name" cssClass="form-control" type="text" value="%{condition.getString('name')}" placeholder="名稱" size="10"/>
                            </div>
                            <button type="button" id="refresh" class="btn btn-default">搜尋</button>
                            <button type="button" id="addBtn" class="btn btn-default">新增</button>
                        </div>
                    </div>
                    <table
                            id="datas"
                            data-toggle="table"
                            data-url="<s:property value="prefix"/>_datas.action"
                            data-toolbar="#get"
                            data-pagination="true"
                            data-page-number="<s:property value="%{condition.getInt('offset') / condition.getInt('limit')  + 1}"/>"
                            data-page-size=" <s:property value="%{condition.getInt('limit')}"/>"
                            data-side-pagination="server"
                            data-page-list="[5, 10, 20, 50, 100, 200]"
                            data-search="false"
                            data-toolbar="#custom-toolbar"
                            data-query-params="queryParams"
                            >
                        <thead>
                        <tr>
                        	<th data-field="seq" data-align="center" data-sortable="true">流水號</th>
                            <th data-field="name" data-align="center" data-sortable="true">名稱</th>
                            <th data-field="cgyseq" data-align="center" data-sortable="true">所屬大項</th>
                            <th data-field="cgy1seq" data-align="center" data-sortable="true">所屬中項</th>
                            <th data-field="productkind" data-align="center" data-sortable="true">所屬小項</th>
                            <th data-field="prior" data-align="center" data-sortable="true">顯示順序</th>
                            <th data-field="updateDate" data-align="center" data-sortable="true">更新時間 </th>
                            <th data-field="status" data-align="center" data-sortable="true">狀態</th>
                            <th data-field="operate" data-formatter="operateFormatter" data-events="operateEvents" data-align="left">功能</th>
                        </tr>
                        </thead>
                    </table>
                </div>
               	<div class="col-lg-12 col-md-12 col-sm-12" id="t2" style="display: none;">   
                	<div id="custom-toolbar2">
                        <div class="form-inline" role="form">
                        	<button type="button" id="backBtn2" class="btn btn-default">返回</button>
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-addon">狀態</div>
                                    <k:select name="condition.map.status2" cssClass="form-control"
								  		id="status2" 
								  		code="啟停用" 
										listKey="map.id" 
										listValue="map.name" 
										value="%{condition.getString('status2')}"
										headerKey="" headerValue="%{pleaseChoose}"
										/>
                                </div>
                            </div>
                            <div class="input-group">
                                <div class="input-group-addon">名稱</div>
                                <s:textfield id="name2" name="condition.map.name2" cssClass="form-control" type="text" value="%{condition.getString('name2')}" placeholder="名稱" size="10"/>
                            </div>
                            <button type="button" id="refresh2" class="btn btn-default">搜尋</button>
                            <button type="button" id="addBtn2" class="btn btn-default">新增</button>
                        </div>
                    </div>
                    <table
                            id="datas2"
                            data-toggle="table"
                            data-url="<s:property value="prefix"/>_datas2.action"
                            data-toolbar="#get"
                            data-pagination="true"
                            data-side-pagination="server"
                            data-page-list="[5, 10, 20, 50, 100, 200]"
                            data-search="false"
                            data-toolbar="#custom-toolbar2"
                            data-query-params="queryParams2"
                            >
                        <thead>
                        <tr>
                            <th data-field="seq" data-align="center" data-sortable="true">流水號</th>
                            <th data-field="name" data-align="center" data-sortable="true">名稱</th>
                            <th data-field="prior" data-align="center" data-sortable="true">顯示順序</th>
                            <th data-field="preview" data-formatter="previewF2" data-align="center" data-sortable="true">預覽用圖示</th>
                            <th data-field="updateDate" data-align="center" data-sortable="true">更新時間 </th>
                            <th data-field="status" data-align="center" data-sortable="true">狀態</th>
                            <th data-field="operate" data-formatter="operateFormatter2" data-events="operateEvents2" data-align="left">功能</th>
                        </tr>
                        </thead>
                    </table>   
                </div>
            </div>
        </div>
    </div>
</div>

<div id="dgHistory" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="dgHistoryLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>
                <h4 class="modal-title" id="dgHistoryLabel">內容</h4>
            </div>
            <div class="modal-body" id="plHistory">
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
	function previewF2(value, row, index) {
		 return '<img alt="" src="preview/'+value+'" height="48"/>';
	}
    function operateFormatter(value, row, index) {
    	 return [
                 '<a class="update ml10" href="javascript:void(0)" title="修改" style="margin-left: 15px;">',
                 '<i class="glyphicon glyphicon-edit fa-lg"></i>修改',
                 '</a>',
                 '<a class="designer ml10" href="javascript:void(0)" title="設計師版型" style="margin-left: 15px;">',
                 '<i class="glyphicon glyphicon-edit fa-lg"></i>設計師版型',
                 '</a>',
                 '<a class="remove ml10" href="javascript:void(0)" title="刪除 " style="margin-left: 15px;">',
                 '<i class="glyphicon glyphicon-edit fa-lg"></i>刪除 ',
                 '</a>'
             ].join('');
    }
    function operateFormatter2(value, row, index) {
   	 return [
                '<a class="update ml10" href="javascript:void(0)" title="修改" style="margin-left: 15px;">',
                '<i class="glyphicon glyphicon-edit fa-lg"></i>修改',
                '</a>',
                '<a class="setup ml10" href="javascript:void(0)" title="配置" style="margin-left: 15px;">',
                '<i class="glyphicon glyphicon-edit fa-lg"></i>配置',
                '</a>',
                '<a class="remove ml10" href="javascript:void(0)" title="刪除 " style="margin-left: 15px;">',
                '<i class="glyphicon glyphicon-edit fa-lg"></i>刪除 ',
                '</a>'
            ].join('');
	}
    window.operateEvents = {
		'click .designer': function (e, value, row, index) {
			refresh2(row.seq);
		},      		
        'click .update': function (e, value, row, index) {
        	window.location.href = '<s:property value="prefix"/>_update.action?condition.map.seq='+row.seq+'&r='+getKTagRandom();
        },
        'click .remove': function (e, value, row, index) {
        	if(confirm("確定刪除?")==false){
        		return;
        	}
        	var con = {};
    		con["r"] = getKTagRandom();
    		con["condition.map.seq"] = row.seq;
    		jQuery.post(
    				'<s:property value="prefix"/>_remove.action',con,handleKTagResponse, "json"
    			); 
        }
    };
    
    window.operateEvents2 = {
    		'click .setup': function (e, value, row, index) {
    			var con = {};
         		con["r"] = getKTagRandom();
         		con["condition.map.seq"] = row.seq;
         		jQuery.post(
         				'<s:property value="prefix"/>_setup.action',con, 
         				handleKTagResponse,
         				"json"
         			); 
    		},      		
            'click .update': function (e, value, row, index) {
            	var u =  '<s:property value="prefix"/>_update2.action?condition.map.seq='+row.seq+'&r='+getKTagRandom();
    			
    		    $('#dgHistoryLabel').html('更新');
    		    $('#plHistory').html('<iframe id="ifHistory" src="'+u+'" style="width:100%" height="'+ ($(window).height() - 200)+'" scrolling="auto" frameborder="0"></iframe>');
    		    $('#dgHistory').modal({
    		        keyboard: false
    		    });
    		    $('#dgHistory').modal('show');
    		    $('.modal-dialog').css('width', '90%');
    		    $('.modal-dialog').css('margin', '50px auto 30px auto');
            },
            'click .remove': function (e, value, row, index) {
            	if(confirm("確定刪除?")==false){
            		return;
            	}
            	var con = {};
        		con["r"] = getKTagRandom();
        		con["condition.map.seq"] = row.seq;
        		jQuery.post(
        				'<s:property value="prefix"/>_remove2.action',con,handleKTagResponse, "json"
        			); 
            }
        };
    $(function () {
        $('#refresh').click(function () {
            refresh();
        });

        $('#addBtn').click(function () {
        	window.location.href = '<s:property value="prefix"/>_add.action?r='+getKTagRandom();
        });
        
        $('#refresh2').click(function () {
            refresh2(product_seq);
        });

        $('#addBtn2').click(function () {
			var u =  '<s:property value="prefix"/>_add2.action?data.map.productseq='+product_seq+'&r='+getKTagRandom();
			
		    $('#dgHistoryLabel').html('新增');
		    $('#plHistory').html('<iframe id="ifHistory" src="'+u+'" style="width:100%" height="'+ ($(window).height() - 200)+'" scrolling="auto" frameborder="0"></iframe>');
		    $('#dgHistory').modal({
		        keyboard: false
		    });
		    $('#dgHistory').modal('show');
		    $('.modal-dialog').css('width', '90%');
		    $('.modal-dialog').css('margin', '50px auto 30px auto');
        });
        
        $('#backBtn2').click(function () {
        	$('#t1').show();
        	$('#t2').hide();
        });
    });

    function refresh() {
        $('#datas').bootstrapTable('refresh', {
            url: '<s:property value="prefix"/>_datas.action'
        });
    }

    function queryParams(params) {
        params["condition.map.name"] = $('#name').val();
        params["condition.map.status"] = $('#status').val();
        params["condition.map.cgyseq"] = $('#cgyseq').val();
        params["condition.map.cgy1seq"] = $('#cgy1seq').val();
        params["condition.map.productkind"] = $('#productkind').val();
        params["condition.map.feature"] = $('#feature').val();
        params.r = getKTagRandom();
        return params;
    }
    
    var product_seq = 0;
    function refresh2(seq) {
    	product_seq = seq;
    	
        $('#datas2').bootstrapTable('refresh', {
            url: '<s:property value="prefix"/>_datas2.action'
        });
        
    	$('#t1').hide();
    	$('#t2').show();
    }
    
    function refresh2Go() {
    	refresh2(product_seq);
    }
    
    function queryParams2(params) {
        params["condition.map.name"] = $('#name2').val();
        params["condition.map.status"] = $('#status2').val();
        params["condition.map.productseq"] = product_seq;
        params.r = getKTagRandom();
        return params;
    }
    
    function toClose() {
        $('#dgHistory').modal('hide');
    }
    
    window.alert = function() {
  	  BootstrapDialog.alert(arguments[0]);
  	};
</script>
<k:script/>