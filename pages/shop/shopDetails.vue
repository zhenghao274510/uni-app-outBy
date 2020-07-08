<template>
	<view class="page-body">
		<view class="shop-details-con">
			<view class="shop-details uni-flex d-items-center d-between">
				<image src="/static/img/test/p1.jpg" mode="" class="shop_logo"></image>
				<view class="uni-flex-item">
					<view class="uni-flex d-items-center">
						<image src="/static/img/linetime.png" class="star-img">
							<view class="twoFont">
								营业时间：06:00-22:00
							</view>
					</view>
					<view class="uni-flex d-items-center">
						<view class="uni-flex d-items-center" style="padding-right:40upx;">
							<image src="/static/img/star.png" class="star-img"></image>
							<view class="twoFont">4</view>
						</view>
						<view class="fourFont" style="padding:0 40upx;">
							月销554
						</view>
						<view class="twoFont shop_self">
							店铺支持:店员配送
						</view>

					</view>
				</view>
			</view>
			<text class="shopaddress">
				地址:{{dataobject.shopaddress}}
			</text>
			<view class="shop_img_con uni-flex d-items-center" v-if="tabCurrentIndex==2">
				<image src="/static/img/test/p1.jpg" class="shop_direct_img animated bounceIn"></image>
				<image src="/static/img/test/p1.jpg" class="shop_direct_img animated bounceIn"></image>
				<image src="/static/img/test/p1.jpg" class="shop_direct_img animated bounceIn"></image>
			</view>
		</view>
		<uni-search-bar style="width: 100%;" placeholder="搜索店内商品" bgColor="#FFF"></uni-search-bar>
		<view class="" style="position: relative;">
			<scoll-x-title :navArr="navList" :tabCurrentIndex="tabCurrentIndex" @navbarTap="navbarTap"></scoll-x-title>
			<view class="store-con uni-flex d-items-center animated bounceIn" hover-class="fadeIn">
				<image src="/static/img/hasstore.png" class="store-img " v-if="dataobject.collect==0"></image>
				<image src="/static/img/shoucang.png" class="store-img" v-else></image>
				收藏
			</view>
		</view>
		<block v-if="tabCurrentIndex==0" >
			<view class="category-list">
				<!-- 左侧分类导航 -->
				<scroll-view scroll-y="true" class="left">
					<view class="row animated"  v-for="(v,k) in dataobject.classList" :key="k" :class="{'on bounceIn':k==showCategoryIndex}" @tap="showCategory(v.csid,k)">
						<view class="text">
							{{v.name}}
						</view>
					</view>
				</scroll-view>
				<!-- 右侧子导航 -->
				<scroll-view scroll-y="true" class="right" @scrolltolower="loadMore">
					<view class="category">
						<view class="list" v-for="(v,k) in rightDataList" :key="k">
							<view class="uni-flex d-items-center" @click.stop="details(v.goodsid)">
								<image :src="v.image" class="class-p-img"></image>
								<view class="uni-flex-item">
									<view class="text">{{v.name}}</view>
									<view class="sku-name">
										规格1
									</view>
									<view class="uni-flex uni-space">
										<view class="price-box">
											<text class="newprice_con">￥ <text class="new_price"></text> {{v.newprice}}</text><text class="o-price">￥{{v.oldprice}}</text>
										</view>
										<view class="shop_btn" hover-class="btn-hover" @click.stop="showSku">
											选规格
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<uni-load-more :status="status"></uni-load-more>
				</scroll-view>
			</view>
			<view class="uni-flex bottom-con " v-if="dataList.length==0">
				<navigator class="bottom-item-left" url="/pages/Previewindo/sendmessage">
					<image src="/static/img/icon-customer.png" mode="" class="cart-img  animated pulse infinite"></image>
					<view class="point-tip">
						联系商家
					</view>
				</navigator>
				<view class="uni-flex-item bottom-price" @tap.stop="showCart">
					<view class="one">￥<text class="price">{{allPrice}}</text></view>
					<view class="two">未达到免除基础运费</view>
				</view>
				<view class="botton-btn end-price animated" hover-class="fadeIn" @tap="creatOrder">
					结算
				</view>
			</view>
			<view class="uni-flex bottom-con" v-else>
				<navigator class="bottom-item-left" url="/pages/Previewindo/sendmessage">
					<image src="/static/img/icon-customer.png" mode="" class="cart-img  animated pulse infinite"></image>
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
		<block v-if="tabCurrentIndex==1">
			<view class="animated slideInRight">
				<eva-product-list :dataList="eavList"></eva-product-list>
				<empty v-if="eavList.length==0"></empty>
			</view>
			
		</block>
		<block v-if="tabCurrentIndex==2">
			<view class="info-con animated slideInRight">
				<view class="uni-flex d-between d-items-center info-con-item">
					<view class="uni-flex uni-flex-item d-items-center">
						<image src="/static/img/dingwei.png" class="left-img-icon"></image>
						<view class="shop-info-details">
							地址:郑州市金水区商都世贸中心
						</view>
					</view>
					<view class="phone-icon-con uni-flex d-items-center d-content-center animated pulse infinite" hover-class="fadeIn">
						<image src="/static/img/block_phone.png" class="right-img-icon"></image>
					</view>
					
				</view>
				<view class="uni-flex d-between d-items-center info-con-item">
					<view class="uni-flex uni-flex-item d-items-center">
						<image src="/static/img/ziliao.png" class="left-img-icon">
							<view class="shop-info-details">
								食品安全资料
							</view>
					</view>
					<view class="uni-icon uni-icon-arrowright">

					</view>
				</view>
			</view>
			<view class="info-con animated slideInLeft">
				<view class="uni-flex d-between d-items-center">
					<view class="uni-flex uni-flex-item d-items-center">
						<image src="/static/img/time.png" class="left-img-icon">
							<view class="shop-info-details">
								营业时间:06:00-22:00
							</view>
					</view>
					<view class="">

					</view>
				</view>
				<view class="uni-flex d-between d-items-center info-con-item">
					<view class="uni-flex uni-flex-item d-items-center">
						<image src="/static/img/peisong.png" class="left-img-icon">
							<view class="shop-info-details">
								配送方式:平台配送人员配送
							</view>
					</view>
					<view class="">

					</view>
				</view>
			</view>

		</block>

		<shop-cart :dataList="dataList" ref="shopCart" @change="onChange" :propsAnimated='cartAnimated' @close="onClose" v-show="specCart"
		 @cancle='confirmDel'></shop-cart>
		<sku-swiper ref="skuSwiper" :propsAnimated='propsAnimated' v-show="specClass" @onCancel="onCancel"></sku-swiper>
	</view>
