<template>
	<view style="margin-top: 15rpx;">
		<view class="uni-second-list">
			<view class="uni-second" v-for="(v,k) in dataList" :key="k" @click.stop="stockDetails(v.id)">
				<view class="image-second">
					<image class="uni-second-image" :src="v.image" mode="aspectFit" lazy-load></image>
				</view>
				<view class="uni-second-price">
					<view class=" uni-second-title uni-ellipsis">
						{{v.name}}
					</view>
					<view class="uni-flex d-items-center price-con">
						<text class="price"> <text class="price-slome">￥</text>{{v.price}}</text>
						<view class="buy-num">
						  拼团价
						</view>
					</view>
					<view class="sku-name uni-ellipsis">{{v.intro}}
					</view>
				</view>
			</view>
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
			},
			type: {
				type: [String, Number],
				default: 0
			},
			uid: {
				type: String
			}
		},
		methods: {
			buyActive(e) {
				if (e.spec == 0) {
					let parmas = {
						mid: this.uid,
						gid: e.id,
						count: 1
					};
					this.$api.addCart(parmas, res => {
						res.result == 0 ? this.$api.tip('加入购物车成功!') : this.$api.tip(res
							.resultNote);
					})
				} else {
					this.$api.navTo(`/pages/goodDetails/gooddetails?id=${e.id}`);
				}

			},
			stockDetails(id) {
				this.$api.navTo(`/pages/goodDetails/gooddetails?id=${id}`);
			},
			toMore() {
				this.$api.navTo(`/pages/productList?type=1&name=今日精品`)
			},
			init() {
				this.list = [];
			}
		}
	}
</script>
<style scoped lang="scss">
	.new-price {
		width: 90upx;
		height: 36upx;
		line-height: 36upx;
		background: url('@~static/img/bg.png');
		background-size: 100% 100%;
		text-align: center;
		color: #FFFFFF;
		font-size: 16upx;
		position: absolute;
		right: 0;
		top: 0;
	}
	.sku-name {
		color: #666666;
		font-size: 22upx;
		width: 70%;
	}

	.bg-img {
		width: 66upx;
		height: 28upx;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.buy-num {
		font-size: 20upx;
		font-weight: 500;
		color:#FF3B13;
		margin-left: 20upx;
		padding:0 20upx;
		border:2upx solid #FF3B13;
		border-radius:4upx;
	}

	.price-con {
		position: relative;
		padding: 10upx 0;
	}

	.uni-second-tip {
		position: absolute;
		top: 0;
		left: 0;
		width: 137upx;
		height: 45upx;
	}

	.hote-img {
		width: 137upx;
		height: 45upx;
	}

	.uni-targe {
		position: absolute;
		top: 0;
		left: 20upx;
		color: #FFFFFF;
		font-size: 24upx;
	}

	.img-splace {
		width: 60upx;
	}

	.img {
		width: 49upx;
		height: 49upx;
		border-radius: 18upx;
		position: absolute;
		top: -20upx;
		right: 20upx;
		background-color: #FE5063;
	}

	.price {
		color: #FF0000;
		font-weight: Bold;
	}

	.second-title {
		padding: 30upx 20upx;
		position: relative;

	}

	.uni-second-list {
		display: flex;
		flex-wrap: wrap;
		margin: 10px 0;
	}

	.uni-second {
		display: flex;
		flex-direction: column;
		margin: 0 0 20upx 20upx;
		width: 46%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 6upx;
		position: relative;
	}

	.image-second {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		height: 324upx;
		border-radius: 6upx;
		padding:30upx;
		box-sizing: border-box;
	}

	.uni-second-title {
		width:100%;
		color: #333333;
		font-weight: bold;
		font-size: 30upx;
	}

	.uni-second-price {
		flex: 1;
		font-size: 28upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0 30upx 30upx 30upx;
	}
</style>
