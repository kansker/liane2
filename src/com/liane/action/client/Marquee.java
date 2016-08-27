package com.liane.action.client;

import kplug.action.EventAction;
import kplug.db.QueryAgent;
import kplug.vo.WParam;

import java.util.List;

public class Marquee extends EventAction {
	private static final long serialVersionUID = 2024628204419943134L;
	private WParam data;
	private WParam condition;
	private List<WParam> list;

	public String execute() {
		setList(QueryAgent.queryList("qa_marquee", new WParam()));
		return SUCCESS;
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

	public List<WParam> getList() {
		return list;
	}

	public void setList(List<WParam> list) {
		this.list = list;
	}
}
