package com.photo.util;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

import kplug.db.ConfigAgent;
import kplug.log.LogUtil;
import kplug.util.XMLParam;
import kplug.vo.WParam;

public class ImageUtil {

	public static String post(String message, String dest) throws IOException {
		LogUtil.write("img", "message" + message);
		LogUtil.write("img", "dest" + dest);
		WParam data = new WParam();
		data.addParameter("message", "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n" + message);
		String result = HttpAPI.openUrl(dest, "POST", data);
		return result;
	}

	public synchronized static void zoom(String source, String target, int w, int h) throws Exception {
		try {
			String server = ConfigAgent.getConfigValue("magick_dataout");
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>zoom</method><source>" + source + "</source><target>" + target + "</target><w>" + w + "</w><h>" + h + "</h></root>", server));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public synchronized static int[] getDimension(String path) {
		int[] d = { 0, 0 };
		try {
			String server = ConfigAgent.getConfigValue("magick_dataout");
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>Dimension</method><path><![CDATA[" + path + "]]></path></root>", server));
			d[0] = xpm.getNodeIntValue("root/w");
			d[1] = xpm.getNodeIntValue("root/h");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return d;
	}

	public static void crop(String source, String target, int x, int y, int w, int h) throws Exception {
		try {
			String server = ConfigAgent.getConfigValue("magick_dataout");
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>crop</method><source><![CDATA[" + source + "]]></source><target><![CDATA[" + target + "]]></target><x>" + x + "</x><y>" + y + "</y><w>" + w + "</w><h>" + h + "</h></root>", server));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public static void cropJ(String source, String target, int x, int y, int w, int h) throws Exception {
		try {
			String server = ConfigAgent.getConfigValue("magick_dataout");
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>cropJ</method><source><![CDATA[" + source + "]]></source><target><![CDATA[" + target + "]]></target><x>" + x + "</x><y>" + y + "</y><w>" + w + "</w><h>" + h + "</h></root>", server));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public static void freeCut(String source, String mask, String target, int x, int y, int w, int h) throws Exception {
		try {
			String server = ConfigAgent.getConfigValue("magick_dataout");
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>freeCut</method><source><![CDATA[" + source + "]]></source><mask><![CDATA[" + mask + "]]></mask><target><![CDATA[" + target + "]]></target><x>" + x + "</x><y>" + y + "</y><w>" + w + "</w><h>" + h + "</h></root>", server));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public static void rotateImage(String source, String target, int an) throws Exception {
		String server = ConfigAgent.getConfigValue("magick_dataout");
		XMLParam xpm = new XMLParam();
		xpm.createDocumentFromString(post("<root><method>rotateImage</method><source><![CDATA[" + source + "]]></source><target><![CDATA[" + target + "]]></target><an>" + an + "</an></root>", server));
	}

	public static void frame(String source, String target, String frameratio, String shadowratio, String framecolor) throws Exception {
		try {
			String server = ConfigAgent.getConfigValue("magick_dataout");
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>frame</method><source>" + source + "</source><target>" + target + "</target><frameratio>" + frameratio + "</frameratio><shadowratio>" + shadowratio + "</shadowratio><framecolor>" + framecolor + "</framecolor></root>", server));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public static void frames(String source, String target, String fmd, String canvas, int pix) throws Exception {
		try {
			String server = ConfigAgent.getConfigValue("magick_dataout");
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>frames</method><source>" + source + "</source><target>" + target + "</target><fmd>" + fmd + "</fmd><canvas>" + canvas + "</canvas><pix>" + pix + "</pix></root>", server));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public static void quality(String source, String target, int pix) throws Exception {
		try {
			XMLParam xpm = new XMLParam();
			String server = ConfigAgent.getConfigValue("magick_dataout");
			xpm.createDocumentFromString(post("<root><method>quality</method><source>" + source + "</source><target>" + target + "</target><pix>" + pix + "</pix></root>", server));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public static void rev(String source, String target, String revMask, String revFrameColor, String revFrame, String revFrameRatio, String revShadow, String pix) throws Exception {
		try {
			String server = ConfigAgent.getConfigValue("magick_dataout");
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>rev</method><source><![CDATA[" + source + "]]></source><target><![CDATA[" + target + "]]></target><revMask><![CDATA[" + revMask + "]]></revMask><revFrameColor>" + revFrameColor + "</revFrameColor><revFrame>" + revFrame + "</revFrame><revFrameRatio>" + revFrameRatio + "</revFrameRatio><revShadow>" + revShadow + "</revShadow><pix>" + pix
					+ "</pix></root>", server));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public static void sync() throws Exception {
		try {
			String server = ConfigAgent.getConfigValue("magick_dataout");
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>sync</method></root>", server));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public static void sync(String name) throws Exception {
		try {
			String server = ConfigAgent.getConfigValue("magick_dataout");
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>sync1</method><name>" + name + "</name></root>", server));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public static String ChineseToUnicode(String s) {
		StringBuffer bu = new StringBuffer(s);
		String unicode = "";
		for (int i = 0; i < bu.length(); i++) {
			String tmp = Integer.toHexString((int) bu.charAt(i));
			unicode = unicode + "\\u" + tmp;
		}
		return unicode;
	}

	public static boolean getImgFile(String fullurl, String path) {
		boolean result = false;
		try {
			URL url = new URL(fullurl);
			FileOutputStream fos = new FileOutputStream(path, false);
			InputStream is = url.openStream();
			int i = 0;
			while ((i = is.read()) != -1) {
				fos.write(i);
			}
			is.close();
			fos.close();
			result = true;
		} catch (IOException ex) {
			System.out.println("getTextFile.IOException : " + ex.getMessage());
		}
		return result;
	}

	public static int[] makeFont(String fontName, int fontType, int fontSize, String fontColor, String text, String fpath, String fname) {
		int[] d = { 0, 0 };
		try {
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>makeFont</method><fontName><![CDATA[" + fontName + "]]></fontName><fontType><![CDATA[" + fontType + "]]></fontType><fontSize><![CDATA[" + fontSize + "]]></fontSize><fontColor>" + fontColor + "</fontColor><text>" + text + "</text><fpath>" + fpath + "</fpath><fname>" + fname + "</fname></root>",
					ConfigAgent.getConfigValue("magick_dataout")));
			d[0] = xpm.getNodeIntValue("root/w");
			d[1] = xpm.getNodeIntValue("root/h");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return d;
	}

	public static int[] makePureFont2(int mw, int mh, String fontName, int fontType, int fontSize, String fontColor, String text, String fpath, String fname) {
		int[] d = { 0, 0 };
		try {
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>makePureFont2</method><mw><![CDATA[" + mw + "]]></mw><mh><![CDATA[" + mh + "]]></mh><fontName><![CDATA[" + fontName + "]]></fontName><fontType>" + fontType + "</fontType><fontSize>" + fontSize + "</fontSize><fontColor>" + fontColor + "</fontColor><text>" + text + "</text><fpath>" + fpath + "</fpath><fname>" + fname + "</fname></root>",
					ConfigAgent.getConfigValue("magick_dataout")));
			d[0] = xpm.getNodeIntValue("root/w");
			d[1] = xpm.getNodeIntValue("root/h");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return d;
	}

	public static int[] makePureFont(int width, int height, String fontName, int fontType, int fontSize, String fontColor, String text, String fpath, String fname) {
		int[] d = { 0, 0 };
		try {
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>makePureFont</method><width><![CDATA[" + width + "]]></width><height><![CDATA[" + height + "]]></height><fontName><![CDATA[" + fontName + "]]></fontName><fontType>" + fontType + "</fontType><fontSize>" + fontSize + "</fontSize><fontColor>" + fontColor + "</fontColor><text>" + text + "</text><fpath>" + fpath + "</fpath><fname>" + fname
					+ "</fname></root>", ConfigAgent.getConfigValue("magick_dataout")));
			d[0] = xpm.getNodeIntValue("root/w");
			d[1] = xpm.getNodeIntValue("root/h");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return d;
	}

	public static int[] makeVerticeFont(int width, int height, String align, String fontName, int fontType, int fontSize, String fontColor, String text, String fpath, String fname) {
		int[] d = { 0, 0 };
		try {
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>makeVerticeFont</method><align><![CDATA[" + align + "]]></align><width><![CDATA[" + width + "]]></width><height><![CDATA[" + height + "]]></height><fontName><![CDATA[" + fontName + "]]></fontName><fontType>" + fontType + "</fontType><fontSize>" + fontSize + "</fontSize><fontColor>" + fontColor + "</fontColor><text>" + text
					+ "</text><fpath>" + fpath + "</fpath><fname>" + fname + "</fname></root>", ConfigAgent.getConfigValue("magick_dataout")));
			d[0] = xpm.getNodeIntValue("root/w");
			d[1] = xpm.getNodeIntValue("root/h");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return d;
	}

	public static int[] makeHorizontalFont(int width, int height, String align, String fontName, int fontType, int fontSize, String fontColor, String text, String fpath, String fname) {
		int[] d = { 0, 0 };
		try {
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>makeHorizontalFont</method><align><![CDATA[" + align + "]]></align><width><![CDATA[" + width + "]]></width><height><![CDATA[" + height + "]]></height><fontName><![CDATA[" + fontName + "]]></fontName><fontType>" + fontType + "</fontType><fontSize>" + fontSize + "</fontSize><fontColor>" + fontColor + "</fontColor><text>" + text
					+ "</text><fpath>" + fpath + "</fpath><fname>" + fname + "</fname></root>", ConfigAgent.getConfigValue("magick_dataout")));
			d[0] = xpm.getNodeIntValue("root/w");
			d[1] = xpm.getNodeIntValue("root/h");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return d;
	}

	public static int[] makeBarCode(int width, int height, String text, String fpath, String fname) {
		int[] d = { 0, 0 };
		try {
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>makeBarCode</method><width><![CDATA[" + width + "]]></width><height><![CDATA[" + height + "]]></height><text>" + text + "</text><fpath>" + fpath + "</fpath><fname>" + fname + "</fname></root>", ConfigAgent.getConfigValue("magick_dataout")));
			d[0] = xpm.getNodeIntValue("root/w");
			d[1] = xpm.getNodeIntValue("root/h");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return d;
	}

	public static void main(String args[]) {
		String source = "C:\\Users\\kker\\Desktop\\20121018410515\\images\\cover1.jpg_0_0_876_1226.jpg";
		String target = "C:\\Users\\kker\\Desktop\\20121018410515\\images\\cover1_.jpg";
		int x = 0;
		int y = 0;
		int w = 876;
		int h = 1226;

		try {
			String server = "http://127.0.0.1/magick/dataout";
			XMLParam xpm = new XMLParam();
			xpm.createDocumentFromString(post("<root><method>crop</method><source><![CDATA[" + source + "]]></source><target><![CDATA[" + target + "]]></target><x>" + x + "</x><y>" + y + "</y><w>" + w + "</w><h>" + h + "</h></root>", server));
		} catch (IOException e) {
			e.printStackTrace();
		}

		// makePureFont(120, 300, "細明體", 1, 14, "#FF0000", "測試試拉\r\n測試\n拉測試拉測試拉測試拉測試拉測試拉", "c:\\", "test0.png", 8);
		// makeFont("細明體", 1, 14, "#FF0000", "測試試拉\r\n測試\n拉測試拉測試拉測試拉測試拉測試拉", "c:\\", "test.png", 8);
		// try {
		// java.net.URL url = new java.net.URL("http://www.yahoo.com.tw");
		// java.net.HttpURLConnection uc = (java.net.HttpURLConnection) url.openConnection();
		// uc.setReadTimeout(30000);// 設定timeout時間
		// uc.connect();// 連線
		// int status = uc.getResponseCode();
		// switch (status) {
		// case java.net.HttpURLConnection.HTTP_GATEWAY_TIMEOUT:// 504
		// System.out.println("連線網址逾時!");
		// break;
		// case java.net.HttpURLConnection.HTTP_FORBIDDEN:// 403
		// System.out.println("連線網址禁止!");
		// break;
		// case java.net.HttpURLConnection.HTTP_INTERNAL_ERROR:// 500
		// System.out.println("連線網址錯誤或不存在!");
		// break;
		// case java.net.HttpURLConnection.HTTP_NOT_FOUND:// 404
		// System.out.println("連線網址不存在!");
		// break;
		// case java.net.HttpURLConnection.HTTP_OK:
		// System.out.println("OK!");
		// break;
		// }
		// } catch (Exception ex) {
		// }
	}
}
