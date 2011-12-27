for(var imgs=document.getElementsByTagName("img"),i=0;i<imgs.length;i++)try{imgs[i].setAttribute("onclick","createToolbar(this)"),imgs[i].setAttribute("onmouseover","this.style.opacity=0.5;"),imgs[i].setAttribute("onmouseout","this.style.opacity=1;")}catch(err){alert(err)}alert("Click on an image to search on iqdb.org.");
function createToolbar(b){var a=b.parentNode,c=b.src,d=document.createElement("div");d.style.position="relative";a.appendChild(d);d.appendChild(a.removeChild(b));b=document.createElement("ul");b.setAttribute("style","position: absolute;top: 0px;left: 0px;background-color: black;opacity: 0.8;");b.appendChild(createSearchEngine("iqdb","iqdbSearch('"+c+"');"));b.appendChild(createSearchEngine("sauceNAO","sauceNAOSearch('"+c+"');"));b.appendChild(createSearchEngine("Google","googleSearch('"+c+"');"));
b.appendChild(createSearchEngine("TinEye","tineyeSearch('"+c+"');"));b.appendChild(createSearchEngine("Baidu","baiduSearch('"+c+"');"));d.appendChild(b)}function createSearchEngine(b,a){var c=document.createElement("li"),d=document.createElement("a");d.setAttribute("style","color: white;text-decoration: none;margin: 5px;");d.href="javascript:void(0);";d.setAttribute("onclick",a);d.innerHTML=b;c.appendChild(d);return c}
function iqdbSearch(b){var a=document.createElement("form");a.action="http://iqdb.org/";a.method="post";a.enctype="multipart/form-data";a.target="_blank";var c=document.createElement("input");c.type="hidden";c.name="url";c.value=b;a.appendChild(c);document.body.appendChild(a);a.submit()}
function sauceNAOSearch(b){var a=document.createElement("form");a.action="http://saucenao.com/search.php";a.method="post";a.enctype="multipart/form-data";a.target="_blank";var c=document.createElement("input");c.type="hidden";c.name="url";c.value=b;a.appendChild(c);b=document.createElement("input");b.type="hidden";b.name="urlify";b.value="true";a.appendChild(b);document.body.appendChild(a);a.submit()}
function googleSearch(b){var a=document.createElement("form");a.action="http://www.google.com/searchbyimage";a.method="GET";a.enctype="multipart/form-data";a.target="_blank";var c=document.createElement("input");c.type="hidden";c.name="image_url";c.value=b;a.appendChild(c);document.body.appendChild(a);a.submit()}
function tineyeSearch(b){var a=document.createElement("form");a.action="http://www.tineye.com/search";a.method="POST";a.target="_blank";var c=document.createElement("input");c.type="hidden";c.name="url";c.value=b;a.appendChild(c);document.body.appendChild(a);a.submit()}
function sakuraSearch(b){var a=document.createElement("form");a.action="http://www.tineye.com/search";a.method="POST";a.target="_blank";var c=document.createElement("input");c.type="hidden";c.name="url";c.value=b;a.appendChild(c);document.body.appendChild(a);a.submit()}
function baiduSearch(b){var a=document.createElement("form");a.action="http://stu.baidu.com/i?";a.method="get";a.target="_blank";var c=document.createElement("input");c.type="hidden";c.name="objurl";c.value=b;a.appendChild(c);b=document.createElement("input");b.type="hidden";b.name="rt";b.value="0";a.appendChild(b);b=document.createElement("input");b.type="hidden";b.name="rn";b.value="10";a.appendChild(b);b=document.createElement("input");b.type="hidden";b.name="ct";b.value="1";a.appendChild(b);b=
document.createElement("input");b.type="hidden";b.name="tn";b.value="baiduimage";a.appendChild(b);document.body.appendChild(a);a.submit()};
