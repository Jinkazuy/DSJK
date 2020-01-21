// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http.js';

import {url_getWXStep} from '@/utils/http_req_list.js';

// login后,加密信息发送后台,换取微信步数,将步数缓存至本地
export const http_getWXStep = function (encryptedData, iv) {
	
	console.log(encryptedData)
	console.log(iv)

	
	// 设置步数
	// if(res.data.user.step!==null) {
	if(1) {
		store.commit('setUserSignData_step', {
			title: '步数',
			editBTN: 2,
			dataNum: '6666',// 从后台获取步数
			dataCompany: '步',
			eqType: '手机',
			editId: 0
		})
	}

			
	// // 直接在getURL资源路径中添加请求体参数axios会出错,所以还是用params:{data}		
	// // http.get(url_getPhone+`?encryptedData=${encryptedData}&iv=${iv}`).then(res => {
		
	// 	// 由于不是vue组件,所以不能拿到this的vue实例,
	// 	// 所以这里操作store就用原始的方法,直接操作文件;
	// 	// 其他vue文件还是用...mutations映射方法操作
	//  // 储存到本地
	//  store.commit('setUserBaseSign', userBaseSignObj)

	// 	// store.commit('setUserPhone', res.data.data.phoneNumber)
	// 	console.log(store.getters.store_UserPhone)
		
	// }).catch(error => {
	// }).finally(() => {
	// })
	
	
}