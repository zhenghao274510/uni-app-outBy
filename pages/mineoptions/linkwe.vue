<template>
	<view class="contain">
		<view class="box">
			<navigator :url="`/pages/mineoptions/callwe?phone=${phone}&wechatCode=${wechatCode}`" class="list-item d-border-bottom animated fadeInRight">
				<view class="modify_right">
					<image src="/static/img/phonered.png" class="we_left_img" lazy-load="true"></image>
					<span>联系方式</span>
				</view>
				<view class="uni-icon uni-icon-arrowright">
				</view>
			</navigator>
			<navigator url="/pages/mineoptions/webView" class="list-item d-border-bottom animated fadeInLeft">
				<view class="modify_right">
					<image src="/static/img/abourtwe.png" class="we_left_img" lazy-load="true"></image>
					<span>关于我们</span>
				</view>

				<view class="uni-icon uni-icon-arrowright">
				</view>

			</navigator>
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
	.we_left_img {
		width: 32upx;
		height: 32upx;
		margin-right: 20upx;
	}

	.uni-icon-arrowright {
		color: #999999;
		font-size: 28upx;
	}

	.contain {
		display: flex;
		flex-direction: column;

		.box {
			width: 94%;
			display: flex;
			flex-direction: column;
			margin: 40upx auto;

			.list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #333;
				background: #FFFFFF;
				padding: 40upx 20upx;

				.modify_right {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
	}
</style>
