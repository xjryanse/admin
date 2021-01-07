var sUserAgent = navigator.userAgent.toLowerCase();
var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
if(bIsIphoneOs){
	window.addEventListener('focusout', function () {
	　  //软键盘收起的事件处理
		setTimeout(()=>{
			window.scrollTo(0 ,document.documentElement.scrollTop || document.body.scrollTop);
		})
	});
}