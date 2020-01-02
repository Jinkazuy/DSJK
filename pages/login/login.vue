<template>
	<!-- 这个@getuserinfo是uniapp提供的处理事件，只适用于微信小程序，在点击这个按钮后，会触发bindGetUserInfo，然后拿到用户点击弹窗授权的回调函数 -->
	<!-- 不同于@click，这个@getuserinfo只能在用户授权的弹窗，当用户点击拒绝或接受才会触发这个事件，并且这个事件只能用在小程序 -->
	<van-button type="primary" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" v-if="onLoginBTN">登录大善健康</van-button>
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
	export default {
		data () {
			return {
				// 授权按钮是否显示，当没有获取用户授权时，显示授权按钮
				onLoginBTN: false
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
						console.log('login-------------')
						http_login_setToken()
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
				
			} else if (!this.store_UserData.openid) { // 判断是否能够拿到包含敏感信息的用户信息
				console.log('用户基本信息')
				console.log(this.store_UserData)
				
			} else { // 用户数据和用户信息都可以拿到，允许进入其他页面
				
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
				    // res.authSetting = {
				    //   "scope.userInfo": true,
				    //   "scope.userLocation": true
				    // }
				  }
				})
			},
			
			
			// 获取用户信息授权
			// 获取用户信息
			getUserInfo () {
				console.log('用户已授权，获取用户信息↓↓↓')
				uni.getUserInfo({
				  success: (res) => {
						// 获取成功，存本地
					  console.log(res)
				    var userInfo = res.userInfo
				    var nickName = userInfo.nickName
				    var avatarUrl = userInfo.avatarUrl
				    var gender = userInfo.gender //性别 0：未知、1：男、2：女
				    var province = userInfo.province
				    var city = userInfo.city
				    var country = userInfo.country
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
						console.log(e.target)
						// 拿到用户基本信息此时的操作，
						// 1将用户基本信息储存到本地 
						this.setUserInfo()
						// 2 - 将 rawData 和 signature 发送给后台进行效验，然后拿到返回值：用户敏感信息
						// 使用util下自己封装的发送请求的函数 http_getUserInfo
						// 参数对象，格式是{rawData:xxx, signature: ''}
						http_getUserInfo ({rawData: e.target.rawData, signature: e.target.signature})
					} else {
						console.log('用户拒接登录，此时应显示弹窗告知用户“授权登录后才能使用xxx功能”')
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
				'store_token'
      ])
    },
	}
</script>

<style>
</style>
