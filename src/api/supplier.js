import request from '../utils/request'

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