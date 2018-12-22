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
					<th height="26" style="text-align: center;font-size: 14px"><strong>非 婦 科 抹 片 檢 查 報 告 單</strong></th>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table width="100%" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td height="42" align="right" valign="middle" style="font-size: 12px">收費件式：</td>
					<td width="69" align="left" valign="middle" style="font-size: 12px">${data.getString('itemb')}</td>
					<td width="83" align="right" valign="middle" style="font-size: 12px"> 病理號碼：</td>
					<td width="80" align="left" valign="middle" style="font-size: 12px">${data.getString('itemc')}</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table width="100%" style="border: 1px solid #6B96FA;border-spacing: 1px;">
				<tr>
					<td width="100" style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC">送檢單位</td>
					<td width="40" style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC">姓名</td>
					<td width="40" style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC">年齡</td>
					<td width="60" style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC">病歷號</td>
					<td width="60" style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC">取樣日期</td>
					<td width="60" style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC">收件日期</td>
					<td width="60" style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC"> 報告日期</td>
					<td width="60" style="text-align: center;padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC"> 報告醫師</td>
				</tr>
				<tr>
					<td style="text-align: center;border: 1px solid #6B96FA;font-size: 12px;height: 60px">${data.getString('itemd')}<br/></td>
					<td style="text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('iteme')}<br/></td>
					<td style="text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('itemf')}<br/></td>
					<td style="text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('itemg')}<br/></td>
					<td style="text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('itemh')}<br/></td>
					<td style="text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('itemi')}<br/></td>
					<td style="text-align: center;border: 1px solid #6B96FA;font-size: 12px">${data.getString('itemj')}<br/></td>
					<td style="text-align: center;border: 1px solid #6B96FA;font-size: 12px;width: 60px">${data.getString('itemk')}<br/></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table width="100%" style="border: 1px solid #6B96FA;border-spacing: 1px;">
				<tr>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px;height: 22px;width: 100px"> 組織來源：</td>
					<td style="padding:4px;text-align: left;border: 1px solid #6B96FA;font-size: 12px"> ${data.getString('iteml')} </td>
				</tr>
				<tr>
					<td style="padding:4px;text-align: center;border: 1px solid #6B96FA;font-size: 12px;height: 22px;width: 100px"> History：</td>
					<td style="padding:4px;text-align: left;border: 1px solid #6B96FA;font-size: 12px"> ${data.getString('itemm')} </td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table width="100%" style="border: 1px solid #6B96FA;border-spacing: 1px;">
				<tr>
					<td style="padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC"> Cytopathology Report：</td>
				</tr>
				<tr>
					<td height="150" align="left" valign="top" style="font-size: 12px;padding: 5px"> ${data.getString('itemn')} </td>
				</tr>
			</table>
		</td>
	</tr>
	<tr align="center" valign="middle">
		<td>
			<table width="100%" style="border: 1px solid #6B96FA;border-spacing: 1px;">
				<tr>
					<td style="padding:4px;border: 1px solid #6B96FA;font-size: 12px;background-color: #FFFFCC"> Mirco findings：</td>
				</tr>
				<tr>
					<td height="150" valign="top" style="font-size: 12px;padding: 5px"> ${data.getString('itemo')} </td>
				</tr>
			</table>
		</td>
	</tr>
</table>