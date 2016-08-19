<%@page contentType="text/html; charset=UTF-8"%>
<script type="text/javascript">
function Init() {                                                       // run on page load
  __dlg_init();    // <!-- this can be found in popup.js -->
  document.body.onkeypress = _CloseOnEsc;

  var color = window.dialogArguments;
  color = ValidateColor(color) || '000000';
  View(color);                                                          // set default color
}

</script>
<table border="0px" cellspacing="0px" cellpadding="4" width="100%">
 <tr>
  <td style="background:buttonface" valign=center><div style="background-color: #000000; padding: 1; height: 21px; width: 50px">
  	<div id="BorderColorPreview" style="height: 100%; width: 100%"></div></div></td>
  <td style="background:buttonface" valign=center>
  	<input type="text" name="BorderColorHex" id="BorderColorHex" value="" size=15 style="font-size: 12px"></td>
  <td bgcolor=#ffffff onMouseOver=ViewBorder('') onClick=SetBorder('') height="10px" width="10px" style="cursor: pointer;"><font size="2">透明</font></td>
  <td style="background:buttonface" width=100%></td>
 </tr>
</table>
<table border="0" cellspacing="1px" cellpadding="0px" width="100%" bgcolor="#000000" style="cursor: pointer;">
<tr>
<td bgcolor="#000000" onMouseOver="ViewBorder('000000')" onClick="SetBorder('000000')" height="10px" width="10px"></td>
<td bgcolor="#000000" onMouseOver="ViewBorder('000000')" onClick="SetBorder('000000')" height="10px" width="10px"></td>
<td bgcolor="#000000" onMouseOver="ViewBorder('000000')" onClick="SetBorder('000000')" height="10px" width="10px"></td>
<td bgcolor="#000000" onMouseOver="ViewBorder('000000')" onClick="SetBorder('000000')" height="10px" width="10px"></td>
<td bgcolor=#003300 onMouseOver="ViewBorder('003300')" onClick=SetBorder('003300') height="10px" width="10px"></td>
<td bgcolor=#006600 onMouseOver="ViewBorder('006600')" onClick=SetBorder('006600') height="10px" width="10px"></td>
<td bgcolor=#009900 onMouseOver="ViewBorder('009900')" onClick=SetBorder('009900') height="10px" width="10px"></td>
<td bgcolor=#00CC00 onMouseOver="ViewBorder('00CC00')" onClick=SetBorder('00CC00') height="10px" width="10px"></td>
<td bgcolor=#00FF00 onMouseOver="ViewBorder('00FF00')" onClick=SetBorder('00FF00') height="10px" width="10px"></td>
<td bgcolor=#330000 onMouseOver="ViewBorder('330000')" onClick=SetBorder('330000') height="10px" width="10px"></td>
<td bgcolor=#333300 onMouseOver="ViewBorder('333300')" onClick=SetBorder('333300') height="10px" width="10px"></td>
<td bgcolor=#336600 onMouseOver="ViewBorder('336600')" onClick=SetBorder('336600') height="10px" width="10px"></td>
<td bgcolor=#339900 onMouseOver="ViewBorder('339900')" onClick=SetBorder('339900') height="10px" width="10px"></td>
<td bgcolor=#33CC00 onMouseOver="ViewBorder('33CC00')" onClick=SetBorder('33CC00') height="10px" width="10px"></td>
<td bgcolor=#33FF00 onMouseOver="ViewBorder('33FF00')" onClick=SetBorder('33FF00') height="10px" width="10px"></td>
<td bgcolor=#660000 onMouseOver="ViewBorder('660000')" onClick=SetBorder('660000') height="10px" width="10px"></td>
<td bgcolor=#663300 onMouseOver="ViewBorder('663300')" onClick=SetBorder('663300') height="10px" width="10px"></td>
<td bgcolor=#666600 onMouseOver="ViewBorder('666600')" onClick=SetBorder('666600') height="10px" width="10px"></td>
<td bgcolor=#669900 onMouseOver="ViewBorder('669900')" onClick=SetBorder('669900') height="10px" width="10px"></td>
<td bgcolor=#66CC00 onMouseOver="ViewBorder('66CC00')" onClick=SetBorder('66CC00') height="10px" width="10px"></td>
<td bgcolor=#66FF00 onMouseOver="ViewBorder('66FF00')" onClick=SetBorder('66FF00') height="10px" width="10px"></td>

