package com.photo.common;

import java.io.IOException;

import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import kplug.db.ConfigAgent;

public class WebServicesFilter implements javax.servlet.Filter {

	public void init(FilterConfig config) {
	}

	public void destroy() {
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			javax.servlet.FilterChain chain) throws ServletException, IOException {

		String clientIp = request.getRemoteAddr();
		if (ConfigAgent.getConfigValue("photo_webservice_ip").indexOf(clientIp) < 0 &&
				ConfigAgent.getConfigValue("photo_webservice_ip").indexOf("*") < 0) {
			return;
		}
		chain.doFilter(request, response);
	}
}
