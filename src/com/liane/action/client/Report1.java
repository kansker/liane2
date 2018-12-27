package com.liane.action.client;

import com.itextpdf.text.Document;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerFontProvider;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import kplug.action.EventAction;
import kplug.db.CodeLoader;
import kplug.db.ConfigAgent;
import kplug.db.QueryAgent;
import kplug.util.DatePlus;
import kplug.util.ParamUtil;
import kplug.vo.WParam;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;
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

public class Report1 extends EventAction {
	private static final long serialVersionUID = 2024628204419943134L;
	private WParam data;
	private WParam condition;
	private JSONObject jsonObj;
	private String table = "report1";
	private String prefix = "cus_search1";

	private InputStream pdfStream;
	ByteArrayOutputStream baos = null;

	private String pdfFileName = "";
	private String csvFileName = "";

	private String html = "";
	private static String[] item_key = {
			"itemA", "itemB", "itemC", "itemD", "itemE", "itemF", "itemG", "itemH",
			"itemI", "itemJ", "itemK", "itemL", "itemM", "itemN", "itemO", "PASCODE",
			"itemP", "TID", "itemR", "itemS", "itemT", "itemU", "itemV", "itemW",
			"itemX", "itemY", "itemZ"};

	public String execute() {
		condition = new WParam();
		condition.add("offset", 0);
		condition.add("limit", 10);
		condition.addParameter("itemhe", new java.util.Date());
		condition.addParameter("itemhs", DateUtils.addMonths(new java.util.Date(), -3));
		condition.addParameter("itemhs", condition.getTimeString("itemhs", "yyyy/MM/dd"));
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
		this.setSession("report1_pdf_condition", condition);
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
					json.put("itemE", dd.getString("itemE"));
					json.put("itemD", dd.getString("itemD"));
					json.put("itemG", dd.getString("itemG"));
					json.put("itemC", dd.getString("itemC"));
					json.put("itemF", dd.getString("itemF"));
					json.put("itemH", dd.getString("itemH"));
					json.put("itemL", dd.getString("itemL"));
					json.put("status", CodeLoader.loadCodeValue("reportStatus", "v", "c", dd.getString("status")));
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
		condition = this.getSessionWParam("report1_pdf_condition");
		if (condition == null) {
			return SUCCESS;
		}
		List<WParam> list = QueryAgent.queryList("qa_" + table, condition, condition.getInt("offset"), condition.getInt("limit"), condition.getString("sort"));
		try {
			String path = ConfigAgent.getConfigValue("pdf_dir");
			pdfFileName = DatePlus.getDateString("yyyyMMddHHmmss") + ".pdf";

			Document document = new Document(new Rectangle(595, 842), 15f, 15f, 30f, 30f);
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
					setHtml("<html><head> <meta charset=\"UTF-8\"/></head><body style=\"font-family: mingliu\">" + getHtml() + "</body></html>");
					FileUtils.write(new File(path + htmlName), getHtml(), "UTF-8");
					xmlWorker.parseXHtml(writer, document, new ByteArrayInputStream(getHtml().getBytes("UTF-8")), null, Charset.forName("UTF-8"), fontImp);
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

	public String csv() {
		condition = this.getSessionWParam("report1_pdf_condition");
		if (condition == null) {
			return SUCCESS;
		}
		List<WParam> list = QueryAgent.queryList("qa_" + table, condition, 0, 10000, condition.getString("sort"));
		try {
			baos = new ByteArrayOutputStream();

			csvFileName = "export" + DatePlus.getDateString("yyyyMMddHHmmss") + ".csv";
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < list.size(); i++) {
				WParam data = list.get(i);
				if (data.getString("itemH").length() > 0) {
					data.addParameter("itemH", data.getTimestamp("itemH"));
					data.addParameter("itemH", data.getTimeString("itemH", "MM/dd/yyyy"));
				}
				if (data.getString("itemI").length() > 0) {
					data.addParameter("itemI", data.getTimestamp("itemI"));
					data.addParameter("itemI", data.getTimeString("itemI", "MM/dd/yyyy"));
				}
				if (data.getString("itemJ").length() > 0) {
					data.addParameter("itemJ", data.getTimestamp("itemJ"));
					data.addParameter("itemJ", data.getTimeString("itemJ", "MM/dd/yyyy"));
				}

				for (int j = 0; j < 18; j++) {
					if (j == 0) {
						sb.append("\"").append(data.getString(item_key[j]).replaceAll("\n", " ").replaceAll("\r", "")).append("\"");
					} else {
						sb.append(",\"").append(data.getString(item_key[j]).replaceAll("\n", " ").replaceAll("\r", "")).append("\"");
					}
				}
				sb.append("\n");
			}
			baos.write(sb.toString().getBytes());
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
				setHtml("<html><head> <meta charset=\"UTF-8\"/></head><body style=\"font-family: mingliu\">" + getHtml() + "</body></html>");
				FileUtils.write(new File(path + htmlName), getHtml(), "UTF-8");
				xmlWorker.parseXHtml(writer, document, new ByteArrayInputStream(getHtml().getBytes("UTF-8")), null, Charset.forName("UTF-8"), fontImp);
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
					if (FileUtils.getFile(Report1.class.getClassLoader().getResource("/").getPath() + "report1.jsp") != null) {
						cfg.setDirectoryForTemplateLoading(new File(Report1.class.getClassLoader().getResource("/").getPath()));
					} else {
						cfg.setDirectoryForTemplateLoading(new File(ConfigAgent.getConfigValue("pdf_dir")));
					}
				} catch (Exception e) {
					e.printStackTrace();
					cfg.setDirectoryForTemplateLoading(new File(ConfigAgent.getConfigValue("pdf_dir")));
				}
				Template template = cfg.getTemplate("report1.jsp");

				Map<String, Object> rootMap = new HashMap<String, Object>();
				rootMap.put("data", data);
				rootMap.put("title", "");
				template.process(rootMap, writer);
				writer.flush();
				StringBuffer sb = writer.getBuffer();
				setHtml(sb.toString());
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
