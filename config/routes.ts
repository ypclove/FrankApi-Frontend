export default [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '*', layout: false, component: './404' },
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
    path: '/admin',
    name: '系统管理',
    icon: 'appstore',
    // access: 'canAdmin',
    routes: [
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
        name: '商品管理',
        icon: 'table',
        path: '/admin/productInfo/list',
        component: './Admin/ProductInfoList'
      }
    ]
  }
];
