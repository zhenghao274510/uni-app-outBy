<template>
	<view class="mask" v-show="pickerShow" @click.stop="hidden">
		<view class="yaoqing-content animated" :class="propsAnimated" @click.stop="hidden">
			<image src="/static/order/error.png" mode="" class="img"></image>
			<view class="cancel-title">
				取消订单
			</view>
			<view class="">
				<view class="uni-list-cell" v-for="(item,index) in navList" :key="index" @click.stop="chose(index)">
					<view class="uni-list-cell-left uni-flex-item">
						{{item.value}}
					</view>
					<view class="uni-flex">
						<view class="uni-icon uni-icon-circle-filled" style="color:#FEC51C;" v-if="item.checked">
						</view>
						<view class="uni-icon uni-icon-checkbox" style="color: #898989;" v-else>
						</view>
					</view>
				</view>
			</view>
			<view class="cancle-btn" @click.stop="subReson">
				提 交
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			propsAnimated:[String]
		},
		data() {
			return {               
				pickerShow: false,
				reson:'临时有事,不想要了',
				navList: [
					{
						checked: true,
						value: "临时有事,不想要了"
					},
					{
						checked: false,
						value: "忘记点主食"
					},
					
					{
						checked: false,
						value: "忘记使用优惠券"
					},
					{
						checked: false,
						value: "支付遇到问题"
					},
					{
						checked: false,
						value: "地址填写错误"
					},
					{
						checked: false,
						value: "其他"
					}
				]
			}
		},
		methods: {
			showPicker() {
				this.pickerShow = true;
			},
			hidePicker() {
				this.pickerShow = false;
			},
			hidden(){
				this.$emit('cancel');
			},
			chose(k){
				console.log(k)
				this.navList.forEach((item,index)=>{
					item.checked=false;
					if(index==k){
						item.checked=true;
						this.reson=item.value;
					}
				})
			},
			subReson(){
				this.$emit('click',this.reson)
			}
		}
	}
</script>

<style scoped lang="scss">
	.uni-flex {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.cancle-btn{
		width:561upx;
		height:80upx;
		margin:60upx auto;
		background:#FEC51C;
		border-radius:5upx;
		color: #FFFFFF;
		line-height: 80upx;
		font-size: 36upx;
		text-align: center;
	}
	.img{
		position: absolute;
		right: -10upx;
		top: -10upx;
		width:50upx;
		height:50upx;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99999;
		background: rgba(0, 0, 0, .6);
	}

	.yaoqing-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 80%;
		background: #FFFFFF;
		border-radius: 10upx;

	}
	.uni-list-cell{
		padding: 20upx;
		justify-content: space-between;
	}
	.cancel-title{
		padding: 20upx;
		text-align: center;
		color: #333333;
		font-weight: bold;
		border-bottom: 1px solid #C0C0C0;
	}
</style>
