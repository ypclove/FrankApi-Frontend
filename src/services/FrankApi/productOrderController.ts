// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** closeProductOrder POST /api/order/close/${param0} */
export async function closeProductOrderUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.closeProductOrderUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { orderId: param0, ...queryParams } = params;
  return request<API.BaseResponseboolean>(`/api/order/close/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** createOrder POST /api/order/create */
export async function createOrderUsingPost(
  body: API.PayCreateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseProductOrderVo>('/api/order/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteProductOrder DELETE /api/order/delete/${param0} */
export async function deleteProductOrderUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteProductOrderUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { orderId: param0, ...queryParams } = params;
  return request<API.BaseResponseboolean>(`/api/order/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getProductOrderById GET /api/order/get/${param0} */
export async function getProductOrderByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductOrderByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { orderId: param0, ...queryParams } = params;
  return request<API.BaseResponseProductOrderVo>(`/api/order/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getProductOrderListByPage GET /api/order/list/page */
export async function getProductOrderListByPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductOrderListByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseOrderVo>('/api/order/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** parseOrderNotifyResult POST /api/order/notify/order */
export async function parseOrderNotifyResultUsingPost(
  body: string,
  options?: { [key: string]: any },
) {
  return request<string>('/api/order/notify/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** queryOrderStatus POST /api/order/query/status */
export async function queryOrderStatusUsingPost(
  body: API.ProductOrderQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/order/query/status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
