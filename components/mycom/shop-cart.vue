<template>
	<view class="mask" @click.stop="close" @touchmove.stop.prevent="stopPrevent" v-if="show">
		<view class="mask-content animated" :class="propsAnimated" @click.stop.prevent="stopPrevent">
			<view class="share-header">
				已选择商品
				<image src="/static/img/lajitong.png" mode="" class="del-img" @click.stop="delCart"></image>
			</view>
			<scroll-view scroll-y="true" class="shop-cart-con" @scrolltolower="loadDataMore">
				<view class="cart-item" v-for="(item, index) in dataList" :key="item.goodscarid">
					<view class="cart-item-left">
						<image :src="item.goodsimage" mode="aspectFill" lazy-load class="product-img"></image>
					</view>
					<view class="item-right">
						<view class="item-right-top">
							<view class="clamp title uni-ellipsis">{{item.goodsname}}</view>
							<!-- <view class="iconfont  icon-delete" style="color: #999999;font-size: 18px;" @click="deleteCartItem(item.goodscarid,index)">
							</view> -->
						</view>
						<!-- <view class="item-right-top">
							<view class="skuname">{{item.name}}</view>
						</view> -->
						<view class="item-right-top">
							<view class="price">￥{{item.newprice}}</view>
							<uni-number-box class="step" :min="1" :value="item.numbers" :isMin="item.numbers===1" :index="index" @change="numberChange"></uni-number-box>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	export default {
		props: {
			dataList: {
				type: Array,
				default(){
					return []
				}
			},
			propsAnimated:[String]
		},
		components: {
			uniNumberBox
		},
		data() {
			return {
				show: false
			};
		},
		onLoad() {},
		methods: {
			open(){
				this.show=true;
			},
			hidden(){
				this.show=false;
			},
			toggleMask() {
				//防止高频点击
				if (this.timer == 1) {
					return;
				}
				this.timer = 1;
				setTimeout(() => {
					this.timer = 0;
				}, 500)
			},
			numberChange(e){
				console.log(e);
				this.$emit('change',e)
			},
			delCart(){
				this.$emit('cancle')
			},
			//防止冒泡和滚动穿透
			stopPrevent() {},
			//分享操作
			close() {
				this.$emit('close')
			},
			loadDataMore(){
				console.log('加载')
			}
		}
	}
</script>

<style lang='less'>
	.shop-cart-con {
		height: calc(100% - 50upx);
	}

	.mask {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 98rpx;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		z-index: 99;
		transition: .3s;
		background: rgba(0, 0, 0, 0.3);
	}

	.mask-content {
		width: 100%;
		padding: 30upx 0 100upx;
		display: flex;
		max-height: 700upx;
		flex-direction: column;
		transition: .3s;
		margin: 0 auto;
		background: #fff;
		transform: translateY(400);
		z-index: 99999;
		border-radius: 20upx 20upx 0 0;
	}

	.share-header {
		height: 110upx;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 10upx;
		color: #333333;
		font-size: 36upx;
		font-weight: bold;
		position: relative;
	}
     .del-img{
		 position: absolute;
		 right: 51upx;
		 top: 30upx;
		 width: 39upx;
		 height: 40upx;
	 }
	.cart-item {
		width: 97%;
		margin: 0 auto;
		display: flex;
		position: relative;
		background: #ffffff;
		padding: 30upx;
		box-sizing: border-box;
		border-bottom: 1upx solid rgba(242, 242, 242, 1);
	}

	.price {
		color: #FF0000;
		font-size: 30upx;
	}

	.uni-icon {
		font-size: 36upx;
	}

	.item-right-top {
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
	}

	.skuname {
		font-size: 20upx;
		color: #999999;
	}

	.bottom-width {
		width: 100%;
		justify-content: space-between;
		align-items: center;
		color: #FFFFFF;
	}

	.cart-item-left {
		/* width: 230upx; */
		position: relative;
		display: flex;
		align-items: center;
	}

	.product-img {
		width: 160upx;
		height: 140upx;
		border-radius: 10upx;
		margin-left: 5upx;
	}

	.item-right {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-left: 10upx;
		overflow: hidden;
		position: relative;
	}

	.title,
	.price {
		height: 40upx;
		line-height: 40upx;
		flex: 1;
	}

	.del-btn {
		padding: 4upx 10upx;
		font-size: 34upx;
		height: 50upx;
	}

	.iconfont {
		font-size: 24px;
	}
</style>
