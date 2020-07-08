<template>
	<view class="swiper-content">
		<view class="search-wrapper">
			<view class="swiper-wrapper">
				<swiper class="swiper" in duration="500" @change="swiperChange">
					<swiper-item class="swiper-item" v-for="(item,index) of dataList" :key="index" @tap="gotoDetails(item)">
						<view class="uni-flex uni-flex-item">
							<view class="swiper-left">
								<image lazy-load :src="item.image" class="shop-img" />
							</view>
							<view class="swiper-right">
								<view class="scoll-top">
									<view class="uni-flex d-between d-items-center">

										<view class="shop-title-name">
											店铺名称
										</view>
										<view class="enter-shop uni-flex d-items-center">
											进店 <image src="/static/img/more.png" class="look-more"></image>
										</view>
									</view>
									<view class="shop-satr-price">
										起送￥30
									</view>
									<view class="">
										<text class="target-text serpos-layzd">免费配送</text><text class="target-text serpos-compline">50减10</text>
									</view>
								</view>
								<scroll-view scroll-x="true" class="scroll-x">
									<view class="item-wrapper">
										<view class="item" v-for="(v,k) in item.list" :key="k" @click.top="detail(v.id)">
											<view class="icon">
												<image lazy-load :src="v.image" class="img" />
											</view>
											<view class="tip-content">
												<view class="tip uni-ellipsis">{{v.name}}</view>
												<view class="uni-flex d-items-center">
													<view class="tip-price">￥{{v.price}}</view>
													<view class="tip-line">
														￥{{v.linePrice}}
													</view>
												</view>
											</view>
										</view>
									</view>
								</scroll-view>
							</view>
						</view>
					</swiper-item>
				</swiper>
				<cover-view class="indicator-dots uni-flex">
					<cover-view  :class="[swiperCurrent==k?'target-current':'target-circle']" v-for="(v,k) in dataList.length" :key="k"></cover-view>
				</cover-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperCurrent:0,
				dataList: [{
						image: '/static/img/test/p1.jpg',
						list: [{
								image: '/static/img/test/p1.jpg',
								linePrice: '23',
								price: '12',
								name: '烤鸡翅膀'
							},
							{
								image: '/static/img/test/p1.jpg',
								linePrice: '23',
								price: '12',
								name: '烤鸡翅膀'
							},
							{
								image: '/static/img/test/p1.jpg',
								linePrice: '23',
								price: '12',
								name: '烤鸡翅膀'
							},
							{
								image: '/static/img/test/p1.jpg',
								linePrice: '23',
								price: '12',
								name: '烤鸡翅膀'
							}
						]
					},
					{
						image: '/static/img/test/p1.jpg',
						list: [{
								image: '/static/img/test/p1.jpg',
								linePrice: '23',
								price: '12',
								name: '烤鸡翅膀'
							},
							{
								image: '/static/img/test/p1.jpg',
								linePrice: '23',
								price: '12',
								name: '烤鸡翅膀'
							},
							{
								image: '/static/img/test/p1.jpg',
								linePrice: '23',
								price: '12',
								name: '烤鸡翅膀烤鸡翅膀烤鸡翅膀烤鸡翅膀'
							},
							{
								image: '/static/img/test/p1.jpg',
								linePrice: '23',
								price: '12',
								name: '烤鸡翅膀'
							}
						]
					}
				]
			}
		},
		methods: {
			swiperChange(e) {
                 console.log(e)
				 this.swiperCurrent=e.detail.current;
			},
			gotoDetails(e){
				this.$api.navTo(`/pages/shop/shopDetails`)
			}
		}
	}
</script>

<style scoped>
	.indicator-dots{
		position: absolute;
		bottom: 40upx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 9999;
	}
	.target-current{
		width:6upx;
		height:6upx;
		background:#c6c6c6;
		border-radius:50%;
		margin-left: 20upx;
	}
	.target-circle {
		width:14upx;
		height:6upx;
		background:#FFB015;
		border-radius:3upx;
		margin-left: 20upx;
		
	}

	.swiper-wrapper {
		padding: 20upx 0 20upx 20upx;
		position: relative;
	}

	.swiper-content {
		position: relative;
		background-color: #FFFFFF;
	}

	.shop-title-name {
		font-size: 34upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.shop-satr-price {
		font-size: 26upx;
		color: rgba(102, 102, 102, 1);
	}

	.enter-shop {
		font-size: 26upx;
		color: rgba(102, 102, 102, 1);
	}

	.serpos-layzd {
		background-color: #FF3B13;
		color: #FFFFFF;
	}

	.serpos-compline {
		color: #FF3B13;
		border: 1upx solid #FF3B13;
	}

	.shop-img {
		width: 180upx;
		height: 157upx;
		border-radius: 10upx;
	}

	.target-text {
		margin-right: 20upx;
		padding: 5upx 10upx;
		font-size: 20upx;
		border-radius: 2upx;
	}

	.uni-icon-location-filled {
		color: #FFFFFF;
		font-size: 28upx;
	}

	.img {
		width: 50upx;
		height: 50upx;
	}

	.swiper {
		display: flex;
		justify-content: center;
		align-items: center;

		height: 550upx;
		box-sizing: border-box;
	}

	.scoll-top {
		padding: 0 20upx 20upx 0;
	}

	.swiper-right {
		padding: 20upx 0 20upx 20upx;
		flex: 1;
		overflow-x: hidden;
	}

	.swiper-item {
		display: block;
	}

	.second-title {
		padding: 20upx;
		background: #FFFFFF;
		position: relative;
		justify-content: space-between;
	}

	.tip-line {
		font-size:18upx;
		text-decoration:line-through;
		color:rgba(153,153,153,1);
		margin-left: 20upx;
	}

	.zh_bottom {
		position: absolute;
		right: 20upx;
		top: 50%;
	}

	.img-viop {
		height: 198upx;
		width: 100%;
	}

	.tip-price {
		font-size:25upx;
		color:rgba(251,65,54,1);
	}

	.item-wrapper {
		display: flex;
		width: 400px;
	}

	.icon-cart {
		width: 44upx;
		height: 44upx;
	}

	.cp-scoll-tit {
		font-size: 36upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		padding: 30upx;
	}

	.scroll-x {
		height: 300upx;
	}

	.scroll-x .item {
		width: 180upx;
		background:#FFFFFF;
		border-radius: 6upx;
		margin-right: 25upx;
		overflow: hidden;
		position: relative;
	}

	.icon {
		width: 100%;
		position: relative;
	}

	.icon .img {
		width: 100%;
		height: 140upx;
		border-radius: 6upx;
	}

	.tip {
		font-size:26upx;
		color:rgba(51,51,51,1);
	}
</style>
