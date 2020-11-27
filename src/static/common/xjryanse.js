//日期时间格式化
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**
 * 获取日期时间
 * @param {type} datetime
 * @param {type} diyformat
 * @returns {unresolved}
 */
function getDateTime( datetime,diyformat ){
    var date = new Date(datetime.replace(/\-/g, '/'));
    return date.Format( diyformat );
}

/**
 * 请求ajax进行内容替换
 * @param {type} itemId     
 * @param {type} url
 * @returns {undefined}
 */
function ajaxContentChange(itemId, url,callback) {
    $.ajax({
        url: url,
        type: 'POST',
        success: function (data) {
            //关闭弹层
            $('#' + itemId).html(data);
            if(callback){
                callback( data );
            }
        }
    });
}

/**
 * 以非ajax请求进行内容替换
 * @param {type} itemId     
 * @param {type} url
 * @returns {undefined}
 */
function contentChange(itemId, url,callback) {
    $.ajax({
        url: url,
        type: 'POST',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-Requested-With', {toString: function () {
                return '';
            }});
        },
        success: function (data) {
            //关闭弹层
            $('#' + itemId).html(data);
            if(callback){
                callback( data );
            }
        }
    });
}

/**
 * 压缩图片
 * @param {type} file
 * @param {type} callback
 * @returns {undefined}
 */
function compressImg(file,callback) {
    let fileObj = file;
    let reader = new FileReader();
    reader.readAsDataURL(fileObj); //转base64
    reader.onload = function(e) {
         let image = new Image(); //新建一个img标签（还没嵌入DOM节点)
        image.src = e.target.result;
        image.onload = function () {
            let canvas = document.createElement('canvas'), // 新建canvas
                context = canvas.getContext('2d'),
                rate = parseInt(image.width / 1000),
                data = '',
                imageWidth = image.width / rate,
                imageHeight = image.height / rate;
            if( rate == 0){
                callback( fileObj ); // 回调
                return ;
            }

            canvas.width = imageWidth;
            canvas.height = imageHeight;
            context.drawImage(image, 0, 0, imageWidth, imageHeight);
            data = canvas.toDataURL('image/jpeg'); // 输出压缩后的base64
            let arr = data.split(','), mime = arr[0].match(/:(.*?);/)[1], // 转成blob
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            let files = new window.File([new Blob([u8arr], {type: mime})], 'test.jpeg', {type: 'image/jpeg'}); // 转成file
            callback(files); // 回调
        }
    }
}

//全屏
fullscreen=function(){
    var docE = document.documentElement;
    if (docE.requestFullScreen) {
        docE.requestFullScreen();
    } else if (docE.mozRequestFullScreen) {
        docE.mozRequestFullScreen();
    } else if (docE.webkitRequestFullScreen) {
        docE.webkitRequestFullScreen();
    }
//    layer.msg('按ESC退出全屏');
}

//退出全屏
exitFullscreen=function(){
    var docE = document;
    if (docE.exitFullscreen) {
        docE.exitFullscreen();
    } else if (docE.mozCancelFullScreen) {
        docE.mozCancelFullScreen();
    } else if (docE.webkitCancelFullScreen) {
        docE.webkitCancelFullScreen();
    }
//    layer.msg('已退出全屏');
}

//获取表格动态宽度(用于表头表体分离)
getTableWidth = function(tableId){
    var tmpTable = $("#"+ tableId);
    var rows = tmpTable[0].rows;
    var cols = rows[0].cells;
    var widths = [];
    $.each( cols ,function (index, element) {
        widths.push(element.clientWidth);
    });
    return widths;
}

//上一个链接，用于back
var frLastUrl = '';     //上一个链接
var frThisUrl = '';     //本页面链接
//主内容改变
function mainContentChange(url){
    //异步加载首页内容
    ajaxContentChange("mainContent",url );
}
/**
 * 带加载的跳转
 * @returns {undefined}
 */
function jumpWithLoading( url ){
    $('.loading').show();
    frLastUrl   = frThisUrl;
    frThisUrl   = url;
//        window.location.href = url;
    mainContentChange( url );
}
/**
 * 带加载的返回
 * @returns {undefined}
 */
function backWithLoading(){
    $('.loading').show();
    mainContentChange( frLastUrl );
}
/**
 * 兼容ios回退刷新问题
 * @returns {undefined}
 */
$(function () {
    var isPageHide = false;
    window.addEventListener('pageshow', function () {
        if (isPageHide) {
        window.location.reload();
        }
    });
    window.addEventListener('pagehide', function () {
        isPageHide = true;
    });
});    

