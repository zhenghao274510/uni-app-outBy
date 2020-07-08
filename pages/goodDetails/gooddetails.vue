<template>
	<view class="details_page">
		<goods-swiper :dataList="bannerList"></goods-swiper>
		<!-- 普通商品 -->
		<block v-if="type==0">
			<view class="goods_info_con">
				<view class="goods_title">
					美式咖啡
				</view>
				<view class="goods_salce">
					月销71
				</view>
				<view class="uni-flex d-items-center d-between">
					<view class="uni-flex d-items-center">
						<view class="good_newPrice">
							￥<text class="new_price">31</text>
						</view>
						<view class="good_oldPrice">
							￥<text class="old_price">31</text>
						</view>

					</view>
					<view class="sku_btn" hover-class="btn-hover" @click.stop="showSku">
						选规格
					</view>
				</view>
			</view>
			<view class="goods_info_use">
				<view class="goods_title bor_title">
					用料
				</view>
				<view class="user_outMine">
					1、主料
				</view>
				<view class="user_outMine">
					2、主料
				</view>
			</view>
		</block>


		<block v-if="type==1">
			<view class="group_goods_con">
				<view class="uni-flex d-items-center d-between">
					<view class="uni-flex d-items-center">
						<view class="good_newPrice">
							￥<text class="new_price">31</text>
						</view>
						<view class="good_newPrice_bg">
							团购
						</view>

					</view>
					<bbs-count-down :time="LeaveEnd" :setColor="setColor" v-if="LeaveEnd!=0"></bbs-count-down>
				</view>
				<view class="group_info_num uni-flex d-items-center d-between">
					<view class="group_info_allnum">
						数量
					</view>
					<view class="uni-flex-item uni-flex d-items-center d-between">
						<view class="">
							<text class="group_hastitle">当前商品参团分数</text> <text class="group_hasnum">3份</text>
						</view>
						<view class="">
							<text class="group_hastitle">还差</text> <text class="group_hasnum">2份</text>
						</view>
					</view>

				</view>
				<view class="goods_salce group_adiro">
					新鲜果蔬 新鲜果蔬 新鲜果蔬 新鲜果蔬 新鲜果蔬 新鲜果蔬 新鲜果 蔬 新鲜果蔬 新鲜果蔬 新鲜果蔬 新鲜果蔬 新鲜果蔬 新鲜
				</view>
			</view>
			<view class="details_con">
				<view class="details_title">
					商品详情
				</view>
				<view class="" style="padding-top:10px;">
					<jyf-parser :html="desc" ref="article"></jyf-parser>
				</view>
			</view>
		</block>
		<uni-load-more :status="status"></uni-load-more>

		<!-- 底部操作 -->
		<!-- 普通商品 -->
		<block v-if="type==0">
			<view class="uni-flex bottom-con" v-if="dataList.length!=0">
				<navigator class="bottom-item-left" url="/pages/Previewindo/sendmessage">
					<image src="/static/img/icon-customer.png" mode="" class="cart-img"></image>
					<view class="point-tip">
						联系商家
					</view>
				</navigator>
				<view class="uni-flex-item bottom-price" @tap.stop="showCart">
					<view class="one">￥<text class="price">{{allPrice}}</text></view>
					<view class="two">未达到免除基础运费</view>
				</view>
				<view class="botton-btn end-price" hover-class="btn-hover" @tap="creatOrder">
					结算
				</view>
			</view>
			<view class="uni-flex bottom-con" v-else>
				<navigator class="bottom-item-left" url="/pages/Previewindo/sendmessage">
					<image src="/static/img/icon-customer.png" mode="" class="cart-img"></image>
					<view class="point-tip">
						联系商家
					</view>
				</navigator>
				<view class="uni-flex uni-flex-item bottom-price d-items-center">
					<view class="two">另需配送费￥1</view>
				</view>
				<view class=" uni-flex botton-btn d-items-center end-btn">
					<view class="end-btn">15元起送</view>
				</view>
			</view>
		</block>

		<!-- 拼团商品 -->
		<block v-if="type==1">
			<view class="group_bottom_con uni-flex" v-if="noEnd">
				<view class="group_item_left uni-flex d-items-center d-content-center">
					<image src="/static/img/daipingjia.png" class="kefu_img"></image>
				</view>
				<view class="uni-flex-item uni-flex d-items-center d-content-center">
					<view class="uni-flex-item text_center group_item_right_one" hover-class="btn-hover">
						<view class="">
							￥100
						</view>
						<view class="">
							单独买
						</view>
					</view>
					<view class="uni-flex-item text_center group_item_right_two" hover-class="btn-hover" style="background:#FF5315 ;" @click="creatOrder">
						参加拼团
					</view>
				</view>
			</view>
			<view class="group_bottom_con uni-flex" v-else>
				<view class="group_item_end-left uni-flex d-items-center d-content-center">
					<image src="/static/img/daipingjia.png" class="kefu_img"></image>
				</view>
				<view class="uni-flex-item text_center group_item_right_two " style="background:#FFBF00 ;" hover-class="btn-hover">
					拼团已结束
				</view>
			</view>
		</block>
		<sku-swiper ref="skuSwiper" :dataObj="dataobject" :propsAnimated='propsAnimated' @addCart="addCart" @onCancel="onCancel"></sku-swiper>
		<shop-cart :dataList="dataList" ref="shopCart"  @cancle='confirmDel' @close="onClose"
		 :propsAnimated="cartAnimated"></shop-cart>

	</view>
