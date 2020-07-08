<template>
	<view class="search_list_top">
		<shop-list-title :tabCurrentIndex="tabCurrentIndex" type='1' :tabList="tabList" @click='tabNavTap'></shop-list-title>
		<view class="search_list_splace">
			
		</view>
		<shop-list :dataList="dataList"></shop-list>
		<uni-load-more :status="status" v-if="showLoading"></uni-load-more>
		<empty v-if="showEmpty"></empty>
	</view>
</template>
<script>
	import shopListTitle from "@/components/mycom/shop-list-title.vue"
	import shopList from '@/components/mycom/shopList.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import empty from "@/components/xw-empty/xw-empty.vue"
	export default {
		components: {
			shopList,
			shopListTitle,
			uniLoadMore,
			empty
		},
		data() {
			return {
				keywords: '',
				tabCurrentIndex: 0,
				dataList:6,
				page:1,
				totalPage:1,
				status:'loading',
				showLoading:true,
				showEmpty:false
			}
		},
		onLoad(options) {
			this.keywords = options.id
		},
		methods: {
			initData() {
				this.page = this.totalPage = 1;
			},
			tabNavTap(e) {
				console.log(e);
				if (this.tabCurrentIndex == e.ind) {
					return
				} else {
					this.tabCurrentIndex = e.ind;
				}
			},
			//  附近店铺  ok
			getNearshop() {
				let parmas = {
					mid: getApp().globalData.uid,
					lng: this.point.longitude,
					lat: this.point.latitude
				}
				this._reqw.ipost(parmas, 'shopPage').then(res => {
					console.log(res)
					res.result == 0 ? (res.dataList.length != 0 ? (this.sid = res.dataList[0].id, this.shopName = res.dataList[0].shopName,
						uni.setStorageSync('shopName', this.shopName), uni.setStorageSync('sid', this.sid), this.getHoteList(), this.loadData()
					) : '') : this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		}
	}
</script>
<style scoped lang="scss">
	.search_list_splace{
		height: 140upx;
	}
</style>
