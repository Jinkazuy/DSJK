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
	
	
	// 模拟设置体重
	store.commit('setUserSignData_weight', {
			title: '体重',
			editBTN: 1,
			dataNum: '60',
			dataCompany: 'kg',
			dataTips: 'BMI:16.8',
			dataTime:'2020-01-09 15:30',
			// 添加数据的滑尺范围
			rulerRange: [{
				// 男体重
				left: 50,
				cont: 60,
				right: 150
			}],
			// 数值衡量标准范围
			dataRange: [{
					low: '53.5', // 低于范围
					nor: '53.5-69.1', // 正常范围
					hig: '69.1'  // 高于范围
				}],
			editId: 1
	})
	
	
	// 模拟设计血压
	store.commit('setUserSignData_bloodPressure', {
		title: '血压',
		editBTN: 1,
		// dataNum: '-1',
		dataNum: '120/80',
		dataCompany: 'mmHg',
		dataTime:'2020-01-09 15:30',
		// 添加数据的滑尺范围
		rulerRange: [
			{
				left: 60,
				cont: 110,
				right: 250
			},
			{
				left: 30,
				cont: 75,
				right: 180
			}
		],
		cursorSuffix: ['收缩压', '舒张压'],
		dataRange: [{
				low: '90', // 低于范围
				nor: '90-140', // 正常范围
				hig: '140'  // 高于范围
			},
			{
				low: '60', // 低于范围
				nor: '60-90', // 正常范围
				hig: '90'  // 高于范围
			}],
	  editId: 2
	})
	
	// 模拟设置血糖
	store.commit('setUserSignData_bloodSugar', {
		title: '血糖',
		editBTN: 1,
		dataNum: '5.6',
		dataTips: '清晨空腹',
		dataCompany: 'mmol/L',
		dataTime:'2020-01-09 15:30',
		// 添加数据的滑尺范围
		rulerRange: [{
			left: 1,
			cont: 5.2,
			right: 33.3
		}],
		// 测量时段 1是清晨空腹, 2是餐后一小时, 3是餐后两小时
		measureTime: 1,
		dataRange: [{
				low: '2.8', // 低于范围
				nor: '2.8-6.0', // 正常范围
				hig: '6.0'  // 高于范围
			}],
	  editId: 3
	})
	
	
	// todo:接口写好之后,把下边注释打开,然后删除上边的模拟设置数据
	// let weight = await http.get(url_getUserWeight+id).then(res => {
			
	// 		console.log('体重')
	// 		console.log(res)
	// 		// 获取后更新本地用户所有准确体征数据中的 - 体重
	// 		// 设置体重
	// 		// if(res.data.user.weight!==null) {
	// 		// 	store.commit('setUserSignData_weight', res.data.user.weight)	
	// 		// }
			
	// 		// 模拟设置体重
	// 		store.commit('setUserSignData_weight', {
	// 				title: '体重',
	// 				editBTN: 1,
	// 				dataNum: '60',
	// 				dataCompany: 'kg',
	// 				dataTips: 'BMI:16.8',
	// 				dataTime:'2020-01-09 15:30',
	// 				// 添加数据的滑尺范围
	// 				rulerRange: [{
	// 					// 男体重
	// 					left: 50,
	// 					cont: 60,
	// 					right: 150
	// 				}],
	// 				// 数值衡量标准范围
	// 				dataRange: [{
	// 						low: '53.5', // 低于范围
	// 						nor: '53.5-69.1', // 正常范围
	// 						hig: '69.1'  // 高于范围
	// 					}],
	// 				editId: 1
	// 		})	
		
	// }).catch(error => {
	// }).finally(() => {
	// })
	
	// // 获取用户血压
	// let bloodPressure = await http.get(url_getUserbloodPressure+id).then(res => {
			
	// 		console.log('血压')
	// 		console.log(res)
	// 		// 设置用户准确体征 - 血压
	// 		// if(res.data.user.xx!==null) {
	// 		// 	store.commit('setUserSignData_bloodPressure', xx)	
	// 		// }
			
	// 		// 模拟
	// 		store.commit('setUserSignData_bloodPressure', {
	// 			title: '血压',
	// 			editBTN: 1,
	// 			// dataNum: '-1',
	// 			dataNum: '120/80',
	// 			dataCompany: 'mmHg',
	// 			dataTime:'2020-01-09 15:30',
	// 			// 添加数据的滑尺范围
	// 			rulerRange: [
	// 				{
	// 					left: 60,
	// 					cont: 110,
	// 					right: 250
	// 				},
	// 				{
	// 					left: 30,
	// 					cont: 75,
	// 					right: 180
	// 				}
	// 			],
	// 			cursorSuffix: ['收缩压', '舒张压'],
	// 			dataRange: [{
	// 					low: '90', // 低于范围
	// 					nor: '90-140', // 正常范围
	// 					hig: '140'  // 高于范围
	// 				},
	// 				{
	// 					low: '60', // 低于范围
	// 					nor: '60-90', // 正常范围
	// 					hig: '90'  // 高于范围
	// 				}],
	// 		  editId: 2
	// 		})	

		
	// }).catch(error => {
	// }).finally(() => {
	// })
	
	// // 获取用户血糖
	// let bloodSugar = await http.get(url_getUserbloodSugar+id).then(res => {
			
	// 		console.log('血糖')
	// 		console.log(res)
	// 		// 储存到本地用户store_userSignData中
	// 		// if(res.data.user.xx!==null) {
	// 		// 	store.commit('setUserSignData_bloodSugar', xx)	
	// 		// }
			
	// 		// 模拟
	// 		store.commit('setUserSignData_bloodSugar', {
	// 			title: '血糖',
	// 			editBTN: 1,
	// 			dataNum: '5.6',
	// 			dataTips: '清晨空腹',
	// 			dataCompany: 'mmol/L',
	// 			dataTime:'2020-01-09 15:30',
	// 			// 添加数据的滑尺范围
	// 			rulerRange: [{
	// 				left: 1,
	// 				cont: 5.2,
	// 				right: 33.3
	// 			}],
	// 			// 测量时段 1是清晨空腹, 2是餐后一小时, 3是餐后两小时
	// 			measureTime: 1,
	// 			dataRange: [{
	// 					low: '2.8', // 低于范围
	// 					nor: '2.8-6.0', // 正常范围
	// 					hig: '6.0'  // 高于范围
	// 				}],
	// 		  editId: 3
	// 		})	
		
	// }).catch(error => {
	// }).finally(() => {
	// })
	
	// // todo:
	
	return true
	
}