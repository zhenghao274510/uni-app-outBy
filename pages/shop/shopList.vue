<template>
	<view class="page-body">
		<shop-list-title :tabCurrentIndex="tabCurrentIndex" type='1'  :tabList="tabList" @click='tabNavTap'></shop-list-title>
		<view class="search_list_splace">
			
		</view>
		<shop-list :dataList="dataList"></shop-list>
		<uni-load-more :status="status" v-if="showLoading"></uni-load-more>
		<empty v-if="showEmpty"></empty>
	</view>
</template>

<script>
	import shopList from "@/components/mycom/shopList.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import empty from '@/components/xw-empty/xw-empty.vue'
	import shopListTitle from "@/components/mycom/shop-list-title.vue"
	export default {
		components: {
			shopList,
			uniLoadMore,
			empty,
			shopListTitle
		},
		data() {
			return {
				status: 'loading',
				page: 1,
				totalPage:10,
				tabCurrentIndex:0,
				dataList:[],
				tabList:[{name:'综合'},{name:'销量'},{name:'好评'},{name:'附近'}],
				showLoading: true,
				showEmpty: false
			}
		},
		onLoad() {
			this.loadData();
		},
		onReachBottom() {
			this.totalPage > this.page ?
				(this.status = 'loading', (this.page += 1), this.loadData()) :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30);
		},
		methods: {
			loadData() {
				this.dataList=[{
					shopName:'健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子',
					disance:'17km',
				},
				{
					shopName:'健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子',
					disance:'17km',
				},
				{
					shopName:'健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子',
					disance:'17km',
				},
				{
					shopName:'健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子',
					disance:'17km',
				},
				{
					shopName:'健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子',
					disance:'17km',
				},
				{
					shopName:'健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子健康蔬菜 新鲜生菜叶子',
					disance:'17km',
				}];
				this.showItem();
				
				// let parmas = {

				// }
				// this._reqw.ipost(parmas, 'orderPage').then(res => {
				// 	res.result == 0 ? ((res.totalPage > 1 ? this.status = 'more' : this.status = "noMore"), this.totalPage = res.totalPage,
				// 		(res.dataList.length != 0 ? res.dataList
				// 			.forEach(item => {
				// 				this.dataList.push(item)
				// 			}) : (this.showLoading = false, this.showEmpty = true))) : this.$api.tip(res.resultNote)
				// }).catch(err => {})
			},
			showItem() {
				let index = 0;
				let show = () => {
					if (index < this.dataList.length) {
						this.$set(this.dataList[index],'active',true);
						index++;
					} else {}
				};
				let interval = setInterval(() => {
					show();
				},150);
			},
			initData(){
				this.page=this.totalPage=1;
			},
			tabNavTap(e){
				console.log(e);
				if(this.tabCurrentIndex==e.ind){
					return
				}else{
					this.tabCurrentIndex=e.ind;
				}
				
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.search_list_splace{
		height: 140upx;
	}
</style>
