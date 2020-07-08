<template>
	<view class="" :class="{'fixed':type==1}">
		<view class="out_buy_splace">
			
		</view>
		<view class="title_con uni-flex d-items-center" v-if="!searchStar">
			<view class="title_con_item animated" hover-class="fadeIn" :class="{'title_first':index==0,'title_middle':index==2,'bounceIn':tabCurrentIndex==index}"  v-for="(item,index) in tabList" :key="index" @click="tabNavTap(item,index)" v-if="type==0">
				<text :class="{'currentItem':tabCurrentIndex==index}">{{item.name}}</text> 
			</view>
			<view class="title_con_item animated" hover-class="fadeIn" :class="{'title_first':index==0,'title_middle':index==2,'bounceIn':tabCurrentIndex==index}" v-for="(item,index) in tabList" :key="index" @click="tabNavTap(item,index)" v-if="type==1">
				<text class="" :class="{'currentItem':tabCurrentIndex==index}">{{item.name}}</text> 
			</view>
			<view class="uni-icon uni-icon-search" v-if="type==1" @click="searchStarClick">
				
			</view>
		</view>
		<view class="title_con animated fadeIn" v-if="showSearch">
			<uni-search-bar placeholder="输入商家名、品类或商圈"  @confirm='onConfirm' bgColor="#F2F2F2" @cancel="onCancel"></uni-search-bar>
		</view>
		
	</view>
	
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	export default{
		components:{
			uniSearchBar
		},
		props:{
			tabCurrentIndex:{
				type:[String,Number],
				default:0
			},
			type:{
				type:[String,Number],
				default:0
			}
		},
		computed:{
			showSearch(){
				if(this.type==1&&this.searchStar){
					return true
				}else{
					return false
				}
			}
		},
		data(){
			return{
				tabList:[{name:'综合'},{name:'销量'},{name:'好评'},{name:'附近'}],
				searchStar:false
			}
		},
		methods:{
			onConfirm(e){
				console.log(e)
			},
			tabNavTap(e,ind){
				this.$emit('click',{item:e,ind:ind})
			},
			searchStarClick(){
				this.searchStar=true;
			},
			onCancel(){
				this.searchStar=false;
			}
		}
	}
</script>

<style scoped lang="scss">
	.fixed{
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 999;
		border-bottom: 1upx solid #F2F2F2;
	}
	.out_buy_splace{
		height: 20upx;
		background-color: #F6F6F6;
	}
	.uni-icon-search{
		color:#999999;
		font-size:36upx;
	}
	.title_con{
		height: 120upx;
		padding: 0 20upx;
		background-color: #FFFFFF;
		box-sizing: border-box;
		.title_con_item{
			width: 21%;
			text-align: center;
			position: relative;
			text{
				color: #666666;
				font-size: 26upx;
			}
		}
		.currentItem{
			font-size: 32upx;
			font-weight:bold;
			color:#333333;
		}
		.title_middle{
			&::after{
				content:'';
				position:absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				width:2upx;
				height:15upx;
				background-color:rgba(231,231,231,1);
			}
			&::before{
				content:'';
				position:absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width:2upx;
				height:15upx;
				background-color:rgba(231,231,231,1);
			}
		}
		.title_first{
			width: 37% !important;
			text-align: left !important;
		}
		
	}
</style>
