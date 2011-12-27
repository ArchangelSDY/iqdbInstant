var imgs=document.getElementsByTagName("img");
for(var i=0;i<imgs.length;i++){
	try{
		var parent=imgs[i].parentNode;

		var formIqdb=document.createElement("form");
		formIqdb.id="formIqdb"+Math.floor(Math.random()*10000);
		formIqdb.action="http://saucenao.com/search.php";
		formIqdb.method="post";
		formIqdb.enctype="multipart/form-data";
		formIqdb.target="_blank";

		var txtUrl=document.createElement("input");
		txtUrl.type="hidden";
		txtUrl.name="url";
		txtUrl.value=imgs[i].src;
		formIqdb.appendChild(txtUrl);
		
		var checkbox=document.createElement("input");
		checkbox.type="hidden";
		checkbox.name="urlify";
		checkbox.value="true";
		formIqdb.appendChild(checkbox);

        imgs[i].setAttribute("onclick","javascript: document.getElementById(\""+formIqdb.id+"\").submit();");
        imgs[i].setAttribute("onmouseover","javascript:this.style.opacity=0.5;");
		imgs[i].setAttribute("onmouseout","javascript:this.style.opacity=1;");
		parent.appendChild(formIqdb);
	}catch(err){
		alert(err);
	}
}
alert("Click on an image to search on SauceNAO.com.");