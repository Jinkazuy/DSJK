<template>
	<div id="add-data">
		<div class="card-wrapper">
			<div class="title">{{editData.title}}</div>
			<div class="scroll-wrapper" v-for="(item, idx) in editData.dataRange" :key="idx">
				<div class="tips" v-if="editData.cursorSuffix.length">{{editData.cursorSuffix[idx]}}{{editData.cursorSuffix[idx]==='收缩压'?'(高压)':editData.cursorSuffix[idx]==='舒张压'?'(低压)':''}}</div>
				<div class="show-num-wrapper">
					<!-- 这里也要判断小数的项目，如果是的话，那么就要/10计算字体颜色 -->
					<div 
						:class="['show-num', 
						editData.rulerRange[idx].cont<=editData.dataRange[idx].low&&editData.editId!==1?'show-num-low'
						:editData.rulerRange[idx].cont>=editData.dataRange[idx].hig&&editData.editId!==1?'show-num-hig':'']"
						>
						<!-- 这里显示大号数字，还是要判断是否带小数，如果是带小数的，是整数时，后边拼接上 .0 -->
						{{
							editData.editId===3||editData.editId===5||editData.editId===6?
							(editData.rulerRange[idx].cont*10%10===0?editData.rulerRange[idx].cont+'.0':editData.rulerRange[idx].cont)
							:(editData.rulerRange[idx].cont)
						}}
					<span class="num-company">{{editData.dataCompany}}</span></div>
				</div>
				<scrollChoose 
					v-if="idx===0&&editData.editId!==3&&editData.editId!==5&&editData.editId!==6" 
					@scroll="onScrollFn1" 
					:scrollStart="editData.rulerRange[idx].left" 
					:scrollEnd="editData.rulerRange[idx].right" 
					:scrollLeft="editData.rulerRange[idx].cont" 
					:maginL="maginL"
					:rulerLow="editData.dataRange[idx].low"
					:rulerHig="editData.dataRange[idx].hig"
					:editId="editData.editId">
				</scrollChoose>
				<scrollChoose 
					v-if="idx===1&&editData.editId!==3&&editData.editId!==5&&editData.editId!==6" 
					@scroll="onScrollFn2" 
					:scrollStart="editData.rulerRange[idx].left" 
					:scrollEnd="editData.rulerRange[idx].right" 
					:scrollLeft="editData.rulerRange[idx].cont" 
					:maginL="maginL"
					:rulerLow="editData.dataRange[idx].low"
					:rulerHig="editData.dataRange[idx].hig"
					:editId="editData.editId">
				</scrollChoose>
				<!-- 小数的标尺() -->
				<!-- 因为是小数，所这这里传的时候需要扩大10倍，然后在这个小数标尺组件中要除以10倍显示 -->
				<folatScrollChoose
					v-if="idx===0&&(editData.editId===3||editData.editId===5||editData.editId===6)"
					@scroll="onScrollFn1" 
					:scrollStart="editData.rulerRange[idx].left*10" 
					:scrollEnd="editData.rulerRange[idx].right*10" 
					:scrollLeft="editData.rulerRange[idx].cont*10"
					:maginL="maginL"
					:rulerLow="editData.dataRange[idx].low*10"
					:rulerHig="editData.dataRange[idx].hig*10"
					:editId="editData.editId"
				>
				</folatScrollChoose>
				<!-- todo：目前需要小数标尺的项目只有一个标尺就够了，如果需要多个就按照上边的scrollChoose添加folatScrollChoose即可 -->
				<folatScrollChoose
					v-if="idx===1&&(editData.editId===3||editData.editId===5||editData.editId===6)"
					@scroll="onScrollFn2" 
					:scrollStart="editData.rulerRange[idx].left*10" 
					:scrollEnd="editData.rulerRange[idx].right*10" 
					:scrollLeft="editData.rulerRange[idx].cont*10"
					:maginL="maginL"
					:rulerLow="editData.dataRange[idx].low*10"
					:rulerHig="editData.dataRange[idx].hig*10"
					:editId="editData.editId"
				>
				</folatScrollChoose>
			</div>
			<div class="scroll-tips">左右滑动改变{{editData.title}}值</div>
		</div>
		<div class="mea-time-wrapper" @click="editTime">
			<div class="mea-text">测量时间</div>
			<div class="mea-time">{{userEditData.dataTime}}</div>
			<div class="arr-img"><img src="../../static/images/addData/arr.png"></div>
		</div>
		<div class="enter-btn" @click="upData">保 存</div>
		<!-- uniapp不支持vue的transition标签，但提供了:animation="xx"的方法 -->
		<!-- https://uniapp.dcloud.io/api/ui/animation -->
		<div class="time-picker-mask" @click="changeTimeCancel" :animation="animationPickerMask" v-show="editTimeShow"></div>
		<div class="van-datetime-picker-wrapper" :animation="animationPicker" v-show="editTimeShow">
			<van-datetime-picker
			  :type="datetime"
			  :value="currentDate"
			  :min-date="minDate"
			  :max-date="maxDate"
				:formatter="formatter"
				:item-height="40"
			  @change="changeTime"
			  @confirm="changeTimeEnter"
				@cancel="changeTimeCancel"
			/>
		</div>
	</div>
