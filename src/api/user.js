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
// 发送验证码
export const verifycode = (params) =>
request({
	url: `/verifycode`,
	method: 'post',
	params
})
// 账号注册
export const userRegist = (params) =>
request({
	url: `/students/register`,
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