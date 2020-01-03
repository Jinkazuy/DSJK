(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/login/login"],{

/***/ 56:
/*!**********************************************************************************!*\
  !*** D:/JK-WorkFile/Code/DSJK/DSJK-uni/main.js?{"page":"pages%2Flogin%2Flogin"} ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _login = _interopRequireDefault(__webpack_require__(/*! ./pages/login/login.vue */ 57));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_login.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 57:
/*!***************************************************************!*\
  !*** D:/JK-WorkFile/Code/DSJK/DSJK-uni/pages/login/login.vue ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_vue_vue_type_template_id_1d6f2eca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.vue?vue&type=template&id=1d6f2eca& */ 58);
/* harmony import */ var _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.vue?vue&type=script&lang=js& */ 60);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 14);





/* normalize component */

var component = Object(_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _login_vue_vue_type_template_id_1d6f2eca___WEBPACK_IMPORTED_MODULE_0__["render"],
  _login_vue_vue_type_template_id_1d6f2eca___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "D:/JK-WorkFile/Code/DSJK/DSJK-uni/pages/login/login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 58:
/*!**********************************************************************************************!*\
  !*** D:/JK-WorkFile/Code/DSJK/DSJK-uni/pages/login/login.vue?vue&type=template&id=1d6f2eca& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_1d6f2eca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=template&id=1d6f2eca& */ 59);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_1d6f2eca___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_1d6f2eca___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 59:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/JK-WorkFile/Code/DSJK/DSJK-uni/pages/login/login.vue?vue&type=template&id=1d6f2eca& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 60:
/*!****************************************************************************************!*\
  !*** D:/JK-WorkFile/Code/DSJK/DSJK-uni/pages/login/login.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=script&lang=js& */ 61);
/* harmony import */ var _F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_F_JK_apps_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 61:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/JK-WorkFile/Code/DSJK/DSJK-uni/pages/login/login.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 62));
















var _vuex = __webpack_require__(/*! vuex */ 16);

