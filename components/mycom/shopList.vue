<template>
	<view class="content">
		<view class="uni-second-list">
			<navigator url="/pages/shop/shopDetails" class="uni-second" :class="{'animatedActive':item.active}"  v-for="(item,index) in dataList" :key="index">
				<view class="image-second">
					<image class="uni-second-image" src="/static/img/test/p1.jpg" lazy-load></image>
				</view>
				<view class="uni-second-price">
					<view class="uni-flex d-items-center d-between">
						<view class="uni-second-title uni-ellipsis">健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子
						</view>
						<view class="uni-flex d-items-center d-between shop-descid">
							<image src="/static/img/shop_desic.png" class="shop-desc-img"></image>
							17km
						</view>
					</view>
					<view class="sku-name pad-bot">
						<text class="target-text">月销 9999+</text><text class="target-text">起送￥30</text>
					</view>
					<view class="uni-flex d-items-center pad-bot">
						<text class="target-text serpos-layzd">免费配送</text>
					</view>
					<view class="uni-flex d-items-center">
						<text class="target-text serpos-compline">50减10</text>
					</view>

				</view>
			</navigator>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			dataList: {
				type: Array,
				default(){
					return []
				}
			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			gotoDetails() {
				this.$api.navTo('/pages/goodDetails/gooddetails')
			}
		}
	}
</script>
<style lang="scss" scoped>
	.pad-bot {
		padding-bottom: 20upx;
	}

	.target-text {
		margin-right: 20upx;
		padding: 5upx 10upx;
		font-size: 20upx;
		border-radius: 2upx;
	}

	.serpos-layzd {
		background-color: #FF3B13;
		color: #FFFFFF;
	}

	.serpos-compline {
		color: #FF3B13;
		border: 1upx solid #FF3B13;
	}

	.uni-icon-location-filled {
		color: #FFBF00;
		font-size: 30upx;
	}

	.shop-descid {
		font-size: 24upx;
		color: rgba(153, 153, 153, 1);
	}

	.content {
		box-sizing: border-box;
	}

	.price {
		color: #FF0000;
		font-size: 28upx;
		font-weight: bold;
	}

	.sku-name {
		font-size: 26upx;
		color: rgba(102, 102, 102, 1);
	}

	.uni-second-list {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 10upx;
	}
	.uni-second {
		display: flex;
		padding: 20upx;
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 4upx;
		margin-bottom: 4upx;
		opacity: 0;
		transform: translateY(60upx);
		transition: all 0.3s ease-in-out 0s;
	}


	.image-second {
		width: 204upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		overflow: hidden;
	}

	.uni-second-image {
		width: 204upx;
		height: 204upx;
		border-radius: 10upx;
	}

	.uni-second-title {
		font-size: 34upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		width: 60%;
	}

	.uni-second-price {
		width: calc(100% - 240upx);
		font-size: 28upx;
		line-height: 1.5;
		padding-left: 15upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		margin-left: 20upx;
	}
</style>
