package com.liane.action.old;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;

import kplug.action.EventAction;
import kplug.db.CodeLoader;
import kplug.db.ConfigAgent;
import kplug.db.DBAgent;
import kplug.db.QueryAgent;
import kplug.util.ParamUtil;
import kplug.vo.WParam;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.struts.util.FileUtil;
import org.apache.struts2.ServletActionContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.photo.util.ZipUtil;

public class Ebooks extends EventAction {
	private static final long serialVersionUID = 2024628204419943134L;
	private WParam data;
	private WParam condition;
	private JSONObject jsonObj;
	private String prefix = "admin_ebooks";

	protected File preview;
	protected String previewContentType;
	protected String previewFileName;

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
		this.setSession("Ebooks", data);
		return SUCCESS;
	}

	public String update() {
		this.createToken();
		data = QueryAgent.query("q_ebooks", condition);
		if (data != null) {
			data.addParameter("method", "update");
			this.setSession("Ebooks", data);
		} else {
			data = new WParam();
			data.addParameter("method", "add");
			this.setSession("Ebooks", data);
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
		WParam nowData = this.getSessionWParam("Ebooks");
		nowData.set(data);

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		nowData.addParameter("del_flag", "N");
		if (nowData.equals("method", "add")) {
			agent.executeUpdate("add_ebooks", nowData);
		} else {
			agent.executeUpdate("update_ebooks", nowData);
		}
		boolean r = agent.endTransaction();
		if (r) {
			if (preview != null) {
				try {
					File d = new File(ConfigAgent.getConfigValue("photo_ebook") + nowData.getString("seq"));
					if (d.exists())
						FileUtils.deleteDirectory(d);
				} catch (IOException e) {
					e.printStackTrace();
				}
				FileUtils.deleteQuietly(new File(ConfigAgent.getConfigValue("photo_ebook") + nowData.getString("seq") + ".zip"));
				try {
					FileUtils.copyFile(preview, new File(ConfigAgent.getConfigValue("photo_ebook") + nowData.getString("seq") + ".zip"));
					FileUtil.mkdirs(ConfigAgent.getConfigValue("photo_ebook") + File.separator + nowData.getString("seq") + File.separator);
					ZipUtil.extract(ConfigAgent.getConfigValue("photo_ebook") + File.separator + nowData.getString("seq") + ".zip", ConfigAgent.getConfigValue("photo_ebook") + File.separator + nowData.getString("seq") + File.separator);
					this.addCmd("$('#preview').val('');");
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
		data = QueryAgent.query("q_ebooks", condition);
		if (data == null) {
			this.alert("失敗");
			return "json";
		}

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("del_ebooks", condition);
		boolean r = agent.endTransaction();
		if (r) {
			try {
				File d = new File(ConfigAgent.getConfigValue("photo_ebook") + data.getString("seq"));
				if (d.exists())
					FileUtils.deleteDirectory(d);
			} catch (IOException e) {
				e.printStackTrace();
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
		List<WParam> list = QueryAgent.queryList("qa_ebooks", condition, condition.getInt("offset"), condition.getInt("limit"), order);
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

	public File getPreview() {
		return preview;
	}

	public void setPreview(File preview) {
		this.preview = preview;
	}

	public String getPreviewContentType() {
		return previewContentType;
	}

	public void setPreviewContentType(String previewContentType) {
		this.previewContentType = previewContentType;
	}

	public String getPreviewFileName() {
		return previewFileName;
	}

	public void setPreviewFileName(String previewFileName) {
		this.previewFileName = previewFileName;
	}

}
