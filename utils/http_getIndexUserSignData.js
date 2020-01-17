// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http.js'

// 首页所需: 身高/体重/血压/血糖
import {url_getUserWeight, url_getUserbloodPressure, url_getUserbloodSugar} from '@/utils/http_req_list.js'
// url_getUserWeight 需要拼接 /userId

// 获取首页所需体征,并存储到本地(分开存储)
export const http_getIndexUserSignData = async function () {

	// 用户表中ID ,用于SQL查询参数,发送给后台
	let id = store.getters.store_UserInfoData.id
	
	// TODO:获取用户身高
	
	let weight = await http.get(url_getUserWeight+id).then(res => {
			
			console.log('体重')
			console.log(res)
			// 获取后更新本地用户所有准确体征数据中的 - 体重
			// 设置体重
			// if(res.data.user.weight!==null) {
			// 	store.commit('setUserSignData_weight', res.data.user.weight)	
			// }
			
			// 模拟
			store.commit('setUserSignData_weight', 80)	
		
	}).catch(error => {
	}).finally(() => {
	})
	
	// 获取用户血压
	let bloodPressure = await http.get(url_getUserbloodPressure+id).then(res => {
			
			console.log('血压')
			console.log(res)
			// 设置用户准确体征 - 血压
			// if(res.data.user.xx!==null) {
			// 	store.commit('setUserSignData_bloodPressure', xx)	
			// }
			
			// 模拟
			store.commit('setUserSignData_bloodPressure', 77)	

		
	}).catch(error => {
	}).finally(() => {
	})
	
	// 获取用户血糖
	let bloodSugar = await http.get(url_getUserbloodSugar+id).then(res => {
			
			console.log('血糖')
			console.log(res)
			// 储存到本地用户store_userSignData中
			// if(res.data.user.xx!==null) {
			// 	store.commit('setUserSignData_bloodSugar', xx)	
			// }
			
			// 模拟
			store.commit('setUserSignData_bloodSugar', 66)	
		
	}).catch(error => {
	}).finally(() => {
	})
	
	// todo:
	
	return true
	
}