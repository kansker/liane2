<table width="100%" border="1" align="center" cellpadding="2" cellspacing="0" bordercolor="#6B96FA">
	<tr>
		<td height="45" colspan="4">
			<table width="100%" height="60" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<th height="60" class="style61" style="text-align: center"><strong>子宮頸抹片篩檢資料申報系統</strong></th>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td width="140" align="left" height="30">國籍:</td>
		<td width="210" align="rigth">
			${data.getString('NATIONALIT')} <!--code="NATIONALIT"-->
			<br/>
		</td>
		<td width="140" align="left">16.取樣機構:</td>
		<td width="210" align="rigth">
			${data.getString('PASCODE_')} (${data.getString('PASCODE')}) <!--code="memberByPASCODE"-->
			<br/>
		</td>
	</tr>
	<tr>
		<td align="rigth" height="30">1.支付方式:</td>
		<td align="rigth">
			${data.getString('PTSUPPER')} <!--code="PTSUPPER"-->
			<br/>
		</td>
		<td align="rigth">20.細胞病理編號:</td>
		<td align="rigth">
			${data.getString('CHKNO')}
			<br/>
		</td>
	</tr>
	<tr>
		<td align="left" height="30">國際疾病分類號(ICD-9-CM):</td>
		<td align="rigth">
			${data.getString('ICD9_1')}-${data.getString('ICD9_2')}-${data.getString('ICD9_3')}
			<br/>
		</td>
		<td align="left">18.做抹片目的:</td>
		<td align="rigth">
			${data.getString('PAS_PUR')} <!--code="PAS_PUR"-->
			<br/>
		</td>
	</tr>
	<tr>
		<td align="left" height="30">時程代碼 / 健保卡就醫序號:</td>
		<td align="rigth">
			${data.getString('CARD_NO')}
			<br/>
		</td>
		<td align="left">21.判讀機構代碼:</td>
		<td align="rigth">
			(${data.getString('CHKCODE_')})${data.getString('CHKCODE')}<!--code="memberByCHKCODE"-->
			<br/>
		</td>
	</tr>
	<tr>
		<td align="left" height="30">2.姓名:</td>
		<td align="rigth">${data.getString('PTNAME')}<br/></td>
		<td align="left">22.抹片收到日期:</td>
		<td align="rigth">${data.getString('CHKREC')}<br/></td>
	</tr>
	<tr>
		<td align="left" height="30">3.出生日期:</td>
		<td align="rigth">${data.getString('PTBIRTH')}<br/></td>
		<td align="left">23.檢體種類:</td>
		<td align="rigth">
			${data.getString('SPL_TYPE')}<!--code="SPL_TYPE"-->
			<br/></td>
	</tr>
	<tr>
		<td align="left" height="30">4.身分證字號:</td>
		<td align="rigth">${data.getString('PTID')}<br/></td>
		<td align="left">24.閱片方式:</td>
		<td align="rigth">${data.getString('CHK_WAY')} <!--code="CHK_WAY"--><br/></td>
	</tr>
	<tr>
		<td align="left" height="30">5.電話:</td>
		<td align="rigth">${data.getString('PTTEL')}<br/></td>
		<td align="left">25.抹片品質:</td>
		<td align="rigth">${data.getString('CHKQUL')} <!--code="CHKQUL"--><br/></td>
	</tr>
	<tr>
		<td align="left" height="30">6.教育程度:</td>
		<td align="rigth">${data.getString('PTEDUCAT')} <!--code="PTEDUCAT"--><br/></td>
		<td align="left">26.抹片尚可或難以判讀原因:</td>
		<td align="rigth">
			(${data.getString('CHKDIF')})${data.getString('CHKDIF_')} <!--code="CHKDIF"/>-->${data.getString('CHKDIF2')}<br/></td>
	</tr>
	<tr>
		<td align="left" height="30">7.現住址代碼:</td>
		<td align="rigth">${data.getString('ADDCODEA_')}(${data.getString('ADDCODEA')})<br/></td>
		<td align="left">27.可能的感染:</td>
		<td align="rigth">(${data.getString('CHKINF')})${data.getString('CHKINF_')} <!--code="CHKINF"--><br/></td>
	</tr>
	<tr>
		<td align="left" height="30">8.戶籍代碼:</td>
		<td align="rigth">${data.getString('ADDCODEB_')}(${data.getString('ADDCODEB')} <!--code="areacode""-->)<br/></td>
		<td align="left">28.細胞病理診斷:</td>
		<td align="rigth"><b>(${data.getString('CHKDATA')})</b><br/>
			${data.getString('CHKDATA_')}
			<!--code="med28"-->
			<br/></td>
	</tr>
	<tr>
		<td align="left" height="30">9.上次抹片檢查日期:</td>
		<td align="rigth">
			${data.getString('LASTCHKD')}
			<!--code="LASTCHKD"-->
			<br/>
		</td>
		<td align="left">細胞醫檢師:</td>
		<td align="rigth">
			${data.getString('SPATH')}
			<!--code worker-->
			<br/>
		</td>
	</tr>
	<tr>
		<td align="left" height="30">12.子宮是否切除:</td>
		<td align="rigth">
			${data.getString('ULTOMY')}
			<!--code="ULTOMY"-->
			<br/>
		</td>
		<td align="left">病理醫師:</td>
		<td align="rigth">
			${data.getString('PATH')}
			<!--code worker-->
			<br/>
		</td>
	</tr>
	<tr>
		<td align="left" height="30">13.子宮是否接受過放射線治療:</td>
		<td align="rigth">
			${data.getString('X_RAY')}
			<!--code="ULTOMY"-->
			<br/>
		</td>
		<td align="left">確診日期:</td>
		<td align="rigth">${data.getString('CHKSURED')}<br/></td>
	</tr>
	<tr>
		<td align="left" height="30">病歷號:</td>
		<td align="rigth">${data.getString('CHARTNO')}<br/></td>
		<td align="left">採檢片數:</td>
		<td align="rigth">${data.getString('CHKQTY')}<br/></td>
	</tr>
	<tr>
		<td align="left" height="30">15.抹片取樣日期:</td>
		<td align="rigth">${data.getString('PASDATE')}<br/></td>
		<td align="left"><br/></td>
		<td align="rigth"><br/></td>
	</tr>
</table>