// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http.js'


const url_login_getToken = 'http://xx.xx.com'

// login后,将code发送给后台,换取token,将token存储到本地
export const http_login_setToken = function (loginCode) {
	
	console.log(loginCode)

	// 由于不是vue组件,所以不能拿到this的vue实例,
	// 所以这里操作store就用原始的方法,直接操作文件;
	// 其他vue文件还是用...mutations映射方法操作
	store.commit('setToken', 'tototototo')
	console.log(store.getters.store_token)
	
	
	// let url = url_login_getToken

	// 注意,这里用get请求,如果是要修改请求头,那么就需要在http.js中if (config.method == 'get') {config.data = 'true'} ,并且,get请求的第二个参数,是设置请求头;

  // 由于想要在get请求时修改请求头,所以参数2是设置请求头,如果要传参就直接加到URL里
	// 测试get请求
	let URLD = 'https://api.douban.com/v2/book/isbn/9787506394864?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'
	http.get(URLD,{headers: {'Content-Type': 'application/text'}}).then(res => {
		console.log(res)
	}).catch(error => {
	}).finally(() => {
	})
	
	// 测试post请求
	// 如果是post请求,参数1是URL,那么参数2是数据,参数3个设置请求头;
	// http.post(URL, [data], {potion}).then(res => {
	
	// }).catch(error => {
	
	// }).finally(() => {
	
	// })
}