package com.photo.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.zip.Adler32;
import java.util.zip.CheckedOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import kplug.log.LogUtil;

import org.apache.struts.util.FileUtil;

public class ZipUtil {
	static final int BUFFER = 2048;

	public static void zipFiles(String outZipFilePath, String filesPath) {
		try {
			BufferedInputStream origin = null;
			FileOutputStream dest = new FileOutputStream(outZipFilePath);
			ZipOutputStream out = new ZipOutputStream(new BufferedOutputStream(dest));
			out.setMethod(ZipOutputStream.DEFLATED);
			byte data[] = new byte[BUFFER];
			// get a list of files from filesPath
			File f = new File(filesPath);
			String files[] = f.list();
			for (int i = 0; i < files.length; i++) {
				System.out.println("Adding: " + files[i]);
				FileInputStream fi = new FileInputStream(filesPath + File.separator + files[i]);
				origin = new BufferedInputStream(fi, BUFFER);
				ZipEntry entry = new ZipEntry(files[i]);
				out.putNextEntry(entry);
				int count;
				while ((count = origin.read(data, 0, BUFFER)) != -1) {
					out.write(data, 0, count);
				}
				origin.close();
			}
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static boolean dzip(String dir, String dzip) {
		try {
			BufferedInputStream origin = null;
			FileOutputStream dest = new FileOutputStream(dzip);
			CheckedOutputStream checksum = new CheckedOutputStream(dest, new Adler32());
			ZipOutputStream out = new ZipOutputStream(new BufferedOutputStream(checksum));
			// out.setMethod(ZipOutputStream.DEFLATED);
			byte data[] = new byte[BUFFER];
			// get a list of files from current directory
			File f = new File(dir);
			File[] files = f.listFiles();

			for (int i = 0; i < files.length; i++) {
				if (files[i].isDirectory()) {
					String dname = files[i].getName();
					File[] files2 = files[i].listFiles();
					for (int j = 0; j < files2.length; j++) {
						if (files2[j].isFile()) {
							System.out.println("Adding: " + files2[j].getPath());
							FileInputStream fi = new FileInputStream(files2[j].getPath());
							origin = new BufferedInputStream(fi, BUFFER);
							ZipEntry entry = new ZipEntry(dname + File.separator + files2[j].getName());
							out.putNextEntry(entry);
							int count;
							while ((count = origin.read(data, 0, BUFFER)) != -1) {
								out.write(data, 0, count);
							}
							origin.close();
						} else if (files2[j].isDirectory()) {
							String dname3 = files2[j].getName();
							File[] files3 = files2[j].listFiles();
							for (int k = 0; k < files3.length; k++) {
								if (files3[k].isFile()) {
									LogUtil.write("swf", "Adding: " + files3[k].getPath());
									FileInputStream fi = new FileInputStream(files3[k].getPath());
									origin = new BufferedInputStream(fi, BUFFER);
									ZipEntry entry = new ZipEntry(dname + File.separator + dname3 + File.separator + files3[k].getName());
									out.putNextEntry(entry);
									int count;
									while ((count = origin.read(data, 0, BUFFER)) != -1) {
										out.write(data, 0, count);
									}
									origin.close();
								}
							}
						}
					}
				} else {
					System.out.println("Adding: " + files[i].getPath());
					FileInputStream fi = new FileInputStream(files[i].getPath());
					origin = new BufferedInputStream(fi, BUFFER);
					ZipEntry entry = new ZipEntry(files[i].getName());
					out.putNextEntry(entry);
					int count;
					while ((count = origin.read(data, 0, BUFFER)) != -1) {
						out.write(data, 0, count);
					}
					origin.close();
				}
			}
			out.close();
			LogUtil.write("swf", "checksum:" + checksum.getChecksum().getValue());
		} catch (Exception e) {
			e.printStackTrace();
			LogUtil.write("swf", e.getMessage());
		}
		return false;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		extract("C:\\test\\test.zip", "C:\\test\\");
	}

	public static void extract(String filename, String destinationname) {
		try {
			byte[] buf = new byte[1024];
			ZipInputStream zipinputstream = null;
			ZipEntry zipentry;
			zipinputstream = new ZipInputStream(new FileInputStream(filename));

			zipentry = zipinputstream.getNextEntry();
			while (zipentry != null) {
				String entryName = zipentry.getName();
				System.out.println("entryname " + entryName);
				int n;
				FileOutputStream fileoutputstream;
				File newFile = new File(entryName);
				if (zipentry.isDirectory()) {
					FileUtil.mkdirs(destinationname + entryName);
					zipentry = zipinputstream.getNextEntry();
					continue;
				}
				fileoutputstream = new FileOutputStream(destinationname + entryName);
				while ((n = zipinputstream.read(buf, 0, 1024)) > -1)
					fileoutputstream.write(buf, 0, n);

				fileoutputstream.close();
				zipinputstream.closeEntry();
				zipentry = zipinputstream.getNextEntry();
			}// while

			zipinputstream.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
