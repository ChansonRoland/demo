/**
 * 查看更多
 */
function check_fullview_more(obj){
	if($(obj.parentNode.parentNode).find('.hidden_module').css('display')=='none'){
		$(obj.parentNode.parentNode).find('.hidden_module').css('display','block');
		$(obj).text('收起全部');
	}else{
		$(obj.parentNode.parentNode).find('.hidden_module').css('display','none');
		$(obj).text('查看全部');
	}
}

/**
 * 绑定右侧预览插件链接提示
 */
$(function(){
	$('.module').each(function(){
		var html = '';
		if($(this).attr('data-pid')!=undefined && parseInt($(this).attr('data-pid'))!=0){
			html = $('<p></p>');
			html.text('小提示：这是个被链接的插件！');
			html.css({
				'position':'absolute',
				'left':'0',
				'top':'40px',
				'background':'rgba(0,0,0,0.1)',
				'color':'green',
				'font-size':'20px',
				'padding':'4px',
				'width':'100%',
				'z-index': 999,
			});
			$(this).append(html);
		}
	});
});

/**
 * 多图
 */
$(function(){
	if($('.imgToPage').length>0){
		for(var i=0; i<$('.imgToPage').length; i++){
			var value = $($('.imgToPage')[i]).find('.imgToPage_data').val();
			var text1 = $($('.imgToPage')[i]).find('.imgToPage_data').attr('data-text1');
			var text2 = $($('.imgToPage')[i]).find('.imgToPage_data').attr('data-text2');
			value = eval('('+value+')');
			var array = new Array();
			
			for(var j=0; j<value.length; j++){
				var temp = new Array();
				temp[0] = value[j].pic_url;
				temp[1] = value[j].title;
				array.push(temp);
			}
			
			$($('.imgToPage')[i]).ylImgInToPage({
				imgsArray	: array,
				bigImgTitle	: text1,
				litImgTitle : text2,
			});
		}
	}
});

/*
** 四季图片高度计算
*/
var seasonMaps = true;
function countSeason(dom){
	/*
	** 外部地图加载
	*/
	if($('.map').find(".ylMap").length>0 && seasonMaps){
			new ylmap.init;
			seasonMaps = false;
	}
}

$(function(){
	/*
	** 图片文字展开
	*/
	$('.season').find('.txt').click(function(){
		if($(this).data('switch')==1)
			$(this).toggleClass('open');
	});
	/**
	 * 拨打电话
	 */
	$('.list-tel-img').live('click',function(){
		analyse_tel();
		window.location.href = "tel:"+$(this).attr('data-tel')+"";
	});

	//电话统计
	function analyse_tel() {
		var activity_id = document.getElementById('activity_id').innerHTML;
		var url = "/"+SYS_SITE_ID+"/analyseplugin/plugin?activity_id=" + activity_id + "&plugtype=fastcall";
		$.post(url);
	}
	
	/**
	 * 绑定地图导航
	 */
	$('img[data-map]').on('swipeclick', function(e){
		var ev = e || window.event;
		var data_map = $(this).attr('data-map');
		data_map = data_map.split(',');
		var ops = {sign_name:'' ,contact_tel:'',address:data_map[0]};
		addMap(ops, data_map[2], data_map[1]);
	});
});

	



