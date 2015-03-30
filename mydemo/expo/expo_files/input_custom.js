jQuery(function(){
	var height = $(window).height();
	$('.widthdesc-form').find('input').bind('click',function(e){
		var obj  = $(this);
		setTimeout(function(){$('.widthdesc-content:visible').scrollTop(height-$('.widthdesc-content:visible').height()-30)},200);
		obj.blur();
		obj.focus();
		$('#nav-dots').css('display','none');
	});
	$('.widthdesc-form').find('input').live('blur',function(){
		$('#nav-dots').css('display','block');
	});
	
	$('#call-phone').bind('swipeclick',function(){
		var phone = $(this).attr('data-tel');
		window.location.href = "tel:"+phone+"";
	});
	
	$("#form_submit_btn").on('swipeclick', function(e){
			var success_msg = $.trim($('.widthdesc-form').find('input[name="success_msg"]').val());
			var activity_id = parseInt(document.getElementById('activity_id').innerHTML,10);
			if (success_msg == '') {
				success_msg = '感谢您的支持！';
			} 
			var obj = $('.widthdesc-form');
			
			var name = $.trim(obj.find('input[name="name"]').val());
			var name_text = $.trim(obj.find('input[name="name"]').prev().html());
			var tel = $.trim(obj.find('input[name="mobile"]').val());
			var tel_text = $.trim(obj.find('input[name="mobile"]').prev().html());
			//验证名称
			if(name==''){
				dialogShow('',"请输入您的姓名、电话，我们即刻与您联系！");
				return false;
			}
			if(tel == ''){
				dialogShow('',"请输入您的姓名、电话，我们即刻与您联系！");
				return false;
			}
			if(tel.length > 15 || !tel.match(/^\d+$/)){
				dialogShow('','请输入正确格式的'+tel_text);
				return false;
			}

			if ( activity_id>0 && tel!='') {
				$.ajax({
					   type: "POST",
					   url: "/"+SYS_SITE_ID+"/realty/submit/"+activity_id,
					   data: "name="+name+"&tel="+tel+"&look_time="+'',
					   dataType: "json",
					   success: function(result){
						   if(result.success){
								if (result.data==1) {
									dialogShow('','感谢您的支持，我们已收到您的信息。');
								} else {//提示语修改
									dialogShow('',success_msg);
									$("#form_submit_btn").find('a').html('感谢支持');
								}
							}else{
								alert(result.message);
							}
							$('#nav-dots').css('display','block');
					   }
					});
			}
			
			
			$.ajax({
				   type: "get",
				   url: "/"+SYS_SITE_ID+"/analyseplugin/plugin?activity_id= " + activity_id + "&plugtype=form",
				   dataType: "json",
				   success: function(msg){
				   }
				});
	});
	/**自定义表单提交**/
	$("#form_custom_submit_btn").on('swipeclick', function(e){
		var form = $(this).parents('form');
		var valid = check_input(form, 'base');
		if (valid) {
			valid = check_input(form);
			if (!valid && !$('.edit-more-info').hasClass('edited')) {
				$('.edit-more-info').click();
			}
		}
		if(valid){
			ajax_custom_submit(form);
		}
	});
});


/**
 * ajax异步提交表单数据
 * object form 表单jquery对象
 */
function ajax_custom_submit(form){
	var success_msg = $.trim($('.widthdesc-form').find('input[name="success_msg"]').val());
	var activity_id = parseInt(document.getElementById('activity_id').innerHTML,10);
	if (success_msg == '') {
		success_msg = '感谢您的支持！我们会尽快与您取得联系！';
	}
	
	$.ajax({
		url: '/'+SYS_SITE_ID+'/realty/custom_submit/'+activity_id,
		cache: false,
		dataType: 'json',
		async: false,
		type:'POST',
		data: form.serialize(),
		success: function(msg){
			if(msg.success){
				dialogShow('', success_msg);
			} 
			$('#nav-dots').css('display','block');
		}
	});
}

/*
** 完整信息表单验证
*/
function check_input (form, type){
	var valid = true;
	if (type == 'base') {
		var inputs = form.find('.base-info-input:input');
	} else {
		var inputs = form.find(':input');
	}
	inputs.each(function(i, e){
		if(this.name != '' && this.name != 'undefined'){			
			var empty_tip = '';
			var reg_tip = '';
			var reg = '';
			var max = null;
			var mim = null;
			switch (this.name) {
				case 'name':
					reg = /^[\u4e00-\u9fa5|a-z|A-Z|\s]{1,20}$/;
					empty_tip = '请输入你的姓名！';
					reg_tip = '这名字太怪了！';
					break;
				case 'mobile':
					reg = /^1[0-9][0-9]\d{8}$/;
					empty_tip = '请输入你的联系方式！';
					reg_tip = '请输入正确的联系方式！ ';
					break;
				case 'sex':
					empty_tip = '想想，该怎么称呼您呢？';
					break;
				case 'email':
					break;
				case 'company':
					break;
				case 'position':
					break;
				case 'date':
					break;
				case 'time':
					break;
				case 'age':
					break;
			}
			if (empty_tip != undefined && empty_tip != '') {
				if (this.name == 'sex') {
					if ($('input[name=sex]:checked').val() == undefined || $('input[name=sex]:checked').val() == '') {
						dialogShow('', empty_tip);
						$(e).focus();
						valid = false;
						return false;	
					}
				} else if ($.trim($(e).val()) == '') {
					dialogShow('', empty_tip);
					$(e).focus();
					valid = false;
					return false;	
				}
			}
			if (reg != undefined && reg != '') {
				if(!$(e).val().match(reg)){
					dialogShow('',reg_tip);
					$(e).focus();
					valid = false;
					return false;		
				}
			}
		}
	});
	if (valid == false) {
		return false;
	}else{
		return true;
	}
}
