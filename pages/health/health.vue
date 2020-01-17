<template>
	<div id="health">
		<healthCard></healthCard>
	</div>
</template>

<script>
import healthCard from '../../components/health-card/healthCard.vue'	
export default {
	data() {
		return {
		}
	},
	components: {
		healthCard
	}
}
</script>

<style lang='scss'>
page {
	background-color: rgb(244,244,244);
}	
</style>
