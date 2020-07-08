<template>
	<view class="hear-con" :class="[is_lhp?'lhp-height':'other-height']" :style="{'backgroundColor':color}">
		<view class="header-splace">

		</view>
		<view class="uni-flex d-items-center" @click="getPosition" :class="[is_lhp?'lhp':'top-con']" v-if="type==0||type==1">
			<image src="/static/img/home_location.png" mode="" class="home_location right-m"></image>
			<view class="city-name">
				{{currentCity}}
			</view>
			<image src="/static/img/xiajiantou.png" mode="" class="dingwei-img left-m" v-if="type==1"></image>
		</view>
		<view class="uni-flex d-items-center" :class="[is_lhp?'lhp':'top-con']" v-if="type==2">
			<view class="uni-flex uni-flex-item" style="position: relative;">
				<view class="uni-icon uni-icon-back" @click="toBack">

				</view>
				<view class="title-nav">
					{{currentCity}}
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			currentCity: {
				type: String,
				default: ''
			},
			is_lhp: {
				type: Boolean,
				default: false
			},
			color: '',
			type: {
				type: Number || String,
				default: 0
			}
		},
		methods: {
			getPosition() {
				this.$emit('click');
			},
			toBack() {
				this.$api.back();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home_location {
		width: 30upx;
		height: 36upx;
	}

	.city-name {
		font-size: 24upx;
		color: rgba(255, 255, 255, 1)
	}

	.uni-icon-back {
		font-size: 40upx;
		color: #333333;
		font-weight: bold;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.lhp {
		padding-top: 60upx;
	}

	.lhp-height {
		height: calc(140upx + var(--status-bar-height));
	}

	.other-height {
		height: calc(100upx + var(--status-bar-height));
	}

	.top-con {
		padding-top: 30upx;
	}

	.top-con-lhp {
		padding-top: 60upx;
	}

	.title-nav {
		color: #333333;
		font-size: 32upx;
		font-weight: bold;
		text-align: center;
		width: 100%;
	}

	.hear-con {
		position: fixed;
		top: 0;
		width: 100%;
		padding: 0 30upx;
		background: linear-gradient(147deg, rgba(255, 191, 0, 1), rgba(251, 216, 111, 1));
		z-index: 999;
		box-sizing: border-box;
	}

	.right-m {
		margin-right: 20upx;
	}

	.left-m {
		margin-left: 10upx;
	}

	.dingwei-img {
		width: 28upx;
		height: 34upx;
	}

	.header-splace {
		height: var(--status-bar-height);
	}
</style>
