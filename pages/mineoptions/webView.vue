<template>
	<view class="content">
		<view class="info">
			<web-view :src="url"></web-view>
		</view>
		
	</view>
</template>

<script>
	import bassUrl from "@/common/js/config.js"
	export default {
		data() {
			return {
				url: '',
				type:''
			}
		},
		onLoad(options) {
			if(options.type){
				this.type = options.type;
				this.url=`${bassUrl.bass}/api/service/${this.type}`;
			}
			if(options.url){
				this.url=options.url;
			}
			if(options.title){
				let title = options.title;
				uni.setNavigationBarTitle({
					title: title
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding:20upx;
		.info{
			background: #FFFFFF;
		}
		
	}
</style>
