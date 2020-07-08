<template>
	<view class="content">
		<view class="list-con">
			<view class="list-item uni-flex uni-space d-items-center d-border-bottom">
				<image src="/static/img/phone.png" mode="" class="reg-img"></image>
				<input type="number" class="reg-input" placeholder="请输入手机号" placeholder-style="color:#999999" v-model="phone" />
			</view>
			<view class="list-item uni-flex uni-space d-items-center">
				<image src="/static/img/yzm.png" mode="" class="reg-img"></image>
				<input type="number" value="" class="reg-input" placeholder="短信验证码" placeholder-style="color:#999999" v-model="YZM" />
				<text class="y-z-m" @click="getYZM">
					{{ rTime }}
					<text v-if="btnState">s后重发</text>
				</text>
			</view>
		</view>
		<view class="reg-btn" hover-class="btnHover" @click="subOrder">确 定</view>
		<!-- <view class="checked-con">
			<label>
				<checkbox :value="checked" :checked="checked" color="#FE5063" style="transform:scale(0.7)" @click.stop="checkedChange" /><text>我已阅读并同意</text><text
				 @click.stop="toXieyi" class="file-xie">《福物昊商城小程序用户协议》</text>
			</label>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				rTime: '获取验证码',
				interval: null,
				btnState: false,
				YZM: '',
				code: '',
				uid: '',
				checked: true
			};
		},
		onLoad(options) {
			this.uid = options.id;
			if(getApp().globalData.pid!=''){
				this.interCode=getApp().globalData.pid
			}
		},
		methods: {
			checkedChange(e) {
				this.checked = !this.checked;
			},
			toXieyi() {
				this.$api.navTo(`/pages/mineoptions/xieyi?type=1&title=用户协议`)
			},
			getYZM() {
				if (this.phone == '') {
					this.$api.tip('手机号不能为空!');
				} else if (!this.$api.regPhone(this.phone)) {
					this.$api.tip('请输入正确的手机号!');
				} else {
					if (this.rTime == '获取验证码') {
						this.rTime = 60;
						this.btnState = true;
						this.interval = setInterval(() => {
							if (--this.rTime <= 0) {
								this.rTime = '获取验证码';
								clearInterval(this.interval);
								this.btnState = false;
							}
						}, 1000);
						let parmas = {
							cmd:'getValidateCode',
							phone: this.phone
						};
						this._reqw
							.ipost(parmas)
							.then(res => {
								res.result == 0 ? (this.code=res.code,this.$api.tip(res.resultNote)) : this.$api.tip(res.resultNote);
							})
							.catch(err => {});
					}
				}
			},
			subOrder() {
				// console.log(this.checked)
				uni.showLoading({
					title: '提交中...'
				});
				let Y = this.YZM.trim();
				if (this.phone == '') {
					this.$api.tip('手机号不能为空!');
				} else if (!this.$api.regPhone(this.phone)) {
					this.$api.tip('请输入正确的手机号!');
				} else if (Y !=this.code) {
					this.$api.tip('验证码输入错误');
				}else if (this.code == '') {
				 	this.$api.tip('请输入验证码');
				 }else {
					let parmas = {
						cmd:'bindphone',
						phone: this.phone,
						uid: this.uid,
						invitationcode:this.interCode
					};
					console.log(parmas);
					this._reqw
						.ipost(parmas)
						.then(res => {
							res.result == 0 ?
								(uni.hideLoading(),
									(getApp().globalData.uid = this.uid),
									uni.setStorageSync('uid', this.uid),
									this.$api.back()
								) :
								this.$api.tip(res.resultNote);
						})
						.catch(err => {});
				}
			}
		},
		onHide() {
			if (this.interval) {
				clearInterval(this.interval);
			}
		}
	};
</script>
<style>
	page{
		background-color: #FFFFFF;
	}
</style>

<style lang="scss" scoped>

	.file-xie {
		color: #FE5063;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}


	.list-con {
		padding:30upx;
		width: 100%;
		box-sizing: border-box;
	}
	.list-item{
		padding: 30upx 0;
		position: relative;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.reg-img {
		width: 35upx;
		height: 43upx;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.reg-input {
		padding-left: 50upx;
		height: 80upx;
		flex: 1;
	}

	.y-z-m {
		font-weight: 500;
		color:#FF4967;
		position: relative;
	}

	.y-z-m::before {
		content: '';
		width: 2upx;
		height: 22upx;
		background-color: #e7e7e7;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: -30upx;
	}

	.reg-btn {
		width: 85%;
		height: 88upx;
		background:#FFBF00;
		box-shadow: 0px 5upx 8upx 0px #FFBF00;
		border-radius: 10upx;
		margin: 160upx auto 0;
		text-align: center;
		line-height: 88upx;
		color: #ffffff;
		font-size: 34upx;
		font-weight: bold;
	}
</style>
