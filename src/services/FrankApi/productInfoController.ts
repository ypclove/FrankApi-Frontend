// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addProduct POST /api/productInfo/add */
export async function addProductUsingPost(
  body: API.ProductInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/productInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteProduct DELETE /api/productInfo/delete/${param0} */
export async function deleteProductUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteProductUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { productId: param0, ...queryParams } = params;
  return request<API.BaseResponseboolean>(`/api/productInfo/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getProductById GET /api/productInfo/get/${param0} */
export async function getProductByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { productId: param0, ...queryParams } = params;
  return request<API.BaseResponseProductInfo>(`/api/productInfo/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getProductListByPage GET /api/productInfo/list/page */
export async function getProductListByPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductListByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageProductInfo>('/api/productInfo/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** offlineProductInfo POST /api/productInfo/offline/${param0} */
export async function offlineProductInfoUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.offlineProductInfoUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { productId: param0, ...queryParams } = params;
  return request<API.BaseResponseboolean>(`/api/productInfo/offline/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** onlineProductInfo POST /api/productInfo/online/${param0} */
export async function onlineProductInfoUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.onlineProductInfoUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { productId: param0, ...queryParams } = params;
  return request<API.BaseResponseboolean>(`/api/productInfo/online/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** updateProduct POST /api/productInfo/update */
export async function updateProductUsingPost(
  body: API.ProductInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/productInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
