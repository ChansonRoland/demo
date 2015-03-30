var api_url = "http://ama.adwo.com/advmessage/qnnaire/commit.action";
if(request("cmsp")){
    localStorage.removeItem("cmsp");
    localStorage.setItem("cmsp",request("cmsp"));
}

function submitData(data,fuc){
	data.cmsp=!(localStorage.getItem('cmsp'))?"":localStorage.getItem('cmsp');
	$.ajax({
		url : api_url,
		timeout : 5000,
		cache : false,
		dataType : 'jsonp',
		jsonpCallback : "eventcallback",
		data : data,
		success : fuc,
		error:function (){
			alert("提交失败，请稍后重试");	
		}
	});
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

function matchMobile(val){
	var valnew = trim(val);
	if(valnew.match(/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/)){
		return true;
	}else{
		return false;
	}
}
function request(paras)
{ 
	var url = location.href; 
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
	var paraObj = {} 
	for (i=0; j=paraString[i]; i++){ 
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
	} 
	var returnValue = paraObj[paras.toLowerCase()]; 
	if(typeof(returnValue)=="undefined"){ 
		return ""; 
	}else{ 
		return returnValue; 
	} 
}