</template>

<script>
// 滑尺组件,这个组件是专门用来这个添加数据页面用的，和初始化用的不是一个组件
// 这个组件是包含小数的标尺组件
import folatScrollChoose from '../../components/scroll-choose/addpage-scroll-choose-flootNum.vue'
// 这个是不含小数的标尺组件
import scrollChoose from '../../components/scroll-choose/addpage-scroll-choose.vue'
// vuex
import {mapGetters,mapMutations} from 'vuex'
// 日期格式化
import {formatDate} from '../../utils/utils.js'
export default {
	data() {
		return {
			
			// 滚动标尺
			maginL: 5,//线间距
			
			
			// 默认是空对象，在拿到页面传参的数字，然后取store中取对应的editId对应的那项数据
			// 在onLoad的时候获取传过来的数字参数，然后赋值给这个editData，
			// 这个editData双向绑定，在用户修改后，点击提交时，将数据发送给后台，发送成功后，将数据同步到本地store中（就不需要再请求一次最新数据了）；
			editData: {},
			
			
			// 最终数据，对应着state中的store_userSignData
			userEditData: {
				dataNum: '',
				dataTime: formatDate(new Date())
			},
			
			// 是否显示时间选择器
			editTimeShow: false,
			
			// 时间选择器，上滑框
			minDate: new Date(2019, 10, 1).getTime(), 
			maxDate: new Date().getTime(),
			currentDate: new Date().getTime(),
			formatter(type, value) {
			  if (type === 'year') {
			    return `${value}年`
			  } else if (type === 'month') {
			    return `${value}月`
			  } else if (type === 'day') {
					return `${value}日`
				} else if (type === 'hour') {
					return `${value}时`
				} else if (type === 'minute') {
					return `${value}分`
				}
			  return value
			},
			
			// uniapp的animation需要
			animationPickerMask: {},
			animationPicker: {}

		}
	},
	onShow () {	
		
		console.log(new Date().getTime())
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
	onLoad(option) {
		// console.log(option.editId)
		// 因为对象没有length，所以用 for-in 遍历对象
		
		
		for (let index in this.store_userSignData){
				// 这里的index，拿到的是每个对象的键
				// 那么就可以根据每个对象的editId去判断是否等于传入的这个editId，然后赋值给本组件
				// 因为传参过来的是字符串，所以转一下数字
				
				// bloodPressure: {
				// 	title: '血压',
				// 	editBTN: 1,
				// 	dataNum: '-1',
				// 	dataCompany: 'mmHg',
				// 	dataTime:'2020-01-09 15:30',
				// 	cursorSuffix: ['收缩压', '舒张压'],
				// 	dataRange: [{
				// 			low: '90', // 低于范围
				// 			nor: '90-140', // 正常范围
				// 			hig: '140'  // 高于范围
				// 		},
				// 		{
				// 			low: '60', // 低于范围
				// 			nor: '60-90', // 正常范围
				// 			hig: '90'  // 高于范围
				// 		}],
				//   editId: 2
				// },

				if (this.store_userSignData[index].editId === parseInt(option.editId)) {
					console.log(index)
					this.editData = this.store_userSignData[index]
					console.log(this.editData)
					uni.setNavigationBarTitle({
					    title: this.editData.title + '手动添加'
					});
				}
		}
		

		// console.log(this.store_userSignData)
		// this.editData = 
		// 1 = 体重
		// 2 = 血压
		// 3 = 血糖
		// 4 = 心率
		// 5 = 体温
		// 6 = 总胆固醇
		// 7 = 尿酸
	},
	computed: {
		// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
		...mapGetters(['store_userSignData']),
	},
	methods: {
		// 第一个滚轮
		onScrollFn1(val) {
			console.log('标尺1值 => '+val)
			
			if (this.editData.editId === 3 || this.editData.editId === 5 || this.editData.editId === 6) {
				this.editData.rulerRange[0].cont = val/10
			} else {
				this.editData.rulerRange[0].cont = val
			}
		},
		// 第二个滚轮(血压)
		onScrollFn2(val) {
			console.log('标尺2值 => '+val)
			if(this.editData.rulerRange[1]) {
				this.editData.rulerRange[1].cont = val
			}
		},
		// 点击选择时间按钮
		editTime() {
			this.editTimeShow = true
			setTimeout(()=>{
				
				this.animation.opacity('1').step() // 设置动画，最后要跟上一个.step()
				this.animationPickerMask = this.animation.export() // 赋值，执行结束后会清空
				
				this.animation.bottom('0').step() // 设置动画，最后要跟上一个.step()
				this.animationPicker = this.animation.export() // 赋值，执行结束后会清空
			},40)
			
		},
		// 更改时间
		changeTime(e) {
			// 因为这个组件获取分、秒有问题，所以需要每个单独取值，然后做拼接，拼接成一个完整的时分秒的值
			// 这个函数是vant这个时间选择器组件提供的函数，返回值是选择框中的各项值：结构 => ["2020年", "01月", "01日", "01时", "00分"]
			// 日期时间格式 yyyy-MM-dd HH:mm:ss
			let t = e.detail.getValues()
			let yy = t[0].substr(0,t[0].length-1)
			let MM = t[1].substr(0,t[1].length-1)
			let dd = t[2].substr(0,t[2].length-1)
			let HH = t[3].substr(0,t[3].length-1)
			let mm = t[4].substr(0,t[4].length-1)
			let ss = '00' // 因为没有秒，这里拼接一个
			
			this.onChangeTime = yy+'-'+MM+'-'+dd+' '+HH+':'+mm+':'+ss
		},
		changeTimeEnter() {
			// 点击时间选择器右上角确认时
			
			// 如果不做选择的话，这里就拿不到changeTime函数中的t，所以this.onChangeTime是没有的，这里判断一下
			if(this.onChangeTime) {
				this.userEditData.dataTime = this.onChangeTime
			}
			
			// 做动画
			this.animation.opacity('0').step() // 设置动画，最后要跟上一个.step()
			this.animationPickerMask = this.animation.export() // 赋值，执行结束后会清空
			
			this.animation.bottom('-500rpx').step() // 设置动画，最后要跟上一个.step()
			this.animationPicker = this.animation.export() // 赋值，执行结束后会清空
			
			setTimeout(()=>{
				this.editTimeShow = false
			},400)
			
		},
		changeTimeCancel() {
			// 点击选择器取消按钮 || 点击选择器遮罩层

			// 做动画
			this.animation.opacity('0').step() // 设置动画，最后要跟上一个.step()
			this.animationPickerMask = this.animation.export() // 赋值，执行结束后会清空
			this.animation.bottom('-500rpx').step() // 设置动画，最后要跟上一个.step()
			this.animationPicker = this.animation.export() // 赋值，执行结束后会清空
			// 设置0.4秒后display=none
			setTimeout(()=>{
				this.editTimeShow = false
			},400)
			
		},
		// 提交数据
		upData() {
			console.log(this.editData)

			// 要提交的数据
			// 如果第二个滚轮存在，那么就拼接上，这个目前只有血压有第二个滚轮
			if(this.editData.rulerRange[1]){
				this.userEditData.dataNum = this.editData.rulerRange[0].cont + '/' + this.editData.rulerRange[1].cont
				console.log(this.userEditData.dataNum)
			} else {
				
				this.userEditData.dataNum = this.editData.rulerRange[0].cont
				console.log(this.userEditData.dataNum)
				
			}
			
			// 提交的时间
			console.log(this.userEditData.dataTime)
			
			
			
			// 这里进行判断
			// this.editData.editId 等于 几

			switch(this.editData.editId) {
				// 1 = 体重
			  case 1: 
			    console.log(this.editData.title) // 然后就调用相对应的api，发送数据
			    break;
				// 2 = 血压
				case 2:
				  console.log(this.editData.title) // 然后就调用相对应的api，发送数据
				  break;
				// 3 = 血糖
				case 3:
				  console.log(this.editData.title) // 然后就调用相对应的api，发送数据
				  break;
				// 4 = 心率
				case 4:
				  console.log(this.editData.title) // 然后就调用相对应的api，发送数据
				  break;
				// 5 = 体温
				case 5:
				  console.log(this.editData.title) // 然后就调用相对应的api，发送数据
				  break;
				// 6 = 总胆固醇
				case 6:
				  console.log(this.editData.title) // 然后就调用相对应的api，发送数据
				  break;
				// 7 = 尿酸	
				case 7:
				  console.log(this.editData.title) // 然后就调用相对应的api，发送数据
				  break;
			  
			}
		},
		...mapMutations({
			// 这里映射了这个方法，那么在调用x的时候，就等于使用了this.$store.commit('SET_SINGER', value)这个方法；
			// setUserSignData_step: 'setUserSignData_step'
		}),
	},
	components: {
		scrollChoose,
		folatScrollChoose
	}
} 	
</script>

<style lang="scss">
page {
	background-color: rgba(244,244,244,1);
}	
#add-data {
	position: relative;
	margin-top: 30rpx;
	.card-wrapper{
		padding-top: 20rpx;
		background-color: #fff;
		.title {
			margin: 0 0 40rpx 40rpx;
			font-size: 30rpx;
			line-height: 1;
			color: #444;
		}
		.scroll-wrapper {
			margin: 36rpx 0 80rpx;
			position: relative;
			.tips {
				position: absolute;
				left: 180rpx;
				top: 16rpx;
				font-size: 24rpx;
				color: #777;
			}
			.show-num-wrapper {
				margin-bottom: 30rpx;
				text-align: center;
				width: 100%;
				.show-num {
					padding-left: 13%;
					box-sizing: border-box;
					font-size: 60rpx;
					font-weight: 700;
					color: #4ECCC2;
					line-height: 1;
					.num-company {
						font-size: 24rpx;
						color: #9FA09F;
						line-height: 1;
						margin-left: 20rpx;
					}
				}
				.show-num-low{
					color: #F2C276;
				}
				.show-num-hig{
					color: #EE8172;
				}
			}
		}
		.scroll-tips {
			margin: -30rpx 0 0;
			padding-bottom: 30rpx;
			font-size: 24rpx;
			color: #999;
			line-height: 1;
			text-align: center;
		}
	}
	.mea-time-wrapper {
		position: relative;
		margin-top: 20rpx;
		padding: 20rpx 0;
		background-color: #fff;
		.mea-text {
			font-size: 24rpx;
			color: #777;
			line-height: 1;
			margin: 0 0 20rpx 40rpx;
		}
		.mea-time {
			font-size: 30rpx;
			color: #444;
			line-height: 1;
			margin-left: 40rpx;
		}
		.arr-img {
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);
			height: 30rpx;
			width: 16rpx;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
	.enter-btn {
		position: fixed;
		left: 50%;
		bottom: 70rpx;
		transform: translateX(-50%);
		width: 500rpx;
		height: 90rpx;
		border-radius: 45rpx;
		background-color: #4ECCC2;
		font-size: 36rpx;
		color: #fff;
		line-height: 90rpx;
		text-align: center;
	}
	// 背景遮罩
	.time-picker-mask {
		opacity: 0;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.4);
		transition: all .4s;
		z-index: 900;
	}
	// 时间选择器
	.van-datetime-picker-wrapper {
		opacity: 0;
		transition: all .4s;
		z-index: 999;
		position: fixed;
		left: 0;
		bottom: -500rpx;
		width: 100%;
		height: 500rpx;
		/* 清除日期选择器组件样式 */
			.van-picker {		
				
				height: 100% !important;
				.active-class {
					color: pink;
				}
				// height: 300rpx;
				overflow: hidden;
				// padding-top: 25rpx;
				box-sizing: border-box;
				/* 确定栏 */
				.van-hairline--top-bottom {
					font-size: 36rpx;
					.van-picker__confirm {
						color: #4ECCC2;
					}
					.van-picker__cancel {
						color: #444;
					}
				}
				.van-picker__columns {
					// margin-top: -100rpx;
		/* 			.van-picker-column__item {
						height: 100rpx !important;
					} */
					/* 未选中项 */
					.van-picker-column__item {
						font-size: 30rpx;
						color: #C3C3C3;
						transition: all .4s;
					}
					/* 选中项 */
					.van-picker-column__item--selected {
						color: #4ECCC2;
						font-size: 36rpx;
						font-weight: 700;
					}
				}
			}
			/* 给中间加底色，因为是van提供的组件，不能直接改，所以用伪元素 */
			// .van-picker::before {
			// 	position: absolute;
			// 	content: '';
			// 	top: 95rpx;
			// 	width: 100%;
			// 	height: 100rpx;
			// 	background-color: #EEE;
			// }
	}
}
</style>
