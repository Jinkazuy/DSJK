// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http.js';

import {formatDate} from './utils.js'

import {url_setUserBaseSign, url_setUserWeight, url_setUserHeight} from '@/utils/http_req_list.js';

// login后,将code发送给后台,换取token,将token存储到本地
export const http_setUserBaseSign = async function (userBaseSignObj) {
	
	
	// 这里后台目前只接收 生日/身高/体重, 
	// todo:身高 和 体重 都有单独的表,因为数据会有变化,所以这里还需要将用户注册时的身高/体重也push到表中


	var userBaseSignObjRes = false
	await http.post(url_setUserBaseSign, {
			birth:userBaseSignObj.userBirth,
			height:userBaseSignObj.userHeight,
			weight:userBaseSignObj.userWeight,
		}).then(res => {
		
		// 由于不是vue组件,所以不能拿到this的vue实例,
		// 所以这里操作store就用原始的方法,直接操作文件;
		// 其他vue文件还是用...mutations映射方法操作
	
		if (res.data.code === 0) {
			store.commit('setUserBaseSign', userBaseSignObj)
			console.log(store.getters.store_userBaseSign)
			userBaseSignObjRes = true
			
			// todo:分开发送给后台储存 - 体重
			// todo:分开发送给后台储存 - 身高
			console.log(formatDate(new Date()))
			http.post(url_setUserWeight, {mensWeight: userBaseSignObj.userWeight}).then(res => {
					console.log('-----------------')
					console.log(res)
				})
			
		} else {
			console.log('添加用户4项基本体征失败')
			console.log(res.data)
		  userBaseSignObjRes = false
		}
	
		
	}).catch(error => {
	}).finally(() => {
	})
	// return userBaseSignObjRes
	return false
	
	
}