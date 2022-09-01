import request from "@/utils/request.js"
/** 订单相关接口 **/ 

// 订单列表 - 分页列表
export const getOrderListes = (params) =>
request({
	url: `/orders/page`,
	method: 'get',
	params
})
// 查询订单明细
export const getOrderDetails = (params) =>
request({
	url: `/orders/placeOrder`,
	method: 'post',
	params
})
// 获取课程订单明细信息
export const getClassOrder = (params) =>
	request({
		url: `/orders/placeOrder`,
		method: 'post',
		params
	})
// 当前学生的订单分页数据
export const getOrderPages = (params) =>
request({
	url: `/orders/placeOrder`,
	method: 'post',
	params
})
// 下单确认页信息 
export const comfirePageInfo = (params) =>
	request({
		url: `orders/comfirePageInfo`,
		method: 'get',
		params
	})
// 下单
export const setOrder = (params) =>
	request({
		url: `/orders/placeOrder`,
		method: 'post',
		data:params
	})
// 获取订单进度 - 订单详情（用于学生端）
export const getOrderState = (params) =>
	request({
		url: `/orders/progress/${params.id}`,
		method: 'get'
	})	
// 获取订单信息	
export const getOrderInfo = (params) =>
	request({
		url: `/orders/progress/{id}`,
		method: 'post',
		params
	})	
// 订单支付取消
export const delOrder = (params) =>
	request({
		url: `/orders/cancel`,
		method: 'post',
		params
	})	
// 根据订单id查询订单明细列表
export const getOrderClassList = (params) =>
	request({
		url: `/orders/detail/queryByOrderId/${params.orderId}`,
		method: 'post',
		params
	})	

	
/** 购物车相关接口 **/ 	

// 将课程加入购物车
export const putCarts = (data) =>
	request({
		url: `/purchaseCart/add`,
		method: 'post',
		data
	})	

// 获取购物车中的课程
export const getCarts = (data) =>
	request({
		url: `/purchaseCart`,
		method: 'get',
		data
	})		

// 批量将课程从购物车中删除
export const delCarts = (data) =>
	request({
		url: `/purchaseCart/batch`,
		method: 'delete',
		data
	})		


/** 支付相关接口 **/ 	

// 支付渠道列表
export const getPayMethod = (params) =>
	request({
		url: `/pay/channels`,
		method: 'get',
		params
	})	
// 支付申请,返回支付二维码url
export const getPayUrl = (data) =>
	request({
		url: `/pay/apply`,
		method: 'post',
		data
	})
// 获取支付信息,包含支付状态和支付超时时间
export const getPayState = (params) =>
	request({
		url: `/pay/${params.orderId}`,
		method: 'get',
		params
	})			

/** 退款相关接口 **/ 	

// 退款申请
export const refundsApply = (data) =>
	request({
		url: `/refunds/apply`,
		method: 'post',
		data
	})		

// 退款详情
export const refundsDetails = (params) =>
	request({
		url: `/refunds/${params.applyId}`,
		method: 'get',
		params
	})		