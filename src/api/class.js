import request from "@/utils/request.js"

// 课程分类
export const getClassCategorys = (params) =>
	request({
		url: `/categorys/all`,
		method: 'get',
		params
	})
 
// 获取公开课接口
export const getFreeClassList = (params) =>
	request({
		url: `courses/TOP5/free`,
		method: 'get',
		params
	})

// 获取课程列表 - 分类id 查询对应的列表 （倒序 十条）
export const getClassList = (id) =>
	request({
		url: `courses/cate/${id}`,
		method: 'get'
	})

// 课程搜索
export const classSeach = (params) =>
	request({
		url: `courses/portal`,
		method: 'get',
		params
	})

// 兴趣接口

// 新增兴趣爱好
export const setInterests = (params) =>
	request({
		url: `/interests`,
		method: 'post',
		params
	})	
// 查询我的兴趣爱好
export const getInterests = (params) =>
	request({
		url: `/interests`,
		method: 'get',
		params
	})		


// 优惠券 相关接口

// 可领优惠券（超值优惠券）
export const getCollectableCoupon = (params) =>
request({
	url: `/coupon/config/collectable`,
	method: 'get',
	params
})		
// 我的优惠券（近一年）
export const getMyCoupon = (params) =>
request({
	url: `/coupon/me`,
	method: 'get',
	params
})	
// 优惠券领取
export const getCoupon = (params) =>
request({
	url: `/coupon/receive`,
	method: 'post',
	params
})	
// 兑换码兑换优惠券
export const exchangeCoupon = (params) =>
request({
	url: `/code/exchange`,
	method: 'post',
	params
})	