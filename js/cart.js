var vm = new Vue({
    el: '#app',
    data: {
        productList: [],
        totalMoney: 0,
        checkAllFlag: false,
        deleFlag: false
    },
    //局部过滤器;
    //Vue.filter();全局过滤
    filters: {
        // formatMoney: function(value) {
        //     return "￥" + value.toFixed(2);
        // }
    },
    mounted: function() {
        this.cartView();
    },
    methods: {
        cartView: function() {
            var self = this;
            this.$http.get("../data/cartData.json").then(function(res) {
                // console.log(res);
                self.productList = res.data.result.list;
            });
        },
        changeMoney: function(product, way) {
            if (way > 0) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
                if (product.productQuantity < 1) {
                    product.productQuantity = 1;
                }
            }
            this.calcTotalPrice();
        },
        selectProuct: function(item) {
            var self = this;
            if (typeof item.checked == 'undefined') {
                //Vue.set(item,"checked",true);//全局注册
                self.$set(item, "checked", true); //局部注册
            } else {
                item.checked = !item.checked;
            }
            if (item.checked == false && self.checkAllFlag == true) {
                self.checkAllFlag = item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function() {
            this.checkAllFlag = !this.checkAllFlag;
            var self = this;
            if (this.checkAllFlag) {
                this.productList.forEach(function(item, index) {
                    if (typeof item.checked == 'undefined') {
                        //Vue.set(item,"checked",true);//全局注册
                        self.$set(item, "checked", true); //局部注册
                    } else {
                        item.checked = self.checkAllFlag;
                    }

                });
            } else {
                this.productList.forEach(function(item, index) {
                    if (typeof item.checked == 'undefined') {
                        //Vue.set(item,"checked",true);//全局注册
                        self.$set(item, "checked", true); //局部注册
                    } else {
                        item.checked = self.checkAllFlag;
                    }

                });
            }
            this.calcTotalPrice();
        },
        calcTotalPrice: function() {
            var self = this;
            self.totalMoney = 0;
            this.productList.forEach(function(item, index) {
                if (item.checked) {
                    self.totalMoney += item.productPrice * item.productQuantity;
                } else {

                }

            });
        },
        deleteConfirm: function(item) {
            this.deleFlag = true;
            this.curProduct = item;
        },
        deleteCommodity: function() {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.calcTotalPrice();
            this.deleFlag = false;
        }

    }
});
Vue.filter("money", function(value, state) {
    return "￥" + value.toFixed(2) + state;
});