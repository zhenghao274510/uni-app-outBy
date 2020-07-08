<template>
	<view class="page-body">
		<!--主体-->
		<view class="meMain">
			<view class="mePosition">
				<view class="meMainBox">
					<!--头部-->
					<view class="meHead" @click.stop="toAuthor">
						<view class="meHeadAvatar">
							<image src="/static/img/test/p1.jpg" mode="aspectFill" v-if="dataobject.avatar == ''"></image>
							<image :src="dataobject.avatar" mode="aspectFill" v-else></image>
						</view>
						<view class="meHeadName">
							<view class="useInfo">{{ dataobject.nickname }}</view>
							<view class="uni-flex d-items-center" v-if="dataobject.mobile!=''">
								<image src="/static/img/shouji.png" mode="" class="shouji-phone"></image>
								<view class="phone">{{ dataobject.mobile|fromPhone }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="meOverBgOne">
			<mine-order-list @click="onClick" :dataObj="dataobject"></mine-order-list>
		</view>
		<view class="meOverBgOne">
			<mine-servce-list @click="gotoOther"></mine-servce-list>
		</view>
	</view>
</template>

<script>
	import mineOrderList from '@/components/mycom/mine-order-list.vue';
	import mineServceList from '@/components/mycom/mine-servce-list.vue';
	export default {
		components: {
			mineOrderList,
			mineServceList
		},
		data() {
			return {
				uid: '',
				dataobject: {
					nickname: "点击登录", //昵称
					avatar: "", //头像
					mobile: "", //手机号
					userPoints: "", //积分
					poster: "", //海报背景图
					phone: "", //平台电话
					wechatCode: "", //平台微信二维码
					vipType: "", //vip类型，1.普通用户，2.vip，3.高级vip
					vipDate: "" //vip到期时间
				}
			};
		},
		onShow() {
			if (uni.getStorageSync('uid')) {
				getApp().globalData.uid = uni.getStorageSync('uid');
			}
			if (getApp().globalData.uid != '') {
				this.loadData();
			}
		},

		methods: {
			toAuthor() {
				if (getApp().globalData.uid== '') {
					this.$api.navTo('/pages/author/index')
				}else{
					this.$api.navTo('/pages/mineoptions/personMessage')
				}
			},
			loadData() {
				let e = {
					mid:getApp().globalData.uid
				};
				this.getUserInfo(e,res=>{
					0==res.result?this.dataobject = res:this.$api.tip(res.resultNote)
				})
			},
			onClick(e) {
				console.log(''==getApp().globalData.uid);
				''==getApp().globalData.uid?this.$api.navTo('/pages/author/index'):this.$api.reLaunch(`/pages/index/order?id=${e}`);
			},
			activeTo(e){
				switch (e) {
					case 0:
						this.$api.navTo(`/pages/mineoptions/compline`);
						break;
					case 1:
						this.$api.navTo(`/pages/mineoptions/myStore`);
						break;
					case 2:
						this.$api.navTo('/pages/mineoptions/address?source=0');
						break;
					case 3:
						this.$api.navTo(`/pages/mineoptions/myGroupOrder`);
						break;
					case 4:
						this.$api.navTo(
							`/pages/mineoptions/linkwe?phone=${this.dataobject.phone}&wechatCode=${this.dataobject.wechatCode}`);
						break;
					case 5:
						this.$api.navTo('/pages/mineoptions/helpCenter');
						break;
					case 6:
						this.$api.navTo('/pages/mineoptions/setUp');
						break;
					case 7:
						this.$api.navTo('/pages/mineoptions/yijian');
						break;
					case 8:
						this.$api.navTo('/pages/mineoptions/mymesage');
						break;
				}
			},
			gotoOther(e) {
				console.log(e);
				''==getApp().globalData.uid?this.$api.navTo('/pages/author/index'):this.activeTo(e)
			}
		}
	};
</script>

<style scoped lang="scss">
	.vip-name {
		font-size: 22upx;
		color: rgba(51, 51, 51, 1);
	}

	.vip-img {
		width: 28upx;
		height: 25upx;
		margin-right: 20upx;
	}

	.shouji-phone {
		width: 21upx;
		height: 25upx;
		margin-right: 20upx;
	}

	.phone {
		color: #999999;
		font-size: 24upx;
	}

	.page-body {
		display: flex;
		flex-direction: column;
	}

	.useInfo {
		text-align: left;
	}

	.meMain {
		width: 100%;
		padding: 30upx 0;
		position: relative;
	}

	.meMain>image {
		width: 100%;
		height: 280upx;
		display: block;
	}

	.meMainBox {
		width: 92%;
		margin: 0 auto;
	}

	.mePosition {
		width: 100%;
	}

	.meHead {
		overflow: hidden;
		position: relative;
		padding: 20px 0 0 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.meHeadAvatar {
		margin-top: 10upx;
	}

	.meHeadAvatar image {
		width: 110upx;
		height: 110upx;
		display: block;
		border-radius: 50%;
	}

	.meHeadName {
		color: #ffffff;
		font-size: 28upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: flex;
		flex-direction: column;
		margin-left: 10px;
		flex: 1;
	}

	.meOverBgOne {
		width: calc(100% - 40upx);
		margin: 0 auto 20upx;
		background-color: #ffffff;
		border-radius: 6upx;
	}
</style>
