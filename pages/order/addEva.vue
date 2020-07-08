<template>
	<view class="content">
		<view class="cart-con">
			<view class="cart-item-con">
				<view class="cart-item">
					<view class="cart-item-left">
						<image src="/static/img/test/p1.jpg" mode="aspectFill" lazy-load class="product-img"></image>
					</view>
					<view class="item-right">
						<view class="item-right-top">
							<view class="clamp title uni-ellipsis">骑手：柠檬学长</view>
						</view>
						<view class="item-right-top">
							<view class="skuname">送达时间：2020-05-12:00</view>
						</view>
					</view>
				</view>
				<view class="server-val">
					<text class="server-class">评分:</text>
					<sx-rate :value="horseManStar" @change="changehorseManStar"></sx-rate>
				</view>
				<view class="eva-content">
					<textarea value="" placeholder="您的建议会督促我做的更好~" placeholder-class="placeholderClass" class="textarea" v-model="horseManCompline" />
					</view>
			</view>
		</view>
		
			<view class="cart-con">
				<view class="cart-item-con">
					<view class="cart-item">
							<view class="cart-item-left">
								<image src="/static/img/test/p1.jpg" mode="aspectFill" lazy-load class="product-img"></image>
							</view>
							<view class="item-right">
								<view class="item-right-top">
									<view class="clamp title uni-ellipsis">星巴克咖啡代购（曼哈顿广场商圈1店）</view>
								</view>
								<view class="item-right-top">
									<view class="skuname">送达时间：2020-05-12:00</view>
								</view>
							</view>
						</view>
						<view class="server-val">
							<text class="server-class">评分:</text>
							<sx-rate :value="shopStar" @change="changeshopStar"></sx-rate>
						</view>
						<view class="eva-content">
							<textarea value="" placeholder="您的建议会督促我做的更好~" class="textarea" placeholder-class="placeholderClass" v-model="shopCompline" />
							<view class="img-list">
								<view class="img-con" v-for="(v, k) in seeImages" :key="k" @click="seeDetails(index,k)">
									<image :src="v" class="img"></image>
								</view>
								<view class="img-con" @click="uploads(index)" v-if="seeImages.length<3">
									<image src="/static/order/add_img.png" class="up-img"></image>
								</view>
								
							</view>
						</view>
					</view>
				</view>
				
		<view class="footer-btn" hover-class="btn-hover" @click.stop="sub">提 交</view>
	</view>
</template>

<script>
	import sxRate from '@/components/sunui-star/sunui-star.vue';
	const bassUrl=require('@/common/js/config').bass;
	export default {
		data() {
			return {
				orderId: '',
				uid:'', 
				horseManStar:5, //  骑手评星
				shopStar:5,    //  店铺评星
				horseManCompline:'',   //  骑手评价
				shopCompline:'',     //  店铺评价
				images:[],   //  上传图片
				seeImages:[]  //  显示图片
			};
		},
		components: {
			sxRate
		},
		onLoad(options) {
			this.orderId = options.id;
			this.loadData();
		},
		methods: {
			changehorseManStar(e){
					this.horseManSatr=e.value;
			},
			changeShopStar(e){
				this.shopStar=e.value;
			},
			uploads(k){
					let that = this;
					uni.chooseImage({
						count: 3-that.images.length, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: function(res) {
							console.log(res);
							res.tempFiles.forEach(item=>{
								that.formImg(item,k)
							})
					}
				})
			},
			formImg(e,k){
					console.log(e);
					this.upImgToServe(e,res=>{
						let r = JSON.parse(res);
						r.result == 0 ? (this.images.push(r.urls),this.seeImages.push(bassUrl+r.urls)) : this.$api.tip(r.resultNote);
					})
				},
				sub(){
					console.log(this.dataObject)
					this.dataObject.orderGoodsList.forEach((item,index)=>{
						items.push({
							gid:item.goodsId,	
							score:item.star,	
							content:item.content,
							image:item.images
						})
					})
					let parmas = {
						mid:this.uid,
						oid: this.orderId,
						json:JSON.stringify(items)  
					};
					console.log(parmas);
					this.subUserAppraise(e,res=>{
						res.result==0?
							(this.$api.tip('提交成功!'),
								this.$api.back()) :
							this.$api.tip(res.resultNote);
					})
				},
				loadData() {
					let parmas = {
						mid:getApp().globalData.uid,
						oid: this.orderId
					}
					this.getOrderDetailsData(e,res=>{
						res.result == 0 ?this.dataObject=res: this.$api.tip(res.resultNote);
					})
				}
			}
			

	}
</script>

<style scoped lang="scss">
	.placeholderClass{
		line-height: 180upx;
		text-align: center;
		width: 100%;
	}
	.cart-con{
		background: #ffffff;
		
		margin:30upx 0 40upx 0;
		.cart-item-con{
			border-radius:40upx;
			.cart-item {
				display: flex;
				position: relative;
				background: #ffffff;
				padding:30upx;
			}
		}
	}
	
	.img-list{
		display: flex;
		padding-left:20upx;
		.img-con{
			width: 100upx;
			height: 100upx;
			padding-right:20upx;
			display: flex;
			justify-content: center;
			align-items: center;
			.up-img{
				width:61upx;
				height:61upx;
			}
			.img {
			  width: 100upx;
			height: 100upx;
					}
		}
	}
	.item-right-top {
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
	}
	
	.skuname {
		font-size: 24upx;
		color: #999999;
	}
	
	.bottom-width {
		width: 100%;
		justify-content: space-between;
		align-items: center;
		color: #FFFFFF;
	}
	
	.cart-item-left {
		position: relative;
		display: flex;
		align-items: center;
		border-radius:50%;
	}
	
	.product-img {
		width: 100upx;
		height: 100upx;
		border-radius:50%;
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
	
	.title{
		font-size:26upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.price {
		font-size:38upx;
		font-weight:500;
		color:rgba(255,0,0,1);
		
	}
	.content {
		padding: 20upx;
	}

	.eva-content {
		width: 100%;
		background-color:#FFFFFF;
	}
	.textarea {
		padding:20upx;
		width: 100%;
		height:200upx;
		box-sizing: border-box;
		font-size: 26upx;
		border-radius: 2upx;
	}

	.server-val {
		display: flex;
		align-items: center;
		padding:20upx;
	}

	.footer-btn {
		width: 90%;
		height: 88upx;
		background:rgba(255,191,0,1);
		box-shadow:0px 5upx 16upx 0px rgba(255,191,0,0.3);
		border-radius:10upx;
		margin-left: 5%;
		margin-top: 60upx;
		font-size: 34upx;
		color: #ffffff;
		font-weight: bold;
		text-align: center;
		line-height:88upx;
	}
</style>
