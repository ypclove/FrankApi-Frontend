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

/** deleteInterface DELETE /api/interfaceInfo/delete/${interfaceId} */
export async function deleteInterfaceUsingDelete(
  interfaceId: number | undefined,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseboolean>(`/api/interfaceInfo/delete/${interfaceId}`, {
    method: 'DELETE',
    ...(options || {})
  });
}

/** getInterfaceById GET /api/interfaceInfo/get/${interfaceId} */
export async function getInterfaceByIdUsingGet(
  interfaceId: number | undefined,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseInterfaceInfo>(`/api/interfaceInfo/get/${interfaceId}`, {
    method: 'GET',
    ...(options || {})
  });
}

/** getInterfaceListBySearchTextPage GET /api/interfaceInfo/get/searchText */
export async function getInterfaceListBySearchTextPageUsingGet(
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

/** offlineInterface POST /api/interfaceInfo/offline/${interfaceId} */
export async function offlineInterfaceUsingPost(
  interfaceId: number | undefined,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseboolean>(`/api/interfaceInfo/offline/${interfaceId}`, {
    method: 'POST',
    ...(options || {})
  });
}

/** onlineInterface POST /api/interfaceInfo/online/${interfaceId} */
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
