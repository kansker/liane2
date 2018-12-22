package com.liane.action.client;

import com.itextpdf.text.Document;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerFontProvider;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.liane.util.MaskUtil;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import kplug.action.EventAction;
import kplug.db.CodeLoader;
import kplug.db.ConfigAgent;
import kplug.db.DBAgent;
import kplug.db.QueryAgent;
import kplug.util.ParamUtil;
import kplug.vo.WParam;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;
import org.apache.struts.util.DatePlus;
import org.apache.struts2.ServletActionContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.*;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

public class Report3 extends EventAction {
	private static final long serialVersionUID = 2024628204419943134L;
	private WParam data;
	private WParam condition;
	private JSONObject jsonObj;
	private String table = "report3";
	private String prefix = "cus_search3";
	private InputStream pdfStream;
	ByteArrayOutputStream baos = null;
	private String pdfFileName = "";
	private String csvFileName = "";
	private String html = "";

	public String execute() {
		condition = new WParam();
		condition.add("offset", 0);
		condition.add("limit", 10);
		condition.addParameter("pasdatee", new java.util.Date());
		condition.addParameter("pasdates", DateUtils.addMonths(new java.util.Date(), -3));
		condition.addParameter("pasdates", condition.getTimeString("pasdates", "yyyy/MM/dd"));
		return SUCCESS;
	}

