// JavaScript Document


	window.onload=window.onresize=function(){
		document.documentElement.style.fontSize=20*document.documentElement.clientWidth/320+'px'
	};

	document.addEventListener('DOMContentLoaded',function (){
		var oUl=document.querySelector('.banner_pic');
		var aBtn=document.querySelectorAll('.buttonBox li');
		var aLi=oUl.children;
		
		var bReady=false;
		var iNow=1;
		var x=-iNow*aLi[0].offsetWidth;
		
		
		
		oUl.addEventListener('touchstart',function (ev){
			if(bReady) return;
			bReady=true;
			
			
			oUl.style.WebkitTransition='none';
			var downX=ev.targetTouches[0].pageX;
			var disX=downX-x;
			
			function fnMove(ev)
			{
				x=ev.targetTouches[0].pageX-disX;
				
				oUl.style.WebkitTransform='translate3d('+x+'px,0px,0px)';
				
			}
			
			function fnEnd(ev)
			{
				var upX=ev.changedTouches[0].pageX;
				oUl.removeEventListener('touchmove',fnMove,false);
				oUl.removeEventListener('touchend',fnEnd,false);
				
				oUl.style.WebkitTransition='.5s all ease';
				if(Math.abs(upX-downX)>20)
				{
					if(upX<downX)
					{
						iNow++;
						(iNow==aLi.length) && (iNow=aLi.length-1);
					}
					else if(upX>downX)
					{
						iNow--;
						(iNow==-1) && (iNow=0);
					}
				}
				x=-iNow*aLi[0].offsetWidth;
				oUl.style.WebkitTransform='translate3d('+x+'px,0px,0px)';
				
				oUl.addEventListener('webkitTransitionEnd',tEnd,false);
				
				function tEnd()
				{
					bReady=false;
					if(iNow==aLi.length-1)
					{
						oUl.style.WebkitTransition='none';
						iNow=1;
						x=-iNow*aLi[0].offsetWidth;
						oUl.style.WebkitTransform='translate3d('+x+'px,0px,0px)';
					};
					if(iNow==0)
					{
						oUl.style.WebkitTransition='none';
						iNow=aLi.length-2;
						x=-iNow*aLi[0].offsetWidth;
						oUl.style.WebkitTransform='translate3d('+x+'px,0px,0px)';
					};
					

					for(var i=0;i<aBtn.length;i++)
					{
						aBtn[i].className='';
					}
					aBtn[iNow-1].className='curBtn';
					
					
				}
			}
			oUl.addEventListener('touchmove',fnMove,false);
			oUl.addEventListener('touchend',fnEnd,false);
			ev.preventDefault();
		},false);
	},false);
