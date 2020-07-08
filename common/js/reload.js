/**
 * @Method Description
 * @Author: hao zheng@
 * @Description: 整个项目所有数据获取
 * @param {e===Object||file}  传给后台参数;  _rewx====request
 * @createTime: 2020-7-7 15:12:14
 */
const _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
	return typeof e;
} : function(e) {
	return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
const _rewx = require("./request.js");
export default {
	methods: {
		/**
		 * @Description 上传图片
		 * @param {object}
		 */
		upImgToServe(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.upfile)(e, "canelOrder").then(
				function(n) {
					return new Promise(function(e, t) {
						c(n);
					});
				});
		},
		/**
		 * @Description获取短信验证码
		 * @param {object}
		 */
		getPhoneSendCode(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "canelOrder").then(
				function(n) {
					return new Promise(function(e, t) {
						c(n);
					});
				});
		},
		/**
		 * @Description 用户授权登录
		 * @param {object}
		 */
		authorLogin(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "canelOrder").then(
				function(n) {
					return new Promise(function(e, t) {
						c(n);
					});
				});
		},
		/**
		 * @Description 首页菜单
		 * @param {object}
		 */
		getHomeNavData(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "home").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 首页banner
		 * @param {object}
		 */
		getHomeSwiperData(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "home").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 分类左侧菜单
		 * @param {object}
		 */
		getClassNavData(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "home").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 分类右侧商品
		 * @param {object}
		 */
		getClassRightData(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "home").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 商家列表
		 * @param {object}
		 */
		getShopData(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "home").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 商家评价
		 * @param {object}
		 */
		getShopAppraise(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "home").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 商家详情
		 * @param {object}
		 */
		getShopDetailsData(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "home").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 商家购物车
		 * @param {object}
		 */
		getShopCartsData(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "home").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 我的订单
		 * @param {object}
		 */
		getOrderData(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "orderPage").then(
				function(n) {
					return new Promise(function(e, t) {
						c(n);
					});
				});
		},
		/**
		 * @Description 我的订单详情
		 * @param {object}
		 */
		getOrderDetailsData(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "orderDetail").then(
				function(n) {
					return new Promise(function(e, t) {
						c(n);
					});
				});
		},
		/**
		 * @Description 订单骑手信息
		 * @param {object}
		 */
		getsSealMan(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "orderDetail").then(
				function(n) {
					return new Promise(function(e, t) {
						c(n);
					});
				});
		},
		/**
		 * @Description 确认收货
		 * @param {object}
		 */
		getOrderGoods(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "confirmOrder").then(
				function(n) {
					return new Promise(function(e, t) {
						c(n);
					});
				});
		},
		/**
		 * @Description 取消订单
		 * @param {object}
		 */
		cancelGoodsOrder() {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "canelOrder").then(
				function(n) {
					return new Promise(function(e, t) {
						c(n);
					});
				});
		},
		/**
		 * @Description 订单售后
		 * @param {object}
		 */
		subAftermarket(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "canelOrder").then(
				function(n) {
					return new Promise(function(e, t) {
						c(n);
					});
				});
		},
		/**
		 * @Description 提交评价
		 * @param {object}
		 */
		subUserAppraise(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "goodsComment").then(
				function(n) {
					return new Promise(function(e, t) {
						c(n);
					});
				});
		},
		/**
		 * @Description 用户信息
		 * @param {object}
		 */
		getUserInfo(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "Info").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 用户优惠券
		 * @param {object}
		 */
		getUserCompline(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "home").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 用户收藏
		 * @param {object}
		 */
		getUserStore(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "home").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 用户消息
		 * @param {object}
		 */
		getUserMessage(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "home").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 用户消息详情
		 * @param {object}
		 */
		getUserMessageDetails(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "home").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 用户收货地址
		 * @param {object}
		 */
		getUserShippingAddress(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "addressList").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 新增或编辑或修改用户收货地址
		 * @param {object}
		 */
		subUserShippingAddress(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "saveAddress").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 新增或编辑或修改用户收货地址
		 * @param {object}
		 */
		subUserDefaultShippingAddress(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "defaultAddress").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 新增或编辑或修改用户收货地址
		 * @param {object}
		 */
		subUserDeleteAddress(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "deleteAddress").then(function(
				n) {
				return new Promise(function(e, t) {
					c(n);
				});
			});
		},
		/**
		 * @Description 绑定手机号
		 * @param {object}
		 */
		bindUserPhone(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "canelOrder").then(
				function(n) {
					return new Promise(function(e, t) {
						c(n);
					});
				});
		},
		/**
		 * @Description 用户意见提交
		 * @param {object}
		 */
		subUserOpinion(e, c) {
			return "object" !== (void 0 === e ? "undefined" : _typeof(e)) && (e = {}), (0, _rewx.post)(e, "canelOrder").then(
				function(n) {
					return new Promise(function(e, t) {
						c(n);
					});
				});
		},
	}
}
