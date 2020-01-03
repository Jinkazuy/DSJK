// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http.js'

import {url_getPhone} from '@/utils/http_req_list.js'

// login后,将code发送给后台,换取token,将token存储到本地
export const http_getPhone = function (encryptedData) {
	
	console.log('手机号加密数据' + encryptedData)
	
	// 模拟换取成功
	store.commit('setUserPhone', '18801228710')

	// http.post(url_getPhone, [{code:encryptedData}]).then(res => {
		
	// 	// 由于不是vue组件,所以不能拿到this的vue实例,
	// 	// 所以这里操作store就用原始的方法,直接操作文件;
	// 	// 其他vue文件还是用...mutations映射方法操作
	// 	console.log('换取用户手机号' + res)
	// 	store.commit('setUserPhone', '18801228710')
	// 	console.log(store.getters.store_UserPhone)
		
	// }).catch(error => {
	// }).finally(() => {
	// })
	
	
}