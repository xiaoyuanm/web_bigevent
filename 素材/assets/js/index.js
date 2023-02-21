$(function () {
    // 调用getUserInfo获取用户的基本信息
    getUserInfo()

    let layer = layui.layer


    // 点击退出按钮，实现推出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            // 1.清空本地存储的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面  location
            location.href = 'login.html'

            layer.close(index);
        });
    })
})


function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        // 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar渲染用户的头像
            renderAvatar(res.data)

        },

        // 无论成功还是失败，最终都会调用complete回调函数
        // complete: function (res) {
        //     console.log('ok2');
        //     // console.log('ok1');
        //     // console.log(res);
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器相应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1. 强制清空 token
        //         localStorage.removeItem('token')
        //         // 2. 强制跳转到登录页面
        //         location.href = 'login.html'
        //       }
        // }
    })
}


// 渲染用户的名字和头像
function renderAvatar(user) {
    // 1.获取用户名称
    let name = user.nickname || user.username
    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)//直接拼接即可

    // 3渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}