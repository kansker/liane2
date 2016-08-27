package com.liane.action.client;

import kplug.action.EventAction;
import kplug.db.ConfigAgent;
import kplug.db.QueryAgent;
import kplug.util.ParamUtil;
import kplug.vo.WParam;
import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.*;
import java.util.List;

public class Ppt extends EventAction {
	private static final long serialVersionUID = 2024628204419943134L;
	private WParam data;
	private WParam condition;
	private JSONObject jsonObj;
	private String table = "ppt";
	private String prefix = "ppt";
	private String seq;
	private String contentType;
	private String fileName;

	public String execute() {
		condition = new WParam();
		condition.add("offset", 0);
		condition.add("limit", 10);
		return SUCCESS;
	}

	public String execute2() {
		return SUCCESS;
	}

	public InputStream getPpt() {
		String fpath = "";
		String file_name = "";
		WParam fpm = new WParam();
		fpm.addParameter("seq", getSeq());
		fpm = QueryAgent.query("q_ppt", fpm);
		if (fpm != null) {
			fpath = ConfigAgent.getConfigValue("ppt_dir") + fpm.getString("path");
			file_name = fpm.getString("file_name");
		}
		if (!StringUtils.isEmpty(fpath)) {
			try {
				FileInputStream fis = new FileInputStream(fpath);
				byte[] b = new byte[fis.available()];
				fis.read(b);
				fis.close();
				if (file_name.toLowerCase().endsWith(".rar")) {
					contentType = "application/rar";
				} else if (file_name.toLowerCase().endsWith(".zip")) {
					contentType = "application/zip";
				} else if (file_name.toLowerCase().endsWith(".gif")) {
					contentType = "image/gif";
				} else if (file_name.toLowerCase().endsWith(".jpg")) {
					contentType = "image/jpeg";
				} else if (file_name.toLowerCase().endsWith(".png")) {
					contentType = "image/png";
				} else if (file_name.toLowerCase().endsWith(".ppt")) {
					contentType = "application/pdf";
				} else if (file_name.toLowerCase().endsWith(".pps")) {
					contentType = "application/pdf";
				} else if (file_name.toLowerCase().endsWith(".pdf")) {
					contentType = "application/pdf";
				} else if (file_name.toLowerCase().endsWith(".xls")) {
					contentType = "application/x-excel";
				} else if (file_name.toLowerCase().endsWith(".txt") || file_name.toLowerCase().endsWith(".log")) {
					contentType = "text/plain";
				} else if (file_name.toLowerCase().endsWith(".doc") || file_name.toLowerCase().endsWith(".docx")) {
					contentType = "application/msword";
				} else if (file_name.toLowerCase().endsWith(".rtf")) {
					contentType = "text/rtf";
				} else {
					contentType = "application/zip";
				}
				fileName = java.net.URLEncoder.encode(file_name, "UTF-8");
				return new ByteArrayInputStream(b);
			} catch (Exception ex) {
				return new ByteArrayInputStream(new byte[1]);
			}
		}
		return new ByteArrayInputStream(new byte[1]);
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
		condition.addParameter("power1", 1);
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
					json.put("title", dd.getString("title"));
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

	public String getSeq() {
		return seq;
	}

	public void setSeq(String seq) {
		this.seq = seq;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}
}
