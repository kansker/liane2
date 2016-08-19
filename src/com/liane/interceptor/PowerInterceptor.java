package com.liane.interceptor;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import kplug.vo.WParam;
import org.apache.struts2.ServletActionContext;

import java.util.Map;

public class PowerInterceptor implements Interceptor {
	private static final long serialVersionUID = -5703387623692397508L;

	public void destroy() {
		System.out.println("destroy()");
	}

	public void init() {
		System.out.println("init()");
	}

	public String intercept(ActionInvocation invocation) throws Exception {
		Map<String, Object> session = ActionContext.getContext().getSession();
		WParam userBean = (WParam) session.get("AdminBean");
		if (userBean == null || userBean.getInt("power1") != 1 || userBean.indexOf("power2", "B") < 0) {
			ServletActionContext.getResponse().sendRedirect("indexa.jsp");
			return null;
		}
		String result = invocation.invoke();
		return result;
	}
}