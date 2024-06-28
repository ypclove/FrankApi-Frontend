// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

/** addInterface POST /api/interfaceInfo/add */
export async function addInterfaceUsingPost(
  body: API.InterfaceInfoAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponselong>('/api/interfaceInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** deleteInterface DELETE /api/interfaceInfo/delete/${param0} */
export async function deleteInterfaceUsingDelete(
  interfaceId: number | undefined,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseboolean>(`/api/interfaceInfo/delete/${interfaceId}`, {
    method: 'DELETE',
    ...(options || {})
  });
}

/** getInterfaceById GET /api/interfaceInfo/get/${param0} */
export async function getInterfaceByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  const { interfaceId: param0, ...queryParams } = params;
  return request<API.BaseResponseInterfaceInfo>(`/api/interfaceInfo/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {})
  });
}

/** getInterfaceListBySearchTextPage GET /api/interfaceInfo/get/searchText */
export async function getInterfaceListBySearchTextPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceListBySearchTextPageUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageInterfaceInfo>('/api/interfaceInfo/get/searchText', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  });
}

/** invokeInterface POST /api/interfaceInfo/invoke */
export async function invokeInterfaceUsingPost(
  body: API.InvokeRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseobject>('/api/interfaceInfo/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** getInterfaceListByPage GET /api/interfaceInfo/list/page */
export async function getInterfaceListByPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceListByPageUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageInterfaceInfo>('/api/interfaceInfo/list/page', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  });
}

/** offlineInterface POST /api/interfaceInfo/offline/${param0} */
export async function offlineInterfaceUsingPost(
  interfaceId: number | undefined,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseboolean>(`/api/interfaceInfo/offline/${interfaceId}`, {
    method: 'POST',
    ...(options || {})
  });
}

/** onlineInterface POST /api/interfaceInfo/online/${param0} */
export async function onlineInterfaceUsingPost(
  interfaceId: number | undefined,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseboolean>(`/api/interfaceInfo/online/${interfaceId}`, {
    method: 'POST',
    ...(options || {})
  });
}

/** updateInterface POST /api/interfaceInfo/update */
export async function updateInterfaceUsingPost(
  body: API.InterfaceInfoUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseboolean>('/api/interfaceInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}
