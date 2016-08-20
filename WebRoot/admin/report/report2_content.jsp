<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="k" uri="/struts-kker" %>
<style type="text/css">
	<!--
	.textfield {
		border-right: #999999 1px solid;
		border-top: #999999 1px solid;
		border-left: #999999 1px solid;
		border-bottom: #999999 1px solid;
		font-family: "Verdana", "Arial", "Helvetica", "sans-serif", "細明體", "新細明體";
		font-size: 9pt;
		color: #666666;
		background-color: #FFFBC8;
	}

	.style13 {
		font-size: 12px;
		color: #004f54;
		font-weight: normal;
		text-decoration: none;
	}

	.style41 {
		font-size: 12px
	}

	.style42 {
		font-size: 12px;
		color: #004f54;
		font-weight: normal;
		text-decoration: none;
	}

	.style35 {
		color: #000000;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 12px;
		font-style: normal;
		line-height: normal;
	}

	.style43 {
		color: #000000;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 12px;
		font-weight: bold;
	}

	.style55 {
		font-size: small;
		color: #000000;
		font-weight: normal;
		text-decoration: none;
	}

	.style61 {
		font-size: large;
		line-height: normal;
		color: #000000;
		text-decoration: none;
		font-style: normal;
		font-weight: normal;
	}

	.style52 {
		color: #000000;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 14px;
		font-weight: bold;
	}

	-->
