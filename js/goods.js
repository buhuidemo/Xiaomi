class goods {
    constructor() {
        //获取localStorage中的数据
        let msg = localStorage.getItem('cart');
        msg = JSON.parse(msg);
        //获取节点
        this.src = document.querySelector('#src');
        this.name = document.querySelector('#name');
        this.price = document.querySelector('#price');
        this.cart = document.querySelector('#cart');
        //给加入购物车按钮绑定点击事件
        this.cart.addEventListener('click', this.addcart.bind(this));
    };
    //加入购物车按钮点击事件
    addcart() {
        //先获取购物车中的数据，判断购物车中是否已经存在商品
        let data = localStorage.getItem('cart');
        data = JSON.parse(data);
        // console.log(data);
        if (data) { //如果已经存在商品
            //遍历购物车判断当前要加入购物车的商品是否已经存在于购物车
            let exists = false; //当前要加入购物车的商品已经存在于购物车时为true，否则为false;
            data.forEach(v => {
                if (v.price == this.price.innerHTML - 0) {
                    //购物车中已经存在该商品
                    // console.log('已有该商品');
                    v.num = v.num - 0 + 1;
                    // console.log(v.num);
                    //改变exists的状态
                    exists = true;
                    // console.log(this.cart.goodsid);
                    // console.log(v.id);
                }
            });
            if (!exists) {
                //购物车中还没有该商品,则直接将商品添加到购物车
                data.push({
                    id: this.cart.goodsid,
                    name: this.name.innerHTML,
                    price: this.price.innerHTML,
                    num: 1,
                    src: this.src.src
                });
            }

            //将数据进行存储
            localStorage.setItem('cart', JSON.stringify(data));

        } else { //如果还没有商品，就直接将商品信息存入购物车
            //建立要加入购物车的商品对象存储商品的信息
            let tempGoods = {
                id: this.cart.goodsid,
                name: this.name.innerHTML,
                price: this.price.innerHTML,
                num: 1,
                src: this.src.src
            };
            //以数组的形式存储商品
            let goods = [tempGoods];
            //将数组转换成JSON字符串在进行存储
            localStorage.setItem('cart', JSON.stringify(goods));
        };
    }

}
new goods();