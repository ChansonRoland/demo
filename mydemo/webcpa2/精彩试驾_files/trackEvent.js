/********************************************code start*********************************************************/
(function(window){
	var urlParam = ["cmsp","uidtype","idfa"];
	for(var i = 0;i<urlParam.length;i++){
        if(request(urlParam[i]) && localStorage){
            localStorage.removeItem(urlParam[i]);
            localStorage.setItem(urlParam[i],request(urlParam[i]));
        }
    }
})(window);
var trackPath = "http://track.mobile1.com.cn/tracknew/advTract/tractEventJsonP.action?";
var trackScript;
function track(cId, eventId, url) {
    var trckCmspData={ cmsp:"",uidtype:"",idfa:""};
    trckCmspData.cmsp=!(localStorage && localStorage.getItem('cmsp'))?"":localStorage.getItem('cmsp');
    trckCmspData.uidtype=!(localStorage && localStorage.getItem('uidtype'))?"":localStorage.getItem('uidtype');
    trckCmspData.idfa=!(localStorage && localStorage.getItem('idfa'))?"":localStorage.getItem('idfa');
    trackScript = null;
    trackScript = document.createElement("script");
    var src = trackPath + "cid=" + cId + "&eventid=" + eventId+"&cmsp="+trckCmspData.cmsp+"-"+trckCmspData.idfa+"____"+trckCmspData.uidtype;
    trackScript.type = "text/javascript";
    trackScript.src = src;
    document.getElementsByTagName("head")[0].appendChild(trackScript);
    if (url != undefined && url != null && url != "") {
        setTimeout(redirection, 500);
        function redirection() {
            window.location = url;
        }
    }
}
function eventcallback(result) {
    if(typeof trackScript==='undefined')
        return;
    document.getElementsByTagName("head")[0].removeChild(trackScript);
    trackScript=null;

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
/********************************************code end*********************************************************/
