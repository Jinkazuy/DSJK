<template>
	<div id="set-base-sign">
		<!-- 选择性别 -->
		<div class="user-base-gander" v-if='userBaseGander'>
			<h1 class="user-base-gander-h1">您的性别</h1>
			<p class="user-base-gander-p">依据性别给您</p>
			<div class="user-base-gander-avat-wrapper">
				<div :class="['select-gander-m', {'select-gander-active':userSelectGander === 1}]" @click="selectGander(1)">
					<div>
						<img src="/">
						<span>男</span>
					</div>
				</div>
				<div :class="['select-gander-w', {'select-gander-active':userSelectGander === 0}]" @click="selectGander(0)">
					<div>
						<img src="/">
						<span>女</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 选择生日 -->
		<div class="user-base-birth" v-if='userBaseBirthDate'></div>
		<!-- 身高 -->
		<div class="user-base-height" v-if='userBaseHeight'></div>
		<!-- 体重 -->
		<div class="user-base-weight" v-if='userBaseWeight'></div>
	</div>
</template>

<script>
	// 拿到vuex中的函数
	import {mapGetters, mapMutations} from 'vuex'
	
	export default {
		data() {
			return {
				  // 本地是否拿到用户的各项数据，如果拿不到就将该项设置为true，从而控制显示组件；
					userBaseGander: false,
					userBaseBirthDate: false,
					userBaseHeight: false,
					userBaseWeight: false,
					// 记录当前用户选择
					userSelectGander: '',
					
			}
		},
		onShow () {
			
			// 进入页面，用户行为动线 - 可能上次用户设置了某些信息，所以这里要分开检测 用户基本体征数据(性别,出生日期,身高,体重)
			this.ifUserBaseSign()
		},
		methods: {
			ifUserBaseSign () {
				// 哪项没有值，就显示哪项对应的组件，让用户设置，当用户设置完毕后，检测数据完整性，如果各项数据皆有之，那么跳转到首页；
				if (this.store_userBaseSign['gander'] === '') {
					console.log('用户基本体征 - 性别 - 未填写')
					this.userBaseGander = true
					return
				} else if(this.store_userBaseSign['birthDate'] === '') {
					console.log('用户基本体征 - 出生日期 - 未填写')
					this.userBaseBirthDate = true
					return
				} else if(this.store_userBaseSign['height'] === '') {
					console.log('用户基本体征 - 身高 - 未填写')
					this.userBaseHeight = true
					return
				} else if(this.store_userBaseSign['weight'] === '') {
					console.log('用户基本体征 - 体重 - 未填写')
					this.userBaseWeight = true
					return
				} else {
					// 用户基本体征数据齐全，发送至后台储存
					// 同时本地存储
				}
			},
			// 选择性别
			selectGander (val) {
				// 选择性别
				console.log(val)
				this.userSelectGander = val
			},
			...mapMutations({
			        // 设置本地用户基本体征，分开设置
			        setUserBaseSignGander: 'setUserBaseSignGander',
							setUserBaseSignBirthDate: 'setUserBaseSignBirthDate',
							setUserBaseSignHeight: 'setUserBaseSignHeight',
							setUserBaseSignWeight: 'setUserBaseSignWeight'
			})
		},
		computed: {
			// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
      ...mapGetters([
				'store_userBaseSign'
      ])
    },
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
		.user-base-gander {
			position: absolute;
			width: 100%;
			height: 50%;
			top: 50%;
			transform: translateY(-70%);
			background-color: #fff;
			.user-base-gander-h1 {}
			.user-base-gander-p {}
			.user-base-gander-avat-wrapper {}
			.select-gander-m, .select-gander-w {
				position: absolute;
				width: 80px;
				height: 120px;
				text-align: center;
				background-color: #f2f2f2;
				display: flex;
				align-items: center;
				justify-content: center;
				img {
					/* position: absolute; */
					/* left: 50%; */
					/* transform: translateX(-50%); */
					display: block;
					border-radius: 24px;
					width: 48px;
					height: 48px;
					background-color: #fafafa;
				}
			}
			.select-gander-m {
				left: 24%;
			}
			.select-gander-w {
				right: 24%;
			}
			.select-gander-active {
				background-color: pink;
			}
		}
	}
</style>