</tr>
<tr>
<td bgcolor="#000000" onMouseOver="ViewBorder('000000')" onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor="#333333" onMouseOver="ViewBorder('333333')" onClick=SetBorder('333333') height="10px" width="10px"></td>
<td bgcolor="#000000" onMouseOver="ViewBorder('000000')" onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor="#000033" onMouseOver="ViewBorder('000033')" onClick=SetBorder('000033') height="10px" width="10px"></td>
<td bgcolor="#003333" onMouseOver="ViewBorder('003333')" onClick=SetBorder('003333') height="10px" width="10px"></td>
<td bgcolor="#006633" onMouseOver="ViewBorder('006633')" onClick=SetBorder('006633') height="10px" width="10px"></td>
<td bgcolor="#009933" onMouseOver="ViewBorder('009933')" onClick=SetBorder('009933') height="10px" width="10px"></td>
<td bgcolor="#00CC33" onMouseOver="ViewBorder('00CC33')" onClick=SetBorder('00CC33') height="10px" width="10px"></td>
<td bgcolor="#00FF33" onMouseOver="ViewBorder('00FF33')" onClick=SetBorder('00FF33') height="10px" width="10px"></td>
<td bgcolor="#330033" onMouseOver="ViewBorder('330033')" onClick=SetBorder('330033') height="10px" width="10px"></td>
<td bgcolor="#333333" onMouseOver="ViewBorder('333333')" onClick=SetBorder('333333') height="10px" width="10px"></td>
<td bgcolor="#336633" onMouseOver="ViewBorder('336633')" onClick=SetBorder('336633') height="10px" width="10px"></td>
<td bgcolor="#339933" onMouseOver="ViewBorder('339933')" onClick=SetBorder('339933') height="10px" width="10px"></td>
<td bgcolor="#33CC33" onMouseOver="ViewBorder('33CC33')" onClick=SetBorder('33CC33') height="10px" width="10px"></td>
<td bgcolor="#33FF33" onMouseOver="ViewBorder('33FF33')" onClick=SetBorder('33FF33') height="10px" width="10px"></td>

<td bgcolor=#660033 onMouseOver="ViewBorder('660033')" onClick=SetBorder('660033') height="10px" width="10px"></td>
<td bgcolor=#663333 onMouseOver="ViewBorder('663333')" onClick=SetBorder('663333') height="10px" width="10px"></td>
<td bgcolor=#666633 onMouseOver="ViewBorder('666633')" onClick=SetBorder('666633') height="10px" width="10px"></td>
<td bgcolor=#669933 onMouseOver="ViewBorder('669933')" onClick=SetBorder('669933') height="10px" width="10px"></td>
<td bgcolor=#66CC33 onMouseOver="ViewBorder('66CC33')" onClick=SetBorder('66CC33') height="10px" width="10px"></td>
<td bgcolor=#66FF33 onMouseOver="ViewBorder('66FF33')" onClick=SetBorder('66FF33') height="10px" width="10px"></td>
</tr>
<tr>
<td bgcolor="#000000" onMouseOver="ViewBorder('000000')" onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor="#666666" onMouseOver="ViewBorder('666666')" onClick=SetBorder('666666') height="10px" width="10px"></td>
<td bgcolor="#000000" onMouseOver="ViewBorder('000000')" onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor="#000066" onMouseOver="ViewBorder('000066')" onClick=SetBorder('000066') height="10px" width="10px"></td>
<td bgcolor="#003366" onMouseOver="ViewBorder('003366')" onClick=SetBorder('003366') height="10px" width="10px"></td>
<td bgcolor="#006666" onMouseOver="ViewBorder('006666')" onClick=SetBorder('006666') height="10px" width="10px"></td>
<td bgcolor="#009966" onMouseOver="ViewBorder('009966')" onClick=SetBorder('009966') height="10px" width="10px"></td>
<td bgcolor="#00CC66" onMouseOver="ViewBorder('00CC66')" onClick=SetBorder('00CC66') height="10px" width="10px"></td>
<td bgcolor="#00FF66" onMouseOver="ViewBorder('00FF66')" onClick=SetBorder('00FF66') height="10px" width="10px"></td>

