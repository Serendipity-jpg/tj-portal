import request from "@/utils/request.js"
// 订单相关接口
 // 查询订单明细
export const getOrderDetails = (params) =>
request({
	url: `/orders/placeOrder`,
	method: 'psot',
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
// 下单
export const setOrder = (params) =>
	request({
		url: `/orders/placeOrder`,
		method: 'post',
		data:params
	})
// 获取订单进度（用于学生端）
export const getOrderState = (params) =>
	request({
		url: `/orders/progress/{id}`,
		method: 'post',
		params
	})	
// 获取订单信息	
export const getOrderInfo = (params) =>
	request({
		url: `/orders/progress/{id}`,
		method: 'psot',
		params
	})	
// 订单支付取消
export const delOrder = (params) =>
	request({
		url: `/orders/cancel`,
		method: 'psot',
		params
	})	
// 根据订单id查询订单明细列表
export const getOrderList = (params) =>
	request({
		url: `/orders/detail/queryByOrderId/{orderId}`,
		method: 'psot',
		params
	})	