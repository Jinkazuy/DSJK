<template>
	<div class="health-card" v-if="title!==''">
		<div class="card-wrapper">
			<div class="card-title">{{title}}</div>
			<div class="card-edit-btn" v-if="editBTN===1" @click="onEditPage">
				<img src="../../static/images/health/editIcon.png">
			</div>
			<div class="card-edit-switch" v-if="editBTN===2" @click="changeEq"><span>来源：{{eqType}}</span><img src="../../static/images/health/switch.png"></div>
			<!-- 总步数，只有editBtn=2也就是显示切换设备的时候，说明这是步数，所以也用editBTN===2来判断是否渲染 -->
			<div class="step-today" v-if="editId===0&&dataNum!=='-1'">今日总步数</div>
			<div class="step-today-nosetp" v-if="editId===0&&dataNum==='-1'" @click="noStepInfo">无法获取今日步数<img src="../../static/images/health/help.png"></img></div>
			<!-- 这里dataNum在store每项都是-2，在获http请求失败或者请求无数的时候，都设置为-1 -->
			<!-- 因为这个组件不是页面，所以引入组件就用vue原生方式import xx from 引入加载组件 -->
			<div class="data-num-load" v-if="dataNum==='-2'"><vantLoading color="#4ECCC2" /></div>
			<!-- 步数卡片数字 -->
			<div class="data-num" v-if="dataNum!=='-2'&&editId===0&&dataNum!=='-1'">{{dataNum==='-1'?'':dataNum}}<span class="data-company">{{dataCompany===''||dataNum==='-1'?'':dataCompany}}</span></div>
			<!-- 其他卡片数字 -->
			<div class="data-num" v-if="dataNum!=='-2'&&editId!==0">{{dataNum==='-1'?'-.-':dataNum}}<span class="data-company">{{dataCompany===''?'':dataCompany}}</span></div>
			<!-- 体重、血糖数值下的小说明 -->
			<div class="data-tips" v-if="dataTips!==''&&dataNum!=='-1'&&dataNum!=='-2'">{{dataTips}}</div>
			<!-- 范围值条 -->
			<div class="data-range-wrapper" v-if="dataRange.length&&dataNum!=='-1'&&dataNum!=='-2'" v-for="(item, idx) in dataRange" :key="idx">
				<div class="data-range-strip-box">
					<div class="range-strip-wrapper">
						<div class="data-range-low">
							<div class="range-strip"></div>
							<div class="range-comp">{{item.low}}&lt;</div>
							<div class="range-text">低于正常范围</div>
						</div>
						<div class="data-range-nor" v-if="item.nor">
							<div class="range-strip"></div>
							<div class="range-comp">{{item.nor}}</div>
							<div class="range-text">正常范围</div>
						</div>
						<div class="data-range-hig">
							<div class="range-strip"></div>
							<div class="range-comp">&gt;{{item.hig}}</div>
							<div class="range-text">高于正常范围</div>
						</div>
					</div>
					<!-- 这里不能直接用数值和最小值做对比，会出bug，只能用数值减去最小值是否<=0来判断 -->
					<!-- 先判断是否 小于 最小值 -->
					<!-- 然后在判断是否 小于 最大值 -->
					<!-- 最后 如果 不是小于最小值 也 不大于最最大值，那么结果只能是正常范围内了 -->
					<div class="data-range-float-strip" v-if="item.nor" :style="{
						left:(dataNum.indexOf('/')===-1?dataNum:idx===0?dataNum.substring(0,dataNum.indexOf('/')):dataNum.substring(dataNum.indexOf('/')+1))-item.low
						<=0?
						(dataNum.indexOf('/')===-1?dataNum:idx===0?dataNum.substring(0,dataNum.indexOf('/')):dataNum.substring(dataNum.indexOf('/')+1))/item.low*33.333+'%'
						:(dataNum.indexOf('/')===-1?dataNum:idx===0?dataNum.substring(0,dataNum.indexOf('/')):dataNum.substring(dataNum.indexOf('/')+1))-item.hig
						<=0?
						(dataNum.indexOf('/')===-1?dataNum:idx===0?dataNum.substring(0,dataNum.indexOf('/')):dataNum.substring(dataNum.indexOf('/')+1))/item.hig*66.666+'%'
						:'85%'
					}">
						<!-- 这里可能会出现80/100这种数值，所以先使用indexOf找到这个/,如果找到了，就用subString截取 -->
						<!-- 截取的规则，也是根据当前的idx，如果idx是1，那么就从indexOf的结果值向前找，如果是2那么就从那么就从indexOf的结果值向前找 -->
						<span>
						{{cursorSuffix.length===0?'':cursorSuffix[idx]+' '}}
						{{
							dataNum.indexOf('/')===-1?dataNum:idx===0?dataNum.substring(0,dataNum.indexOf('/')):dataNum.substring(dataNum.indexOf('/')+1)
						}}</span>
						<!-- dataNum.substring(0,dataNum.indexOf('/')) -->
						<!-- dataNum.substring(dataNum.indexOf('/')) -->
					</div>
					<div class="data-range-float-strip" v-if="!item.nor" :style="{
						left:
						(dataNum.indexOf('/')===-1?dataNum:idx===0?dataNum.substring(0,dataNum.indexOf('/')):dataNum.substring(dataNum.indexOf('/')+1))-item.hig
						<=0?
						(dataNum.indexOf('/')===-1?dataNum:idx===0?dataNum.substring(0,dataNum.indexOf('/')):dataNum.substring(dataNum.indexOf('/')+1))/item.hig*50+'%'
						:'70%'
					}">
						<!-- 这里可能会出现80/100这种数值，所以先使用indexOf找到这个/,如果找到了，就用subString截取 -->
						<!-- 截取的规则，也是根据当前的idx，如果idx是1，那么就从indexOf的结果值向前找，如果是2那么就从那么就从indexOf的结果值向前找 -->
						<span>
						{{cursorSuffix.length===0?'':cursorSuffix[idx]+' '}}
						{{
							dataNum.indexOf('/')===-1?dataNum:idx===0?dataNum.substring(0,dataNum.indexOf('/')):dataNum.substring(dataNum.indexOf('/')+1)
						}}</span>
						<!-- dataNum.substring(0,dataNum.indexOf('/')) -->
						<!-- dataNum.substring(dataNum.indexOf('/')) -->
					</div>
				</div>
			</div>
			<!-- 最新日期 -->
			<div class="data-time" v-if="dataTime!==''&&dataNum!=='-1'&&dataNum!=='-2'">{{dataTime}}</div>
			<div class="to-add-tips" v-if="dataNum==='-1'&&editId!==0">您还没有添加血压数据，赶快去添加吧！</div>
		</div>
	</div>