var _http_login_setToken = __webpack_require__(/*! ../../utils/http_login_setToken.js */ 65);
var _http_getPhone = __webpack_require__(/*! ../../utils/http_getPhone.js */ 100);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =
{
  data: function data() {
    return {
      // 授权按钮是否显示，当没有获取用户授权时，显示授权按钮
      onLoginBTN: false,
      // 获取用户手机号按钮
      getPhoneBTN: false };

  },
  // 监听页面显示。
  // 页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
  onShow: function () {var _onShow = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (


                uni.login({
                  success: function success(loginRes) {
                    // 拿到用户登录Code，发送给后台，后台返回token值，将token存储到本地中；
                    if (loginRes.code) {
                      console.log('登录，获取token');
                      (0, _http_login_setToken.http_login_setToken)(loginRes.code);
                    }
                  } }));case 2:



              // 检查本地是否能够拿到用户信息、用户数据
              // 如果本地拿不到用户信息、用户数据，那么就执=> 1、行获取用户设置
              // 这里的storeUserInfo是通过vuex提供的辅助函数mapGetters，取到getters.js中的内容，目的：获取本地存储的用户信息（不包含敏感数据）
              if (!this.store_UserInfo.nickName) {
                console.log('本地用户信息为空，尝试获取“获取用户信息的授权”');
                // 先显示页面时，就检查用户是否授权，如果未授权，提示授权，如果授权则进行登录；
                // 这个检测授权只能在小程序端使用,所以使用uniapp的条件渲染，取反，不在APP和H5执行这个函数

                this.getSetting();


              } else {// 用户数据和用户信息都可以拿到，允许进入其他页面
                // 用户已授权，隐藏登录按钮
                this.onLoginBTN = false;
                console.log('拿到用户信息，检测用户手机号是否存在');
                this.ifStoreUserPhone();
              }case 3:case "end":return _context.stop();}}}, _callee, this);}));function onShow() {return _onShow.apply(this, arguments);}return onShow;}(),




  methods: _objectSpread({

    // 1、获取用户设置
    getSetting: function getSetting() {var _this = this;
      uni.getSetting({
        success: function success(res) {
          if (res.authSetting["scope.userInfo"]) {
            console.log('已获取用户“用户信息授权，直接获取用户信息（非敏感数据）”');
            // 用户已授权：用户信息
            // 获取用户信息
            _this.getUserInfo();
          } else {
            // 未授权用户信息,显示授权用户信息按钮，隐藏其他按钮；
            _this.onLoginBTN = true;
          }
        } });

    },


    // 获取用户信息授权
    // 获取用户信息
    getUserInfo: function getUserInfo() {
      var that = this;
      uni.getUserInfo({
        success: function success(res) {
          // 获取成功，存本地
          console.log('用户已授权，获取用户信息↓↓↓');
          console.log(res.userInfo);
          console.log('将信息存储到本地');
          that.setUserInfo(res.userInfo);
          console.log('当前本地用户信息↓');
          console.log(that.store_UserInfo);
          // 然后检测本地用户手机号
          that.ifStoreUserPhone();
        } });

    },



    // 用户点击授权按钮后，弹出弹窗，然后在弹窗点取消或授权，会进入这个函数
    // 这个@getuserinfo是uniapp提供的处理事件，只适用于微信小程序，
    // 在点击这个按钮后，会触发bindGetUserInfo，然后拿到用户点击弹窗授权的回调函数
    // 不同于@click，这个@getuserinfo只能在用户授权的弹窗，当用户点击拒绝或接受才会触发这个事件，并且这个事件只能用在小程序
    bindGetUserInfo: function bindGetUserInfo(e) {
      console.log('用户点击授权按钮');
      console.log(e);
      if (e.target.userInfo) {
        console.log('用户已授权-获取用户信息');
        console.log(e.target.userInfo);
        // 拿到用户基本信息此时的操作，
        // 将用户基本信息储存到本地 
        console.log('将信息存储到本地');
        this.setUserInfo(e.target.userInfo);
        console.log('当前本地用户信息↓');
        console.log(this.store_UserInfo);
        // 用户已授权，隐藏登录按钮
        this.onLoginBTN = false;
        // 然后检测本地用户手机号
        this.ifStoreUserPhone();

      } else {
        console.log('用户拒接登录，此时应显示弹窗告知用户“授权登录后才能使用xxx功能”');
      }
    },
    // 检查本地是否能获取用户手机号
    ifStoreUserPhone: function ifStoreUserPhone() {
      console.log(this.$store);
      if (this.store_UserPhone !== '') {
        console.log('拿到手机号，本地用户手机号↓');
        console.log(this.store_UserPhone);
        console.log('单独判断用户基本体征数据(性别,出生日期,身高,体重)');
        console.log('全部(性别,出生日期,身高,体重)都有，跳转至首页');

        if (this.store_userBaseSign['gander'] !== '' && this.store_userBaseSign['birthDate'] !== '' && this.store_userBaseSign['height'] !== '' && this.store_userBaseSign['weight'] !== '') {
          // 全部都有数据，跳转至首页
          uni.switchTab({
            url: '../index/index',
            complete: function complete(res) {
              console.log(res);
            } });

        } else {
          // 重定向到设置用户基本体征数据
          uni.redirectTo({
            url: '../init_set_baseSign/init_set_baseSign',
            complete: function complete(res) {
              console.log(res);
            } });

        }

      } else {
        // 本地用户手机号为空
        console.log('本地手机号获取为空，显示获取手机号按钮');
        this.getPhoneBTN = true;
      }
    },
    // 获取用户手机号事件的回调函数
    bindgetphonenumber: function () {var _bindgetphonenumber = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                console.log('用户点击获取手机号按钮');
                console.log(e);if (!
                e.detail.encryptedData) {_context2.next = 9;break;}
                console.log('用户授权手机号，拿到加密数据，发送给后台换取手机号');_context2.next = 6;return (
                  (0, _http_getPhone.http_getPhone)(e.detail.encryptedData));case 6:
                // 等待换取手机号结束，检测本地手机号
                this.ifStoreUserPhone();_context2.next = 10;break;case 9:

                console.log('用户拒绝授权获取手机号');case 10:case "end":return _context2.stop();}}}, _callee2, this);}));function bindgetphonenumber(_x) {return _bindgetphonenumber.apply(this, arguments);}return bindgetphonenumber;}() },


  (0, _vuex.mapMutations)({
    // 这里映射了这个方法，那么在调用x的时候，就等于使用了this.$store.commit('SET_SINGER', value)这个方法；
    setUserInfo: 'setUserInfo',
    setToken: 'setToken' })),


  computed: _objectSpread({},

  (0, _vuex.mapGetters)([
  'store_UserInfo',
  'store_token',
  'store_UserPhone',
  'store_userBaseSign'])) };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

},[[56,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map