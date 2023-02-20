$(function () {
    //点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登录的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    form.verify({
        // 自定义了一个pwd验证规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 验证两次密码是否一致
        repwd: function (value) {
            // 通过行参拿到的是确认密码框中的内容
            // 还需要拿到密码框的内容
            // 然后进行是否相等的判断
            // 如果判断失败，则return一个提示消息即可
            let pwd = $('.reg-box [name=password]').val()// 必须空格！！！！！！！！！！！    .reg-box [name=password]
            if (pwd !== value) {
                return '两次密码不一致，请重新输入'

            }
        }
    })


    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        let data = {
            username: $('#form_reg [name=username]').val(),  /// 必须空格！！！！！！！！！！！
            password: $('#form_reg [name=password]').val()
        }
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/reguser', data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                } else {
                    layer.msg('注册成功')

                    // 设置一个延时器  这个不至于马上跳转
                    let timer = setTimeout(function () {
                        $('#link_login').click()
                    }, 1000)

                }
            }
        })

        // $.post('http://www.liulongbin.top:3007/api/reguser', {
        //     username: $('#form_reg [name=username]').val(),
        //     password: $('#form_reg [name=password]').val()
        // }, function (res) {
        //     if (res.status !== 0) {
        //         return console.log(res.message);
        //     } else {
        //         console.log('注册成功');
        //     }
        // })
    })


    //监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login', 
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                } else {
                    layer.msg('登录成功')
                    // console.log(res.token);
                    // 将登录成功得到的token字符串，保存到localStorage
                    localStorage.setItem('token',res.token)
                     location.href = 'index.html'

                }
            }
        })
    })
})