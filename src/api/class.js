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

// 获取学习计划 getLearningPlan	
export const getLearningPlan = (id) =>
	request({
		url: `courses/cate/${id}`,
		method: 'get'
	})

// 查询当前用户学习的指定课程信息，返回null则代表没有购买	
export const getCourseLearning = (courseId) =>
request({
	url: `/lessons/course/${courseId}`,
	method: 'get'
})	
// 课程搜索
export const classSeach = (params) =>
	request({
		url: `courses/portal`,
		method: 'get',
		params
	})


// 学习相关接口

export const getLearningClassDetails = (params) =>
	request({
		url: `/lessons/course`,
		method: 'get',
		params
	})



// 兴趣接口

// 新增兴趣爱好
export const setInterests = (params) =>
	request({
		url: `/interests`,
		method: 'post',
		data:params,
		params
	})	
// 查询我的兴趣爱好
export const getInterests = (params) =>
	request({
		url: `/interests`,
		method: 'get',
		params
	})		

// 获取播放视频的授权签名
export const getMediasSignature = (params) =>
	request({
		url: `/medias/signature/play`,
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

// 课程表管理接口

// 查询我的课程表
export const getMylessons = () =>
request({
	url: `/lessons/page`,
	method: 'get',
})	
// 查询我正在学习的课程
export const getMyLearning = () =>
request({
	url: `/lessons/now`,
	method: 'get',
})	
// 将指定课程从课程表移除
export const delMyLessons = () =>
request({
	url: `/lessons/now`,
	method: 'delete',
})



// 查询我的学习计划
export const getMyPlan = () =>
request({
	url: `/lessons/plans`,
	method: 'get',
})

// 新增、修改学习计划
export const changeMyPlan = (data) =>
request({
	url: `/lessons/plans`,
	method: 'post',
	data
})

// 报名免费课程
export const signUp = (courseId) =>
request({
	url: `/lessons/course/${courseId}`,
	method: 'psot',
})

// 将指定课程从课程表移除
export const delMyClass = (courseId) =>
request({
	url: `/lessons/course/${courseId}`,
	method: 'delete',
})

// 创建学习计划
export const creatPlans = (courseId) =>
request({
	url: `/lessons/plans`,
	method: 'psot',
})

// 考试相关
// 分页查询我的考试记录
export const getExamList = (params) =>
request({
	url: `/exam-records/me`,
	method: 'get',
	params
})
// 查询我的考试记录详情
export const getExamDetails = (id) =>
request({
	url: `/exam-records/${id}/details`,
	method: 'get',
})
// 提交考试答案，考试或测试提交时需要保存答案信息
export const submitExamRecords = (params) =>
request({
	url: `/exam-records/details`,
	method: 'post',
	data:params
})
// 新增考试记录，考试或测试开始时需要保存基本信息，返回记录id
export const addExamRecords = (params) =>
request({
	url: `/exam-records`,
	method: 'post',
	data:params
})

// 课程表的信息

// 查询我的某个课程表的学习记录
export const getLearningLog = (lessonId) =>
request({
	url: `/learning-records/lessons/${lessonId}`,
	method: 'get'
})

// 新增学习记录，在学习某小节时提交
export const addPlayLog = (params) =>
request({
	url: `/learning-records`,
	method: 'post',
	data:params
})
