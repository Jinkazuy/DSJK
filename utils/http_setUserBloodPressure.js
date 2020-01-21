// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http.js';

import {formatDate} from './utils.js'

import {url_setUserBloodPressure} from '@/utils/http_req_list.js';

// 添加血压数据
export const http_setUserBloodPressure = async function (bloodPressureObj) {
	
	
	console.log(bloodPressureObj)
	
	// await http.post(url_setUserBloodPressure, {obj?}).then(res => {

	
	// 	if (res.data.code === 0) {
	// 		// 更新/添加成功,在将数据同步在本地store中
	// 	} else {

	// 	}
	
		
	// }).catch(error => {
	// }).finally(() => {
	// })
	

}