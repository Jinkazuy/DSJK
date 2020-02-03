<template>
	<div id="home">
		<div class="banner-wrapper">
			<special-banner :banner-list="bannerList" :swiper-config="swiperConfig"></special-banner>
		</div>
		<div class="changed-area-wrapper">
			<ul>
				<li v-for="(item, index) in changedArea" :key="index">
					<navigator :url="item.linkTo">
						<img :src="item.imgSrc">
						<p>{{item.text}}</p>
					</navigator>
				</li>
			</ul>
		</div>
		<div class="spaceX" @click='jk'></div>
		<div class="health-mg-wrapper">
			<h1 class="health-mg-title porcelain-title">健康管理</h1>
			<div class="health-mg-new-data-wrapper">
				<div class="health-mg-new-data-left">
					<h2 class="health-mg-new-data-left-title">最新数据</h2>
					<p class="health-mg-new-data-left-class">{{porcelainWhellCurrentLeftTitle}}</p>
					<p class="health-mg-new-data-left-date">{{porcelainWhellCurrentLeftTime}}</p>
				</div>
				<div class="health-mg-new-data-right">
					<!-- 使用uniapp自带轮播组件（也是微信自带的） -->
					<!-- https://uniapp.dcloud.io/component/swiper?id=swiper -->
					<swiper class="health-mg-swiper" autoplay="true" interval="3000" circular="true" vertical="true" disable-touch="true"
					 @change="swiperChange">
						<!-- 禁止滑动 -->
						<swiper-item @touchmove.stop>
							<!-- 体重 -->
							<div class="health-mg-new-data-righ-info-tiem">
								<p class="health-mg-new-data-righ-info-num">{{ store_userSignData.weight.dataNum==='-1'? '/' : store_userSignData.weight.dataNum }}</p>
								<p class="health-mg-new-data-righ-info-company">KG</p>
								<p class="health-mg-new-data-righ-info-type">体重</p>
							</div>
							<!-- BMI weight(KG)/Math.pow(height(M),2).toFixed(1)-->
							<div class="health-mg-new-data-righ-info-tiem">
								<p class="health-mg-new-data-righ-info-num">{{store_userSignData.weight.dataNum==='-1'? '/' : (store_userSignData.weight.dataNum / Math.pow((store_userSignData.height/100),2)).toFixed(1)}}</p>
								<p class="health-mg-new-data-righ-info-company">指数</p>
								<p class="health-mg-new-data-righ-info-type">BMI</p>
							</div>
						</swiper-item>
						<swiper-item @touchmove.stop>
							<div class="health-mg-new-data-righ-info-tiem">
								<p class="health-mg-new-data-righ-info-num">90</p>
								<p class="health-mg-new-data-righ-info-company">mmHg</p>
								<p class="health-mg-new-data-righ-info-type">收缩压</p>
							</div>
							<div class="health-mg-new-data-righ-info-tiem">
								<p class="health-mg-new-data-righ-info-num">140</p>
								<p class="health-mg-new-data-righ-info-company">mmHg</p>
								<p class="health-mg-new-data-righ-info-type">舒张压</p>
							</div>
						</swiper-item>
						<swiper-item @touchmove.stop>
							<div class="health-mg-new-data-righ-info-tiem">
								<p class="health-mg-new-data-righ-info-num">4.4</p>
								<p class="health-mg-new-data-righ-info-company">mmol/L</p>
								<p class="health-mg-new-data-righ-info-type">血糖</p>
							</div>
						</swiper-item>
					</swiper>
				</div>
			</div>
			<div class="step-and-tips">
				<div class="step" @click="getWXstep">
					<div class="step-title">今日步数</div>
					<div class="step-num">{{store_userSignData.step.dataNum==='-2'?'':store_userSignData.step.dataNum}}<span>{{store_userSignData.step.dataNum==='-2'?'点击查看步数':'步'}}</span></div>
					<div class="step-icon"><img src="../../static/images/index/bushu.svg"></div>
				</div>
				<div class="tips">
					<div class="tips-title">用药提醒</div>
					<div class="tips-time">15:00</div>
					<div class="tips-info no-wrap">布洛芬缓释胶囊胶囊胶囊胶囊胶囊胶囊</div>
					<span class="tips-info-arr">></span>
					<div class="tips-icon"><img src="../../static/images/index/yongyaotixing.svg"></div>
				</div>
			</div>
		</div>
		<div class="spaceX"></div>
		<div class="health-news-list-wrapper">
			<div class="health-news-list-title porcelain-title">健康资讯</div>
			<navigator url="../../pages/login/login" class="more-link">查看更多></navigator>
			<newsCard :newsList="newsList"></newsCard>
		</div>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</div>
