<template>
	<div id="page-login">
		<div class="logo-wrapper">
				<img src="../../static/images/login/ds-logo.svg">
				<p>您&nbsp;身&nbsp;边&nbsp;的&nbsp;健&nbsp;康&nbsp;小&nbsp;助&nbsp;手</p>
		</div>
		<!-- 这个@getuserinfo是uniapp提供的处理事件，只适用于微信小程序，在点击这个按钮后，会触发bindGetUserInfo，然后拿到用户点击弹窗授权的回调函数 -->
		<!-- 不同于@click，这个@getuserinfo只能在用户授权的弹窗，当用户点击拒绝或接受才会触发这个事件，并且这个事件只能用在小程序 -->
		<div class="page-login-btn">
			<van-button round type="primary" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" v-if="onLoginBTN">登录大善健康</van-button>
			<van-button round type="primary" open-type="getPhoneNumber" @getphonenumber="bindgetphonenumber" v-if="getPhoneBTN">获取手机号</van-button>
		</div>
		<van-toast id="van-toast" />
	</div>
</template>

<script>
	
	// toast组件，拿到的不是组件，是方法；
	// 如此这般：Toast('我是提示文案，建议不超过十五字~');
	import Toast from '../../wxcomponents/vant/toast/toast'
	
	// 拿到vuex中的函数
	import {mapGetters, mapMutations} from 'vuex'
	// 引入自己封装的发送http请求的函数
	import {http_login_setToken} from '../../utils/http_login_setToken.js'
	import {http_getPhone} from '../../utils/http_getPhone.js'
	export default {
		data () {
			return {
				// 授权按钮是否显示，当没有获取用户授权时，显示授权按钮
				onLoginBTN: false,
				// 获取用户手机号按钮
				getPhoneBTN: false
			}
		},
		// 监听页面显示。
		// 页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
		async onShow () {
			
			// 隐藏返回首页按钮，仅支持微信小程序
			// #ifdef MP-WEIXIN
			uni.hideHomeButton()
			// #endif
			

			/*
			* 页面功能逻辑：
			* 1、获取用户本地的信息
			* 2、获取到用户基本信息后 - 获取手机号
			* 3、获取手机号后 - 获取token，刷新token过期时间；
			* 
			* 
			*/
			this.getSetting()
			
			

		},
		// 页面加载
		onLoad(val) {
			if(val.onLoadErrMsg){
				Toast(val.onLoadErrMsg)
			}
		},
		// 页面卸载
		onUnload() {},
		methods: {
			
			/* 
			* 获取用户设置
			*/
			getSetting () {
				uni.getSetting({
				  success: (res) => {
						if (res.authSetting["scope.userInfo"]) {
							console.log('已获取用户“用户信息授权，直接获取用户信息（非敏感数据）”')
							// 用户已授权：用户信息
							// 获取用户信息
							this.getUserInfo()
						} else {
							// 未授权用户信息,显示授权用户信息按钮，隐藏其他按钮；
							this.onLoginBTN = true
							this.getPhoneBTN = false
						}
				  }
				})
			},
			
			
			/**
			* 获取用户信息授权
			* 获取用户信息
			*/
			getUserInfo () {
				uni.getUserInfo({
				  success: (res) => {
						// 获取成功，存本地
						console.log(res)
						console.log('用户已授权，获取用户信息↓↓↓')
					  console.log(res.userInfo)
						console.log('将信息存储到本地')
						this.setUserInfo(res.userInfo)
						
						
						// 获取token，将用户加密信息发送给后台
						this.loginAndGetToken(res.encryptedData, res.iv)
				  }
				})
			},
			
			
			
		 /**
		 * @param obj[auto]
		 * @return null
		 * 备注：点击open-type="getUserInfo"按钮时 触发@getuserinfo事件，将参数自动传递至bindGetUserInfo (e) 中
		 */
		 // 用户点击授权按钮后，弹出弹窗，然后在弹窗点取消或授权，会进入这个函数
		 // 这个@getuserinfo是uniapp提供的处理事件，只适用于微信小程序，
		 // 在点击这个按钮后，会触发bindGetUserInfo，然后拿到用户点击弹窗授权的回调函数
		 // 不同于@click，这个@getuserinfo只能在用户授权的弹窗，当用户点击拒绝或接受才会触发这个事件，并且这个事件只能用在小程序
			bindGetUserInfo (e) {
					console.log('用户点击授权按钮')
					console.log(e)
					if (e.target.userInfo) {
						console.log('用户已授权-获取用户信息')
						console.log(e.target.userInfo)
						// 拿到用户基本信息此时的操作，
						// 将用户基本信息储存到本地 
						console.log('将信息存储到本地')
						this.setUserInfo(e.target.userInfo)
						console.log('当前本地用户信息↓')
						console.log(this.store_UserInfo)
						
						// 用户登录后，向后台换取token存储到本地
						// 这里不去效验本地是否有token，因为：用户信息可能更新、变动，
						// 所以，这里把当前操作用户的加密数据发送给后台，后台解码后将用户信息和最终登录日期等数据入库；
						this.loginAndGetToken(e.detail.encryptedData, e.detail.iv)

						
					} else {
						Toast('需要您的授权才能登录')
						console.log('用户拒接登录，此时应显示弹窗告知用户“授权登录后才能使用xxx功能”')
					}
			},
			
			/**
			* 检查本地是否能获取用户手机号
			*/
			async ifStoreUserPhone () {
				// 用户基本信息和详细信息中都有手机号
				if (this.store_UserPhone!=='' || this.store_UserInfoData.mobile!==null) {
					console.log('拿到手机号，本地用户手机号↓')
					console.log(this.store_UserPhone || this.store_UserInfoData.mobile)
					console.log('单独判断用户基本体征数据(性别,出生日期,身高,体重)')
					console.log('全部(性别,出生日期,身高,体重)都有，跳转至首页')
					
					// 此时已经拿到数据库用户的详细信息，进行判断
					// if (
					// this.store_UserInfoData['gender'] !== -1 
					// && this.store_UserInfoData['gender'] !== null 
					// && this.store_UserInfoData['birth'] !== null  
					// && this.store_UserInfoData['height'] !== null 
					// && this.store_UserInfoData['weight'] !== null
					// ) {
						if (1) {
						// 全部都有数据，跳转至首页
						// TODO 同时去数据库拉取用户的更多数据
						uni.switchTab({
							url: '../index/index',
							complete (res) {
								console.log(res)
							}
						})
					} else {
						// TODO 从数据库获取该用户的基本体征 （身高、体重、生日）这三个都是单独的表，
						// 也就是需要单独请求，但不是在这里，而是封装到一个文件中，这里只调用这个文件的函数即可
						// let UserBase = await http_getUserBaseSign() // TODO这个方法没写，后台接口也没写呢；
						// if (UserBase) {
						if (0) {
							// 如果从数据库拉取到了用户基本信息,那么也直接跳转到首页
							uni.switchTab({
								url: '../index/index',
								complete (res) {
									console.log(res)
								}
							})
						} else {
							// 跳转到设置用户基本体征数据
							uni.navigateTo({
								url: '../init_set_baseSign/init_set_baseSign',
								complete (res) {
									console.log(res)
								}
							})
						}
					}
					
				} else {
					// 本地用户手机号为空
					console.log('本地手机号获取为空，显示获取手机号按钮')
					this.getPhoneBTN = true
				}
			},
			
			/**
			 * @param obj[auto]
			 * @return null
			 * 备注：点击open-type="getPhoneNumber"按钮时 触发@getphonenumber事件，将参数自动传递至bindgetphonenumber (e) 中 
			*/
			async bindgetphonenumber (e) {
				console.log('用户点击获取手机号按钮')
				console.log(e)
				if (e.detail.encryptedData) {
					console.log('用户授权手机号，拿到加密数据，发送给后台换取手机号')
					await http_getPhone(e.detail.encryptedData, e.detail.iv)
					// 等待换取手机号结束，检测本地手机号
					this.ifStoreUserPhone()
				} else {
					Toast('请您授权获取手机号')
					console.log('用户拒绝授权获取手机号')
				}
			},
			
			/* 
			* 获取token，将用户加密信息发送给后台
			*/
			async loginAndGetToken (encryptedData, iv) {
				// 用户登录后，向后台换取token存储到本地
				uni.login({
				  success: async (loginRes) => {
						// 拿到用户登录Code，发送给后台，后台返回token值，将token存储到本地中；
						if (loginRes.code) {
							console.log('登录，获取token')
							let httpRes = await http_login_setToken(loginRes.code, encryptedData, iv)
							// 登录失败
							console.log(httpRes)
							if(!httpRes) {
								// 显示登录按钮，隐藏其他按钮
								this.onLoginBTN = true
								this.getPhoneBTN = false
							} else {
								// 登录成功，执行获取手机号步骤
								// 登录 & 获取token成功
								// 显示登录按钮，隐藏其他按钮
								this.onLoginBTN = false
								this.getPhoneBTN = true
								// 然后检测本地用户手机号
								this.ifStoreUserPhone()
							}
						}
				  }
				})
			},
			...mapMutations({
			        // 这里映射了这个方法，那么在调用x的时候，就等于使用了this.$store.commit('SET_SINGER', value)这个方法；
			        setUserInfo: 'setUserInfo',
							setToken: 'setToken'
			})
		},
		computed: {
			// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
      ...mapGetters([
        'store_UserInfo',
				'store_UserInfoData', // 用户详细数据
				'store_token',
				'store_UserPhone',
				'store_userBaseSign'
      ])
    }
	}
</script>

<style>
	#page-login {
	}
	.logo-wrapper {
		width: 100%;
		height: 200rpx;
		margin-top: 154rpx;
		text-align: center;
	}
	.logo-wrapper>img{
		display: block;
		margin: 0 auto;
		width: 380rpx;
		height: 120rpx;
	}
	.logo-wrapper>p{
		margin-top: 20rpx;
		color: #777;
	}
	.page-login-btn {
		display: flex;
		justify-content: center;
	}
	.van-button--primary{
		margin: 100rpx auto 0!important;
		width: 400rpx;
		color: #fff !important;
		background-color: #4ECCC2 !important;
		border: none !important;
		font-size: 36rpx !important;
		line-height: 36rpx !important;
	}
</style>
