$(window).on('load',function(){
	//dom 加载完成后显示图标
	$('#arrow-h').removeClass('hide_');
	$('#st-trigger-effects').show();
	$('.lazy-img').each(function(){
		load_img(this);
	});
    adwo_init();
    //slitslider
})

//预加载图片
function load_img(obj){
	if($(obj).is("img")){
		$(obj).attr('src',$(obj).attr('data-src'));
	}else{
		$(obj).css({
			'background-image'	: 'url('+$(obj).attr('data-src')+')'
		});
	}
	$(obj).removeClass('lazy-img');
	$(obj).bind('touchstart', function(){
		if($(this).is("img")){
			$(this).attr('src',$(this).attr('data-src'));
		}else{
			$(this).css({
				'background-image'	: 'url('+$(this).attr('data-src')+')'
			});
		}
	});
}

jQuery(function(){
	var clientType = 0;
	var u = navigator.userAgent; // 客户端环境信息
	if( ! u.match(/AppleWebKit.*Mobile.*/i) && ! u.match(/Android.*/i) ){
		$('body').addClass('pc');
		clientType = 1;
	}
	var slitslider;
	var myScroll = null;   //四季滑动插件
	var leftScroll = null; //左侧滑动插件
	var id;
	
	var arrowPos_v = new Array();  //向上提示箭头
	var arrowPos_h = false;        //滚动到下面后向左提示箭头
	var Page = (function() {
		var $navArrows = $( '#nav-arrows' );
			slitslider = $( '#slider' ).slitslider({
				onBeforeChange : function( slide, pos ) {
					if(myScroll != null){
						myScroll._initEvents(true);
					}
					
					if($('.sl-slide').eq(pos).find('#arrow_direction').length>0 && 
							   $('.sl-slide').eq(pos).find('#arrow_direction').val()=='v' && $.inArray(pos,arrowPos_v)==-1){ //向上箭头提示
						$('#arrow-v').removeClass('hide_');
						$('#arrow-h').addClass('hide_');
						arrowPos_v.push(pos);
						arrowPos_h = true;
					}else{
						$('#arrow-v').addClass('hide_');
						$('#arrow-h').addClass('hide_');
						arrowPos_h = false;
					}
					
					if(myScroll) myScroll.scrollTo(0,0,80);

					if (!slide.next().hasClass('noSwipe')) {
						$navArrows.hide();
					}
				},
				onAfterChange : function(slide, pos) {
					if ($('.sl-slides-wrapper .sl-slide:visible').hasClass('slide-map')){
						if($('.maps').length>0){
							for (var i=0; i < $('.maps').length; i++){
								var id = $($('.maps')[i]).find('.BDMap').attr('id');
								$('.sl-slides-wrapper .sl-slide:visible').find('#'+id).triggerHandler("setCenter");
							}
						}
					}
					if($('.sl-slides-wrapper .sl-slide:visible').hasClass('slide-more') &&　countSeason!=undefined && $('.sl-slides-wrapper .sl-slide:visible').find('.season').attr('data-init') == 0 ){
						countSeason($('.sl-slides-wrapper .sl-slide:visible'));
					}
					
					if($('.sl-slides-wrapper .sl-slide:visible').find('.season')[0]!=undefined && 
							$('.sl-slides-wrapper .sl-slide:visible').find('#arrow_direction').val()=='v'	
					  ){
						id = '#'+$('.sl-slides-wrapper .sl-slide:visible').find('.season').attr('id');
						myScroll = new IScroll(id, { scrollX: true, scrollY: true, mouseWheel: true });
						myScroll.on('scrollEnd',function(e){
							var maxScrolly = this.maxScrollY;
							var curScrolly = this.currentScrollY;
							var rand = 60;
							var obj = $('.sl-slides-wrapper .sl-slide:visible')[0];
							if(rand<= Math.abs(curScrolly)){   //出现电话
								if($(obj).find('.list-tel')[0]!=undefined){
									$(obj).find('.list-tel').addClass('open');
								}
							}										
							if(Math.abs(maxScrolly)-rand<Math.abs(curScrolly) && arrowPos_h){
								$('#arrow-h').removeClass('hide_');
								$('#arrow-v').addClass('hide_');
								arrowPos_h = false;
							}else if(Math.abs(curScrolly) < Math.abs(maxScrolly)-rand){
								$('#arrow-h').addClass('hide_');
								$('#arrow-v').addClass('hide_');
							}
						});
						myScroll._initEvents(false);
						
						window.myScroll =myScroll;
					}

					if ($('.sl-slides-wrapper .sl-slide:visible').hasClass('noSwipe')) {
						$navArrows.show();
					} else {
						$navArrows.hide();
					}
				}
				
			}),
			init = function() {
				initEvents();
				
				/* 第二张图片加载 */
				var node = $('.sl-slides-wrapper').find('.sl-slide').eq(1),
					img = node.find('.lazy-img');	
					img.each(function(){
						load_img(this);
					});
			},
			initEvents = function() {
				$('#slider').swipe({
					swipeLeft:function(event, direction, distance, duration, fingerCount) {
						if(distance>100){
							if($('#st-trigger-effects').data('status') === 1){
								menuHide();
							} else {
								slitslider.next();
							}
							return false;
						}
					},
					swipeRight:function(event, direction, distance, duration, fingerCount) {
						if(distance>100){
							if($('#st-trigger-effects').data('status') === 1){
								menuHide();
							} else {
								if ($('.sl-slides-wrapper .sl-slide:visible').attr('id') == 'realty-poster') {
									menuShow();
								} else {
									slitslider.previous();
								}
							}
							return false;
						}
					},
					tap:function(e){
						if($('#st-trigger-effects').attr('data-status') == 1){
							menuHide();
						} else {							
							e = e||window.event;
							tar = e.target||e.srcElement;
							if ($(tar).hasClass('swipe-click') === true) {
								$(tar).triggerHandler("swipeclick");
							} else {
								$(tar).parents('.swipe-click').triggerHandler("swipeclick");
							}
						}
						$('.widthdesc-form input').blur();
						return false;
					},
					excludedElements:"input, select, .list-tel-img, .noSwipe, .share-block, .map_close_btn, .transitBtn, .map, #nav-arrows",
					threshold:10,
					allowPageScroll:'auto',
					fingers:'all'
				});

				$navArrows.children( ':last' ).on( 'click', function(){
					slitslider.next();
					return false;
				});
				$navArrows.children( ':first' ).on( 'click', function(){
					slitslider.previous();
					return false;
				});
			};
			return { init : init };
	})();
	
	Page.init();
	/***手势滑动显示与隐藏右侧导航功能***/	
	$('.menu-switch').swipe({
		swipe:function(event, direction, distance, duration, fingerCount) {
			if($('#st-trigger-effects').data('status') === 0){
				menuShow();
			}else{
				menuHide();
			}
			event = event||window.event;
			tar = event.target||event.srcElement;
			return false;
		},
		threshold:0,
		allowPageScroll:'none',
		fingers:'all'
	});
	
	var _liHtml = '';
	var _imgWidth = ($(window).width()*0.8-4*5)/2;
	
	$('.nav-bg-thumb').each(function(){
		_liHtml += '<li><a href="javascript:void(0);"><img style="width:'+_imgWidth+'px;height:'+_imgWidth+'px;" src="/'+$.trim($(this).val())+'" /></a></li>';
	});
	$('.img-nav-ul').html(_liHtml);
	$('.img-nav-ul li').each(function(i){
		$(this).find('a').on('click',function(e) {
			menuHide(false);
			slitslider.jump((i+1));
		});
	});
	
	$('#bigimg-box').swipe({
		tap:function(e){
			$(this).hide();
			setTimeout(function(){
				$('#st-container').css('pointer-events', 'auto');
			}, 500);
			return false;
		},
		allowPageScroll:'none',
		fingers:'all'
	});
	$('#close-dialog-btn').on('click', function(){
		dialogClose();
	});
	
	/**
	 * 右侧导航显示
	 */
	function menuShow(){    
		$('.st-menu').show();
		$('#st-trigger-effects').data('status',1);
		$('.st-pusher').animate({left: "80%"}, 600, function(){
			$('.st-menu').css('pointer-events','auto');
		});
		if(leftScroll==null){
			leftScroll = new IScroll('#leftScorll', { scrollX: true, scrollY: true, mouseWheel: true });
		}
	}
	
	/**
	 * 右侧导航关闭
	 */
	function menuHide(anim){
		$('.st-menu').css('pointer-events','none');
		$('#st-trigger-effects').data('status',0);
		if (anim === false) {
			$('.st-pusher').css('left','0%');
			$('.st-menu').hide();
		} else {
			$('.st-pusher').animate({left: "0%"}, 600, function(){
				$('.st-menu').hide();
			});
		}
	}
});
	
