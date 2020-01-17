<template>
	<div class="health-card" v-if="title===''">
		<div class="card-wrapper">
			<div class="card-title">表头</div>
			<div class="card-edit-btn" v-if="editBTN===-1">
				<img src="../../static/images/health/editIcon.png">
			</div>
			<div class="card-edit-switch" v-if="editBTN===2"><span>来源：{{'手机'}}</span><img src=""></div>
			<!-- 总步数，只有editBtn=2也就是显示切换设备的时候，说明这是步数，所以也用editBTN===2来判断是否渲染 -->
			<div class="step-today" v-if="editBTN===2">今日总步数</div>
			<!-- todo:这里的！故意取反，有数据后删除！ -->
			<div class="data-num">{{dataNum!==-1?'/':1405}}<span class="data-company">{{dataCompany!==''?'':'步'}}</span></div>
			<div class="data-tips" v-if="dataTips===''">BMI</div>
			<div class="data-range-wrapper" v-for="(item, idx) in [1]" :key="idx">
				<div class="data-range-title">收缩压</div>
				<div class="data-range-strip-box">
					<div class="range-strip-wrapper">
						<div class="data-range-low">
							<div class="range-strip"></div>
							<div class="range-comp">{{'90'}}&lt;</div>
							<div class="range-text">低于正常范围</div>
						</div>
						<div class="data-range-nor">
							<div class="range-strip"></div>
							<div class="range-comp">{{'90'}}</div>
							<div class="range-text">正常范围</div>
						</div>
						<div class="data-range-hig">
							<div class="range-strip"></div>
							<div class="range-comp">&gt;{{'90'}}</div>
							<div class="range-text">高于正常范围</div>
						</div>
					</div>
					<div class="data-range-float-strip" :style="{left:'50%'}"></div>
				</div>
			</div>
			<div class="data-time" v-if="dataTime===''">最新数据：2020-01-09 15:30</div>
		</div>
	</div>
</template>

<script>
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
		
		// 具体数值，最大的数值
		dataNum: {
			type: Number,
			default () {
				return -1
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
		}
		
		
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
			color: #4ECCC2;
			span {
				vertical-align: top;
				line-height: 30rpx;
			}
			img {
				margin-left: 16rpx;
				height: 30rpx;
				width: 30rpx;
				background-color: #ccc;
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
		.data-num {
			margin-bottom: 50rpx;
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
			padding: 0 18rpx;
			box-sizing: border-box;
			.data-range-title {
				width: 100%;
				font-size: 16rpx;
				line-height: 1;
				color: #999;
				text-align: center;
				margin-bottom: 4rpx;
			}
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
				}
			}
		}
		.data-time {
			font-size: 20rpx;
			color: #444;
			line-height: 1;
			margin-top: 10rpx;
		}
	}
}	
</style>
