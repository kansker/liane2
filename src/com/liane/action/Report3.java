package com.liane.action;

import com.liane.action.client.Report1;
import com.liane.util.MaskUtil;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import kplug.action.EventAction;
import kplug.db.CodeLoader;
import kplug.db.ConfigAgent;
import kplug.db.DBAgent;
import kplug.db.QueryAgent;
import kplug.util.ParamUtil;
import kplug.vo.WParam;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;
import org.apache.struts2.ServletActionContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

public class Report3 extends EventAction {
	private static final long serialVersionUID = 2024628204419943134L;
	private WParam data;
	private WParam condition;
	private JSONObject jsonObj;
	private String table = "report3";
	private String prefix = "admin_report3";
	private String html = "";

	public String execute() {
		condition = new WParam();
		condition.add("offset", 0);
		condition.add("limit", 10);
		condition.addParameter("pasdatee", new java.util.Date());
		condition.addParameter("pasdates", DateUtils.addMonths(new java.util.Date(), -3));
		condition.addParameter("pasdates", condition.getTimeString("pasdates", "yyyy/MM/dd"));

		return SUCCESS;
	}

	public String exp() {
		condition = new WParam();
		condition.add("offset", 0);
		condition.add("limit", 10);
		condition.addParameter("chkrece", new java.util.Date());
		condition.addParameter("chkrecs", DateUtils.addMonths(new java.util.Date(), -3));
		condition.addParameter("chkrecs", condition.getTimeString("chkrecs", "yyyy/MM/dd"));
		return SUCCESS;
	}

	public String view() {
		this.createToken();
		data = QueryAgent.query("q_" + table, condition);
		if (data != null) {
			data.addParameter("method", "view");
			boolean r = genHtml(data);
			this.setSession(table, data);
			return SUCCESS;
		}
		return "fail";
	}

