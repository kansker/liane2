package com.liane.action;

import kplug.action.EventAction;
import kplug.db.CodeLoader;
import kplug.db.DBAgent;
import kplug.db.QueryAgent;
import kplug.util.ParamUtil;
import kplug.vo.WParam;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;
import org.apache.struts.util.DatePlus;
import org.apache.struts2.ServletActionContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;

public class Report2 extends EventAction {
	private static final long serialVersionUID = 2024628204419943134L;
	private WParam data;
	private WParam condition;
	private JSONObject jsonObj;
	private String table = "report2";
	private String prefix = "admin_report2";
	private ByteArrayOutputStream baos = null;
	private String csvFileName = "";

	public String execute() {
		condition = new WParam();
		condition.add("offset", 0);
		condition.add("limit", 10);
		condition.addParameter("itemme", new java.util.Date());
		condition.addParameter("itemms", DateUtils.addMonths(new java.util.Date(), -3));
		condition.addParameter("itemms", condition.getTimeString("itemms", "yyyy/MM/dd"));
		return SUCCESS;
	}

	public String exp() {
		condition = new WParam();
		condition.add("offset", 0);
		condition.add("limit", 10);
		condition.addParameter("itemne", new java.util.Date());
		condition.addParameter("itemns", DateUtils.addMonths(new java.util.Date(), -3));
		condition.addParameter("itemns", condition.getTimeString("itemns", "yyyy/MM/dd"));
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
		if (condition == null || condition.isEmpty("itemns") || condition.isEmpty("itemne")) {
			this.alert("失敗");
			return "json";
		}

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("da_report2", condition);
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
					json.put("itemD", dd.getString("itemD"));
					json.put("itemK", dd.getString("itemK"));
					json.put("itemC", dd.getString("itemC"));
					json.put("itemE", dd.getString("itemE"));
					json.put("itemF", dd.getString("itemF"));
					json.put("itemM", dd.getString("itemM"));
					json.put("itemQ", dd.getString("itemQ"));
					json.put("status", CodeLoader.loadCodeValue("reportStatus", "v", "c", dd.getString("status")));
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
		this.setSession(prefix + "condition", condition);
		String order = condition.getString("sort");
		if (StringUtils.isNotEmpty(order)) {
			order = order + " " + condition.getString("order");
		}
		this.setSession("admin_exp2_csv_condition", condition);
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
					json.put("itemD", dd.getString("itemD"));
					json.put("itemK", dd.getString("itemK"));
					json.put("itemC", dd.getString("itemC"));
					json.put("itemE", dd.getString("itemE"));
					json.put("itemF", dd.getString("itemF"));
					json.put("itemN", dd.getString("itemN"));
					json.put("itemQ", dd.getString("itemQ"));
					json.put("status", CodeLoader.loadCodeValue("reportStatus", "v", "c", dd.getString("status")));
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

	public String csv() {
		condition = this.getSessionWParam("admin_exp2_csv_condition");
		if (condition == null) {
			return SUCCESS;
		}
		List<WParam> list = QueryAgent.queryList("export_report2", condition, 0, 10000, condition.getString("sort"));
		try {
			baos = new ByteArrayOutputStream();

			csvFileName = "export" + DatePlus.getDateString("yyyyMMddHHmmss") + ".csv";
			String[] item_key = {
					"itemA", "itemB", "itemC", "itemD", "itemE", "itemF", "itemG", "itemH",
					"itemI", "itemJ", "itemK", "itemL", "itemM", "itemN", "itemO",
					"itemP", "itemQ", "itemR", "itemS", "itemT", "itemU", "PASCODE", "TID", "itemW",
					"itemX", "itemY", "itemZ"};

			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < list.size(); i++) {
				WParam data = list.get(i);
				if (data.getString("itemM").length() > 0) {
					data.addParameter("itemM", data.getTimestamp("itemM"));
					data.addParameter("itemM", data.getTimeString("itemM", "MM/dd/yyyy"));
				}
				if (data.getString("itemN").length() > 0) {
					data.addParameter("itemN", data.getTimestamp("itemN"));
					data.addParameter("itemN", data.getTimeString("itemN", "MM/dd/yyyy"));
				}
				if (data.getString("itemP").length() > 0) {
					data.addParameter("itemP", data.getTimestamp("itemP"));
					data.addParameter("itemP", data.getTimeString("itemP", "MM/dd/yyyy"));
				}
				for (int j = 0; j < 23; j++) {
					if (j == 0)
						sb.append("\"").append(data.getString(item_key[j]).replaceAll("\n", " ").replaceAll("\r", "")).append("\"");
					else
						sb.append(",\"").append(data.getString(item_key[j]).replaceAll("\n", " ").replaceAll("\r", "")).append("\"");
				}
				sb.append("\n");
			}
			baos.write(sb.toString().getBytes());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	public WParam getData() {
		return data;
	}

	public void setData(WParam data) {
		this.data = data;
	}

	public InputStream getInputStream() {
		try {
			return new ByteArrayInputStream(baos.toByteArray());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public String getCsvFileName() {
		try {
			return new String(csvFileName.getBytes(), "ISO8859-1");
		} catch (Exception ex) {
			return csvFileName;
		}
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
