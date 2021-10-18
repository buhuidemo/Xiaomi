getCartGoods();
var check = document.querySelectorAll('.check');
var checkLen = check.length;
// alert(check.length);

//获取商品前面的复选框
var single = document.querySelectorAll('.single');
var singleLen = single.length;
var itemBox = document.querySelectorAll('.item-box');
var itemBoxLen = itemBox.length;


for (var i = 0; i < checkLen; i++) {
    check[i].onclick = function (e) { //给复选框添加点击事件
        //选择的记录数
        var count = 0;
        //判断得到全选
        if (e.target.getAttribute('id') == 'all') {
            //把全选的状态赋给下面的每一个单选
            for (var j = 0; j < singleLen; j++) {
                single[j].checked = this.checked;
            }
        }

        for (var k = 0; k < singleLen; k++) {
            if (single[k].checked) {
                count++;
            }
            if (count == single.length) {
                check[0].checked = true;
            } else {
                check[0].checked = false;
            }
        }
        fTotal();
    }
}

//给商品每一行添加事件
for (var i = 0; i < itemBoxLen; i++) {
    itemBox[i].onclick = function (e) {
        var input = this.getElementsByTagName('input')[1];
        var num = input.value;
        let goodsPrice = this.querySelector('.col-price').innerHTML;
        switch (e.target.className) {
            case 'add':
                input.value = parseInt(input.value) + 1;
                fTotalSum(this);
                addFn(e.target, goodsPrice)
                break;
            case 'reduce':
                input.value = parseInt(input.value) - 1 <= 1 ? 1 : parseInt(input.value) - 1;
                fTotalSum(this);
                reduceFn(e.target, goodsPrice)
                break;
            case 'col col-action u-r':
                var con = confirm('是否确定删除该商品？');
                if (con) {
                    this.parentNode.removeChild(this);
                    deleteFn(e.target, goodsPrice);
                }
                break;
                // layer.confirm('是否删除该商品？',{
                //     btn:['确定','取消']
                // },function(index){
                //     layer.close(index);
                //     this.parentNode.removeChild(this);

                // })
        }
    }
    fTotal();
}

//封装一个函数用于更新购物车数据
function modLocal(num, goodsPrice) {
    //获取local中的数据
    let gd = localStorage.getItem('cart');
    //如果local中没有数据则清空
    if (!gd) {
        return;
    }
    //将获取的local数据转换成json对象数组
    gd = JSON.parse(gd);
    //遍历json对象
    gd.forEach((goods, index) => {
        //找到local中当前点击的商品
        if (goods.price - 0 == goodsPrice) {
            if (num) { //如果参数里面有数量，则修改local中商品的数量
                goods.num = num;
            } else {
                //没有数量，则删除该商品数据
                gd.splice(index, 1);
            }
        }
    });
    //将更新后的数据重新存入local中
    localStorage.setItem('cart', JSON.stringify(gd));
    // console.log(gd);
    // console.log(document.getElementsByTagName('input')[1]);
    // getCartGoods();
};

//小计
function fTotalSum(That) {
    var num = That.getElementsByTagName('input')[1].value; //获取当前行的商品数量
    var price = parseInt(That.querySelector('.col-price').innerHTML); //获取当前行的商品单价
    That.querySelector('.col-sum').innerHTML = num * price ; //最终小计的值
}

//总数、合计
function fTotal() {
    var totalPrice = document.getElementById('totalPrice');
    var totalNum = document.getElementById('totalNum');
    var num = 0; //数量总和
    var price = 0; //总价
    var itemBox = document.querySelectorAll('.item-box'); //每一行商品
    var itemBoxLen = itemBox.length;
    for (var i = 0; i < itemBoxLen; i++) {
        //如果选中则获取数量和价格
        if (itemBox[i].getElementsByTagName('input')[0].checked) {
            num += parseInt(itemBox[i].getElementsByTagName('input')[1].value);
            price += parseInt(itemBox[i].querySelector('.col-sum').innerHTML);
        }
    }
    totalNum.innerHTML = num;
    totalPrice.innerHTML = price;
    // console.log(num);
    // localStorage.setItem('key','num');
}
// localStorage.setItem('key','num');

//获取购物车数据
function getCartGoods() {
    let cartG = localStorage.getItem('cart');
    let html = '';
    JSON.parse(cartG).forEach(data => {
        // console.log(data);
        html += `<div class="item-box  u-clearfix" goods-id=${data.id}>
            <div class="col col-check u-l">
                <input type="checkbox" class="check single" style='margin-top:23px'>
            </div>
            <div class="col col-img u-l">
                <img src="${data.src}" style='width:45px;height:55px;margin-left:55px'>
            </div>
            <div class="col col-name u-l" style='margin-top:18px'>
                ${data.name}
            </div>
            <div class="col col-price u-l" style='margin-top:18px'> ${data.price}</div>
            <div class="col col-num u-l" style='margin-top:9px'>
                <div class="change-goods-num">
                    <a href="javascript:;;" class="reduce">-</a>
                    <input type="text" value="${data.num}">
                    <a href="javascript:;;" class="add">+</a>
                </div>
            </div>
            <div class="col col-sum u-l" style='margin-top:18px'>${data.price * data.num}</div>
            <div class="col col-action u-r" style='margin-top:18px'>×</div>
        </div>`;

    });
    // console.log(cartG);
    document.querySelector('.list-item').innerHTML = html;
}

//封装一个商品增加的方法
function addFn(tag, price) {
    let num = tag.previousElementSibling.value;
    let goodsprice = price;
    modLocal(num, goodsprice);
    fTotal();
}

//封装一个商品减少的方法
function reduceFn(tag, price) {
    let num = tag.nextElementSibling.value;
    let goodsprice = price;
    modLocal(num, goodsprice);
    fTotal();
}

//封装一个删除指定商品的方法
function deleteFn(tag, price) {
    let num = '';
    let goodsprice = price;
    let goodscheck = tag.parentNode.querySelector('.single'); // 获取单选框节点
    if (goodscheck.checked) {
        fTotal();
    }
    let single = document.querySelectorAll('.single');
    singleLen = single.length;
    if (singleLen == 0) {
        check[0].checked = false;
    }
    modLocal(num, goodsprice);
}