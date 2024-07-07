/**
 * 接口请求方式枚举
 */
export const InterfaceRequestMethodEnum: any = {
  1: {
    color: 'blue',
    text: 'GET'
  },
  2: {
    color: 'red',
    text: 'POST'
  },
  3: {
    color: 'green',
    text: 'PUT'
  },
  4: {
    color: 'orange',
    text: 'DELETE'
  }
};

/**
 * 接口状态枚举
 */
export const InterfaceStatusEnum: any = {
  0: {
    text: '关闭',
    status: 'Error'
  },
  1: {
    text: '开启',
    status: 'Success'
  },
  2: {
    text: '审核中',
    status: 'Processing'
  }
};

/**
 * 用户性别枚举
 */
export const UserGenderEnum: any = {
  0: {
    color: 'pink',
    text: '女'
  },
  1: {
    color: 'blue',
    text: '男'
  }
};

export const productTypeColorEnum: any = {
  VIP: 'red',
  RECHARGE: 'blue'
};

export const orderStatusEnum: any = {
  SUCCESS: '支付成功',
  NOTPAY: '未支付',
  CLOSED: '已取消'
};

export const orderPayTypeEnum: any = {
  WX: 'blue',
  ALIPAY: 'green'
};

export const productTypeEnum: any = {
  RECHARGEACTIVITY: '充值活动',
  RECHARGE: '积分充值',
  VIP: 'VIP会员'
};
