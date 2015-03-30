/*
** ylImgInToPage分享插件
*/
;(function($){
    $.fn.ylImgInToPage = function(options){
        // 默认参数
        $.fn.ylImgInToPage.defaults = {
            /*空参数*/
			imgsArray	: [],				//图片源集合的数组
			imgsString	: '',				//图片源集合的字符串
			imgStyle	: null,				//图片源集合的样式,json格式
			bigImgTitle	: '',				//插件title对象
			litImgTitle	: '',				//插件title对象
			imgHeight	: 120,				//图片的高度
			imgWidth	: 110,				//图片的宽度
			timeIn		: 2,				//进入时间
			windowNum	: 3,				//显示几个文字窗口
			heigthBox	: null,
        };	
        
        //初始值继承 
        var opts = $.extend({},$.fn.ylImgInToPage.defaults, options);

        return this.each(function(){
            /*
            **设置初始化值
            */
			//继承opts参数值，设为对象的私有变量
			var imgsArray		= opts.imgsArray,			//传入插件里的图片集数组
				imgsString		= opts.imgsString,			//传入插件里的图片集字符串
				imgStyle		= opts.imgStyle,			//传入插件里的图片样式
				bigImgTitle		= opts.bigImgTitle,			//传入插件里的title
				imgHeight		= opts.imgHeight,			//传入插件里的图片高度
				imgWidth		= opts.imgWidth,			//传入插件里的图片高度
				windowNum		= opts.windowNum,			
				timeIn			= opts.timeIn,
				heigthBox		= opts.heigthBox,
				litImgTitle		= opts.litImgTitle,	
					
			//插件对象，元素设置
				targetBox		= $(this),					//包裹插件的对象
				imgBox			= null,						//插件对象
				ulNode			= null,						//插件图片ul对象
				h3Node			= null,						//插件title
			
			//获取图片并生成img标签存放
				imgs			= new Array(),				//存在图片的变量
				imgNum			= 0,						//计算图片的总数
				
				imgsObject		= [null],					//存放图片的对象
				imgsTags		= new Array();				//存放图片标签的对象
				
			/*
			** 判断是哪中方式存放图片的，优先读取数组
			*/
			//获取图片源集
			if(imgsArray.length>0){
				imgs	= imgsArray;
				imgNum	= imgs.length;
			}
			else if(imgs.length>0){
				imgs	= imgsString.split(',');
				imgNum	= imgs.length;
			}
			else
				return false;
			//将图片存放到图片对象中去
			if(imgNum>=1){
				imgsObject[0] = true;
				for(var i=0;i<imgNum;i++){
					imgsObject[i+1] = [imgs[i],true];
				}
			}else return false;
			
			/*
			** 函数处理图片以及效果
			*/
				//将图片对象转换称标签集合
			var	createImg	= function(){
					imgBox	= $('<div class="imgInToPageBox"></div>'),							//插件对象
				  	ulNode	= $('<ul class="ulNode"></ul>');									//插件图片ul对象
					
					h3Node =  $('<h3 class="imgTitle"><strong>'+bigImgTitle+'</strong><span>'+litImgTitle+'</span></h3>');			//插件title标签
		
					if(imgsObject[0]){
						for(var i=0;i<imgsObject.length;i++){
							if(typeof(imgsObject[i])!=='boolean'){
								imgsTags[i] = new Array();
								imgsTags[i][0] = $('<li class="imgInToPage"><div class="imgInToPageCon"><img src="'+imgsObject[i][0][0]+'"/><div class="iconTxt"><p><span class="txt">'+imgsObject[i][0][1]+'</span><span class="arrow"></span><strong class="arrow"></strong><span class="cycle"></span></p></div></div></li>');
								imgsTags[i][1] = imgsObject[i][1];
							}else{
								imgsTags[i] = imgsObject[i];
							}
						}
					}else return false;
				},
				
				//默认样式
				addStyleImg	= function(){
					if(heigthBox){
						var height	= heigthBox;
					}else{
						var height	= $(window).height();
					};
						var width	= $(window).width();
						
					//默认样式
					$('.imgInToPageBox').css({
						'position'		: 'relative',
						'width'			: width,
						'height'		: height,
						'overflow'		: 'hidden',
						'font-family'	: '微软雅黑',
						'font-size'		: '24px',
						'color'			: '#666',
					});
					
					$('.imgInToPageBox .imgTitle').css({
						'position'		: 'absolute',
						'margin'		: '0 0 0 50%',
						'left'			: '-210px',
						'top'			: '0',
						'padding'		: '0',
						'font-size'		: '42px',
						'color'			: '#fff',
						'text-align'	: 'center',
						'font-weight'	: 'normal',
						'width'			: '420px',
						'height'		: '118px',
						'line-height'	: '118px',
						'overflow'		: 'hidden',
					});
					
					$('.imgInToPageBox .imgTitle strong').css({
						'display'		: 'block',
						'float'			: 'left',
						'margin'		: '-10px 20px 0'
					});
					
					$('.imgInToPageBox .imgTitle span').css({
						'display'		: 'block',
						'padding-top'	: '10px',
						'font-size'		: '36px',
						'float'			: 'left',
					});
					
					$('.imgInToPageBox .ulNode').css({
						'margin'		: '0',
						'padding'		: '0',
						'height'		: '85%'
					});
					
					$('.imgInToPage').css({
						'list-style-type': 'none',
						'margin'		: '0',
						'padding'		: '0',
						'position'		: 'absolute',
						'border'		: '4px solid #fff',
						'width'			: imgWidth,
						'height'		: imgHeight,
					});
					
					$('.imgInToPageCon').css({
						'position'		: 'relative',
						'width'			: '100%',
						'height'		: '100%'
					});
					
					$('.imgInToPageCon img').css({
						'position'		: 'absolute',
						'width'			: '100%',
						'height'		: '100%'	
					});
					
					$('.imgInToPageCon .iconTxt').css({
						'position'		: 'absolute',
						'z-index'		: '10',
						'opacity'		: '0',
						'top'			: '-120px',
						'left'			: '-20px',
						'width'			: 130,
						'height'		: 150,
					});	

					$('.imgInToPageCon .iconTxt p').css({
						'position'		: 'relative',
					});					
					
					$('.imgInToPageCon .iconTxt p span').css({
						'position'		: 'absolute',
						'display'		: 'block'
					});
					
					$('.imgInToPageCon .iconTxt p span.txt').css({
						'margin'		: '0',
						'top'			: 0,
						'width'			: 130,
						'z-index'		: 12,
						'height'		: '80px',
						'line-height'	: '80px',
						'padding'		: '0 30px',
						'border'		: '3px solid rgba(0,0,0,0.4)',
						'border-radius'	: '10px',
						'background'	: '#fff'
					});
					
					$('.imgInToPageCon .iconTxt p span.cycle').css({
						'left'			: 20,
						'top'			: 110,
						'z-index'		: 11,
						'width'			: 34,
						'height'		: 34,
						'border'		: '3px solid rgba(0,0,0,0.4)',
						'background'	: '#fff',
						'border-radius'	: '50%'
					});
					
					$('.imgInToPageCon .iconTxt p span.arrow').css({
						'left'			: 20,
						'top'			: 84,
						'z-index'		: 13,
						'border-style'	: 'solid',
						'border-width'	: '20px 18px',
						'border-color'	: 'rgba(0,0,0,0.4) transparent transparent transparent',
					});
					
					$('.imgInToPageCon .iconTxt p strong.arrow').css({
						'position'		: 'absolute',
						'display'		: 'block',
						'left'			: 20,
						'top'			: 78,
						'z-index'		: 13,
						'border-style'	: 'solid',
						'border-width'	: '20px 18px',
						'border-color'	: '#fff transparent transparent transparent',
					});
					
					//custom添加样式
					if(imgStyle&&typeof(imgStyle)==='string')
						imgStyle = eval('('+imgStyle+')');
					if(imgStyle&&typeof(imgStyle)==='object'){
						$('.imgInToPage').css(imgStyle);
					}
					
					
					//加上过渡效果
					$('.imgInToPage').each(function(){
						var tansition	= 'top '+timeIn+'s, left '+timeIn+'s';
						this.style.transition = tansition;
						this.style.WebkitTransition = tansition;
						this.style.MozTransition = tansition;
						this.style.OTransition = tansition;
						this.style.msTransition = tansition;
					})
					
					$('.imgInToPageCon .iconTxt').each(function(){
						this.style.transition = 'opacity 1s';
						this.style.WebkitTransition = 'opacity 1s';
						this.style.MozTransition = 'opacity 1s';
						this.style.OTransition = 'opacity 1s';
						this.style.msTransition = 'opacity 1s';
					})
					
				},
				
				
				//给图片标签添加样式(变化的样式)
				autoStyleImg	= function(topL,leftL,topP,leftP,leftT,num){
					var pTop 		= topP,				//-115到-70 
						pLeft		= leftP,			//-25到55的范围
						spanLeftTxt	= leftT,			//0到-180范围
						ltop		= topL,				//-imgHeight-6
						lLeft		= leftL;			//-imgWidth-6
					
					$('.imgInToPage').eq(num).css({
						'left'	: leftL,
						'top'	: topL
					});
				},
				//给图片标签添加样式（效果样式）
				plusStle	= function(){
					//只显示有文字的
					$('.imgInToPage.start .imgInToPageCon .iconTxt').each(function(){
						if($(this).find('.txt').html()!=''){
							$(this).css({'opacity'	: '1'});
							$(this.parentNode.parentNode).addClass('showTxt');
						}
					})
					
					if(heigthBox){
						var winHeight	= heigthBox;
					}else{
						var winHeight	= $(window).height();
					};
					var winWidth		= $(window).width();
					var heightT		= winHeight*.30;
					var heightB		= winHeight*.48;
					var num         = $('.imgInToPage.start').not('showTxt').length;

					for(var i=1;i<=num;i++){
						var rand = Math.random()*0.33;
						var k = 0.5
						var lj = -1;
						var tj = -1;
						if(parseInt(i%4)==1){
							lj = -1;
							tj = -1;
						}else if(parseInt(i%4)==2){
							lj = 1;
							tj = -1;
						}else if(parseInt(i%4)==3){
							lj = -1;
							tj = 1;
						}else{
							lj = 1;
							tj = 1;
						}
						
						if(i<=4){
							k = 0.5
						}else if(i<=8){
							k = 1;
						}else if(i<=12){
							if(i==9){
								lj = rand*(-1);
								tj = -1;
							}else if(i==10){
								lj = 1;
								tj = rand;
							}else if(i == 11){
								lj = rand;
								tj = 1;
							}else{
								lj = rand*(-1);
								tj = -1;
							}
							k = 1;
						}else if(i<=16){
							k = 2;
						}else if(i<=24){
							switch (i){
							case 17:
								lj = (0.5+rand)*(-1);
								tj = (1.5+rand)*(-1);
								break;
							case 18:
								lj = 0.5 + rand;
								tj = (1.5 + rand)*(-1);
								break;
							case 19:
								lj = (0.5 + rand);
								tj = (0.5 + rand);
								break;
							case 20:
								lj = 0.5 + rand;
								tj = 0.5 + rand;
								break;
							case 21:
								lj = 0.5 + rand;
								tj = 1.5 + rand;
								break;
							case 22:
								lj = (0.5 + rand)*(-1);
								tj = (1.5 + rand);
								break;
							case 23:
								lj = (0.5 + rand)*(-1);
								tj = (0.5 + rand);
								break;
							case 24:
								lj = (0.5 + rand)*(-1);
								tj = (0.5 + rand)*(-1);
								break;
							}
							k = 2;
						}
						var tempRand = parseFloat(rand) + parseFloat(k);
						rand = tempRand* imgHeight * tj;
						var ltop	= Math.ceil(rand + winHeight/2)*0.5;
						
						rand = tempRand * imgWidth * lj;
						var lLeft	= Math.ceil(rand + winWidth/2)*0.8;
						$('.imgInToPage.start').not('showTxt').eq(i-1).css({
							'left'	: lLeft,
							'top'	: ltop
						});
					}
					for(var i=0;i<$('.showTxt').size();i++){
						if(i==0){
							$('.showTxt').eq(i).css({'left':'30px','top':'150px'});
							$('.showTxt').eq(i).find('.txt').css({'left':'-20px'});
						}
						if(i==1){
							$('.showTxt').eq(i).css({'left':'150px','top':'100px'});
							$('.showTxt').eq(i).find('.txt').css({'left':'-100px'});
						}
						if(i==2){
							$('.showTxt').eq(i).css({'left':'50px','top':'250px'});
							$('.showTxt').eq(i).find('.txt').css({'left':'-60px'});
						}
						if(i==3){
							$('.showTxt').eq(i).css({'left':'200px','top':'250px'});
							$('.showTxt').eq(i).find('.txt').css({'left':'-80px'});
						}
						if(i==4){
							$('.showTxt').eq(i).css({'left':'250px','top':'150px'});
							$('.showTxt').eq(i).find('.txt').css({'left':'-100px'});
						}
					}
					
				},
								
				//让图片飞进去
				imgInit		= function(){
					var top		= -imgHeight - 8,
						left	= -imgWidth - 8;
						height	= targetBox.height(),
						width	= targetBox.width();
					
					//创建标签对象
					createImg();
					
					//将标签添加到targetBox中
					var phoneScale;
					if(imgsTags[0]){
						var j = 1;
						for(var i=1;i<imgsTags.length;i++){
							imgBox.appendTo(targetBox);
							h3Node.appendTo(imgBox);
							ulNode.appendTo(imgBox);
							ulNode.append(imgsTags[i][0]);
							
							var width = $(window).width();
							if(width<640) phoneScale = width/640;
							imgsTags[i][0][0].style.transform = 'scale('+phoneScale+')';
							imgsTags[i][0][0].style.WebkitTransform = 'scale('+phoneScale+')';
							imgsTags[i][0][0].style.MozTransform = 'scale('+phoneScale+')';
							imgsTags[i][0][0].style.OTransform = 'scale('+phoneScale+')';
							imgsTags[i][0][0].style.msTransform = 'scale('+phoneScale+')';
							
							var title = $('.imgInToPageBox .imgTitle')[0];
							title.style.transform = 'scale('+phoneScale+')';
							title.style.WebkitTransform = 'scale('+phoneScale+')';
							title.style.MozTransform = 'scale('+phoneScale+')';
							title.style.OTransform = 'scale('+phoneScale+')';
							title.style.msTransform = 'scale('+phoneScale+')';
							
							//随即设置li的位置和li里面文本的位置
							/*
							var pTop 		= topP,				//-115到-70 
								pLeft		= leftP,			//-25到55的范围
								spanLeftTxt	= leftT,			//0到-180范围
								ltop		= topL,				//-imgHeight-6
								lLeft		= leftL;			//-imgWidth-6
							*/
							var pTop,pLeft,lLeft,ltop,tleft,num;
							num = i-1;
							if(j==1){
								ltop	= top;
								lLeft	= Math.ceil(Math.random()*(width+left)); 
								pTop	= Math.ceil(Math.random()*45-115);
								pLeft	= Math.ceil(Math.random()*30-25);
								tleft	= Math.ceil(Math.random()*(-180));	
							}else if(j==2){
								ltop	= Math.ceil(Math.random()*(height+top)); 
								lLeft	= width;
								pTop	= Math.ceil(Math.random()*45-115);
								pLeft	= Math.ceil(Math.random()*30-25);
								tleft	= Math.ceil(Math.random()*(-180));	
							}else if(j==3){
								ltop	= height;
								lLeft	= Math.ceil(Math.random()*(width+left)); 
								pTop	= Math.ceil(Math.random()*45-115);
								pLeft	= Math.ceil(Math.random()*30-25);
								tleft	= Math.ceil(Math.random()*(-180));							
							}else if(j==4){
								ltop	= Math.ceil(Math.random()*(height+top)); 
								lLeft	= left;
								pTop	= Math.ceil(Math.random()*45-115);
								pLeft	= Math.ceil(Math.random()*30-25);
								tleft	= Math.ceil(Math.random()*(-180));	
							}
							
							autoStyleImg(ltop,lLeft,pTop,pLeft,tleft,num);
							
							if(j==4) j=1;
							else j++;
						}
					}else return false;

					if(phoneScale){
					}
					//li img span p标签加样式
					addStyleImg();
				};
				
			//动画开始
			$.fn.ylImgInToPage.animateStart	= function(){
				$('.imgInToPage').addClass('start');
				plusStle();
			},
			
			//动画暂停
			$.fn.ylImgInToPage.animateStop	= function(){
				$('.imgInToPage').removeClass('start');
			}
			
			//插件重置
			$.fn.ylImgInToPage.resize	= function(){
				imgInit();
				$('.imgInToPage').addClass('start');
				plusStle();
			}
			
			//启动插件
			imgInit();
			
//			window.onresize = function(){
//				$.fn.ylImgInToPage.resize();
//			}

		})
	}
})(jQuery);














