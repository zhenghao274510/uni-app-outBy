<template>
	<view class="contain">
		<view class="box">
			<navigator url="/pages/mineoptions/safeSetUp" class="list-item d-border-bottom">
				<span>安全设置</span>
				<view class="modify_right">
					<view class="uni-icon uni-icon-arrowright">
					</view>
				</view>
			</navigator>
			<navigator url="/pages/mineoptions/webView" class="list-item d-border-bottom">
				<span>服务条文</span>
				<view class="modify_right">
					<view class="uni-icon uni-icon-arrowright">
					</view>
				</view>
			</navigator>
			<navigator url="/pages/mineoptions/webView" class="list-item d-border-bottom">
				<span>常见问题</span>
				<view class="modify_right">
					<view class="uni-icon uni-icon-arrowright">
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataobject: {
					phone: '', //手机号
					nickname: '点击登录', //昵称
					icon: '' //头
				},
			};
		},
		onLoad() {
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
	.uni-icon-arrowright{
		color: #999999;
		font-size: 28upx;
	}

	.contain {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		.box {
			width:94%;
			display: flex;
			flex-direction: column;
			margin:40upx auto;

			.list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #333;
				background: #FFFFFF;
				padding:40upx 20upx;
				.modify_right {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
	}
</style>
