if( ! $.browser.msie ||  ( $.browser.msie && parseInt($.browser.version) >= 9)){
	// UC浏览器和苹果系统不使用video.js插件
//	if( ! navigator.userAgent.match(/UCBrowser.*/i) && ! navigator.userAgent.match(/Mac OS.*/i) && ! navigator.userAgent.match(/Chrome.*/i) && ! navigator.userAgent.match(/Android\s*4\.[1,3].*/i)){
//		videojs.options.flash.swf = "video-js.swf";
//	}
	
	$(document).ready(function(){
		//UC溢出bug
		if(navigator.userAgent.match(/UCBrowser.*/i)){
			var myPlayer=$('video');
			var videoSrc=$('video').attr('src');
			var posterSrc=$('video').attr('poster');
			var videoContent =myPlayer.parent('.module-content'); 
			videoContent.css({height: "210px", position: "relative" });
			videoContent.append('<div style="display:none" class="video-hack-tmp"><div id="video-hack-start" style="z-index:99" class="vjs-big-play-button" aria-live="polite" tabindex="0" aria-label="play video"><span></span></div><img src="'+posterSrc+'" style="z-index:96;position:relative"></div>');
			$(window).scroll(function(){
				$('.video-hack-tmp').css('display','block');
				myPlayer.css('display','none');
			});
			$('#video-hack-start').live('click',function(){
				$('.video-hack-tmp').css('display','none');
				myPlayer.css('display','block');
			});
		}
		
		$('.video-deco').on('swipeclick', function(e){
			var top = document.documentElement.clientHeight - 220;
			
			if (top > 0) {
				$(this).parents('.sl-content').find('.video-close').next().css('margin-top', top/2);
			}
			var video_content = $(this).parents('.sl-content').find('.video-content');
			video_content.show();
			video_content.find('video').get(0).play();
			video_content.find('video').on('touchstart',function(e){
				e.stopPropagation();
			});
			if(navigator.userAgent.match(/Android.*/i)){
				video_content.on('touchstart',function(e){
					return false;
				});
			}
			
			$('#nav-arrows span').css('z-index',0);
			$(this).parents('.sl-content').find('.video-deco').hide();
		});
		$('.video-close').on('touchstart', function(){
			$('.video-content').hide();
			$('#nav-arrows span').css('z-index',2000);
			$('.video-deco').show();
			$('.video-content').closest('.sl-slide').find('video').get(0).pause();
			e.stopPropagation();
		});
		$('.video-close').on('swipeclick', function(){
			$('.video-content').hide();
			$('#nav-arrows span').css('z-index',2000);
			$('.video-deco').show();
			$('.video-content').closest('.sl-slide').find('video').get(0).pause();
		});
		
		// 绑定视频播放统计事件
		$('video').bind('play', function(){
			analyse();
			
			//数据统计
			function analyse() {
				var activity_id = document.getElementById('activity_id').innerHTML;
				
				$.ajax({
					   type: "get",
					   url: "/"+SYS_SITE_ID+"/analyseplugin/plugin?activity_id=" + activity_id + "&plugtype=video",
					   dataType: "json",
					   success: function(msg){
						   if(msg.result==1){
							   //alert('操作成功！');
							}else{
								//alert("操作失败，" + msg.msg);
							}
					   }
					});  
			}
		});
	});
	
	/** 
	 * @description 事件绑定，兼容各浏览器 
	 * @param target 事件触发对象  
	 * @param type   事件 
	 * @param func   事件处理函数 
	 */ 
	function addEvents(target, type, func) { 
	    if (target.addEventListener)    //非ie 和ie9 
	        target.addEventListener(type, func, false); 
	    else if (target.attachEvent)   //ie6到ie8 
	        target.attachEvent("on" + type, func); 
	    else target["on" + type] = func;   //ie5 
	};
        
}