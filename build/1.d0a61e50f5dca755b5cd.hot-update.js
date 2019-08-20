/*! Create By zgjx at 2019-5-13 17:22:00 */
webpackHotUpdate(1,{

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nav_vue__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__password_vue__ = __webpack_require__(61);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'xml',
    components: {
        NavMenu: __WEBPACK_IMPORTED_MODULE_0__nav_vue__["a" /* default */],
        PasswordArea: __WEBPACK_IMPORTED_MODULE_1__password_vue__["a" /* default */]
    },
    data: function data() {
        return {
            spinShow: false,
            password100: '',
            password1700: '',
            password10000: '',
            NCSC100k: ''
        };
    },

    mounted: function mounted() {
        this.getCommon();
    },
    methods: {
        getCommon: function getCommon(data) {
            var _this = this;

            this.spinShow = true;
            /*                this.$http.get('/static/file/NCSC_PwnedPasswordTop100k.txt').then(response => {
                                this.password100 = response.data;
                                this.password1700 = response.data;
                                this.password10000 = response.data;
                                this.NCSC100k = response.data;
                                this.spinShow = false;
                            }).catch(error => {
                                console.log(error);
                                this.spinShow = false
                            });*/
            this.$http.post('/api/get_common', data).then(function (response) {
                _this.password100 = response.data['content100'];
                _this.password1700 = response.data['content1700'];
                _this.password10000 = response.data['content10000'];
                _this.NCSC100k = response.data['NCSC100k'];
                _this.spinShow = false;
            }).catch(function (error) {
                console.log(error);
                _this.spinShow = false;
            });
        }
    }
});

/***/ })

})
//# sourceMappingURL=1.d0a61e50f5dca755b5cd.hot-update.js.map