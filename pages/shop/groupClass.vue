<template>
	<view class="">
		<image src="/static/img/test/p1.jpg" class="top_group_img" id='imageId'></image>
		<group-x-title :navArr="tabList" :tabCurrentIndex="tabCurrentIndex" @navbarTap="navbarTap" ref="barTabNav"></group-x-title>
		<home-list :dataList="hoteList"></home-list>
		<uni-load-more :status="status" v-if="showLoading"></uni-load-more>
		<empty v-if="showEmpty"></empty>
	</view>
</template>

<script>
	import groupXTitle from "@/components/mycom/group-x-title.vue";
	import homeList from "@/components/mycom/homeList.vue";
	import empty from "@/components/xw-empty/xw-empty.vue"
	export default {
		components: {
			groupXTitle,
			homeList,
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				status:'loading',
				showLoading:true,
				showEmpty:false,
				tabList: [{
						name: "产品介绍1",
						navTarget: "#item1",
						iconClass: "icon01",
						iconImage: "",
						selectedIconClass: "",
						selectedIconImage: ""
					}, {
						name: "产品介绍2",
						navTarget: "#item2",
						iconClass: "icon02",
						iconImage: "",
						selectedIconClass: "",
						selectedIconImage: ""
					}, {
						name: "产品介绍3",
						navTarget: "#item3",
						iconClass: "icon03",
						iconImage: "",
						selectedIconClass: "",
						selectedIconImage: ""
					},
					{
						name: "产品介绍1",
						navTarget: "#item1",
						iconClass: "icon01",
						iconImage: "",
						selectedIconClass: "",
						selectedIconImage: ""
					}, {
						name: "产品介绍2",
						navTarget: "#item2",
						iconClass: "icon02",
						iconImage: "",
						selectedIconClass: "",
						selectedIconImage: ""
					}, {
						name: "产品介绍3",
						navTarget: "#item3",
						iconClass: "icon03",
						iconImage: "",
						selectedIconClass: "",
						selectedIconImage: ""
					}
				],
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
					},
					{
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
					},
					{
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
					},
					{
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
					},
					{
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
		onLoad() {
			// this.$nextTick(()=>{
				this.queryImg();
			// })
			
		},
		methods:{
			navbarTap(e){
				this.tabCurrentIndex=e.ind;
				this.initData();
			},
			queryImg(){
				const query = uni.createSelectorQuery().in(this);
				query.select('#imageId').boundingClientRect(data => {
				  this.imageHeight=data.height;
				}).exec();
			},
			initData(){
				this.page=this.totalPage=1;
				this.hoteList=[];
			}
		},
		onPageScroll(e) {
			this.$refs.barTabNav._selectedTab(e.scrollTop,this.imageHeight);
		},
	}
</script>

<style>
</style>
