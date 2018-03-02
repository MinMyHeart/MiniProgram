(function(){
	var ContentBar = function(ele){
		this.elId = ele || 'sideBarItemsWrap';
		this.el = $(this.elId);
		// this.el.addEventListener('click',function(event){
		// 	event.stopPropagation();
		// });
		this.state = 'allCloesed';
		this.used = 'active';

		this.activeEl = null;
		this.activeEntry = null;

		var self = this;
		var sideBarItemList = document.querySelectorAll('#' + this.elId +'>ul>li');	//少了大于号，且应作为参数传进。	
		forEach = Array.prototype.forEach;
		// console.log(sideBarItemList);
		forEach.call(sideBarItemList,function(sideBarItem){		
			sideBarItem.addEventListener('click',function(event){//数组当前的元素
				if (event.currentTarget === self.activeEntry) {return;};  
				var curItemContent = $(event.currentTarget.id + 'Content');
				var curCloseBtn = $(event.currentTarget.getAttribute('contentId'));
				self.activeEntry =event.currentTarget;	
				console.log(event.currentTarget.getAttribute('contentId'));
				//通过给li标签自定义属性，从而将标签与对应的closeBtn绑定，虽然限制死，但也不失为一种办法
				//但是由于只有点击了sidebarItem之后才有对应的closebtn的id，所以这种办法行不通 sad
				if(self.used !== 'ban'){
					console.log(self.used);
					if (self.state === 'allCloesed') {
						curItemContent.classList.add('item-content-showed');
						self.state = 'isOpened';
						self.activeEl = curItemContent;	
						console.log(1);
					}else{
						if(self.activeEl!==null){
							self.activeEl.className = 'item-content-hidden';
							curItemContent.classList.add('item-content-showed');	
							self.activeEl = curItemContent;//设法给content的closebtn使用
						}	
					}		
				}
			})
		});
		//														.item-content>.item-content-closeBtn应该作为参数传进。
		var sideBarItemContentList = document.querySelectorAll('.item-content>.item-content-closeBtn');
		console.log(this);//这里由于还未赋值，this.activeEL为null；
		forEach.call(sideBarItemContentList,function(closeBtn){
			closeBtn.addEventListener('click',function(event){
				self.activeEntry = null;	
				var activeEl = event.currentTarget.parentNode;
				activeEl.className = 'item-content-hidden';
			});
		});
	};
	ContentBar.prototype.close = function(){//这里便能用this了
		this.activeEl.className = 'item-content-hidden';
		this.state = "allCloesed";		
	}
	ContentBar.prototype.open=function(){
		contentBar.used = 'active';
		contentBar.activeEntry = null;
	}	
	var contentBar = new ContentBar();


	var SideBar = function(ele,closeEle){
		this.elId = ele || 'sideBar' ;
		this.el = $(this.elId);
		this.switchBtnElId = closeEle || 'switchBtn';
		this.switchBtnEl = $(this.switchBtnElId);
		this.state = 'opened';
		var self = this;
		this.el.addEventListener("click",function(event){
			if (event.target === self.switchBtnEl) {
				self.doSwitch();
			};
		})
	}
	SideBar.prototype.doSwitch = function(){
		if(this.state === 'opened'){
			this.toClosed();
		}else{
			this.toOpened();
		}
	}
	SideBar.prototype.toClosed = function(){
		this.state = 'closed';
		this.el.className = 'sideBar-hidden';
		this.switchBtnEl.className = 'sideBar-switchBtn-opened';
		contentBar.used = "ban";
		if(contentBar.activeEl !== null){contentBar.close();}//加判断
	}
	SideBar.prototype.toOpened = function(){//要设置setimeout执行this.state = 'opened' ，否则 重复点击按钮将会出现反复出现的bug。判断动画是否完成，让settimeout时间与动画时间相等。
		this.state = "opened";				//同理toclosed也一样 ，但是我懒，就不设置了。如果通过js实现动画的话，便可以用一个变量保存动画完成状态。
		console.log(contentBar.used);	
		this.el.className = 'sideBar-showed';
		this.switchBtnEl.className = 'sideBar-switchBtn-closed';
		contentBar.open();			
	}	
	var sidebar = new SideBar();
}());
(function(){

}());
function $(id){return document.getElementById(id);}	