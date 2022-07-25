import request from "@/utils/request.js"
// 课程详情页面接口
// 课程分类
export const getClassDetails = (id) =>
	request({
		url: `/courses/baseInfo/${id}`,
		method: 'get',
		params:id,
	})
// 查询课程老师
export const getClassTeachers = (id) =>
	request({
		url: `/courses/teachers/${id}`,
		method: 'get',
		params:id,
	})
// 查询课程目录
export const getClassList = (id) =>
	request({
		url: `/courses/catas/${id}`,
		method: 'get',
		params:id,
	})	
// 获取课程小节	
export const getClassChapter = (id) =>
	request({
		url: `/course/catas/index/list/${id}`,
		method: 'get',
		params:id,
	})	

	
// 问答相关

export const getAskList = (params) =>
	request({
		url: `/questions`,
		method: 'get',
		params,
	})	