</template>

<script>
	// 检测登录、token是否过期
	import {
		ximin_isLogin
	} from '@/utils/mixin.js'
	// 获取用户所有体征数据
	import {
		http_getIndexUserSignData
	} from '../../utils/http_getIndexUserSignData.js'
	// 获取首页banner列表
	import {
		http_getHomeBannerList
	} from '../../utils/http_getHomeBannerList.js'
	// 获取首页新闻列表
	import {
		http_getHomeNewsList
	} from '../../utils/http_getHomeNewsList.js'
	// 获取微信步数
	import {
		http_getWXStep
	} from '../../utils/http_getWXStep.js'
	// toast组件，拿到的不是组件，是方法；
	// 如此这般：Toast('我是提示文案，建议不超过十五字~');
	import Toast from '../../wxcomponents/vant/toast/toast'
	// 确认/取消弹窗
	import Dialog from '../../wxcomponents/vant/dialog/dialog'
	// vuex
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	// 轮播banner组件
	import specialBanner from '../../components/EtherealWheat-banner/specialBanner.vue'
	// 新闻卡片组件
	import newsCard from '../../components/news-card/newsCard.vue'
	export default {
		data() {
			return {
				// 新闻列表
				newsList: [],
				// 新闻列表页数，上滑+1，同时将数据push到newsList中
				newsPage: 1,
				newsOffset: 5,
				newsLimit: 5,
				bannerList: [],
				swiperConfig: {
					indicatorDots: true,
					indicatorColor: 'rgba(255, 255, 255, .4)',
					indicatorActiveColor: 'rgba(255, 255, 255, 1)',
					autoplay: true,
					interval: 3000,
					duration: 300,
					circular: true,
					previousMargin: '10rpx', // 左右banner露出的尺寸
					nextMargin: '10rpx'
				},
				// 金刚区
				changedArea: [{
					linkTo: '../../pages/login/login',
					imgSrc: '../../static/images/index/changed-tizhengceliang.png',
					text: '体征测量'
				}, {
					linkTo: '',
					imgSrc: '../../static/images/index/changed-zaixianzixun.png',
					text: '在线咨询'
				}, {
					linkTo: '',
					imgSrc: '../../static/images/index/changed-jiankangpinggu.png',
					text: '健康评估'
				}, {
					linkTo: '',
					imgSrc: '../../static/images/index/changed-wodeshebei.png',
					text: '我的设备'
				}],

				// 瓷片区最新数据，轮播 体重&BMI 、 血压 、 血糖
				porcelainWhellLeftTitle: [
					// 体重&BMI
					{
						// 显示数据的类型
						title: '体重',
						// 最后测量时间
						time: '2020-01-05 15:23:25'
					},
					// 血压
					{
						// 显示数据的类型
						title: '血压',
						// 最后测量时间
						time: '2020-01-05 15:23:25'
					},
					// 血糖
					{
						// 显示数据的类型
						title: '血糖',
						// 最后测量时间
						time: '2020-01-05 15:23:25'
					}
				],
				// 当前正在展示的左侧标题索引，初始值是0，后边根据轮播的变化，监听swiper的change事件，然后根据当前轮的内容的index切换
				porcelainWhellCurrentLeftTitle: '',
				porcelainWhellCurrentLeftTime: '',

				// 底部正在正在加载是否渲染
				bottomLoading: false,

				// jk
				jkNum: 0
			}
		},
		// onLoad页面加载钩子，只触发一次（卸载页面后，再进入页面会再次触发）；
		// 在页面加载时获取用户所有体征数据 & banner列表数据 & 新闻列表数据
		// 当页面加载时判断是否登录；
		// todo: 有网络的时候解开
		// mixins: [ximin_isLogin],
		onLoad() {
			this.getHomeDatas()
		},
		onShow() {
			// 因为获取微信步数授权问题，这里是为了在用户授权页打开步数授权后，跳转回来，自动获取步数
			// #ifdef MP-WEIXIN
			this.getWXstep()
			// #endif

			// 这里检测在onLoad的时候时候获取到了数据，如果没有的话，那么说明在onLoad的时候没有获取到数据，而且在之后没有触发onLoad钩子，
			// 所以在这里进行获取首页所需数据
			// 这里用新闻列表的内容组判断，当然也可以用别的数据做判断
			if (!this.newsList.length) {
				this.getHomeDatas()
			}
		},
		// 下拉刷新 
		onPullDownRefresh() {
			// 下拉刷新时，刷新数据，同onLoad
			this.getHomeDatas()
		},
		// 页面上滑、上拉 加载更多新闻数据
		async onReachBottom() {
			// onReachBottom使用注意 可在pages.json里定义具体页面底部的触发距离onReachBottomDistance，
			// 比如设为50，那么滚动页面到距离底部50px时，就会触发onReachBottom事件。
			console.log('==================')
			// 显示正在加载DOM元素
			Toast.loading({
				message: '加载更多资讯...',
				duration: 0 // 不主动消失
			});
			setTimeout(async () => {
				// todo:判断后台返回的最大值，是否还有内容；
				this.newsPage++
				let newsData = await http_getHomeNewsList(this.newsPage, this.newsOffset, this.newsLimit)
				console.log(newsData)

				if (this.newsPage > newsData.totalPage) {
					// 没有更多数据
					Toast('暂无更多资讯')
				} else {
					this.newsList = this.newsList.concat(newsData.list)
					Toast('加载完成')
				}
				// console.log(this.newsList)
			}, 2000)

		},
		methods: {

			async getHomeDatas() {

				// 瓷片区左侧标题
				this.porcelainLeftTitle()

				Toast.loading({
					message: '数据同步中...',
					forbidClick: true, // 是否禁止背景点击
					duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失，在触发其他弹窗或主动取消时消失
				})

				// 获取步数
				// 因为在onShow中获取微信步数了，那么这里就不用获取微信步数了

				// TODO:获取步数 - 其他端
				// 其他端获取步数后，同样：传给后台，然后从后台取


				// 获取首页所需体征数值：身高、体重、血压、血糖、用药提醒
				const getSign = await http_getIndexUserSignData()
				// banner数据
				this.bannerList = await http_getHomeBannerList()


				// 新闻数据
				this.newsList = []
				this.newsPage = 1
				let newData = {}
				newData = await http_getHomeNewsList(this.newsPage, this.newsOffset, this.newsLimit)
				if (!newData.totalCount <= 0 && !(newData.totalCount <= this.newsPage*this.newsOffset)) {
					// newsPage: 1,
					// newsOffset: 5,
					// newsLimit: 5,
					this.newsList = newData.list
				} else {
					Toast('暂无更多数据')
				}

				// setTimeout(()=>{},2000)
				// 判断用户体征是否获取到数据，
				// todo: 是否判断banner和news数据是否获取成功
				if (getSign) {
					Toast.success('数据同步成功')
					// 用户所有体征数据↓
					console.log('用户所有体征数据↓')
					console.log(this.store_userSignData)
					console.log('首页banner列表数据↓')
					console.log(this.bannerList)
					console.log('首页新闻列表数据↓')
					console.log(this.newsList)
				} else {
					// 用户所有体征数据↓
					console.log('用户所有体征数据↓')
					console.log(this.store_userSignData)
					console.log('首页banner列表数据↓')
					console.log(this.bannerList)
					console.log('首页新闻列表数据↓')
					console.log(this.newsList)
					Toast({
						type: 'fail',
						message: '数据同步失败，请检查网络后刷新重试',
						duration: 5000,
						onClose: () => {
							console.log('toast消失的回调函数')
						}
					})
				}

				// 下拉刷新也会触发此函数，所以这里结束刷新
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 1000)
			},


			// 瓷片区左侧标题循环定时器
			porcelainLeftTitle() {
				// 一开始显示索引0的内容,然后监听swiper的change事件,这个事件会拿到当前轮的索引值,然后用这个索引值决定左侧标题内容
				this.porcelainWhellCurrentLeftTitle = this.porcelainWhellLeftTitle[0]['title']
				this.porcelainWhellCurrentLeftTime = this.porcelainWhellLeftTitle[0]['time']
			},

			// 瓷片区轮播变化事件
			swiperChange(e) {
				this.porcelainWhellCurrentLeftTitle = this.porcelainWhellLeftTitle[e.detail.current]['title']
				this.porcelainWhellCurrentLeftTime = this.porcelainWhellLeftTitle[e.detail.current]['time']
			},

			// 获取微信步数
			getWXstep() {

				// 微信小程序步数、微信步数，调用这个借口前提是调用了login
				uni.getSetting({
					success: (res) => {
						// 用户已开启微信步数功能，但拒绝授权
						if (res.authSetting['scope.werun'] === false) {
							// 用户拒绝授权，需要到授权页开启授权；
							// https://developers.weixin.qq.com/community/develop/doc/000cea2305cc5047af5733de751008
							// 显示弹窗跳转到授权管理页面,开启步数授权
							Dialog.confirm({
								title: '获取微信步数',
								message: '您已拒绝获取微信步数信息，请在设置页面打开步数授权',
								// 关键是这个配置，这个配置控制打开微信授权页面
								confirmButtonOpenType: 'openSetting'
							}).then(() => {
								// on confirm
								wx.openSetting({
									complete: (res)=>{
										console.log(res)
									}
								})
								// 打开设置页后，设置完之后，那么页面onshow的时候就需要获取步数
							}).catch(() => {
								// on cancel
								console.log('用户拒绝跳转到授权页')
							});
						} else {
							// 用户已授权获取步数信息，获取步数信息
							wx.getWeRunData({
								success: async (res) => {
									// 将encryptedData & iv 发送给后台解密，换取步数信息，存储到本地
									await http_getWXStep(res.encryptedData, res.iv)
								},
								fail: (err) => {
									// 用户主动关闭微信步数授权
									if (err.errMsg === 'getWeRunData:fail cancel') {
										this.WXStep = -1
										Toast({
											type: 'fail',
											message: '请开启微信步数功能后，重新进入小程序',
											duration: 5000,
											onClose: () => {
												console.log('toast消失的回调函数')
											}
										})
									}
								}
							})
						}
					}
				})
			},

			...mapMutations({
				// 这里映射了这个方法，那么在调用x的时候，就等于使用了this.$store.commit('SET_SINGER', value)这个方法；
				setUserSignData_step: 'setUserSignData_step'
			}),

			jk() {
				this.jkNum++
				if (this.jkNum > 5) {
					Toast('By JinKazuya / 2020')
					this.jkNum = 0
				}
			}

		},
		computed: {
			// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
			...mapGetters(['store_userSignData', 'store_userWXStep'])
		},
		components: {
			specialBanner,
			newsCard
		}
	}
