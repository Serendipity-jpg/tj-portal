import request from "@/utils/request.js"

// 课程分类
export const getClassCategorys = (params) =>
	request({
		url: `/categorys/all`,
		method: 'get',
		params
	})
 