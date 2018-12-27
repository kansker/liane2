package com.liane.action;

import kplug.action.EventAction;
import kplug.db.DBAgent;
import kplug.db.QueryAgent;
import kplug.vo.WParam;
import org.apache.commons.lang.StringUtils;

import java.io.*;
import java.util.ArrayList;

public class Upload3 extends EventAction {
	private static final long serialVersionUID = 2024628204419943134L;
	private WParam data;
	private WParam condition;
	private String prefix = "admin_upload3";
	private static String[] item_key = {
			"PTNAME", "PTBIRTH", "PTID", "PTEDUCAT", "ADDCODEA", "ADDCODEB", "PTSUPPER",
			"LASTCHKD", "CHARTNO", "PASDATE", "PASCODE", "CHKCODE", "CHKREC", "CHKNO",
			"CHKQUL", "CHKDIF", "CHKDIF2", "CHKINF", "CHKDATA", "JPATH", "SPATH", "PATH",
			"CHKSURED", "CHKQTY", "FUN_TYPE", "HFLAG",
			"PTTEL0", "ADDR", "ICD9_1", "ICD9_2", "ICD9_3", "CARDNO", "ULTOMY",
			"X_RAY", "PAS_PUR", "SPL_TYPE", "CHK_WAY", "NATIONALIT", "CARD_NO", "TID"};
	private static int[] item_num = {
			10, 8, 10, 1, 4, 4, 1, 1, 10, 8, 10, 10, 8, 10, 1, 1, 1, 6, 2, 2, 2, 2, 8, 1, 1, 1,
			10, 60, 5, 5, 5, 2, 1, 1, 1, 1, 1, 1, 4, 20};
	private File cvs;
	private String cvsContentType;
	private String cvsFileName;

	public String execute() {
		return SUCCESS;
	}

	public String save() {
		this.initUI();
		if (cvs == null) {
			this.alert("提交失敗");
			this.addCmd("$('#btnSave').show();");
			return "json";
		}
		boolean result = false;
		try {
			FileInputStream fis = new FileInputStream(cvs);
			DataInputStream dis = new DataInputStream(fis);
			InputStreamReader isr = new InputStreamReader(dis, "MS950");
			BufferedReader br = new BufferedReader(isr);
			ArrayList al = new ArrayList();
			String s = "";
			int count = 1;
			StringBuffer sb = new StringBuffer();
			while ((s = br.readLine()) != null) {
				int index = 0;
				if (StringUtils.length(s) <= 10) {
					continue;
				}
				WParam data = new WParam();

				int start = 0;
				byte[] b = s.getBytes();
				for (int i = 0; i < item_key.length; i++) {
					String tmp = "";
					if (start >= b.length) {
						tmp = "";
					} else {
						tmp = new String(b, start, (start + item_num[i]) >= b.length ? b.length - start : item_num[i]);
					}
					data.addParameter(item_key[i], tmp);
					System.out.println(item_key[i] + " = " + tmp);
					start += item_num[i];
				}
				data.addParameter("status", "1");
				if (data.getString("PASCODE").length() == 0) {
					sb.append("第" + count + "筆上傳失敗,資料不明(無單位資料和送檢單位),病理號碼:" + data.getString("CHKNO") + "<br>");
				} else {
					WParam pm2 = QueryAgent.query("QueryReport3ByCHKNO", data);
					if (pm2 != null) {
						DBAgent agent = new DBAgent();
						agent.startTransaction();
						agent.executeUpdate("update_report3", data);
						result = agent.endTransaction();
					} else {
						DBAgent agent = new DBAgent();
						agent.startTransaction();
						agent.executeUpdate("add_report3", data);
						result = agent.endTransaction();
					}
					if (!result) {
						System.out.println("-----------------------------------------------");
						System.out.println(data.toString());
						sb.append("第" + count + "筆上傳失敗,病理號碼:" + data.getString("CHKNO") + "<br>");
						System.out.println("-----------------------------------------------");
					}
				}
				count++;
			}
			if (sb.length() > 0) {
				this.alert(sb.toString());
			} else {
				this.alert("資料全部上傳成功");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		this.addCmd("$('#btnSave').show();");
		return "json";
	}

	public WParam getData() {
		return data;
	}

	public void setData(WParam data) {
		this.data = data;
	}

	public WParam getCondition() {
		return condition;
	}

	public void setCondition(WParam condition) {
		this.condition = condition;
	}

	public String getPrefix() {
		return prefix;
	}

	public File getCvs() {
		return cvs;
	}

	public void setCvs(File cvs) {
		this.cvs = cvs;
	}

	public String getCvsContentType() {
		return cvsContentType;
	}

	public void setCvsContentType(String cvsContentType) {
		this.cvsContentType = cvsContentType;
	}

	public String getCvsFileName() {
		return cvsFileName;
	}

	public void setCvsFileName(String cvsFileName) {
		this.cvsFileName = cvsFileName;
	}
}
