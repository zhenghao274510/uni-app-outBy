<template>
	<view class="page-body">
		<page-header :currentCity="city" color="#F8F8F8" :is_lhp="is_lhp" @click.stop="getPosition"></page-header>
		<view :class="[is_lhp?'lhp-height':'other-height']">
		</view>
		<view class="uni-flex d-items-center search-pad">
			<uni-search-bar style="width:100%;" placeholder="输入商家名、品类或商圈" type="1" @confirm='onConfirm' bgColor="#FFF"></uni-search-bar>
		</view>
		<view class="other-height search-pad">
		</view>
		<view class="swiper-top">
			<banner-swiper :dataList="bannerList" ref="swiper" :show="0"></banner-swiper>
		</view>

		<notice :dataList="noticeList" type='0'></notice>
		<navs :dataList="navsList" type='0'></navs>
		<view class="send-title uni-flex d-items-center d-between" style="background-color: #FFFFFF;">
			<view class="top-title">
				优选店铺
			</view>
			<navigator class="top-more uni-flex d-items-center" url="/pages/shop/shopList">
				查看更多 <image src="/static/img/more.png" mode="" class="look-more animated pulse infinite"></image>
			</navigator>
		</view>
		<shop-list :dataList="dataList"></shop-list>
		<view class="send-title uni-flex d-items-center">
			<text>拼团推荐</text>
		</view>
		<home-list :dataList="hoteList"></home-list>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import bannerSwiper from "@/components/mycom/swiper.vue"
	import pageHeader from '@/components/mycom/pageHeader.vue'
	import navs from "@/components/home/navs.vue"
	import notice from '@/components/home/notic.vue'
	import homeList from "@/components/mycom/homeList.vue"
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import shopList from "@/components/mycom/shopList.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			bannerSwiper,
			navs,
			pageHeader,
			notice,
			homeList,
			uniSearchBar,
			shopList,
			uniLoadMore
		},
		data() {
			return {
				city: '定位中...', // 店铺名称
				totalPage: 1,
				page: 1,
				is_lhp: false,
				point: {
					longitude: '',
					latitude: ''
				},
				status: 'loading',
				uid: '',
				bannerList: [], //   轮播图
				noticeList: [], // 公告
				sid: '1', //  店铺id
				navsList: [],
				dataList: 3,
				hoteList: [{
						image: '/static/img/test/p1.jpg',
						name: '德克士 香辣汉堡德克士 香辣汉堡德克士 香辣汉堡',
						intro: '已拼500件',
						price: '9.9'
					},
					{
						image: '/static/img/test/p1.jpg',
						name: '德克士 香辣汉堡德克士 香辣汉堡德克士 香辣汉堡',
						intro: '已拼500件',
						price: '9.9'
					}
				]
			}
		},
		onLoad(options) {
			this.is_lhp = this.$is_bang;
			if (options.inverteUid) {
				getApp().globalData.inverteUid = options.inverteUid;
			}
			this.getPosition();

			Promise.all([this.loadData()]).catch(err => {
				console.log('err', err)
			})
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
						this.city = r.address_component.province + r.address_component.city;
						uni.setStorageSync('point', r.ad_info.location);
						uni.setStorageSync('city', this.city);
						uni.setStorageSync('district', r.address_component.district);
						uni.setStorageSync('adcode', r.ad_info.adcode);
					})
				})
			},
			//拼团推荐
			getHoteList() {
				let parmas = {
					mid: getApp().globalData.uid,
					sid: this.sid,
					pageNo: this.page,
					pageSize: '10',
					recommend: '1'
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
				let e = {
					mid: getApp().globalData.uid,
					sid: this.sid
				}
				this.getHomeNavData(e, res => {
					console.log(res)
					res.result == 0 ? (this.noticeList = res.announcementList, this.navsList = res.informationCategoryList, this.bannerList =
						res.carouselList) : this.$api.tip(res.resultNote);
				})
			},
			onConfirm(e) {
				this.$api.navTo(`/pages/Previewindo/infoList?title=${e.value}&type=0`);
			}
		},
		onShareAppMessage() {}
	}
</script>

<style scoped lang="scss">
	.lhp-height {
		height: calc(140upx + var(--status-bar-height));
	}

	.other-height {
		height: calc(100upx + var(--status-bar-height));
	}

	.message-img {
		width: 36upx;
		height: 39upx;
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
		margin-top: 20upx;

		// background-color: #FFFFFF;
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
