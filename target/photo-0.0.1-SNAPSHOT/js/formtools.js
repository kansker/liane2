/* ------ string validation tools ------ */
function ftTrim( s ) {
// trim leading and trailing "whitespace"
var whitespace = " \t\n\r";
var i = 0;
while ((i < s.length) && (whitespace.indexOf(s.charAt(i)) != -1)) i++;
var j = s.length;
while ((j > i) && (whitespace.indexOf(s.charAt(j-1)) != -1)) j--;
return s.substr(i,j - i);
}
function ftEmpty(s) {
// Check whether string s is empty.
return ((s == null) || (s.length == 0));
}
function ftisAlpha( aChar ) {
if ((aChar >= 'a') && (aChar <= 'z')) return true;
return ((aChar >= 'A') && (aChar <= 'Z'));
}
function ftisNumeric( aChar ) {
return ((aChar >= '0') && (aChar <= '9'));
}
function ftAlphaNumeric( txt ) {
var i, c;
for (i=0; i<txt.length; i++) {
c = txt.charAt(i);
if (!ftisAlpha(c))
if (!ftisNumeric(c)) return false;
}
return true;
}
function ftStateCode(s) {
/* Valid U.S. Postal Codes for states, territories, armed forces, etc. */
/* See http://www.usps.gov/ncsc/lookups/abbr_state.txt. */
var stateCodes = "AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MH|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY|AE|AA|AP";
if (s.length != 2) return false;
else return ((stateCodes.indexOf(s) != -1) && (s.indexOf("|") == -1))
}
function ftCanadian(s) {
/* valid Canadian provinces: */
/* Alberta|AB */
/* British Columbia|BC */
/* Labrador|NL */
/* Manitoba|MB */
/* New Brunswick|NB */
/* Newfoundland|NF */
/* Nunavut|NU */
/* Northwest Territories|NT */
/* Nova Scotia|NS */
/* Ontario|ON */
/* Prince Edward Island|PE */
/* Quebec|PQ or QC */
/* Saskatchewan|SK */
/* Yukon Territory|YT */
var regCodes = "AB|BC|NL|MB|NB|NF|NT|NU|NS|ON|PE|PQ|QC|SK|YT";
if (s.length != 2) return false;
else return ((regCodes.indexOf(s) != -1) && (s.indexOf("|") == -1));
}
function ftZipCode(zip) {
if ((zip.length == 5) || (zip.length == 10)) {
for (var i=0;i<5;i++)
if (!ftisNumeric(zip.charAt(i))) return false;
if (zip.length == 10) {
if (zip.charAt(5) != "-") return false;
for (i=6;i<10;i++)
if (!ftisNumeric(zip.charAt(i))) return false;
}
return true;
}
else return false;
}
function ftCanZip(zip) {
if (zip.length == 7) return (
ftisAlpha(zip.charAt(0)) && ftisNumeric(zip.charAt(1)) && ftisAlpha(zip.charAt(2)) &&
(zip.charAt(3) == " ") &&
ftisNumeric(zip.charAt(4)) && ftisAlpha(zip.charAt(5)) && ftisNumeric(zip.charAt(6))
);
else return false;
}
function ftUKZip(zip) {
var len = zip.length;
if ((len >= 6) && (len <= 8)) return (
ftisAlpha(zip.charAt(0)) &&
ftAlphaNumeric(zip.substring(1,len-5)) &&
(zip.charAt(len-4) == " ") &&
ftisNumeric(zip.charAt(len-3)) && ftisAlpha(zip.charAt(len-2)) && ftisAlpha(zip.charAt(len-1))
);
else return false;
}
function ftEmail(emailStr) {
var emailPat=/^(.+)@(.+)$/
var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
var validChars="\[^\\s" + specialChars + "\]";
var quotedUser="(\"[^\"]*\")";
var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/
var atom=validChars + '+';
var word="(" + atom + "|" + quotedUser + ")";
var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");
var matchArray=emailStr.match(emailPat);
if (matchArray==null) return false;
var user=matchArray[1];
var domain=matchArray[2];
if (user.match(userPat)==null) return false;
var IPArray=domain.match(ipDomainPat)
if (IPArray!=null) {
for (var i=1;i<=4;i++) {
if (IPArray[i]>255) return false;
}
return true;
}
var domainArray=domain.match(domainPat);
if (domainArray==null) return false;
var atomPat=new RegExp(atom,"g");
var domArr=domain.match(atomPat);
var len=domArr.length;
if (domArr[domArr.length-1].length<2 ||
domArr[domArr.length-1].length>4) return false;
if (len<2) return false;
return true;
}
function ftEmailTypo(aForm, fldName, emailStr) {
var badE = ["hotmal","hotmil","yahooo"];
for (var i=0; i<badE.length; i++) {
if (emailStr.indexOf(badE[i]) != -1) {
ftError(aForm, fldName, "E-mail address: Do you mean "+ user +"@"+ ((i<2)?'hotmail':'yahoo') +".com?\n");
return true;
}
}
return false;
}
/* ------ general FORM tools ------ */
function ftSelected(pulldown) {
// return value of selected item
var st = "";
for (var i=0; i<pulldown.options.length; i++)
if (pulldown.options[i].selected) {
if (pulldown.options[i].value) st = pulldown.options[i].value;
else st = pulldown.options[i].text;
break;
}
return st;
}
function ftPosInList(pulldown,val) {
/* return position of 'val' in pulldown menu, -1 if not found */
if (val != "")
for (var i=0; i<pulldown.options.length; i++)
if (pulldown.options[i].value == val) {
return i;
break;
}
return -1;
}
function ftSetSelectVal(pulldown,val) {
/* init Selected item in pulldown menu using <option value="foo"> */
var p = ftPosInList(pulldown,val);
if (p != -1) pulldown.options[p].selected = true;
}
function ftSetSelect(pulldown,textVal) {
/* init Selected item in pulldown menu using <option>text */
if (textVal != "")
for (var i=0; i<pulldown.options.length; i++)
if (pulldown.options[i].text == textVal) {
pulldown.options[i].selected = true;
break;
}
}
function ftChecked(radio) {
/* return value of checked item */
var st = "";
for (var i=0; i<radio.length; i++) {
if (radio[i].checked) {
st = radio[i].value;
break;
}
}
return st;
}
function ftSetRadio(radio, val) {
/* init radio button using <... value="foo"> */
for (var i=0; i<radio.length; i++) {
if (radio[i].value == val) {
radio[i].checked = true;
break;
}
}
}
/* ------ FORM validation code ------ */
var ftErrorFields = "";
var errorOn = new Image(46,15);
var errorOff =  new Image(46,15);
function ftShow(name) {
document.images[name + '_err'].src = errorOn.src;
return;
}
function ftHide(name) {
document.images[name + '_err'].src = errorOff.src;
return;
}
function ftError(aForm,fldName,msg,fldFocus) {
var fldX = (arguments.length > 3) ? fldFocus : fldName;
if (ftErrorFields == "") with (aForm) {eval(fldX + ".focus()")};
ftErrorFields += "- " + msg + "\n";
ftShow(fldName);
}
function ftUpperAlpha(s) {
/* strip non-alphanumerics, return UPPERCASE */
var newSt = "";
var c = null;
for (var i=0; i<s.length; i++) {
c = s.charAt(i);
if (ftisAlpha(c)) newSt += c;
}
return newSt.toUpperCase();
}
function ftValidate(aForm,reqEMail,reqAddr) {
with (aForm) {
/* age is used in Disney Sign Up.*/
if (elements["age"]) {
if(ftChecked(age) == "") ftError(aForm, "age", "Please select your age.", "email");
else ftHide("age");
}
if (elements["nickname"]) {
nickname.value = ftTrim(nickname.value);
if ( (nickname.value.indexOf("<") != -1) || (nickname.value.indexOf(">") != -1) ||
(nickname.value.indexOf(",") != -1) || (nickname.value.indexOf(" ") != -1) ||
(nickname.value.indexOf("`") != -1) || (nickname.value.indexOf("\'") != -1) ||
(nickname.value.indexOf("\"") != -1) )
ftError(aForm,"nickname","Invalid characters in nickname.");
else if (nickname.value.length > 0) ftHide("nickname")
else ftError(aForm,"nickname","Enter a nickname.")
}
if (elements["firstname"]) {
firstname.value = ftTrim(firstname.value);
if (firstname.value == "") ftError(aForm,"firstname","Enter a first name.")
else ftHide("firstname");
}
if (elements["lastname"]) {
lastname.value = ftTrim(lastname.value);
if (lastname.value == "") ftError(aForm,"lastname","Enter a last name.")
else ftHide("lastname");
}
if (elements["phone"]) {
phone.value = ftTrim(phone.value);
if (phone.value == "") ftError(aForm,"phone","Enter a valid phone number.")
else ftHide("phone");
}
if (elements["email"]) {
email.value = ftTrim(email.value);
if (((reqEMail) || (email.value != "")) && !ftEmail(email.value)) {
ftError(aForm,"email","Enter a valid e-mail address in the form xxx@xxx.xxx")
} else {
if (!ftEmailTypo(aForm, "email", email.value))
ftHide("email");
}
}
if (elements["email_confirm"]) {
email_confirm.value = ftTrim(email_confirm.value);
if (email_confirm.value != email.value) ftError(aForm,"email_confirm","The two email addresses you entered did not match. Please re-enter your email.")
else ftHide("email_confirm");
}
if (elements["password"]) {
password.value = ftTrim(password.value);
if (password.value.length < 4) ftError(aForm,"password","Enter a password from 4 to 10 characters long with no spaces.")
else ftHide("password");
}
if (elements["confirm"]) {
confirm.value = ftTrim(confirm.value);
if (confirm.value != password.value) ftError(aForm,"confirm","The two passwords you entered did not match. Please re-enter your password.")
else ftHide("confirm");
}
if (elements["address1"]) {
/* if "address1" field present then assume city/state/zip/etc. */
address1.value = ftTrim(address1.value);
address2.value = ftTrim(address2.value);
city.value = ftTrim(city.value);
state.value = ftTrim(state.value);
zip.value = ftTrim(zip.value);
if (reqAddr)
if ((address1.value + address2.value) == "")
ftError(aForm,"address","Enter a valid address.","address1");
else ftHide("address");
if (reqAddr)
if (city.value == "") ftError(aForm,"city","Enter a valid city.");
else ftHide("city");
var cVal;
if (country.options) cVal = country.options[country.selectedIndex].value;
else                 cVal = country.value;
/* valid U.S. territories: */
/* American Samoa|AS */
/* Federated States of Micronesia|FM */
/* Guam|GU */
/* Marshall Islands|MH */
/* Northern Mariana Islands|MP */
/* Palau|PW */
/* Puerto Rico|PR */
/* Virgin Islands|VI */
var tCodes = "AS|FM|GU|MH|MP|PW|PR|VI";
/* Great Britain|GBR */
/* Gibraltar|GIB */
/* United Kingdom|UNK */
var gCodes = "GRB|GIB|UNK";
if (cVal != "" && tCodes.indexOf(cVal) != -1) {
/* validate territory address */
state.value = ftUpperAlpha(state.value);
if ((reqAddr) || (state.value != ""))
if (state.value == cVal) ftHide("state")
else ftError(aForm,"state","Enter a valid 2 letter territory code.")
/* validate US ZIP code - filter characters, add dash as 6th character */
var newZip = "";
var c;
for (var i=0; i<zip.value.length; i++) {
c = zip.value.charAt(i);
if (ftisNumeric(c)) {
if (newZip.length == 5) {newZip += "-"}
newZip += c;
}
}
if ((reqAddr) || (zip.value != ""))
if (ftZipCode(newZip)) {
zip.value = newZip;
ftHide("zip");
}
else ftError(aForm,"zip","Enter a valid 5 or 9 digit zip code")
} else if (cVal == "USA") {
/* validate US address */
state.value = ftUpperAlpha(state.value);
if ((reqAddr) || (state.value != ""))
if (ftStateCode(state.value)) ftHide("state")
else ftError(aForm,"state","Enter a valid 2 letter state code.")
/* validate US ZIP code - filter characters, add dash as 6th character */
var newZip = "";
var c;
for (var i=0; i<zip.value.length; i++) {
c = zip.value.charAt(i);
if (ftisNumeric(c)) {
if (newZip.length == 5) {newZip += "-";}
newZip += c;
}
}
if ((reqAddr) || (zip.value != ""))
if (ftZipCode(newZip)) {
zip.value = newZip;
ftHide("zip");
}
else ftError(aForm,"zip","Enter a valid 5 or 9 digit U.S. zip code")
} else if (cVal == "CDN") {
/* validate Canadian address */
state.value = ftUpperAlpha(state.value);
if ((reqAddr) || (state.value != ""))
if (ftCanadian(state.value)) ftHide("state");
else ftError(aForm,"state","Enter a valid 2 letter Canadian Province code.");
/* validate Canadian ZIP code - remove spaces, add one space as 4th character */
zip.value = zip.value.toUpperCase();
var newZip = "";
var c;
for (var i=0; i<zip.value.length; i++) {
c = zip.value.charAt(i);
if (ftisAlpha(c) || ftisNumeric(c)) {
if (newZip.length == 3) {newZip += " ";}
newZip += c;
}
}
zip.value = newZip;
if ((reqAddr) || (zip.value != ""))
if (ftCanZip(zip.value)) ftHide("zip");
else ftError(aForm,"zip","Enter a valid Canadian postal code");
} else if (cVal != "" && gCodes.indexOf(cVal) != -1) {
/* validate UK ZIP code - add space as necessary */
zip.value = zip.value.toUpperCase();
var newZip = "";
var c;
for (var i=zip.value.length-1; i>=0; i--) {
c = zip.value.charAt(i);
if (ftisAlpha(c) || ftisNumeric(c)) {
if (newZip.length == 3) {newZip = " " + newZip;}
newZip = c + newZip;
}
}
zip.value = newZip;
if ((reqAddr) || (zip.value != ""))
if (ftUKZip(zip.value)) ftHide("zip");
else ftError(aForm,"zip","Enter a valid United Kingdom postal code");
}
if (reqAddr || state.value != "")
if (cVal == "") ftError(aForm,"country","Select a country.");
else ftHide("country");
} /* if "address1" */
if (elements["acceptTerms"]) {
if (!acceptTerms.checked) ftError(aForm,"acceptTerms","Please review and accept the Terms and Conditions.")
else ftHide("acceptTerms");
}
} /* with */
if (ftErrorFields == "") {return true;}
else {
sfAlert("Please correct the following, then resubmit the form. Thank you.\n\n" + ftErrorFields,"err");
return false;
}
}
function convertSmrtQuotes(text) {
var newText = "";
for(i = 0; i < text.length; i++){
if(text.charAt(i) == '\u201C' || text.charAt(i) == '\u201D'){
newText += '"';
} else if(text.charAt(i) == '\u2018' || text.charAt(i) == '\u2019') {
newText += '\'';
} else newText += text.charAt(i);
}
return newText;
}
/* foreign character filtering */
var stayFlg=false;
function foreignCharFilter(st) {
    st=convertSmrtQuotes(st);
var newSt = "";

for (var i=0; i<st.length; i++) {
var aChar = st.charAt(i);
//  alert("acharCodes  "+st.charCodeAt(i));
if ((aChar != "%") && (st.charCodeAt(i) < 256)) {
if(((st.charCodeAt(i)>=127)&&(st.charCodeAt(i)<=191)))
{
}
else if(((st.charCodeAt(i)>=208)&&(st.charCodeAt(i)<=209)))
{
}
else if(((st.charCodeAt(i)>=215)&&(st.charCodeAt(i)<=216)))
{
}
else if(((st.charCodeAt(i)>=221)&&(st.charCodeAt(i)<=223)))
{
}
else if(((st.charCodeAt(i)>=240)&&(st.charCodeAt(i)<=241)))
{
}
else if(((st.charCodeAt(i)>=247)&&(st.charCodeAt(i)<=248)))
{
}
            else if(((st.charCodeAt(i)>=253)&&(st.charCodeAt(i)<=255)))
            {
            }
            else
            {
                newSt += String.fromCharCode(swpChar(st.charCodeAt(i)));
            }
        }
    }
    // alert(st+"\n"+newSt);
    if (newSt != st) {
        stayFlg=true;
        alert("Unprintable character(s) detected and removed.\nPlease verify your text carefully.");
    }
    // DO NOT STRIP LEADING OR TRAILING WHITE SPACE
    st = newSt;
    return newSt;
}
function swpChar(ex)
{
var aChar=ex;
if ((ex == 10)){ // basic Latin Chars
aChar=ex;
}
if ((ex >= 33) && (ex <= 126)){ // basic Latin Chars
aChar=ex;
}
else if ((ex >= 192) && (ex <= 197)){ // A Chars
aChar=65;
}
else if ((ex >= 200) && (ex <= 203)){ // E Chars
aChar=69;
}
else if ((ex >= 204) && (ex <= 207)){ // I Chars
aChar=73;
}
else if ((ex >= 210) && (ex <= 214)){ // O Chars
aChar=79;
}
else if ((ex >= 217) && (ex <= 220)){ // U Chars
aChar=85;
}
else if ((ex >= 224) && (ex <= 229)){ // a Chars
aChar=97;
}
else if ((ex >= 232) && (ex <= 235)){ // e Chars
aChar=101;
}
else if ((ex >= 236) && (ex <= 239)){ // i Chars
aChar=105;
}
else if ((ex >= 242) && (ex <= 246)){// o Chars
aChar=111;
}
else if ((ex >= 249) && (ex <= 252)){ // u Chars
aChar=117;
}
else if (ex == 180 ||ex == 96){ // Smart apostrophes
aChar=39;	// with straight apostrophes
}
else if ((ex == 255)){ // y Chars
aChar=121;
}
else if ((ex == 199)){ // y Chars
aChar=67;
}
else if ((ex == 231)){ // y Chars
aChar=99;
}
else
{
//aChar=32;			// spaces
}
return (aChar);
}
