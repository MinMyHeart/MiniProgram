'use strict';
((function(){
    const minIndex = function(arr,min){
    	for(let i in arr){
    		if(arr[i] === min){
    			return i;
    		}
    	}
    } 
   	// xhr.open('GET', 'http://kuoteo.com/api/picture/get',false);
    // xhr.send(null);
    // const imgAr = JSON.parse(xhr.responseText)
    const WaterFall = function(mID,W){
        this.imgArr = ["images/1.jpg","images/2.jpeg","images/3.jpg","images/4.png","images/5.jpeg","images/6.png","images/7.jpeg"];	
        // for(let i =0;i<imgAr.length;i++){
        //     this.imgArr[i] = imgAr[i].url;
        // }//JSON.parse(xhr.responseText)[0].url 
    	this.$main = $(mID);
    	this.columnCount = Math.floor( W / 155 );
    	this.loadCrindex = 0;
    	this.renderCrIndex = 0;
    	this.wraL = [];
    	this.wraHL = [];  
    	this.pre=0;  	
    }

    WaterFall.prototype.addElements = function(){
		var imgWrapper = document.createElement('div');
    	imgWrapper.className = 'imgWrapper';
    	imgWrapper.style.opacity = 0;		
    	this.$main.appendChild(imgWrapper);
    	this.wraL.push(imgWrapper);
		var imgItem = document.createElement('div');
		imgItem.className = 'imgItem';
		imgWrapper.appendChild(imgItem);
			
		var navigateBtn = document.createElement('a');
		navigateBtn.className = 'navigate-btn';
		navigateBtn.href = '../photoDetail/photoDetail.html#' + this.loadCrindex;
		imgItem.appendChild(navigateBtn);	

		var img = document.createElement('img');
		img.className = 'imggg';
		img.width = 155;
		img.src = this.imgArr[this.loadCrindex];
		navigateBtn.appendChild(img);
		this.loadCrindex++;
	}

    WaterFall.prototype.falling = function(){
	-	for(;this.renderCrIndex<this.wraL.length;this.renderCrIndex){
			if(this.renderCrIndex < this.columnCount){
				this.wraL[this.renderCrIndex].style.left = this.pre + 'px';
				this.wraL[this.renderCrIndex].style.top = '0px';	
				this.wraHL.push(this.wraL[this.renderCrIndex].offsetHeight);
				this.pre =  this.wraL[this.renderCrIndex].offsetWidth + this.pre;
			}else{
				console.log(this.wraHL);
				var minH = Math.min.apply(null,this.wraHL);
				var mIndex = minIndex(this.wraHL,minH);
				console.log(minH);
				console.log("mindex:" + mIndex);
				this.wraL[this.renderCrIndex].style.left = this.wraL[mIndex].style.left;
				this.wraL[this.renderCrIndex].style.top = minH + 'px';
				this.wraHL[mIndex] += this.wraL[this.renderCrIndex].offsetHeight; 
			}
		    qs('.imgWrapper')[this.renderCrIndex].style.opacity = 1;   
		    this.renderCrIndex++;
		}
    }
    WaterFall.prototype.isLoadingImgNeeded = function(){
    	const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

		return (scrollTop >= (this.wraL[this.wraL.length-1].offsetHeight)/2) ? true : false;
	}

    WaterFall.prototype.loadingReadering = function($main){
    	const self = this;
    	for(let i=0;i<self.columnCount*5;i++){
     		this.addElements();
     		gt('img')[this.renderCrIndex].onload = function(){  			
     			self.falling();
     		}
     	}
         this.$main.style.width = this.columnCount*this.wraL[0].offsetWidth+ 'px';
	    window.addEventListener('scroll',function(){  
	    	if(self.renderCrIndex < self.imgArr.length){
	    		if(self.isLoadingImgNeeded()){
			    	self.addElements();
		     		gt('img')[self.renderCrIndex].onload = function(){
		     			self.falling();
		     		}
		     	}
	     	}else
	     		return;
	    });
	     	
   }
   const wtf = new WaterFall('main',screen.width);

   wtf.loadingReadering(wtf.$main);
})());	