var api_url = 'http://catsite.ogilvy.com.cn/CatWajiWebService.asmx?op=';
var api_url_news = 'http://www.catwaji.com/club/';
var StrToken = 'a889810174804b9b-93511cde053f4586';

function api(url,data,success,error){
    //showLoadding();
    $.ajax("http://newcms.mobile1.com.cn/advmessage/advthird/accessJsonP.action",
           {dataType:'jsonp',
            eventcallback:'callback1',
            data:({submitinfo:JSON.stringify({url:url,data:data}),submittype:'get',rettype:'json',callback:'callback1'}),
            success:function(res){
				//hideLoadding();
				success(res,data);
			},
			error:function(err){
				//hideLoadding();
				error(err);
			}
        });
    
}
var userName = '';

function $$(id){
    return document.getElementById(id);   
}
function _(className){
    return document.getElementsByClassName(className);
}
function login(){
    //dataLayer.push({'event':'event','category':'全网','action':'浮层登录','label':'登录浮层'});

    
    var mobile = $('#loginMobile').val();
    if(!matchMobile(mobile)){
        alertMsg('请输入正确的手机号');
        return;
    }
    
    
    api(api_url_news + 'api/users/',{id:'2',Mobileno:mobile},
        function(res){
            //alert(JSON.stringify(res));
            //处理服务器返回的值
            if(res.ErrorCode == 0){
                userName = res.username;
                localStorage.setItem('usertype',res.usertype);
                localStorage.setItem('isvip',res.IsVip);
                localStorage.setItem('userid',res.uid);
                localStorage.setItem('userarea',res.userarea);
                localStorage.setItem('name',decodeURIComponent(decodeURIComponent( res.username)));
                localStorage.setItem('mobile',mobile);
                //alert(JSON.stringify(getUser()));
                //dataLayer.push({'event':'event','category':'全网','action':'浮层登录成功','label':'登录浮层'});
				//history.back();
                location = 'p_2g01.html'
            }else{
                alertMsg('登录失败');   
            }
        }
    );
    
    
    /*
    $.ajax('http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20057&expand2=login',{
       type:"post",dataType:'jsonp',
            eventcallback:'callback2',
        data:{mobile:mobile},
        success:function(res){
            if(res[0].success == 1){
                if(res[0].ServiceReturn.flag){
                    userName = res[0].ServiceReturn.name;
                    localStorage.setItem('userid',res[0].ServiceReturn.userid);
                    localStorage.setItem('name',res[0].ServiceReturn.name);
                    localStorage.setItem('mobile',mobile);
                    $("#username").text(userName);
                    $("#title_login").hide();
                    $("#loginD1,.menuLogoutForm").show();
                    $(".cover,.popupAlert,.menuLoginForm").hide();
                }else{
                    alertMsg('登录失败');   
                }
            }
        }
    });
    */
    
    
}

function reg(){
    var realname = $('#regName').val();
    var mobile = $('#regMobile').val();
    if(realname == ""){
        alertMsg('请输入您的姓名');
        return;
    }
    if(!matchMobile(mobile)){
        alertMsg('请输入正确的手机号');
        return;
    }
     var para = {id:'0',mobileno:mobile,usertype:encodeURIComponent('机手'),username:encodeURIComponent(realname),userarea:encodeURIComponent('北京|北京'),regsource:'CATCLUB-WAP',mediasource:(localStorage.getItem('mediasource')?localStorage.getItem('mediasource'):'')};
    
    para.openid = para.mobileno;
    
    /*
    api(api_url_news + 'api/users/',para,
        function(res){
            //处理服务器返回的值
            if(res.ErrorCode == 0){
                localStorage.setItem('userid',res.uid);
                localStorage.setItem('isvip',1);
                
                localStorage.setItem('name',realname);
                localStorage.setItem('mobile',mobile);
                
                alertMsg('注册成功');
                location = 'p_2g01.html'
            }else{
                alertMsg("提交失败");
            }
        });
    */
    $.ajax('http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20057&expand2=regist',{
       type:"post",dataType:'jsonp',
            eventcallback:'callback3',
        data:{mobile:mobile,realname:encodeURIComponent(realname),description:(localStorage.getItem('mediasource')?localStorage.getItem('mediasource'):'')},
        success:function(res){
            if(res[0].success == 1){
                if(res[0].ServiceReturn.flag){
                    userName = res[0].ServiceReturn.name;
                    localStorage.setItem('userid',res[0].ServiceReturn.userid);
                    localStorage.setItem('isvip',0);
                    localStorage.setItem('name',realname);
                    localStorage.setItem('mobile',mobile);
                    
                    alertMsg('注册成功');
                    location = 'p_2g01.html'
                }else{
                    alertMsg(res[0].ServiceReturn.errmessage);
                }
                
            }
        }
    });
}

