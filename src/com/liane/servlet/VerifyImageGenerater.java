package com.liane.servlet;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.util.Random;

/**
 * 產生圖片文字驗證
 * 
 * @author JonnyChang
 * 
 */
public class VerifyImageGenerater {

	/**
	 * 亂數所產生的驗證碼
	 */
	private String verifyCode = "";

	/**
	 * 驗証碼的長度，預設是4
	 */
	private int codeLength = 4;

	/**
	 * 驗證碼的型態，是否只有數字，還是文字數字都有
	 */
	private boolean numberOnly = false;

	// String base = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	String base = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	private String[] fontTypes = { "tahoma", "Atlantic Inline", "fantasy", "Times New Roman", "Georgia", "Arial", "Helvetica", "sans-serif", "System" };

	public String getVerifyCode() {
		return verifyCode;
	}

	public int getCodeLength() {
		return codeLength;
	}

	public void setCodeLength(int codeLength) {
		this.codeLength = codeLength;
	}

	public boolean isNumberOnly() {
		return numberOnly;
	}

	public void setNumberOnly(boolean numberOnly) {
		this.numberOnly = numberOnly;
	}

	/**
	 * 設定範圍獲得顏色
	 * 
	 * @param fc
	 * @param bc
	 * @return
	 */
	private Color getRandColor(int fc, int bc) {
		Random random = new Random();
		if (fc > 255)
			fc = 255;
		if (bc > 255)
			bc = 255;
		int r = fc + random.nextInt(bc - fc);
		int g = fc + random.nextInt(bc - fc);
		int b = fc + random.nextInt(bc - fc);
		return new Color(r, g, b);
	}

	/**
	 * 產生驗證的圖片
	 * 
	 * @param width
	 *            - int 圖片的寬度
	 * @param height
	 *            - int 圖片的長度
	 * @return 圖片
	 */
	public BufferedImage creatImage(int width, int height) {
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		Graphics2D g = image.createGraphics();
		// Graphics g = image.getGraphics();
		Random random = new Random(System.currentTimeMillis());
		g.setColor(getRandColor(200, 250));
		g.fillRect(0, 0, width, height);
		// 隨機產生155條線
		g.setColor(getRandColor(160, 200));

		for (int i = 0; i < 155; i++) {
			int x = random.nextInt(width);
			int y = random.nextInt(height);
			int xl = random.nextInt(30);
			int yl = random.nextInt(30);

			// g.drawString("HowIShow", x, y);
			g.drawLine(x, y, x + xl, y + yl);
			// g.rotate(-2 * Math.PI / angle);
		}
		int numRange = numberOnly ? 10 : base.length();
		char[] charArray = base.toCharArray();
		int fontSize = height;
		g.setFont(new Font(fontTypes[random.nextInt(9)], Font.ITALIC, fontSize));
		this.verifyCode = "";
		for (int i = 0; i < this.codeLength; i++) {
			int pos = random.nextInt(numRange);
			String rand = String.valueOf(charArray[pos]);
			verifyCode += rand;
			// 將認證碼加到圖片中
			g.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));
			int ypos = random.nextInt(8);
			g.drawString(rand, (fontSize - 8) * i + ypos, (height / 2) + (fontSize / 3));
		}
		// 图象生效
		g.dispose();
		return image;

	}

}
