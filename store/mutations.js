
// matutaions负责修改state中的数据
// 如果是复杂的操作，那么就需要用actions.js来操作 matutaions 中的函数，
// 但是，不能在 actions.js 直接操作 state ，
// 只能由actions操作matutaions，从而操作state中的数据
const matutaions = {
  // 设置用户信息(不包含敏感数据)
  setUserInfo(state, userInfo) {
    state.store_UserInfo = userInfo
  },
	// 设置用户详细数据,包后台数据表中的数据;
	setUserInfoData(state, userInfoData) {
	  state.store_UserInfoData = userInfoData
	},
	// 设置用户手机号
	setUserPhone(state, userPhone) {
	  state.store_UserPhone = userPhone
	},
	// 设置token
	setToken(state, storeToken) {
	  state.store_token = storeToken
	},
	// 设置token过期时间(毫秒数)
	setTokenExpiration(state, expiration) {
	  state.store_tokenExpiration = expiration
	},
	// 设置用户基本4项体征
	setUserBaseSign(state, userBaseSign) {
	  state.store_userBaseSign = userBaseSign
	},
	// 设置用户所有体征数据
	setUserSignData(state, userSignData) {
	  state.store_userSignData = userSignData
	},
	// 设置首页banner列表
	setHomeBannerList(state, bannerList) {
	  state.store_homeBannerList = bannerList
	},
	// 设置首页新闻列表
	setHomeNewsList(state, newsList) {
	  state.store_homeNewsList = newsList
	},
	// 设置微信步数
	setUserWXStep(state, step) {
	  state.store_userWXStep = step
	},
	
	// 设置用户准确体征 - 性别
	setUserSignData_gender(state, gender) {
		state.store_userSignData['gender'] = gender
	},
	// 设置用户准确体征 - 升高
	setUserSignData_height(state, height) {
		state.store_userSignData['height'] = height
	},
	// 设置用户准确体征 - 体重
	setUserSignData_weight(state, weight) {
		state.store_userSignData['weight'] = weight
	},
	// 设置用户准确体征 - 步数
	setUserSignData_step(state, step) {
		state.store_userSignData['step'] = step
	},
	// 设置用户准确体征 - 血压
	setUserSignData_bloodPressure(state, bloodPressure) {
		state.store_userSignData['bloodPressure'] = bloodPressure
	},
	// 设置用户准确体征 - 血糖
	setUserSignData_bloodSugar(state, bloodSugar) {
		state.store_userSignData['bloodSugar'] = bloodSugar
	}
}

// 将 matutaions 导出，在store/index.js引入
export default matutaions