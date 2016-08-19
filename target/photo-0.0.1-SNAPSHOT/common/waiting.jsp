<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<div id="coverDIV" style="background-color:#f0f0f0;position:absolute;border-width:0px;left:0px;top:0px;height:0px;width:0px;z-index:30000;filter:alpha(opacity=70);display:none;">
<table border="0" align="center" width="100%" height="600">
  <tr>
    <td height="20"></td>
  </tr>
  <tr>
    <td valign="top">
	    <table border="0" align="center" width="300" height="50" bgcolor="#FFFFFF" style="border-style:groove;border-width:thin;">
	  	  <tr>
	    	<td><img src="images/waiting.gif" width="26" height="26" alt="請等待"> 資料讀取中.. </td>
	  	  </tr>
		</table>
    </td>
  </tr>
</table>
</div>
<script language="JavaScript" type="text/JavaScript">
<!--
	var coverDIV = document.getElementById("coverDIV");
	function timeOutWaiting()
	{
		if(coverDIV.style.display=="block")
		{
			hideWaitingPage();
		}
	}

	function showWaitingPage()
	{
		coverDIV.style.display = "block";
		coverDIV.style.height = document.body.clientHeight;
		coverDIV.style.width = document.body.clientWidth;
		coverDIV.style.top = "0px";
		coverDIV.style.left = "0px";
	}

	function hideWaitingPage()
	{
		coverDIV.style.height = "0px";
		coverDIV.style.width = "0px";
		coverDIV.style.display = "none";
	}
//-->
</script>
