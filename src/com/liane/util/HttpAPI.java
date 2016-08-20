package com.liane.util;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import kplug.vo.WParam;

import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

public class HttpAPI {
	public static final String SERVER_URL = "";

	public static String openUrl(String url, String method, WParam bundle) throws MalformedURLException, IOException {

		if (method.equalsIgnoreCase("POST")) {
			HttpPost httpRequest = new HttpPost(url);
			try {
				List<NameValuePair> params = new ArrayList<NameValuePair>();
				for (Object key : bundle.getMap().keySet()) {
					if (StringUtils.isNotEmpty(bundle.getString((String) key))) {
						params.add(new BasicNameValuePair((String) key, bundle.getString((String) key)));
					}
				}

				HttpEntity httpentity = new UrlEncodedFormEntity(params, "UTF-8");
				httpRequest.setEntity(httpentity);
				HttpClient httpclient = new DefaultHttpClient();
				HttpResponse httpResponse = httpclient.execute(httpRequest);
				if (httpResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
					String strResult = EntityUtils.toString(httpResponse.getEntity());
					return strResult;
				} else {
					try {
						String strResult = EntityUtils.toString(httpResponse.getEntity());
						return strResult;
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			HttpClient httpclient = new DefaultHttpClient();
			try {
				boolean f = true;
				for (Object key : bundle.getMap().keySet()) {
					if (bundle.getString((String) key) != null) {
						if (f) {
							url += "?" + key + "=" + bundle.getString((String) key);
							f = false;
						} else {
							url += "&" + key + "=" + URLEncoder.encode(bundle.getString((String) key), "UTF-8");
						}
					}
				}
				HttpGet httpGet = new HttpGet(url);
				HttpResponse response = httpclient.execute(httpGet);
				String responseString = EntityUtils.toString(response.getEntity());
				return responseString;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return "";
	}

}
