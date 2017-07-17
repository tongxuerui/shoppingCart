var vm = new Vue({
    el: '.container',
    data: {
        limitNum: 3,
        addressLIst: [],
        currentIndex: 0,
        shippingMethod: 1,
        deleFlag: false,
        editAddress: false,
        editCurrentAddress: ''
    },

    mounted: function() {
        this.$nextTick(function() {
            vm.addressView();
        });
        // this.addressView();
    },
    computed: {
        filterAddressLIst: function() {
            return this.addressLIst.slice(0, this.limitNum);
        }

    },
    methods: {
        addressView: function() {
            var self = this;
            this.$http.get('../data/address.json').then(function(res) {
                if (res.status == 200) {
                    self.addressLIst = res.data.result;
                } else {
                    alert('请求失败！');
                }
                console.log(res);
            });
        },
        laodMore: function() {
            this.limitNum = this.addressLIst.lenght;
        },
        setDefaut: function(addressId) {
            this.addressLIst.forEach(function(ele, index) {
                if (ele.addressId == addressId) {
                    ele.isDefault = true;
                } else {
                    ele.isDefault = false;
                }

            });
        },
        delConifm: function(item) {
            this.deleFlag = true;
            this.currentAddress = item;
        },
        delAddress: function() {

            var index = this.addressLIst.indexOf(this.currentAddress);
            console.log(this.addressLIst);
            this.addressLIst.splice(index, 1);
            this.deleFlag = false;

        },
        editAddressFn: function(item) {
            this.editAddress = true;
            this.editCurrentAddress = '';
            if (item) {
                this.editCurrentAddress = item;
            }
        },
        saveEditAddress: function() {
            this.editAddress = false;
            if (this.editCurrentAddress.userName !== undefined) {
                var index = this.addressLIst.indexOf(this.editCurrentAddress);
                this.addressLIst[index].userName = document.getElementsByClassName('js_userName')[0].value;
                this.addressLIst[index].streetName = document.getElementsByClassName('js_userAddress')[0].value;
                this.addressLIst[index].tel = document.getElementsByClassName('js_userTel')[0].value;
            } else {
                var newAddress = {
                    "addressId": "",
                    "userName": "",
                    "streetName": "",
                    "postCode": "",
                    "tel": "",
                    "isDefault": false
                };
                newAddress.userName = document.getElementsByClassName('js_userName')[0].value;
                newAddress.streetName = document.getElementsByClassName('js_userAddress')[0].value;
                newAddress.tel = document.getElementsByClassName('js_userTel')[0].value;
                newAddress.postCode = '10000' + this.addressLIst.lenght;
                newAddress.addressId = '10000' + this.addressLIst.lenght;
                if (newAddress.addressId !== "") {
                    this.addressLIst.push(newAddress);
                }
            }

        }
    }
});