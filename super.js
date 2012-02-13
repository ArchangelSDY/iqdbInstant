var iqdbInstant = function () {
	var MIN_WEIGHT = 100;
	var MIN_HEIGHT = 100;

	var self = {};

	self.enabled = true;

	var wrapper = null; 

	var showToolbar = function () {
		if (wrapper === null) {
			img = window.event ? window.event.srcElement : this;
			var parent = img.parentNode;
		    
		    //Create wrapper div.
		    var divWrapper = document.createElement("div");
		    divWrapper.style.position = "relative";
		    parent.appendChild(divWrapper);
		    
		    //Move image to the wrapper div.
		    divWrapper.appendChild(parent.removeChild(img));
		    
		    //Add toolbar.
		    toolbar = createToolbar(img);
		    divWrapper.appendChild(toolbar);

		    wrapper = divWrapper;
		}
	};

	var hideToolbar = function () {
		img = window.event ? window.event.srcElement : this;
		
		//remove the event listener
		img.removeEventListener("mouseover", showToolbar, false);
		img.removeEventListener("mouseout", hideToolbar, false);

		//remove the toolbar
		divWrapper = wrapper;
		divWrapper.parentNode.appendChild(divWrapper.removeChild(img));
		divWrapper.parentNode.removeChild(divWrapper);
		wrapper = null;
	};


	self.initialize = function () {
		var imgs = document.getElementsByTagName("img");
		for (var i=0; i<imgs.length; i++) {
			try {
				//Only apply for images larger than the limit.
				var img = new Image();
				img.src = imgs[i].src;
				if (img.width >= MIN_WEIGHT && img.height >= MIN_HEIGHT) {
				    if (imgs[i].addEventListener) {
				    	//alert(233);
				    	imgs[i].addEventListener("mouseover", showToolbar, false);
				    } else if (imgs[i].attachEvent) {
				    	imgs[i].attachEvent("onmouseover", showToolbar);
				    }
				    if (imgs[i].addEventListener) {
				    	imgs[i].addEventListener("mouseout", hideToolbar, false);
				    } else if (imgs[i].attachEvent) {
				    	imgs[i].attachEvent("onmouseout", hideToolbar);
				    }
		    	}
			} catch (err) {
				alert(err);
			}
		}
		alert("imageInstant is ready.");
	};

	var createToolbar = function (img) {
	    var toolbar = document.createElement("ul");
	    toolbar.style.margin = img.style.margin;
	    toolbar.style.padding = "0px";
	    toolbar.style.position = "absolute";
	    toolbar.style.top = "0px";
	    toolbar.style.left = "0px";
	    toolbar.style.backgroundColor = "black";
	    toolbar.style.listStyleType = "none";


	   	toolbar.onmouseover = function () {
	   		toolbar.style.opacity = 0.8;
	   	};
	   	toolbar.onmouseout = function () {
	   		toolbar.style.opacity = 0;
	   	};

	    for (engine in searchEngines) {
			var engineLi = document.createElement("li");
		    engineLi.style.display = "block";
		    engineLi.style.margin = "0px";
		    engineLi.style.padding = "0px";

		    var engineAnchor = document.createElement("a");
		    engineAnchor.style.color = "white";
		    engineAnchor.style.textDecoration = "none";
		   	engineAnchor.style.margin = "5px";
		    engineAnchor.href = "javascript:void(0); ";
		    engineAnchor.innerHTML = engine;	//Set name.
		    engineAnchor.onclick = function (href, searchEngine) {
		    	return function () {
		    		searchEngine(href);
		    	};
		    }(img.href, searchEngines[engine]);
		    engineLi.appendChild(engineAnchor);

		    toolbar.appendChild(engineLi);
	    }

	    return toolbar;
	};

	var searchEngines = [];

	searchEngines['iqdb'] = function (url) {
		var form = document.createElement("form");
		form.action = "http://iqdb.org/";
		form.method = "post";
		form.enctype = "multipart/form-data";
		form.target = "_blank";

		var txtUrl = document.createElement("input");
		txtUrl.type = "hidden";
		txtUrl.name = "url";
		txtUrl.value = url;
		form.appendChild(txtUrl);
		
		document.body.appendChild(form);
		form.submit();
	};

	searchEngines['sauceNAO'] = function (url) {
		var form = document.createElement("form");
		form.action = "http://saucenao.com/search.php";
		form.method = "post";
		form.enctype = "multipart/form-data";
		form.target = "_blank";

		var txtUrl = document.createElement("input");
		txtUrl.type = "hidden";
		txtUrl.name = "url";
		txtUrl.value = url;
		form.appendChild(txtUrl);
		
		var checkbox = document.createElement("input");
		checkbox.type = "hidden";
		checkbox.name = "urlify";
		checkbox.value = "true";
		form.appendChild(checkbox);

		document.body.appendChild(form);
		form.submit();
	};

	searchEngines['Google'] = function (url) {
		var form = document.createElement("form");
		form.action = "http://www.google.com/searchbyimage";
		form.method = "GET";
		form.enctype = "multipart/form-data";
		form.target = "_blank";

		var txtUrl = document.createElement("input");
		txtUrl.type = "hidden";
		txtUrl.name = "image_url";
		txtUrl.value = url;
		form.appendChild(txtUrl);

		document.body.appendChild(form);
		form.submit();	
	};

	return self;
}();

iqdbInstant.initialize();