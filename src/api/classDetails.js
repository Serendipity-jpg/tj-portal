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
// 获取课程章节 下拉数据展示
export const getClassCourses = (id) =>
request({
	url: `/courses/catas/${id}`,
	method: 'get',
	params:id,
})	
// 获取课程小节 - 问答详情使用
export const getClassChapter = (id) =>
	request({
		url: `/courses/catas/index/list/${id}`,
		method: 'get',
		params:id,
	})	

	
// 问答相关
// 获取问答列表-全部
export const getAskList = (params) =>
	request({
		url: `/questions`,
		method: 'get',
		params,
	})	
// 获取问答列表
export const getMyAskList = (params) =>
	request({
		url: `/questions/me`,
		method: 'get',
		params,
	})	
// 新增提问
export const postQuestions = (params) =>
	request({
		url: `/questions`,
		method: 'post',
		params,
	})	
// 获取问题详情
export const getQuestionsDetails = (id) =>
request({
	url: `/questions/${id}`,
	method: 'get',
})	
// 编辑提问
export const putQuestions = (params) =>
	request({
		url: `/questions/${id}`,
		method: 'put',
		params,
	})			
// 删除提问
export const delQuestions = (id) =>
	request({
		url: `/course/delete/${id}`,
		method: 'delete',
	})		
// 回复
export const postAnswers = params =>
	request({
		url: `/answers`,
		method: 'post',
		params
	})			
// 根据问题的Id获取问题的
export const getAllQuestions = params =>
	request({
		url: `/questions/${params.id}/answers`,
		method: 'get',
		params
	})
// 根据答案id分页查询回复列表
export const getReply = params =>
request({
	url: `/answers/${params.id}/replies`,
	method: 'get',
	params
})