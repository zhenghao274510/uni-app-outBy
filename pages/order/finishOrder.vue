<template>
	<view class="content-warpe">
		<!-- 地址 -->
		<view class="address-section" @click="choseAddress" v-if="addressData.id!=''">
			<view class="order-content d-between">
				<view class="cen">
					<text class="mobile">{{addressData.district}}{{addressData.location}}</text>
					<view class="top uni-flex">
						<view class="cell-tit userName">
							<text>{{addressData.name}}</text> <text style="margin-left: 15px;">{{addressData.phone}}</text>
						</view>
					</view>
				</view>
				<view class="uni-icon uni-icon-arrowright"></view>
			</view>
			<view class="pay-send-time">
				预计送达时间：16:15
			</view>
		</view>
		<view class="address-section" @click="choseAddress" v-else>
			<view class="order-content d-between">
				<view class="mobile">
					选择您的收货地址
				</view>
				<view class="uni-icon uni-icon-arrowright"></view>
			</view>
			<view class="pay-send-time">
				预计送达时间：16:15
			</view>
		</view>
		<view class="goods-section">
			<!-- "goodscarid": "购物车id", -->
			<view class="uni-flex d-items-center cart-item-top">
				<image src="/static/img/shop.png" class="shop-icon"></image>{{dataobject.shopName}}
			</view>
			<view class="g-item" v-for="(v,k) in dataobject.goodsList" :key='k'>
				<image :src="v.goodsImage" class="product-img"></image>
				<view class="right">
					<text class="title clamp">{{v.goodsName}}</text>
					<view style="margin: 5px 0;" v-if="v.goodsSpecName!=''">
						<text class="spec uni-ellipsis">{{v.goodsSpecName}}</text>
					</view>
					<view class="price-box">
						<text class="price">￥{{v.goodsPrice}}</text>
						<text class="number">x{{v.count}}</text>
					</view>
				</view>
			</view>
			<!-- 金额明细 -->
			<view class="uni-list-cell-con">
				<view class="uni-list-cell">
					<text class="cell-tip"> 包装费</text>
					<view class="cell-tit">￥{{dataobject.shopPrice}}</view>
				</view>
				<block v-if="type==0">
				<view class="uni-list-cell" v-if="!checked">
					<text class="cell-tip">配送费</text>
					<view class="cell-tit">￥{{freight}}</view>
				</view>
				<view class="uni-list-cell">
					<view class="cell-tip">
						<image src="/static/img/man.png" class="finish-icon"></image> 满减优惠
					</view>
					<view class="cell-tit" style="color:#FE6D65;">满30减5元</view>
				</view>
				<navigator :url="`/pages/mineoptions/compline?price=${endPrice}&type=1`" class="uni-list-cell">
					<view class="cell-tip">
						<image src="/static/img/juan.png" class="finish-icon"></image> 优惠券
					</view>
					<view class="cell-tit uni-flex d-between d-items-center" style="color:#FE6D65;">-￥10
						<view class="uni-icon uni-icon-arrowright" style="font-size: 24rpx;" />
					</view>
				</navigator>
				</block>
			</view>

		</view>



		<view class="goods-section uni-list-cell-con uni-flex d-items-center d-between" v-if="type==0" >
			<view class="cell-tip">备注说明:</view>
			<input value="" placeholder="口味/偏好" v-model="remarks" class="input uni-flex-item" />
		</view>
		<view class="goods-section uni-list-cell-con" v-if="type==1">
			<view class="cell-tip">买家备注:</view>
			<textarea value="" placeholder="请输入你的留言" v-model="remarks" class="textarea" />
			</view>
		<view class="goods-section uni-list-cell-con" style="background-color: #F6F6F6;" v-if="type==0">
			<view class="uni-flex d-items-center d-between">
				<view class="">
					到店自取
				</view>
				<switch :checked="checked" color="#FEC51C" @change="changeOutShop" style="transform: scale(.7);" />
			</view>
			<view class="shop-address">
				（居然之家）商都世贸中心D座2201室
			</view>
		</view>
		<view class="bottom-cut-time uni-flex d-items-center d-between">
			<view class="uni-flex-item">
				
			</view>
			<bbs-count-down :time="LeaveEnd" :setColor="setColor" v-if="LeaveEnd!=0"></bbs-count-down>
		</view>


		<!-- 底部 -->
		<view class="footer" >
			<view class="price-content">
				<text class="price-tip" v-if="endPrice!= 0">￥</text>
				<text class="price">{{ endPrice }}</text>
			</view>
			<view class="submit order-splice animated"  @click="submit" hover-class="fadeIn" v-if="type==0">提交订单</view>
			<view class="submit order-group animated"  @click="submit" hover-class="fadeIn" v-else>确认参团</view>
		</view>
	</view>
</template>

