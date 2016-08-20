package com.liane.util;

import kplug.vo.WParam;
import org.apache.commons.lang.StringUtils;

public class MaskUtil {
	public static void main(String args[]) {
		WParam dd = new WParam().add("id", "P121019664");
		setNotMask(dd, "id", 3, 6);
		System.out.println(dd.toString());
	}

	public static void setMask(WParam dd, String column, int s, int e) {
		String data = dd.getString(column);
		data = StringUtils.trim(data);
		if (StringUtils.isEmpty(data) == false) {
			dd.add("s_" + column, data);
			data = getMask(data, s, e);
			dd.add("m_" + column, data);
			dd.add(column, data);
		}
	}

	public static void setNotMask(WParam dd, String column, int s, int e) {
		String data = dd.getString(column);
		data = StringUtils.trim(data);
		if (StringUtils.isEmpty(data) == false) {
			dd.add("s_" + column, data);
			data = getNotMask(data, s, e);
			dd.add("m_" + column, data);
			dd.add(column, data);
		}
	}

	public static String getNotMask(String data, int start, int end) {
		if (StringUtils.isEmpty(data)) {
			return "";
		}
		String mask = "";
		int leng = data.length();
		if (start < 0) start = 0;
		if (end < 0) end = 0;
		if (start > end) {
			int temp = start;
			start = end;
			end = temp;
		}
		if (leng > start)
			mask = data.substring(0, start);
		for (int i = start; leng >= i && i <= end; i++) {
			mask += "*";
		}
		if (leng > end)
			mask += data.substring(end + 1);
		return mask;
	}

	public static String getMask(String data, int start, int end) {
		if (StringUtils.isEmpty(data)) {
			return "";
		}
		int idx = 0;
		String mask = StringUtils.rightPad("", data.length(), "*");
		while (idx < data.length()) {
			if (idx >= start && idx <= end) {
				mask = mask.substring(0, idx) + data.substring(idx, idx + 1) + mask.substring(idx + 1);
			}
			idx++;
		}
		return mask;
	}
}
