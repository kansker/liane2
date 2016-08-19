package com.photo.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.ImageTypeSpecifier;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.metadata.IIOMetadata;
import javax.imageio.stream.FileImageInputStream;
import javax.imageio.stream.FileImageOutputStream;

import org.w3c.dom.Element;

public class WriteImage {
	static public void main(String args[]) throws Exception {
		try {
			File bgfile = new File("c://1.jpg");// 來源圖檔
			BufferedImage bg_src = javax.imageio.ImageIO.read(bgfile);

			int width = bg_src.getWidth(null);
			int height = bg_src.getHeight(null);
			BufferedImage bi = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
			Graphics2D ig2 = bi.createGraphics();
			ig2.drawImage(bg_src, 0, 0, width, height, null);

			// Font font = new Font("標楷體", Font.BOLD, 60);
			Font font = new Font("細明體", Font.BOLD, 60);
			ig2.setFont(font);
			String message = "www.java2s.com好大家好!";
			FontMetrics fontMetrics = ig2.getFontMetrics();
			int stringWidth = fontMetrics.stringWidth(message);
			int stringHeight = fontMetrics.getAscent();
			ig2.setPaint(Color.YELLOW);
			ig2.drawString(message, (width - stringWidth) / 2, height / 2 + stringHeight / 4);
			ImageIO.write(bi, "PNG", new File("c:\\2.PNG"));// 輸出圖檔
			ImageIO.write(bi, "JPEG", new File("c:\\2.jpg"));// 輸出圖檔

			File infile = new File("c:\\5.jpg");
			File outfile = new File("c:\\53.jpg");

			FileImageInputStream in = new FileImageInputStream(infile);
			Iterator<ImageReader> iterator = ImageIO.getImageReaders(in);
			ImageReader reader = iterator.next();
			reader.setInput(in);

			IIOMetadata data = reader.getImageMetadata(0);

			// metadata format names are: javax_imageio_jpeg_image_1.0 or javax_imageio_1.0

			Element tree = (Element) data.getAsTree("javax_imageio_jpeg_image_1.0");
			Element jfif = (Element) tree.getElementsByTagName("app0JFIF").item(0);
			String dpiX = jfif.getAttribute("Xdensity");
			String dpiY = jfif.getAttribute("Ydensity");

			System.out.println("  Density of source is " + dpiX + "x" + dpiY);

			BufferedImage image = ImageIO.read(infile);

			ImageWriter writer = ImageIO.getImageWriter(reader);
			FileImageOutputStream out = new FileImageOutputStream(outfile);
			writer.setOutput(out);

			ImageWriteParam writeParams = writer.getDefaultWriteParam();
			writeParams.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
			writeParams.setCompressionQuality(1f);

			data = writer.getDefaultImageMetadata(new ImageTypeSpecifier(image), writeParams);
			tree = (Element) data.getAsTree("javax_imageio_jpeg_image_1.0");
			jfif = (Element) tree.getElementsByTagName("app0JFIF").item(0);
			jfif.setAttribute("Xdensity", "300");
			jfif.setAttribute("Ydensity", "300");
			jfif.setAttribute("resUnits", "1"); // density is dots per inch

			writer.write(data, new IIOImage(image, null, null), writeParams);

			in.close();
			out.close();
		} catch (IOException ie) {
			ie.printStackTrace();
		}

	}
}
