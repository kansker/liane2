package com.liane.action.old;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;

import kplug.action.EventAction;
import kplug.db.CodeLoader;
import kplug.db.DBAgent;
import kplug.db.QueryAgent;
import kplug.util.ParamUtil;
import kplug.vo.WParam;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Pcgy extends EventAction {
	private static final long serialVersionUID = 2024628204419943134L;
	private String prefix = "admin_pcgy";
	private WParam data;
	private WParam condition;
	private JSONObject jsonObj;

	public String execute() {
		condition = new WParam();
		condition.add("offset", 0);
		condition.add("limit", 10);
		return SUCCESS;
	}

	public String add() {
		this.createToken();
		data = new WParam();
		data.addParameter("method", "add");
		this.setSession("Pcgy", data);
		return SUCCESS;
	}

	public String update() {
		this.createToken();
		data = QueryAgent.query("q_productcgy", condition);
		if (data != null) {
			data.addParameter("method", "update");
			this.setSession("Pcgy", data);
		} else {
			data = new WParam();
			data.addParameter("method", "add");
			this.setSession("Pcgy", data);
		}
		return SUCCESS;
	}

	public String save() {
		this.initUI();
		if (data == null) {
			this.alert("提交失敗");
			return "json";
		}
		this.useToken();
		WParam nowData = this.getSessionWParam("Pcgy");
		nowData.set(data);

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		nowData.addParameter("del_flag", "N");
		if (nowData.equals("method", "add")) {
			agent.executeUpdate("add_productcgy", nowData);
		} else {
			agent.executeUpdate("update_productcgy", nowData);
		}
		boolean r = agent.endTransaction();
		if (r) {
			nowData.addParameter("method", "update");
			this.alert("提交成功");
		} else {
			this.alert("提交失敗");
		}
		return "json";
	}

	public String remove() {
		this.initUI();
		if (condition.getInt("seq") == 0) {
			this.alert("失敗");
			return "json";
		}
		data = QueryAgent.query("q_productcgy", condition);
		if (data == null) {
			this.alert("失敗");
			return "json";
		}

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("del_productcgy", condition);
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
		List<WParam> list = QueryAgent.queryList("qa_productcgy", condition, condition.getInt("offset"), condition.getInt("limit"), order);
		try {
			jsonObj = new JSONObject();
			jsonObj.put("total", condition.getInt(QueryAgent.KEY_TOTAL_RECORD));
			JSONArray jlist = new JSONArray();
			for (int i = 0; i < list.size(); i++) {
				WParam dd = list.get(i);
				JSONObject json = new JSONObject();
				try {
					json.put("seq", dd.getInt("seq"));
					json.put("name", dd.getString("name"));
					json.put("prior", dd.getInt("prior"));
					json.put("createDate", dd.getTimeString("createDate", "yyyy/MM/dd HH:mm:ss"));
					json.put("updateDate", dd.getTimeString("updateDate", "yyyy/MM/dd HH:mm:ss"));
					json.put("status", CodeLoader.loadCodeValue("啟停用", "id", "name", dd.getString("status")));
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
