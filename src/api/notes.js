import request from "@/utils/request.js"
// 笔记相关接口
// 全部笔记
export const getAllNotes = params =>
	request({
		url: `/notes/portal`,
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
	
// 删除笔记
export const delNote = (id) =>
request({
	url: `/notes/${id}`,
	method: 'delete',
})	
// 采集笔记
export const notesGathers = (id) =>
request({
	url: `/notes/gathers/${id}`,
	method: 'post',
})	
// 取消采集笔记
export const unNotesGathers = (id) =>
request({
	url: `/notes/gathers/${id}`,
	method: 'delete',
})	
// 笔记点赞
export const likeed = (id) =>
request({
	url: `/note/${id}`,
	method: 'post',
})	
// 取消笔记点赞
export const unLikeed = (id) =>
request({
	url: `/note/${id}`,
	method: 'delete',
})	