<script>
	import bbsCountDown from "@/components/bbs-countdown/bbs-countdown.vue"
	export default {
		components:{
			bbsCountDown
		},
		data() {
			return {
				checked:false,
				setColor:'#333333',
				LeaveEnd:'9999999',
				text:'',
				addressData: {
					id: "", //地址id
					name: "", //名称
					phone: "", //电话
					district: "", //行政区域
					location: "", //地址
					lat: "", //纬度
					lng: "", //经度
					defaults: "" //是否默认1是0否 
				},
				endPrice: 0,
				freight: 0,
				dataobject: {
					shopPrice:4,
					shopName: '小白',
					goodsList: [{
						goodsImage: '/static/img/test/p1.jpg',
						goodsName: '美式咖啡',
						goodsSpecName: '规格',
						goodsPrice: '30',
						count: '2'
					}]

				},
				type:1,
				remarks: '',
				uid: '',
				point: '',
				complinePrice: 0
			};
		},
		watch:{
			checked(n){
				!n?this.endPrice=this.endPrice:this.endPrice=this.$api.parsePrice(this.endPrice+this.freight);
				console.log(this.endPrice)
			}
		},
		onLoad(options) {
			if (options.point) {
				this.point = options.point;
			}
			console.log(this.dataList)
			this.type = options.type;
			// this.getDefault();
			this.getfreights();
			this.fromPrice(this.dataobject.goodsList);
		},
		methods: {
			changeOutShop(e){
				console.log(e)
				this.checked=e.detail.value;
			},
			fromPrice(arry) {
			let price = 0;
				arry.forEach(item => {
						price += item.goodsPrice * 100 * item.count - 0;
				});
				this.endPrice = this.$api.parsePrice(price/100);
				console.log(this.endPrice)
			},
			getfreights() {
				this._reqw
					.ipost({}, 'carriage')
					.then(res => {
						res.result == 0 ?this.freight = this.$api.parsePrice(res.carriage) : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			submit() {
				console.log(this.checked);
				(!this.checked)?(  this.addressData.id == '' ? this.$api.tip('请选择收货地址!') : this.getOrderId()):this.getOrderId();
			},
			// //  默认地址
			getDefault() {
				let parmas = {
					mid: getApp().globalData.uid
				}
				this._reqw
					.ipost(parmas, 'addressList')
					.then(res => {
						console.log(res);
						res.result == 0 ? (res.dataList.length != 0 ? this.addressData = res.dataList[0] : '') : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			choseAddress() {
				this.$api.navTo(`/pages/mineoptions/address?source=1`);
			},
			payOrder(id) {
				let parmas = {
					mid: getApp().globalData.uid,
					oid: id
				};
				this._reqw
					.ipost(parmas, 'payOrder')
					.then(res => {
						res.result == 0 ? (this.$api.PayBywx(res, 'finish')) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			getOrderId() {
				let parmas = {
					mid: this.uid,
					aid: this.addressData.id,
					remarks: this.remarks

				};
				console.log(this.dataList);
				if (this.type == 'goods') {
					
				} else {
					
				}
				console.log(parmas);
				this._reqw
					.ipost(parmas, url)
					.then(res => {
						res.result == 0 ? this.payOrder(res.id) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.pay-send-time{
		background:rgba(255,255,255,1);
		border-radius:0 0 20upx 20upx;
		padding: 0 30upx;
		line-height:100upx;
		color:#FF7000;
		border-top: 2upx solid #F2F2F2;
	}
	.bottom-cut-time{
		padding:50upx 20upx;
	}
	.userName{
		text{
			font-size:26upx;
			color:rgba(102,102,102,1);
		}
		
	}
	.finish-icon{
		width: 28upx;
		height: 28upx;
		margin-right: 20upx;
	}
	.shop-address{
		font-size:24upx;
		color:rgba(153,153,153,1);
	}
	.uni-icon-arrowright{
		color: #999999;
		font-size: 36upx;
		margin-left: 20upx;
	}
	.input{
		text-align:right;
		font-size:22upx;
		color: #999999;
	}
	.shop-icon {
		width: 38upx;
		height: 37upx;
	}

	.cart-item-top {
		margin: 30upx auto 0;
		display: flex;
		position: relative;
		background: #FFFFFF;
		border-radius: 20upx 20upx 0px 0px;
		padding: 20upx;
		box-sizing: border-box;
	}

	.noAddress {
		height: 200upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.textarea {
		padding: 20upx;
		height: 160upx !important;
		box-sizing: border-box;
		font-size: 24upx;
	}

	.uni-list-cell-con {
		padding: 30upx 20upx;

		.uni-list-cell {
			padding: 30upx 0;
			.cell-tit {
				color: #666666;
				font-size: 24upx;
				position: relative;
			}

			.cell-tip {
				color: #333;
				font-size: 26upx;
			}

		}
	}
	.content-warpe {
		padding: 20upx 20upx 130upx 20upx;
	}

	.mobile {
		font-weight: bold;
		color: #333333;
		font-size: 30upx;
	}

	.address-section {
		box-sizing: border-box;
		position: relative;
		

		.order-content {
			display: flex;
			align-items: center;
			background-color: #FFFFFF;
			padding: 40upx 30upx;
			width: 100%;
			height: 200upx;
			box-sizing: border-box;
			border-radius: 20upx 20upx 0 0;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background-color: #FFFFFF;
		border-radius: 20upx;

		.name {
			font-size: 30upx;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			padding: 20upx;

			.product-img {
				flex-shrink: 0;
				display: block;
				width: 160upx;
				height: 160upx;
				border-radius: 6upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				word-break: break-all;
				display: -webkit-box;
				overflow: hidden;
				line-height: 1.5;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				font-weight: bold;
				color: #333333;
			}

			.spec {
				font-size: 24upx;
				color: #999999;
			}

			.price-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 32upx;
				margin-topl: 20upx;

				.price {
					font-size: 15px;
					font-weight: bold;
					color: #fe2c2c;
				}

				.number {
					font-size: 13px;
					color: #111111;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;

		.price-content {
			padding-left: 30upx;
			color:#000000;
		}

		.price-tip {
			margin-left: 8upx;
			color:#000000;
		}

		.price {
			font-size: 36upx;
			color:#000000;
		}
        .order-splice{
			background-color:#FFBF00;
		}
		.order-group{
			background-color:#FF5315;
		}
		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			
			color: #fff;
			height: 90upx;
			font-size: 28upx;
			width:60%;
		}
	}
</style>
