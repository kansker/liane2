package com.photo;

import java.util.Map;
import java.util.TreeMap;

import kplug.db.DaoGenerator;
import kplug.db.GeneratorBean;

public class Db {

	public static void main(String[] args) {
		Map<String, String> dtypes = new TreeMap<String, String>();
		dtypes.put("ct_id", "op");
		dtypes.put("op_id", "op");
		dtypes.put("createDate", "now");
		dtypes.put("updateDate", "now");
		dtypes.put("del_flag", "defaultn");

		Map<String, String> uignores = new TreeMap<String, String>();
		uignores.put("ct_id", "op");
		uignores.put("createDate", "now");
		uignores.put("del_flag", "defaultn");

		Map<String, String> excludes = new TreeMap<String, String>();
		Map<String, String> includes = new TreeMap<String, String>();
		includes.put("productcgy", "seq");
		includes.put("productcgy1", "seq");
		includes.put("productcgy2", "seq");
		includes.put("orderkinds", "seq");
		includes.put("photoorder", "seq");
		includes.put("frame", "seq");
		includes.put("frame_page", "");
		includes.put("frame_product", "");

		includes.put("stylecategory", "seq");
		includes.put("photostyle", "seq");
		includes.put("photostyle_product", "");
		includes.put("photolayout", "seq");
		includes.put("designer", "seq");
		includes.put("frames_cgy", "seq");
		includes.put("frames", "seq");
		includes.put("orderpic", "seq");
		includes.put("fonttype", "seq");
		includes.put("ebooks", "seq");
		includes.put("adminuser", "seq");
		includes.put("seller", "seq");

		Map<String, String> excludeSeqs = new TreeMap<String, String>();

		GeneratorBean bean = new GeneratorBean();
		bean.setConnectId(null);
		bean.setSeqKey("_xxxx");
		bean.setSeqType("mseq");
		bean.setExcludeSeqs(excludeSeqs);
		bean.setIncludes(includes);
		bean.setExcludes(excludes);
		bean.setDefaultTypes(dtypes);
		bean.setUignores(uignores);
		bean.setTarget("K:\\project\\java2015_own\\photo\\src\\dao_default.xml");
		DaoGenerator.make(bean);
	}
}
