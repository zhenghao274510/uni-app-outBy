<template>
	<view class="order-con">
		<view class="orders-title">
			<text>我的服务</text>
		</view>
		<view class="orders">
			<view class="box">
				<view class="label" v-for="(v,k) in orderTypeList" :key="k" hover-class="hover" @tap="toOrderType(k)">
					<view class="icon">
						<image :src="v.img"></image>
					</view>
					<view class="icon-title">
						{{v.name}}
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				orderTypeList: [{
						img: '/static/mine/youhuijuan.png',
						name: '优惠券'
					},
					{
						img: '/static/mine/shoucang.png',
						name: '我的收藏'
					},
					{
						img: '/static/mine/dingwei.png',
						name: '收货地址'
					},
					{
						img: '/static/mine/group.png',
						name: '我的拼团'
					},
					{
						img: '/static/mine/tellwe.png',
						name: '联系我们'
					},
					{
						img: '/static/mine/help.png',
						name: '帮助中心'
					},
					{
						img: '/static/mine/setup.png',
						name: '我的设置'
					},
					{
						img: '/static/mine/yijian.png',
						name: '意见反馈'
					},
					{
						img: '/static/mine/message.png',
						name: '我的消息'
					}
				]
			}
		},
		methods: {
			toOrderType(ind) {
				this.$emit('click', ind)
			}
		}
	}
</script>

<style scoped lang="scss">
	.order-con {
		border-radius: 20upx;
		.orders-title {
			padding: 20upx;
			z-index: 999;
			font-weight: bold;
			border-bottom: 1px solid #F7F9FA;
			position: relative;
			font-size: 36upx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}

		.orders {
			display: flex;
			align-items: flex-start;
			padding: 30upx 0;
			.box {
				width: 100%;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				padding:20upx 0;

				.label {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 33.3333%;
					color: #333333;
					font-size: 24upx;
					margin: 30upx 0 10upx 0;

					.icon {
						position: relative;
						margin-bottom: 10upx;
						width: 70upx;
						height: 70upx;

						image {
							width: 100%;
							height: 100%;
							z-index: 9;
						}
					}

					.icon-title {
						color: #666666;
						font-size: 24upx;
					}
				}
			}
		}

	}
</style>
