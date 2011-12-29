if(divInstant!=null){
	//already running
	for(var i=0;i<divInstant.length;i++){
		var divImg=divInstant[i];
		var img=divImg.childNodes[0];

		//remove the event listener
		img.removeEventListener("mouseover",showToolbar,false);
		img.removeEventListener("mouseout",hideToolbar,false);

		//remove the toolbar
		divImg.parentNode.appendChild(divImg.removeChild(img));
		divImg.parentNode.removeChild(divImg);
	}
	divInstant=null;
	alert("imageInstant is unloaded.")
}else{
	//initialize
	var divInstant=new Array();

	var showToolbar=function(){
		var toolbar=this.parentNode.lastChild;
		while(toolbar.nodeType!=1){
			toolbar=toolbar.previousSibling;
		}
		toolbar.style.opacity="0.8";
	};

	var hideToolbar=function(){
		var toolbar=this.parentNode.lastChild;
		while(toolbar.nodeType!=1){
			toolbar=toolbar.previousSibling;
		}
		toolbar.style.opacity="0";
	};

	var imgs=document.getElementsByTagName("img");
	for(var i=0;i<imgs.length;i++){
		try{
			//only apply for images larger than 100x100px
			var img=new Image();
			img.src=imgs[i].src;
			if(img.width>=100 && img.height>=100){
	        	createToolbar(imgs[i]);
	    	}
		}catch(err){
			alert(err);
		}
	}
	alert("imageInstant is ready.");
}

function createToolbar(img){
	var parent=img.parentNode;
	var imgSrc=img.src;
	var id=divInstant.length;
    
    var divImg=document.createElement("div");
    divImg.style.position="relative";
    parent.appendChild(divImg);
    
    divImg.appendChild(parent.removeChild(img));
    
    var toolbar=document.createElement("ul");
    toolbar.setAttribute("style","margin: 0px;padding: 0px;position: absolute;top: 0px;left: 0px;background-color: black;opacity: 0;list-style-type: none;");

    toolbar.appendChild(createSearchEngine("iqdb","iqdbSearch('"+imgSrc+"');",id));
    toolbar.appendChild(createSearchEngine("sauceNAO","sauceNAOSearch('"+imgSrc+"');",id));
    toolbar.appendChild(createSearchEngine("Google","googleSearch('"+imgSrc+"');",id));
    toolbar.appendChild(createSearchEngine("TinEye","tineyeSearch('"+imgSrc+"');",id));
    toolbar.appendChild(createSearchEngine("Baidu","baiduSearch('"+imgSrc+"');",id));
    divImg.appendChild(toolbar);

    divInstant.push(divImg);

    if(img.addEventListener){
    	img.addEventListener("mouseover",showToolbar,false);
    }else if(img.attachEvent){
    	img.attachEvent("onclick",showToolbar);
    }
    if(img.addEventListener){
    	img.addEventListener("mouseout",hideToolbar,false);
    }else if(img.attachEvent){
    	img.attachEvent("onmouseout",hideToolbar);
    }
   	toolbar.setAttribute("onmouseover","this.style.opacity=0.8;");
   	toolbar.setAttribute("onmouseout","this.style.opacity=0;");
}

function createSearchEngine(name,searchEngine,id){
    var engineLi=document.createElement("li");
    engineLi.setAttribute("style","display: block;margin: 0px;padding: 0px;");
    var engineAnchor=document.createElement("a");
    engineAnchor.setAttribute("style","color: white;text-decoration: none;margin: 5px;")   
    engineAnchor.href="javascript:void(0);";
    engineAnchor.setAttribute("onclick",searchEngine);
    engineAnchor.innerHTML=name;
    engineLi.appendChild(engineAnchor);
    return engineLi;
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