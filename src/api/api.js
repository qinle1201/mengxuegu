import request from '../utils/request'

// get 
export function gets(url,data){
    return request.get(url,{
        params:data
    })
}

// post
export function posts(url,data){
    return request.post(url,data)
}