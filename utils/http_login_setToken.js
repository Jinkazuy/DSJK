// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http.js'

import {formatDate} from '@/utils/utils.js'

import {
	url_login_getToken,
	url_getUserInfo
} from '@/utils/http_req_list.js'

// login后,将code发送给后台,换取token,将token存储到本地
// 同时获取用户详细信息, 包括用户在后台数据表中的ID
export const http_login_setToken = async function(code, encryptedData, iv) {

	// 注意,这里用get请求,如果是要修改请求头,那么就需要在http.js中if (config.method == 'get') {config.data = 'true'} ,并且,get请求的第二个参数,是设置请求头;

	// 由于想要在get请求时修改请求头,所以参数2是设置请求头,如果要传参就直接加到URL里
	// 测试get请求
	// let URLD = 'https://api.douban.com/v2/book/isbn/9787506394864?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'
	// http.get(URLD,{headers: {'Content-Type': 'application/text'}}).then(res => {
	// await http.post(url_login_getToken, {code, encryptedData, iv}).then(res => {
	// 	//  拿到服务器返回的token,存储到本地
	// 	store.commit('setToken', res.data.token)
	// }).catch(error => {
	// }).finally(() => {
	// })

	// console.log(store)

	// 测试post请求
	// 如果是post请求,参数1是URL,那么参数2是数据,参数3个设置请求头;
	// http.post(URL, [data], {potion}).then(res => {
	// }).catch(error => {
	// }).finally(() => {
	// })
	var logRes = false
	await http.post(url_login_getToken, {
		code,
		encryptedData,
		iv
	}).then(async (res) => {

		// 由于不是vue组件,所以不能拿到this的vue实例,
		// 所以这里操作store就用原始的方法,直接操作文件;
		// 其他vue文件还是用...mutations映射方法操作

		console.log(res)
		if (res.data.code === 0) {
			// 设置token,用于以后每次发送请求,请求头都必须带上
			store.commit('setToken', res.data.token)
			// token过期时间,由后太配置,用当前时间加上这个事件,然后储存在store中,然后再在util中的isLogin中判断是否过期expiration
			// res.data.expire为秒数 , 需 * 1000
			let expiration = new Date().getTime() + (res.data.expire * 1000)
			console.log('=====token过期时间↓=========')
			store.commit('setTokenExpiration', expiration)
			console.log('当前时间 => ' + formatDate(new Date(new Date().getTime())))
			console.log('登陆(token)过期时间 => ' + formatDate(new Date(store.getters.store_tokenExpiration)))
			logRes = true
		} else {
			console.log('登录失败↓')
			console.log(res.data)
			logRes = false
		}

		// 登录成功,直接获取后台用户表的中的用户详细数据,储存到本地
		await http.get(url_getUserInfo, {params: {}}).then(res => {

			// 储存到本地,后续请求用户体征数据都用到user表中的id;
			if (res.data.code === 0) {
				store.commit('setUserInfoData', res.data.user)
				console.log(store.getters.store_UserInfoData)
				// 可以拿到的内容:
				// {
				// 	avatarUrl: "",  // 头像
				// 	birth: "",  // 生日
				// 	city: "",  // 城市
				// 	country: "",
				// 	createTime: "",
				// 	gender: -1, // 性别
				// 	height: 0, // 身高
				// 	isDelete: 0, 
				// 	language: "",  // 所用语言
				// 	mobile: "",  // 电话/手机号
				// 	nickName: "",  // 昵称
				// 	openId: null,  // 
				// 	password: null,  // 
				// 	province: "",  // 
				// 	sessionKey: null,  // 
				// 	status: 0,  // 
				// 	unionId: null,  // 
				// 	updateTime: null,  // 
				// 	userId: 0,  // 用户表的主键ID
				// 	weight: 0   // 体重
				// }
				
				
				// 设置身高
				if(res.data.user.height!==null) {
					store.commit('setUserSignData_height', res.data.user.height)
				}

				// 设置体重
				if(res.data.user.weight!==null) {
					store.commit('setUserSignData_weight', res.data.user.weight)	
				}
				
				// 设置性别
				if(res.data.user.gender!==null) {
				store.commit('setUserSignData_gender', res.data.user.gender)
				}
				
			}
		})



	}).catch(error => {}).finally(() => {})
	return logRes


}
