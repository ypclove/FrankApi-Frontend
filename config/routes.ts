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
    path: '/admin',
    name: '系统管理',
    icon: 'appstore',
    access: 'canAdmin',
    routes: [
      {
        name: '用户管理',
        icon: 'TeamOutlined',
        path: '/admin/user/list',
        component: './Admin/UserList'
      }
    ]
  }
];