</template>

<script>
	import shopCart from "@/components/mycom/shop-cart.vue"
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	import scollXTitle from "@/components/mycom/scoll-x-title.vue"
	import evaProductList from '@/components/mycom/eva-product-List.vue'
	import empty from '@/components/xw-empty/xw-empty.vue'
	import skuSwiper from '@/components/home/sku-wiper.vue';
	export default {
		components: {
			shopCart,
			uniSearchBar,
			scollXTitle,
			evaProductList,
			empty,
			skuSwiper
		},
		data() {
			return {
				cartAnimated: 'slideInUp',
				propsAnimated: 'fadeIn',
				specCart: false,
				specClass: false,
				status: 'loading',
				showCategoryIndex: 0,
				tabCurrentIndex: 0,
				leftCid: '',
				allPrice: 0, // 店铺商品总价   不含运费
				page: 1,
				id: '',
				cartNum: 0,
				totalPage: 1,
				navList: [{
					name: '点餐'
				}, {
					name: '评价'
				}, {
					name: '商家'
				}],
				eavList: [{
					avatar: '/static/img/test/p1.jpg',
					nickname: '小黄',
					score: 4,
					content: '满意度百分之百 非常不错的口感……',
					image: ['/static/img/test/p1.jpg', '/static/img/test/p1.jpg']
				}],
				rightDataList: [{
						id: "0",
						image: "https://www.mintaoshenghuo.com/userfiles/1/程序附件//information/category/informationCategory/2020/6/民淘商城.png",
						name: "民淘商城",
						newprice:'30',
						oldprice:'40'
					},
					{
						id: "0",
						image: "https://www.mintaoshenghuo.com/userfiles/1/程序附件//information/category/informationCategory/2020/6/民淘商城.png",
						name: "民淘商城",
						newprice:'30',
						oldprice:'40'
					},
					{
						id: "0",
						image: "https://www.mintaoshenghuo.com/userfiles/1/程序附件//information/category/informationCategory/2020/6/民淘商城.png",
						name: "民淘商城",
						newprice:'30',
						oldprice:'40'
					}

				],
				dataList: [], //  店铺购物车列表
				dataobject: {
					shopid: "1", //店铺id
					shopname: "XX店铺", //店铺名称
					shopimage: "/static/img/test/p1.jpg", //店铺图片
					shopaddress: "郑州市金水区商都世贸", //店铺地址
					longitude: "", //店铺经度
					latitude: "", //店铺纬度
					shopphone: "", //店铺电话
					shopdesc: "", //店铺简介
					gradename: "", //店铺等级
					salenum: "554", //店铺销量
					looknum: "", //店铺浏览量
					adtime: "", //入驻时间
					collect: 1,
					classList: [{
							csid: "", //店铺商品分类id
							image: "https://www.mintaoshenghuo.com/userfiles/1/程序附件//information/category/informationCategory/2020/6/民淘商城.png",
							name: "民淘商城",
						},
						{
							csid: "", //店铺商品分类id
							image: "https://www.mintaoshenghuo.com/userfiles/1/程序附件//information/category/informationCategory/2020/6/民淘商城.png",
							name: "民淘商城",
						},
						{
							csid: "", //店铺商品分类id
							image: "https://www.mintaoshenghuo.com/userfiles/1/程序附件//information/category/informationCategory/2020/6/民淘商城.png",
							name: "民淘商城",
						},
						{
							csid: "", //店铺商品分类id
							image: "https://www.mintaoshenghuo.com/userfiles/1/程序附件//information/category/informationCategory/2020/6/民淘商城.png",
							name: "民淘商城",
						}
					],

				}
			}
		},
		onLoad(options) {
			// this.id = options.id;
		},
		watch: {
			dataList: {
				handler(e) {
					// this.$forceUpdate();
					if (e.length != 0) {
						let price = 0;
						e.forEach(item => {
							price += item.newprice * item.numbers;
						});
						this.allPrice = this.$api.parsePrice(price);
					} else {
						this.allPrice = 0;
					}
					this.cartNum = e.length;
				},
				deep: true
			}
		},
		onShow() {
			// if (uni.getStorageSync('uid')) {
			// 	getApp().globalData.uid = uni.getStorageSync('uid')
			// }
			// if(getApp().globalData.uid!=''){
			// 	this.getShopCart();
			// }
		},
		methods: {
			navbarTap(e) {
				console.log(e)
				this.tabCurrentIndex = e.ind;
			},
			loadData() {
				let parmas = {
					cmd: 'shopdetail',
					uid: getApp().globalData.uid,
					shopid: this.id
				};
				this._reqw.ipost(parmas).then(res => {
					console.log(res)
					res.result == 0 ? (this.dataobject = res.dataobject, this.leftCid = res.dataobject.classList[0].csid, this.getRightData(
						this.leftCid)) : this.$api.tip(res.resultNote)
				}).catch(err => {})

			},
			loadMore() {
				this.totalPage > this.page ? (this.page += 1, this.status = "loading", this.getRightData(this.leftCid)) :
					setTimeout(() => {
						this.status = "noMore"
					}, 300)
			},
			tellPhone() {
				this.$api.callPhone(this.dataobject.shopphone);
			},
			//   规格 购物车动画部分
			showSku() {
				if (getApp().globalData.uid == '') {
					this.$api.navTo(`/pages/author`)
				} else{
					this.$refs.skuSwiper.open();
				}
				
			},
			onCancel() {
				this.propsAnimated = 'fadeOut';
				setTimeout(() => {
					this.$refs.skuSwiper.hidden();
					this.propsAnimated = 'fadeIn';
				}, 300)
			},
			showCart() {
				if (getApp().globalData.uid == '') {
					this.$api.navTo(`/pages/author`)
				} else {
					this.$refs.shopCart.open();
				}
			},
			onClose() {
				this.cartAnimated = 'slideOutDown';
				setTimeout(() => {
					this.$refs.shopCart.hidden();
					this.cartAnimated = 'slideInUp';
				}, 300)
			},
			//  删除购物车
			confirmDel() {
				this.onClose();
				if (this.dataList.length != 0) {
					let arry = [];
					this.dataList.forEach(item => {
						arry.push(item.goodscarid)
					});
					let parmas = {
						cmd: 'deletegoodscar',
						uid: getApp().globalData.uid,
						cidlist: arry
					}
					this._reqw.ipost(parmas).then(res => {
						res.result == 0 ? (this.$api.tip('删除成功!'), this.dataList = []) :
							this.$api.tip(
								res.resultNote)
					}).catch(err => {})
				}
			},
			getShopFright() {
				let parmas = {
					cmd: 'getfreights',
					shopid: this.id
				}
				console.log(parmas)
				this._reqw.ipost(parmas).then(res => {
					console.log(res)
					res.result == 0 ? this.freights = res.datastr : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//修改购物车数量
			onChange(e) {
				let parmas = {
					cmd: 'editgoodscar',
					uid: getApp().globalData.uid,
					goodscarid: this.dataList[e.index].goodscarid,
					count: e.number
				}
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (this.dataList[e.index].numbers = e.number) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//   商家购物车数据
			getShopCart() {
				let parmas = {
					cmd: 'myshopgoodscar',
					uid: getApp().globalData.uid,
					shopid: this.id
				}
				console.log(parmas)
				this._reqw.ipost(parmas).then(res => {
					console.log(res)
					res.result == 0 ? (res.dataList ? this.dataList = res.dataList : '') : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			showCategory(id, k) {
				if (this.showCategoryIndex != k) {
					this.leftCid = id;
					this.showCategoryIndex = k;
					this.clear();
				}
			},
			getRightData(id) {
				let parmas = {
					cmd: 'shopclassfyGoodsList',
					csid: id,
					nowPage: this.page,
					pageCount: '10'
				}
				console.log(parmas)
				this._reqw.ipost(parmas).then(res => {
					console.log(res)
					res.result == 0 ? ((res.totalPage > 1 ? this.status = "more" : this.status = 'noMore'), this.totalPage = res.totalPage,
						res.dataList.forEach(item => {
							this.rightDataList.push(item)
						})) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			clear() {
				this.rightDataList = [];
				this.totalPage = this.page = 1;
				this.getRightData(this.leftCid);
			},
			details(id) {
				this.$api.navTo(`/pages/goodDetails/gooddetails?id=${id}&type=1`)
			},
			addCart(id) {
				if (getApp().globalData.uid == '') {
					this.$api.navTo(`/pages/author`)
				} else {
					let parmas = {
						cmd: 'addshopgoodscar',
						uid: getApp().globalData.uid,
						shopid: this.id,
						goodsid: id,
						count: 1
					};
					this._reqw.ipost(parmas).then(res => {
						console.log(res)
						res.result == 0 ? (this.$api.tip('添加成功!'), this.getShopCart()) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				}
			},
			creatOrder() {
				if (getApp().globalData.uid == '') {
					this.$api.navTo(`/pages/author`);
				} else {
					if (this.dataList.length == 0) {
						this.$api.tip('请先选择商品!')
					} else {
						this.$refs.shopCart.close();
						this.$api.navTo(
							`/pages/order/finishOrder?type=3&id=${this.id}&goods=${encodeURIComponent(JSON.stringify(this.dataList))}`)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.phone-icon-con{
		width: 80upx;
		height: 80upx;
	}
	.shop_btn {
		width: 104upx;
		height: 46upx;
		line-height: 46upx;
		text-align: center;
		background: linear-gradient(147deg, rgba(255, 191, 0, 1), rgba(251, 216, 111, 1));
		border-radius: 23upx;
		font-size: 24upx;
	}

	.store-con {
		width: 144upx;
		height: 62upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 32upx 0px rgba(129, 129, 129, 0.15);
		border-radius: 32upx 0px 0px 32upx;
		position: absolute;
		right: 0;
		top:20%;
		justify-content: center;
		font-size: 24upx;

		.store-img {
			width: 32upx;
			height: 32upx;
			margin-right: 20upx;
		}
	}

	//   商家信息 部分
	.info-con {
		background-color: #FFFFFF;
		margin-top: 30upx;
		padding: 30upx 20upx;

		.info-con-item {
			padding: 30upx 0;
		}
	}

	.uni-icon {
		color: #A0A0A0;
		font-size: 28upx;
		margin-right: 10upx;
	}

	.shop-info-details {
		font-size: 26upx;
		color: rgba(51, 51, 51, 1);
	}

	.left-img-icon {
		width: 30upx;
		height: 30upx;
		margin-right: 10upx;
	}

	.right-img-icon {
		width: 42upx;
		height: 42upx;
	}

	.shop-details-con {
		background-color: #323332;
		margin-bottom: 20upx;
		padding: 30upx 20upx;

		.shop-details {
			margin-bottom: 36upx;

			view {
				color: #FFFFFF;
			}
		}

		.shop_logo {
			width: 91upx;
			height: 91upx;
			margin-right: 20upx;
		}
	}

	.twoFont {
		font-size: 22upx;
	}

	.fourFont {
		font-size: 24upx;
		position: relative;

		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 1upx;
			height: 12upx;
			background-color: #ADADAD;
		}
	}

	.shop_self {
		color: #989898;
	}

	.shopaddress {
		background: rgba(72, 72, 72, 1);
		border-radius: 4upx;
		padding: 10upx;
		color: #DEDEDE;
		font-size: 22upx;
	}

	.shop_img_con {
		padding-top: 40upx;

		.shop_direct_img {
			width: 149upx;
			height: 149upx;
			border-radius: 6upx;
			margin-right: 25upx;
		}
	}




	// 底部购物车
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

	//  底部商品  部分
	.price-box {
		font-weight: 500;
		color: rgba(255, 0, 0, 1);
		line-height: 35upx;

		.newprice_con {
			font-size: 20upx;
			color: rgba(252, 69, 58, 1);

			.new_price {
				color: rgba(252, 69, 58, 1);
				font-size: 30upx;
			}
		}
	}

	.point-tip {
		color: #FFBF00;
		font-size: 24upx;
	}

	.price {
		color: rgba(255, 0, 0, 1);
		font-weight: 600;
		font-size: 26upx;
	}

	.sku-name {
		font-size: 22upx;
		color: rgba(153, 153, 153, 1);
		line-height: 35upx;
		// margin: 20upx 0;
		height: 35upx;
	}

	.uni-space {
		justify-content: space-between;

	}

	.class-p-img {
		width: 160upx;
		height: 160upx;
		border-radius: 8upx;
		margin-right: 10upx;
	}

	.class-img {
		width: 58upx;
		height: 58upx;
		position: absolute;
		top: 50%;
		right: 20upx;
	}

	.text {
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 35upx;
	}

	.category-list {
		width: 100%;
		background-color: #fff;
		display: flex;

		.left,
		.right {
			position: absolute;
			top: 460upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(460upx + var(--status-bar-height));
			/*  #endif  */
			bottom: 100upx;
		}

		.left {
			width: 24%;
			left: 0upx;
			background-color: #F5F7F8;

			.row {
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;

				.text {
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color: #666666;

				}

				&.on {
					height: 90upx;
					background-color: #fff;

					.text {
						font-size: 30upx;
						font-weight: 600;
						color: #FE5063;
					}
				}
			}
		}

		.right {
			width: 76%;
			left: 24%;
			background: #F5F7F8;

			.category {
				width: 94%;
				padding: 0 3%;

				.list {
					background-color: #FFFFFF;
					margin-bottom: 20upx;
					width: 100%;
					padding: 20upx;
					box-sizing: border-box;
					// height: 207upx;
					box-shadow: 0px 0px 81upx 0px rgba(233, 233, 233, 0.6);
					position: relative;

					.box {
						padding: 10upx;
						margin-bottom: 30upx;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-wrap: wrap;
					}

					.o-price {
						font-size: 22upx;
						text-decoration: line-through;
						color: rgba(153, 153, 153, 1);
						margin-left: 30upx;
					}
				}
			}
		}
	}

	//  右侧  排序兰
	.top-nav {
		display: flex;
		align-items: center;
		margin: 20upx 0;
	}

	.top-nav-item {
		width: 60%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-nav-item-title {
		text-align: center;
		font-size: 24upx;
	}

	.top-nav-item-icon {
		line-height: 0.3;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	view {
		line-height: 1.5;
	}
</style>
