if (typeof imageInstant === 'undefined') {
	var imageInstant = function () {
		var MIN_WEIGHT = 100;
		var MIN_HEIGHT = 100;
		var TOOLBAR_CLASSNAME = 'imageInstant';
		var TOOLBAR_OPACITY = '0.8';

		var self = {};

		self.enabled = true;

		var wrapper = null;
		var toolbarMap = [];

		var getComputedStyle = function (element) {
			if (window.getComputedStyle) {
				return window.getComputedStyle(element);
			} else if (element.currentStyle) {
				return element.currentStyle;
			} else {
				return null;
			}
		};

		var addEventListener = function (element, e, handler) {
		    if (element.addEventListener) {
		    	element.addEventListener(e, handler, false);
		    } else if (element.attachEvent) {
		    	element.attachEvent('on' + e, handler);
		    } else {
		    	element.setAttribute('on' + e, handler);
		    }
		};

		var getToolbarOf = function (img) {
			for (var i = toolbarMap.length - 1; i >= 0; i--) {
				if (toolbarMap[i].img.isEqualNode(img)){
					return toolbarMap[i].toolbar;
				}
			}
			return null;
		};

		var showToolbar = function () {
			var img = window.event ? window.event.srcElement : this;
			var parent = img.parentNode;
			
			//Search for the toolbar
			var toolbar = getToolbarOf(img);

			if (toolbar === null) {
			    //Create wrapper div.
			    var divWrapper = document.createElement('div');
			    divWrapper.style.position = 'relative';
			    
			    //Move image to the wrapper div.
			    var imgNew = img.cloneNode(true);
			    //Add event listeners to the new img element.
			    addEventListener(imgNew, 'mouseover', showToolbar);
			    addEventListener(imgNew, 'mouseout', hideToolbar);
			    divWrapper.appendChild(imgNew);	//To avoid to be removed by replaceChild().
			    parent.replaceChild(divWrapper, img);	//Use replaceChild() to keep the previous order.
			    
			    //Add toolbar.
			    toolbar = createToolbar(imgNew);
			    toolbarMap.push({
			    	'img': imgNew,
			    	'toolbar': toolbar
			    });
			    divWrapper.appendChild(toolbar);

			    wrapper = divWrapper;
			} else {
				toolbar.style.opacity = TOOLBAR_OPACITY;
			}
		};

		var hideToolbar = function () {
			var img = window.event ? window.event.srcElement : this;
				
			var toolbar = getToolbarOf(img);

			if (toolbar !== null) {
				toolbar.style.opacity = 0;
			}
		};


		self.initialize = function () {
			if (self.enabled) {
				var imgs = document.getElementsByTagName('img');
				for (var i = imgs.length - 1; i >= 0; i--) {
					try {
						//Only apply for images larger than the limit.
						var img = new Image();
						img.src = imgs[i].src;
						if (img.width >= MIN_WEIGHT && img.height >= MIN_HEIGHT) {
						    addEventListener(imgs[i], 'mouseover', showToolbar);
						    addEventListener(imgs[i], 'mouseout', hideToolbar);
				    	}
					} catch (err) {
						alert(err);
					}
				}
				alert('imageInstant is ready.');
			} else {
				var imgs = document.getElementsByTagName('img');
				for (var i = imgs.length - 1; i >= 0; i--) {
					//remove the event listener
					imgs[i].removeEventListener('mouseover', showToolbar, false);
					imgs[i].removeEventListener('mouseout', hideToolbar, false);
				}
				for (var i = toolbarMap.length - 1; i >= 0; i--) {
					//remove the toolbar
					var divWrapper = toolbarMap[i].img.parentNode;
					divWrapper.parentNode.replaceChild(toolbarMap[i].img, divWrapper);
				}
				toolbarMap.splice(0, toolbarMap.length);
				alert('imageInstant is unloaded.');
			}
		};

		var createToolbar = function (img) {
		    var toolbar = document.createElement('ul');
		    toolbar.className = TOOLBAR_CLASSNAME;
		    toolbar.style.position = 'absolute';
		    toolbar.style.padding = '0px';
		    toolbar.style.marginTop = getComputedStyle(img, null).marginTop;
		    toolbar.style.marginLeft = getComputedStyle(img, null).marginLeft;
		    toolbar.style.top = '0px';
		    toolbar.style.left = '0px';
		    toolbar.style.backgroundColor = 'black';
		    toolbar.style.listStyleType = 'none';
		    toolbar.style.opacity = TOOLBAR_OPACITY;

		   	toolbar.onmouseover = function () {
		   		toolbar.style.opacity = TOOLBAR_OPACITY;
		   	};
		   	toolbar.onmouseout = function () {
		   		toolbar.style.opacity = 0;
		   	};

		    for (engine in searchEngines) {
				var engineLi = document.createElement('li');
			    engineLi.style.display = 'block';
			    engineLi.style.margin = '0px';
			    engineLi.style.padding = '0px';

			    var engineAnchor = document.createElement('a');
			    engineAnchor.style.color = 'white';
			    engineAnchor.style.textDecoration = 'none';
			   	engineAnchor.style.margin = '5px';
			    engineAnchor.href = 'javascript:void(0); ';
			    engineAnchor.innerHTML = engine;	//Set name.
			    engineAnchor.onclick = function (href, searchEngine) {
			    	return function () {
			    		searchEngine(href);
			    	};
			    }(img.src, searchEngines[engine]);
			    engineLi.appendChild(engineAnchor);

			    toolbar.appendChild(engineLi);
		    }

		    return toolbar;
		};

		var searchEngines = [];

		searchEngines['iqdb'] = function (url) {
			var form = document.createElement('form');
			form.action = 'http://iqdb.org/';
			form.method = 'post';
			form.enctype = 'multipart/form-data';
			form.target = '_blank';

			var txtUrl = document.createElement('input');
			txtUrl.type = 'hidden';
			txtUrl.name = 'url';
			txtUrl.value = url;
			form.appendChild(txtUrl);
			
			document.body.appendChild(form);
			form.submit();
		};

		searchEngines['sauceNAO'] = function (url) {
			var form = document.createElement('form');
			form.action = 'http://saucenao.com/search.php';
			form.method = 'post';
			form.enctype = 'multipart/form-data';
			form.target = '_blank';

			var txtUrl = document.createElement('input');
			txtUrl.type = 'hidden';
			txtUrl.name = 'url';
			txtUrl.value = url;
			form.appendChild(txtUrl);
			
			var checkbox = document.createElement('input');
			checkbox.type = 'hidden';
			checkbox.name = 'urlify';
			checkbox.value = 'true';
			form.appendChild(checkbox);

			document.body.appendChild(form);
			form.submit();
		};

		searchEngines['Google'] = function (url) {
			var form = document.createElement('form');
			form.action = 'http://www.google.com/searchbyimage';
			form.method = 'GET';
			form.enctype = 'multipart/form-data';
			form.target = '_blank';

			var txtUrl = document.createElement('input');
			txtUrl.type = 'hidden';
			txtUrl.name = 'image_url';
			txtUrl.value = url;
			form.appendChild(txtUrl);

			document.body.appendChild(form);
			form.submit();	
		};

		return self;
	}();
} else {
	imageInstant.enabled = !imageInstant.enabled;
}

imageInstant.initialize();