<script>
	export default {
		globalData: {
			inverteUid: '',
			orderType: '',
			uid: '3594238f7cdf4f548477c980790eafcb',
			title:'外卖'
		},
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success(res) {
					console.log(res)
					uni.setStorageSync('screen', res)
				}
			})
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/css/uni.css";
	@import "./common/css/animate.wxss";

	view,
	text {
		font-size: 28upx;
		color: #333333;
	}

	page {
		min-height: 100%;
		background-color: #F6F6F6;
		overflow-x: hidden !important;
	}

	.animatedActive {
		opacity: 1 !important;
		transform: translateY(0) !important;
	}

	.star-img {
		width: 24upx;
		height: 24upx;
		margin-right: 10upx;
	}

	.look-more {
		width: 24upx;
		height: 24upx;
		margin-left: 10upx;
	}

	.shop-desc-img {
		width: 24upx;
		height: 26upx;
		margin-right: 10upx;
	}

	.top-title {
		font-size: 36upx;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.top-more {
		font-size: 26upx;
		font-weight: 500;
		color: #666666;
	}

	.d-items-center {
		align-items: center;
	}

	.d-between {
		justify-content: space-between;
	}

	.d-content-center {
		justify-content: center;
	}

	.d-column {
		flex-direction: column;
	}

	/* scroll-view   去滚动条 */
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.btn-hover {
		opacity: .7;
	}

	.d-border-bottom {
		border-bottom: 2upx solid #F2F2F2;
	}

	.top_action_img {
		width: 94%;
		height: 300upx;
		border-radius: 8upx;
		margin: 20upx auto;
	}

	.top_group_img {
		height: 357upx;
		width: 100%;
	}

	.uni-two-cut {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.price-slome {
		font-size: 24upx;
		color: #FF5200;
	}
</style>
