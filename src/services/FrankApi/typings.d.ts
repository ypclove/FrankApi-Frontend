declare namespace API {
  type banUserUsingPOSTParams = {
    /** userId */
    userId?: number;
  };

  type BaseResponseBoolean = {
    code?: number;
    data?: boolean;
    msg?: string;
  };

  type BaseResponseListUserVO = {
    code?: number;
    data?: UserVO[];
    msg?: string;
  };

  type BaseResponseLong = {
    code?: number;
    data?: number;
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

  type getCaptchaUsingGETParams = {
    /** emailAccount */
    emailAccount?: string;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByInvitationCodeUsingPOSTParams = {
    /** invitationCode */
    invitationCode?: string;
  };

  type listUserByPageUsingGETParams = {
    current?: number;
    gender?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userAccount?: string;
    userRole?: number;
  };

  type normalUserUsingPOSTParams = {
    /** userId */
    userId?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
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

  type UserQueryRequest = {
    current?: number;
    gender?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userAccount?: string;
    userRole?: number;
  };

  type UserRegisterRequest = {
    agreeToAnAgreement?: string;
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
}