<td bgcolor=#330066 onMouseOver=ViewBorder('330066') onClick=SetBorder('330066') height="10px" width="10px"></td>
<td bgcolor=#333366 onMouseOver=ViewBorder('333366') onClick=SetBorder('333366') height="10px" width="10px"></td>
<td bgcolor=#336666 onMouseOver=ViewBorder('336666') onClick=SetBorder('336666') height="10px" width="10px"></td>
<td bgcolor=#339966 onMouseOver=ViewBorder('339966') onClick=SetBorder('339966') height="10px" width="10px"></td>
<td bgcolor=#33CC66 onMouseOver=ViewBorder('33CC66') onClick=SetBorder('33CC66') height="10px" width="10px"></td>
<td bgcolor=#33FF66 onMouseOver=ViewBorder('33FF66') onClick=SetBorder('33FF66') height="10px" width="10px"></td>
<td bgcolor=#660066 onMouseOver=ViewBorder('660066') onClick=SetBorder('660066') height="10px" width="10px"></td>
<td bgcolor=#663366 onMouseOver=ViewBorder('663366') onClick=SetBorder('663366') height="10px" width="10px"></td>
<td bgcolor=#666666 onMouseOver=ViewBorder('666666') onClick=SetBorder('666666') height="10px" width="10px"></td>
<td bgcolor=#669966 onMouseOver=ViewBorder('669966') onClick=SetBorder('669966') height="10px" width="10px"></td>
<td bgcolor=#66CC66 onMouseOver=ViewBorder('66CC66') onClick=SetBorder('66CC66') height="10px" width="10px"></td>
<td bgcolor=#66FF66 onMouseOver=ViewBorder('66FF66') onClick=SetBorder('66FF66') height="10px" width="10px"></td>
</tr>
<tr>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor=#999999 onMouseOver=ViewBorder('999999') onClick=SetBorder('999999') height="10px" width="10px"></td>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>

<td bgcolor=#000099 onMouseOver=ViewBorder('000099') onClick=SetBorder('000099') height="10px" width="10px"></td>
<td bgcolor=#003399 onMouseOver=ViewBorder('003399') onClick=SetBorder('003399') height="10px" width="10px"></td>
<td bgcolor=#006699 onMouseOver=ViewBorder('006699') onClick=SetBorder('006699') height="10px" width="10px"></td>
<td bgcolor=#009999 onMouseOver=ViewBorder('009999') onClick=SetBorder('009999') height="10px" width="10px"></td>
<td bgcolor=#00CC99 onMouseOver=ViewBorder('00CC99') onClick=SetBorder('00CC99') height="10px" width="10px"></td>
<td bgcolor=#00FF99 onMouseOver=ViewBorder('00FF99') onClick=SetBorder('00FF99') height="10px" width="10px"></td>
<td bgcolor=#330099 onMouseOver=ViewBorder('330099') onClick=SetBorder('330099') height="10px" width="10px"></td>
<td bgcolor=#333399 onMouseOver=ViewBorder('333399') onClick=SetBorder('333399') height="10px" width="10px"></td>
<td bgcolor=#336699 onMouseOver=ViewBorder('336699') onClick=SetBorder('336699') height="10px" width="10px"></td>
<td bgcolor=#339999 onMouseOver=ViewBorder('339999') onClick=SetBorder('339999') height="10px" width="10px"></td>
<td bgcolor=#33CC99 onMouseOver=ViewBorder('33CC99') onClick=SetBorder('33CC99') height="10px" width="10px"></td>
<td bgcolor=#33FF99 onMouseOver=ViewBorder('33FF99') onClick=SetBorder('33FF99') height="10px" width="10px"></td>
<td bgcolor=#660099 onMouseOver=ViewBorder('660099') onClick=SetBorder('660099') height="10px" width="10px"></td>
<td bgcolor=#663399 onMouseOver=ViewBorder('663399') onClick=SetBorder('663399') height="10px" width="10px"></td>
<td bgcolor=#666699 onMouseOver=ViewBorder('666699') onClick=SetBorder('666699') height="10px" width="10px"></td>
<td bgcolor=#669999 onMouseOver=ViewBorder('669999') onClick=SetBorder('669999') height="10px" width="10px"></td>
<td bgcolor=#66CC99 onMouseOver=ViewBorder('66CC99') onClick=SetBorder('66CC99') height="10px" width="10px"></td>

