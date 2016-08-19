package com.liane.util;

import kplug.db.DBAgent;
import kplug.db.QueryAgent;
import kplug.vo.WParam;

public class SystemAgent {
	public static String get(String sys_code) {
		WParam cpm = new WParam();
		cpm.addParameter("sys_code", sys_code);
		cpm = QueryAgent.query("QuerySystem", cpm);
		if (cpm != null) {
			return cpm.getString("sys_value");
		}
		return "";
	}

	public static int getInt(String sys_code) {
		WParam cpm = new WParam();
		cpm.addParameter("sys_code", sys_code);
		cpm = QueryAgent.query("QuerySystem", cpm);
		if (cpm != null) {
			return cpm.getInt("sys_value");
		}
		return 0;
	}

	public static double getDouble(String sys_code) {
		WParam cpm = new WParam();
		cpm.addParameter("sys_code", sys_code);
		cpm = QueryAgent.query("QuerySystem", cpm);
		if (cpm != null) {
			return cpm.getDouble("sys_value");
		}
		return 0d;
	}

	public static void set(String sys_code, String sys_value) {
		WParam cpm = new WParam();
		cpm.addParameter("sys_code", sys_code);
		cpm = QueryAgent.query("QuerySystem", cpm);
		DBAgent agent = new DBAgent();
		agent.startTransaction();
		if (cpm == null) {
			cpm = new WParam();
			cpm.addParameter("sys_code", sys_code);
			cpm.addParameter("sys_value", sys_value);
			agent.executeUpdate("AddSystem", cpm);
		} else {
			cpm.addParameter("sys_value", sys_value);
			agent.executeUpdate("UpdateSystem", cpm);
		}
		boolean result = agent.endTransaction();
	}
}