</style>
<div id="content">
	<div id="page-wrapper">
		<div class="container-fluid">
			<!-- Page Heading -->
			<div class="row">
				<div class="col-lg-12">
					<ol class="breadcrumb">
						<li class="active">
							<i class="fa fa-dashboard"></i> 報表查詢 / 病理組織檢查報告單
						</li>
					</ol>
				</div>
			</div>
			<!-- /.row -->
			<div class="row" style="width: 98%">
				<form action="<s:property value="prefix"/>_save.action" id="form1" name="form1" method="post" class="form-horizontal">
					<k:token/>
					<table width="720" border="1" align="center" cellpadding="0" cellspacing="3" bordercolor="#6B96FA" bgcolor="#FFFFFF">
						<tr align="center" valign="middle">
							<td width="592" height="45" align="center" valign="middle" bordercolor="#FFFFFF" bgcolor="#6B96FA">
								<div align="center">
									<table width="100%" height="28" border="0" cellpadding="0" cellspacing="0">
										<tr>
											<th height="28" class="style61" style="text-align: center"><s:property value="%{data.map.itema}"/></th>
										</tr>
									</table>
									<table width="100%" height="26" border="0" cellpadding="0" cellspacing="0">
										<tr>
											<th height="26" class="style61" style="text-align: center"><u><strong>病 理 組 織 檢 查 報 告 單</strong></u></th>
										</tr>
									</table>
								</div>
							</td>
						</tr>
						<tr valign="bottom" bordercolor="#4595ED" bgcolor="#FFFFFF">
							<td height="0" align="center" valign="middle" bordercolor="#FFFFFF">
								<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
									<tr bgcolor="#FFFFFF" class="style13">
										<td width="368" height="42" align="right" valign="middle"><span class="style42"><span class="content style41">收費件式：</span></span></td>
										<td width="69" align="left" valign="middle"><span class="style41"><span class="style55"><s:property value="%{data.map.itemb}"/></span></span></td>
										<td width="83" align="right" valign="middle" nowrap><span style="font-weight: normal; text-decoration: none; color: #004f54;" #invalid_attr_id="12px"> 病理號碼：</span></td>
										<td width="80" align="left" valign="middle"><span class="content"><span class="style55"><s:property value="%{data.map.itemc}"/></span></span></td>
									</tr>
								</table>
							</td>
						</tr>
						<tr align="center" valign="middle" bordercolor="#4595ED" bgcolor="#FFFFFF">
							<td height="108" align="center" valign="middle" bordercolor="#FFFFFF" bgcolor="#FFFFFF">
								<table width="100%" border="1" align="center" cellpadding="1" cellspacing="0" bordercolor="#FFFFFF" bgcolor="#FFFFFF">
									<tr align="center" valign="middle" bordercolor="#CCCCCC" bgcolor="#FFFFCC" class="style13">
										<td width="139" height="18" align="center">
											<div align="center">姓名</div>
										</td>
										<td width="49" align="center">
											<div align="center">年齡</div>
										</td>
										<td width="44" align="center">
											<div align="center">性別</div>
										</td>
										<td width="72" align="center" class="style13">
											<div align="center">身分</div>
										</td>
										<td width="70" align="center" class="style13">
											<div align="center">科別</div>
										</td>
										<td width="102" align="center">
											<div align="center">病床號</div>
										</td>
										<td width="80" valign="middle">病歷號碼</td>
									</tr>
									<tr valign="middle" bordercolor="#CCCCCC" bgcolor="#FFFFFF" class="style35">
										<td height="34" align="center">
											<s:textfield cssClass="textfield"
											             id="itemd"
											             name="data.map.itemd"
											             value="%{data.map.itemd}" autocomplete="new-password"
											             size="8"
											             placeholder="姓名"
											/>
										</td>
										<td align="center" class="style13">
											<s:textfield cssClass="textfield"
											             id="iteme"
											             name="data.map.iteme"
											             value="%{data.map.iteme}" autocomplete="new-password"
											             size="3"
											             placeholder="年齡"
											/>
										</td>
										<td align="center">
											<s:textfield cssClass="textfield"
											             id="itemf"
											             name="data.map.itemf"
											             value="%{data.map.itemf}" autocomplete="new-password"
											             size="2"
											             placeholder="性別"
											/>
										</td>
										<td align="center" class="style13" align="center">
											<s:textfield cssClass="textfield"
											             id="itemg"
											             name="data.map.itemg"
											             value="%{data.map.itemg}" autocomplete="new-password"
											             size="8"
											             placeholder="身分"
											/>
										</td>
										<td align="center" class="style13">
											<s:textfield cssClass="textfield"
											             id="itemh"
											             name="data.map.itemh"
											             value="%{data.map.itemh}" autocomplete="new-password"
											             size="8"
											             placeholder="科別"
											/>
										</td>
										<td align="center" class="style13" align="center">
											<s:textfield cssClass="textfield"
											             id="itemi"
											             name="data.map.itemi"
											             value="%{data.map.itemi}" autocomplete="new-password"
											             size="8"
											             placeholder="病床號"
											/>
										</td>
										<td align="center" class="style13">
											<s:textfield cssClass="textfield"
											             id="itemj"
											             name="data.map.itemj"
											             value="%{data.map.itemj}" autocomplete="new-password"
											             size="8"
											             placeholder="病歷號碼"
											/>
										</td>
									</tr>
									<tr valign="middle" bordercolor="#CCCCCC" bgcolor="#FFFFCC" class="style13">
										<td height="16" align="center"> 送檢單位</td>
										<td height="16" colspan="2" align="center"> 送檢醫師</td>
										<td height="16" align="center"> 手術日期</td>
										<td height="16" align="center">收件日期</td>
										<td height="16" align="center" class="style41" style="font-weight: normal; text-decoration: none; color: #004f54;">報告醫師</td>
										<td height="16" align="center" class="content"> 報告日期</td>
									</tr>
									<tr align="center" valign="middle" bordercolor="#CCCCCC" bgcolor="#FFFFFF" class="style35">
										<td height="32" class="style13" align="center"><s:property value="%{data.map.itemk}"/><br></td>
										<td colspan="2">
											<s:textfield cssClass="textfield"
											             id="iteml"
											             name="data.map.iteml"
											             value="%{data.map.iteml}" autocomplete="new-password"
											             size="8"
											             placeholder="送檢醫師"
											/>
										</td>
										<td class="style13" align="center"><s:property value="%{data.map.itemm}"/><br></td>
										<td class="style13"><s:property value="%{data.map.itemn}"/><br></td>
										<td class="style13" div align="center"><s:property value="%{data.map.itemo}"/><br></td>
										<td><span class="style55"><s:property value="%{data.map.itemp}"/><br></span></td>
									</tr>
								</table>
							</td>
						</tr>
						<tr align="center" valign="middle">
							<td height="90" align="center" valign="middle" bordercolor="#FFFFFF" bgcolor="#FFFBF0">
								<table width="100%" border="0" align="left" cellpadding="3" cellspacing="1" bordercolor="#FFFFFF" bgcolor="#6B96FA">
									<!--DWLayoutTable-->
									<tr bordercolor="#FFFFFF" bgcolor="#FFFFFF" class="style13">
										<td width="12%" height="30" align="center" valign="middle" nowrap class="style13">
											<div align="center">組織來源：</div>
										</td>
										<td>
											<s:textfield cssClass="textfield"
											             id="itemq"
											             name="data.map.itemq"
											             value="%{data.map.itemq}" autocomplete="new-password"
											             size="75"
											             placeholder="組織來源"
											/>
										</td>
									</tr>
									<tr bordercolor="#FFFFFF" bgcolor="#FFFFFF" class="style13">
										<td align="center" height="30" valign="middle" nowrap class="style13">
											<div align="center">臨床診斷：</div>
										</td>
										<td>
											<s:textfield cssClass="textfield"
											             id="itemr"
											             name="data.map.itemr"
											             value="%{data.map.itemr}" autocomplete="new-password"
											             size="75"
											             placeholder="臨床診斷"
											/>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td>
								<table width="100%" border="0" align="left" cellpadding="3" cellspacing="0" bgcolor="#FFFFFF">
									<tr align="left" valign="middle" bordercolor="#FFFFFF" bgcolor="#FFFFFF" class="style13">
										<td height="22" bgcolor="#FFFFCC" class="style13 style43  style34 style51" style="padding: 5px">
											Pathological diagnosis ：
										</td>
									</tr>
									<tr>
										<td style="padding: 5px">
											<s:textarea cssClass="textfield"
											            id="items"
											            name="data.map.items"
											            value="%{data.map.items}" autocomplete="new-password"
											            rows="12"
											            cssStyle="width:100%"
											            placeholder="Pathological diagnosis"
											/>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr align="center" valign="middle">
							<td height="108" align="center" valign="middle" bordercolor="#FFFFFF" bgcolor="#FFFFFF">
								<table width="100%" height="100%" border="0" align="left" cellpadding="3" cellspacing="0" bordercolor="#FFFFFF">
									<tr>
										<td height="22" nowrap bgcolor="#FFFFCC" class="style13 style43 style34 style51" style="padding: 5px">
											Gross finding ：
										</td>
									</tr>
									<tr>
										<td style="padding: 5px">
											<s:textarea cssClass="textfield"
											            id="itemt"
											            name="data.map.itemt"
											            value="%{data.map.itemt}" autocomplete="new-password"
											            rows="12"
											            cssStyle="width:100%"
											            placeholder="Gross finding"
											/>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr align="center" valign="middle">
							<td height="108" align="center" valign="middle" bordercolor="#FFFFFF" bgcolor="#FFFFFF">
								<table width="100%" height="100%" align="left" cellpadding="3" cellspacing="1" bordercolor="#FFFFFF" bgcolor="#FFFFFF">
									<tr>
										<td height="22" nowrap bgcolor="#FFFFCC" class="style13 style43 style34 style51" style="padding: 5px">
											Microscopic finging：
										</td>
									</tr>
									<tr>
										<td style="padding: 5px">
											<s:textarea cssClass="textfield"
											            id="itemu"
											            name="data.map.itemu"
											            value="%{data.map.itemu}" autocomplete="new-password"
											            rows="12"
											            cssStyle="width:100%"
											            placeholder="Microscopic finging"
											/>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
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
		</div>
	</div>
</div>
<script type="text/javascript">
	$(function () {
	});
	function toSave() {
		if (confirm('確定送出?') == false) {
			return;
		}
		$('#btnSave').hide();
		$.ajax({
			type: "POST",
			dataType: 'json',
			url: "<s:property value="prefix"/>_save.action",
			data: $('#form1').serialize(),
			success: handleKTagResponse,
			error: function () {
				alert("failure");
			}
		});
	}
	window.alert = function () {
		BootstrapDialog.alert(arguments[0]);
	};
</script>
<k:script/>