declare namespace API {
  type banUserUsingPOSTParams = {
    /** userId */
    userId: number;
  };

  type BaseResponseboolean = {
    code?: number;
    data?: boolean;
    msg?: string;
  };

  type BaseResponseInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo;
    msg?: string;
  };

  type BaseResponselong = {
    code?: number;
    data?: number;
    msg?: string;
  };

  type BaseResponseobject = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type BaseResponsePageInterfaceInfo = {
    code?: number;
    data?: PageInterfaceInfo;
    msg?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    msg?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    msg?: string;
  };

  type deleteInterfaceUsingDELETEParams = {
    /** interfaceId */
    interfaceId: number;
  };

  type deleteUserUsingDELETEParams = {
    /** userId */
    userId: number;
  };

  type Field = {
    fieldName?: string;
    value?: string;
  };

  type getCaptchaUsingGETParams = {
    /** emailAccount */
    emailAccount?: string;
  };

  type getInterfaceInfoByIdUsingGETParams = {
    /** interfaceId */
    interfaceId: number;
  };

  type getUserByIdUsingGETParams = {
    /** userId */
    userId: number;
  };

  type getUserListByPageUsingGETParams = {
    current?: number;
    gender?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userAccount?: string;
    userRole?: number;
  };

  type InterfaceInfo = {
    createTime?: string;
    description?: string;
    id?: number;
    isDelete?: boolean;
    method?: number;
    name?: string;
    reduceScore?: number;
    requestExample?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    responseParams?: string;
    returnFormat?: string;
    status?: number;
    totalInvokes?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type InterfaceInfoAddRequest = {
    /** 接口描述 */
    description?: string;
    /** 请求方法 */
    method?: number;
    /** 接口名称 */
    name?: string;
    /** 减少积分个数 */
    reduceScore?: number;
    /** 请求示例 */
    requestExample?: string;
    /** 请求头 */
    requestHeader?: string;
    /** 接口请求参数 */
    requestParams?: RequestParamsField[];
    /** 响应头 */
    responseHeader?: string;
    /** 接口响应参数 */
    responseParams?: ResponseParamsField[];
    /** 接口返回格式 */
    returnFormat?: string;
    /** 接口地址 */
    url?: string;
  };

  type InterfaceInfoUpdateRequest = {
    /** 接口描述 */
    description?: string;
    /** 接口 Id */
    id?: number;
    /** 请求方法 */
    method?: number;
    /** 接口名称 */
    name?: string;
    /** 减少积分个数 */
    reduceScore?: number;
    /** 请求示例 */
    requestExample?: string;
    /** 请求头 */
    requestHeader?: string;
    /** 接口请求参数 */
    requestParams?: RequestParamsField[];
    /** 响应头 */
    responseHeader?: string;
    /** 接口响应参数 */
    responseParams?: ResponseParamsField[];
    /** 接口返回格式 */
    returnFormat?: string;
    /** 接口状态 */
    status?: number;
    /** 接口地址 */
    url?: string;
  };

  type InvokeRequest = {
    /** 接口 Id */
    id?: number;
    /** 接口请求参数 */
    requestParams?: Field[];
    /** 用户请求参数 */
    userRequestParams?: string;
  };

  type listInterfaceInfoByPageUsingGETParams = {
    current?: number;
    description?: string;
    method?: number;
    name?: string;
    pageSize?: number;
    reduceScore?: number;
    'responseParams[0].desc'?: string;
    'responseParams[0].fieldName'?: string;
    'responseParams[0].id'?: string;
    'responseParams[0].type'?: string;
    returnFormat?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId: number;
  };

  type listInterfaceInfoBySearchTextPageUsingGETParams = {
    current?: number;
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type normalUserUsingPOSTParams = {
    /** userId */
    userId: number;
  };

  type offlineInterfaceInfoUsingPOSTParams = {
    /** interfaceId */
    interfaceId: number;
  };

  type onlineInterfaceInfoUsingPOSTParams = {
    /** interfaceId */
    interfaceId: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageInterfaceInfo = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: InterfaceInfo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type RequestParamsField = {
    desc?: string;
    fieldName?: string;
    id?: string;
    required?: string;
    type?: string;
  };

  type ResponseParamsField = {
    desc?: string;
    fieldName?: string;
    id?: string;
    type?: string;
  };

  type UserAddRequest = {
    /** 用户性别 */
    gender?: number;
    /** 用户账号 */
    userAccount?: string;
    /** 密码 */
    userPassword?: string;
    /** 用户角色 */
    userRole?: number;
  };

  type UserBindEmailRequest = {
    /** 验证码 */
    captcha?: string;
    /** 邮箱 */
    emailAccount?: string;
  };

  type UserEmailLoginRequest = {
    /** 验证码 */
    captcha?: string;
    /** 邮箱 */
    emailAccount?: string;
  };

  type UserEmailRegisterRequest = {
    agreeToAnAgreement?: string;
    /** 验证码 */
    captcha?: string;
    /** 邮箱 */
    emailAccount?: string;
    /** 邀请码（可选） */
    invitationCode?: string;
  };

  type UserLoginRequest = {
    /** 用户账号 */
    userAccount?: string;
    /** 密码 */
    userPassword?: string;
  };

  type UserRegisterRequest = {
    /** 确认密码 */
    checkPassword?: string;
    /** 邀请码（可选） */
    invitationCode?: string;
    /** 用户账号 */
    userAccount?: string;
    /** 密码 */
    userPassword?: string;
  };

  type UserUnBindEmailRequest = {
    /** 验证码 */
    captcha?: string;
    /** 邮箱 */
    emailAccount?: string;
  };

  type UserUpdateRequest = {
    /** 积分 */
    balance?: number;
    /** 用户性别 */
    gender?: number;
    /** 用户 Id */
    id?: number;
    /** 用户账号 */
    userAccount?: string;
    /** 密码 */
    userPassword?: string;
    /** 用户角色 */
    userRole?: number;
  };

  type UserVO = {
    accessKey?: string;
    balance?: number;
    createTime?: string;
    email?: string;
    gender?: number;
    id?: number;
    invitationCode?: string;
    secretKey?: string;
    status?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: number;
  };

  type ProductInfo = {
    addPoints?: number;
    createTime?: string;
    description?: string;
    expirationTime?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    productType?: string;
    status?: number;
    total?: number;
    updateTime?: string;
    userId?: number;
  };
}