function xunjia(){
    /*
    var user = getUser();
    if(!user){
        location = 'p_2g06.html';
        return;
    }*/
    
    var realname = $('#xunjiaName').val();
    var mobile = $('#xunjiaMobile').val();
    var sex = '';//$('[name=xunjiaSex]:checked').val();
    var prov = '';//$('#xunjiaProv').val();
    var city = '';//$('#xunjiaCity').val();
    if(realname == ""){
        alertMsg('请输入您的姓名');
        return;
    }
    if(!matchMobile(mobile)){
        alertMsg('请输入正确的手机号');
        return;
    }
    var para = {id:'0',mobileno:mobile,usertype:'有购机意向',username:realname,userarea:'北京|北京',regsource:'CATCLUB-WAP',mediasource:(localStorage.getItem('mediasource')?localStorage.getItem('mediasource'):'')};
    para.username = encodeURIComponent(para.username);
    para.userarea = encodeURIComponent(para.userarea);
    para.usertype = encodeURIComponent(para.usertype);
    para.openid = para.mobileno;
    api(api_url_news + 'api/users/',para,
        function(res){
            //处理服务器返回的值
            //if(res.ErrorCode == 0){
			try{
                localStorage.setItem('userid',res.uid);
                localStorage.setItem('isvip',1);
                localStorage.setItem('name',realname);
                localStorage.setItem('mobile',mobile);
				user.userid = res.uid;
				}catch(e){}
            //}else{
                //alertMsg("提交失败");
            //}
            var user = getUser();
    $.ajax('http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20057&expand2=enquire',{
       type:"post",dataType:'jsonp',
            eventcallback:'callback3',
        data:{mobile:mobile,uid:user.userid,realname:encodeURIComponent(realname),sex:sex,provinceid:prov,cityid:city,description:(localStorage.getItem('mediasource')?localStorage.getItem('mediasource'):'')},
        success:function(res){
            if(res[0].success == 1){
                if(res[0].ServiceReturn.flag){
                    $(".cover,.popupAlert").hide();
                    
                    //alertMsg('询价成功');
                    //showXunjiaOK();
					window.location.href = "p_2g08.html";
                    //dataLayer.push({'event':'event','category':'全网','action':'浮层询价成功','label':'注册询价浮层'});

                }else{
                    window.location.href = "p_2g08.html";
                    //alertMsg(res[0].ServiceReturn.errmessage);
					//alertMsg(JSON.stringify(res));
                }
				//history.back();
            }
        }
    });
        });
    
    
    
}


function getUser(){
    if(localStorage.getItem('userid')){
        return {userid:localStorage.getItem('userid'),name:localStorage.getItem('name'),mobile:localStorage.getItem('mobile'),isvip:localStorage.getItem('isvip'),userarea:localStorage.getItem('userarea'),usertype:localStorage.getItem('usertype')};
    }
    return false;
}

