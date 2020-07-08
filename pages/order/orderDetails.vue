<template>
	<view class="order-details-con">
		<view class="pad-con">
			<view class="orderState animated slideInRight" >
				<!-- 1 待付款 2 待发货	3 待收货	4 待评价	5 已完成	6 已取消 7 退款待审核 8 已退款 9拒绝退款 -->
				<image src="/static/order/wateing.png" mode="" class="topstateImg" v-if="dataobject.orderStatus==1"></image>
				<image src="/static/order/haswancheng.png" mode="" class="topstateImg" v-if="dataobject.orderStatus==5"></image>
				<image src="/static/order/quxiao.png" mode="" class="topstateImg" v-if="dataobject.orderStatus==6"></image>
				<text v-if="dataobject.orderStatus == 1">待付款</text>
				<text v-if="dataobject.orderStatus == 2">正在出库</text>
				<text v-if="dataobject.orderStatus == 3">待收货</text>
				<text v-if="dataobject.orderStatus == 4">待评价</text>
				<text v-if="dataobject.orderStatus == 5">已完成</text>
				<text v-if="dataobject.orderStatus == 6">订单已取消</text>
				<text v-if="dataobject.orderStatus == 7">退款待审核</text>
				<text v-if="dataobject.orderStatus == 8">已退款</text>
				<text v-if="dataobject.orderStatus == 9">拒绝退款</text>
			</view>
		</view>
		<view class="pad-con">
			<view class="uni-flex d-items-center d-between order-pai-con">
				<image src="/static/class/good.png" class="order-pai"></image>
				<view class="uni-flex-item" style="padding: 0 10px;">
					<view class="order-pai-name">
						骑手：柠檬学长
					</view>
					<view class="order-pai-time">
						预计送达时间：15:00-16:00
					</view>
				</view>
				<navigator url="/pages/order/paiInfo" class="order-pai-btn">
					联系骑手
				</navigator>
			</view>
		</view>


		<view class="goods-section pad-con">
			<view class="yt-list">
				<view class="yt-list-cell">
					<text class="cell-tit">星巴克咖啡代购(曼哈顿广场商圈1店)</text>
					<text class="cell-tip"></text>
				</view>
			</view>

			<!-- 商品列表 -->
			<view class="g-item" v-for="(v, k) in dataobject.orderGoodsList" :key="k">
				<view class="goods-img-con">
					<image :src="v.goodsImage" class="goods-img"></image>
				</view>
				<view class="right">
					<view class="uni-flex d-items-center d-between">
						<view class="title uni-ellipsis">
							{{v.goodsName }}
						</view>
						<view> <text class="price-slome">￥</text> <text class="price">{{v.amount}}</text></view>
					</view>
					<view class="num">× {{v.count}}</view>
				</view>
			</view>


			<view class="yt-list">
				<view class="yt-list-cell">
					<text class="cell-tit">餐盒费</text>
					<text class="cell-tip">￥{{goodsAmount}}</text>
				</view>
				<view class="yt-list-cell" v-if="dataobject.carriage!=0">
					<text class="cell-tit">配送费</text>
					<text class="cell-tip">￥{{dataobject.carriage}}</text>
				</view>
				<view class="yt-list-cell" v-if="dataobject.carriage!=0">
					<view class="uni-flex d-items-center">
						<image src="/static/img/juan.png" class="juan_img"></image><text class="cell-tit">优惠券</text>
					</view>
					<navigator url="/pages/mineoptions/compline" class="uni-flex d-items-center">
						<text class="cell-tip" style="color:#FE6D65;">-￥{{dataobject.carriage}}</text>
						<view class="uni-icon uni-icon-arrowright" >
						</view>
					</navigator>
				</view>
				<view class="yt-list-cell">
					<text class="cell-tit"></text>
					<text class="cell-tip">实付  ￥{{dataobject.realAmount}}</text>
				</view>
				<view class="yt-list-cell">
					<view class="uni-flex uni-flex-item d-items-center d-content-center">
						<image src="/static/order/order_phone.png" class="liuyan_img"></image><text class="cell-tit" style="color:#333333;font-weight:bold;">联系客服</text>
					</view>
					<navigator url="/pages/Previewindo/sendmessage" class="uni-flex d-items-center uni-flex-item d-content-center">
						<image src="/static/order/lineing.png" class="liuyan_img"></image><text class="cell-tit" style="color:#333333;font-weight:bold;">留言</text>
					</navigator>
				</view>
			</view>
		</view>

		<!-- 金额明细 -->
		<view class="yt-list pad-top-bot">
			<view class="yt-list-cell d-border-bottom">
				<text class="cell-tit goodTitle">订单信息</text>
				<text class="cell-tip red"></text>
			</view>
			<view class="yt-list-cell">
				<text class="cell-tit">订单编号</text>
				<text class="cell-tip red">{{dataobject.num }}</text>
			</view>
			<view class="yt-list-cell">
				<text class="cell-tit">下单时间</text>
				<text class="cell-tip">{{ dataobject.placeDate }}</text>
			</view>
			
			<view class="yt-list-cell">
				<text class="cell-tit">收货地址</text>
				<text class="cell-tip">{{dataobject.location}}</text>
			</view>
			<view class="uni-flex d-items-center d-between">
				<text class="cell-tit"></text>
				<text class="cell-tip">{{dataobject.name}}   {{dataobject.phone}}</text>
			</view>
			<view class="yt-list-cell" v-if="dataobject.deliverDate!=''">
				<text class="cell-tit">商家接单时间</text>
				<text class="cell-tip">{{dataobject.deliverDate}}</text>
			</view>
			<view class="yt-list-cell" v-if="dataobject.receiveDate!=''">
				<text class="cell-tit">收货时间</text>
				<text class="cell-tip">{{dataobject.receiveDate}}</text>
			</view>
			<view class="yt-list-cell" v-if="dataobject.commentDate!=''">
				<text class="cell-tit">评价时间</text>
				<text class="cell-tip">{{dataobject.commentDate}}</text>
			</view>
			<view class="yt-list-cell" v-if="dataobject.cancelReason!=''">
				<text class="cell-tit">订单取消原因</text>
				<text class="cell-tip">{{dataobject.cancelReason}}</text>
			</view>
			<view class="yt-list-cell">
				<text class="cell-tit">备注</text>
			</view>
			<view class="yt-list-cell">
				<text class="cell-tip" v-if="dataobject.refundAuditRemarks!=''">{{dataobject.refundAuditRemarks}}</text>
				<text class="cell-tip" v-else>-</text>
			</view>
			<view class="yt-list-cell">
				<text class="cell-tit">支付方式</text>
				<text class="cell-tip">微信支付</text>
			</view>
		</view>
		
		<view class="yt-list pad-top-end">
			<view class="yt-list-cell d-border-bottom">
				<text class="cell-tit goodTitle">配送信息</text>
				<text class="cell-tip red"></text>
			</view>
			<view class="yt-list-cell">
				<text class="cell-tit">骑手</text>
				<text class="cell-tip red">{{dataobject.name}}</text>
			</view>
			<view class="yt-list-cell">
				<text class="cell-tit">接单时间</text>
				<text class="cell-tip">{{ dataobject.placeDate }}</text>
			</view>
		</view>
		<view class="yt-list pad-top-bot">
			<view class="yt-list-cell d-border-bottom">
				<text class="cell-tit goodTitle">售后信息</text>
				<text class="cell-tip red"></text>
			</view>
			<view class="yt-list-cell">
				<text class="cell-tit">申请售后时间</text>
				<text class="cell-tip red">{{dataobject.name}}</text>
			</view>
			<view class="yt-list-cell">
				<text class="cell-tit">退款原因</text>
				<text class="cell-tip">{{ dataobject.placeDate }}</text>
			</view>
			<view class="yt-list-cell">
				<text class="cell-tit">商家确认时间</text>
				<text class="cell-tip">{{ dataobject.placeDate }}</text>
			</view>
		</view>
		<!-- 1 待付款 2 待发货	3 待收货	4 待评价	5 已完成	6 已取消 7 退款待审核 8 已退款 9拒绝退款 -->
		<view class="order-bottom uni-flex d-between">
			<view class="" style="width:10%;">
			</view>
			<view class="uni-flex d-items-center">
				<view class="order-bottom-two order-btn pay" hover-class="btn-hover" @click="finishOrder('收货')" v-if="dataobject.orderStatus ==3">确认收货</view>
				<view class="order-bottom-two order-btn cancle" hover-class="btn-hover" @click="getXOrder(0)" v-if="dataobject.orderStatus ==4||dataobject.orderStatus ==5">退换/售后</view>
				<view class="order-bottom-two green order-btn" hover-class="btn-hover" @click="getXOrder(1)" v-if="dataobject.orderStatus == 4">去评价</view>
				<view class="order-bottom-two cancle order-btn" hover-class="btn-hover" @click="finishOrder('取消')" v-if="dataobject.orderStatus ==1">取消订单</view>
				<view class="order-bottom-two pay order-btn" hover-class="btn-hover" @click="payOrder" v-if="dataobject.orderStatus == 1">去支付</view>
				<view class="order-bottom-two pay order-btn" hover-class="btn-hover" @click="cancelRefund" v-if="dataobject.orderStatus ==7">取消退款</view>
				<view class="order-bottom-two cancle order-btn" hover-class="btn-hover" @click="finishOrder('删除')" v-if="dataobject.orderStatus == 4||dataobject.orderStatus == 6||dataobject.orderStatus ==5">删除订单</view>
			</view>
		</view>
		<refund-list ref="refundList" :propsAnimated='refundAnimated' @click="btnCancle" @cancel="onCancle"></refund-list>
		<cart-pop :propsAnimated='firstAnimated' type='1' ref="cartPop" @onCancel='confirmeCancel'></cart-pop>
	</view>