<td bgcolor=#66FF99 onMouseOver=ViewBorder('66FF99') onClick=SetBorder('66FF99') height="10px" width="10px"></td>
</tr>
<tr>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor=#CCCCCC onMouseOver=ViewBorder('CCCCCC') onClick=SetBorder('CCCCCC') height="10px" width="10px"></td>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor=#0000CC onMouseOver=ViewBorder('0000CC') onClick=SetBorder('0000CC') height="10px" width="10px"></td>
<td bgcolor=#0033CC onMouseOver=ViewBorder('0033CC') onClick=SetBorder('0033CC') height="10px" width="10px"></td>
<td bgcolor=#0066CC onMouseOver=ViewBorder('0066CC') onClick=SetBorder('0066CC') height="10px" width="10px"></td>
<td bgcolor=#0099CC onMouseOver=ViewBorder('0099CC') onClick=SetBorder('0099CC') height="10px" width="10px"></td>
<td bgcolor=#00CCCC onMouseOver=ViewBorder('00CCCC') onClick=SetBorder('00CCCC') height="10px" width="10px"></td>
<td bgcolor=#00FFCC onMouseOver=ViewBorder('00FFCC') onClick=SetBorder('00FFCC') height="10px" width="10px"></td>
<td bgcolor=#3300CC onMouseOver=ViewBorder('3300CC') onClick=SetBorder('3300CC') height="10px" width="10px"></td>
<td bgcolor=#3333CC onMouseOver=ViewBorder('3333CC') onClick=SetBorder('3333CC') height="10px" width="10px"></td>
<td bgcolor=#3366CC onMouseOver=ViewBorder('3366CC') onClick=SetBorder('3366CC') height="10px" width="10px"></td>
<td bgcolor=#3399CC onMouseOver=ViewBorder('3399CC') onClick=SetBorder('3399CC') height="10px" width="10px"></td>
<td bgcolor=#33CCCC onMouseOver=ViewBorder('33CCCC') onClick=SetBorder('33CCCC') height="10px" width="10px"></td>

<td bgcolor=#33FFCC onMouseOver=ViewBorder('33FFCC') onClick=SetBorder('33FFCC') height="10px" width="10px"></td>
<td bgcolor=#6600CC onMouseOver=ViewBorder('6600CC') onClick=SetBorder('6600CC') height="10px" width="10px"></td>
<td bgcolor=#6633CC onMouseOver=ViewBorder('6633CC') onClick=SetBorder('6633CC') height="10px" width="10px"></td>
<td bgcolor=#6666CC onMouseOver=ViewBorder('6666CC') onClick=SetBorder('6666CC') height="10px" width="10px"></td>
<td bgcolor=#6699CC onMouseOver=ViewBorder('6699CC') onClick=SetBorder('6699CC') height="10px" width="10px"></td>
<td bgcolor=#66CCCC onMouseOver=ViewBorder('66CCCC') onClick=SetBorder('66CCCC') height="10px" width="10px"></td>
<td bgcolor=#66FFCC onMouseOver=ViewBorder('66FFCC') onClick=SetBorder('66FFCC') height="10px" width="10px"></td>
</tr>
<tr>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor=#FFFFFF onMouseOver=ViewBorder('FFFFFF') onClick=SetBorder('FFFFFF') height="10px" width="10px"></td>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor=#0000FF onMouseOver=ViewBorder('0000FF') onClick=SetBorder('0000FF') height="10px" width="10px"></td>
<td bgcolor=#0033FF onMouseOver=ViewBorder('0033FF') onClick=SetBorder('0033FF') height="10px" width="10px"></td>
<td bgcolor=#0066FF onMouseOver=ViewBorder('0066FF') onClick=SetBorder('0066FF') height="10px" width="10px"></td>
<td bgcolor=#0099FF onMouseOver=ViewBorder('0099FF') onClick=SetBorder('0099FF') height="10px" width="10px"></td>
<td bgcolor=#00CCFF onMouseOver=ViewBorder('00CCFF') onClick=SetBorder('00CCFF') height="10px" width="10px"></td>

<td bgcolor=#00FFFF onMouseOver=ViewBorder('00FFFF') onClick=SetBorder('00FFFF') height="10px" width="10px"></td>
<td bgcolor=#3300FF onMouseOver=ViewBorder('3300FF') onClick=SetBorder('3300FF') height="10px" width="10px"></td>
<td bgcolor=#3333FF onMouseOver=ViewBorder('3333FF') onClick=SetBorder('3333FF') height="10px" width="10px"></td>
<td bgcolor=#3366FF onMouseOver=ViewBorder('3366FF') onClick=SetBorder('3366FF') height="10px" width="10px"></td>
<td bgcolor=#3399FF onMouseOver=ViewBorder('3399FF') onClick=SetBorder('3399FF') height="10px" width="10px"></td>
<td bgcolor=#33CCFF onMouseOver=ViewBorder('33CCFF') onClick=SetBorder('33CCFF') height="10px" width="10px"></td>
<td bgcolor=#33FFFF onMouseOver=ViewBorder('33FFFF') onClick=SetBorder('33FFFF') height="10px" width="10px"></td>
<td bgcolor=#6600FF onMouseOver=ViewBorder('6600FF') onClick=SetBorder('6600FF') height="10px" width="10px"></td>
<td bgcolor=#6633FF onMouseOver=ViewBorder('6633FF') onClick=SetBorder('6633FF') height="10px" width="10px"></td>
<td bgcolor=#6666FF onMouseOver=ViewBorder('6666FF') onClick=SetBorder('6666FF') height="10px" width="10px"></td>
<td bgcolor=#6699FF onMouseOver=ViewBorder('6699FF') onClick=SetBorder('6699FF') height="10px" width="10px"></td>
<td bgcolor=#66CCFF onMouseOver=ViewBorder('66CCFF') onClick=SetBorder('66CCFF') height="10px" width="10px"></td>
<td bgcolor=#66FFFF onMouseOver=ViewBorder('66FFFF') onClick=SetBorder('66FFFF') height="10px" width="10px"></td>
</tr>
<tr>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor=#FF0000 onMouseOver=ViewBorder('FF0000') onClick=SetBorder('FF0000') height="10px" width="10px"></td>

