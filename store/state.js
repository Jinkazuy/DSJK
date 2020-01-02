const state = {
  // 用户基本数据,不包含敏感信息;
  store_UserInfo: {},
	// 用户登录后,后台返回的token值,用于每次发送请求时判断用户是否属于真的登录状态;
	store_token: ''
}

export default state