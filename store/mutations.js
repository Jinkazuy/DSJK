
// matutaions负责修改state中的数据
// 如果是复杂的操作，那么就需要用actions.js来操作 matutaions 中的函数，
// 但是，不能在 actions.js 直接操作 state ，
// 只能由actions操作matutaions，从而操作state中的数据
const matutaions = {
  // 设置用户信息(不包含敏感数据)
  setUserInfo(state, userInfo) {
    state.store_UserInfo = userInfo
  },
	// 设置用户手机号
	setUserPhone(state, userPhone) {
	  state.store_UserPhone = userPhone
	},
	// 设置token
	setToken(state, storeToken) {
	  state.store_token = storeToken
	},
	// 设置用户基本体征 - 性别
	setUserBaseSignGander(state, signGander) {
	  state.store_userBaseSign['gander'] = signGander
	},
	// 设置用户基本体征 - 出生日期
	setUserBaseSignBirthDate(state, birthDate) {
	  state.store_userBaseSign['birthDate'] = birthDate
	},
	// 设置用户基本体征 - 身高
	setUserBaseSignHeight(state, height) {
	  state.store_userBaseSign['height'] = height
	},
	// 设置用户基本体征 - 体重
	setUserBaseSignWeight(state, weight) {
	  state.store_userBaseSign['weight'] = weight
	},
}

// 将 matutaions 导出，在store/index.js引入
export default matutaions