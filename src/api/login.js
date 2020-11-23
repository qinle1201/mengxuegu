import request from "../utils/request"

// 登录
export function tologin(username,password) {
    return request({
         url: "/user/login",
         data: {
             username,
             password
         },
         method: "POST"
     })
 }

 // 退出登录
export function outLogin() {
    return request({
         url: "/user/logout",
         method: "POST"
     })
 }