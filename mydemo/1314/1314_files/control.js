function resetPage() {
	
	var deviceWidth = document.documentElement.clientWidth,
	scale = deviceWidth/640;
	document.body.style.zoom = scale;
	$("#cover").height(document.documentElement.clientHeight/scale);
}

window.onresize = function(){
	resetPage();
}
$(document).ready(function(e) {
	resetPage();
});

function loadProData() {
	var proOption = "<option value=''>省</option>";
	for (var i=0;i<cityArea.citylist.length;i++) {
		proOption += "<option value='" + cityArea.citylist[i].p + "'>" + cityArea.citylist[i].p + "</option>";
	}
	$("#province").empty().append(proOption).bind('change', function() {
		if (!$(this).val()) {
			return
		}
		loadCityData($(this).find('option:selected').val());
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
		//buyprice = $("#buyprice").val(),
		buycar = $("#cartype").val(),
		buytime = $("#buytime").val(),
		age = $("#age1").val() + '-' + $("#age2").val() + '-' + $("#age3").val(),
		sex = $("[name=isaccept]:checked").val(),
		alertInfo = '';
		
		
		
	
	if(trim(cityname) == ""){
		alertInfo = "请选择城市！\n";
		$(".alertText").hide();
		$("#alert-1").show();
		$(".alertButton").hide();
		$("#alertButton-1").show();
	}
	if(trim(provincename) == ""){
		alertInfo = "请选择省份！\n";
		$(".alertText").hide();
		$("#alert-1").show();
		$(".alertButton").hide();
		$("#alertButton-1").show();
	}
	
	if(email == ""){
		alertInfo = "请输入正确的手机格式！\n";
		$(".alertText").hide();
		$("#alert-1").show();
		$(".alertButton").hide();
		$("#alertButton-1").show();
	}else if(matchEmail(email)==false ){
		alertInfo = "请输入正确的手机格式！\n";
		$(".alertText").hide();
		$("#alert-9").show();
		$(".alertButton").hide();
		$("#alertButton-2").show();
	}
	
	if(mobile == ""){
		alertInfo = "请输入正确的手机格式！\n";
		$(".alertText").hide();
		$("#alert-1").show();
		$(".alertButton").hide();
		$("#alertButton-1").show();
	}else if(matchMobile(mobile)==false ){
		alertInfo = "请输入正确的手机格式！\n";
		$(".alertText").hide();
		$("#alert-9").show();
		$(".alertButton").hide();
		$("#alertButton-2").show();
	}else{
		$.cookie("pom",mobile);
	}
	if(name == ""){
		alertInfo = "请输入您的姓名！\n";
		$(".alertText").hide();
		$("#alert-1").show();
		$(".alertButton").hide();
		$("#alertButton-1").show();
	}

	if(alertInfo){
		alertMsg(alertInfo);
		isSubmit = false;
		return false;
	}else{
		
		
		var userInfo = {		
			advid:"500",		            
			realname: name,
			sex:sex,
			mobile : mobile,
			email : email,
			provincename:provincename,
            cityname:cityname,
			expand1:age,
            expand2:buycar,
			expand3:buytime
		};
		$.ajax({
				url : 'http://track.mobile1.com.cn/advmessage/adv/addResultJsonP.action',
				cache : false,
				dataType : 'jsonp',
				jsonpCallback : "eventcallback",
				data : userInfo,
				success : function(json) {
					if (json[0].success == 1) {
						closeMsg();
						$('#popup3').show();
						$("#alert-4").show();
						$("#alertButton-4").show();
					} else {
						alertMsg(json[0].info);
						$(".alertText").hide();
						$("#alert-3").show();
						$(".alertButton").hide();
						$("#alertButton-3").show();
						isSubmit = false;
					}
				}
			});
			
		
	}
}
function share(i){
	var shareText = ["我在参与斯柯达“聪明主义”活动，分享你的聪明主意，即有机会获取奖品，你也快来参加吧！",
	"斯柯达聪明主义，幸运注册赢好礼，快来吧！"];
	
	window.open("http://service.weibo.com/share/share.php?url=&appkey=&title=" + encodeURIComponent(shareText[i]+document.location) + "&pic=&ralateUid=&language=", "_blank");	

}




