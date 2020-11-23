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