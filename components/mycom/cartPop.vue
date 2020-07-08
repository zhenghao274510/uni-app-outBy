<template>
	<view class="mask" v-show="pickerShow" @click.stop="close">
		<view class="mask">

		</view>
		<view class="yaoqing-content animated " :class="propsAnimated">
			<view class="d-items-center j-center cart-del-con " >
				<view class="title" v-if="type==1">
					您确定取消订单吗?
				</view>
				<view class="title" v-if="type==2">
					感谢您的宝贵意见
				</view>
				<view class="title" v-if="type==3">
					您的申请已提交
				</view>
			</view>
			<view class="yaoqing-bottom uni-flex d-items-center d-content-center padding-con" >
				<view class="yaoqing-btn-con one" @click.stop="close" v-if="type==2">
					提交
				</view>
				<view class="yaoqing-btn-con one" @click.stop="close" v-if="type==1">
					确定取消订单
				</view>
				<view class="yaoqing-btn-con one" @click.stop="close" v-if="type==3">
					确定
				</view>
			</view>
		</view>
		<view class="error-img"  v-if="type==1">
			<view class="uni-icon uni-icon-close">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			type: [Number, String],
			propsAnimated:[String]
		},
		data() {
			return {
				pickerShow: false,
			}
		},
		methods: {
			open() {
				this.pickerShow = true;
			},
			hidden(){
				this.pickerShow = false;
			},
			close() {
				this.$emit('onCancel')
			},
			confirm() {
				if(this.type==1){
					this.$emit('onConfirm',this.activeTopClass);
				}else{
					this.$emit('onConfirm',1);
				}
				 this.pickerShow = false
			}

		}
	}
</script>

<style scoped lang="scss">
	.padding-con {
		padding:30upx 0;
	}

	.cart-del-con {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.changPwd-con {
		padding: 20upx 0;

		.changPwd-item {
			width: 100%;
			padding: 20upx 0;
			box-sizing: border-box;
			margin-bottom: 20upx;
			text-align: center;
		}

		.current {
			background: rgba(255, 238, 220, 1);
			color: rgba(211, 128, 41, 1);
		}
	}

	.around {
		justify-content: space-around;
		padding-top: 30upx;
	}

	.j-center {
		justify-content: center;
		padding-bottom:30upx;
		border-bottom: 1px solid rgba(242, 242, 242, 1);
	}

	.title {
		font-size: 36upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		text-align: center;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		background: rgba(0, 0, 0, .3);
	}

	.yaoqing-content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #FFFFFF;
		width: 80%;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-top:40upx;
		box-sizing: border-box;
		z-index: 99999;

	}

	.yaoqing-btn-con {
		height: 75upx;
		width: 366upx;
		text-align: center;
		line-height: 75upx;
		color: #FFFFFF;
		border-radius: 10upx;
		font-size:34upx;
		font-weight:bold;
	}

	.one {
		background:#FFBF00;
	}
	.tabBar {
		width: 100%;
		height: 98rpx;
		background: #fff;
		border-top: 1px solid #E5E5E5;
		position: fixed;
		bottom: 0px;
		left: 0px;
		right: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9;

		.tabBar_list {
			width: 100%;
			display: flex;

			image {
				width: 50rpx;
				height: 50rpx;
			}

			.tabBar_item {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 24upx;
				position: relative;
				color: #969BA3;

				.tipPoint {
					width: 30upx;
					height: 30upx;
					border-radius: 50%;
					background-color: #FE5063;
					color: #FFFFFF;
					text-align: center;
					line-height: 30upx;
					position: absolute;
					right: 0;
					top: 0;
					font-size: 24upx;
				}

				.tabBar_name {
					font-size: 24upx;
				}
			}

			.tabBar_item2 {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				color: #969BA3;
				position: relative;
				z-index: 101;
			}
		}
	}
</style>