<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor=#990000 onMouseOver=ViewBorder('990000') onClick=SetBorder('990000') height="10px" width="10px"></td>
<td bgcolor=#993300 onMouseOver=ViewBorder('993300') onClick=SetBorder('993300') height="10px" width="10px"></td>
<td bgcolor=#996600 onMouseOver=ViewBorder('996600') onClick=SetBorder('996600') height="10px" width="10px"></td>
<td bgcolor=#999900 onMouseOver=ViewBorder('999900') onClick=SetBorder('999900') height="10px" width="10px"></td>
<td bgcolor=#99CC00 onMouseOver=ViewBorder('99CC00') onClick=SetBorder('99CC00') height="10px" width="10px"></td>
<td bgcolor=#99FF00 onMouseOver=ViewBorder('99FF00') onClick=SetBorder('99FF00') height="10px" width="10px"></td>
<td bgcolor=#CC0000 onMouseOver=ViewBorder('CC0000') onClick=SetBorder('CC0000') height="10px" width="10px"></td>
<td bgcolor=#CC3300 onMouseOver=ViewBorder('CC3300') onClick=SetBorder('CC3300') height="10px" width="10px"></td>
<td bgcolor=#CC6600 onMouseOver=ViewBorder('CC6600') onClick=SetBorder('CC6600') height="10px" width="10px"></td>
<td bgcolor=#CC9900 onMouseOver=ViewBorder('CC9900') onClick=SetBorder('CC9900') height="10px" width="10px"></td>
<td bgcolor=#CCCC00 onMouseOver=ViewBorder('CCCC00') onClick=SetBorder('CCCC00') height="10px" width="10px"></td>
<td bgcolor=#CCFF00 onMouseOver=ViewBorder('CCFF00') onClick=SetBorder('CCFF00') height="10px" width="10px"></td>
<td bgcolor=#FF0000 onMouseOver=ViewBorder('FF0000') onClick=SetBorder('FF0000') height="10px" width="10px"></td>
<td bgcolor=#FF3300 onMouseOver=ViewBorder('FF3300') onClick=SetBorder('FF3300') height="10px" width="10px"></td>
<td bgcolor=#FF6600 onMouseOver=ViewBorder('FF6600') onClick=SetBorder('FF6600') height="10px" width="10px"></td>
<td bgcolor=#FF9900 onMouseOver=ViewBorder('FF9900') onClick=SetBorder('FF9900') height="10px" width="10px"></td>

<td bgcolor=#FFCC00 onMouseOver=ViewBorder('FFCC00') onClick=SetBorder('FFCC00') height="10px" width="10px"></td>
<td bgcolor=#FFFF00 onMouseOver=ViewBorder('FFFF00') onClick=SetBorder('FFFF00') height="10px" width="10px"></td>
</tr>
<tr>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor=#00FF00 onMouseOver=ViewBorder('00FF00') onClick=SetBorder('00FF00') height="10px" width="10px"></td>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor=#990033 onMouseOver=ViewBorder('990033') onClick=SetBorder('990033') height="10px" width="10px"></td>
<td bgcolor=#993333 onMouseOver=ViewBorder('993333') onClick=SetBorder('993333') height="10px" width="10px"></td>
<td bgcolor=#996633 onMouseOver=ViewBorder('996633') onClick=SetBorder('996633') height="10px" width="10px"></td>
<td bgcolor=#999933 onMouseOver=ViewBorder('999933') onClick=SetBorder('999933') height="10px" width="10px"></td>
<td bgcolor=#99CC33 onMouseOver=ViewBorder('99CC33') onClick=SetBorder('99CC33') height="10px" width="10px"></td>
<td bgcolor=#99FF33 onMouseOver=ViewBorder('99FF33') onClick=SetBorder('99FF33') height="10px" width="10px"></td>
<td bgcolor=#CC0033 onMouseOver=ViewBorder('CC0033') onClick=SetBorder('CC0033') height="10px" width="10px"></td>
<td bgcolor=#CC3333 onMouseOver=ViewBorder('CC3333') onClick=SetBorder('CC3333') height="10px" width="10px"></td>
<td bgcolor=#CC6633 onMouseOver=ViewBorder('CC6633') onClick=SetBorder('CC6633') height="10px" width="10px"></td>
<td bgcolor=#CC9933 onMouseOver=ViewBorder('CC9933') onClick=SetBorder('CC9933') height="10px" width="10px"></td>

