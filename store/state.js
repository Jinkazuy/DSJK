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

		
		// 0 步数
		step: {
			title: '步数',
			editBTN: 2,
			dataNum: '-2',// 从后台获取步数
			dataCompany: '步',
			eqType: '手机',
			editId: 0
		},            
		
		// 1 体重
		weight: {
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
		},   

		
		// 2 血压
		bloodPressure: {
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
		},
		
		// 3 血糖
		bloodSugar: {
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
		},     
		
		// 4 心率
		heartRate: {
			title: '心率',
			editBTN: 1,
			dataNum: '80',
			dataCompany: '次/分钟',
			dataTime:'2020-01-09 15:30',
			// 添加数据的滑尺范围
			rulerRange: [{
				left: 30,
				cont: 80,
				right: 200
			}],
			dataRange: [{
					low: '60', // 低于范围
					nor: '60-100', // 正常范围
					hig: '100'  // 高于范围
				}],
		  editId: 4
		},       

							
	  // 5 体温
		BodyTemperature: {
			title: '体温',
			editBTN: 1,
			dataNum: '37.0',
			dataCompany: '℃',
			dataTime:'2020-01-09 15:30',
			// 添加数据的滑尺范围
			rulerRange: [{
				left: 34,
				cont: 36.5,
				right: 42
			}],
			dataRange: [{
					low: '36', // 低于范围
					nor: '37.2', // 正常范围
					hig: '37.3'  // 高于范围
				}],
		  editId: 5
		},
		
		// 6 总胆固醇
		TotalCholesterol: {
			title: '总胆固醇',
			editBTN: 1,
			dataNum: '5.2',
			dataCompany: 'mmol/L',
			dataTime:'2020-01-09 15:30',
			// 添加数据的滑尺范围
			rulerRange: [{
				left: 0,
				cont: 4,
				right: 30
			}],
			dataRange: [{
					low: '0', // 低于范围
					nor: '5.1', // 正常范围
					hig: '5.2'  // 高于范围
				}],
		  editId: 6
		},
		
		// 7 尿酸
		uricAcid: {
			title: '尿酸',
			editBTN: 1,
			dataNum: '290',
			dataCompany: 'μmol/L',
			dataTime:'2020-01-09 15:30',
			// 添加数据的滑尺范围
			rulerRange: [{
				left: 0,
				cont: 200,
				right: 6000
			}],
			dataRange: [{
					low: '148', // 低于范围
					nor: '200', // 正常范围
					hig: '357'  // 高于范围
				}],
		  editId: 7
		},
			
		// 性别
		gender: -1,          
				
		// 身高
		height: -1,
		
		// 睡眠
		sleep: -1, 

	},
	// 首页banner
	store_homeBannerList: {},
	// 首页新闻列表
	store_homeNewsList: {},
	// 微信步数
	store_userWXStep: 666,
}

export default state