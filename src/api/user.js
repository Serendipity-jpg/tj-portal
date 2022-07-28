import request from "@/utils/request.js"

// 手机号登录
export const phoneLogins = (params) =>
	request({
		url: `/logins/phone`,
		method: 'post',
		params
	})
// 账号登录
export const userLogins = (params) =>
	request({
		url: `/accounts/login`,
		method: 'post',
		data:params
	})
// 获取用户信息
export const getUserInfo = (params) =>
	request({
		url: `/users/me`,
		method: 'get',
		params
	})	