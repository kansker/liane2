package com.liane.action;

import kplug.action.WinAction;
import kplug.db.DBAgent;
import kplug.db.QueryAgent;
import kplug.util.ParamUtil;
import kplug.vo.WParam;

import org.apache.struts2.ServletActionContext;

public class Login extends WinAction {
	private static final long serialVersionUID = 1L;

	public String execute() {
		WParam pm = new WParam();
		ParamUtil.set(pm, ServletActionContext.getRequest());
		WParam user = QueryAgent.query("AdminLogin", pm);
		if (user != null) {
			if (user.getInt("power1") != 1 || user.getString("power2").indexOf("B") < 0) {
				return "fail";
			}
			this.setSession("AdminBean", user);
			return "success";
		}
		return "fail";
	}

	public String login() {
		WParam pm = new WParam();
		ParamUtil.set(pm, ServletActionContext.getRequest());
		WParam user = QueryAgent.query("CusLogin", pm);
		if (user != null) {
			if (user.getInt("power1") == 1 && user.getString("power2").indexOf("A") < 0) {
				return "fail";
			}
			this.setSession("UserBean", user);
			return "success";
		}
		return "fail";
	}
}