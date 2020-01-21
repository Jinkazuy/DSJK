// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http.js';

import {url_getStep} from '@/utils/http_req_list.js';

// 获取数据库中,该用户的步数,这个步数不一定是最新的
export const http_getStep = function () {


	
	// 设置步数
	// if(res.data.user.step!==null) {
	setTimeout(()=>{
		if(1) {
			store.commit('setUserSignData_step', 
				{
					title: '步数',
					editBTN: 2,
					dataNum: '-1',// 从后台获取步数
					dataCompany: '步',
					eqType: '手机'
				},
		)}
	},2000)

			
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