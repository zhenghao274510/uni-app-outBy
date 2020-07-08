<template>
	<view class="">
		<send-list :list='dataList' type='0' @click='giveLike' :uid="uid"></send-list>
		<uni-load-more :status="status" v-if="showLoading"></uni-load-more>
		<empty v-if="showEmpty"></empty>
	</view>
</template>

<script>
	import sendList from "@/components/mycom/sendList.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import empty from "@/components/xw-empty/xw-empty.vue"
	export default{
		components:{
			sendList,
			uniLoadMore,
			empty
		},
		data(){
			return{
				status:'loading',
				uid:'',
				sid:'',
				icid:'',
				page:1,
				totalPage:1,
				point: {
					longitude: '',
					latitude: ''
				},
				title:'',
				showLoading:true,
				showEmpty:false,
				dataList:[],
				shopName:""
			}
		},
		onLoad(options) {
			this.icid=options.type;
			this.title=options.title;
			this.$api.setNav(options.title);
			if(uni.getStorageSync('point')){
				this.point=uni.getStorageSync('point');
			}
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid');
			}
			if(uni.getStorageSync('sid')){
				this.sid=uni.getStorageSync('sid');
				this.shopName=uni.getStorageSync('shopName');
			}
			this.loadData();
		},
		onReachBottom() {
			this.totalPage > this.page ?
				(this.status = 'loading', (this.page += 1), this.loadData()) :
				setTimeout(() => {
					this.status = 'noMore';
				}, 30);
		},
		methods:{
			//  点赞   修改数据
			giveLike(e){
				//状态1点赞  0取消
				console.log(e)
				let n=e.ind,type=e.type;
				type==1?(this.dataList[n].likeCount=this.dataList[n].likeCount-0+1,this.$api.tip('点赞成功!')):(this.dataList[n].likeCount=this.dataList[n].likeCount-1,this.$api.tip('取消点赞成功!'))
			},
			loadData(){
				
				let parmas = {
					mid: this.uid,
					sid: this.sid,
					pageNo: this.page,
					pageSize: '10',
					lng: this.point.longitude,
					lat: this.point.latitude
				}
				this.icid==0?parmas.title=this.title:parmas.icid=this.icid;
				console.log(parmas);
				this._reqw
					.ipost(parmas, 'informationPage')
					.then(res => {
						console.log(res)
						res.result == 0 ?
							((res.totalPage > 1 ? this.status = 'more' : this.status = 'noMore'), this.totalPage = res.totalPage,
								(res.dataList.length == 0 ?(this.showEmpty = true, this.showLoading = false) : res.dataList.forEach(item => {
									this.dataList.push(item)
								}))
							) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			}
		}
	}
</script>

<style>
</style>
