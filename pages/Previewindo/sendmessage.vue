<template>
	<view class="eva-section">
		<!-- 私信内容 -->
		<view class="chart-con">
			<chart @click='sendmessage' :dataList="list" @onCanel="delitem" :type='type' ref='chart'></chart>
		</view>
	</view>
</template>

<script>
	import chart from "@/components/mycom/chat.vue"
	export default {
		components: {
			chart
		},
		data() {
			return {
				uid:'',
				anoid:'',    //对方id
				infoid:'',   //信息id
				page:1,
				list: []
			}
		},
		onLoad(options) {
			this.infoid = options.id;
			this.anoid=options.anoid;
			if(uni.getStorageSync('uid')){
				this.uid=uni.getStorageSync('uid');
			}
			this.$nextTick(()=>{
				this.loadData();
			})
			
		},
		methods: {
			loadData() {
				let parmas = {
					mid:getApp().globalData.uid,
					anoid: this.anoid,
					infoid:this.infoid,
					pageNo: this.page,
					pageSize: '-1'
				}
				console.log(parmas);
				this._reqw
					.ipost(parmas, 'chatDetailPage')
					.then(res => {
						console.log(res)
						res.result == 0 ?
							(this.list = res.dataList.reverse(),this.showItem()):
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			confirm(e) {
				console.log(e)
				let parmas = {
					mid:getApp().globalData.uid,
					cdid: e.cid,
				}
				this._reqw
					.ipost(parmas, 'deleteChatDetail')
					.then(res => {
						console.log(res)
						res.result == 0 ?
							(this.$api.tip('删除成功'), this.list.splice(e.ind, 1)) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			showItem() {
				let index = 0;
				let show = () => {
					if (index < this.list.length) {
						this.$set(this.list[index],'active',true);
						index++;
					} else {}
				};
				let interval = setInterval(() => {
					show();
				}, 100);
			},
			delitem(e) {
				this.$api.showTip(res => {
					res.confirm ? this.confirm(e) : ''
				})
			},
			sendmessage(e) {
				console.log(e)
				let parmas = {
					mid:getApp().globalData.uid,
					anoid: this.anoid,
					infoid:this.infoid,
					content: e
				}
				this._reqw
					.ipost(parmas, 'chat')
					.then(res => {
						console.log(res)
						res.result == 0 ?
							(this.loadData(),this.$refs.chart.initInput()) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			}
		}
	};
</script>

<style scoped lang="scss">
	.eva-item {
		margin-bottom: 20upx;
	}

	.title-nav {
		padding: 8upx 20upx;
		background: rgba(245, 245, 245, 1);
		border-radius: 6upx;
		margin-right: 20upx;
	}

	.pad {
		padding: 10upx 0;
	}

	.top {
		padding: 0 10upx;
		background: rgba(224, 152, 76, 1);
		border-radius: 6upx;
		font-size: 24upx;
		color: rgba(255, 255, 255, 1);
		margin-left: 20upx;
	}

	.eva-active {
		padding: 20upx;
		border-radius: 8upx;
		background-color: #f8f8f8;
	}

	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		margin-bottom: 16upx;
	}
</style>