<td bgcolor=#CCCC33 onMouseOver=ViewBorder('CCCC33') onClick=SetBorder('CCCC33') height="10px" width="10px"></td>
<td bgcolor=#CCFF33 onMouseOver=ViewBorder('CCFF33') onClick=SetBorder('CCFF33') height="10px" width="10px"></td>
<td bgcolor=#FF0033 onMouseOver=ViewBorder('FF0033') onClick=SetBorder('FF0033') height="10px" width="10px"></td>
<td bgcolor=#FF3333 onMouseOver=ViewBorder('FF3333') onClick=SetBorder('FF3333') height="10px" width="10px"></td>
<td bgcolor=#FF6633 onMouseOver=ViewBorder('FF6633') onClick=SetBorder('FF6633') height="10px" width="10px"></td>
<td bgcolor=#FF9933 onMouseOver=ViewBorder('FF9933') onClick=SetBorder('FF9933') height="10px" width="10px"></td>
<td bgcolor=#FFCC33 onMouseOver=ViewBorder('FFCC33') onClick=SetBorder('FFCC33') height="10px" width="10px"></td>
<td bgcolor=#FFFF33 onMouseOver=ViewBorder('FFFF33') onClick=SetBorder('FFFF33') height="10px" width="10px"></td>
</tr>
<tr>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor=#0000FF onMouseOver=ViewBorder('0000FF') onClick=SetBorder('0000FF') height="10px" width="10px"></td>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor=#990066 onMouseOver=ViewBorder('990066') onClick=SetBorder('990066') height="10px" width="10px"></td>
<td bgcolor=#993366 onMouseOver=ViewBorder('993366') onClick=SetBorder('993366') height="10px" width="10px"></td>
<td bgcolor=#996666 onMouseOver=ViewBorder('996666') onClick=SetBorder('996666') height="10px" width="10px"></td>
<td bgcolor=#999966 onMouseOver=ViewBorder('999966') onClick=SetBorder('999966') height="10px" width="10px"></td>

<td bgcolor=#99CC66 onMouseOver=ViewBorder('99CC66') onClick=SetBorder('99CC66') height="10px" width="10px"></td>
<td bgcolor=#99FF66 onMouseOver=ViewBorder('99FF66') onClick=SetBorder('99FF66') height="10px" width="10px"></td>
<td bgcolor=#CC0066 onMouseOver=ViewBorder('CC0066') onClick=SetBorder('CC0066') height="10px" width="10px"></td>
<td bgcolor=#CC3366 onMouseOver=ViewBorder('CC3366') onClick=SetBorder('CC3366') height="10px" width="10px"></td>
<td bgcolor=#CC6666 onMouseOver=ViewBorder('CC6666') onClick=SetBorder('CC6666') height="10px" width="10px"></td>
<td bgcolor=#CC9966 onMouseOver=ViewBorder('CC9966') onClick=SetBorder('CC9966') height="10px" width="10px"></td>
<td bgcolor=#CCCC66 onMouseOver=ViewBorder('CCCC66') onClick=SetBorder('CCCC66') height="10px" width="10px"></td>
<td bgcolor=#CCFF66 onMouseOver=ViewBorder('CCFF66') onClick=SetBorder('CCFF66') height="10px" width="10px"></td>
<td bgcolor=#FF0066 onMouseOver=ViewBorder('FF0066') onClick=SetBorder('FF0066') height="10px" width="10px"></td>
<td bgcolor=#FF3366 onMouseOver=ViewBorder('FF3366') onClick=SetBorder('FF3366') height="10px" width="10px"></td>
<td bgcolor=#FF6666 onMouseOver=ViewBorder('FF6666') onClick=SetBorder('FF6666') height="10px" width="10px"></td>
<td bgcolor=#FF9966 onMouseOver=ViewBorder('FF9966') onClick=SetBorder('FF9966') height="10px" width="10px"></td>
<td bgcolor=#FFCC66 onMouseOver=ViewBorder('FFCC66') onClick=SetBorder('FFCC66') height="10px" width="10px"></td>
<td bgcolor=#FFFF66 onMouseOver=ViewBorder('FFFF66') onClick=SetBorder('FFFF66') height="10px" width="10px"></td>
</tr>
<tr>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>

