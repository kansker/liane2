package com.liane.util;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.GradientPaint;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.AffineTransform;
import java.awt.geom.Ellipse2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

public class WriteImageType {
	static public void main(String args[]) throws Exception {
		try {
			File bgfile = new File("c://1.jpg");
			BufferedImage bg_src = javax.imageio.ImageIO.read(bgfile);

			int width = bg_src.getWidth(null);
			int height = bg_src.getHeight(null);
			BufferedImage bi = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
			Graphics2D ig2 = bi.createGraphics();
			ig2.drawImage(bg_src, 0, 0, width, height, null);

			// int width = 400, height = 400;
			// TYPE_INT_ARGB specifies the image format: 8-bit RGBA packed
			// into integer pixels
			// BufferedImage bi = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
			// Graphics2D ig2 = bi.createGraphics();

			Font font = new Font("TimesRoman", Font.BOLD, 30);
			ig2.setFont(font);
			String message = "www.java2s.com好!";
			FontMetrics fontMetrics = ig2.getFontMetrics();
			int stringWidth = fontMetrics.stringWidth(message);
			int stringHeight = fontMetrics.getAscent();
			ig2.setPaint(Color.black);
			ig2.drawString(message, (width - stringWidth) / 2, height / 2 + stringHeight / 4);

			ImageIO.write(bi, "PNG", new File("c:\\yourImageName.PNG"));
			ImageIO.write(bi, "JPEG", new File("c:\\yourImageName.JPG"));
			ImageIO.write(bi, "gif", new File("c:\\yourImageName.GIF"));
			ImageIO.write(bi, "BMP", new File("c:\\yourImageName.BMP"));
			// ------------------------------------------------------------------------------------------
			bi = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
			ig2 = bi.createGraphics();
			// Set the rendering quality.
			ig2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
			// define a linear colour gradient
			GradientPaint gp = new GradientPaint(0, 60, Color.red, 0, 120, Color.yellow);
			Ellipse2D r = new Ellipse2D.Float(30, 60, 160, 60);
			ig2.setPaint(gp);
			ig2.fill(r);
			// set rotation
			ig2.transform(AffineTransform.getRotateInstance(Math.PI / 4));
			ig2.setFont(new Font("Serif", Font.BOLD, 85));
			ig2.setPaint(Color.blue);
			// set compositing rule with transparency
			ig2.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 0.5f));
			ig2.drawString("J2D", 150, 170);

			ImageIO.write(bi, "PNG", new File("c:\\yourImageName2.PNG"));

			// ------------------------------------------------------------------------------------------
			font = new Font("標楷體", Font.BOLD, 30);
			bi = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
			ig2 = bi.createGraphics();
			// 开启ANTI-ALIASING属性，这样可以使得大字体变得更加柔和
			ig2.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
			ig2.setFont(font);
			// 将字符串分解成字符放入字符数组中
			char[] chars = "測試測試測試測試測試測試測試試測試測試測試測試測試".toCharArray();
			// 获取字体相关属性
			FontMetrics fm = ig2.getFontMetrics();
			// 获取字符高度
			int h = fm.getAscent();
			int x = 0;
			int tracking = 0;
			// 循环绘制每一个字符
			for (int i = 0; i < chars.length; i++) {
				char ch = chars[i];
				int w = fm.charWidth(ch) + tracking;
				ig2.setColor(Color.black);
				ig2.drawString("" + chars[i], x, h);
				ig2.drawString("" + chars[i], x, h);
				x += w;
				if (x > width || (x + w) > width) {
					x = 0;
					h += fm.getAscent();
				}
				// 将ANTI-ALIASING属性恢复为缺省值
				ig2.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_DEFAULT);
			}
			ImageIO.write(bi, "PNG", new File("c:\\yourImageName3.PNG"));
		} catch (IOException ie) {
			ie.printStackTrace();
		}

	}
}
