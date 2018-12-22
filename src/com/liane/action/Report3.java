package com.liane.action;

import kplug.action.EventAction;
import kplug.db.DBAgent;
import kplug.db.QueryAgent;
import kplug.util.ParamUtil;
import kplug.vo.WParam;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;
import org.apache.struts2.ServletActionContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;

public class Report3 extends EventAction {
	private static final long serialVersionUID = 2024628204419943134L;
	private WParam data;
	private WParam condition;
	private JSONObject jsonObj;
	private String table = "report3";
	private String prefix = "admin_report3";

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
			this.setSession(table, data);
			return SUCCESS;
		}
		return "fail";
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
}
