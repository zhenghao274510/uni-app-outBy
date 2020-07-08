<template>
	<view class="com_list_con">
		<view class="com_list_item uni-flex d-items-center d-between animated fadeInRight">
			<view class="com_list_item_left uni-flex d-content-center d-items-center  d-column">
				<view class="uni-flex com_list_item_left_one">
					<text class="price-slome one">￥</text>
					<text class="com_list_item_left_price">10</text>
				</view>
				<view class="price-slome">
					优惠券
				</view>
			</view>
			<view class="com_list_item_right uni-flex d-column">
				<view class="com_list_item_num">
					优惠券1张
				</view>
				<view class="price-slome">
					截止日期：2020-05-25
				</view>
			</view>
			<view class="com_list_item_btn animated" hover-class="fadeIn">
				立即领取
			</view>
		</view>
		<view class="com_list_item uni-flex d-items-center d-between animated fadeInLeft">
			<view class="com_list_item_left uni-flex d-content-center d-items-center  d-column">
				<view class="uni-flex com_list_item_left_one">
					<text class="price-slome one">￥</text>
					<text class="com_list_item_left_price">10</text>
				</view>
				<view class="price-slome">
					优惠券
				</view>
			</view>
			<view class="com_list_item_right uni-flex  d-column">
				<view class="com_list_item_num">
					优惠券1张
				</view>
				<view class="price-slome">
					截止日期：2020-05-25
				</view>
			</view>
			<view class="com_list_item_btn">
				立即领取
			</view>
		</view>
		<uni-load-more :status="status" v-if="showLoading"></uni-load-more>
		<empty v-if="showEmpty"></empty>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import empty from '@/components/xw-empty/xw-empty.vue'
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				dataList: [],
				showLoading: true,
				showEmpty: false,
				page: 1,
				totalPage: 1,
				status: 'loading',
				price: '',
				type: 0
			}
		},
		onReachBottom() {
			this.tatotalPage > this.page ? (this.status = 'loading', this.loadData()) : setTimeOut(() => {
				this.status = "noMore"
			}, 30)
		},
		onLoad(options) {
			options.price ? this.price = options.price : 0;
			this.type = options.type;
		},
		methods: {
			loadData() {
				let e = {
					mid: getApp().globalData.uid
				};
				this.getUserCompline(e, res => {
					console.log(res)
					res.result == 0 ? (res.dataList.length != 0 ? (this.status = 'noMore', this.dataList = res.dataList, this.showItem()) :
							(this.showEmpty = true, this.showLoading = false)) :
						this.$api.tip(res.resultNote);
				})
			},
			showItem() {
				let index = 0;
				let show = () => {
					index < this.dataList.length ? (this.$set(this.dataList[index], 'active', true), index++) : clearInterval(
						interval)
				};
				let interval = setInterval(() => {
					show();
				}, 100);
			},
		}
	}
</script>

<style scoped lang="scss">
	.com_list_con {
		padding: 30upx;

		.com_list_item {
			height: 188upx;
			background: rgba(255, 255, 255, 1);
			border-radius: 20upx;
			margin-bottom: 30upx;
			padding: 0 30upx;
			opacity: 0;
			transform: translateY(70upx);
			transition: all 0.3s ease-in-out 0s;

			.com_list_item_left {
				.com_list_item_left_one {
					align-items: center;
				}

				.com_list_item_left_price {
					font-size: 36upx;
					color: rgba(255, 97, 15, 1);
				}
			}

			.com_list_item_right {
				.com_list_item_num {
					font-size: 24upx;
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
				}
			}

			.com_list_item_btn {
				width: 140upx;
				height: 52upx;
				line-height: 52upx;
				background: linear-gradient(60deg, rgba(255, 89, 75, 1), rgba(255, 134, 61, 1));
				border-radius: 24upx;
				text-align: center;
				color: #FFFFFF;
				font-size: 26upx;
			}
		}
	}
</style>
