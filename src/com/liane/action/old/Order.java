package com.liane.action.old;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

import kplug.action.EventAction;
import kplug.db.CodeLoader;
import kplug.db.ConfigAgent;
import kplug.db.DBAgent;
import kplug.db.QueryAgent;
import kplug.util.DatePlus;
import kplug.util.KeyUtil;
import kplug.util.ParamUtil;
import kplug.util.SHA1Util;
import kplug.vo.WParam;

import org.apache.commons.lang.StringUtils;
import org.apache.struts.util.FileUtil;
import org.apache.struts2.ServletActionContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Order extends EventAction {
	private static final long serialVersionUID = 2024628204419943134L;
	private WParam data;
	private WParam condition;
	private JSONObject jsonObj;
	private String prefix = "admin_order";

	public String execute() {
		condition = new WParam();
		condition.add("offset", 0);
		condition.add("limit", 10);
		return SUCCESS;
	}

	public String help() {
		this.initUI();
		if (condition.getInt("seq") == 0) {
			this.alert("失敗!");
			return "json";
		}
		WParam order = QueryAgent.query("QueryAllOrder", condition);
		if (order == null) {
			this.alert("失敗!");
			return "json";
		}
		order.addParameter("urlEnable", 1);
		order.addParameter("orderPwd", KeyUtil.genSSOTkId("frame"));
		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("UpdateOderPwd", order);
		boolean r = agent.endTransaction();
		if (r) {
			this.addCmd("parent.openPage('" +
					ConfigAgent.getConfigValue("album_editor") +
					"?locale=zh_CN&condition.map.admin=1&condition.map.p=" + order.getString("orderPwd") +
					"&condition.map.seq=" + order.getString("seq") + "','輔助客戶修改');");
		} else {
			this.alert("失敗!");
		}
		return "json";
	}

	public String reedit() {
		this.initUI();
		if (condition.getInt("seq") == 0) {
			this.alert("失敗");
			return "json";
		}
		WParam order = QueryAgent.query("QueryAllOrder", condition);
		if (order == null) {
			this.alert("失敗");
			return "json";
		}

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("ReeditOrder", order);
		boolean r = agent.endTransaction();
		if (r) {
			this.alert("成功");
		} else {
			this.alert("失敗");
		}
		return "json";
	}

	public String designer() {
		this.initUI();
		if (condition.getInt("seq") == 0) {
			this.alert("失敗");
			return "json";
		}
		WParam order = QueryAgent.query("QueryAllOrder", condition);
		if (order == null) {
			this.alert("失敗");
			return "json";
		}

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		WParam dpm = order.clone();
		dpm.add("orderSeq", order.getInt("seq"));
		agent.executeUpdate("add_designer", dpm);
		boolean r = agent.endTransaction();
		if (r) {
			this.alert("成功");
		} else {
			this.alert("失敗");
		}
		return "json";
	}

	public String usermakenumber() {
		this.initUI();
		if (condition.getInt("seq") == 0) {
			this.alert("失敗");
			return "json";
		}
		WParam order = QueryAgent.query("QueryAllOrder", condition);
		if (order == null) {
			this.alert("失敗");
			return "json";
		}

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("ReUserMakeNumber", order);
		boolean r = agent.endTransaction();
		if (r) {
			this.alert("成功");
		} else {
			this.alert("失敗");
		}
		return "json";
	}

	public String start() {
		this.initUI();
		if (condition.getInt("seq") == 0) {
			this.alert("失敗");
			return "json";
		}
		WParam order = QueryAgent.query("QueryAllOrder", condition);
		if (order == null) {
			this.alert("失敗");
			return "json";
		}

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("StartMakePDF", order);
		boolean r = agent.endTransaction();
		if (r) {
			this.alert("成功");
		} else {
			this.alert("失敗");
		}
		return "json";
	}

	public String flash() {
		this.initUI();
		if (condition.getInt("seq") == 0) {
			this.alert("失敗");
			return "json";
		}
		WParam order = QueryAgent.query("QueryAllOrder", condition);
		if (order == null) {
			this.alert("失敗");
			return "json";
		}

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("StartMakeSWF", order);
		boolean r = agent.endTransaction();
		if (r) {
			this.alert("成功");
		} else {
			this.alert("失敗");
		}
		return "json";
	}

	public String cflash() {
		this.initUI();
		if (condition.getInt("seq") == 0) {
			this.alert("失敗");
			return "json";
		}
		WParam order = QueryAgent.query("QueryAllOrder", condition);
		if (order == null) {
			this.alert("失敗");
			return "json";
		}

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("StartMakeCoverSWF", order);
		boolean r = agent.endTransaction();
		if (r) {
			this.alert("成功");
		} else {
			this.alert("失敗");
		}
		return "json";
	}

	public String remove() {
		this.initUI();
		if (condition.getInt("seq") == 0) {
			this.alert("失敗");
			return "json";
		}
		WParam order = QueryAgent.query("QueryAllOrder", condition);
		if (order == null) {
			this.alert("失敗");
			return "json";
		}

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("DeleteOrder", order);
		agent.executeUpdate("DeleteOrderPicByOrderSeq", order);
		boolean r = agent.endTransaction();
		if (r) {
			String ldir = ConfigAgent.getConfigValue("photo_user_img") + File.separator + order.getString("userId") + File.separator + order.getString("seq");
			String hdir = ConfigAgent.getConfigValue("photo_huser_img") + File.separator + order.getString("userId") + File.separator + order.getString("seq");
			FileUtil.rmd(ldir);
			FileUtil.rmd(hdir);
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
			order = "a." + order + " " + condition.getString("order");
		}

		String key = DatePlus.date2DateString(new Date(), "yyyyMMdd") + "photoalumn";
		key = SHA1Util.encode(key);
		String pdfDir = ConfigAgent.getConfigValue("photo_root_dir");

		List<WParam> list = QueryAgent.queryList("QueryAllOrder", condition, condition.getInt("offset"), condition.getInt("limit"), order);
		try {
			String album_preview = ConfigAgent.getConfigValue("album_preview");
			jsonObj = new JSONObject();
			jsonObj.put("total", condition.getInt(QueryAgent.KEY_TOTAL_RECORD));
			JSONArray jlist = new JSONArray();
			for (int i = 0; i < list.size(); i++) {
				WParam dd = list.get(i);
				JSONObject json = new JSONObject();
				try {
					json.put("seq", dd.getInt("seq"));
					json.put("orderno", dd.getString("orderno"));
					json.put("gpid", dd.getString("gpid") + "<br/>" + dd.getString("userId") + "/" + dd.getString("seq"));
					json.put("userId", dd.getString("userId") + "<br/>" + dd.getString("userName"));
					json.put("createDate", dd.getTimeString("createDate", "yyyy/MM/dd"));
					json.put("userDate", dd.getTimeString("userDate", "yyyy/MM/dd"));
					json.put("usedPage", dd.getInt("usedPage") + "<br/>" + dd.getInt("amount") + "<br/>" + dd.getInt("bookNum") + "本<br/>" + dd.getInt("pageNum") + "頁");
					json.put("productseq", dd.getString("orderkindsName"));

					json.put("status", CodeLoader.loadCodeValue("order", "v", "c", dd.getString("status")));
					json.put("makeStatus", CodeLoader.loadCodeValue("MakeStatus", "v", "c", dd.getString("makeStatus")));
					json.put("swfStatus", CodeLoader.loadCodeValue("swfStatus", "v", "c", dd.getString("swfStatus")));

					String swfPath = ConfigAgent.getConfigValue("photo_user_jpg") + dd.getString("seq") + File.separator + dd.getTimeString("createDate", "yyyyMMddmmhhss") + File.separator + "book.html";
					if (FileUtil.exists(swfPath)) {
						json.put("swfPath", "centerWindow('jpg/" + dd.getString("seq") + "/" + dd.getTimeString("createDate", "yyyyMMddmmhhss") + "/book.html','viewSWF','" + (dd.getInt("width") + 140) + "','" + (dd.getInt("height") + 120) + "','scrollbars=yes')");
						// <a href="#" onClick="centerWindow('jpg/<pp:field field="seq"/>/<pp:field field="createDate" format="yyyyMMddmmhhss"/>/book.html','viewSWF','<%=w%>','<%=h%>','scrollbars=yes')"><pp:field field="productSeq" code="productKind" reload="false"/></a>
					} else {
						json.put("swfPath", "");
					}

					String pdfPath = pdfDir + dd.getString("pdfPath");
					String coverPdfPath = pdfDir + dd.getString("coverPdfPath");
					String insidePath = pdfDir + dd.getString("insidePath");
					String copyrightPath = pdfDir + dd.getString("copyrightPath");
					String titlePath = pdfDir + dd.getString("titlePath");

					if (dd.getString("pdfPath").length() > 0 && FileUtil.exists(pdfPath)) {
						json.put("pdfpath", dd.getString("pdfpath"));
					} else {
						json.put("pdfpath", "");
					}
					if (dd.getString("coverPdfPath").length() > 0 && FileUtil.exists(coverPdfPath)) {
						json.put("coverpdfpath", dd.getString("coverpdfpath"));
					} else {
						json.put("coverpdfpath", "");
					}
					if (dd.getString("insidePath").length() > 0 && FileUtil.exists(insidePath)) {
						json.put("insidepath", dd.getString("insidepath"));
					} else {
						json.put("insidepath", "");
					}
					if (dd.getString("copyrightPath").length() > 0 && FileUtil.exists(copyrightPath)) {
						json.put("copyrightpath", dd.getString("copyrightpath"));
					} else {
						json.put("copyrightpath", "");
					}
					if (dd.getString("titlePath").length() > 0 && FileUtil.exists(titlePath)) {
						json.put("titlepath", dd.getString("titlepath"));
					} else {
						json.put("titlepath", "");
					}
					json.put("preview", album_preview + "?condition.map.p=" + key + "&condition.map.seq=" + dd.getString("seq"));

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
