package com.liane.action.client;

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

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;

public class User extends EventAction {
	private static final long serialVersionUID = 2024628204419943134L;
	private WParam data;
	private WParam condition;
	private JSONObject jsonObj;
	private String table = "member";
	private String prefix = "cus_user";

	public String execute() {
		return SUCCESS;
	}

	public String save() {
		this.initUI();
		if (data == null) {
			this.alert("提交失敗");
			return "json";
		}
		if (data.isEmpty("userPwd")) {
			this.alert("未填寫新密碼!");
			return "json";
		}
		if (data.equals("userPwd", data.getString("userPwd2"))) {
			this.alert("密碼不一致!");
			return "json";
		}
		WParam userBean = (WParam) this.getSessionWParam("UserBean");
		userBean.addParameter("userPwd", data.getString("userPwd"));
		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("update_member_pwd", userBean);
		boolean r = agent.endTransaction();
		if (r) {
			this.alert("提交成功");
		} else {
			this.alert("提交失敗");
		}
		return "json";
	}

	public String back() {
		condition = this.getSessionWParam(prefix + "condition");
		return SUCCESS;
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
