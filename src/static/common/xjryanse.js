/**
 * 请求ajax进行内容替换
 * @param {type} itemId     
 * @param {type} url
 * @returns {undefined}
 */
function ajaxContentChange(itemId, url) {
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