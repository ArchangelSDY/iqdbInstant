var divInstant=new Array();
var imgs=document.getElementsByTagName("img");
for(var i=0;i<imgs.length;i++){
	try{
        imgs[i].setAttribute("onclick","createToolbar(this)");
        imgs[i].setAttribute("onmouseover","this.style.opacity=0.5;");
        imgs[i].setAttribute("onmouseout","this.style.opacity=1;");
	}catch(err){
		alert(err);
	}
}
alert("Choose an image and click on it.");

function createToolbar(img){
	var parent=img.parentNode;
	var imgSrc=img.src;
    
    var divImg=document.createElement("div");
    divImg.style.position="relative";
    parent.appendChild(divImg);
    
    divImg.appendChild(parent.removeChild(img));
    
    var toolbar=document.createElement("ul");
    toolbar.setAttribute("style","position: absolute;top: 0px;left: 0px;background-color: black;opacity: 0.8;list-style-type: none;");

    toolbar.appendChild(createSearchEngine("iqdb","iqdbSearch('"+imgSrc+"');"));
    toolbar.appendChild(createSearchEngine("sauceNAO","sauceNAOSearch('"+imgSrc+"');"));
    toolbar.appendChild(createSearchEngine("Google","googleSearch('"+imgSrc+"');"));
    toolbar.appendChild(createSearchEngine("TinEye","tineyeSearch('"+imgSrc+"');"));
    toolbar.appendChild(createSearchEngine("Baidu","baiduSearch('"+imgSrc+"');"));
    divImg.appendChild(toolbar);

    divInstant.push(divImg);
}

function createSearchEngine(name,searchEngine){
    var engineLi=document.createElement("li");
    var engineAnchor=document.createElement("a");
    engineAnchor.setAttribute("style","color: white;text-decoration: none;margin: 5px;")   
    engineAnchor.href="javascript:void(0);";
    engineAnchor.setAttribute("onclick",searchEngine+"exitSearch();");
    engineAnchor.innerHTML=name;
    engineLi.appendChild(engineAnchor);
    return engineLi;
}

function exitSearch(){
	//remove the onclick event handler
	var imgs=document.getElementsByTagName("img");
	for(var i=0;i<imgs.length;i++){
		try{   			
	        imgs[i].removeAttribute("onclick");
	        imgs[i].removeAttribute("onmouseover");
	        imgs[i].removeAttribute("onmouseout");
		}catch(err){
			alert(err);
		}
	}

	//remove all toolbars
	for(var i=0;i<divInstant.length;i++){
		divImg=divInstant[i];
		var img=divImg.childNodes[0];
		divImg.parentNode.appendChild(divImg.removeChild(img));
		divImg.parentNode.removeChild(divImg);
	}
}

function iqdbSearch(url){
	var form=document.createElement("form");
	form.action="http://iqdb.org/";
	form.method="post";
	form.enctype="multipart/form-data";
	form.target="_blank";

	var txtUrl=document.createElement("input");
	txtUrl.type="hidden";
	txtUrl.name="url";
	txtUrl.value=url;
	form.appendChild(txtUrl);
	
	document.body.appendChild(form);
	form.submit();
}

function sauceNAOSearch(url){
	var form=document.createElement("form");
	form.action="http://saucenao.com/search.php";
	form.method="post";
	form.enctype="multipart/form-data";
	form.target="_blank";

	var txtUrl=document.createElement("input");
	txtUrl.type="hidden";
	txtUrl.name="url";
	txtUrl.value=url;
	form.appendChild(txtUrl);
	
	var checkbox=document.createElement("input");
	checkbox.type="hidden";
	checkbox.name="urlify";
	checkbox.value="true";
	form.appendChild(checkbox);

	document.body.appendChild(form);
	form.submit();
}

function googleSearch(url){
	var form=document.createElement("form");
	form.action="http://www.google.com/searchbyimage";
	form.method="GET";
	form.enctype="multipart/form-data";
	form.target="_blank";

	var txtUrl=document.createElement("input");
	txtUrl.type="hidden";
	txtUrl.name="image_url";
	txtUrl.value=url;
	form.appendChild(txtUrl);

	document.body.appendChild(form);
	form.submit();
}

function tineyeSearch(url){
	var form=document.createElement("form");
	form.action="http://www.tineye.com/search";
	form.method="POST";
	form.target="_blank";

	var txtUrl=document.createElement("input");
	txtUrl.type="hidden";
	txtUrl.name="url";
	txtUrl.value=url;
	form.appendChild(txtUrl);

	document.body.appendChild(form);
	form.submit();
}

function sakuraSearch(url){
	var form=document.createElement("form");
	form.action="http://www.tineye.com/search";
	form.method="POST";
	form.target="_blank";

	var txtUrl=document.createElement("input");
	txtUrl.type="hidden";
	txtUrl.name="url";
	txtUrl.value=url;
	form.appendChild(txtUrl);

	document.body.appendChild(form);
	form.submit();
}

function baiduSearch(url){
	var form=document.createElement("form");
	form.action="http://stu.baidu.com/i?";
	form.method="get";
	form.target="_blank";

	var txtUrl=document.createElement("input");
	txtUrl.type="hidden";
	txtUrl.name="objurl";
	txtUrl.value=url;
	form.appendChild(txtUrl);

	var rt=document.createElement('input');
	rt.type="hidden";
	rt.name="rt";
	rt.value='0';
	form.appendChild(rt);

	var rn=document.createElement('input');
	rn.type="hidden";
	rn.name="rn";
	rn.value='10';
	form.appendChild(rn);

	var ct=document.createElement('input');
	ct.type="hidden";
	ct.name="ct";
	ct.value='1';
	form.appendChild(ct);

	var tn=document.createElement('input');
	tn.type="hidden";
	tn.name="tn";
	tn.value='baiduimage';
	form.appendChild(tn);

	document.body.appendChild(form);
	form.submit();
}