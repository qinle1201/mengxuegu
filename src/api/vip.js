import request from '../utils/request'

export function getVipList(formInline,current = 1,size =5) {
    return request({
        url: `/member/list/search/${current}/${size}`,
        method: "POST",
        data : {
            ...formInline,
            current,
            size,
        }  // 合并为一个新对象提交给后台数据
    })
}
// 查询
export function getById(id){
    return request({
        url:`/member/${id}`,
        method:'GET'
    })
}

// 编辑
export function update(data){
    return request({
        url:`/member/${id}`,
        method:'PUT',
        data
    })
}
// 新增
export function add(data){
    return request({
        url:`/member/list`,
        method:'POST',
        data
    })
}

// 删除
export function deleteById(id){
    return request({
        url:`/member/${id}`,
        method:'DELETE'
    })
}