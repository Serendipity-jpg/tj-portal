import request from "@/utils/request.js"
// 笔记相关接口
// 全部笔记
export const getAllNotes = params =>
	request({
		url: `/notes`,
		method: 'get',
		params,
	})
// 我的笔记
export const getMyNotes = params =>
	request({
		url: `/notes/me`,
		method: 'get',
		params,
	})
// 采集笔记
export const collectionNotes = id =>
	request({
		url: `/notes/${id}`,
		method: 'post'
	})    
// 更新笔记
export const updateNotes = id =>
	request({
		url: `/notes/${id}`,
		method: 'put'
	})      