function logout(){
    localStorage.removeItem('userid');
    localStorage.removeItem('name');
    localStorage.removeItem('mobile');
    localStorage.removeItem('isvip');
    localStorage.removeItem('usertype');
    localStorage.removeItem('userarea');
    //$("#title_login,.menuLoginForm").show();
	$("#unlogin-status").show();
    //$("#loginD1,.menuLogoutForm,.cover,.popupAlert").hide();
	$("#login-status").hide();
	window.location.reload();
}

function addUser(isReg){
    
    var para = {id:'0',mobileno:'',usertype:'',username:'',userarea:'',regsource:'CATCLUB-WAP',mediasource:(localStorage.getItem('mediasource')?localStorage.getItem('mediasource'):'')};
    
    if(isReg){
        para.username = $("#zhuceName").val();
        para.usertype = $("[name=zhuceRole]:checked").val();
        para.userarea = $$("zhuceProv").selectedOptions[0].innerText + '|' + $$("zhuceCity").selectedOptions[0].innerText;
        para.mobileno = $("#zhuceMobile").val();
    }else{
        var user = getUser();
        
        para.username = user.name;
        para.usertype = $("[name=jihuoRole]:checked").val();
        para.userarea = $$("jihuoProv").selectedOptions[0].innerText + '|' + $$("zhuceCity").selectedOptions[0].innerText;
        para.mobileno = $("#jihuoMobile").val();
    }
    para.username = encodeURIComponent(para.username);
    para.userarea = encodeURIComponent(para.userarea);
    para.usertype = encodeURIComponent(para.usertype);
    para.openid = para.mobileno;
    
    api(api_url_news + 'api/users/',para,
        function(res,para){
            //处理服务器返回的值
            if(res.ErrorCode == 0){
                localStorage.setItem('userid',res.uid);
                localStorage.setItem('isvip',1);
                localStorage.setItem('name',decodeURIComponent(para.username));
                localStorage.setItem('mobile',para.mobileno);
                
                alertMsg("提交成功");
                location = 'p_2g12.html';
            }else{
                alertMsg("提交失败");
            }
        });
}
function jihuoUser(isReg){
    
    var para = {id:'3',mobileno:'',usertype:'',userarea:'',"regsource":"CATCLUB-WAP"};
    
        var user = getUser();
        
        para.usertype = $("[name=jihuoRole]:checked").val();
        para.userarea = $$("jihuoProv").selectedOptions[0].innerText + '|' + $$("jihuoCity").selectedOptions[0].innerText;
        para.mobileno = $("#jihuoMobile").val();
    
    para.userarea = encodeURIComponent(para.userarea);
    para.openid = para.mobileno;
    
    api(api_url_news + 'api/users/',para,
        function(res,para){
            //处理服务器返回的值
            if(res.ErrorCode == 0){
                localStorage.setItem('userid',res.uid);
                localStorage.setItem('isvip',1);
                localStorage.setItem('mobile',para.mobileno);
                
                alertMsg("激活成功");
                location = document.referrer;
            }else{
                alertMsg("提交失败");
            }
        });
}
function verUser(){
    var user = getUser();
    var mobile = '';
    if(user && user.mobile){
        mobile = user.mobile;
    }else{
        
    }
    api(api_url_news + 'api/users/',{id:'2',Mobileno:mobile},
        function(res){
            //处理服务器返回的值
            if(res.ErrorCode == 0){
                localStorage.setItem('usertype',res.usertype);
                localStorage.setItem('isvip',res.IsVip);
                localStorage.setItem('userarea',res.userarea);
            }else{
                alertMsg("提交失败");
            }
    });
}

