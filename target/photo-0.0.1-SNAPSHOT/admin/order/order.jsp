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
                            <i class="fa fa-dashboard"></i> 訂單管理
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
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-addon">狀態</div>
                                    <k:select name="status" cssClass="form-control"
								  		id="status" 
								  		code="order" 
										listKey="map.v" 
										listValue="map.c" 
										value=""
										headerKey="" headerValue="%{pleaseChoose}"
										/>
                                </div>
                            </div> 
                            <div class="input-group">
                                <div class="input-group-addon">訂單號碼</div>
                                <input id="orderNo" class="form-control" type="text" placeholder="訂單號碼" size="10">
                            </div>
                            <div class="input-group">
                                <div class="input-group-addon">帳號</div>
                                <input id="userId" class="form-control" type="text" placeholder="帳號" size="8">
                            </div>
                            <div class="input-group">
                                <div class="input-group-addon">收件人</div>
                                <input id="userName" class="form-control" type="text" placeholder="收件人" size="10">
                            </div>
                            
                            <button type="button" id="refresh" class="btn btn-default">搜尋</button>
                            <!-- <button type="button" id="addBtn" class="btn btn-default">新增</button> -->
                        </div>
                    </div>
                    <table
                            id="vouchers"
                            data-toggle="table"
                            data-url="order_datas.action"
                            data-toolbar="#get"
                            data-pagination="true"
                            data-side-pagination="server"
                            data-page-list="[5, 10, 20, 50, 100, 200]"
                            data-search="false"
                            data-toolbar="#custom-toolbar"
                            data-query-params="queryParams"
                            data-show-columns="true"
                            >
                        <thead>
                        <tr>
                            <th data-field="orderno" data-align="center" data-sortable="true">訂單號碼</th>
                            <th data-field="gpid" data-align="center" data-sortable="true">GPID/圖路徑</th>
                            <th data-field="userId" data-align="center" data-sortable="true">使用者</th>
                            <th data-field="userDate" data-formatter="userDateF" data-align="center" data-sortable="true">建立日期/最後編輯時間 </th>
                            <th data-field="usedPage" data-align="center" data-sortable="true">已編頁數/照片數/本數/頁數</th>
                            <th data-field="productseq" data-align="center" data-sortable="true">產品</th>
                            <th data-field="status" data-formatter="statusF" data-align="center" data-sortable="true">訂單/PDF/電子書狀態</th>
                            <th data-field="pdfpath" data-formatter="pdfFormatter" data-align="left" data-width="100">PDF</th>
                            <th data-field="operate" data-formatter="operateFormatter" data-events="operateEvents" data-align="left">功能</th>
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
                <h4 class="modal-title" id="dgHistoryLabel">内容</h4>
            </div>
            <div class="modal-body" id="plHistory">
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">

	function userDateF(value, row, index) {
		 return [
		           row.userDate,
		           '<br/>',
		           row.createDate
		       ].join('');
	}
	
	function statusF(value, row, index) {
		 return [
		           row.status,
		           '<br/>',
		           row.makeStatus,
		           '<br/>',
		           row.swfStatus
		       ].join('');
	}
	
	function pdfFormatter(value, row, index) {
		var aa = [
		            '<a class="preview ml10" href="',row.preview,'" title="預覽" style="margin-left: 15px;" target="viewClientOrder">',
		            '<i class="glyphicon glyphicon-edit fa-lg"></i>預覽',
		            '</a>',	
		            '<br/><a class="p6 ml10" href="#" title="電子書" style="margin-left: 15px;" onclick="',row.swfPath,'">',
		            '<i class="glyphicon glyphicon-edit fa-lg"></i>電子書',
		            '</a>'
		        ];
		if(row.pdfpath != ""){
			aa.push('<br/><a class="p1 ml10" href="javascript:dwn(\''+row.pdfpath+'\')" title="相簿" style="margin-left: 15px;" target="_blank">');	
			aa.push('<i class="glyphicon glyphicon-edit fa-lg"></i>相簿</a>');
		}
		if(row.coverpdfpath != ""){
			aa.push('<br/><a class="p2 ml10" href="javascript:dwn(\''+row.coverpdfpath+'\')" title="封面" style="margin-left: 15px;" target="_blank">');	
			aa.push('<i class="glyphicon glyphicon-edit fa-lg"></i>封面</a>');
		}
		if(row.insidepath != ""){
			aa.push('<br/><a class="p3 ml10" href="javascript:dwn(\''+row.insidepath+'\')" title="內封面" style="margin-left: 15px;" target="_blank">');	
			aa.push('<i class="glyphicon glyphicon-edit fa-lg"></i>內封面</a>');
		}
		if(row.copyrightpath != ""){
			aa.push('<br/><a class="p4 ml10" href="javascript:dwn(\''+row.copyrightpath+'\')" title="版權頁" style="margin-left: 15px;" target="_blank">');	
			aa.push('<i class="glyphicon glyphicon-edit fa-lg"></i>版權頁</a>');
		}
		if(row.titlepath != ""){
			aa.push('<br/><a class="p5 ml10" href="javascript:dwn(\''+row.titlepath+'\')" title="書名頁" style="margin-left: 15px;" target="_blank">');	
			aa.push('<i class="glyphicon glyphicon-edit fa-lg"></i>書名頁</a>');
		}
		return aa.join('');
	}

	function dwn(uri) 
	{
		var filename = uri.substring(uri.lastIndexOf('/')+1);
	    var link = document.createElement("a");
	    link.download = filename;
	    link.href = uri;
	    link.click();
	}
	
    function operateFormatter(value, row, index) {
    	 return [
                 '<a class="help ml10" href="javascript:void(0)" title="輔助客戶修改" style="margin-left: 15px;">',
                 '<i class="glyphicon glyphicon-edit fa-lg"></i>輔助客戶修改',
                 '</a>',
                 '<a class="reedit ml10" href="javascript:void(0)" title="重新開放編輯" style="margin-left: 15px;">',
                 '<i class="glyphicon glyphicon-edit fa-lg"></i>重新開放編輯',
                 '</a>',
                 //'<br/><a class="update ml10" href="javascript:void(0)" title="修改訂單資料" style="margin-left: 15px;">',
                 //'<i class="glyphicon glyphicon-edit fa-lg"></i>修改訂單資料',
                 //'</a>',
                 //'<a class="detail ml10" href="javascript:void(0)" title="看訂單資訊" style="margin-left: 15px;">',
                 //'<i class="glyphicon glyphicon-edit fa-lg"></i>看訂單資訊',
                 //'</a>',
                 //'<br/><a class="exchange ml10" href="javascript:void(0)" title="換頁" style="margin-left: 15px;">',
                 //'<i class="glyphicon glyphicon-edit fa-lg"></i>換頁',
                 //'</a>',
                 '<br/><a class="userMakeNumber ml10" href="javascript:void(0)" title="校正次數歸零" style="margin-left: 15px;">',
                 '<i class="glyphicon glyphicon-edit fa-lg"></i>校正次數歸零',
                 '</a>',
                 '<a class="designer ml10" href="javascript:void(0)" title="轉換設計師版型" style="margin-left: 15px;">',
                 '<i class="glyphicon glyphicon-edit fa-lg"></i>轉換設計師版型',
                 '</a>',                 
                 '<br/><a class="start ml10" href="javascript:void(0)" title="製作電子書" style="margin-left: 15px;">',
                 '<i class="glyphicon glyphicon-edit fa-lg"></i>製作電子書',
                 '</a>',
                 '<a class="flash ml10" href="javascript:void(0)" title="製作FLASH" style="margin-left: 15px;">',
                 '<i class="glyphicon glyphicon-edit fa-lg"></i>製作FLASH',
                 '</a>',
                 //'<br/><a class="cflash ml10" href="javascript:void(0)" title="製作封面flash" style="margin-left: 15px;">',
                 //'<i class="glyphicon glyphicon-edit fa-lg"></i>製作封面flash',
                 //'</a>',
                 '<a class="remove ml10" href="javascript:void(0)" title="刪除訂單 " style="margin-left: 15px;">',
                 '<i class="glyphicon glyphicon-edit fa-lg"></i>刪除訂單 ',
                 '</a>'
             ].join('');
    }
    window.operateEvents = {
        'click .help': function (e, value, row, index) {
    		var con = {};
    		con["r"] = getKTagRandom();
    		con["condition.map.seq"] = row.seq;
    		jQuery.post(
    				'order_help.action',con, handleKTagResponse, "json"
    			); 
        },
        'click .reedit': function (e, value, row, index) {
        	var con = {};
    		con["r"] = getKTagRandom();
    		con["condition.map.seq"] = row.seq;
    		jQuery.post(
    				'order_reedit.action',con,handleKTagResponse, "json"
    			); 
        },
        'click .update': function (e, value, row, index) {
        	$('#dgHistoryLabel').html('清單');
            $('#plHistory').html('<iframe id="ifHistory" src="admin_order.ko?condition.map.ecoupon_id=' + row.ecoupon_id + '&r='+getKTagRandom()+'" height="560" style="width:100%" scrolling="auto" frameborder="0"></iframe>');
            $('#dgHistory').modal({
                keyboard: false
            });
            $('#dgHistory').modal('show');
            $('.modal-dialog').css('width', '96%');
            $('.modal-dialog').css('margin', '10px auto 10px auto');
        },
        'click .detail': function (e, value, row, index) {
        	location.href = "<s:property value="#request.root"/>admin/hotel/step9_excel.action?condition.map.ecoupon_id=" + row.ecoupon_id + "&r=" + getKTagRandom();
        },
        'click .exchange': function (e, value, row, index) {
        	location.href = "<s:property value="#request.root"/>admin/hotel/step9_excel.action?condition.map.ecoupon_id=" + row.ecoupon_id + "&r=" + getKTagRandom();
        },
        'click .userMakeNumber': function (e, value, row, index) {
        	var con = {};
    		con["r"] = getKTagRandom();
    		con["condition.map.seq"] = row.seq;
    		jQuery.post(
    				'order_usermakenumber.action',con,handleKTagResponse, "json"
    			); 
        },
        'click .designer': function (e, value, row, index) {
        	var con = {};
    		con["r"] = getKTagRandom();
    		con["condition.map.seq"] = row.seq;
    		jQuery.post(
    				'order_designer.action',con,handleKTagResponse, "json"
    			); 
        },        
        'click .start': function (e, value, row, index) {
        	var con = {};
    		con["r"] = getKTagRandom();
    		con["condition.map.seq"] = row.seq;
    		jQuery.post(
    				'order_start.action',con,handleKTagResponse, "json"
    			); 
        },
        'click .flash': function (e, value, row, index) {
        	var con = {};
    		con["r"] = getKTagRandom();
    		con["condition.map.seq"] = row.seq;
    		jQuery.post(
    				'order_flash.action',con,handleKTagResponse, "json"
    			); 
        },
        'click .cflash': function (e, value, row, index) {
        	var con = {};
    		con["r"] = getKTagRandom();
    		con["condition.map.seq"] = row.seq;
    		jQuery.post(
    				'order_cflash.action',con,handleKTagResponse, "json"
    			); 
        },
        'click .remove': function (e, value, row, index) {
        	if(confirm("確定刪除?")==false){
        		return;
        	}
        	var con = {};
    		con["r"] = getKTagRandom();
    		con["condition.map.seq"] = row.seq;
    		jQuery.post(
    				'order_remove.action',con,handleKTagResponse, "json"
    			); 
        },
        'click .list': function (e, value, row, index) {
            $('#dgHistoryLabel').html('清單');
            $('#plHistory').html('<iframe id="ifHistory" src="step9_list.action?condition.map.ecoupon_id=' + row.ecoupon_id + '&r='+getKTagRandom()+'" height="560" style="width:100%" scrolling="auto" frameborder="0"></iframe>');
            $('#dgHistory').modal({
                keyboard: false
            });
            $('#dgHistory').modal('show');
            $('.modal-dialog').css('width', '96%');
            $('.modal-dialog').css('margin', '10px auto 10px auto');
        },
        'click .excel': function (e, value, row, index) {
        	location.href = "<s:property value="#request.root"/>admin/hotel/step9_excel.action?condition.map.ecoupon_id=" + row.ecoupon_id + "&r=" + getKTagRandom();
        }
    };
    $(function () {
        $('#refresh').click(function () {
            refresh();
        });

        $('#addBtn').click(function () {
            $('#plHistory').html('<iframe id="ifHistory" src="step9_add.action?r='+getKTagRandom()+'" height="560" style="width:100%" scrolling="auto" frameborder="0"></iframe>');
            $('#dgHistory').modal({
                keyboard: false
            });
            $('#dgHistory').modal('show');
            $('.modal-dialog').css('width', '96%');
            $('.modal-dialog').css('margin', '10px auto 10px auto');
            iframe_height(740);
        });
    });

    function refresh() {
        $('#vouchers').bootstrapTable('refresh', {
            url: 'order_datas.action'
        });
    }

    function queryParams(params) {
        params["condition.map.status"] = $('#status').val();
        params["condition.map.orderno"] = $('#orderNo').val();
        params["condition.map.userid"] = $('#userId').val();
        params["condition.map.username"] = $('#userName').val();
        params["condition.map.feature"] = $('#feature').val();        
        params.r = getKTagRandom();
        return params;
    }
    
    function centerWindow(theURL,winName,width,height,features) {
        var window_width = width;
        var window_height = height;
        var edfeatures= features;
        var window_top = (screen.height-window_height)/2;
        var window_left = (screen.width-window_width)/2;
        newWindow=window.open(''+ theURL + '',''+ winName + '','width=' + window_width + ',height=' + window_height + ',top=' + window_top + ',left=' + window_left + ',' + features + '');
        newWindow.focus();
    }
</script>