</template>

<script>
import vantLoading from '../../wxcomponents/vant/loading/index'
export default {
	data() {
		return {
		}
	},
	// 等待父级传入数据
	props: {
		
		// 卡片表头
		title: {
			type: String,
			default () {
				// 表头为空，则直接不渲染这个组件
				return ''
			}
		},
		
		// 右上角 是编辑按钮 还是 切换设备按钮（步数）
		// 除了步数有切换设备按钮外，其他的都是编辑按钮
		// 今日总步数 是否显示 也用这个判断
		editBTN: {
			type: Number,
			default () {
				// 1 代表编辑按钮 2代表切换按钮
				return 2
			}
		},
		
		// 步数来源设备类型
		eqType: {
			type: String,
			default () {
				// 表头为空，则直接不渲染这个组件
				return ''
			}
		},
		
		// 具体数值，最大的数值，有的带有/所以用字符串
		dataNum: {
			type: String,
			default () {
				return '-1'
			}
		},
		
		// 数值的具体单位
		dataCompany: {
			type: String,
			default () {
				return ''
			}
		},
		
		// 标题下方的文字（部分有，部分没有）
		dataTips: {
			type: String,
			default () {
				return ''
			}
		},
		
		// 游标文字的后戳
		cursorSuffix: {
			type: Array,
			default () {
				return []
			}
		},
		
		// 最新数据测量时间
		dataTime: {
			type: String,
			default () {
				return ''
			}
		},
		
		// 数据范围，有可能是多个（目前只有血压是2个范围值，但不一定只有血压，所以做成数组）
		// 数据结构
		// [
		// 	[
		// 		low: num, // 低于范围
		// 		nor: num, // 正常范围
		// 		hig: num  // 高于范围
		// 	],
		// 	[
		// 		low: num, // 低于范围
		// 		nor: num, // 正常范围
		// 		hig: num  // 高于范围
		// 	]
		// ]
		dataRange: {
			type: Array,
			default () {
				return []
			}
		},
		
		
		// 详情页对应序号 
		editId: {
			type: Number,
			dafault () {
				return -1
			}
		}
		
		
	},
	created() {
	},
	methods: {
		
		// 切换步数设备
		changeEq () {
			console.log('切换设备')
		},
		
		// 手动填写某项数据的值，跳转到编辑页面并且卸载其他所有页面；
		// 步数由微信运动或者蓝牙设备拿到，这里就不做处理了
		// 1 体重
		// 2 血压
		// 3 血糖
		// 4 心率
		// 5 体温
		// 6 总胆固醇
		// 7 尿酸
		onEditPage() {
			console.log(this.editId)
			uni.navigateTo({
				url: '/pages/add_data/addData?editId=' + this.editId
			})
			// 关闭所有页面，打开到应用内的某个页面。
			// 这里传参，然后编辑页面可以在onLoad拿到参数
		},
		
		noStepInfo () {
			console.log('弹窗')
		}
	},
	components: {
		vantLoading
	}
}
</script>

