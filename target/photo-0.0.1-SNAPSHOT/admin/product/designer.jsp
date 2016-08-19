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
                            <i class="fa fa-dashboard"></i> 產品管理-設計師版型
                        </li>
                    </ol>
                </div>
            </div>
            <div class="row">
               	<div class="col-lg-12 col-md-12 col-sm-12">   
                	<div id="custom-toolbar2">
                        <div class="form-inline" role="form">
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
                            <th data-field="productSeq" data-align="center" data-sortable="true">所屬產品產品流水號</th>
                            <th data-field="productName" data-align="center" data-sortable="true">所屬產品</th>
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
        $('#refresh2').click(function () {
            refresh2();
        });

        $('#addBtn2').click(function () {
			var u =  '<s:property value="prefix"/>_add2.action?r='+getKTagRandom();
			
		    $('#dgHistoryLabel').html('新增');
		    $('#plHistory').html('<iframe id="ifHistory" src="'+u+'" style="width:100%" height="'+ ($(window).height() - 200)+'" scrolling="auto" frameborder="0"></iframe>');
		    $('#dgHistory').modal({
		        keyboard: false
		    });
		    $('#dgHistory').modal('show');
		    $('.modal-dialog').css('width', '90%');
		    $('.modal-dialog').css('margin', '50px auto 30px auto');
        });
    });

    function refresh2() {
        $('#datas2').bootstrapTable('refresh', {
            url: '<s:property value="prefix"/>_datas2.action'
        });
    }
    
    function refresh2Go() {
    	refresh2();
    }
    
    function queryParams2(params) {
        params["condition.map.name"] = $('#name2').val();
        params["condition.map.status"] = $('#status2').val();
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