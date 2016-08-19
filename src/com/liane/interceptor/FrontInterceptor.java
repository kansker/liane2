package com.liane.interceptor;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import org.apache.struts2.ServletActionContext;

public class FrontInterceptor implements Interceptor {
	private static final long serialVersionUID = -5703387623692397508L;

	public void destroy() {
	}

	public void init() {
	}

	public String intercept(ActionInvocation invocation) throws Exception {
		ServletActionContext.getRequest().setAttribute("comspace", "front");
		String result = invocation.invoke();
		return result;
	}
}