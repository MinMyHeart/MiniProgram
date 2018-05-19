	const xhr = (()=>{
		if(window.XMLHttpRequest)
			return new XMLHttpRequest();
		else if(window.ActiveXObject)
			return new ActiveXObject();
		else 
			console.log("Error in getting XHR!");
	})();
	const WIDTH = screen.width,
	      HEIGHT = screen.height,
	   	  INITIAL_WIDTH = 375;

    const $ = function(id){
    	return document.getElementById(id);
    }

    const gt = function(tagName){
    	return document.getElementsByTagName(tagName);
    }
    const qs = function(className){
        return document.querySelectorAll(className);
    }
    const AdapteScreen = function(W){
    	const html = gt('html')[0];
    	html.style.fontSize = (  W/INITIAL_WIDTH * parseInt(html.style.fontSize.slice(0,2)) ) + 'px' ;
    	console.log(html.style.fontSize);
    }	
    AdapteScreen(WIDTH);


