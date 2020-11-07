
var wxShareTitle;
var wxShareLink;
var wxShareContent;
var wxShareImg;

//固定回调函数，在封装外部定义
//wxShareCallBack = function(data,type){
//    
//}

/*以下部分已封装，一般无需动到*/
wx.config({
    debug: false,
    appId: wxAppId,
    timestamp: wxTimestamp,
    nonceStr: wxNonceStr,
    signature: wxSignature,
    jsApiList: [
        // 所有要调用的 API 都要加到这个列表中
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone'
    ]
});
wx.ready(function () {
    //分享到朋友圈
    wx.onMenuShareTimeline({
        title: wxShareTitle, // 分享标题
        link: wxShareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        desc: wxShareContent,
        imgUrl :wxShareImg,            
        success: function(data) {
            wxShareCallBack(data,'1');            
        },
    });
    //分享到朋友
    wx.onMenuShareAppMessage({
        title: wxShareTitle, // 分享标题
        link: wxShareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        desc: wxShareContent,
        imgUrl :wxShareImg,
        success: function(data) {
            wxShareCallBack(data,'2');
        },
    });
    //分享到QQ
    wx.onMenuShareQQ({
        title: wxShareTitle, // 分享标题
        link: wxShareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        desc: wxShareContent,
        imgUrl :wxShareImg,
        success: function(data) {
            wxShareCallBack(data,'3');            
        },
    });
    //分享到腾讯微博
    wx.onMenuShareWeibo({
        title: wxShareTitle, // 分享标题
        link: wxShareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        desc: wxShareContent,
        imgUrl :wxShareImg,
        success: function(data) {
            wxShareCallBack(data,'4');            
        },
    });
    //分享到QQ空间
    wx.onMenuShareQZone({
        title: wxShareTitle, // 分享标题
        link: wxShareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        desc: wxShareContent,
        imgUrl :wxShareImg,
        success: function(data) {
            wxShareCallBack(data,'5');            
        },
    });

});