function addQa(){
    var user = getUser();
    if(!user){
        location = 'p_2g06.html';
        return;
    }
    
    var biaoti = $('#biaoti').val();
    var fenlei = $('#fenlei').val();
    if(biaoti == ""){
        alertMsg('请输入问题标题');
        return;
    }
    
    //获取页面的值并判断不能为空。
    api(api_url_news + 'api/qa/',{id:'0',Qatype:encodeURIComponent(fenlei),machinetype:'',Qatitle:encodeURIComponent(biaoti),Qadesc:encodeURIComponent('无'),mobileno:user.mobile,sourceid:'1'},//将值传给服务器
        function(res){
            //处理服务器返回的值
            if(res.ErrorCode == 0){
                alertMsg("提交成功");
                location.reload();
            }else{
                alertMsg("提交失败");
            }
            
        },function(err){
            
        }
    );
}
function getQa(){
    api(api_url_news + 'api/qa/',{id:'1',pagenumber:'1',pagesize:'10'},
        function(res){
            if(res.ErrorCode == 0){
                var html = '';
                for(var i=0;i<res.qalist.length;i++){
                    html += '<div class="content_one4">'+
                                '<div class="p1">'+
                                    '<span style="font-size:21px">' + res.qalist[i].Qatitle + '</span>' +
                                '</div>'+
                                '<span class="content_one4_top" style="padding:10px 30px;">' + res.qalist[i].Qadesc + '</span>' +
                            '</div>';
                }
                //$('.content_four,.content_five').hide();
                $("#content_one4").html(html);
				
            }
        },function(err){
            
        }
    );
	
}
var qalist = [{Qatitle:'320D2挖掘机和之前的Cat 320D有什么区别？',Qadesc:'Cat 320D2挖掘机是卡特彼勒公司专门面向中国市场发布的机型，该系列是基于之前机型Cat 320D的稳健表现开发出来的。这是一款非常可靠而高效的机型，通过减少燃油消耗和简化日常维护，320D2系列能够降低用户的运营成本。Cat 320D2挖掘机系列配备全新的发动机、高效的液压系统、坚固耐用的主结构和改良的操作台。'},
              {Qatitle:'320D2挖掘机的发动机有什么样的改进？',Qadesc:'Cat 320D2机型采用了C7.1发动机，这款发动机符合美国环保署二级排放标准、欧盟第二阶段排放标准和中国非道路移动机械用柴油机排气污染物排放限值及测量方法（第二阶段）法规要求。经过现场验证的 C7.1 发动机的设计旨在方便维修，它能在高达 4000 米（13120\'）的海拔下高效工作。与其前代产品相比，新型发动机可降低约 3% - 5% 的油耗，具体节油情况视型号而定。'},
              {Qatitle:'320D2挖掘机的液压系统有什么样的特点？',Qadesc:'Cat 320D2机型采用的液压系统，其主安全阀压力为35,000千帕（5,076磅/平方英寸），最大燃油流量为2 x 202 升/分钟（53加仑/分钟），它能够提供高液压功率以满足挖掘、吊装以及重型液压动力工作工具使用的需求。让操作人员能够快速切换工装设备，实现任务间的顺利转换，最大限度提升了设备使用率。现场安装用辅助液压套件备有＊定制软管和管路，用户随时可以进行快速安装。先导型液压系统操作省力，控制精确，可最大限度地提高工作效率。动臂和斗杆油路再生系统能够在动臂下降和斗杆操作过程中节约能耗、减少循环时间并提升设备的整体燃油效率。'},
              {Qatitle:'320D2挖掘机的操作室有什么样的特点？',Qadesc:'Cat 320D2挖掘机的操作台设计符合人机工程学原理，运行安静而舒适。操作室配有一个全彩液晶显示器。标准悬浮座椅可进行多向调节以适合不同身材操作手的使用，操作舒适度得到了大幅提升。Cat 320D2挖掘机的大车窗设计确保了最佳的全方位视野，提升了作业的安全性。驾驶室的粘性橡胶座椅能够减少传输到操作台的振动和噪音，操作舒适度和生产效率得以进一步提升。另外，320D2还设置了一个可打开的大型金属天窗，驾驶室的视野与空气流通得到全面的保障。'},
             ];
