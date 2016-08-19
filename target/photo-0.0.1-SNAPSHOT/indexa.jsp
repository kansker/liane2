<%@page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="k" uri="/struts-kker"%>
<html>
  <head>
  <title>出版平台 [Publisher]</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <link href="css/admin_login.css" rel="stylesheet" type="text/css">
<script language="javascript" type="text/javascript">
function setFocus() {
  document.loginForm.userId.select();
  document.loginForm.userId.focus();
}
</script>
  </head>
  <body onload="setFocus();">
  <form action="logina.action" method="post" name="loginForm">
    <div id="wrapper">
      <div id="header">
        <div id="MALL">
          <img src="images/header_text.jpg" alt="MALL Logo"/>
        </div>
      </div>
    </div>
    <div id="ctr" align="center">
      <div class="login">
        <div class="login-form">
          <img src="images/login.gif" alt="Login"/>
          <div class="form-block">
            <div class="inputlabel">Username</div>
            <div>
            	 <input type="text" name="userId" maxlength="20" size="19" value="">
            </div>
            <div class="inputlabel">Password</div>
            <div>
              	<input type="password" name="userPwd" maxlength="20" value="">
            </div>
            <div align="left">
              <input type="submit" name="submit" class="button" value="Login"/>
            </div>
          </div>
        </div>
        <div class="login-text">
          <div class="ctr">
            <img src="images/security.png" width="64" height="64" alt="security"/>
          </div>
          <p>Welcome to PHOTO PRINT Manager !!</p>
          <p>Use a valid username and password to gain access to the administration console.</p>
        </div>
        <div class="clr"></div>
      </div>
    </div>
    <div id="break"></div>
    <noscript>!Warning! Javascript must be enabled for proper operation of the Administrator    </noscript>
  </form>
  </body>
</html>
