<template>
	<view>
		<view class="header">
			<image src="/static/img/home/logo.png" />
		</view>
		<button class="bottom" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">
			<image src="/static/img/home/weixin.png" mode="" class="weixin-img"></image> 微信授权登录
		</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				uid: '',
				pid:''   //  邀请码
			};
		},
		computed: {},
		methods: {
			bindGetUserInfo(e) {
				console.log(e)
				let self = this;
				uni.login({
					success: function(res) {
						console.log(res)
						let parmas = {
							code: res.code,
							userInfo: e.detail.userInfo
						};
						console.log(parmas)
						self._reqw.ilogin(parmas, "login").then(res => {
							if (res.result == 0) {
								console.log(res)
								self.uid = res.uid;
								//   未绑定  前往绑定
								if(res.isnewuser==0){
									uni.redirectTo({
										url: `/pages/bindPhone?id=${res.uid}`
									})
								}else{
									//已绑定  返回
									getApp().globalData.uid = self.uid;
									uni.setStorageSync('uid',self.uid);
									self.$api.back();
								}
								
							} else {
								self.$api.tip(res.resultNote)
							}
						});
					},
					fail: function() {
						console.log("失败")
						// fail
					},
					complete: function() {
						// complete
					}
				});
			}
		}
	};
</script>
<style scoped lang="scss">
	.header {
		margin: 90px auto;
		text-align: center;
	}

	.hide {
		opacity: 0;
	}

	.header image {
		width: 345upx;
		height: 218upx;
	}
	.weixin-img {
		width: 53upx;
		height: 43upx;
		margin-right: 30upx;
	}
	.bottom {
		width: 600upx;
		height: 88upx;
		background: rgba(254, 80, 99, 1);
		box-shadow: 0px 4upx 9upx 0px rgba(254, 99, 80, 0.35);
		border-radius: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
