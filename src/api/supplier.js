import request from '../utils/request'

// 获取供应商列表
export function getSupplier(page,pageSize) {
    return request({
        url: `/supplier/list/search/${page}/${pageSize}`,
        method: "POST",
        data : {
            page,
            pageSize,
        }
    })
}

// 删除供应商
export function delSupplier(id) {
        return request({
            url: `supplier/${id}`,
            method: "DELETE",
            data : {
                id,
    
            }
        })
    }

