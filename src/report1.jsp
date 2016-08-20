<table width="100%" border="1" align="center" cellpadding="0" cellspacing="3" bordercolor="#6B96FA">
	<tr>
		<td height="45">
			<table width="100%" height="28" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<th height="28" style="text-align: center">
						${data.getString('itema')}
					</th>
				</tr>
			</table>
			<table width="100%" height="26" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<th height="26" class="style61" style="text-align: center"><strong>非 婦 科 抹 片 檢 查 報 告 單</strong></th>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table width="100%" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td height="42" align="right" valign="middle">收費件式：</td>
					<td width="69" align="left" valign="middle">${data.getString('itemb')}</td>
					<td width="83" align="right" valign="middle" style="font-weight: normal; text-decoration: none; color: #004f54;"> 病理號碼：</td>
					<td width="80" align="left" valign="middle">${data.getString('itemc')}</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table width="100%" border="1" align="center" cellpadding="1" cellspacing="0" bordercolor="#FFFFFF">
				<tr>
					<td width="100" align="center">送檢單位</td>
					<td width="40" align="center">姓名</td>
					<td width="40" align="center">年齡</td>
					<td width="60" align="center">病歷號</td>
					<td width="60" align="center">取樣日期</td>
					<td width="60" align="center">收件日期</td>
					<td width="60" align="center" style="font-weight: normal; text-decoration: none; color: #004f54;"> 報告日期</td>
					<td width="60" align="center" style="font-weight: normal; text-decoration: none; color: #004f54;"> 報告醫師</td>
				</tr>
				<tr>
					<td height="60" align="center">${data.getString('itemd')}<br/></td>
					<td align="center">${data.getString('iteme')}<br/></td>
					<td align="center">${data.getString('itemf')}<br/></td>
					<td align="center">${data.getString('itemg')}<br/></td>
					<td align="center">${data.getString('itemh')}<br/></td>
					<td align="center">${data.getString('itemi')}<br/></td>
					<td align="center">${data.getString('itemj')}<br/></td>
					<td width="60" align="center">${data.getString('itemk')}<br/></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table style="height: 92px;" border="0" align="left" cellpadding="1" cellspacing="1">
				<tr>
					<td width="60" align="center" height="22px"> 組織來源：</td>
					<td align="left"> ${data.getString('iteml')} </td>
				</tr>
				<tr>
					<td align="center" height="22px"> History：</td>
					<td align="left"> ${data.getString('itemm')} </td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table width="100%" border="0" align="left" cellpadding="3" cellspacing="0">
				<tr>
					<td width="87%" height="22"> Cytopathology Report：</td>
				</tr>
				<tr>
					<td height="150" align="left" valign="top" style="padding: 5px"> ${data.getString('itemn')} </td>
				</tr>
			</table>
		</td>
	</tr>
	<tr align="center" valign="middle">
		<td>
			<table width="100%" align="left" cellpadding="3" cellspacing="1">
				<tr>
					<td height="22"> Mirco findings：</td>
				</tr>
				<tr>
					<td height="150" valign="top"> ${data.getString('itemo')} </td>
				</tr>
			</table>
		</td>
	</tr>
</table>