<td bgcolor=#FFFF00 onMouseOver=ViewBorder('FFFF00') onClick=SetBorder('FFFF00') height="10px" width="10px"></td>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor=#990099 onMouseOver=ViewBorder('990099') onClick=SetBorder('990099') height="10px" width="10px"></td>
<td bgcolor=#993399 onMouseOver=ViewBorder('993399') onClick=SetBorder('993399') height="10px" width="10px"></td>
<td bgcolor=#996699 onMouseOver=ViewBorder('996699') onClick=SetBorder('996699') height="10px" width="10px"></td>
<td bgcolor=#999999 onMouseOver=ViewBorder('999999') onClick=SetBorder('999999') height="10px" width="10px"></td>
<td bgcolor=#99CC99 onMouseOver=ViewBorder('99CC99') onClick=SetBorder('99CC99') height="10px" width="10px"></td>
<td bgcolor=#99FF99 onMouseOver=ViewBorder('99FF99') onClick=SetBorder('99FF99') height="10px" width="10px"></td>
<td bgcolor=#CC0099 onMouseOver=ViewBorder('CC0099') onClick=SetBorder('CC0099') height="10px" width="10px"></td>
<td bgcolor=#CC3399 onMouseOver=ViewBorder('CC3399') onClick=SetBorder('CC3399') height="10px" width="10px"></td>
<td bgcolor=#CC6699 onMouseOver=ViewBorder('CC6699') onClick=SetBorder('CC6699') height="10px" width="10px"></td>
<td bgcolor=#CC9999 onMouseOver=ViewBorder('CC9999') onClick=SetBorder('CC9999') height="10px" width="10px"></td>
<td bgcolor=#CCCC99 onMouseOver=ViewBorder('CCCC99') onClick=SetBorder('CCCC99') height="10px" width="10px"></td>
<td bgcolor=#CCFF99 onMouseOver=ViewBorder('CCFF99') onClick=SetBorder('CCFF99') height="10px" width="10px"></td>
<td bgcolor=#FF0099 onMouseOver=ViewBorder('FF0099') onClick=SetBorder('FF0099') height="10px" width="10px"></td>
<td bgcolor=#FF3399 onMouseOver=ViewBorder('FF3399') onClick=SetBorder('FF3399') height="10px" width="10px"></td>
<td bgcolor=#FF6699 onMouseOver=ViewBorder('FF6699') onClick=SetBorder('FF6699') height="10px" width="10px"></td>

<td bgcolor=#FF9999 onMouseOver=ViewBorder('FF9999') onClick=SetBorder('FF9999') height="10px" width="10px"></td>
<td bgcolor=#FFCC99 onMouseOver=ViewBorder('FFCC99') onClick=SetBorder('FFCC99') height="10px" width="10px"></td>
<td bgcolor=#FFFF99 onMouseOver=ViewBorder('FFFF99') onClick=SetBorder('FFFF99') height="10px" width="10px"></td>
</tr>
<tr>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor=#00FFFF onMouseOver=ViewBorder('00FFFF') onClick=SetBorder('00FFFF') height="10px" width="10px"></td>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor=#9900CC onMouseOver=ViewBorder('9900CC') onClick=SetBorder('9900CC') height="10px" width="10px"></td>
<td bgcolor=#9933CC onMouseOver=ViewBorder('9933CC') onClick=SetBorder('9933CC') height="10px" width="10px"></td>
<td bgcolor=#9966CC onMouseOver=ViewBorder('9966CC') onClick=SetBorder('9966CC') height="10px" width="10px"></td>
<td bgcolor=#9999CC onMouseOver=ViewBorder('9999CC') onClick=SetBorder('9999CC') height="10px" width="10px"></td>
<td bgcolor=#99CCCC onMouseOver=ViewBorder('99CCCC') onClick=SetBorder('99CCCC') height="10px" width="10px"></td>
<td bgcolor=#99FFCC onMouseOver=ViewBorder('99FFCC') onClick=SetBorder('99FFCC') height="10px" width="10px"></td>
<td bgcolor=#CC00CC onMouseOver=ViewBorder('CC00CC') onClick=SetBorder('CC00CC') height="10px" width="10px"></td>
<td bgcolor=#CC33CC onMouseOver=ViewBorder('CC33CC') onClick=SetBorder('CC33CC') height="10px" width="10px"></td>
<td bgcolor=#CC66CC onMouseOver=ViewBorder('CC66CC') onClick=SetBorder('CC66CC') height="10px" width="10px"></td>

