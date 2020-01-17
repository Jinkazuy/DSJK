<template>
	<div id="set-base-sign">
		<!-- 第一页，性别、生日 -->
		<!-- uniapp不支持vue的transition标签，但提供了:animation="xx"的方法 -->
		<!-- https://uniapp.dcloud.io/api/ui/animation -->
		<div class="set-base-sign-one" :animation="animationSetOne">
			<!-- 选择性别 -->
			<div class="user-base-gender clearfix">
				<h1 class="user-base-gender-h1">您的性别</h1>
				<div class="user-base-gender-avat-wrapper">
					<div :class="['select-gender-m', {'select-gender-active':userSelectGender === '1'}]" @click="selectGender('1')">
						<div>
							<div class="avat-box"></div>
							<span>男</span>
						</div>
					</div>
					<div :class="['select-gender-w', {'select-gender-active':userSelectGender === '0'}]" @click="selectGender('0')">
						<div>
								<div class="avat-box"></div>
							<span>女</span>
						</div>
					</div>
				</div>
			</div>
			<!-- 选择生日 -->
			<div class="user-base-birth">
				<div class="user-base-birth-h1">您的生日</div>
				<van-datetime-picker
				  type="date"
				  :value="currentDate"
				  @input="onInput"
				  :min-date="minDate"
				  :formatter="formatter"
				/>
			</div>
			<van-button round type="primary" @click="setBaseNext">下一步</van-button>
		</div>
		<div class="set-base-sign-two" :animation="animationSetTwo">
			<p class="t-info">准确的身高体重，<br />有助于为您量身打造健康计划哦</p>
			<!-- 身高 -->
			<div class="user-base-height">
				<h1 class="user-base-height-h1">请选择您的身高</h1>
				<div class="num-wrapper"><span class="num">{{userHeight}}</span>cm</div>
				<div class="rl-wrapper">
					<!-- 第三方标尺组件 -->
					<ScrollChoose @scroll="heightScroll" :scrollStart="heightScrollStart" :scrollEnd="heightScrollEnd" :scrollLeft="heightScrollLeft" :maginL="heightMaginL"></ScrollChoose>
				</div>
			</div>
			<!-- 体重 -->
			<div class="user-base-weight">
				<h1 class="user-base-weight-h1">请选择您的体重</h1>
				<div class="num-wrapper"><span class="num">{{userWeight}}</span>KG</div>
				<div class="rl-wrapper">
					<!-- 第三方标尺组件 -->
					<ScrollChoose @scroll="widthScroll" :scrollStart="widthScrollStart" :scrollEnd="widthScrollEnd" :scrollLeft="widthScrollLeft" :maginL="widthMaginL"></ScrollChoose>
				</div>
			</div>
			<van-button round type="primary" @click="setBaseEnd">完成</van-button>
		</div>
		<div class="toast-mo">
			<van-toast id="van-toast" />
		</div>
	</div>
</template>

