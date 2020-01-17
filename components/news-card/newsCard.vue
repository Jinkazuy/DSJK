<template>
	<div class="news-card">
		<div class="news-items" v-for="(item, index) in newsList" :key="index" @click="getNewsDetail(item.id)">
			<img :src="item.newsImgUrl" class="news-images">
			<div class="news-title m-no-wrap">
				<p>{{item.newsTitle}}</p>
			</div>
			<div class="news-info">
				<p class="no-wrap">{{item.newsContent}}</p>
			</div>
			<div class="news-items-bt-line"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	props: {
		newsList: {
			type: Array,
			default () {
				return []
			}
		},
	},
	methods: {
		getNewsDetail (id) {
			console.log('新闻id => ' + id)
			 // 模拟跳转
			let path = '../../pages/login/login?id=' + id
			uni.navigateTo({
				  // 跳转路径
					url: path
			});
		}
	}
}
</script>

<style lang='scss'>
	.news-card {
		position: relative;
		.news-items {
			position: relative;
			margin: 20rpx 0 40rpx;
			height: 144rpx;
			width: 100%;
			.news-images {
				position: absolute;
				left: 0;
				top: 0;
				width: 144rpx;
				height: 144rpx;
				border-radius: 20rpx;
				background-color: #ccc;
			}
			.news-title {
				position: absolute;
				left: 158rpx;
				top: 0;
				width: 540rpx;
				height: 70rpx;
				p {
					font-size: 30rpx;
					font-weight: 700;
					line-height: 36rpx;
					color: #444;
				}
			}
			.news-info {
				position: absolute;
				left: 158rpx;
				bottom: 32rpx;;
				width: 546rpx;
				height: 24rpx;
				p {
					font-size: 24rpx;
					line-height: 1;
					color: #666;
				}
			}
			.news-items-bt-line {
				content: "";
				position: absolute;
				bottom: -20rpx;
				left: 0;
				width: 100%;
				height: 2rpx;
				background-color: #eee;
			}
		}
		.news-items:last-of-type {
			.news-items-bt-line {
				display: none;
			}
		}
	}
</style>
