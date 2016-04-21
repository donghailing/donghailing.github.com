// JavaScript Document


var	meituan={
		public:{
			/*回到顶部*/	toUp:function (obj){
								var timer=null;
								var userScroll=false;
								$(window).scroll(function (){
										var scrollTop=$(document).scrollTop();
										obj.hide();
										(scrollTop>0)&&(obj.parent().parent().show());
										(scrollTop>200)&&(obj.show());
										if(userScroll)
										{
											clearInterval(timer);
										}
										userScroll=true;
									});
								obj.click(function (){
									var start=$(document).scrollTop();
									var dis=0-start;
									var n=0; 
									var cont=Math.floor(1000/30);
									
									clearInterval(timer);
									timer=setInterval(function (){
										userScroll=false;
										n++;
										
										var cur=start+dis*n/cont;
										document.body.scrollTop=cur;
										document.documentElement.scrollTop=cur;
										
										if(n==cont)
										{
											clearInterval(timer);
										}
									},30);
								});
							}	,
			/*移入下拉*/dropdDown:function (obj){
								var aLi=obj;
								var zIndex=1;
								
								aLi.each(function (index){
									zIndex++;
										(function (i){
											var oDiv=aLi.eq(index).children().eq(0);
											var aUl=aLi.eq(index).children().eq(1);
											
												aLi.eq(i).hover(function (){
														clearTimeout(obj.timer);
														obj.timer=setTimeout(function (){
															aLi.removeClass('contact');
															aLi.eq(i).addClass('contact');
															oDiv.css({'zIndex':zIndex});
														},300);
													},function (){
														clearTimeout(obj.timer);
														aLi.removeClass('contact');
													});
										})(index);
									
								});
							},
			/*点击消失*/clicKnone:function (obj){
								obj.click(function (){
									obj.parent().css('display','none');
								});
							},
			/*nav顶对齐*/navTop:function (obj){
								var nParent=obj.parent().parent().innerHeight();
								var aUlW=obj.children('ul').eq(0).outerWidth();
								
								var n=0;
									obj.each(function (index){
										var aUlL=obj.eq(index).children('ul').length;
										if( obj.parent().attr('class')=='j-nav-none' )
										{
											n++;
											obj.parent()
										}
										
										(function (i){
											var top=obj.parent().outerHeight();
											obj.eq(index).css({'top':-top*(i+n),'height':nParent,'width':aUlW*aUlL});
										})(index);
											//,'width',oUlW*nUl
									});
							}	,
			
			/*延迟加载*/	delayedLoad:function (obj){
							
							var oUl=$('.j-scrollR-box');
							var oLiW=oUl.children().eq(0).outerWidth();
							var nLiL=oUl.children().length;
							oUl.css('width',oLiW*nLiL);
							
							delayLoad();
							$(window).scroll(delayLoad).resize(delayLoad);;
							
							function delayLoad()
							{
								var scrollTop=$(document).scrollTop();
								var clientH=$(window).height();
								
								obj.each(function (index){
									var top=obj.eq(index).offset().top;
									if(top<(scrollTop+clientH+20))
									{
										var _src=obj.eq(index).attr('_src');
										/*console.log(_src);*/
										obj.eq(index).attr('src',_src);
									}
								});	
							}
						},	
			/*头部搜索框*/	headSearch:function (obj){
								var searchText=obj.find('.j-search-text');
								var searchBtn=obj.find('.j-search-btn');
								var oInp=searchText.find('input');
								var oSpan=searchText.find('span');
								var str=oSpan.html();
								
								
								searchText.click(function (){
									oInp.focus();
								});
								
								oInp.focus(function (){
									$(document).keydown(function (){
										oSpan.html('');
									}).keyup(function (){
										if( oInp.attr('value').length==0)
										{
											oSpan.html(str);
										}
									});
									
								}).blur(function (){
									if( oInp.attr('value').length==0)
									{
										oSpan.html(str);
									}
								});
							}
		},
		index:{
				/*跨年*/newYear:function (obj){
							var maxRight=$(window).width();
							obj.next().css({right:maxRight});
							
							obj.click(function (){
									move(obj[0],{left:-obj.width()},{ duration:1000,complete:function (){
											move(obj.next()[0],{right:0},{duration:3000});
										}
									});
							});
							obj.next().children('a').click(function (){
									move(obj.next()[0],{right:maxRight},{ duration:3000,complete:function (){
											move(obj[0],{left:0},{duration:1000});
										}
									});
							});
					},
				
				/*倒计时*/countdown:function (obj,duration){
							var aSpan=obj.children('span');
							var nH=parseInt(duration.split(',')[0]);
							var nM=parseInt(duration.split(',')[1]);
							var nS=parseInt(duration.split(',')[2]);
							time();
							setInterval(time,1000);
							
							function time()
							{
								var oDate=new Date();
								var oTager=new Date();
								var H=oTager.getHours();
								oTager.setHours(nH,nM,nS,00);
								
								var n=oTager.getTime()-oDate.getTime();
								
								n=parseInt(n/1000);
							
								var day=parseInt(n/86400);
								n%=86400;
								var h=parseInt(n/3600);
								n%=3600;
								var m=parseInt(n/60);
								n%=60;
								var s=n;
								
								var str=toDub(h)+toDub(m)+toDub(s);
								for(var i=0;i<str.length;i++)
								{
									aSpan[i].innerHTML=str.charAt(i);
								}
							}
						},
				
				/*选项卡*/tab:function (obj){
						var aBtn=obj.find('.j-tab-btn>li');
						var aBox=obj.find('.j-tab-box>ul');
						aBtn.each(function (index){
							(function (i){
								aBtn.eq(i).click(function (){
									aBtn.removeClass('active');
									aBox.removeClass('active');
									aBtn.eq(i).addClass('active');
									aBox.eq(i).addClass('active');
								});
							})(index);	
						});
					},
				/*nav更多*/navMore:function (obj){
							obj.hover(function (){
								obj.parent().addClass('navMore');
								obj.parent().children('ul').addClass('navHreit');
							},function (){
								obj.parent().removeClass('navMore');
								obj.parent().children('ul').removeClass('navHreit');
							});
						},
				/*navSide*/navSide:function (obj){
					
							var top=$('.j-navSide-top').offset().top;
							obj.css('top',top);
							var aBox=$('.j-navSide-box');
							var aLi=obj.children();
							
							
							
							$(window).scroll(show);
							function show()
							{
								var scrollTop=$(document).scrollTop();
								if(scrollTop>top)
								{
									obj.addClass('navSiactive');
									obj.css('top',0);
								}
								else
								{
									obj.removeClass('navSiactive');
									obj.css('top',top);
									aLi.removeClass('zIndex');
								}
								
								aBox.each(function (index){
									(function (i){
										var aBoxTop=aBox.eq(i).offset().top;
										var aBoxH=aBox.eq(i).outerHeight();
										
										if( (aBoxTop<=scrollTop && (aBoxTop+aBoxH)>=scrollTop))
										{
											aLi.removeClass('zIndex');
											aLi.eq(i).addClass('zIndex');
										}
										
									})(index);
								});
								
								aLi.each(function (index){
									(function (i){
										aLi.eq(i).click(function (){
											var nBoxTop=aBox.eq(i).offset().top;
											document.body.scrollTop=nBoxTop;
											document.documentElement.scrollTop=nBoxTop;
										});
									})(index);
								});
							}
						},		
				/*无缝滚动*/scrollRight:function (obj){
							var oBox=obj.find('.j-scrollR-box');
							var oPrev=obj.find('.j-scrollR-l');
							var oNext=obj.find('.j-scrollR-r');
							oPrev.hide();
							oNext.hide();
							var oSpan=oNext.find('span');
							oBox.html(oBox.html()+oBox.html());
							var aLi=oBox.children();
							var nLiL=aLi.length/2;
							var oLiW=aLi.eq(0).outerWidth();
							oBox.css('width',oLiW*nLiL*2);
							var w=oBox.outerWidth()/2;
							
							var timer=null;
							
							var left=0;
							var dis=0;
							var add=true;
							var bFlag=false;
							var moveRight=false;
							
							
							setTimeout(scrollR,1000);
								
							obj.hover(function (){
								clearTimeout(obj.timer);
								bFlag=true;
								oPrev.show();
								oNext.show();
							},function (){
								bFlag=false;
								oPrev.hide();
								oNext.hide();
							});

							oNext.click(function (){
								moveRight=false;
								add=true;
								
								//bFlag=true;
							});
							
							
							oPrev.click(function (){
								moveRight=true;
								add=true;
								
							});
							
							function scrollR()
							{
								setInterval(function (){
									if(!add)
									{
										if(bFlag)
										{
											moveRight=false;
											return;
										}
										else
										{
											bFlag=true;
											obj.timer=setTimeout(function (){
												add=true;
												bFlag=false;
											},3000);
										};
									}
									else
									{
										if(moveRight)
										{
											left+=(oLiW/20);
										}
										else
										{
											left-=(oLiW/20);
										}
										
										left%=w;
										dis=(left/oLiW).toFixed(2);
										
										if(left<0)
										{
											oBox.css('left',dis*oLiW);
											stopMove();
										}
										else
										{
											oBox.css('left',dis*oLiW-w);
											stopMove();
										}
									}
								},30);
							}
							
							function stopMove()
							{
								for(var i=0;i<nLiL;i++)
								{
									(function (index){
										if( Math.abs(dis)==i)
										{	
											var nowLeft=Math.abs(oBox.position().left/oLiW)+1;
											(nowLeft==nLiL+1)&&(nowLeft=1);
											oSpan.html(nowLeft+'/'+nLiL);
											add=false;
										}
									})(i);
								}
							}
						}		
		},
		list:{
			hoverblock:function (obj){
				var oBox=obj.find('.j-hoverblock');
				obj.hover(function (){
					oBox.show();
				},function (){
					oBox.hide();
				});
			}
		}
	}
	

