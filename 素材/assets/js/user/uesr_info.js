$(function () {

    let form = layui.form
    let layer = layui.layer



    form.verify({
        nackname: function (value) {
            if (value.length > 6) {
                return '昵称长度应为1~6之间！'
            }
        }
    })


    initUserInfo()

    // 初始化用户信息           和index.js里面的getUserInfo获取用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败!')
                }
                // return layer.msg('获取用户信息成功!')
                // 调用form.val快速为表单赋值
                form.val('formUserInfo', res.data)
            },
        })
    }



    // 重置表单数据
    $('#btnReset').on('click', function () {

        // 阻止表单的默认重置行为
        // initUserInfo()
        layer.msg('请输入')
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败!')
                }
                // return layer.msg('获取用户信息成功!')
                // 调用form.val快速为表单赋值
                $('.layui-form')[0].reset()
                $('#mc').val(res.data.username)

            },
        })
     
        

    })



    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()  //e.preventDefault()
        // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            data: $(this).serialize(),//$(this).resialize()
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息    
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                // window是当前页面
                // parent父亲里面的getUserInfo()
                window.parent.getUserInfo()
            }
        })
    })
})