</template>

<script>
	import refundList from "@/components/mycom/poupone.vue"
	import cartPop from "@/components/mycom/cartPop.vue"
	export default {
		components: {
			refundList,
			cartPop
		},
		data() {
			return {
				refundAnimated:'zoomIn',
				firstAnimated:'zoomIn',
				uid: '',
				orderId: '',
				showTip: false,
				endTime: 0,
				dataobject: {
					id: "", //订单id
					num: "", //订单编号
					shopId: "", // 店铺id
					shopName: "", // 店铺id
					shopPhone: "", // 店铺电话
					name: "", //收货人
					phone: "", //收货人电话
					location: "", //地址
					orderStatus: 1, //订单状态，如下所示
					goodsAmount: 1, //商品总价
					carriage: 1, //运费
					amount: 1, //总价
					userPointsDeduction: 1, //积分抵扣金额
					realAmount: 1, //实际支付价格
					deliverNum: "", //快递单号
					payChannel: 1, //支付渠道，1.微信，2.微信/积分
					placeDate: "1", //下单时间
					payDate: "1", //支付时间
					deliverDate: "1", //发货时间
					receiveDate: "1", //收货时间
					commentDate: "1", //评价时间
					refundApplyDate: "1", //退款申请时间
					refundAuditDate: "1", //退款审核时间
					refundIntoDate: "1", //退款到账时间
					cancelDate: "1", //取消时间
					cancelReason: "1", //取消原因
					refundReason: "1", //退款原因
					refundAmount: "1", //退款金额
					refundImage: [], //退款图片
					refundAuditRemarks: "1", //退款审核备注
					orderGoodsList: [ //订单商品列表
						{
							id: "", //商品id
							name: "", //商品名称
							image: "", //商品图片
							goodsSpecName: "", //商品规格名称，没有规格返空字符串
							count: "", //数量
							price: "", //价格
							amount: "", //总价
							comment: "1" //是否已评价1是，0否
						}
					]
				}
			}
		},
		watch: {
			dataobject: {
				handler(n) {
					if (n.orderStatus == 1) {
						console.log()
						this.endTime = this.$api.formatTime(24 * 60 * 60 * 1000 - (new Date().getTime() - new Date(n.placeDate).getTime()))
					} else {
						this.endTime = 0
					}
				},
				deep: true
			}
		},
		onLoad(options) {
			this.orderId = options.id;
		},
		onShow() {
			this.loadData();
		},
		computed: {
			goodsAmount() {
				return this.$api.parsePrice(this.dataobject.realAmount - this.dataobject.carriage)
			}
		},
		methods: {
			onCancle(){
				this.refundAnimated = 'zoomOut';
				setTimeout(() => {
					this.$refs.refundList.hidePicker();
					this.refundAnimated = 'zoomIn';
				}, 300)
			},
			confirmeCancel(){
				this.firstAnimated = 'zoomOut';
				setTimeout(() => {
					this.$refs.cartPop.hidden();
					this.firstAnimated = 'zoomIn';
					this.$refs.refundList.showPicker();
				}, 300)
			},
			cancelRefund() {
				uni.showLoading({
					title: '请稍后'
				})
				let parmas = {
					mid:getApp().globalData.uid,
					oid: this.orderId
				}
				this._reqw.ipost(parmas, "cancelRefund").then(res => {
					res.result == 0 ? (this.$api.tip('取消成功!'), this.$api.back(), uni.hideLoading()) :
						this.$api.tip(res.reultNote)
				}).catch(err => {})
			},
			
			btnCancle(e) {
				let parmas = {
					mid:getApp().globalData.uid,
					oid: this.orderId,
					cancelReason: e
				}
				this._reqw
					.ipost(parmas, 'cancelOrder')
					.then(res => {
						console.log(res)
						res.result == 0 ? (this.onCancle(),this.loadData()) :
							this.$api.tip(res
								.resultNote);
					})
					.catch(err => {});
			},
			confirmDel() {
				this.getData("orderconfirm", '收货');
			},
			tellPhone() {
				this.$api.callPhone(this.dataobject.shopPhone)
			},
			loadData() {
				let e = {
					mid: getApp().globalData.uid,
					oid: this.orderId
				}
				this.getOrderDetailsData(e,res=>{
					res.result == 0 ? this.dataobject = res : this.$api.tip(res
						.resultNote);
				})
			},
			// 查看物流  评价
			getXOrder(n) {
				let url = '';
				n == 0 ? url =
					`/pages/order/subSouHuo?id=${this.orderId}` :
					url = `/pages/order/addEva?id=${this.orderId}`;
				this.$api.navTo(url);
			},
			finishOrder(type) {
				if (type == '删除') {

					this.getData("deleteOrder", '删除')
				} else if (type == "收货") {
					this.getData("confirmOrder", '收货')
				} else if (type == '取消') {
					console.log(111)
					this.$refs.cartPop.open();
				}

			},
			getData(url, type) {
				let parmas = {
					mid: this.uid,
					oid: this.orderId
				};
				this._reqw
					.ipost(parmas, url)
					.then(res => {
						res.result == 0 ? (this.$api.tip(`${type}成功`), this.$api.back()) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			payOrder() {
				let parmas = {
					mid: this.uid,
					oid: this.orderId
				};
				this._reqw
					.ipost(parmas, "payOrder")
					.then(res => {
						res.result == 0 ? (this.$api.onBridgeReady(res)) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});

			}
		}
	}
</script>

<style lang="scss" scoped>
	//  骑手信息
	.order-pai-con{
		padding:30upx;
		.order-pai{
			width:100upx;
			height:100upx;
			border-radius:50%;
		}
		.order-pai-name{
			font-weight: bold;
		}
		.order-pai-time{
			font-size:24upx;
			color:rgba(255,137,63,1);
		}
		.order-pai-btn{
			width:130upx;
			height:50upx;
			border:2upx solid rgba(231,231,231,1);
			border-radius:10upx;
			font-size:26upx;
			text-align: center;
		}
		
	}
	
	
	
	//  骑手信息 end
	.uni-icon-arrowright{
		color: #999999;
		font-size: 26upx;
	}
	.juan_img{
		width:28upx;
		height:28upx;
		margin-right: 20upx;
	}
	.liuyan_img{
		width:44upx;
		height:44upx;
		margin-right: 20upx;
	}
	.cell-tip {
		color: #333;
		font-size: 26upx;
	}

	.uni-list-cell {
		padding: 30upx;
	}

	.juan-bg {
		width: 136upx;
		height: 40upx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.goodTitle {
		position: relative;
		font-size: 32upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}
	.pad-top-end{
		padding: 30upx 0;
		width: 95%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		
		.cell-tip {
			text-align: left !important;
		}
	}

	.pad-top-bot {
		padding: 30upx 0;
		margin: 22upx auto;
		width: 95%;
		box-sizing: border-box;
		background-color: #FFFFFF;

		.cell-tip {
			text-align: left !important;
		}
	}

	.pad-con {
		padding: 30upx 0;
		margin-top: 22upx;
		width: 95%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}

	.order-details-con {
		min-height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		// background: #FFFFFF;
	}

	.topstateImg {
		width: 45upx;
		height: 45upx;
		margin-right: 20upx;
	}

	.seeWuLiu {
		background: rgba(9, 187, 7, 1);
	}

	.orderState {
		height: 110upx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 100%;

		text {
			font-size: 36upx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}
	}

	.bg-img {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 320upx;
	}

	.order-bottom {
		margin-top: 20upx;
		height: 100upx;
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.order-bottom-orice {
		color: #333333;
		font-size: 13px;
		margin-left: 5px;
	}

	.order-bottom-one {
		color: #999999;
		border: 2upx solid #999999;
		border-radius: 32upx;
		padding: 10upx 20upx;
		font-size: 13px;
	}

	.order-bottom-canle {
		background: #DBDBDB;
		color: #FFFFFF;
	}

	.order-btn {
		font-size: 26upx;
		border-radius: 10upx;
		padding: 6upx 30upx;
	}

	.pay {
		background: #FEC51C;
	}

	.cancle {
		background: #FF3851;
	}

	.order-bottom-two {
		color: #FFFFFF;
		// background: #4CC5F3;
		margin-left: 15px;
	}

	.goods-section {
		// background: #fff;
		border-bottom: 1px solid #EEEEEE;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.g-item {
			display: flex;
			align-items: center;
			padding: 20upx;
			.goods-img-con {
				padding: 20upx;
			}

			.goods-img {
				width: 113upx;
				height: 122upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				overflow: hidden;
			}

			.title {
				font-size:30upx;
				font-weight:bold;
				color:rgba(51,51,51,1);
			}

			.spec {
				font-size: 22upx;
				color: #666666;
				line-height: 40upx;
				background-color: #edecf1;
			}

			.price {
				font-size: 36upx;
				font-weight: bold;
				color: #fe2c2c;
			}
			.num{
				font-size:20upx;
				color:rgba(153,153,153,1)
			}
		}
	}

	.yt-list {
		padding: 0 30upx;
		// background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 0;
		position: relative;
		.cell-title{
			font-size:26upx;
			color:rgba(102,102,102,1);
		}
		.cell-tip {
			font-size: 26upx;
			text-align: right;
		}
	}
</style>
