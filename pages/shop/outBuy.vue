<template>
	<view class="page-body">
		<page-header :currentCity="city" color="#F8F8F8" :is_lhp="is_lhp" @click.stop="getPosition" type='2'></page-header>
		<view :class="[is_lhp?'lhp-height':'other-height']">
		</view>
		<view class="uni-flex d-items-center search-pad">
			<uni-search-bar style="width: 100%;" placeholder="输入商家名、品类或商圈" type="1" @confirm='onConfirm' @focus="onFocus" @blur="onBlur"
			 bgColor="#FFF"></uni-search-bar>
		</view>
		<view class="other-height search-pad">
		</view>
		<view class="swiper-top">
			<banner-swiper :dataList="bannerList" ref="swiper" :show="0"></banner-swiper>
		</view>
		<navs :dataList="navsList" type='0'></navs>
		<view class="send-title uni-flex d-items-center d-between">
			<view class="top-title">
				附近热卖
			</view>
			<view class="">

			</view>
		</view>
		<swiper-goods></swiper-goods>
		<shop-list-title :tabCurrentIndex="tabCurrentIndex" type='0' :tabList="tabList" @click='tabNavTap'></shop-list-title>
		<shop-list></shop-list>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	const bassUrl = require('@/common/js/config.js').bass;
	import bannerSwiper from "@/components/mycom/swiper.vue"
	import pageHeader from '@/components/mycom/pageHeader.vue'
	import navs from "@/components/home/navs.vue"
	import swiperGoods from "@/components/mycom/swiperGoods.vue"
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import shopList from "@/components/mycom/shopList.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import shopListTitle from '@/components/mycom/shop-list-title.vue'
	export default {
		components: {
			bannerSwiper,
			navs,
			pageHeader,
			swiperGoods,
			uniSearchBar,
			shopList,
			uniLoadMore,
			shopListTitle
		},
		data() {
			return {
				city: '外卖', // 店铺名称
				totalPage: 1,
				page: 1,
				is_lhp: false,
				point: {
					longitude: '',
					latitude: ''
				},
				tabCurrentIndex:0,
				status: 'loading',
				uid: '',
				bannerList: [], //   轮播图
				sid: '1', //  店铺id
				navsList: [],
				dataList: [],
				hoteList: []
			}
		},
		onLoad(options) {
			this.is_lhp = this.$is_bang;
			if (options.inverteUid) {
				getApp().globalData.inverteUid = options.inverteUid;
			}
			if (uni.getStorageSync('point')) {
				this.point = uni.getStorageSync('point')
			} else {
				this.getPosition();
			}
			this.loadData();
			this.getHoteList();
		},
		onShow() {
			if (uni.getStorageSync('uid')) {
				getApp().globalData.uid = uni.getStorageSync('uid');
			}
		},
		onPullDownRefresh() {
			// this.initData();
			// this.isGetShare();
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onReachBottom() {
			this.totalPage > this.page ?
				((this.page += 1), this.status = 'loading', this.loadData()) :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30);
		},
		methods: {
			// 获取用户位置信息
			// 获取用户位置信息
			getPosition() {
				this.city = "定位中...";
				this.$api.getLocation(res => {
					this.$api.localEncal(res, r => {
						console.log(r);
						this.point = r.ad_info.location;
						uni.setStorageSync('point', r.ad_info.location);
						uni.setStorageSync('district', r.address_component.district);
						uni.setStorageSync('adcode', r.ad_info.adcode);
					})
				})
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
			},
			//拼团推荐
			getHoteList() {
				this.sid = '1';
				let parmas = {
					mid: getApp().globalData.uid,
					sid: this.sid,
					pageNo: this.page,
					pageSize: '10',
					recommend: '2'
				}
				this._reqw.ipost(parmas, 'goodsPage').then(res => {
					console.log(res)
					res.result == 0 ? (this.hoteList = res.dataList, this.status = 'noMore') : this.$api.tip(res.resultNote)
				}).catch(err => {})
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
			},
			//首页数据(轮播，公告，分类)
			loadData() {
				let parmas = {
					mid: getApp().globalData.uid,
					sid: this.sid
				}
				this._reqw.ipost(parmas, 'home').then(res => {
					console.log(res)
					res.result == 0 ? (this.navsList = res.informationCategoryList, this.bannerList =
						res.carouselList) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		},
	}
</script>

<style scoped lang="scss">
	
	.lhp-height {
		height: calc(140upx + var(--status-bar-height));
	}

	.other-height {
		height: calc(100upx + var(--status-bar-height));
	}

	.search-pad {
		padding: 10upx;
		background: linear-gradient(147deg, rgba(255, 191, 0, 1), rgba(251, 216, 111, 1));
		box-sizing: border-box;
	}

	.swiper-top {
		margin-top: -150upx;
	}

	.logo-img {
		width: 92upx;
		height: 58upx;
		margin-right: 10upx;
	}

	.send-title {
		padding: 30upx;
		margin-top: 10upx;
		background-color: #FFFFFF;

		text {
			font-size: 34upx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			line-height: 20px;
		}
	}

	.fabu-img {
		width: 29upx;
		height: 30upx;
		margin-left: 10upx;
	}

	.page-body {
		width: 750upx;
		overflow: hidden;
		font-size: 30upx;
		background: #F6F6F6;
	}
</style>
