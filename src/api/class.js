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