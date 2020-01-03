<template>
	<div id="page-login">
		<!-- 这个@getuserinfo是uniapp提供的处理事件，只适用于微信小程序，在点击这个按钮后，会触发bindGetUserInfo，然后拿到用户点击弹窗授权的回调函数 -->
		<!-- 不同于@click，这个@getuserinfo只能在用户授权的弹窗，当用户点击拒绝或接受才会触发这个事件，并且这个事件只能用在小程序 -->
		<van-button type="primary" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" v-if="onLoginBTN">登录大善健康</van-button>
		<van-button type="primary" open-type="getPhoneNumber" @getphonenumber="bindgetphonenumber" v-if="getPhoneBTN">获取手机号</van-button>
	</div>
</template>

<script>
	// 能够进入这个页面，说明当前用户未登录，这里进行登录操作；
	// 其他页面在监测用户是否登录，如果未登录，跳转到此页面；
	/* 页面逻辑
		 
	 */
	
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
			
			// 用户登录后，向后台换取token存储到本地
			await uni.login({
			  success: (loginRes) => {
					// 拿到用户登录Code，发送给后台，后台返回token值，将token存储到本地中；
					if (loginRes.code) {
						console.log('登录，获取token')
						http_login_setToken(loginRes.code)
					}
			  }
			})
			

			// 检查本地是否能够拿到用户信息、用户数据
			// 如果本地拿不到用户信息、用户数据，那么就执=> 1、行获取用户设置
			// 这里的storeUserInfo是通过vuex提供的辅助函数mapGetters，取到getters.js中的内容，目的：获取本地存储的用户信息（不包含敏感数据）
			if (!this.store_UserInfo.nickName) { 
				console.log('本地用户信息为空，尝试获取“获取用户信息的授权”')
				// 先显示页面时，就检查用户是否授权，如果未授权，提示授权，如果授权则进行登录；
				// 这个检测授权只能在小程序端使用,所以使用uniapp的条件渲染，取反，不在APP和H5执行这个函数
				// #ifndef  5+App || H5
				this.getSetting()
				// #endif
				
			}  else { // 用户数据和用户信息都可以拿到，允许进入其他页面
				// 用户已授权，隐藏登录按钮
				this.onLoginBTN = false
				console.log('拿到用户信息，检测用户手机号是否存在')
				this.ifStoreUserPhone()
			}
			
			

		},
		methods: {
			
			// 1、获取用户设置
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
						}
				  }
				})
			},
			
			
			// 获取用户信息授权
			// 获取用户信息
			getUserInfo () {
				let that = this
				uni.getUserInfo({
				  success: (res) => {
						// 获取成功，存本地
						console.log('用户已授权，获取用户信息↓↓↓')
					  console.log(res.userInfo)
						console.log('将信息存储到本地')
						that.setUserInfo(res.userInfo)
						console.log('当前本地用户信息↓')
						console.log(that.store_UserInfo)
						// 然后检测本地用户手机号
						that.ifStoreUserPhone()
				  }
				})
			},
			
			
			
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
						// 用户已授权，隐藏登录按钮
						this.onLoginBTN = false
						// 然后检测本地用户手机号
						this.ifStoreUserPhone()
						
					} else {
						console.log('用户拒接登录，此时应显示弹窗告知用户“授权登录后才能使用xxx功能”')
					}
			},
			// 检查本地是否能获取用户手机号
			ifStoreUserPhone () {
				console.log(this.$store)
				if (this.store_UserPhone!=='') {
					console.log('拿到手机号，本地用户手机号↓')
					console.log(this.store_UserPhone)
					console.log('单独判断用户基本体征数据(性别,出生日期,身高,体重)')
					console.log('全部(性别,出生日期,身高,体重)都有，跳转至首页')
					
					if (this.store_userBaseSign['gander'] !== '' && this.store_userBaseSign['birthDate'] !== '' && this.store_userBaseSign['height'] !== '' && this.store_userBaseSign['weight'] !== '') {
						// 全部都有数据，跳转至首页
						uni.switchTab({
							url: '../index/index',
							complete (res) {
								console.log(res)
							}
						})
					} else {
						// 重定向到设置用户基本体征数据
						uni.redirectTo({
							url: '../init_set_baseSign/init_set_baseSign',
							complete (res) {
								console.log(res)
							}
						})
					}
					
				} else {
					// 本地用户手机号为空
					console.log('本地手机号获取为空，显示获取手机号按钮')
					this.getPhoneBTN = true
				}
			},
			// 获取用户手机号事件的回调函数
			async bindgetphonenumber (e) {
				console.log('用户点击获取手机号按钮')
				console.log(e)
				if (e.detail.encryptedData) {
					console.log('用户授权手机号，拿到加密数据，发送给后台换取手机号')
					await http_getPhone(e.detail.encryptedData)
					// 等待换取手机号结束，检测本地手机号
					this.ifStoreUserPhone()
				} else {
					console.log('用户拒绝授权获取手机号')
				}
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
				'store_token',
				'store_UserPhone',
				'store_userBaseSign'
      ])
    },
	}
</script>

<style>
</style>