</template>

<script>
	import goodsSwiper from '@/components/home/goods-swiper.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import bbsCountDown from "@/components/bbs-countdown/bbs-countdown.vue"
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	import skuSwiper from '@/components/home/sku-wiper.vue';
	import shopCart from "@/components/mycom/shop-cart.vue"
	export default {
		components: {
			goodsSwiper,
			uniLoadMore,
			bbsCountDown,
			jyfParser,
			skuSwiper,
			shopCart
		},
		data() {
			return {
				setColor: '#333',
				LeaveEnd: '90000000',
				desc: '',
				type: 0,
				noEnd: false,
				bannerList: [],
				status: 'loading',
				propsAnimated: 'zoomIn',
				cartAnimated: 'slideInUp',
				id: '',
				dataobject: {}
			}
		},
		onLoad() {
			this.id = "484275384c92481197d06b5d0fc7f64e";
			setTimeout(() => {
				this.loadData()
			}, 1000)
		},
		methods: {
			loadData() {
				let parmas = {
					productId: this.id,
					uid: '286ebcb16dea431c903e89ab1869bff4'
				}
				this._reqw.ipost(parmas, 'productDetail').then(res => {
					res.result == 0 ? (res.skuList.forEach(item => {
						item.specification = JSON.parse(item.specification)
					}), this.dataobject = res) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},

			//   规格 购物车动画部分
			showSku() {
				this.$refs.skuSwiper.open();
			},
			onCancel() {
				this.propsAnimated = 'zoomOut';
				setTimeout(() => {
					this.$refs.skuSwiper.hidden();
					this.propsAnimated = 'zoomIn';
				}, 300)
			},
			showCart() {
				this.$refs.shopCart.open();
			},
			onClose() {
				this.cartAnimated = 'slideOutDown';
				setTimeout(() => {
					this.$refs.shopCart.hidden();
					this.cartAnimated = 'slideInUp';
				}, 300)
			},
			addCart(e){
				console.log(e);
				this.onCancel();
			},
			confirmDel() {
				this.onClose();
			},
			creatOrder(){
				this.$api.navTo(`/pages/order/finishOrder`)
			}
		}
	}
</script>

<style scoped lang="scss">
	.details_page {
		padding-bottom: 100upx;
	}

	//  平团商品信息
	.group_goods_con {
		padding: 20upx;
		background-color: #FFFFFF;
		margin-bottom: 10upx;

		.good_newPrice_bg {
			width: 76upx;
			height: 30upx;
			line-height: 30upx;
			font-size: 20upx;
			background: url("@~static/img/bg.png");
			background-size: 100% 100%;
			color: #3D3B34;
			text-align: center;
			margin-left: 30upx;
		}

		.goods_salce {
			font-size: 24upx;
			color: rgba(153, 153, 153, 1);
			padding: 30upx 0;
		}

		.good_newPrice {
			color: rgba(252, 69, 58, 1);

			.new_price {
				font-size: 40upx;
				font-weight: bold;
				color: rgba(252, 69, 58, 1);
			}
		}

		.group_info_num {
			padding: 10upx 20upx;
			background: rgba(252, 239, 216, 1);
			border-radius: 6upx;
			margin-top: 30upx;

			.group_info_allnum {
				width: 99upx;
				height: 44upx;
				line-height: 44upx;
				font-size: 24upx;
				background: url("@~static/img/bg.png");
				background-size: 100% 100%;
				color: #FFFFFF;
				text-align: center;
				margin-right: 30upx;
			}

			.group_hastitle {
				font-size: 30upx;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
			}

			.group_hasnum {
				font-weight: bold;
				color: rgba(255, 0, 0, 1);
				margin-left: 30upx;
			}
		}
	}

	.details_con {
		padding: 100upx 20upx;
		background-color: #FFFFFF;

		.details_title {
			font-size: 30upx;
			padding-left: 30upx;
			color: rgba(51, 51, 51, 1);
			position: relative;

			&::before {
				content: '';
				position: absolute;
				width: 6upx;
				height: 24upx;
				background: rgba(254, 197, 28, 1);
				border-radius: 3upx;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
			}
		}

	}





	//   普通商品信息
	.goods_info_con {
		margin: 14upx 0;
		padding: 20upx;
		background-color: #FFFFFF;

		.goods_title {
			font-size: 36upx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}

		.goods_salce {
			font-size: 22upx;
			color: rgba(153, 153, 153, 1);
		}

		.good_newPrice {
			color: rgba(252, 69, 58, 1);

			.new_price {
				font-size: 40upx;
				font-weight: bold;
				color: rgba(252, 69, 58, 1);
			}
		}

		.good_oldPrice {
			color: #999999;
			text-decoration: line-through;
			margin-left: 30upx;

			.new_price {
				font-size: 40upx;
				font-weight: bold;
				color: #999999;
			}
		}

		.sku_btn {
			width: 104upx;
			height: 46upx;
			line-height: 46upx;
			text-align: center;
			background: linear-gradient(147deg, rgba(255, 191, 0, 1), rgba(251, 216, 111, 1));
			border-radius: 23upx;
			font-size: 24upx;
		}
	}

	.goods_info_use {
		padding: 20upx;
		background-color: #FFFFFF;

		.goods_title {
			font-size: 36upx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			position: relative;
			padding-bottom: 5upx;
		}

		.bor_title::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 10upx;
			width: 46upx;
			height: 4upx;
			background: rgba(255, 191, 0, 1);
			border-radius: 2upx;
		}

		.user_outMine {
			font-size: 26upx;
			color: rgba(153, 153, 153, 1);
			padding: 10upx 0;
		}
	}

	.details-splace {
		height: 50upx;
		background-color: #000000;
		opacity: .3;
	}

	/* 底部购物车 拼团商品 */
	.group_bottom_con {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100upx;
		z-index: 999;

		.group_item_end-left {
			width: 35%;
		}

		.kefu_img {
			width: 55upx;
			height: 50upx;
		}

		.group_item_left {
			width: 20%;
		}

		.text_center {
			text-align: center;
		}

		.group_item_right_one {
			background: #FFBF00;
			height: 100upx;

			view {
				color: #FFFFFF;
			}
		}

		.group_item_right_two {
			height: 100upx;
			line-height: 100upx;
			color: #FFFFFF;
		}
	}


	/* 底部购物车  正常商品 */
	.bottom-item-left {
		width: 20%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: relative;
		background: rgba(9, 9, 9, 1);
		border-radius: 50upx 8upx 8upx 50upx;
		margin-right: 6upx;
	}

	.bottom-price {
		padding: 0 30upx;
		box-sizing: border-box;
		background-color: #090909;
		flex: 1;

		.one {
			color: #FC453A;

			.price {
				color: #FC453A;
				font-size: 36upx;
			}
		}

		.two {
			font-size: 24upx;
			color: #AEAEAE;
		}
	}

	.bottom-con {
		position: fixed;
		bottom: 30upx;
		left: 30upx;
		right: 30upx;
		height: 100upx;
		z-index: 999;
		border-radius: 50upx;
	}

	.botton-btn {
		width: 151upx;
		height: 100%;
		line-height: 100upx;
		border-radius: 0px 50upx 50upx 0px;
		text-align: center;
		font-size: 30upx;
	}

	.end-price {
		background: #FFBF00;
		color: #4B3A05;
	}

	.end-btn {
		background: #090909;
		color: #AEAEAE;
	}

	.cart-img {
		width: 41upx;
		height: 37upx;
	}
</style>
