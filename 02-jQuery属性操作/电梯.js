$(function () {
    // 当我们点击了小li 此时不需要执行 页面滚动事件里面的li的背景选择添加current
    // 节流阀 互斥锁
    var flag = true;
    // 1.显示隐藏电梯导航
    var shopping = $(".floor").offset().top;
    console.log(shopping);
    console.log($(document).scrollTop());
    toggleTool();
    function toggleTool() {
        if ($(document).scrollTop() >= shopping) {
            $(".daohang").fadeIn()
        } else {
            $(".daohang").fadeOut()
        }
    }
    $(window).scroll(function () {
        toggleTool();
        // 3.页面滚动到某个内容区域 左侧电梯导航栏小li相应添加和删除current类名
        if (flag) {
            $(".floor .d1").each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".daohang li").eq(i).addClass("current").siblings().removeClass("current")
                }
            })
        }
    });



    // 2.点击电梯导航页面可以滚动到相应的内容区域
    $(".daohang li").click(function () {
        flag = false
        console.log($(this).index());
        // 当我们每次点击小li 就要计算出页面要去往的位置 选出对应索引号的内容区的盒子 计算他的offset().top
        var current = $(".floor .d1").eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $("body,html").stop().animate({
            scrollTop: current
        }, function () {
            flag = true;
        });
        // 点击之后 让当前的小li添加current类名 姐妹移除current类名
        $(this).addClass("current").siblings().removeClass("current");

    })
})