</script>

<style lang='scss'>
	#home {
		height: 100%;

		.banner-wrapper {
			/* margin: 10px 0 30rpx; */
			height: 300rpx;
			margin: 10rpx 0 20rpx;
		}

		.changed-area-wrapper {
			height: 180rpx;
			width: 100%;

			ul {
				width: 100%;
				height: 100%;
				padding: 0 36rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;

				li {
					width: 110rpx;

					img {
						width: 110rpx;
						height: 110rpx;
					}

					p {
						ling-height: 0;
						text-align: center;
						font-size: 24rpx;
						color: #444;
					}
				}
			}
		}

		.health-mg-wrapper {
			padding: 30rpx;
			width: 100%;
			height: 450rpx;
			box-sizing: border-box;

			.health-mg-new-data-wrapper {
				position: relative;
				width: 100%;
				height: 170rpx;
				border: 2rpx solid #6fd9d1;
				border-radius: 20rpx;
				overflow: hidden;
				margin-bottom: 20rpx;

				.health-mg-new-data-left {
					position: absolute;
					left: 0;
					height: 100%;
					width: 29.6%;
					background-color: rgba(173, 239, 234, .2);

					.health-mg-new-data-left-title {
						position: absolute;
						top: 20rpx;
						left: 20rpx;
						font-size: 28rpx;
						color: #353535;
						line-height: 1;
					}

					.health-mg-new-data-left-class {
						position: absolute;
						top: 80rpx;
						left: 50%;
						transform: translateX(-50%);
						font-size: 30rpx;
						color: #4ECCC2;
						line-height: 1;
						text-align: center;
						width: 100%;
					}

					.health-mg-new-data-left-date {
						position: absolute;
						top: 120rpx;
						left: 50%;
						transform: translateX(-50%);
						font-size: 16rpx;
						color: #999;
						line-height: 1;
						text-align: center;
						width: 100%;
					}
				}

				.health-mg-new-data-right {
					position: absolute;
					right: 0;
					width: 70.3%;
					height: 100%;

					/* 轮播 */
					.health-mg-swiper {
						height: 100%;
						width: 100%;

						swiper-item {
							height: 100%;
							width: 100%;
							padding: 0 76rpx;
							box-sizing: border-box;
							display: flex;
							justify-content: space-between;
						}
					}

					.health-mg-new-data-righ-info-tiem {
						height: 100%;
						flex: 1;
						text-align: center;
						display: flex;
						flex-direction: column;
						justify-content: center;
						line-height: 1;

						.health-mg-new-data-righ-info-num {
							font-size: 50rpx;
							font-weight: 700;
							color: #4ECCC2;
						}

						.health-mg-new-data-righ-info-company {
							margin-top: 14rpx;
							font-size: 24rpx;
							color: #999;
						}

						.health-mg-new-data-righ-info-type {
							margin-top: 14rpx;
							font-size: 28rpx;
							color: #444;
						}
					}
				}
			}

			.step-and-tips {
				position: relative;
				width: 100%;
				box-sizing: border-box;
				height: 150rpx;

				.step,
				.tips {

					.step-title,
					.tips-title {
						position: absolute;
						left: 20rpx;
						top: 20rpx;
						font-size: 28rpx;
						color: #353535;
						line-height: 1;
					}

					.step-icon,
					.tips-icon {
						position: absolute;
						bottom: 14rpx;
						right: 30rpx;
						width: 80rpx;
						height: 80rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.step {
					box-sizing: border-box;
					position: absolute;
					left: 0;
					top: 0;
					width: 49%;
					height: 100%;
					border: 2rpx solid #94d0f6;
					border-radius: 20rpx;
					background-color: #edf7fd;

					.step-num {
						position: absolute;
						left: 20rpx;
						bottom: 20rpx;
						color: #4ECCC2;
						font-size: 48rpx;
						font-weight: 700;

						span {
							font-size: 24rpx;
							color: #999;
							font-weight: 400;
							margin-left: 14rpx;
						}
					}
				}

				.tips {
					box-sizing: border-box;
					position: absolute;
					right: 0;
					top: 0;
					width: 49%;
					height: 100%;
					border: 2rpx solid #ffeaac;
					border-radius: 20rpx;
					background-color: #fcf8ec;

					.tips-time {
						position: absolute;
						left: 20rpx;
						top: 54rpx;
						font-size: 30rpx;
						color: #444;
					}

					.tips-info {
						position: absolute;
						left: 20rpx;
						bottom: 20rpx;
						font-size: 20rpx;
						width: 174rpx;
						color: #999;
					}

					.tips-info-arr {
						position: absolute;
						left: 186rpx;
						bottom: 22rpx;
						font-size: 20rpx;
						color: #999;
					}
				}
			}
		}

		.health-news-list-wrapper {
			position: relative;
			padding: 30rpx;
			box-sizing: border-box;

			.health-news-list-title {
				margin: 0;
			}

			.more-link {
				position: absolute;
				right: 30rpx;
				top: 20rpx;
				font-size: 24rpx;
				color: #999;
			}
		}
	}
</style>
