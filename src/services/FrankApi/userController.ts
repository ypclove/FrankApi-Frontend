// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addUser POST /api/user/add */
export async function addUserUsingPost(body: API.UserRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponselong>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** banUser POST /api/user/ban/ */
export async function banUserUsingPost(body: API.UserRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/user/ban/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userBindEmail POST /api/user/bindEmail */
export async function userBindEmailUsingPost(
  body: API.UserRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/bindEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUser DELETE /api/user/delete */
export async function deleteUserUsingDelete(
  body: API.UserRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/user/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userEmailLogin POST /api/user/email/login */
export async function userEmailLoginUsingPost(
  body: API.UserRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/email/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userEmailRegister POST /api/user/email/register */
export async function userEmailRegisterUsingPost(
  body: API.UserRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/user/email/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserById GET /api/user/get/ */
export async function getUserByIdUsingGet(body: API.UserRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO>('/api/user/get/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserByInvitationCode POST /api/user/get/invitationCode */
export async function getUserByInvitationCodeUsingPost(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/get/invitationCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getLoginUser GET /api/user/get/login */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO>('/api/user/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getCaptcha GET /api/user/getCaptcha */
export async function getCaptchaUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaptchaUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/user/getCaptcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getUserListByPage GET /api/user/list/page */
export async function getUserListByPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserListByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserVO>('/api/user/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** userLogin POST /api/user/login */
export async function userLoginUsingPost(body: API.UserRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogout POST /api/user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** normalUser POST /api/user/normal */
export async function normalUserUsingPost(body: API.UserRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/user/normal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPost(
  body: API.UserRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userUnBindEmail POST /api/user/unbindEmail */
export async function userUnBindEmailUsingPost(
  body: API.UserRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/unbindEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUser POST /api/user/update */
export async function updateUserUsingPost(body: API.UserRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateDevCred POST /api/user/update/devCred */
export async function updateDevCredUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO>('/api/user/update/devCred', {
    method: 'POST',
    ...(options || {}),
  });
}
