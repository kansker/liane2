package com.liane.layout;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.dispatcher.ServletDispatcherResult;
import org.apache.tiles.Attribute;
import org.apache.tiles.AttributeContext;
import org.apache.tiles.TilesContainer;
import org.apache.tiles.access.TilesAccess;

import kplug.db.ConfigAgent;
import com.opensymphony.xwork2.ActionInvocation;

public class V2Content extends ServletDispatcherResult {
	private static final long serialVersionUID = -6555693605944407658L;
	protected String bodyName;
	protected String layout;

	public V2Content() {
		bodyName = "body";
		layout = ConfigAgent.getConfigValue("ui_layout") + "_content";
	}

	public V2Content(String location) {
		super(location);
		bodyName = "body";
		layout = ConfigAgent.getConfigValue("ui_layout") + "_content";
	}

	public void setBodyName(String body) {
		bodyName = body;
	}

	public String getBodyName() {
		return bodyName;
	}

	public void setLayout(String layout) {
		this.layout = layout;
	}

	public String getLayout() {
		return layout;
	}

	public void doExecute(String location, ActionInvocation invocation) throws Exception {
		setLocation(location);
		javax.servlet.ServletContext servletContext = ServletActionContext.getServletContext();
		javax.servlet.http.HttpServletRequest request = ServletActionContext.getRequest();
		javax.servlet.http.HttpServletResponse response = ServletActionContext.getResponse();
		TilesContainer container = TilesAccess.getContainer(servletContext);
		if (!StringUtils.isEmpty(layout)) {
			AttributeContext attributeContext = container.startContext(new Object[] { request, response });
			attributeContext.putAttribute(bodyName, new Attribute(location));
			container.render(layout, new Object[] { request, response });
		} else {
			container.render(location, new Object[] { request, response });
		}
	}
}