
const url_getUserInfo = 'http://xx.xx.com'

import http from '@/utils/http.js'



// 向后台请求用户信息
export const http_getUserInfo = function (data) {
	
	// let url = url_getUserInfo
	
	// 如无其他herder这里不需要设置
	// let header = {} 
	// let method = 'POST'
	
	// let dataType = 'json'
	
	// // #ifdef MP-ALIPAY
	// let timeout = 30000 // 支付宝小程序
	// // #endif
	
	// // #ifndef MP-ALIPAY || APP-PLUS
	// let responseType = 'text' // App和支付宝小程序不支持
	// // #endif
	
	// // #ifdef APP-PLUS
	// let sslVerify = true // 仅App安卓端支持（HBuilderX 2.3.3+）
	// // #endif
	
	// // 使用uniapp提供的API,通用多平台
	// uni.request ({
	// 	url,
	// 	data, // 直接拿到调用这个函数传进来的值 格式是 {rawData:xxx, signature: ''}
	// 	header,
	// 	method,
		
	// 	// #ifdef MP-ALIPAY
	// 	timeout,
	// 	// #endif
		
	// 	dataType,
		
	// 	// #ifndef MP-ALIPAY || APP-PLUS
	// 	responseType,
	// 	// #endif
		
	// 	// #ifdef APP-PLUS
	// 	sslVerify,
	// 	// #endif
		
	// 	success: (res) => {
	// 		// 请求成功,接收返回值,拿到token,这个token用户之后每次请求都需要携带,存储到本地;
			
	// 	}
	// }) 
}