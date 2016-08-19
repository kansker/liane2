package com.liane.action.old;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
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
import kplug.vo.WParam;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Frames extends EventAction {
	private static final long serialVersionUID = 2024628204419943134L;
	private WParam data;
	private WParam condition;
	private JSONObject jsonObj;
	private String prefix = "admin_frames";

	protected File preview1;
	protected String preview1ContentType;
	protected String preview1FileName;

	protected File fmd1;
	protected String fmd1ContentType;
	protected String fmd1FileName;

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
		this.setSession("Frames", data);
		return SUCCESS;
	}

	public String update() {
		this.createToken();
		data = QueryAgent.query("q_frames", condition);
		if (data != null) {
			data.addParameter("method", "update");
			this.setSession("Frames", data);
		} else {
			data = new WParam();
			data.addParameter("method", "add");
			this.setSession("Frames", data);
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
		WParam nowData = this.getSessionWParam("Frames");
		nowData.set(data);

		if (preview1 != null) {
			nowData.add("preview1", KeyUtil.genSSOTkId("preview1") + "." + FilenameUtils.getExtension(preview1FileName));
		}
		if (fmd1 != null) {
			nowData.add("fmd1", fmd1FileName);
		}

		String opreview1 = "";
		String ofmd1 = "";
		if (nowData.equals("method", "add") == false) {
			WParam old = QueryAgent.query("q_frames", nowData);
			if (old != null) {
				opreview1 = old.getString("preview1");
				ofmd1 = old.getString("fmd1");
			}
		}

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		nowData.addParameter("del_flag", "N");
		if (nowData.equals("method", "add")) {
			agent.executeUpdate("add_frames", nowData);
		} else {
			agent.executeUpdate("update_frames", nowData);
		}
		boolean r = agent.endTransaction();
		if (r) {
			if (preview1 != null) {
				if (StringUtils.isNotEmpty(opreview1))
					FileUtils.deleteQuietly(new File(ConfigAgent.getConfigValue("photo_fpreview") + opreview1));
				try {
					FileUtils.copyFile(preview1, new File(ConfigAgent.getConfigValue("photo_fpreview") + nowData.getString("preview1")));
					this.addCmd("$('#img_preview1').attr('src', 'fpreview/" + nowData.getString("preview1") + "?r=" + DatePlus.date2DateString(new Date(), "yyyyMMddHHmmss") + "');");
					this.addCmd("$('#a_preview1').attr('href', 'fpreview/" + nowData.getString("preview1") + "?r=" + DatePlus.date2DateString(new Date(), "yyyyMMddHHmmss") + "');");
					this.addCmd("$('#preview1').val('');");
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (fmd1 != null) {
				if (StringUtils.isNotEmpty(ofmd1))
					FileUtils.deleteQuietly(new File(ConfigAgent.getConfigValue("photo_fmd") + ofmd1));
				try {
					FileUtils.copyFile(fmd1, new File(ConfigAgent.getConfigValue("photo_fmd") + nowData.getString("fmd1")));
					this.addCmd("$('#div_fmd1').html('" + nowData.getString("fmd1") + "');");
					this.addCmd("$('#fmd1').val('');");
				} catch (IOException e) {
					e.printStackTrace();
				}
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
		if (condition.getInt("seq") == 0) {
			this.alert("失敗");
			return "json";
		}
		data = QueryAgent.query("q_frames", condition);
		if (data == null) {
			this.alert("失敗");
			return "json";
		}

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("del_frames", condition);
		boolean r = agent.endTransaction();
		if (r) {
			if (data.isNotEmpty("preview1")) {
				FileUtils.deleteQuietly(new File(ConfigAgent.getConfigValue("photo_fpreview") + data.getString("preview1")));
			}
			if (data.isNotEmpty("fmd1")) {
				FileUtils.deleteQuietly(new File(ConfigAgent.getConfigValue("photo_fmd") + data.getString("fmd1")));
			}
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
		List<WParam> list = QueryAgent.queryList("qa_frames", condition, condition.getInt("offset"), condition.getInt("limit"), order);
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
					json.put("cgyseq", dd.getString("cgyname"));
					json.put("preview1", dd.getString("preview1"));
					json.put("fmd1", dd.getString("fmd1"));
					json.put("title", dd.getString("title"));
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

	public File getPreview1() {
		return preview1;
	}

	public void setPreview1(File preview1) {
		this.preview1 = preview1;
	}

	public String getPreview1ContentType() {
		return preview1ContentType;
	}

	public void setPreview1ContentType(String preview1ContentType) {
		this.preview1ContentType = preview1ContentType;
	}

	public String getPreview1FileName() {
		return preview1FileName;
	}

	public void setPreview1FileName(String preview1FileName) {
		this.preview1FileName = preview1FileName;
	}

	public File getFmd1() {
		return fmd1;
	}

	public void setFmd1(File fmd1) {
		this.fmd1 = fmd1;
	}

	public String getFmd1ContentType() {
		return fmd1ContentType;
	}

	public void setFmd1ContentType(String fmd1ContentType) {
		this.fmd1ContentType = fmd1ContentType;
	}

	public String getFmd1FileName() {
		return fmd1FileName;
	}

	public void setFmd1FileName(String fmd1FileName) {
		this.fmd1FileName = fmd1FileName;
	}

}
