<table style="border: 1px solid #6B96FA;border-spacing: 5px;border-collapse: separate;width: 600px;margin-left:auto;margin-right:auto;">
	<tr>
		<td height="45">
			<table width="100%" height="28" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<th height="28" style="text-align: center;font-size: 14px">
						${data.getString('itema')}
					</th>
				</tr>
				<tr>
					<th height="26" style="text-align: center;font-size: 14px"><strong>病 理 組 織 檢 查 報 告 單</strong></th>
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
			<table width="100%" style="border: 1px solid #6B96FA;border-spacing: 1px;">
				<tr>
					<td width="60" style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC">姓名</td>
					<td width="40" style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC">年齡</td>
					<td width="40" style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC">性別</td>
					<td width="60" style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC">身分</td>
					<td width="60" style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC">科別</td>
					<td width="60" style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC">病床號</td>
					<td width="60" style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC">病歷號碼</td>
				</tr>
				<tr>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px;">${data.getString('itemd')}<br/></td>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('iteme')}<br/></td>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('itemf')}<br/></td>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('itemg')}<br/></td>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('itemh')}<br/></td>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('itemi')}<br/></td>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('itemj')}<br/></td>
				</tr>
				<tr>
					<td style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC"> 送檢單位</td>
					<td style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC"> 送檢醫師</td>
					<td style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC">手術日期</td>
					<td style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC">收件日期</td>
					<td style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC" colspan="2">報告醫師</td>
					<td style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC">報告日期</td>
				</tr>
				<tr>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('itemk')}<br/></td>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('iteml')}<br/></td>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('itemm')}<br/></td>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('itemn')}<br/></td>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px" colspan="2">${data.getString('itemo')}<br/></td>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('itemp')}<br/></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table width="100%" style="border: 1px solid #6B96FA;border-spacing: 1px;">
				<tr>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px;height: 22px;width: 100px"> 組織來源：</td>
					<td style="padding:4px;text-align: left;border: 1px solid #6B96FA;font-size: 12px"> ${data.getString('itemq')} </td>
				</tr>
				<tr>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px;height: 22px;width: 100px"> 臨床診斷：</td>
					<td style="padding:4px;text-align: left;border: 1px solid #6B96FA;font-size: 12px"> ${data.getString('itemr')} </td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table width="100%" style="border: 1px solid #6B96FA;border-spacing: 1px;">
				<tr>
					<td style="padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC"> Pathological diagnosis：</td>
				</tr>
				<tr>
					<td height="150" align="left" valign="top" style="font-size: 12px;padding: 5px"> ${data.getString('items')} </td>
				</tr>
			</table>
		</td>
	</tr>
	<tr align="center" valign="middle">
		<td>
			<table width="100%" style="border: 1px solid #6B96FA;border-spacing: 1px;">
				<tr>
					<td style="padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC"> Gross finding：</td>
				</tr>
				<tr>
					<td height="150" valign="top" style="font-size: 12px;padding: 5px"> ${data.getString('itemt')} </td>
				</tr>
			</table>
		</td>
	</tr>
	<tr align="center" valign="middle">
		<td>
			<table width="100%" style="border: 1px solid #6B96FA;border-spacing: 1px;">
				<tr>
					<td style="padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC"> Microscopic finding：</td>
				</tr>
				<tr>
					<td height="150" valign="top" style="font-size: 12px;padding: 5px"> ${data.getString('itemu')} </td>
				</tr>
			</table>
		</td>
	</tr>
</table>