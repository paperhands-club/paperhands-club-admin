import request from '@/utils/request'

// TODO: 簡化，移除這層，直接頁面呼叫request()或get()
export function getOrders() {
  return request({
    url: '/order/get_orders_listing',
    method: 'get'
  })
}

export function addOrder(data) {
  return request({
    url: '/order/add',
    method: 'post',
    data
  })
}

export function editOrder(data) {
  return request({
    url: '/order/edit',
    method: 'put',
    data
  })
}

export function deleteOrder(data) {
  return request({
    url: '/order/delete',
    method: 'del',
    data
  })
}