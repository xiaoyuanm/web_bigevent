$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd').val()) { //===
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd').val()) {//注意是   ！==
                return '两次密码不一致'
            }
        }
    })


    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://www.liulongbin.top:3007/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
                $('.layui-form')[0].reset()
            }
        })
    })
})  