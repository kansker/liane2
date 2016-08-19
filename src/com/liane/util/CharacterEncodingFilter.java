package com.photo.util;

import java.io.IOException;

import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
/**
 * 轉碼a
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2005</p>
 * <p>Company: </p>
 * @author not attributable
 * @version 1.0
 */
public class CharacterEncodingFilter implements javax.servlet.Filter {

  public CharacterEncodingFilter() {
  }

  public void init(FilterConfig config) {}

  public void destroy(){}

  public void doFilter(ServletRequest request, ServletResponse response,
                       javax.servlet.FilterChain chain)
                          throws ServletException, IOException {

    if (request instanceof HttpServletRequest) {
      request = (HttpServletRequest) request;

      if (request.getCharacterEncoding() == null) {
        request.setCharacterEncoding("UTF-8");
      }

    }
    // Filter可以「串接起來」,chain就是用來做串接的動作.
    chain.doFilter(request, response);
  }
}
