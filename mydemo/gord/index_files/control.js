function loadProData() {
	
    var provices='<option data-name="选择省份" value="">请选择</option>';
				for(var i=0; i<data.length; i++){
					provices += '<option data-name="'+data[i].provincename+'" value="'+data[i].provincename+'">'+data[i].provincename+'</option>';
				}
				
				$('#province').html(provices);
				
				$('#province').bind('change',function(){
					var citys='<option data-name="选择城市" value="">请选择</option>';
					var dealername='<option data-name="选择经销商" value="">请选择</option>';
					$('#citys').html(citys);
					$('#dealername').html(dealername);
					$('#dealeraddress').val("");
					var currentId = $(this).val();
					for(var i=0 ; i<data.length ; i++){
						if(data[i].provincename == currentId){
							for(var j=0; j<data[i].cities.length ; j++){
								citys += '<option data-name="'+data[i].cities[j].areacityname+'" value="'+data[i].cities[j].areacityname+'">'+data[i].cities[j].areacityname+'</option>';
							}
							break;
						}
					}
					$('#citys').html(citys);
				});
				
				$('#citys').bind('change',function(){
					var dealername='<option data-name="选择经销商" value="">请选择</option>';
					$('#dealername').html(dealername);
					var currentId = $(this).val();
					for(var i=0 ; i<data.length ; i++){
						for(var j=0; j<data[i].cities.length ; j++){
							if(data[i].cities[j].areacityname == currentId){
								for(var k=0;k<data[i].cities[j].dealers.length;k++){
									dealername +='<option value="'+data[i].cities[j].dealers[k].dealername+'">'+data[i].cities[j].dealers[k].dealername+'</option>';
								}
								break;
							}
							
						}
					}
					$('#dealername').html(dealername);
				});
}

function loadCityData(pro) {
	var cityOption = "<option value=''>市</option>";
	for (var i=0;i<cityArea.citylist.length;i++) {
		if(cityArea.citylist[i].p == pro){
			for(var j=0;j<cityArea.citylist[i].c.length;j++){
				cityOption += "<option value='" + cityArea.citylist[i].c[j]["n"] + "'>" + cityArea.citylist[i].c[j]["n"] + "</option>";
			}
		}
	}
	$("#citys").empty().append(cityOption);
}

function trim(str){ //删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
function ltrim(str){ //删除左边的空格
	return str.replace(/(^\s*)/g,"");
}
function rtrim(str){ //删除右边的空格
	return str.replace(/(\s*$)/g,"");
}

function matchUserName(val){
	var valnew = trim(val);
	var re1=/^[~!@#$%^&*()-+={}|;:<>?.,~！@#￥……&*（）+=｛｝【】|、：；"'《》、？，。]/i;
	if(valnew == ""){
		return false;
	}
	if(re1.test(valnew)){
		return false;
	}
	if(valnew.length<2||valnew.length>20){
		return false;
	}
}

function matchEmail(val){
	var valnew = trim(val);
	if(valnew.match( /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)){
		return true;
	}else{
		return false;
	}
}

function matchMobile(val){
	var valnew = trim(val);
	if(valnew.match(/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/)){
		return true;
	}else{
		return false;
	}
}
function showMsg(msg){
	alert(msg);
}
var isSubmit = false;
//ajax提交车主认证的表单
function submitForm(){
	if(isSubmit){
		showMsg("正在提交，请稍等一下吧~");
		return;
	}
	isSubmit = true;
	//track(1,4321);
	var name = trim($("#name").val()),
		mobile = trim($("#mobile").val()),
		email = trim($("#email").val()),
		cityname = $("#citys").val(),
		provincename = $("#province").val(),
		buytime = $("#buytime").val(),
		sex = $("[name=sex]:checked").val(),
		dealername = $("#dealername").val(),
		alertInfo = '';
		
	if(buytime == ""){
		alertInfo = "请选择计划购买时间！\n";
	}

	if(trim(dealername) == ""){
		alertInfo = "请选择经销商！\n";
	}
	if(trim(cityname) == ""){
		alertInfo = "请选择城市！\n";
		
	}
	if(trim(provincename) == ""){
		alertInfo = "请选择省份！\n";
	}
	
	if(matchEmail(email)==false ){
		alertInfo = "请输入正确的邮箱格式！\n";
	}
	if(matchMobile(mobile)==false ){
		alertInfo = "请输入正确的手机格式！\n";
	}
	if(name == ""){
		alertInfo = "请输入您的姓名！\n";
	}
	
	if(alertInfo){
		showMsg(alertInfo);
		isSubmit = false;
		return false;
	}else{
		
		
		var userInfo = {		
			advid:advid,		            
			realname: name,
			mobile : mobile,
			email: email,
			sex:sex,
			provincename:provincename,
            cityname:cityname,
			expand1:dealername,
			expand2:buytime
		};
		$.ajax({
				url : 'http://track.mobile1.com.cn/advmessage/adv/addResultJsonP.action',
				cache : false,
				dataType : 'jsonp',
				jsonpCallback : "eventcallback",
				data : userInfo,
				success : function(json) {
					if (json[0].success == 1) {
						showMsg("提交成功");
						$("#name").val("");
						$("#mobile").val("");
						$("#email").val("");
						isSubmit = false;
					} else {
						showMsg(json[0].info);
						isSubmit = false;
					}
				}
			});
			
		
	}
}
$(document).ready(function(e) {
	
});

window.onresize = function(){
	
}