function dialogClose() {
	$('#dialog').css('pointer-events', 'none');
	$('#dialog').hide();
	$('#dialog-overlay').hide();
	$('#dialog').find('.modal-body').html('');
	$('#dialog').width(270);
}
function dialogShow(title,content) {
	var dialog = $('#dialog');
	if (title == '') {
		title = '温馨提示';
	}
	dialog.find('.title').html(title);
	dialog.find('.modal-body').html(content);
	dialog.width(document.documentElement.clientWidth * 0.9);
	var left = document.documentElement.clientWidth * 0.1 * 0.5;
	var top = ($(window).height() - dialog.height()) / 2;
	dialog.css({top:top,left:left});
	$('#dialog-overlay').height($(document).height());
	$('#dialog-overlay').show();
	dialog.show();
	setTimeout(function(){
		dialog.css('pointer-events', 'auto');
	}, 500);
	return;
}

//地图加载函数
//检测对象是否为空
function isOwnEmpty(obj) 
{ 
	for(var name in obj) 
	{ 
		if(obj.hasOwnProperty(name)) 
		{ 
			return false; 
		} 
	} 
	return true; 
}; 

//地图加载函数
function addMap(detal,latitude,longitude){
	var detal		= detal,
		latitude	= Number(latitude),
		longitude	= Number(longitude);

	var a = {sign_name:'',contact_tel:'',address:'天安门'};
	isOwnEmpty(detal)	? detal=a:detal=detal;

	!latitude? latitude=39.915:latitude=latitude;
	!longitude? longitude=116.404:longitude=longitude;
	
	$('.ylmap').ylmap({
		/*参数传递，默认为天安门坐标*/
		//需要执行的函数（回调）
		detal		: detal,		//地址值
		latitude	: latitude,		//纬度
		longitude	: longitude		//经度
	});	
	$('.ylmap').addClass('mapOpen')
}

//手势指引消失函数
var arrowStart =0;
$('#arrow-v').on('touchstart',function(e){
	arrowStart = window.event.touches[0].pageY;
})

$('#arrow-v').on('touchmove',function(e){
	e.preventDefault();
	var move = window.event.touches[0].pageY;
	if(move&&Math.abs(arrowStart-move)>10){
		$(this).addClass('hide_');	
		var dis = Math.abs(arrowStart-move)<50?Math.abs(arrowStart-move):50;
		var time = 300;
		myScroll.scrollTo(0,-3*dis,time);
	}
})


