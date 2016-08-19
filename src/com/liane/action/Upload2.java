package com.liane.action;

import kplug.action.EventAction;
import kplug.db.DBAgent;
import kplug.db.QueryAgent;
import kplug.vo.WParam;
import org.apache.struts.util.Param;

import java.io.*;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class Upload2 extends EventAction {
	private static final long serialVersionUID = 2024628204419943134L;
	private WParam data;
	private WParam condition;
	private String prefix = "admin_upload2";
	private static String[] item_key = {
			"itemA", "itemB", "itemC", "itemD", "itemE", "itemF", "itemG", "itemH",
			"itemI", "itemJ", "itemK", "itemL", "itemM", "itemN", "itemO", "itemP",
			"itemQ", "itemR", "itemS", "itemT", "itemU", "PASCODE", "itemV", "itemW",
			"itemX", "itemY", "itemZ"};
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
				WParam data = new WParam();
				while (s.length() > 0) {
					boolean flag = false;
					if (s.indexOf("\"") == 0) {
						flag = true;
					}
					if (flag) {
						if (s.indexOf("\",\"") >= 0) {
							s = s.substring(1);
							String item = s.substring(0, s.indexOf("\",\""));
							s = s.substring(s.indexOf("\",\"") + 2, s.length());
							data.addParameter(item_key[index], item.trim());
						} else {
							s = s.substring(1, s.length() - 1);
							data.addParameter(item_key[index], s.trim());
							s = "";
						}
					} else {
						if (s.indexOf(",") >= 0) {
							String item = s.substring(0, s.indexOf(","));
							s = s.substring(s.indexOf(",") + 1, s.length());
							data.addParameter(item_key[index], item.trim());
						} else {
							data.addParameter(item_key[index], s.trim());
							s = "";
						}

					}
					index++;
					if (index == 23)
						break;
				}
				if (index == 22) {
					data.addParameter("status", "1");
					if (data.getString("itemM").length() > 0) {
						StringTokenizer st = new StringTokenizer(data.getString("itemM"), "/");
						if (st.countTokens() < 3) {
							sb.append("第" + count + "筆上傳失敗,資料不明(itemM,日期格式),:"
									+ data.getString("itemM") + "<br>");
							continue;
						}
						String month = st.nextToken();
						String date = st.nextToken();
						String year = st.nextToken();
						if (month.length() == 1)
							month = "0" + month;
						if (date.length() == 1)
							date = "0" + date;
						data.addParameter("itemM", year + "/" + month + "/" + date);
					}

					if (data.getString("itemN").length() > 0) {
						StringTokenizer st = new StringTokenizer(data.getString("itemN"), "/");
						String month = st.nextToken();
						String date = st.nextToken();
						String year = st.nextToken();
						if (month.length() == 1)
							month = "0" + month;
						if (date.length() == 1)
							date = "0" + date;
						data.addParameter("itemN", year + "/" + month + "/" + date);
					}
					if (data.getString("itemP").length() > 0) {
						StringTokenizer st = new StringTokenizer(data.getString("itemP"), "/");
						String month = st.nextToken();
						String date = st.nextToken();
						String year = st.nextToken();
						if (month.length() == 1)
							month = "0" + month;
						if (date.length() == 1)
							date = "0" + date;
						data.addParameter("itemP", year + "/" + month + "/" + date);
					}
					data.addParameter("itemA", data.getString("itemA").replaceAll(" ", ""));
					data.addParameter("itemK", data.getString("itemK").replaceAll(" ", ""));
					if (data.getString("itemA").length() == 0 && data.getString("itemK").length() == 0) {
						sb.append("第" + count + "筆上傳失敗,資料不明(無單位資料和送檢單位),病理號碼:" + data.getString("ItemC") + "<br>");
					} else {
						WParam pm2 = QueryAgent.query("QueryReport2ByItemC", data);
						if (pm2 != null) {
							DBAgent agent = new DBAgent();
							agent.startTransaction();
							agent.executeUpdate("update_report2", data);
							result = agent.endTransaction();
						} else {
							DBAgent agent = new DBAgent();
							agent.startTransaction();
							agent.executeUpdate("add_report2", data);
							result = agent.endTransaction();
						}
						if (!result) {
							System.out.println("-----------------------------------------------");
							System.out.println(data.toString());
							sb.append("第" + count + "筆上傳失敗,病理號碼:" + data.getString("ItemC") + "<br>");
							System.out.println("-----------------------------------------------");
						}
					}
				} else {
					sb.append("第" + count + "筆上傳失敗,資料欄位數有誤,病理號碼:" + data.getString("ItemC") + "<br>");
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
