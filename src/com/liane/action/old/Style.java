package com.liane.action.old;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
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

public class Style extends EventAction {
	private static final long serialVersionUID = 2024628204419943134L;
	private WParam data;
	private WParam condition;
	private JSONObject jsonObj;
	private String prefix = "admin_style";
	private String prefix2 = "admin_style_layout";

	protected File optpicture;
	protected String optpictureContentType;
	protected String optpictureFileName;

	protected File hpicture;
	protected String hpictureContentType;
	protected String hpictureFileName;

	protected File lpicture;
	protected String lpictureContentType;
	protected String lpictureFileName;

	protected File hpicture2;
	protected String hpicture2ContentType;
	protected String hpicture2FileName;

	protected File lpicture2;
	protected String lpicture2ContentType;
	protected String lpicture2FileName;

	protected File preview;
	protected String previewContentType;
	protected String previewFileName;

	protected File leftPicture;
	protected String leftPictureContentType;
	protected String leftPictureFileName;

	protected File leftPicture2;
	protected String leftPicture2ContentType;
	protected String leftPicture2FileName;

	protected File rightPicture;
	protected String rightPictureContentType;
	protected String rightPictureFileName;

	protected File rightPicture2;
	protected String rightPicture2ContentType;
	protected String rightPicture2FileName;

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
		this.setSession("Style", data);
		return SUCCESS;
	}

	public String update() {
		this.createToken();
		data = QueryAgent.query("q_photostyle", condition);
		if (data != null) {
			data.addParameter("method", "update");
			List<WParam> list = QueryAgent.queryList("q_photostyle_product_by_style", data);
			List<String> products = new ArrayList<String>();
			for (int i = 0; i < list.size(); i++) {
				products.add(list.get(i).getString("productSeq"));
			}
			data.add("products", products);
			this.setSession("Style", data);
		} else {
			data = new WParam();
			data.addParameter("method", "add");
			this.setSession("Style", data);
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
		WParam nowData = this.getSessionWParam("Style");
		nowData.set(data);

		if (optpicture != null) {
			nowData.add("optpicture", KeyUtil.genSSOTkId("optpicture") + "." + FilenameUtils.getExtension(optpictureFileName));
		}
		if (hpicture != null) {
			nowData.add("hpicture", KeyUtil.genSSOTkId("hpicture") + "." + FilenameUtils.getExtension(hpictureFileName));
		}
		if (hpicture2 != null) {
			nowData.add("hpicture2", KeyUtil.genSSOTkId("hpicture2") + "." + FilenameUtils.getExtension(hpicture2FileName));
		}
		if (lpicture != null) {
			nowData.add("lpicture", KeyUtil.genSSOTkId("lpicture") + "." + FilenameUtils.getExtension(lpictureFileName));
		}
		if (lpicture2 != null) {
			nowData.add("lpicture2", KeyUtil.genSSOTkId("lpicture2") + "." + FilenameUtils.getExtension(lpicture2FileName));
		}
		DBAgent agent = new DBAgent();
		agent.startTransaction();
		nowData.addParameter("del_flag", "N");
		if (nowData.equals("method", "add")) {
			agent.executeUpdate("add_photostyle", nowData);
		} else {
			agent.executeUpdate("update_photostyle", nowData);
			agent.executeUpdate("del_photostyle_product_by_style", nowData);
		}
		if (nowData.isNotEmpty("products")) {
			String[] products = nowData.getParameterValues("products");
			for (int i = 0; i < products.length; i++) {
				WParam sp = new WParam();
				sp.add("styleSeq", nowData.getLong("seq"));
				sp.add("productSeq", products[i]);
				agent.executeUpdate("add_photostyle_product", sp);
			}
		}
		boolean r = agent.endTransaction();
		if (r) {
			if (optpicture != null) {
				try {
					FileUtils.copyFile(optpicture, new File(ConfigAgent.getConfigValue("photo_opt") + nowData.getString("optpicture")));
					this.addCmd("$('#img_optpicture').attr('src', 'opt/" + nowData.getString("optpicture") + "');");
					this.addCmd("$('#img_optpicture2').attr('src', 'opt/" + nowData.getString("optpicture") + "');");
					this.addCmd("$('#img_optpicture').attr('height', '87');");
					this.addCmd("$('#optpicture').val('');");
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (lpicture != null) {
				try {
					FileUtils.copyFile(lpicture, new File(ConfigAgent.getConfigValue("photo_lcover") + nowData.getString("lpicture")));
					this.addCmd("$('#img_lpicture').attr('href', 'lcover/" + nowData.getString("lpicture") + "?r=" + DatePlus.date2DateString(new Date(), "yyyyMMddHHmmss") + "');");
					this.addCmd("$('#lpicture').val('');");
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (lpicture2 != null) {
				try {
					FileUtils.copyFile(lpicture2, new File(ConfigAgent.getConfigValue("photo_lcover") + nowData.getString("lpicture2")));
					this.addCmd("$('#img_lpicture2').attr('href', 'lcover/" + nowData.getString("lpicture2") + "');");
					this.addCmd("$('#lpicture2').val('');");
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (hpicture != null) {
				try {
					FileUtils.copyFile(hpicture, new File(ConfigAgent.getConfigValue("photo_hcover") + nowData.getString("hpicture")));
					this.addCmd("$('#img_hpicture').attr('href', 'hcover/" + nowData.getString("hpicture") + "');");
					this.addCmd("$('#hpicture').val('');");
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (hpicture2 != null) {
				try {
					FileUtils.copyFile(hpicture2, new File(ConfigAgent.getConfigValue("photo_hcover") + nowData.getString("hpicture2")));
					this.addCmd("$('#img_hpicture2').attr('href', 'hcover/" + nowData.getString("hpicture2") + "');");
					this.addCmd("$('#hpicture2').val('');");
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
		data = QueryAgent.query("q_photostyle", condition);
		if (data == null) {
			this.alert("失敗");
			return "json";
		}

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("del_photostyle", condition);
		boolean r = agent.endTransaction();
		if (r) {
			this.addCmd("refresh();");
			this.alert("成功");
		} else {
			this.alert("失敗");
		}
		return "json";
	}

	public String add2() {
		this.createToken();
		data.addParameter("method", "add");
		this.setSession("StyleLayout", data);
		return SUCCESS;
	}

	public String update2() {
		this.createToken();
		data = QueryAgent.query("q_photolayout", condition);
		if (data != null) {
			data.addParameter("method", "update");
			this.setSession("StyleLayout", data);
		} else {
			data = new WParam();
			data.addParameter("method", "add");
			this.setSession("StyleLayout", data);
		}
		return SUCCESS;
	}

	public String save2() {
		this.initUI();
		if (data == null) {
			this.alert("提交失敗");
			return "json";
		}
		this.useToken();
		WParam nowData = this.getSessionWParam("StyleLayout");
		nowData.set(data);

		String opreview = "";
		String oleftPicture = "";
		String oleftPicture2 = "";
		String orightPicture = "";
		String orightPicture2 = "";
		if (nowData.equals("method", "add") == false) {
			WParam old = QueryAgent.query("q_photolayout", nowData);
			if (old != null) {
				opreview = old.getString("preview");
				oleftPicture = old.getString("leftPicture");
				oleftPicture2 = old.getString("leftPicture2");
				orightPicture = old.getString("rightPicture");
				orightPicture2 = old.getString("rightPicture2");
			}
		}

		if (preview != null) {
			nowData.add("preview", KeyUtil.genSSOTkId("preview") + "." + FilenameUtils.getExtension(previewFileName));
		}
		if (leftPicture != null) {
			nowData.add("leftPicture", KeyUtil.genSSOTkId("leftPicture") + "." + FilenameUtils.getExtension(leftPictureFileName));
		}
		if (leftPicture2 != null) {
			nowData.add("leftPicture2", KeyUtil.genSSOTkId("leftPicture2") + "." + FilenameUtils.getExtension(leftPicture2FileName));
		}
		if (rightPicture != null) {
			nowData.add("rightPicture", KeyUtil.genSSOTkId("rightPicture") + "." + FilenameUtils.getExtension(rightPictureFileName));
		}
		if (rightPicture2 != null) {
			nowData.add("rightPicture2", KeyUtil.genSSOTkId("rightPicture2") + "." + FilenameUtils.getExtension(rightPicture2FileName));
		}
		DBAgent agent = new DBAgent();
		agent.startTransaction();
		nowData.addParameter("del_flag", "N");
		if (nowData.equals("method", "add")) {
			nowData.add("forWho", 0);
			agent.executeUpdate("add_photolayout", nowData);
		} else {
			agent.executeUpdate("update_photolayout", nowData);
		}
		boolean r = agent.endTransaction();
		if (r) {
			if (preview != null) {
				if (StringUtils.isNotEmpty(opreview))
					FileUtils.deleteQuietly(new File(ConfigAgent.getConfigValue("photo_bgpre") + opreview));
				try {
					FileUtils.copyFile(preview, new File(ConfigAgent.getConfigValue("photo_bgpre") + nowData.getString("preview")));
					this.addCmd("$('#img_preview').attr('src', 'bgpre/" + nowData.getString("preview") + "');");
					this.addCmd("$('#img_preview2').attr('src', 'bgpre/" + nowData.getString("preview") + "');");
					this.addCmd("$('#img_preview').attr('height', '87');");
					this.addCmd("$('#preview').val('');");
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (leftPicture != null) {
				if (StringUtils.isNotEmpty(oleftPicture))
					FileUtils.deleteQuietly(new File(ConfigAgent.getConfigValue("photo_bg") + oleftPicture));
				try {
					FileUtils.copyFile(leftPicture, new File(ConfigAgent.getConfigValue("photo_bg") + nowData.getString("leftPicture")));
					this.addCmd("$('#img_leftPicture').attr('href', 'bg/" + nowData.getString("leftPicture") + "?r=" + DatePlus.date2DateString(new Date(), "yyyyMMddHHmmss") + "');");
					this.addCmd("$('#leftPicture').val('');");
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (leftPicture2 != null) {
				if (StringUtils.isNotEmpty(oleftPicture2))
					FileUtils.deleteQuietly(new File(ConfigAgent.getConfigValue("photo_hbg") + oleftPicture2));
				try {
					FileUtils.copyFile(leftPicture2, new File(ConfigAgent.getConfigValue("photo_hbg") + nowData.getString("leftPicture2")));
					this.addCmd("$('#img_leftPicture2').attr('href', 'hbg/" + nowData.getString("leftPicture2") + "');");
					this.addCmd("$('#leftPicture2').val('');");
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (rightPicture != null) {
				if (StringUtils.isNotEmpty(orightPicture))
					FileUtils.deleteQuietly(new File(ConfigAgent.getConfigValue("photo_bg") + orightPicture));
				try {
					FileUtils.copyFile(rightPicture, new File(ConfigAgent.getConfigValue("photo_bg") + nowData.getString("rightPicture")));
					this.addCmd("$('#img_rightPicture').attr('href', 'bg/" + nowData.getString("rightPicture") + "');");
					this.addCmd("$('#rightPicture').val('');");
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if (rightPicture2 != null) {
				if (StringUtils.isNotEmpty(orightPicture2))
					FileUtils.deleteQuietly(new File(ConfigAgent.getConfigValue("photo_hbg") + orightPicture2));
				try {
					FileUtils.copyFile(rightPicture2, new File(ConfigAgent.getConfigValue("photo_hbg") + nowData.getString("rightPicture2")));
					this.addCmd("$('#img_rightPicture2').attr('href', 'hbg/" + nowData.getString("rightPicture2") + "');");
					this.addCmd("$('#rightPicture2').val('');");
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			nowData.addParameter("method", "update");
			this.alert("提交成功");
			this.addCmd("parent.refresh2Go();");
		} else {
			this.alert("提交失敗");
		}
		return "json";
	}

	public String remove2() {
		this.initUI();
		if (condition.getInt("seq") == 0) {
			this.alert("失敗");
			return "json";
		}
		data = QueryAgent.query("q_photolayout", condition);
		if (data == null) {
			this.alert("失敗");
			return "json";
		}

		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("del_photolayout", condition);
		boolean r = agent.endTransaction();
		if (r) {
			if (data.isNotEmpty("preview")) {
				FileUtils.deleteQuietly(new File(ConfigAgent.getConfigValue("photo_bgpre") + data.getString("preview")));
			}
			if (data.isNotEmpty("leftPicture")) {
				FileUtils.deleteQuietly(new File(ConfigAgent.getConfigValue("photo_bg") + data.getString("leftPicture")));
			}
			if (data.isNotEmpty("leftPicture2")) {
				FileUtils.deleteQuietly(new File(ConfigAgent.getConfigValue("photo_hbg") + data.getString("leftPicture2")));
			}
			if (data.isNotEmpty("rightPicture")) {
				FileUtils.deleteQuietly(new File(ConfigAgent.getConfigValue("photo_bg") + data.getString("rightPicture")));
			}
			if (data.isNotEmpty("rightPicture2")) {
				FileUtils.deleteQuietly(new File(ConfigAgent.getConfigValue("photo_hbg") + data.getString("rightPicture2")));
			}
			this.addCmd("refresh2Go();");
			this.alert("成功");
		} else {
			this.alert("失敗");
		}
		return "json";
	}

	public String setup() {
		this.initUI();
		if (condition.getInt("seq") == 0) {
			return "json";
		}
		data = QueryAgent.query("q_frame", condition);
		if (data == null) {
			return "json";
		}
		data.addParameter("pwd", KeyUtil.genSSOTkId("frame"));
		DBAgent agent = new DBAgent();
		agent.startTransaction();
		agent.executeUpdate("update_frame", data);
		boolean r = agent.endTransaction();
		if (r) {
			this.addCmd("window.location.href = '" + ConfigAgent.getConfigValue("album_frame") + "?condition.map.p=" + data.getString("pwd") + "';");
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
		condition.add("forWho", 0);
		List<WParam> list = QueryAgent.queryList("qa_photostyle", condition, condition.getInt("offset"), condition.getInt("limit"), order);
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
					json.put("optpicture", dd.getString("optpicture"));
					json.put("width", dd.getInt("width"));
					json.put("height", dd.getInt("height"));
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

	public String datas2() {
		if (condition == null || condition.getInt("styleSeq") == 0) {
			return "json2";
		}
		ParamUtil.set(condition, ServletActionContext.getRequest());
		this.setSession(prefix2 + "condition", condition);

		String order = condition.getString("sort");
		if (StringUtils.isNotEmpty(order)) {
			order = order + " " + condition.getString("order");
		}
		List<WParam> list = QueryAgent.queryList("qa_photolayout_by_styleseq", condition, condition.getInt("offset"), condition.getInt("limit"), order);
		try {
			jsonObj = new JSONObject();
			jsonObj.put("total", condition.getInt(QueryAgent.KEY_TOTAL_RECORD));
			JSONArray jlist = new JSONArray();
			for (int i = 0; i < list.size(); i++) {
				WParam dd = list.get(i);
				JSONObject json = new JSONObject();
				try {
					json.put("seq", dd.getInt("seq"));
					json.put("preview", dd.getString("preview"));
					json.put("stable", CodeLoader.loadCodeValue("stable", "v", "c", dd.getString("stable")));
					json.put("single", CodeLoader.loadCodeValue("single", "v", "c", dd.getString("single")));
					json.put("createDate", dd.getTimeString("createDate", "yyyy/MM/dd HH:mm:ss"));
					json.put("updateDate", dd.getTimeString("updateDate", "yyyy/MM/dd HH:mm:ss"));

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

	public File getOptpicture() {
		return optpicture;
	}

	public void setOptpicture(File optpicture) {
		this.optpicture = optpicture;
	}

	public String getOptpictureContentType() {
		return optpictureContentType;
	}

	public void setOptpictureContentType(String optpictureContentType) {
		this.optpictureContentType = optpictureContentType;
	}

	public String getOptpictureFileName() {
		return optpictureFileName;
	}

	public void setOptpictureFileName(String optpictureFileName) {
		this.optpictureFileName = optpictureFileName;
	}

	public File getHpicture() {
		return hpicture;
	}

	public void setHpicture(File hpicture) {
		this.hpicture = hpicture;
	}

	public String getHpictureContentType() {
		return hpictureContentType;
	}

	public void setHpictureContentType(String hpictureContentType) {
		this.hpictureContentType = hpictureContentType;
	}

	public String getHpictureFileName() {
		return hpictureFileName;
	}

	public void setHpictureFileName(String hpictureFileName) {
		this.hpictureFileName = hpictureFileName;
	}

	public File getLpicture() {
		return lpicture;
	}

	public void setLpicture(File lpicture) {
		this.lpicture = lpicture;
	}

	public String getLpictureContentType() {
		return lpictureContentType;
	}

	public void setLpictureContentType(String lpictureContentType) {
		this.lpictureContentType = lpictureContentType;
	}

	public String getLpictureFileName() {
		return lpictureFileName;
	}

	public void setLpictureFileName(String lpictureFileName) {
		this.lpictureFileName = lpictureFileName;
	}

	public File getHpicture2() {
		return hpicture2;
	}

	public void setHpicture2(File hpicture2) {
		this.hpicture2 = hpicture2;
	}

	public String getHpicture2ContentType() {
		return hpicture2ContentType;
	}

	public void setHpicture2ContentType(String hpicture2ContentType) {
		this.hpicture2ContentType = hpicture2ContentType;
	}

	public String getHpicture2FileName() {
		return hpicture2FileName;
	}

	public void setHpicture2FileName(String hpicture2FileName) {
		this.hpicture2FileName = hpicture2FileName;
	}

	public File getLpicture2() {
		return lpicture2;
	}

	public void setLpicture2(File lpicture2) {
		this.lpicture2 = lpicture2;
	}

	public String getLpicture2ContentType() {
		return lpicture2ContentType;
	}

	public void setLpicture2ContentType(String lpicture2ContentType) {
		this.lpicture2ContentType = lpicture2ContentType;
	}

	public String getLpicture2FileName() {
		return lpicture2FileName;
	}

	public void setLpicture2FileName(String lpicture2FileName) {
		this.lpicture2FileName = lpicture2FileName;
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

	public File getLeftPicture() {
		return leftPicture;
	}

	public void setLeftPicture(File leftPicture) {
		this.leftPicture = leftPicture;
	}

	public String getLeftPictureContentType() {
		return leftPictureContentType;
	}

	public void setLeftPictureContentType(String leftPictureContentType) {
		this.leftPictureContentType = leftPictureContentType;
	}

	public String getLeftPictureFileName() {
		return leftPictureFileName;
	}

	public void setLeftPictureFileName(String leftPictureFileName) {
		this.leftPictureFileName = leftPictureFileName;
	}

	public File getLeftPicture2() {
		return leftPicture2;
	}

	public void setLeftPicture2(File leftPicture2) {
		this.leftPicture2 = leftPicture2;
	}

	public String getLeftPicture2ContentType() {
		return leftPicture2ContentType;
	}

	public void setLeftPicture2ContentType(String leftPicture2ContentType) {
		this.leftPicture2ContentType = leftPicture2ContentType;
	}

	public String getLeftPicture2FileName() {
		return leftPicture2FileName;
	}

	public void setLeftPicture2FileName(String leftPicture2FileName) {
		this.leftPicture2FileName = leftPicture2FileName;
	}

	public File getRightPicture() {
		return rightPicture;
	}

	public void setRightPicture(File rightPicture) {
		this.rightPicture = rightPicture;
	}

	public String getRightPictureContentType() {
		return rightPictureContentType;
	}

	public void setRightPictureContentType(String rightPictureContentType) {
		this.rightPictureContentType = rightPictureContentType;
	}

	public String getRightPictureFileName() {
		return rightPictureFileName;
	}

	public void setRightPictureFileName(String rightPictureFileName) {
		this.rightPictureFileName = rightPictureFileName;
	}

	public File getRightPicture2() {
		return rightPicture2;
	}

	public void setRightPicture2(File rightPicture2) {
		this.rightPicture2 = rightPicture2;
	}

	public String getRightPicture2ContentType() {
		return rightPicture2ContentType;
	}

	public void setRightPicture2ContentType(String rightPicture2ContentType) {
		this.rightPicture2ContentType = rightPicture2ContentType;
	}

	public String getRightPicture2FileName() {
		return rightPicture2FileName;
	}

	public void setRightPicture2FileName(String rightPicture2FileName) {
		this.rightPicture2FileName = rightPicture2FileName;
	}
}
