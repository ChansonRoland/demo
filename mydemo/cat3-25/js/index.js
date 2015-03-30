$(document).ready(function(){
	$('.off,.off2,.off11,.off22').click(function(){
		$('.fixFrame,.fix2Frame,.bj').hide();
	});
	auto();
	$('.six2').click(function(){
		$('.bj,.fixFrame').show();
		var myscroll2 = new iScroll("fixS", {
            hScrollbar: false, vScrollbar: false, snap: true,momentum:false, onScrollEnd: function () { }
        });
		var myscroll = new iScroll("roll", {
            hScrollbar: false, vScroll: false, vScrollbar: false, snap: true,momentum:false, onScrollEnd: function () {
                num = this.currPageX;
                num
                $('.di li').css('background','#cacaca');
                $('.di li').eq(num).css('background','black');
            }
        });
	});
	$('.six3').click(function(){
    	$('.bj,.fix2Frame').show();
    	var myscroll3 = new iScroll("fix2S", {
            hScrollbar: false, vScrollbar: false, snap: true,momentum:false, onScrollEnd: function () { }
        });
    });
});
function resetPage() {
    var deviceWidth = document.documentElement.clientWidth,
    scale = deviceWidth / 640;
    document.body.style.zoom = scale;
}
window.onresize = function () {
    resetPage();
}
function auto(){
	$('.bj').css('height',$('.frame').height());
	$('.fixFrame,.fix2Frame').css({'top':(1000 - $('.fixFrame').height())/2,'left':(640 - $('.fixFrame').width())/2});
}