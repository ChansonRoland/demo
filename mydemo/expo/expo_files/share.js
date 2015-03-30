$(function(){
	$('.static-btn').on('swipeclick', function(e){
		var u = navigator.userAgent;
		if(u.indexOf('MicroMessenger')>-1){
			$('.weixin-share-bk').addClass('open');
			$('.weixin-share-content').addClass('open');
		}else{
			$('.share-items').show();
		}	
		
		setTimeout(function(){
			$('.share-items').css('pointer-events', 'auto');
		}, 500);
	});
	$('.close-share').on('swipeclick', function(e){
		$('.share-items').css('pointer-events', 'none').hide();
	});
	
	$('.weixin-share-content').on('swipeclick',function(e){
		//关闭分享
		$('.weixin-share-content').removeClass('open');
		setTimeout(function(){$('.weixin-share-bk').removeClass('open');},'500');
	});
	
});
