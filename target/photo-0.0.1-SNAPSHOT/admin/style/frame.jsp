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
                            <i class="fa fa-dashboard"></i> 風格管理 / 版面配置管理
                        </li>
                    </ol>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div id="custom-toolbar">
                        <div class="form-inline" role="form">
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-addon">狀態</div>
                                    <k:select name="status" cssClass="form-control"
								  		id="status" 
								  		code="啟停用" 
										listKey="map.id" 
										listValue="map.name" 
										value="%{condition.getString('status')}"
										headerKey="" headerValue="%{pleaseChoose}"
										/>
                                </div>
                            </div>
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
                            <th data-field="name" data-align="center" data-sortable="true">名稱</th>
                            <th data-field="width" data-align="center" data-sortable="true">寬</th>
                            <th data-field="height" data-align="center" data-sortable="true">高</th>
                            <th data-field="num" data-align="center" data-sortable="true">數目</th>
                           <!--  <th data-field="preview" data-formatter="previewF" data-align="center" data-sortable="true">預覽用圖示</th> -->
                            <th data-field="createDate" data-align="center" data-sortable="true">建立時間</th>
                            <th data-field="updateDate" data-align="center" data-sortable="true">更新時間 </th>
                            <th data-field="status" data-align="center" data-sortable="true">狀態</th>
                            <th data-field="operate" data-formatter="operateFormatter" data-events="operateEvents" data-align="left">功能</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
	function previewF(value, row, index) {
		 return '<img alt="" src="layout/'+value+'" height="48"/>';
	}
    function operateFormatter(value, row, index) {
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
    $(function () {
        $('#refresh').click(function () {
            refresh();
        });

        $('#addBtn').click(function () {
        	window.location.href = '<s:property value="prefix"/>_add.action?r='+getKTagRandom();
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
        params.r = getKTagRandom();
        return params;
    }
</script>