	public boolean genHtml(WParam data) {
		if (data != null) {
			try {
				StringWriter writer = new StringWriter();
				Configuration cfg = new Configuration();
				try {
					cfg.setEncoding(new Locale("zh", "TW", ""), "UTF-8");
					if (FileUtils.getFile(com.liane.action.client.Report1.class.getClassLoader().getResource("/").getPath() + "report3.jsp") != null) {
						cfg.setDirectoryForTemplateLoading(new File(Report1.class.getClassLoader().getResource("/").getPath()));
					} else {
						cfg.setDirectoryForTemplateLoading(new File(ConfigAgent.getConfigValue("pdf_dir")));
					}
				} catch (Exception e) {
					e.printStackTrace();
					cfg.setDirectoryForTemplateLoading(new File(ConfigAgent.getConfigValue("pdf_dir")));
				}
				Template template = cfg.getTemplate("report3.jsp");

				if (data != null) {
					MaskUtil.setNotMask(data, "PTID", 3, 6);
					data.add("NATIONALIT", CodeLoader.loadCodeValue("NATIONALIT", "v", "c", data.getString("NATIONALIT")));
					WParam tt = QueryAgent.query("memberByPASCODE", data);
					if (tt != null) {
						data.add("PASCODE_", tt.getString("userName"));
					} else {
						data.add("PASCODE_", data.getString("PASCODE"));
					}
					data.add("PTSUPPER", CodeLoader.loadCodeValue("PTSUPPER", "v", "c", data.getString("PTSUPPER")));
					data.add("PAS_PUR", CodeLoader.loadCodeValue("PAS_PUR", "v", "c", data.getString("PAS_PUR")));

					tt = QueryAgent.query("memberByCHKCODE", data);
					if (tt != null) {
						data.add("CHKCODE_", tt.getString("userName"));
					} else {
						data.add("CHKCODE_", data.getString("CHKCODE"));
					}
					data.add("SPL_TYPE", CodeLoader.loadCodeValue("SPL_TYPE", "v", "c", data.getString("SPL_TYPE")));
					data.add("CHK_WAY", CodeLoader.loadCodeValue("CHK_WAY", "v", "c", data.getString("CHK_WAY")));
					data.add("CHKQUL", CodeLoader.loadCodeValue("CHKQUL", "v", "c", data.getString("CHKQUL")));
					data.add("PTEDUCAT", CodeLoader.loadCodeValue("PTEDUCAT", "v", "c", data.getString("PTEDUCAT")));
					data.add("CHKDIF_", CodeLoader.loadCodeValue("CHKDIF", "v", "c", data.getString("CHKDIF")));

					tt = QueryAgent.query("areacode", data);
					if (tt != null) {
						data.add("ADDCODEA_", tt.getString("AREANAME"));
					} else {
						data.add("ADDCODEA_", data.getString("ADDCODEA"));
					}
					data.add("CHKINF_", CodeLoader.loadCodeValue("CHKINF", "v", "c", data.getString("CHKINF")));

					tt = QueryAgent.query("areacodeb", data);
					if (tt != null) {
						data.add("ADDCODEB_", tt.getString("AREANAME"));
					} else {
						data.add("ADDCODEB_", data.getString("ADDCODEB"));
					}
					tt = QueryAgent.query("CHKDATA", data);
					if (tt != null) {
						data.add("CHKDATA_", tt.getString("DIANAME"));
					} else {
						data.add("CHKDATA_", data.getString("CHKDATA"));
					}
					data.add("LASTCHKD", CodeLoader.loadCodeValue("LASTCHKD", "v", "c", data.getString("LASTCHKD")));

					tt = QueryAgent.query("SPATH", data);
					if (tt != null) {
						data.add("SPATH", tt.getString("EXANAME"));
					} else {
						data.add("SPATH", data.getString("SPATH"));
					}
					data.add("ULTOMY", CodeLoader.loadCodeValue("ULTOMY", "v", "c", data.getString("ULTOMY")));
					tt = QueryAgent.query("PATH", data);
					if (tt != null) {
						data.add("PATH", tt.getString("EXANAME"));
					} else {
						data.add("PATH", data.getString("PATH"));
					}
					data.add("X_RAY", CodeLoader.loadCodeValue("ULTOMY", "v", "c", data.getString("X_RAY")));
				}

				Map<String, Object> rootMap = new HashMap<String, Object>();
				rootMap.put("data", data);
				rootMap.put("title", "");
				template.process(rootMap, writer);
				writer.flush();
				StringBuffer sb = writer.getBuffer();
				html = sb.toString();
			} catch (IOException e) {
				e.printStackTrace();
				kplug.log.LogUtil.write("daily", e);
			} catch (TemplateException e) {
				e.printStackTrace();
				kplug.log.LogUtil.write("daily", e);
			}
		}
		return true;
	}

	public String update() {
		this.createToken();
		data = QueryAgent.query("q_" + table, condition);
		if (data != null) {
			data.addParameter("method", "update");
			this.setSession(table, data);
			return SUCCESS;
		}
		return "fail";
	}

	public String save() {
		this.initUI();
		if (data == null) {
			this.alert("提交失敗");
			return "json";
		}
		this.useToken();
		WParam nowData = this.getSessionWParam(table);
		nowData.set(data);

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		if (nowData.equals("method", "add")) {
			agent.executeUpdate("add_" + table, nowData);
		} else {
			agent.executeUpdate("update_" + table, nowData);
		}
		boolean r = agent.endTransaction();
		if (r) {
			if (nowData.equals("method", "add") == false) {
				this.addCmd("$('#btnSave').show();");
			}
			nowData.addParameter("method", "update");
			this.alert("提交成功");
		} else {
			this.alert("提交失敗");
		}
		return "json";
	}

	public String remove() {
		this.initUI();
		if (condition == null || condition.getInt("seq") == 0) {
			this.alert("失敗");
			return "json";
		}
		data = QueryAgent.query("q_" + table, condition);
		if (data == null) {
			this.alert("失敗");
			return "json";
		}

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("del_" + table, condition);
		boolean r = agent.endTransaction();
		if (r) {
			this.addCmd("refresh();");
			this.alert("成功");
		} else {
			this.alert("失敗");
		}
		return "json";
	}