<style lang='scss'>
.health-card{
	width: 100%;
	padding: 0 30rpx;
	box-sizing: border-box;
	margin: 20rpx 0;
	.card-wrapper {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		background-color: #fff;
		position: relative;
		.card-title {
			margin-top: 10rpx;
			font-size: 36rpx;
			font-weight: 700;
			line-height: 1;
			color: #444444;
		}
		.card-edit-btn {
			position: absolute;
			right: 20rpx;
			top: 22rpx;
			width: 40rpx;
			height: 40rpx;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.card-edit-switch {
			position: absolute;
			right: 20rpx;
			top: 30rpx;
			height: 30rpx;
			font-size: 24rpx;
			span {
				vertical-align: top;
				line-height: 30rpx;
			}
			img {
				margin-left: 16rpx;
				height: 30rpx;
				width: 30rpx;
			}
		}
		.step-today {
			width: 100%;
			margin: 12rpx 0 20rpx;
			font-size: 24rpx;
			font-weight: 300;
			line-height: 1;
			color: #999;
			text-align: center;
		}
		.step-today-nosetp {
			width: 100%;
			margin: 60rpx 0 40rpx;
			font-size: 24rpx;
			font-weight: 300;
			line-height: 1;
			color: #999;
			text-align: center;
			img {
				margin: 0 0 -6rpx 10rpx;
				width: 30rpx;
				height: 30rpx;
			}
		}
		.data-num {
			margin-bottom: 50rpx;
			padding-left: 40rpx;
			box-sizing: border-box;
			width: 100%;
			text-align: center;
			font-size: 60rpx;
			line-height: 1;
			color: #4ECCC2;
			font-weight: 700;
			.data-company {
				font-size:24rpx;
				color: #999;
				margin-left: 10rpx;
			}
		}
		.data-num-load {
			margin-bottom: 50rpx;
			padding-left: 0;
			box-sizing: border-box;
			width: 100%;
			text-align: center;
		}
		.data-tips {
			position: absolute;
			top: 120rpx;
			left: 50%;
			transform: translateX(-50%);
			font-size: 24rpx;
			color: #444;
			line-height: 1;
			margin-top: 12rpx;
		}
		.data-range-wrapper {
			position: relative;
			margin-bottom: 30rpx;
			width: 100%;
			padding: 20rpx 18rpx 0;
			box-sizing: border-box;
			/* 范围值条最外侧 */
			.data-range-strip-box {
				width: 100%;
				display: flex;
				position: relative;
				padding: 20rpx 0 0;
				.range-strip-wrapper {
					width: 100%;
					display: flex;
					position: relative;
					/* 小范围值 */
					.data-range-low, .data-range-nor, .data-range-hig {
						flex: 1;
						text-align: center;
						line-height: 1;
						.range-strip {
							height: 10rpx;
						}
						.range-comp {
							font-size: 16rpx;
							color: #999;
							margin: 8rpx 0;
						}
						.range-text {
							font-size: 24rpx;
							color: #444;
						}
					}
					.data-range-low {
						.range-strip {
							border-radius: 10rpx 0 0 10rpx;
							background-color: #94D0F6;
							margin-right: 1rpx;
						}
					}
					/* 正常范围 */
					.data-range-nor {
						.range-strip {
							background-color: #4FE183;
							margin: 0 1rpx;
						}
					}
					/* 大范围值 */
					.data-range-hig {
						.range-strip {
							border-radius: 0 10rpx 10rpx 0;
							background-color: #F07969;
							margin-left: 1rpx;
						}
					}
				}
				/* 游标 */
				.data-range-float-strip {
					position: absolute;
					top: 0;
					height: 30rpx;
					width: 6rpx;
					background-color: #fff;
					border: 1rpx solid #A0A0A0;
					border-radius: 6rpx;
					span {
						position: absolute;
						top: -24rpx;
						width: 200rpx;
						transform: translateX(-50%);
						font-size: 16rpx;
						line-height: 1;
						color: #999;
						text-align: center;
						margin-bottom: 4rpx;
					}
				}
			}
		}
		.data-time {
			font-size: 20rpx;
			color: #444;
			line-height: 1;
			margin-top: 10rpx;
		}
		.to-add-tips {
			font-size: 20rpx;
			color: #444;
			line-height: 1;
			text-align: center;
			margin: 10rpx 0 20rpx;
		}
	}
}	
</style>
