import request from "@/utils/request.js"
const USER_API_PREFIX = "/us"
const AUTH_API_PREFIX = "/as"

// 账号登录
export const userLogins = (params) => request({
	url: `${AUTH_API_PREFIX}/accounts/login`,
	method: 'post',
	data:params
})
// 获取用户信息
export const getUserInfo = (params) =>
	request({
		url: `${USER_API_PREFIX}/users/me`,
		method: 'get',
		params
	})	