function getQa1(){
    var html = '';
    for(var i=0;i<qalist.length;i++){
        html += '<div class="content_one4">'+
                    '<p>'+
                        '<span style="font-size:22px;">'+qalist[i].Qatitle+'</span>'+
                    '</p>'+
                    '<span class="content_one4_top" style="padding:10px 30px;">'+qalist[i].Qadesc+'</span>'+
                '</div>';
    }
    $("#content_one4").html(html);
    
}
var ver;
function getver(){
    var mobile = $('#zhuceMobile').val();
    if(!matchMobile(mobile)){
        alertMsg('请输入正确的手机号');
        return;
    }
    $.ajax('http://newcms.mobile1.com.cn/advmessage/code/createcode.action?advid=20057&mobile='+mobile,
            {dataType:'json',
                success:function(data){
                if(data.success == 1){
                    ver = data.code;
                    alertMsg('发送成功');
                }else{
                    alertMsg('发送失败');
                }
            },error:function(){
                alertMsg('发送失败');
            }});
   
}
function getver1(){
    var mobile = $('#jihuoMobile').val();
    if(!matchMobile(mobile)){
        alertMsg('请输入正确的手机号');
        return;
    }
    $.ajax('http://newcms.mobile1.com.cn/advmessage/code/createcode.action?advid=20057&mobile='+mobile,
            {dataType:'json',
                success:function(data){
                if(data.success == 1){
                    ver = data.code;
                    alertMsg('发送成功');
                }else{
                    alertMsg('发送失败');
                }
            },error:function(){
                alertMsg('发送失败');
            }});
   
}
function zhuce(){
    if($('#zhuceVer').val() != ver){
        alertMsg('验证码错误');
        return;
    }
    addUser(true);
}
function jihuo(){
    if($('#jihuoVer').val() != ver){
        alertMsg('验证码错误');
        return;
    }
    jihuoUser(false);
}

function toDealerPage(){
    try{
        if(location.pathname.lastIndexOf('/pro') > -1){
            var i = parseInt( location.pathname.substring(location.pathname.lastIndexOf('/pro')+4,location.pathname.lastIndexOf('.html')-2))-1;
            var j = parseInt( location.pathname.substring(location.pathname.lastIndexOf('/pro')+6,location.pathname.lastIndexOf('.html')))-1;
            //dataLayer.push({'event':'event','category':typeList[i]+'产品详情页','action':'经销商','label':CarNames[i][j]});

        }
    }catch(ex){}
    
    setTimeout(function(){
	   window.location.href = "map.html";
    },100);
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
function alertMsg(msg){
    alert(msg);
}

window.onload = function(){
	
}

function goUrl(url){
    var user = getUser();
    if(user){
        location = url;   
    }else{
        location = 'p_2g06.html';
    }
}
function goZhuce(url){
    var user = getUser();
    if(!user){
        location = 'p_2g16.html';
    }else if(user.isvip != '1'){
        location = 'p_2g17.html';
    }else{
        location = url;
    }
}
    function autoXunjia(i,j,k){
        try{
    dataLayer.push({'event':'event','category':typeList[i-1]+'列表页','action':'即刻询价','label':CarNames[i-1][j-1]});
    }catch(a){}
    
        
        
        var user = getUser();
        if(!user){
            location = 'p_2g07.html';
            return false;
        }else{
            
            var para = {id:'0',mobileno:user.mobile,usertype:'有购机意向',username:encodeURIComponent(user.name),userarea:'北京|北京',regsource:'CATCLUB-WAP'};
            para.username = encodeURIComponent(para.username);
            para.userarea = encodeURIComponent(para.userarea);
            para.usertype = encodeURIComponent(para.usertype);
            para.openid = para.mobileno;
api(api_url_news + 'api/users/',para,
        function(res){
            //处理服务器返回的值
            if(res.ErrorCode == 0){
                localStorage.setItem('userid',res.uid);
                localStorage.setItem('isvip',1);
    
            }else{
                //alertMsg("提交失败");
            }
            
                    $.ajax('http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20057&expand2=enquire',{
                       type:"post",dataType:'jsonp',
                            eventcallback:'callback3',
                        data:{mobile:user.mobile,uid:user.userid,realname:encodeURIComponent(user.name),sex:'',provinceid:'',cityid:''},
                        success:function(res){
                            if(res[0].success == 1){
                                if(true || res[0].ServiceReturn && res[0].ServiceReturn.flag){
                                    $(".cover,.popupAlert").hide();

                                    //alertMsg('询价成功');
                                    location = 'p_2g08.html';
                                    dataLayer.push({'event':'event','category':'全网','action':'浮层询价成功','label':'注册询价浮层'});

                                }else{
                                     location = 'p_2g08.html';
                                    dataLayer.push({'event':'event','category':'全网','action':'浮层询价成功','label':'注册询价浮层'});
                                }
                            }
                        }
                    });
            
            
             });
        }
        return false;
    }
    function includeLinkStyle(url) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }
