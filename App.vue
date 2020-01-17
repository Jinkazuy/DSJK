<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	

	/* 在App.Vue文件中style部分引入有赞团队 UI组件库的 样式文件 */
	@import "/wxcomponents/vant/common/index.wxss";
	/* page {
		background-color: #000;
	} */
</style>
