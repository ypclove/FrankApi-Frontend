import alipay from '../../public/assets/Alipay.png';
import kun from '../../public/assets/KunCoin.png';
import lightColorIcon from '../../public/assets/LightColor.png';
import notLogin from '../../public/assets/notLogin.png';
import weChat from '../../public/assets/WeChat.jpg';
import logo from '../../public/logo.png';

export const LOGO = logo;
export const NOT_LOGIN_AVATAR = notLogin;
export const GITHUB_LINK = 'https://github.com/ypclove/FrankApi-Backend';
export const BLOG_LINK = 'https://blog.franksteven.me';
export const DMS_LINK = 'https://beian.miit.gov.cn/';
export const POLICE_AVATAR = 'https://beian.mps.gov.cn/img/logo01.dd7ff50e.png';
export const NISMSP_LINK = 'https://beian.mps.gov.cn/';
export const ALIPAY = alipay;
export const WECHAT = weChat;
export const KUN = kun;
export const LIGHT_COLOR_ICON = lightColorIcon;
export const USER_ACCOUNT_PATTERN = '^[A-Za-z0-9]+$';
export const EMAIL_PATTERN = '^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$';
// TODO: 开发者文档
export const INTERFACE_DEV_DOC = 'https://blog.franksteven.me';
// TODO: 隐私协议
export const PRIVACY_AGREEMENT = '';
// TODO: 用户协议
export const USER_AGREEMENT = '';
export const DEFAULT_AVATAR_URL = 'https://avatars.githubusercontent.com/u/48648302?v=4';

export const selectGender = [
  { value: '男', label: '男' },
  { value: '女', label: '女' }
];
export const selectUserStatus = [
  { value: 0, label: '正常' },
  { value: 1, label: '注销' }
];
export const selectUserRole = [
  { value: 'user', label: '普通用户' },
  { value: 'admin', label: '管理员' },
  { value: 'ban', label: '封号' }
];
