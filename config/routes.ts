export default [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '*', layout: false, component: './404' },
  {
    path: '/account/center',
    name: '个人中心',
    icon: 'UserOutlined',
    component: './User/UserInfo',
    hideInMenu: true
  },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      {
        name: '注册账号',
        path: '/user/register',
        component: './User/Register'
      },
      {
        name: '注册账号',
        path: '/user/register/:id',
        component: './User/Register',
        hideInMenu: true
      }
    ]
  },
  {
    path: '/interface/list',
    name: '接口广场',
    icon: 'RedditOutlined',
    component: './InterfaceSquare'
  },
  {
    path: '/interface_info/:id',
    name: '接口详情',
    component: './InterfaceInfo',
    hideInMenu: true
  },
  {
    path: '/order/pay/:id',
    icon: 'PayCircleOutlined',
    name: '订单支付',
    component: './Order/PayOrder',
    hideInMenu: true
  },
  {
    path: '/order/info/:id',
    icon: 'ProfileOutlined',
    name: '订单详情',
    component: './Order/OrderInfo',
    hideInMenu: true
  },
  { path: '/recharge/list', icon: 'PayCircleOutlined', name: '积分商城', component: './Recharge' },
  {
    path: '/order/list',
    name: '我的订单',
    icon: 'ProfileOutlined',
    component: './Order/OrderList'
  },
  {
    path: '/admin',
    name: '系统管理',
    icon: 'appstore',
    // access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/interface/list'
      },
      {
        name: '用户管理',
        icon: 'TeamOutlined',
        path: '/admin/user/list',
        component: './Admin/UserList'
      },
      {
        name: '接口管理',
        icon: 'ApiOutlined',
        path: '/admin/interface/list',
        component: './Admin/InterfaceInfoList'
      },
      {
        name: '产品管理',
        icon: 'table',
        path: '/admin/productInfo/list',
        component: './Admin/ProductInfoList'
      }
    ]
  }
];
