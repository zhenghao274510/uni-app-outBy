<template>
	<view class="page-body">
		<scroll-view class="cu-chat" id="chatlist" scroll-y="true" :scroll-top="scollTop">
			<view class="cu-item" v-for="(v,k) in dataList" :key="k" :class="[v.from==0?'self':'other']" @longtap="delItem(v.id,k)">
				<view class="main">
					<view class="user-name" :class="[v.from==0?'textLeft':'textRight']">
						{{v.nickname}}
					</view>
					<view class="content" :class="[v.from==0?'content-one':'content-two']">
						<text>{{v.content}}</text>
					</view>
				</view>
				<image class="cu-avatar" :class="[v.from==0?'left':'right']" :src="v.avatar"></image>
				<view class="date">{{v.chatDate}}</view>
			</view>
		</scroll-view>
		<view class="cu-bar">
			<image src="/static/img/bianji.png" class="bianji-img"></image>
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10" @focus="InputFocus"
			 @blur="InputBlur" v-model="my_say_text"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<view class="cu-btn" hover-class="btn-hover" @click="to_send">
				<image src="/static/img/sendmassage.png" class="send-img"></image>
				私信他
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataList: {
				type: Array,
				default(){
					return []
				}
			}
		},
		data() {
			return {
				my_say_text:'',
				scollTop:'999px'
			};
		},
		watch:{
			dataList:{
				handler(n){
					// if(n.length>=6){
						this.bindScroll()
					// }
				}
			}
		},
		methods: {
			//处理滚动
			bindScroll(duration = 0) {
				const query = uni.createSelectorQuery().in(this);
				query
					.select('.cu-chat')
					.boundingClientRect(data => {
						console.log(data)
						this.scollTop=data.bottom - 40;
						console.log(this.scollTop)
					})
					.exec();
			},
			delItem(id, k) {
				let obj = {
					cid: id,
					ind: k
				}
				this.$emit('onCanel', obj)
			},
			initInput() {
				this.my_say_text = '';
			},
			to_send() {
				if (this.my_say_text == '') {
					this.$api.tip('请输入内容!')
				} else {
					this.$emit('click', this.my_say_text);
				}
			},
			//编辑框事件
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
		height: 100%;
	}
	.user-name{
		font-size: 24upx;
	}

	.send-img {
		width: 39upx;
		height: 39upx;
		margin-right: 10upx;
	}
	.textLeft{
		text-align: left;
	}
	.textRight{
		text-align: right;
	}

	.bianji-img {
		width: 21upx;
		height: 21upx;
		margin-left: 30upx;
	}

	.cu-bar {
		position: fixed;
		bottom: 30upx;
		left: 30upx;
		right: 30upx;
		height: 80upx;
		background: rgba(246, 246, 246, 1);
		border-radius: 4upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cu-btn {
		position: relative;
		align-items: center;
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		width: 204upx;
		height: 78upx;
		background: rgba(224, 152, 76, 1);
		border-radius: 0px 4px 4px 0px;
		color: #FFFFFF;
	}

	.cu-btn::after {
		display: none;
	}

	.cu-chat {
		display: flex;
		flex-direction: column;
		position: fixed;
		bottom: 110upx;
		top: 0;
	}

	.cu-chat .cu-item {
		display: flex;
		position: relative;
	}

	.cu-chat .cu-item>.cu-avatar {
		width: 80upx;
		height: 80upx;
	}

	.cu-chat .cu-item>.main {
		max-width: calc(100% - 240upx);
		margin: 0 60upx;
		display: flex;
		flex-direction:column;
	}

	.cu-chat .cu-item>image {
		height: 320upx;
	}

	.cu-chat .cu-item>.main .content {
		padding: 0 20upx;
		border-radius: 5px;
		border: 1px solid #000000;
		display: inline-flex;
		max-width: 100%;
		align-items: center;
		font-size: 30upx;
		position: relative;
		min-height: 60upx;
		line-height: 40upx;
		text-align: left;
	}

	.content-one::before {
		content: '';
		position: absolute;
		top: 0;
		left: -16upx;
		width: 8upx;
		height: 8upx;
		border-width:0 8upx 8upx 0;
		border-style: solid;
		border-top-color: transparent;
		/*自动继承父元素的border-bottom-color*/
		border-right-color: transparent;
		border-radius: 0 0 0 20px;
	}

	.content-two::after {
		content: '';
		position: absolute;
		top: 0;
		right:-8px;
		width: 8upx;
		height: 8upx;
		border-width: 0 0 8upx 8upx;
		border-style: solid;
		border-bottom-color: inherit;
		/*自动继承父元素的border-bottom-color*/
		border-left-color: transparent;
		border-radius: 0 0 20px 0;
	}

	.self {
		padding: 30upx 0 30upx 70upx;
		justify-content: flex-start;
	}



	.date {
		position: absolute;
		font-size: 24upx;
		color: #999999;
		bottom: -20upx;
		left: 50%;
		transform: translateX(-50%);
	}

	.cu-chat .cu-item .action {
		padding: 0 30upx;
		display: flex;
		align-items: center;
	}

	.right {
		position: absolute;
		right: 20upx;
		top: 40%;
		transform: translateY(-50%);
	}

	.left {
		position: absolute;
		left: 20upx;
		top: 40%;
		transform: translateY(-50%);
	}

	.other {
		justify-content: flex-end;
		padding: 30upx 70upx 30upx 0;
	}
</style>
