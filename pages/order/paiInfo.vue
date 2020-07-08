<template>
	<view class="">
		<view class="item-con uni-flex d-column d-content-center item-top-con">
			<view class="">
				<image src="/static/img/test/p1.jpg" class="user-icon"></image>
			</view>
			<view class="uni-flex d-items-center">
				<image src="/static/order/vipdiamond-f.png" class="vipdiamond"></image>
				<view class="hand-name">
					柠檬学长
				</view>
			</view>
		</view>
		<view class="item-con info-con">
			<view class="hand-name hand-title">
				骑手信息
			</view>
			<view class="uni-flex d-items-center">
				<view class="info-item-con">
					<text class="info-item">柠檬学长</text>
				</view>
				<view class="info-item-con">
					<text class="info-item">男</text>
				</view>
				<view class="info-item-con">
					<text class="info-item">15036044578</text>
				</view>
			</view>
			<view class="uni-flex d-items-center">
				<view class="info-item-con">
					<text class="info-item">柠檬学长</text>
				</view>
				<view class="info-item-con">
					<text class="info-item">男</text>
				</view>
				<view class="info-item-con">
					<text class="info-item">15036044578</text>
				</view>
			</view>
			<view class="uni-flex d-items-center">
				<view class="info-item-con">
					<text class="info-item">柠檬学长</text>
				</view>
				<view class="info-item-con">
					<text class="info-item">男</text>
				</view>
				<view class="info-item-con">
					<text class="info-item">15036044578</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.info-con{
		padding: 30upx;
	}
	.hand-name{
		font-size:32upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.item-top-con{
		padding: 0 80upx;
	}
	.info-item-con{
		padding-right:30upx;
		padding-bottom:30upx;
	}
	.item-con{
		width:92%;
		height:384upx;
		margin: 30upx auto 0;
		background:#FFFFFF;
		border-radius:20upx;
		box-sizing: border-box;
		.user-icon{
			width:172upx;
			height:172upx;
			border-radius:10upx;
		}
		.vipdiamond{
			width:35upx;
			height:32upx;
			margin-right: 30upx;
		}
		.hand-title{
			padding:30upx 0;
		}
		.info-item{
			padding:14upx 24upx ;
			background:rgba(246,246,246,1);
			border-radius:10upx;
			font-size:24upx;
			color:rgba(102,102,102,1);
		}
	}
</style>
