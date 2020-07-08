<template>
	<view class="contain">
		<view class="box">
			<view class="list-item uni-flex d-items-center d-border-bottom">
				<view class="modify_right">
					<image src="/static/img/test/2@2x.png" class="we_person_img"></image>
					<span>客服小单</span>
				</view>
			</view>                           
			<view  class="list-item d-border-bottom">
				<view class="modify_right">
					<span>电话：12036044578</span><span>微信：15036099874</span>
				</view>
				<view class="modify_right">
					<span>邮箱：562836755@163.com</span>
				</view>
				<view class="modify_right">
					<span>工作时间：早上 09:00-下午 20:00</span>
				</view>

				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				wechatCode: ''
			};
		},
		onLoad(options) {
			this.phone = options.phone;
			this.wechatCode = options.wechatCode;
		},
		methods: {
			loadDate() {
				let parmas = {
					cmd: 'userinfo',
					uid: getApp().globalData.uid
				};
				this._reqw
					.ipost(parmas, 'userInfo')
					.then(res => {
						console.log(res);
						if (res.result == 0) {
							this.dataobject = res.dataobject;
						} else {
							this.$api.tip(res.resultNote);
						}

					})
					.catch(err => {});
			}
		}


	}
</script>

<style scoped lang="scss">
	.we_person_img {
		width:70upx;
		height:70upx;
		border-radius:50%;
		margin-right: 20upx;
	}
	.contain {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.box {
			width: 94%;
			display: flex;
			flex-direction: column;
			margin: 40upx auto;

			.list-item {
				color: #333;
				background: #FFFFFF;
				padding: 40upx 20upx;

				.modify_right {
					display: flex;
					align-items: center;
					padding: 6upx 0;
					span{
						color: #666666;
						font-size: 24upx;
						margin-right:80upx;
					}
				}
			}
		}
	}
</style>
