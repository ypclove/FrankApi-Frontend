// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

/** addProduct POST /api/productInfo/add */
export async function addProductUsingPost(
  body: API.ProductInfoAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponselong>('/api/productInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** deleteProduct DELETE /api/productInfo/delete/${productId} */
export async function deleteProductUsingDelete(
  productId: number | undefined,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseboolean>(`/api/productInfo/delete/${productId}`, {
    method: 'DELETE',
    ...(options || {})
  });
}

/** getProductById GET /api/productInfo/get/${param0} */
export async function getProductByIdUsingGet(
  params: API.getProductByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  const { productId: param0, ...queryParams } = params;
  return request<API.BaseResponseProductInfo>(`/api/productInfo/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {})
  });
}

/** getProductListByPage GET /api/productInfo/list/page */
export async function getProductListByPageUsingGet(
  params: API.getProductListByPageUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageProductInfo>('/api/productInfo/list/page', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  });
}

/** offlineProductInfo POST /api/productInfo/offline/${productId} */
export async function offlineProductInfoUsingPost(
  productId: number | undefined,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseboolean>(`/api/productInfo/offline/${productId}`, {
    method: 'POST',
    ...(options || {})
  });
}

/** onlineProductInfo POST /api/productInfo/online/${productId} */
export async function onlineProductInfoUsingPost(
  productId: number | undefined,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseboolean>(`/api/productInfo/online/${productId}`, {
    method: 'POST',
    ...(options || {})
  });
}

/** updateProduct POST /api/productInfo/update */
export async function updateProductUsingPost(
  body: API.ProductInfoUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseboolean>('/api/productInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}