<script>
	// 格式化日期
	import {formatDate} from '../../utils/utils.js'
	// toast组件，拿到的不是组件，是方法；
	// 如此这般：Toast('我是提示文案，建议不超过十五字~');
	import Toast from '../../wxcomponents/vant/toast/toast'
	// 引入第三方的标尺组件
	import ScrollChoose from '../../components/scroll-choose/scroll-choose'
	// 向数据库发送用户4项基本信息
	import {http_setUserBaseSign} from '../../utils/http_setUserBaseSign.js'
	// 拿到vuex中的函数
	import {mapGetters} from 'vuex'

	export default {
		
		data() {
			return {

					// 记录当前用户选择
					userSelectGender: -1, // 性别
					// 用户选择生日
					userSelectBirth: '',	
					// 用户身高
					userHeight: 160,
					// 用户体重
					userWeight: 45.0,
					
					// 日期组件所需数据
					// 用户生日选择默认数据
					currentDate: 315588960000, // 此处基准是是1970年，单位为毫秒，定义默认显示的是 1980年1月1日
					
					minDate: -946080000000, // 此处基准是是1970年，单位为毫秒，这里的-940...是1940年
					
					formatter(type, value) {
					  if (type === 'year') {
					    return `${value}年`
					  } else if (type === 'month') {
					    return `${value}月`
					  }
					  return value
					},
					
					// 身高标尺初始值
					heightScrollLeftNow: 62,//页面显示
					heightScrollLeft: 160,//初始值
					heightScrollStart: 60,//滚动区域起始值
					heightScrollEnd: 250,//滚动区域终止值
					heightMaginL: 5,//线间距
					
					
					// 体重标尺初始值
					widthScrollLeftNow: 62,//页面显示
					widthScrollLeft: 45.0,//初始值
					widthScrollStart: 20.0,//滚动区域起始值
					widthScrollEnd: 150.0,//滚动区域终止值
					widthMaginL: 5,//线间距
					
					// uniapp的animation需要
					animationSetOne: {},
					animationSetTwo: {}
					
			}
		},
		
		onShow () {
			
			// 隐藏返回首页按钮，仅支持微信小程序
			// #ifdef MP-WEIXIN
			uni.hideHomeButton()
			// #endif
			
			// 获取用户性别，设置一个默认选择性别，如果用户需要更换，手动点击即可
			setTimeout(()=>{
				if (this.store_UserInfo.gender === 1) {
					this.userSelectGender = '1'
				} else if (this.store_UserInfo.gender === 0) {
					this.userSelectGender = '0'
				}
			},200)
			
			// 初始化uniapp提供的animation方法
			// 这个animation使用方法是：
			// 1 设置一个动画 然后export，export 方法每次调用后会清掉之前的动画操作
			// 2 将export的对象赋值给某个animation对象
			this.animation = uni.createAnimation({
				// 跟多配置看文档 https://uniapp.dcloud.io/api/ui/animation
			  duration: 400, // 动画持续时间，单位ms
			  timingFunction: 'ease', // 动画曲线
			})
		},
		
		methods: {
			
			// 选择性别
			selectGender (val) {
				// 选择性别
				this.userSelectGender = val
				
				if (this.userSelectGender === '1') {
					// 重置男女身高基本值
					// 男
					this.heightScrollLeft = 170
					this.widthScrollLeft = 65
					this.userHeight = 170
					this.userWeight = 65
				} else {
					// 女
					this.heightScrollLeft = 160
					this.widthScrollLeft = 45
					this.userHeight = 160
					this.userWeight = 45
				}
			},
			
			// 用户选择生日
			async onInput(e) {
				// e.datail 就是用户选择的 日期毫秒数,基准是是 1970年1月1日
				// 向后台提交的数据格式为：yyyy-MM-dd HH:mm:ss
				// 那utils/utils自己封装的格式化日期函数
				let d = new Date(e.detail)
				this.userSelectBirth = await formatDate(d)
			},
			
			// 身高标尺回调事件
			heightScroll(val) {
				this.userHeight = val
			},
			
			// 体重标尺回调
			widthScroll(val) {
				this.userWeight = val
			},

			// 设置完性别和生日，点击下一步按钮 ，设置身高和体重
			setBaseNext () {
				// 判断用户性别和年龄是否选择
				if (this.userSelectGender === -1) {
					// 用户没有选择性别，提示toast浮层提示
					// https://youzan.github.io/vant-weapp/#/toast
					Toast('请选择您的性别')
				} else if (this.userSelectBirth === '') {
					// 用户未选择生日，因为有默认值这不基本不存在
					// 当然可能出现组件卡顿的情况，所以还是渲染一下
					Toast('请选择您的生日')
				} else {
					
					// 用户性别和生日都有，那么隐藏性别生日组件，显示身高体重组件
					// 这里用animation作动画，做跳转页面的障眼法,所以就不用v-if做判断了；
					
					// 先让性别年龄模块左移-100%
					this.animation.left('-100%').step() // 设置动画，最后要跟上一个.step()
					this.animationSetOne = this.animation.export() // 赋值，执行结束后会清空
					
					// 然后升高体重模块右左移100%
					this.animation.left('0%').step() // 设置动画，最后要跟上一个.step()
					this.animationSetTwo = this.animation.export() // 赋值，执行结束后会清空
				}
			},
			
			
			// 设置完身高体重
			async setBaseEnd () {
				// 判断4项基础数据是否完整，

				let userBaseSign = {
					userGender : this.userSelectGender,
					userBirth : this.userSelectBirth,
					userHeight : this.userHeight,
					userWeight : this.userWeight
				}
				
				// TODO数据完整，发送到数据库，并存储到本地；
				// 等待return值，为true则代表发送成功
				let res = await http_setUserBaseSign(userBaseSign)
				
				if(res) {
					uni.switchTab({
						url: '../index/index',
						complete (res) {
							console.log(res)
						}
					})
				} else {
					Toast('网络异常，请稍后重试')
					// 刷新此页面
					setTimeout(()=>{
						uni.reLaunch({
							 url: '../init_set_baseSign/init_set_baseSign'
						})
					},2000)
				}
			}
		},
		components: {
			// 引入第三方的标尺组件
			ScrollChoose
		},
		computed: {
			// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
      ...mapGetters([
        'store_UserInfo'
      ])
    }
	}
</script>

