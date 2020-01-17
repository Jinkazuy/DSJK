// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http.js'

import {url_getUserSignData} from '@/utils/http_req_list.js'

let URLD = 'https://api.douban.com/v2/book/isbn/9787506394864?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'

// 获取首页所需用户体征,并存储到本地
// 返回 Boolean
export const http_getUserSignData = function () {


  return true
	// store.commit('setUserPhone', '18801228710')
	
  // 注意,这里用get请求,如果是要修改请求头,那么就需要在http.js中if (config.method == 'get') {config.data = 'true'} ,并且,get请求的第二个参数,是设置请求头;
	// http.get(url_getPhone,{params:{
 //      encryptedData,
	// 		iv
 //    }}).then(res => {
	// http.get(URLD,{headers: {'Content-Type': 'application/text'}}).then(res => {
			
	// // 直接在getURL资源路径中添加请求体参数axios会出错,所以还是用params:{data}		
	// // http.get(url_getPhone+`?encryptedData=${encryptedData}&iv=${iv}`).then(res => {
		
	// 	// 由于不是vue组件,所以不能拿到this的vue实例,
	// 	// 所以这里操作store就用原始的方法,直接操作文件;
	// 	// 其他vue文件还是用...mutations映射方法操作
	// 	// console.log('换取用户手机号↓')
	// 	// console.log(res)
		
	// 	store.commit('setUserPhone', '18801228710')
	// 	// store.commit('setUserPhone', res.data.data.phoneNumber)
	// 	console.log(store.getters.store_UserPhone)
		
	// }).catch(error => {
	// }).finally(() => {
	// })
	
	
}