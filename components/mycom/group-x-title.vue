<template>
	<view class="">
		<scroll-view class="ss-scroll-navbar" :class="[isFixed?'fixed':'']" scroll-x :scroll-left="scrollLeft" scroll-with-animation="true">
			<view
			v-for="(item, index) in navArr" 
			:key="index" 
			class="nav-item animated"
			@click="tabChange(item,index)"
			:id="'item-' + index"
			hover-class="fadeIn"
			:class="{'bounceIn':tabCurrentIndex===index}"
			>
				<text class="title" :class="{current: index === tabCurrentIndex}">{{item.name}}</text>
			</view>
		</scroll-view>
		<view class="group_splace" v-if="isFixed">
			
		</view>
	</view>
	
</template>

<script>
	export default {
		name: 'ss-scroll-navbar2',
		props: {
			navArr: {
				type: Array,
				default () {
					return []
				}
			},
			tabCurrentIndex:{
				type:[String,Number],
				default:0
			}
		},
		data () {
			return {
				scrollLeft: 0,
				widthList: [],
				screenWidth: 0,
				isFixed:false,
				
			}
		},
		methods: {
			/**
			 * 导航栏navbar
			 * 点击事件
			 */
			tabChange (item,index) {
				console.log(index)
				if(this.tabCurrentIndex!=index){
					this.$emit('navbarTap',{obj:item,ind:index});
				}
				
				var widthArr = this.widthList;
				var scrollWidth = 0;
				for (var i = 0; i < index + 1; i++) {
					scrollWidth += widthArr[i];
				}
				let currentWidth = widthArr[index];
				// scrollView 居中算法
				// 减去固定宽度位移
				// 减去选中的bar的宽度的一半
				scrollWidth -=  this.screenWidth / 2;
				scrollWidth -= currentWidth / 2;
				this.scrollLeft = scrollWidth;
			},
			calculateItemWidth () {
				var that = this;
				var arr = [];
				let w = 0;
				this.navArr.forEach((item, index) =>{
					let view = uni.createSelectorQuery().in(this).select("#item-" + index);
					view.fields({
						size: true
					}, data => {
						arr.push(data.width);
					}).exec();
				})
				this.widthList = arr;
			},
			calculateWindowWidth () {
				var info = uni.getSystemInfoSync();
				this.screenWidth = info.screenWidth;
			},
			_selectedTab(top,height){
				if(top>=height){
					this.isFixed=true;
				}else{
					this.isFixed=false;
				}
			}
		},
		created () {
			var that = this;
			this.calculateWindowWidth();
			setTimeout(function() {
				that.calculateItemWidth();
			}, 1000);
		}
	}
</script>

<style lang="scss">
	.fixed{
		position: fixed;
		z-index: 9999;
		top: 0;
	}
	.group_splace{
		height: 90upx;
	}
	.ss-scroll-navbar {
		width: 100%;
		// height: 90upx;
		background-color: #F6F6F6;
		white-space:nowrap;
		.nav-item {
			height: 90upx;
			text-align: center;
			padding: 0upx 20upx;
			color:#666666;
			display: inline-block;
			position: relative;
			font-size: 30upx;
			
			.title {
				line-height: 90upx;
			}
		}
		
		.current{
			color: #E0984C !important;
			&::after{
				content:'';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width:36upx;
				height:8upx;
				background:rgba(224,152,76,1);
				border-radius:4upx
			}
		}
	}
</style>
