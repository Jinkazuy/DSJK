const state = {
  // 用户基本数据,不包含敏感信息;
  store_UserInfo: {
		avatarUrl: "",
		city: "",
		country: "",
		gender: -1,
		language: "",
		nickName: "",
		province: ""
	},
	// 用户详细数据,包后台数据表中的数据;
	store_UserInfoData: {
		avatarUrl: null,  // 头像
		birth: null,  // 生日
		city: null,  // 城市
		country: null,
		createTime: null,
		gender: null, // 性别
		height: null, // 身高
		isDelete: null, 
		language: null,  // 所用语言
		mobile: null,  // 电话/手机号
		nickName: null,  // 昵称
		openId: null,  // 
		password: null,  // 
		province: null,  // 
		sessionKey: null,  // 
		status: null,  // 
		unionId: null,  // 
		updateTime: null,  // 
		id: null,  // 用户表的主键ID
		weight: null   // 体重
	},
	// 用户手机号
	store_UserPhone: '',
	// 用户登录后,后台返回的token值,用于每次发送请求时判断用户是否属于后台真的登录状态;
	store_token: '', // token过期时间由后台订, 在http_login_setToken时获取过期时间,然后在util的isLogin中判断是否过期
	store_tokenExpiration: '', // 过期时间
	// 用户基本体征数据(性别,出生日期,身高,体重),在用户注册时选择这些信息,然后发送给后台
	store_userBaseSign: {
		userGender : '',
		userBirth : '',
		userHeight : '',
		userWeight : ''
	},
	// ##
	// 用户所有准确体征数据,最终所有获取到的数据,都先存在这里,然后前台根据这里的数值渲染
	store_userSignData: {
		gender: -1,          // 性别
		step: -1,            // 步数
		weight: -1,          // 体重
		height: -1,          // 身高
		bloodPressure: -1,   // 血压
		bloodSugar: -1,      // 血糖
		heartRate: -1,       // 心率
		sleep: -1,           // 睡眠
		BodyTemperature: -1, // 体温
		TotalCholesterol: -1 // 总胆固醇
	},
	// 首页banner
	store_homeBannerList: {},
	// 首页新闻列表
	store_homeNewsList: {},
	// 微信步数
	store_userWXStep: 666,
}

export default state