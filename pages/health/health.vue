<template>
	<div id="health">
		<!-- 因为后台获取参数不同，所以这里需要每个卡片，单独传入内容 -->
		<!-- 步数 -->
		<healthCard 
			:title="store_userSignData.step.title" 
			:editBTN="store_userSignData.step.editBTN" 
			:dataNum="store_userSignData.step.dataNum" 
			:dataCompany="store_userSignData.step.dataCompany" 
			:editId="store_userSignData.step.editId"
			:eqType="store_userSignData.step.eqType"
		></healthCard>
		<!-- 体重 -->
		<healthCard
			:title="store_userSignData.weight.title" 
			:editBTN="store_userSignData.weight.editBTN" 
			:dataNum="store_userSignData.weight.dataNum" 
			:dataCompany="store_userSignData.weight.dataCompany"
			:dataTime="store_userSignData.weight.dataTime"
			:dataRange="store_userSignData.weight.dataRange"
			:editId="store_userSignData.weight.editId"
			:dataTips="store_userSignData.weight.dataTips"
		></healthCard>
		<!-- 血压 -->
		<healthCard 
			:title="store_userSignData.bloodPressure.title" 
			:editBTN="store_userSignData.bloodPressure.editBTN" 
			:dataNum="store_userSignData.bloodPressure.dataNum" 
			:dataCompany="store_userSignData.bloodPressure.dataCompany"
			:dataTime="store_userSignData.bloodPressure.dataTime"
			:dataRange="store_userSignData.bloodPressure.dataRange"
			:editId="store_userSignData.bloodPressure.editId"
			:cursorSuffix="store_userSignData.bloodPressure.cursorSuffix"
		></healthCard>
		<!-- 血糖 -->
		<healthCard 
			:title="store_userSignData.bloodSugar.title" 
			:editBTN="store_userSignData.bloodSugar.editBTN" 
			:dataNum="store_userSignData.bloodSugar.dataNum" 
			:dataCompany="store_userSignData.bloodSugar.dataCompany"
			:dataTime="store_userSignData.bloodSugar.dataTime"
			:dataRange="store_userSignData.bloodSugar.dataRange"
			:editId="store_userSignData.bloodSugar.editId"
			:dataTips="store_userSignData.bloodSugar.dataTips"
		></healthCard>
		<!-- 心率 -->
		<healthCard 
			:title="store_userSignData.heartRate.title" 
			:editBTN="store_userSignData.bloodSugar.editBTN" 
			:dataNum="store_userSignData.heartRate.dataNum" 
			:dataCompany="store_userSignData.heartRate.dataCompany"
			:dataTime="store_userSignData.heartRate.dataTime"
			:dataRange="store_userSignData.heartRate.dataRange"
			:editId="store_userSignData.heartRate.editId"
		></healthCard>
		<!-- 体温 -->
		<healthCard 
			:title="store_userSignData.BodyTemperature.title" 
			:editBTN="store_userSignData.BodyTemperature.editBTN" 
			:dataNum="store_userSignData.BodyTemperature.dataNum" 
			:dataCompany="store_userSignData.BodyTemperature.dataCompany"
			:dataTime="store_userSignData.BodyTemperature.dataTime"
			:dataRange="store_userSignData.BodyTemperature.dataRange"
			:editId="store_userSignData.BodyTemperature.editId"
		></healthCard>
		<!-- 总胆固醇 -->
		<healthCard 
			:title="store_userSignData.TotalCholesterol.title" 
			:editBTN="store_userSignData.TotalCholesterol.editBTN" 
			:dataNum="store_userSignData.TotalCholesterol.dataNum" 
			:dataCompany="store_userSignData.TotalCholesterol.dataCompany"
			:dataTime="store_userSignData.TotalCholesterol.dataTime"
			:dataRange="store_userSignData.TotalCholesterol.dataRange"
			:editId="store_userSignData.TotalCholesterol.editId"
		></healthCard>
		<!-- 尿酸 -->
		<healthCard 
			:title="store_userSignData.uricAcid.title" 
			:editBTN="store_userSignData.uricAcid.editBTN" 
			:dataNum="store_userSignData.uricAcid.dataNum" 
			:dataCompany="store_userSignData.uricAcid.dataCompany"
			:dataTime="store_userSignData.uricAcid.dataTime"
			:dataRange="store_userSignData.uricAcid.dataRange"
			:editId="store_userSignData.uricAcid.editId"
		></healthCard>
	</div>
</template>

<script>
// 卡片组件
import healthCard from '../../components/health-card/healthCard.vue'	
// 获取微信步数的请求，获取到的是数据库中该用户的步数
import {http_getStep} from '../../utils/http_getStep.js'
// vuex
import {mapGetters,mapMutations} from 'vuex'
export default {
	data() {
		return {
			// 这个页面所需要的的数据结构
			// 在这个页面分别触发请求，然后在http请求封装的函数中将拿到的数据结构设置成如下对应的字段
			// 如果有多出来的其他值，就不用管字段了，按照后台返回的字段命名即可
		}
	},
	onShow() {},
	onLoad() {
		// 这里获取数据都不用同步，而是，html的属性中所有的数值都从 store_userSignData.xx里获取即可
		// 跳转到手动添加数据页面，跳转回来也不会触发onLoad，那么就需要在添加数据的同时，
		// 在添加完成后，立刻再获取数据然后同步到本地（或者在添加成功后，自己模拟从后台获取数据），
		// 只要数据添加成功了，那么手动本地添加也是一样的效果，也节省了一次请求
		
		// 获取步数
		http_getStep()
	},
	// 下拉刷新
	onPullDownRefresh() {
		http_getStep()
	},
	components: {
		healthCard
	},
	computed: {
		// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
		...mapGetters(['store_userSignData']),
	}
}
</script>

<style lang='scss'>
page {
	background-color: rgb(244,244,244);
	padding-bottom: 20rpx;
}	
</style>
