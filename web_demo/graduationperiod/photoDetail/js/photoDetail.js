((function(){
	//存储触碰事件
	const TouchEvents = function(){
		//startX，Y 存储touchstart开始的坐标
		this.startX =0;
		this.startY=0 ;
		//changeSartX与changeX实现滑动
		this.changeStartX = 0;
		this.changeX = 0;

		this.changeY = 0;
		this.startTime = 0;
		this.endTime = 0;
		this.onlyOneAnimation = true;
//		this.animationFlag = true;
	}
	const te = new TouchEvents();
	/* Swiper 
	 * ct  = contianer,crIndex = 当前居中的图片索引,imgL = 请求的所有图片路径数组
	 * ft = footer*/
	const Swiper = function(){
		this.imgL = ["images/1.jpg","images/2.jpeg","images/3.jpg","images/4.png","images/5.jpeg","images/6.png","images/7.jpeg"];	
		this.ct = $('container');
		//判定图片是否滑动到下一张
		this.ct.startOffsetLeft = 0;

		this.ct.crIndex = 0;
		this.ct.animationFlag= true;
		this.ct.style.left = -24 + 'px';
		this.fW = screen.width;		
		this.ft = $('footer');
		this.ft.style.left = 0;
		this.imgML= [];
		this.imgFL = [];
		this.aML = [];
		this.startLeft = -24;
		this.ft.lastIndex = 0;
		//this.ft.flag 废弃
		this.ft.flag = {
			left: 0,
			right : 187.5
		};

		this.ft.animationFlag = true;
		/* initialize 初始化页面
		 * 向页面插入图片
		 * 初始化this.imgML,this.imgFL*/
		this.initialize = ()=>{
			this.ct.style.width = this.imgL.length*(this.fW+48) + 'px';
			this.ft.style.width = this.imgL.length*(45 + 9.6) + 'px';
			this.ft.flag.left = (-this.ft.offsetWidth) + this.fW/2;
			for(let i =0;i<this.imgL.length;i++){
				var img = document.createElement('img');
				img.width = this.fW;
				img.className = 'm-imggg';
				img.setAttribute("index",i);
				img.src = this.imgL[i];
				this.ct.appendChild(img);
				this.imgML.push(img);
				var imgg = document.createElement('img');
				imgg.width = 26;
				imgg.className = 'f-imggg';
				imgg.setAttribute("index",i);
				imgg.src =this.imgL[i];
				this.ft.appendChild(imgg);
				this.imgFL.push(imgg);
			}
			console.log(this.ct.offsetWidth)
		this.ft.style.marginTop = this.ct.offsetHeight + parseInt(this.ft.style.marginTop )+'px';				
		}
		console.log(this.ct.offsetHeight);
		this.commonAnimationFlag = true;
	}
	Swiper.prototype.shake =function(){
		console.log('shake');
	}
	
	Swiper.prototype.touchstartHandler = function(e){
		te.startTime = Math.floor((new Date().getTime())/1000);
		te.startX = e.targetTouches[0].pageX;
		te.startY = e.targetTouches[0].pageY;
		te.changeStartX = te.startX;
		sp.ct.startOffsetLeft = sp.ct.offsetLeft;
	}
	Swiper.prototype.touchmoveHandler = function(e){
		te.endTime = new Date().getTime()/1000;
		te.changeX = e.targetTouches[0].pageX;		
		const offsetTime = te.endTime - te.startTime,
		      offsetX = te.changeX - te.startX,
		      perTimeCTOffsetX = sp.ct.offsetLeft + te.changeX - te.changeStartX,
		      perTimeFTOffsetX = sp.ft.offsetLeft + te.changeX - te.changeStartX;		
		if(offsetX ===0) return;
		if(e.currentTarget.id ==='container'){
			if(offsetX >0){
				if(sp.ct.crIndex === 0){
					sp.shake('next');
				}else{
					sp.ct.style.left = perTimeCTOffsetX +'px';
				}
			}
			else if(offsetX < 0){
				if(sp.ct.crIndex === (sp.imgL.length)-1){
					sp.shake('pre');
				}else{
					sp.ct.style.left = perTimeCTOffsetX + 'px';
				}
			}
		}else if(e.currentTarget.id === 'footer'){
			const left = parseInt(sp.ft.style.left.slice(0,sp.ft.style.left.length-2));
			if(offsetX > 0){
				if(left >= sp.ft.flag.right){
				 	sp.shake('pre');
				}
				else{
					sp.ft.style.left = perTimeFTOffsetX+  'px';
				}
			}else if(offsetX <0){
				if(left <= sp.ft.flag.left){
					sp.shake('next');
				}else{
					sp.ft.style.left = perTimeFTOffsetX+  'px';
				}

			}
		}
		//实现手指滑动图片：跟随手指速度
		te.changeStartX = te.changeX;
	}
	Swiper.prototype.moveAnimation = function(mDirection,fDirection,mEndFlag,fEndFlag,vCoefficient){
		if(!this.ct.animationFlag || !this.ft.animationFlag) return;		
		this.ct.animationFlag = false;
		this.ft.animationFlag = false;
		te.onlyOneAnimation = false;		
		const mV = (mDirection==='next'?-10:10)*vCoefficient,
		      fV = fDirection=== 'next'?5:-5;
		var SS = 0;
		const mTimer = setInterval(()=>{
			this.ct.style.left = mV + parseInt(this.ct.style.left) + 'px';
			if(mV<0){
				if(this.ct.offsetLeft <=mEndFlag){
					this.ct.style.left = mEndFlag + 'px';
					this.ct.animationFlag= true;
					clearInterval(mTimer);
				}			
			}else if(mV>0){
				if(this.ct.offsetLeft >=mEndFlag){
					this.ct.style.left = mEndFlag + 'px';
					this.ct.animationFlag= true;					
					clearInterval(mTimer);
				}
			}
		},10);
		const fTimer = setInterval(()=>{
			this.ft.style.left  = fV + parseInt(this.ft.style.left) + 'px';
			console.log('ss'+SS);
			console.log('flag'+fEndFlag);
			console.log('');
			SS+= fV;
			 // debugger;
			/* Move to right */
			if(fV>0){
				if(SS >= fEndFlag){
					this.ft.animationFlag = true;
					clearInterval(fTimer);
				} 
			/*Move to left*/
			}else if(fV<0){
				if(SS <= fEndFlag){
					this.ft.animationFlag = true;
					clearInterval(fTimer);
				}	
			}
		},10);
		te.onlyOneAnimation = (this.ct.animationFlag && this.ft.animationFlag)?true:false;
	}
	Swiper.prototype.nomoveAnimation = function(mDirection,endFlag){
		if(!this.ct.animationFlag) return;
		this.ct.animationFlag = false;
		const V = (mDirection==='toPreStart')?1:-1;
		var mTimer = setInterval(()=>{
			this.ct.style.left = V+ parseInt(this.ct.style.left) + 'px';
			if(V<0){
				if(this.ct.offsetLeft <= endFlag){
					this.ct.style.left = endFlag + 'px';
					this.ct.animationFlag = true;					
					clearInterval(mTimer);					
				}	
			}else if(V>0){
				if(this.ct.offsetLeft >=endFlag){				
					this.ct.style.left = endFlag + 'px';
					this.ct.animationFlag = true;						
					clearInterval(mTimer);
				}
			}
		},1);
	}
	Swiper.prototype.touchendHandler = function(e){
		te.endTime = new Date().getTime()/1000;
		const offsetTime = te.endTime - te.startTime,		
		      offsetX = e.changedTouches[0].pageX - te.startX,
		      offsetY = e.changedTouches[0].pageY - te.startY,
		      isMoveToRight = (sp.ct.offsetLeft - sp.ct.startOffsetLeft)<(-sp.fW/3) || (offsetX/offsetTime<-100)?true:false,
		      isMoveToLeft = (sp.ct.offsetLeft - sp.ct.startOffsetLeft)>(sp.fW/3) || (offsetX/offsetTime>100)?true:false,
		      isTap = ((offsetX === 0 && offsetY === 0) && (Math.floor(offsetTime)===0))?true:false;
		      console.log(offsetX/offsetTime);
		if(e.currentTarget.id === 'container'){	
			if(isMoveToRight){
				if(sp.ct.crIndex === sp.imgFL.length-1) return;
					const mEndFlag = sp.startLeft - sp.fW - 48,
						  index = sp.ct.crIndex+1,
				          fEndFlag  = (sp.fW/2-sp.imgFL[0].offsetWidth) - (sp.imgFL[index].offsetLeft + sp.ft.offsetLeft);	
					sp.ct.crIndex++;		          		      
					for(let i = 0;i<sp.imgL.length;i++){
						if(parseInt(sp.imgFL[i].getAttribute('index')) == sp.ct.crIndex){
							sp.imgFL[i].width = 45 ;
							break;
						}
					}
					sp.imgFL[sp.ft.lastIndex].width = 26;						
					sp.moveAnimation('next','pre',mEndFlag,fEndFlag,1);	
					sp.startLeft = sp.startLeft - sp.fW - 48;	
					sp.ft.lastIndex = sp.ct.crIndex;																												
			}else if(isMoveToLeft){
				if(sp.ct.crIndex ===0) return;
					const mEndFlag = sp.startLeft + sp.fW +48,
						  index = sp.ct.crIndex-1,
				    	  fEndFlag  = (sp.fW/2-sp.imgFL[0].offsetWidth) - (sp.imgFL[index].offsetLeft + sp.ft.offsetLeft);
					sp.ct.crIndex--;				    	  
					for(let i = 0;i<sp.imgL.length;i++){
						if(parseInt(sp.imgFL[i].getAttribute('index')) == sp.ct.crIndex){
							sp.imgFL[i].width = 45 ;
							break;
						}
					}	
					//buxiezhushilefanzao
					sp.imgFL[sp.ft.lastIndex].width = 26;	
					sp.moveAnimation('pre','next',mEndFlag,fEndFlag,1);
					sp.ft.lastIndex = sp.ct.crIndex;					      						
					sp.startLeft +=  sp.fW + 48;														
			}else if(!isMoveToRight){
				const endFlag = sp.startLeft;
				sp.nomoveAnimation('toPreStart',endFlag);
			}else if(!isMoveToLeft){
				const endFlag = sp.startLeft;				
				sp.nomoveAnimation('toNextStart',endFlag);
			}
		}else if(e.currentTarget.id === 'footer'){
			const index = parseInt(e.target.getAttribute('index'));			
			if(e.target.id === 'footer'||index === sp.ft.lastIndex || !sp.ft.animationFlag)
				return;
			if(isTap){
				const mDirection = index>sp.ft.lastIndex?'next':'pre',
				      fEndFlag  = (sp.fW/2-sp.imgFL[0].offsetWidth) - (sp.imgFL[index].offsetLeft + sp.ft.offsetLeft),
					  mEndFlag = -((index)*(sp.fW+48)+24),
					  vCoefficient = (index-sp.ft.lastIndex)===0?1:Math.abs(index-sp.ft.lastIndex);	
				sp.moveAnimation(mDirection,mDirection,mEndFlag,fEndFlag,vCoefficient); 
				e.target.width = 45;
				sp.imgFL[sp.ft.lastIndex].width = 26;
				sp.ft.lastIndex = index;
			}			
		}
		te.changeStartX=0;
	}
	Swiper.prototype.onswip = function(){
		this.ct.addEventListener('touchstart',this.touchstartHandler);
		this.ct.addEventListener('touchmove',this.touchmoveHandler);
		this.ct.addEventListener('touchend',this.touchendHandler);

		this.ft.addEventListener('touchstart',this.touchstartHandler);
		this.ft.addEventListener('touchmove',this.touchmoveHandler);
		this.ft.addEventListener('touchend',this.touchendHandler);
		this.ft.addEventListener('click',this.click);
	}
	const Introduction = function(){
		this.itrn = $('introduction');
	}
	Introduction.prototype.touchstartHandler = function(e){
		te.startY = e.targetTouches[0].pageY;
	}
	Introduction.prototype.touchendHandler = function(e){
		if(!te.onlyOneAnimation) return;
		if(e.changedTouches[0].pageY - te.startY <-50){
			intrn.itrn.className = 'introduction-display';
			sp.ct.className = 'container-activated';
		}
		else if(e.changedTouches[0].pageY - te.startY >50){
			intrn.itrn.className = 'introduction-hidden';
			sp.ct.className = 'container-normal';
		}
	}
	Introduction.prototype.toggle = function(){
		const html = gt('html')[0];
		html.addEventListener('touchstart',this.touchstartHandler);
		html.addEventListener('touchend',this.touchendHandler);		
	}

	const sp = new Swiper();
	sp.initialize();
	sp.onswip();
	const intrn = new Introduction();
	intrn.toggle();
})())