<td bgcolor=#CC99CC onMouseOver=ViewBorder('CC99CC') onClick=SetBorder('CC99CC') height="10px" width="10px"></td>
<td bgcolor=#CCCCCC onMouseOver=ViewBorder('CCCCCC') onClick=SetBorder('CCCCCC') height="10px" width="10px"></td>
<td bgcolor=#CCFFCC onMouseOver=ViewBorder('CCFFCC') onClick=SetBorder('CCFFCC') height="10px" width="10px"></td>
<td bgcolor=#FF00CC onMouseOver=ViewBorder('FF00CC') onClick=SetBorder('FF00CC') height="10px" width="10px"></td>
<td bgcolor=#FF33CC onMouseOver=ViewBorder('FF33CC') onClick=SetBorder('FF33CC') height="10px" width="10px"></td>
<td bgcolor=#FF66CC onMouseOver=ViewBorder('FF66CC') onClick=SetBorder('FF66CC') height="10px" width="10px"></td>
<td bgcolor=#FF99CC onMouseOver=ViewBorder('FF99CC') onClick=SetBorder('FF99CC') height="10px" width="10px"></td>
<td bgcolor=#FFCCCC onMouseOver=ViewBorder('FFCCCC') onClick=SetBorder('FFCCCC') height="10px" width="10px"></td>
<td bgcolor=#FFFFCC onMouseOver=ViewBorder('FFFFCC') onClick=SetBorder('FFFFCC') height="10px" width="10px"></td>
</tr>
<tr>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor=#FF00FF onMouseOver=ViewBorder('FF00FF') onClick=SetBorder('FF00FF') height="10px" width="10px"></td>
<td bgcolor="#000000" onMouseOver=ViewBorder('000000') onClick=SetBorder('000000') height="10px" width="10px"></td>
<td bgcolor=#9900FF onMouseOver=ViewBorder('9900FF') onClick=SetBorder('9900FF') height="10px" width="10px"></td>
<td bgcolor=#9933FF onMouseOver=ViewBorder('9933FF') onClick=SetBorder('9933FF') height="10px" width="10px"></td>
<td bgcolor=#9966FF onMouseOver=ViewBorder('9966FF') onClick=SetBorder('9966FF') height="10px" width="10px"></td>

<td bgcolor=#9999FF onMouseOver=ViewBorder('9999FF') onClick=SetBorder('9999FF') height="10px" width="10px"></td>
<td bgcolor=#99CCFF onMouseOver=ViewBorder('99CCFF') onClick=SetBorder('99CCFF') height="10px" width="10px"></td>
<td bgcolor=#99FFFF onMouseOver=ViewBorder('99FFFF') onClick=SetBorder('99FFFF') height="10px" width="10px"></td>
<td bgcolor=#CC00FF onMouseOver=ViewBorder('CC00FF') onClick=SetBorder('CC00FF') height="10px" width="10px"></td>
<td bgcolor=#CC33FF onMouseOver=ViewBorder('CC33FF') onClick=SetBorder('CC33FF') height="10px" width="10px"></td>
<td bgcolor=#CC66FF onMouseOver=ViewBorder('CC66FF') onClick=SetBorder('CC66FF') height="10px" width="10px"></td>
<td bgcolor=#CC99FF onMouseOver=ViewBorder('CC99FF') onClick=SetBorder('CC99FF') height="10px" width="10px"></td>
<td bgcolor=#CCCCFF onMouseOver=ViewBorder('CCCCFF') onClick=SetBorder('CCCCFF') height="10px" width="10px"></td>
<td bgcolor=#CCFFFF onMouseOver=ViewBorder('CCFFFF') onClick=SetBorder('CCFFFF') height="10px" width="10px"></td>
<td bgcolor=#FF00FF onMouseOver=ViewBorder('FF00FF') onClick=SetBorder('FF00FF') height="10px" width="10px"></td>
<td bgcolor=#FF33FF onMouseOver=ViewBorder('FF33FF') onClick=SetBorder('FF33FF') height="10px" width="10px"></td>
<td bgcolor=#FF66FF onMouseOver=ViewBorder('FF66FF') onClick=SetBorder('FF66FF') height="10px" width="10px"></td>
<td bgcolor=#FF99FF onMouseOver=ViewBorder('FF99FF') onClick=SetBorder('FF99FF') height="10px" width="10px"></td>
<td bgcolor=#FFCCFF onMouseOver=ViewBorder('FFCCFF') onClick=SetBorder('FFCCFF') height="10px" width="10px"></td>
<td bgcolor=#FFFFFF onMouseOver=ViewBorder('FFFFFF') onClick=SetBorder('FFFFFF') height="10px" width="10px"></td>
</tr>
</table>



