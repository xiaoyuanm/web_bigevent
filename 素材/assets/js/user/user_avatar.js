$(function () {
    let layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,//裁剪框什么形状 16/9是长方形   1/1是正方形  也可以是数值0.75
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    // 为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function () {
        $('#file')[0].click()


    })

    // 为文件选择框绑定 change 事件
    $('#file').on('change', function (e) {
        // 获取用户选择的文件
        let filelist = e.target.files  //e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }

        // 1. 拿到用户选择的文件  拿到用户选择的文件
        let file = e.target.files[0]//let file=e.target.files[0]
        // 2. 将文件，转化为路径   将文件，转换为路径
        let imgURL = URL.createObjectURL(file) //  var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域     重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    $('#btnUpload').on('click', function () {
        // 1. 要拿到用户裁剪之后的头像   
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布    画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2. 调用接口，把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: 'http://www.liulongbin.top:3007/my/update/avatar',
            data: {
                avatar: dataURL//用户新头像  avatar：dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                // window.parent.getUserInfo()
                window.parent.getUserInfo()//调用父页面里面的方法。重新渲染头像
            }
        })
    })

})


// let file = document.querySelector('#file')
// file.onchange = (e) => {
//     let filelist = e.target.files
//     console.log(filelist);
// }
