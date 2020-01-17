<template>
	<div id="my">
		我的
	</div>
</template>

<script>
// 检测登录、token是否过期
import {ximin_isLogin} from '@/utils/mixin.js'
export default {
	data () {
		return {}
	},
	// 当页面加载时判断是否登录；
	mixins: [ximin_isLogin],
	onLoad() {},
	onShow() {}
}
</script>

<style lang='scss'>
</style>