	public String delData() {
		this.initUI();
		if (condition == null || condition.isEmpty("chkrecs") || condition.isEmpty("chkrece")) {
			this.alert("失敗");
			return "json";
		}
		condition.addParameter("chkrecs", StringUtils.replace(condition.getString("chkrecs"), "/", ""));
		condition.addParameter("chkrece", StringUtils.replace(condition.getString("chkrece"), "/", ""));
		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("da_report3", condition);
		boolean r = agent.endTransaction();
		if (r) {
			this.addCmd("refresh();");
			this.alert("成功");
		} else {
			this.alert("失敗");
		}
		return "json";
	}

	public String back() {
		condition = this.getSessionWParam(prefix + "condition");
		return SUCCESS;
	}

	public String datas() {
		if (condition == null) {
			condition = new WParam();
		}
		ParamUtil.set(condition, ServletActionContext.getRequest());
		condition.addParameter("pasdates", StringUtils.replace(condition.getString("pasdates"), "/", ""));
		condition.addParameter("pasdatee", StringUtils.replace(condition.getString("pasdatee"), "/", ""));
		this.setSession(prefix + "condition", condition);
		String order = condition.getString("sort");
		if (StringUtils.isNotEmpty(order)) {
			order = order + " " + condition.getString("order");
		}
		List<WParam> list = QueryAgent.queryList("qa_" + table, condition, condition.getInt("offset"), condition.getInt("limit"), order);
		try {
			jsonObj = new JSONObject();
			jsonObj.put("total", condition.getInt(QueryAgent.KEY_TOTAL_RECORD));
			JSONArray jlist = new JSONArray();
			for (int i = 0; i < list.size(); i++) {
				WParam dd = list.get(i);
				JSONObject json = new JSONObject();
				try {
					json.put("seq", dd.getInt("seq"));
					json.put("PTNAME", dd.getString("PTNAME"));
					json.put("PASCODE", dd.getString("PASCODE"));
					json.put("CHKNO", dd.getString("CHKNO"));
					json.put("CHARTNO", dd.getString("CHARTNO"));
					json.put("PASDATE", dd.getString("PASDATE"));
					json.put("CHKDATA", dd.getString("CHKDATA"));
					WParam tt = QueryAgent.query("CHKDATA", dd);
					if (tt != null) {
						json.put("CHKDATA", tt.getString("DIANAME"));
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				jlist.put(json);
			}
			jsonObj.put("rows", jlist);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return "json2";
	}

	public String expdatas() {
		if (condition == null) {
			condition = new WParam();
		}
		ParamUtil.set(condition, ServletActionContext.getRequest());
		condition.addParameter("chkrecs", StringUtils.replace(condition.getString("chkrecs"), "/", ""));
		condition.addParameter("chkrece", StringUtils.replace(condition.getString("chkrece"), "/", ""));
		this.setSession(prefix + "condition", condition);
		String order = condition.getString("sort");
		if (StringUtils.isNotEmpty(order)) {
			order = order + " " + condition.getString("order");
		}
		List<WParam> list = QueryAgent.queryList("qa_" + table, condition, condition.getInt("offset"), condition.getInt("limit"), order);
		try {
			jsonObj = new JSONObject();
			jsonObj.put("total", condition.getInt(QueryAgent.KEY_TOTAL_RECORD));
			JSONArray jlist = new JSONArray();
			for (int i = 0; i < list.size(); i++) {
				WParam dd = list.get(i);
				JSONObject json = new JSONObject();
				try {
					json.put("seq", dd.getInt("seq"));
					json.put("PTNAME", dd.getString("PTNAME"));
					json.put("PASCODE", dd.getString("PASCODE"));
					json.put("CHARTNO", dd.getString("CHARTNO"));
					json.put("CHKREC", dd.getString("CHKREC"));
					json.put("CHKDATA", dd.getString("CHKDATA"));
					WParam tt = QueryAgent.query("CHKDATA", dd);
					if (tt != null) {
						json.put("CHKDATA", tt.getString("DIANAME"));
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				jlist.put(json);
			}
			jsonObj.put("rows", jlist);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return "json2";
	}

	public WParam getData() {
		return data;
	}

	public void setData(WParam data) {
		this.data = data;
	}

	public InputStream getStream() {
		try {
			return new ByteArrayInputStream(jsonObj.toString().getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return null;
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

	public String getHtml() {
		return html;
	}

	public void setHtml(String html) {
		this.html = html;
	}
}
