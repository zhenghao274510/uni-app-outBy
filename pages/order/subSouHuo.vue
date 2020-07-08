<template>
	<view class="content">
		<view class="tui-inter">
			<editor placeholder="请输入退款原因" @input="changContent" class="ql-editor"></editor>
		</view>

		<view class="btn animated " hover-class="fadeIn" @click="SubChange">提交</view>
		<cart-pop :propsAnimated='firstAnimated' type='3' ref="cartPop" @onCancel='confirmeCancel'></cart-pop>
	</view>
</template>

<script>
	import cartPop from '@/components/mycom/cartPop.vue'
	export default {
		components:{
			cartPop
		},
		data() {
			return {
				title: '',
				active: 1,
				orderId: '',
				content: '',
				firstAnimated: 'zoomIn'
			}
		},
		onLoad(options) {
			this.orderId = options.id;
		},
		methods: {
			confirmeCancel() {
				this.firstAnimated = 'zoomOut';
				setTimeout(() => {
					this.$refs.cartPop.hidden();
					this.firstAnimated='zoomIn';
					this.$api.back()
				}, 300)
			},
			changContent(e) {
				console.log(e)
				this.content = e.detail.text;
			},
			SubChange() {
				
				let parmas = {
					mid: getApp().globalData.uid,
					oid: this.orderId,
					content: this.content,
				};
				console.log(parmas)
				this._reqw.ipost(parmas, 'applyRefund').then(res => {
					res.result == 0 ?this.$refs.cartPop.open(): this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.upimg {
		width: 80upx;
		height: 80upx;
	}

	.ql-editor {
		margin-top: 10px;
		width: 671upx;
		height: 160upx !important;
		// background:#FFFFFF;
		border-radius: 6upx;
		padding: 10upx;
		box-sizing: border-box;
	}

	.content {
		padding: 0 20px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;

	}

	.img-list {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		padding: 20upx;

		.img {
			width: 31%;
			padding: 1%;
			height: 100px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.order-img {
			width: 100%;
			height: 100%;
		}
	}

	.tui-inter {
		margin: 40upx 0;
		background: #fff;
		border-radius: 20upx;

	}

	.inter-title {
		line-height: 30px;
	}

	.btn {
		width: 471upx;
		margin: 0 auto;
		margin-top: 30upx;
		height: 80upx;
		line-height: 40px;
		text-align: center;
		color: #fff;
		border-radius: 5px;
		font-size: 18px;
		background-color: #FFBF00;
	}
</style>
