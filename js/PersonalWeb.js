// JavaScript Document

var PerWeb={
	//吸顶条
	suctionTip:function (){
		var oDiv=document.getElementById('j-suction');
		var headBot=oDiv.getElementsByClassName('headBot')[0];
		var top=getPos(oDiv).top;
		document.onscroll=function (){
			var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
			if(scrollTop>=top)
			{
				oDiv.style.position='fixed';
				oDiv.style.top=0;
				headBot.style.opacity=1;
			}
			else
			{
				oDiv.style.position='absolute';
				oDiv.style.top='auto';
				headBot.style.opacity=0.7;
			}
		};
	},
	//回到顶部
	toUp:function(){
		var oBtn=document.getElementById('j-toUp');
		var bFlag=false;
		var timer=null;
		
		document.documentElement.scrollTop=0;
		document.body.scrollTop=0;
		
		window.onscroll=function (){
			var scropTop=document.documentElement.scrollTop || document.body.scrollTop;
			if(scropTop>100)
			{
				oBtn.style.display='block';
			}
			else
			{
				oBtn.style.display='none';
			}
			if(bFlag)
			{
				clearInterval(timer);	
			}
			bFlag=true;
		};
		
		oBtn.onclick=function (){
			bFlag=false;
			var start=document.documentElement.scrollTop || document.body.scrollTop;
			var dis=0-start;
			var n=0;
			var time=300;
			var cont=Math.floor(time/30);
			clearInterval(timer);
			timer=setInterval(function (){
				bFlag=false;
				n++;
				var cur=start+dis*n/cont;
				
				document.documentElement.scrollTop=cur;
				document.body.scrollTop=cur;
				
				if(n==cont)
				{
					clearInterval(timer);
				}
			},30);
		};
	},
	cssTime:function (){
		var oDiv=document.querySelector('.box');
		var oH=document.querySelector('.hour');
		var oM=document.querySelector('.min');
		var oS=document.querySelector('.sec');
		
		var N=60;
		for(var i=0;i<N;i++)
		{
			var oSpan=document.createElement('span');
			if(i%5==0)
			{
				oSpan.className='bS';
				var n=i/5==0?12:i/5;
				oSpan.innerHTML='<i>'+n+'</i>';
				oSpan.children[0].style.transform='rotate('+-i*6+'deg)';
			}
			else
			{
				oSpan.className='scale';
			}
			oSpan.style.transform='rotate('+i*6+'deg)';
			oDiv.appendChild(oSpan);	
		}
	
		function tick()
		{
		var oDate=new Date();
		var h=oDate.getHours();
		var m=oDate.getMinutes();
		var s=oDate.getSeconds();
		var ms=oDate.getMilliseconds();
		oH.style.transform='rotate('+(h+m/60)*30+'deg)';
		oM.style.transform='rotate('+(m+s/60)*6+'deg)';
		oS.style.transform='rotate('+(s+ms/1000)*6+'deg)';
		
		 
		};
		
		tick();
		setInterval(tick,30);
	},
	navLink:function()
	{
		var aBtn=document.getElementById('btnBox').children;
		var aBox=document.getElementsByClassName('j-box');

		var timer=null;
		for(var i=0;i<aBtn.length;i++)
		{
			(function(index){
				aBtn[index].onclick=function (){
					var start=document.documentElement.scrollTop || document.body.scrollTop;
					var top=getPos(aBox[index]);
				
					var dis=top-start;
					var n=0;
					var time=300;
					var cont=Math.floor(time/30);
					clearInterval(timer);
					timer=setInterval(function (){
						bFlag=false;
						n++;
						var cur=start+dis*n/cont;
						
						document.documentElement.scrollTop=cur;
						document.body.scrollTop=cur;
						
						if(n==cont)
						{
							clearInterval(timer);
						}
					},30);
					
				};
			})(i);
		}
		
		function getPos(obj)
		{
			var top=0;
			while(obj)
			{
				top+=obj.offsetTop;
				obj=obj.offsetParent;
			}
			return top;
		}
	},
	contBg:function ()
	{
		var aBox=document.getElementsByClassName('ConBox');
		var aDiv=document.getElementsByClassName('contentBg');
		
		for(var i=0;i<aBox.length;i++)
		{
			(function (index){
				aBox[index].onmouseenter=function (ev){
					aDiv[index].style.left='0';
					aDiv[index].style.top='-180px';
					move(aDiv[index], {top:0});
				};
			})(i);
		}
		
		for(var i=0;i<aBox.length;i++)
		{
			(function (index){
				aBox[index].onmouseleave=function (ev){
					move(aDiv[index], {top:-180});
				};
			})(i);
		}
	}
	
};

//到页面的距离
function getPos(obj)
{
	var top=0;
	var left=0;
	while(obj)
	{
		left+=obj.offsetLeft;
		top+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {left:left,top:top};
}	