	public String view() {
		if (condition == null) {
			condition = new WParam();
		}
		WParam userBean = this.getSessionWParam("UserBean");
		if (userBean.getInt("power1") != 1) {
			condition.addParameter("PASCODE", userBean.getString("userId"));
		}
		data = QueryAgent.query("q_" + table, condition);
		if (data == null) {
			return SUCCESS;
		}
		boolean r = genHtml(data);
		return SUCCESS;
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
		condition.addParameter("pasdates", StringUtils.replace(condition.getString("pasdates"), "/", ""));
		condition.addParameter("pasdatee", StringUtils.replace(condition.getString("pasdatee"), "/", ""));
		this.setSession(prefix + "condition", condition);
		String order = condition.getString("sort");
		if (StringUtils.isNotEmpty(order)) {
			order = order + " " + condition.getString("order");
		}
		condition.addParameter("sort", order);
		WParam userBean = this.getSessionWParam("UserBean");
		if (userBean.getInt("power1") != 1) {
			condition.addParameter("PASCODE", userBean.getString("userId"));
		}
		this.setSession("report3_pdf_condition", condition);
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
					json.put("PTNAME", dd.getString("PTNAME"));
					json.put("PASCODE", dd.getString("PASCODE"));
					json.put("CHARTNO", dd.getString("CHARTNO"));
					json.put("PASDATE", dd.getString("PASDATE"));
					json.put("CHKDATA", dd.getString("CHKDATA"));
					WParam tt = QueryAgent.query("CHKDATA", dd);
					if (tt != null) {
						json.put("CHKDATA", tt.getString("DIANAME"));
					}
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

	public String pdfs() {
		condition = this.getSessionWParam("report3_pdf_condition");
		if (condition == null) {
			return SUCCESS;
		}
		List<WParam> list = QueryAgent.queryList("qa_" + table, condition, condition.getInt("offset"), condition.getInt("limit"), condition.getString("sort"));
		try {
			String path = ConfigAgent.getConfigValue("pdf_dir");
			pdfFileName = DatePlus.getDateString("yyyyMMddHHmmss") + ".pdf";

			Document document = new Document(new Rectangle(595, 842), 70f, 60f, 30f, 30f);
			PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(path + pdfFileName));
			document.open();
			String fontPath = ConfigAgent.getConfigValue("pdf_dir") + "mingliu.ttc";
			XMLWorkerFontProvider fontImp = new XMLWorkerFontProvider(fontPath);
			FontFactory.setFontImp(fontImp);
			FontFactory.register(fontPath, "mingliu");
			System.out.println("IS mingliu?===" + FontFactory.isRegistered("mingliu"));
			XMLWorkerHelper xmlWorker = XMLWorkerHelper.getInstance();
			for (int i = 0; i < list.size(); i++) {
				WParam data = list.get(i);
				boolean r = genHtml(data);
				if (r) {
					String htmlName = DatePlus.getDateString("yyyyMMddHHmmssSSS") + ".html";
					html = "<html><head> <meta charset=\"UTF-8\"/></head><body style=\"font-family: mingliu\">" + html + "</body></html>";
					FileUtils.write(new File(path + htmlName), html, "UTF-8");
					xmlWorker.parseXHtml(writer, document, new ByteArrayInputStream(html.getBytes("UTF-8")), null, Charset.forName("UTF-8"), fontImp);
				}
				if (i < list.size()) {
					document.newPage();
				}
			}
			document.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	public String pdf() {
		data = QueryAgent.query("q_" + table, condition);
		if (data == null) {
			return SUCCESS;
		}
		try {
			String path = ConfigAgent.getConfigValue("pdf_dir");
			String htmlName = DatePlus.getDateString("yyyyMMddHHmmssSSS") + ".html";
			pdfFileName = DatePlus.getDateString("yyyyMMddHHmmss") + ".pdf";

			Document document = new Document(new Rectangle(595, 842), 70f, 60f, 30f, 30f);
			PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(path + pdfFileName));
			document.open();
			String fontPath = ConfigAgent.getConfigValue("pdf_dir") + "mingliu.ttc";
			XMLWorkerFontProvider fontImp = new XMLWorkerFontProvider(fontPath);
			FontFactory.setFontImp(fontImp);
			FontFactory.register(fontPath, "mingliu");
			System.out.println("IS mingliu?===" + FontFactory.isRegistered("mingliu"));
			XMLWorkerHelper xmlWorker = XMLWorkerHelper.getInstance();
			boolean r = genHtml(data);
			if (r) {
				html = "<html><head> <meta charset=\"UTF-8\"/></head><body style=\"font-family: mingliu\">" + html + "</body></html>";
				FileUtils.write(new File(path + htmlName), html, "UTF-8");
				xmlWorker.parseXHtml(writer, document, new ByteArrayInputStream(html.getBytes("UTF-8")), null, Charset.forName("UTF-8"), fontImp);
			}
			document.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	public boolean genHtml(WParam data) {
		if (data != null) {
			try {
				StringWriter writer = new StringWriter();
				Configuration cfg = new Configuration();
				try {
					cfg.setEncoding(new Locale("zh", "TW", ""), "UTF-8");
					if (FileUtils.getFile(Report1.class.getClassLoader().getResource("/").getPath() + "report3.jsp") != null) {
						cfg.setDirectoryForTemplateLoading(new File(Report1.class.getClassLoader().getResource("/").getPath()));
					} else {
						cfg.setDirectoryForTemplateLoading(new File(ConfigAgent.getConfigValue("pdf_dir")));
					}
				} catch (Exception e) {
					e.printStackTrace();
					cfg.setDirectoryForTemplateLoading(new File(ConfigAgent.getConfigValue("pdf_dir")));
				}
				Template template = cfg.getTemplate("report3.jsp");

				if (data != null) {
					MaskUtil.setNotMask(data, "PTID", 3, 6);
					data.add("NATIONALIT", CodeLoader.loadCodeValue("NATIONALIT", "v", "c", data.getString("NATIONALIT")));
					WParam tt = QueryAgent.query("memberByPASCODE", data);
					if (tt != null) {
						data.add("PASCODE_", tt.getString("userName"));
					} else {
						data.add("PASCODE_", data.getString("PASCODE"));
					}
					data.add("PTSUPPER", CodeLoader.loadCodeValue("PTSUPPER", "v", "c", data.getString("PTSUPPER")));
					data.add("PAS_PUR", CodeLoader.loadCodeValue("PAS_PUR", "v", "c", data.getString("PAS_PUR")));

					tt = QueryAgent.query("memberByCHKCODE", data);
					if (tt != null) {
						data.add("CHKCODE_", tt.getString("userName"));
					} else {
						data.add("CHKCODE_", data.getString("CHKCODE"));
					}
					data.add("SPL_TYPE", CodeLoader.loadCodeValue("SPL_TYPE", "v", "c", data.getString("SPL_TYPE")));
					data.add("CHK_WAY", CodeLoader.loadCodeValue("CHK_WAY", "v", "c", data.getString("CHK_WAY")));
					data.add("CHKQUL", CodeLoader.loadCodeValue("CHKQUL", "v", "c", data.getString("CHKQUL")));
					data.add("PTEDUCAT", CodeLoader.loadCodeValue("PTEDUCAT", "v", "c", data.getString("PTEDUCAT")));
					data.add("CHKDIF_", CodeLoader.loadCodeValue("CHKDIF", "v", "c", data.getString("CHKDIF")));

					tt = QueryAgent.query("areacode", data);
					if (tt != null) {
						data.add("ADDCODEA_", tt.getString("AREANAME"));
					} else {
						data.add("ADDCODEA_", data.getString("ADDCODEA"));
					}
					data.add("CHKINF_", CodeLoader.loadCodeValue("CHKINF", "v", "c", data.getString("CHKINF")));

					tt = QueryAgent.query("areacodeb", data);
					if (tt != null) {
						data.add("ADDCODEB_", tt.getString("AREANAME"));
					} else {
						data.add("ADDCODEB_", data.getString("ADDCODEB"));
					}
					tt = QueryAgent.query("CHKDATA", data);
					if (tt != null) {
						data.add("CHKDATA_", tt.getString("DIANAME"));
					} else {
						data.add("CHKDATA_", data.getString("CHKDATA"));
					}
					data.add("LASTCHKD", CodeLoader.loadCodeValue("LASTCHKD", "v", "c", data.getString("LASTCHKD")));

					tt = QueryAgent.query("SPATH", data);
					if (tt != null) {
						data.add("SPATH", tt.getString("EXANAME"));
					} else {
						data.add("SPATH", data.getString("SPATH"));
					}
					data.add("ULTOMY", CodeLoader.loadCodeValue("ULTOMY", "v", "c", data.getString("ULTOMY")));
					tt = QueryAgent.query("PATH", data);
					if (tt != null) {
						data.add("PATH", tt.getString("EXANAME"));
					} else {
						data.add("PATH", data.getString("PATH"));
					}
					data.add("X_RAY", CodeLoader.loadCodeValue("ULTOMY", "v", "c", data.getString("X_RAY")));
				}

				Map<String, Object> rootMap = new HashMap<String, Object>();
				rootMap.put("data", data);
				rootMap.put("title", "");
				template.process(rootMap, writer);
				writer.flush();
				StringBuffer sb = writer.getBuffer();
				html = sb.toString();
			} catch (IOException e) {
				e.printStackTrace();
				kplug.log.LogUtil.write("daily", e);
			} catch (TemplateException e) {
				e.printStackTrace();
				kplug.log.LogUtil.write("daily", e);
			}
		}
		return true;
	}

	public InputStream getPdfStream() {
		String path = ConfigAgent.getConfigValue("pdf_dir");
		File file = new File(path + pdfFileName);
		try {
			pdfStream = new FileInputStream(file);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pdfStream;
	}

	public void setPdfStream(InputStream pdfStream) {
		this.pdfStream = pdfStream;
	}

	public String getPdfFileName() {
		try {
			return new String(pdfFileName.getBytes(), "ISO8859-1");
		} catch (Exception ex) {
			return pdfFileName;
		}
	}

	public void setPdfFileName(String pdfFileName) {
		this.pdfFileName = pdfFileName;
	}

	public String getCsvFileName() {
		try {
			return new String(csvFileName.getBytes(), "ISO8859-1");
		} catch (Exception ex) {
			return csvFileName;
		}
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

	public InputStream getInputStream() {
		try {
			return new ByteArrayInputStream(baos.toByteArray());
		} catch (Exception e) {
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

	public String getHtml() {
		return html;
	}

	public void setHtml(String html) {
		this.html = html;
	}
}
