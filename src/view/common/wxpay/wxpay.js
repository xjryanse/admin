    //jsApiParameters:
    //jsApi参数
    //必须先引入微信js才能使用
    var jsApiParameters;
    //微信支付回调通知接口
    var wxPayCallBackUrl = '';
    //调用微信支付接口
    function onBridgeReady() {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            jsApiParameters,
            function (res) {
                console.log(res);
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    window.location.href = wxPayCallBackUrl;
                }
            });
    }
    //调用微信支付接口
    function callWxPay() {
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
    }