package com.photo.util;

import java.util.ArrayList;
import java.util.List;

import kplug.db.ConfigAgent;

import org.apache.struts.util.XMLUtil;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class StateMachine {
	public static int getNextId(int id, String act) {
		try {
			Document doc = XMLUtil.createDocument(StateMachine.class.getClassLoader().getResource("StateMachine.xml").getPath());
			if (doc != null) {
				if (XMLUtil.getNode(doc, "root/states/state[@id='" + id + "']/allow[@a='" + act + "']") == null) {
					return 0;
				}
				return XMLUtil.getNodeIntValue(doc, "root/states/state[@id='" + id + "']/allow[@a='" + act + "']");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return 0;
	}

	public static int getMulti(int id, String act) {
		try {
			Document doc = XMLUtil.createDocument(StateMachine.class.getClassLoader().getResource("StateMachine.xml").getPath());
			if (doc != null) {
				if (XMLUtil.getNode(doc, "root/states/state[@id='" + id + "']/allow[@a='" + act + "']") == null) {
					return 0;
				}
				return XMLUtil.getAttIntValue(doc, "root/states/state[@id='" + id + "']/allow[@a='" + act + "']", "m");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return 0;
	}

	public static List<String> getAct(int id) {
		List<String> list = new ArrayList<String>();
		try {
			Document doc = XMLUtil.createDocument(StateMachine.class.getClassLoader().getResource("StateMachine.xml").getPath());
			if (doc != null) {
				if (XMLUtil.getNode(doc, "root/states/state[@id='" + id + "']/act") == null) {
					return list;
				}
				NodeList nlist = XMLUtil.getNodeList(doc, "root/states/state[@id='" + id + "']/act");
				for (int i = 0; i < nlist.getLength(); i++) {
					Node node = nlist.item(i);
					list.add(XMLUtil.getAttributeValue(node, "a"));
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return list;
	}

	public static String getServer(String act) {
		try {
			Document doc = XMLUtil.createDocument(StateMachine.class.getClassLoader().getResource("StateMachine.xml").getPath());
			if (doc != null) {
				if (XMLUtil.getNode(doc, "root/servers/server[@act='" + act + "']") == null) {
					return ConfigAgent.getConfigValue("magick_dataout");
				}
				return XMLUtil.getNodeValue(doc, "root/servers/server[@act='" + act + "']");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return ConfigAgent.getConfigValue("magick_dataout");
	}

	public static void main(String args[]) throws Exception {
		System.out.println(StateMachine.getNextId(2, "f"));
	}
}
