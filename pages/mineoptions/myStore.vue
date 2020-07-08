<template>
	<view class="">
		<view class="mysend-line-two"></view>
		<shop-list :dataList='dataList'></shop-list>
		<uni-load-more :status="status" v-if="showLoading"></uni-load-more>
		<empty v-if="showEmpty"></empty>
	</view>
</template>

<script>
	import shopList from "@/components/mycom/shopList.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import empty from "@/components/xw-empty/xw-empty.vue"
	export default {
		components: {
			shopList,
			uniLoadMore,
			empty
		},
		data() {
			return {
				status: 'loading',
				showLoading:true,
				showEmpty:false,
				page:1,
				totalPage:1,
				dataList:6
			}

		},
		onLoad() {
			// this.loadData();
		},
		onHide() {
			this.dataList=[];
		},
		//  加载
		onReachBottom() {
			this.totalPage > this.page ?
				((this.page += 1), this.status = 'loading', this.loadData()) :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30);
		},
		methods:{
			loadData() {
				let parmas = {
					mid:getApp().globalData.uid,
					pageNo: this.page,
					pageSize: '10'
				};
				console.log(parmas);
				this._reqw
					.ipost(parmas, 'myCollectPage')
					.then(res => {
						console.log(res)
						res.result == 0 ?
							((res.totalPage > 1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage,
								(res.dataList.length == 0 ? (this.showEmpty = true,this.showLoading=false): res.dataList.forEach(item => {
									this.dataList.push(item)
								}))
							) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
		}
	}
</script>

<style>
	.mysend-line {
		height: 20upx;
		background: #F6F6F6;
	}

	.mysend-line-two {
		height: 1upx;
		background: #F6F6F6;
	}
</style>
