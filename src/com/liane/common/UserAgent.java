package com.photo.common;

import java.io.Serializable;

import javax.servlet.http.HttpSession;

import org.apache.commons.collections.FastHashMap;

public class UserAgent implements Serializable {
	private final static String CLASS_NAME = "UserAgent";

	public static FastHashMap userList = null;

	public static void init() {
		userList = new FastHashMap();
	}

	public static void addSession(String GPID, String userId, HttpSession session) {
		String key = "(" + GPID + ")" + userId;
		try {
			HttpSession os = (HttpSession) userList.get(key);
			if (os != null) {
				userList.remove(key);
				os.invalidate();
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		userList.put(key, session);
	}

	public static void removeSession(String GPID, String userId) {
		userList.remove("(" + GPID + ")" + userId);
	}
}