$(document).ready(function(){
    var user = getUser();
	if(user){
		$(".unlogin-status").hide();
		$(".login-status").show();
		document.getElementById("login-useName").innerHTML = user.name;
	}
	else{
		$(".unlogin-status").show();
		$(".login-status").hide();
		$("#login-useName").innerHTML = "";
	}
    
    if(request('utm_source') || request('utm_medium')|| request('utm_term')|| request('utm_campaign')){
        localStorage.setItem('mediasource',request('utm_source')+','+request('utm_medium')+','+request('utm_campaign')+','+request('utm_term'));
    }
    if(request('hmsr') || request('hmmd')|| request('hmpl')|| request('hmkw')){
        localStorage.setItem('mediasource',request('hmsr')+','+request('hmmd')+','+request('hmpl')+','+request('hmkw'));
    }
    
   $('body').append('<div class="cover"></div>'); 
    
    $('input').bind('focus',function(){
       $('.cover').hide(); 
    });
    $('input').bind('blur',function(){
       $('.cover').show(); 
    });
    
});
var typeList = ['小型机','中型机','大型机','轮挖','装载机'];
var CarNames = [
	['313D重型应用液压挖掘机',
	'318D/318DL重型应用液压挖掘机',
	'312D GC 系列2 液压挖掘机',
	'306E 小型挖掘机',
	'307E 小型挖掘机',
	'313D系列2液压挖掘机',
	'305.E 小型液压挖掘机'],
	['320DGC/320D/320DL液压挖掘机',
	'323D/323DL液压挖掘机',
	'324D液压挖掘机',
	'326DL液压挖掘机',
	'329D/329DL液压挖掘机',
	'320D系列2液压挖掘机'],
	['336D/336DL液压挖掘机',
	'340DL液压挖掘机',
	'349D/349DL液压挖掘机',
	'374DL液压挖掘机',
	'385CFS正产式液压挖掘机',
	'390D/390DL液压挖掘机',
	'336D 系列2液压挖掘机'],
	['M318D轮式挖掘机',
	'M322D轮式挖掘机',
	'M315D2轮式挖掘机',
	'M317D2轮式挖掘机',
	'M318D MH 物料搬运机',
	'M322D MH 物料搬运机'],['950GC']];
function downPDF(i,j,k){
    try{
    dataLayer.push({'event':'event','category':typeList[i-1]+'列表页','action':'产品手册','label':CarNames[i-1][j-1]});
    }catch(a){}
    
    
    var user = getUser();
    if(!user){
        location = 'p_2g06.html';
        return false;
    }
    
    location = 'p_2g23.html?url='+encodeURI('http://catwaji.mobileone.com.cn/pro' + (i+1) + '_' + (j+1) + '.html');
}
function ga(i,j){
    try{
    dataLayer.push({'event':'event','category':typeList[i-1]+'列表页','action':'查看详情','label':CarNames[i-1][j-1]});
    }catch(a){}
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
