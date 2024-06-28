// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

/** addUser POST /api/user/add */
export async function addUserUsingPost(body: API.UserAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponselong>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** banUser POST /api/user/ban/${userId} */
export async function banUserUsingPost(
  userId: number | undefined,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseboolean>(`/api/user/ban/${userId}`, {
    method: 'POST',
    ...(options || {})
  });
}

/** userBindEmail POST /api/user/bindEmail */
export async function userBindEmailUsingPost(
  body: API.UserBindEmailRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserVO>('/api/user/bindEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** deleteUser DELETE /api/user/delete/${userId} */
export async function deleteUserUsingDelete(
  userId: number | undefined,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseboolean>(`/api/user/delete/${userId}`, {
    method: 'DELETE',
    ...(options || {})
  });
}

/** userEmailLogin POST /api/user/email/login */
export async function userEmailLoginUsingPost(
  body: API.UserEmailLoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserVO>('/api/user/email/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** userEmailRegister POST /api/user/email/register */
export async function userEmailRegisterUsingPost(
  body: API.UserEmailRegisterRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponselong>('/api/user/email/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** getUserById GET /api/user/get/${param0} */
export async function getUserByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.BaseResponseUserVO>(`/api/user/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {})
  });
}

/** getUserByInvitationCode POST /api/user/get/invitationCode */
export async function getUserByInvitationCodeUsingPost(
  body: string,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserVO>('/api/user/get/invitationCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** getLoginUser GET /api/user/get/login */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO>('/api/user/get/login', {
    method: 'GET',
    ...(options || {})
  });
}

/** getCaptcha GET /api/user/getCaptcha */
export async function getCaptchaUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaptchaUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseboolean>('/api/user/getCaptcha', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  });
}

/** getUserListByPage GET /api/user/list/page */
export async function getUserListByPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserListByPageUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageUserVO>('/api/user/list/page', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  });
}

/** userLogin POST /api/user/login */
export async function userLoginUsingPost(
  body: API.UserLoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserVO>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** userLogout POST /api/user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/user/logout', {
    method: 'POST',
    ...(options || {})
  });
}

/** normalUser POST /api/user/normal/${userId} */
export async function normalUserUsingPost(
  userId: number | undefined,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseboolean>(`/api/user/normal/${userId}`, {
    method: 'POST',
    ...(options || {})
  });
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPost(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponselong>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** userUnBindEmail POST /api/user/unbindEmail */
export async function userUnBindEmailUsingPost(
  body: API.UserUnBindEmailRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserVO>('/api/user/unbindEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}

/** updateUser POST /api/user/update */
export async function updateUserUsingPost(
  body: API.UserUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseboolean>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  });
}
