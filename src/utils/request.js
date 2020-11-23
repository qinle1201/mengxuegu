// 导入axios
import axios from 'axios'

// 请求公共接口地址
const request = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API,
    // 请求时间
    timeout: 3000
})

// 配置请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config
}, function (error) {
    // 在请求错误做些什么
    return Promise.reject(error)
})


// 配置响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
}, function (error) {
    // 对相应数据失败做点什么
    return Promise.reject(error)
})

// 导出axios相关配置
export default request