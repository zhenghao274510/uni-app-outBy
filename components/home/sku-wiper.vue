<template>
	<view class="mask" @click.stop="close" v-show="specClass">
		<view class="mask">

		</view>
		<view class="yaoqing-content animated zoomIn" :class="propsAnimated" @click.stop>
			<view class="details_con">
				<view class="sku-title">
					美式咖啡
				</view>
				<view class="sku-info-con" v-for="(item,index) in skuNameList" :key="index">
					<view class="sku-name">
						{{item.skuName}}
					</view>
					<view class="sku-con uni-flex d-items-center d-between">
						<view class="sku-item uni-ellipsis" :class="[subIndex[index] == k?'selected':'noSelected']" v-for="(v,k) in item.dataList"
						 :key="k" @click="testGet(item, index, k)">
							{{v.value}}
						</view>
					</view>
				</view>
			</view>

			<view class="has_con" v-if="currentList.length==0">
				选择商品规格
			</view>
			<view class="has_con" v-else>
				已选:<text v-for="(v,k) in current" :key="k" class="has_item">{{v.value}}</text>
			</view>
			<view class="uni-flex d-items-center d-between has_end_con">
				<view class="has_price_con">
					￥<text class="price">{{currentObj.price}}</text>
				</view>
				<view class="has_btn" hover-class="btn-hover" @click.stop="addCart">
					+ 加入购物车
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			type: [Number, String],
			dataObj: {},
			propsAnimated: [String]

		},
		data() {
			return {
				active: 0,
				activeTopClass: 0,
				subIndex: [],
				current: [],
				skuNameList: [],
				specClass: false,
				currentObj: {}
			}
		},
		watch: {
			dataObj: {
				handler(n) {
					console.log(n)
					this.FormData(n.skuList, n.skuNameList);
				},
				deep: true
			}
		},
		methods: {
			open() {
				this.specClass = true;
			},
			hidden() {
				this.specClass = false;
			},
			testGet(item, n, i) {
				console.log(this.dataObj.skuNameList[n].skuName, n, i);
				if (this.dataObj.skuNameList[n].skuName == item.skuName) {
					this.current[n] = this.skuNameList[n].dataList[i];
					this.$set(this.subIndex, n, i);
				} else {
					this.$set(this.subIndex, n, -1); //去掉选中颜色
				}
				this.chochItem(this.current);
			},
			chochItem(arry) {
				this.dataObj.skuList.forEach((item, index) => {
					if (JSON.stringify(item.specification) == JSON.stringify(arry)) {
						this.active = index;
						this.currentObj = this.dataObj.skuList[index];
						console.log(this.currentObj)
					}
				});
			},
			FormData(skuList, skuNameList) {
				console.log(skuList, skuNameList);
				for (let i = 0; i < skuNameList.length; i++) {
					skuNameList[i].dataList = [];
					this.subIndex.push(0);
					for (let j = 0; j < skuList.length; j++) {
						if (JSON.stringify(skuNameList[i].dataList).indexOf(JSON.stringify(skuList[j].specification[i])) == -1) {
							skuNameList[i].dataList.push(skuList[j].specification[i]);
						}
					}
					this.current.push(skuNameList[i].dataList[0])
				}
				this.skuNameList = skuNameList;
				this.currentObj = skuList[0];
			},
			close() {
				this.$emit('onCancel');
			},
			confirm() {
				if (this.type == 1) {
					this.$emit('onConfirm', this.activeTopClass);
				} else {
					this.$emit('onConfirm', 1);
				}
				this.pickerShow = false
			},
			testPsw() {
				this.close();
				this.$emit('onConfirm')
			},
			addCart() {
				this.$emit('addCart', this.currentObj)
			}

		}
	}
</script>

<style scoped lang="scss">
	.none {
		display: none;
	}

	.show {
		display: block;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, .2);
	}

	.yaoqing-content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #FFFFFF;
		width: 92%;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 40upx 0;
		box-sizing: border-box;
		z-index: 99999;

		.details_con {
			padding: 0 40upx;

			.sku-title {
				font-size: 34upx;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
			}

			.sku-con {
				flex-wrap: wrap;
				padding: 20upx 0;

				.sku-name {
					font-size: 24upx;
					color: rgba(153, 153, 153, 1);
				}

				.sku-item {
					width: 165upx;
					padding: 0 20upx;
					box-sizing: border-box;
					margin-bottom: 20upx;
					text-align: center;

					border-radius: 6upx;
					font-size: 24upx;

				}

				.noSelected {
					border: 1px solid rgba(237, 237, 237, 1);
				}

				.selected {
					border: 1upx solid rgba(255, 212, 115, 1);
					background: rgba(255, 251, 241, 1);
					color: rgba(51, 51, 51, 1);
				}

				.sku_pad {
					margin-right: 20upx;
				}
			}
		}



		.has_con {
			background: rgba(251, 250, 250, 1);
			height: 80upx;
			padding: 0 40upx;

			.has_item {
				color: #FEC51C;
				margin-right: 20upx;
			}
		}

		.has_end_con {
			padding: 40upx 20upx;

			.has_price_con {
				font-size: 32upx;
				color: rgba(252, 69, 58, 1);

				.price {
					font-size: 42upx;
					color: rgba(252, 69, 58, 1);
				}
			}

			.has_btn {
				width: 212upx;
				height: 54upx;
				background: linear-gradient(147deg, rgba(255, 191, 0, 1), rgba(251, 216, 111, 1));
				border-radius: 27upx;
				text-align: center;
				font-size: 26upx;
				font-weight: bold;
				color: rgba(47, 49, 50, 1);
			}

		}



	}
</style>
