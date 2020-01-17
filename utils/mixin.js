
import {isLogin} from '@/utils/utils.js'


export const ximin_isLogin = {
  onShow() {
		// 检测登录
		if(!isLogin()) {
			// 本地拿不到用户信息，重定向到用户登录页；
			uni.redirectTo({
			    url: '../login/login?onLoadErrMsg="您的登录已过期，请重新登录"'
			})
		}
  }
}