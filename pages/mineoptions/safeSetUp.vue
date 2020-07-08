<template>
	<view class="contain">
		<view class="box">
			<navigator url="/pages/mineoptions/bindphone" class="list-item d-border-bottom">
				<span>更换手机号码</span>
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
			},
			subChange(n) {
				let parmas = {
					cmd: 'edituserInfo',
					uid: getApp().globalData.uid,
					icon: this.dataobject.icon,
					nickName: this.dataobject.nickname,
					sex: this.dataobject.sex
				}
				console.log(parmas)
				this._reqw.ipost(parmas).then(res => {
					res.result == 0 ? (this.$api.tip("修改成功!"), n == 1 ? this.$api.back() : this.loadDate()) : this.$api.tip(res.resultNote)
				}).catch(err => {})

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

		.btn {
			width: 656upx;
			height: 88upx;
			background:#FFBF00;
			box-shadow: 0px 4upx 9upx 0px #FFBF00;
			border-radius: 10upx;
			margin: 61upx auto;
			line-height: 88upx;
			text-align: center;
			color: #FFFFFF;
			font-size: 36upx;
		}
	}
</style>
