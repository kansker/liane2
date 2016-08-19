package com.photo.common;

import kplug.vo.WParam;

import org.apache.struts.util.Param;

public class AdminBean {
	private WParam userParam = null;
	private Param orderParam = null;
	private String userId = "";
	private String userPwd = "";
	private boolean login = false;

	public AdminBean() {
	}

	public String getUserId() {
		return userId;
	}

	public WParam getUserParam() {
		return userParam;
	}

	public String getUserPwd() {
		return userPwd;
	}

	public void setUserPw(String userPwd) {
		this.userPwd = userPwd;
	}

	public void setUserParam(WParam userParam) {
		this.userId = userParam.getString("userId");
		this.userPwd = userParam.getString("userPwd");
		this.userParam = userParam;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public boolean isLogin() {
		return login;
	}

	public void setLogin(boolean login) {
		this.login = login;
	}

	public Param getOrderParam() {
		return orderParam;
	}

	public void setOrderParam(Param orderParam) {
		this.orderParam = orderParam;
	}
}