<style lang='scss'>
	#set-base-sign {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fafafa;
		/* 性别生日模块样式 */
		.set-base-sign-one {
			position: absolute;
			left: 0%;
			transition: all .4s;
			width: 100%;
			.user-base-gender {
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 100%;
				margin: 80rpx 0 120rpx;
				.user-base-gender-h1 {
					color: #333333;
					font-size: 36rpx;
					font-weight: 700;
					text-align: center;
				}
				.user-base-gender-avat-wrapper {
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 64rpx;
					width: 100%;
					.select-gender-m, .select-gender-w {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 160rpx;
						height: 200rpx;
						text-align: center;
						.avat-box {
							margin-bottom: 10rpx;
							display: block;
							border-radius: 50%;
							width: 160rpx;
							height: 160rpx;
							background-repeat: no-repeat;
							background-size: 100%;
						}
						span {
							color: #333;
							font-size: 30rpx;
						}
					}
					.select-gender-m {
						margin-right: 140rpx;
						.avat-box {
							background-image: url(../../static/images/init_set_baseSign/man.png);
						}
					}
					.select-gender-w {
						.avat-box {
							background-image: url(../../static/images/init_set_baseSign/women.png);
						}
					}
					.select-gender-active.select-gender-m {
						span {
							color: skyblue;
							font-weight: 700;
						}
						.avat-box {
							background-image: url(../../static/images/init_set_baseSign/man-select.png);
						}
					}
					.select-gender-active.select-gender-w {
						span {
							color: deeppink;
							font-weight: 700;
						}
						.avat-box {
							background-image: url(../../static/images/init_set_baseSign/women-select.png);
							background-size: 92.6%;
							background-position: center;
						}
					}
				}
			}
			.user-base-birth {
				.user-base-birth-h1 {
					color: #333333;
					font-size: 36rpx;
					font-weight: 700;
					text-align: center;
				}
			}
			/* 重置按钮样式 */
			.van-button--primary{
				display: block;
				margin: 100rpx auto 0!important;
				width: 600rpx;
				height: 80rpx;
				color: #fff !important;
				background-color: #4ECCC2 !important;
				line-height: 80rpx !important;
				text-align: center;
				border: none !important;
			}
		}
	  /* 身高体重模块样式 */
		.set-base-sign-two {
			/* display: none; */
			position: absolute;
			/* left: 95%; */
			left: 100%;
			transition: all .4s;
			width: 100%;
			.t-info {
				width: 100%;
				color: #C4C4C4;
				font-size: 30rpx;
				line-height: 22px;
				text-align: center;
				margin: 40rpx 0 90rpx;
			}
			.user-base-height, .user-base-weight {
				h1 {
					color: #333333;
					font-weight: 700;
					width: 100%;
					text-align: center;
					margin-bottom: 24rpx;
				}
				.num-wrapper {
					text-align: center;
					font-size: 30rpx;
					color: #ccc;
					.num {
						font-size: 48rpx;
						font-weight: 700;
						color: #4ECCC2;
						margin: 0 6rpx 10rpx 0;
					}
				}
				.rl-wrapper {
					margin-bottom: 90rpx;
				}
			}
			/* 重置按钮样式 */
			.van-button--primary{
				display: block;
				margin: 130rpx auto 0!important;
				width: 600rpx;
				height: 80rpx;
				color: #fff !important;
				background-color: #4ECCC2 !important;
				line-height: 80rpx !important;
				text-align: center;
				border: none !important;
			}
		}
	}
	
	/* 重置标尺样式 */
	.scroll-choose-all {
		border: none !important;
		background-color: #F6F6F6 !important;
		.middleLine {
			background-color: #4ECCC2 !important;
		}
	}
	/* 清除日期选择器组件样式 */
	.van-picker {
		margin-top: 50rpx;
		height: 300rpx;
		overflow: hidden;
		padding-top: 25rpx;
		box-sizing: border-box;
		background-color: rgba(255,255,255,0) !important;
		/* 隐藏确定栏 */
		.van-hairline--top-bottom {
			display: none;
		}
		/*  */
		.van-picker__columns {
			margin-top: -100rpx;
/* 			.van-picker-column__item {
				height: 100rpx !important;
			} */
			/* 未选中项 */
			.van-picker-column__item {
				font-size: 36rpx;
				color: #C3C3C3;
				transition: all .4s;
			}
			/* 选中项 */
			.van-picker-column__item--selected {
				color: #333333;
				font-size: 40rpx;
			}
		}
	}
	/* 给中间加底色，因为是van提供的组件，不能直接改，所以用伪元素 */
	.van-picker::before {
		position: absolute;
		content: '';
		top: 95rpx;
		width: 100%;
		height: 100rpx;
		background-color: #EEE;
	}
</style>
