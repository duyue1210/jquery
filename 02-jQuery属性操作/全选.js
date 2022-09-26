$(function () {
    // 1.全选 全不选功能模块
    // 就是把全选按钮(checkall)的状态赋值给 三个小的按钮就可以了
    // 事件可以使用change
    $(".checkall").change(function () {
        // console.log(($(this).prop("checked")));
        $(".j-checkbox").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            // 让所有的商品添加类名
            $(".big").addClass("check-cart-item");
        } else {
            // 移除
            $(".big").removeClass("check-cart-item");
        }
    })
    // 2.如果小复选框被选中的个数等于3 就应该把全选按钮选上 否则全选按钮不选
    $(".j-checkbox").change(function () {
        // if (被选中的小的复选框的个数 === 3) {
        //     就要选中全选按钮
        // } else {
        //     不要全选按钮
        // }
        // console.log($(".j-checkbox:checked").length);
        // $(".j-checked").length这个是所有的小复选框的个数
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            // 让当前的商品添加类名
            $(this).parents(".big").addClass("check-cart-item");
        } else {
            // 移除
            $(this).parents(".big").removeClass("check-cart-item");
        }
    });
    // 3.增减商品数量模块 首先声明一个变量 当我们点击+号 就让这个值class 任何赋值给文本值
    $(".increment").click(function () {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        n++;
        $(this).siblings(".itxt").val(n);
        // 4.计算小模块 根据文本框的值 乘以当前商品的价格 就是商品的小计
        // 当前商品的价格p
        var p = $(this).parents(".add").siblings(".price").children().html()
        // console.log(p);
        p = p.substr(1)
        // console.log(p);
        var price = (p * n).toFixed(2)
        // 小计模块
        // toFixed() 保留几位小数
        $(this).parents(".add").siblings(".reque").children().html("￥" + price)
        getSum();
    })
    $(".decrement").click(function () {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false
        }
        n--;
        $(this).siblings(".itxt").val(n);
        var p = $(this).parents(".add").siblings(".price").children().html()
        // console.log(p);
        p = p.substr(1)
        // console.log(p);
        // 小计模块
        var price = (p * n).toFixed(2)
        $(this).parents(".add").siblings(".reque").children().html("￥" + price);
        getSum();
    });
    // 4.用户修改文本框的值 计算 小计模块
    $(".itxt").change(function () {
        // 先得到文本框的里面的值 乘以 当前商品的单价
        var n = $(this).val()
        var p = $(this).parents(".add").siblings(".price").children().html()
        // console.log(p);
        p = p.substr(1)
        $(this).parents(".add").siblings(".reque").children().html("￥" + (p * n).toFixed(2));
        getSum();
    })
    // 5.计算总计和总额模块
    getSum();
    function getSum() {
        var count = 0;//计算总件数
        var money = 0;//计算总价钱
        $(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum").text(count + '件')

        $(".reque li").each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1))
        })
        $(".price-sum").text('$' + money.toFixed(2))
    }
    // 6.删除商品模块
    // (1)商品后面的删除按钮
    $(".reduce li a").click(function () {
        // 删除的是当前的商品
        $(this).parents(".name1").remove();
        getSum();

    })
    // (2)删除选中的商品
    $(".p-action a").click(function () {
        $(".j-checkbox:checked").parents(".name1").remove();
        getSum();
    })
    // (3)清空购物车 删除全部商品
    $(".s-action a").click(function () {
        $('.name1').remove();
        getSum();
    })
})