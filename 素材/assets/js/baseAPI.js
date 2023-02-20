// 注意：每次调用$.get()或者$.post(),$.ajax()函数的时候
// 会先调用ajaxPrefilter
// 在这个函数里面，可以拿到我们给ajax提供的配置对象

$.ajaxPrefilter(function (options) {
    //在发起ajax请求之前，统一拼接请求的根路径
    console.log(options.url);
    
})