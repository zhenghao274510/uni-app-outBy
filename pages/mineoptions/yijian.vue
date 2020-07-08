<template>
	<view class="content">
		<view class="mian-con">
			<textarea v-model="content" placeholder="请留下您宝贵的意见" class="textarea" />
			</view>
		
		<view class="footer-btn" hover-class="btn-hover" @click="subElement">
			提 交
		</view>
		<cart-pop :propsAnimated='firstAnimated' type='2' ref="cartPop" @onCancel='confirmeCancel'></cart-pop>
	</view>
</template>

<script>
	import cartPop from '@/components/mycom/cartPop.vue'
	export default{
		components:{
			cartPop
		},
		data(){
			return {
				content:'',
				firstAnimated:'zoomIn'
			}
		},
		methods:{
			confirmeCancel(){
				this.firstAnimated='zoomOut';
				   setTimeout(()=>{
					this.$refs.cartPop.hidden();
					this.firstAnimated='zoomIn';
					this.$api.back()
				  },300)
				},
			subElement(){
				if(this.content==''){
					this.$api.tip('反馈内容不能为空!')
				}else if(this.content.length>200){
					this.$api.tip('内容最多200字!')
				}else{
					let parmas={
						mid:getApp().globalData.uid,
						content:this.content
					}
					this._reqw.ipost(parmas,'feedback').then(res=>{
						res.result==0?this.$refs.cartPop.open():this.$api.tip(res.resultNote)
					}).catch(err=>{})
				}
				
			}
		}
	}
</script>

<style scoped>
	page{
		background-color: #FAFAFA;
		height: 100%;
	}
	.info{
		color: #999999;
		font-size: 24upx;
	}
	.img{
		width: 67upx;
		height: 67upx;
	}
	.content{
		padding: 10px;
	}
	.mian-con{
		background-color: #FFFFFF;
		height:368upx;
	}
	.footer-btn{
		width: 90%;
		height:88upx;
		margin: 100upx auto;
		background:#E0984C;
		box-shadow:0px 5rpx 15rpx 0px rgba(224,152,76,0.2);
		border-radius:10rpx;
		font-weight:bold;
		color: #FFFFFF;
		text-align: center;
		line-height: 88upx;
	}
	.textarea{
		padding: 20upx;
		width: 100%;
		height: 300upx;
		box-sizing: border-box;
		border-radius: 4px;
		font-size: 22upx;
		border-radius:2px;
		color: #A4A4A5;
	}
</style>
