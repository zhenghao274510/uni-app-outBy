<template>
	<view class="carousel">
		<swiper circular="true" duration="400" autoplay="true" interval="3000" @change="changSwiper">
			<swiper-item class="swiper-item" v-for="(v, k) in dataList" :key="k">
				<view class="image-wrapper">
					<image :src="v" class="loaded" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="swiper-num">
			{{swiperActive}}/{{imageLength}}
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			dataList:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return{
				swiperActive:1
			}
		},
		computed:{
			imageLength(){
				if(this.dataList.length!=0){
					return this.dataList.length
				}else{
					return 1
				}
			}
		},
		methods:{
			changSwiper(e){
				this.swiperActive=e.detail.current+1;
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.carousel {
		height: 722upx;
		position: relative;
	
		swiper {
			height: 100%;
		}
	
		.image-wrapper {
			width: 100%;
			height: 100%;
		}
	
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
	
			image {
				width: 100%;
				height: 100%;
			}
		}
		.swiper-num {
			position: absolute;
			right: 30upx;
			bottom: 30upx;
			background: #999999;
			border-radius: 23upx;
			color: #FFFFFF;
			padding: 0 14upx;
		}
		
	}
</style>
