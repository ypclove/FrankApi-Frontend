import Footer from '@/components/Footer';
import SendGift from '@/components/Gift/SendGift';
import LightColor from '@/components/Icon/LightColor';
import { Docs } from '@/components/RightContent';
import { GITHUB_LINK, INTERFACE_DEV_DOC, LOGO, WECHAT } from '@/constant';
import NoFoundPage from '@/pages/404';
import { valueLength } from '@/pages/User/UserInfo';
import { requestConfig } from '@/requestConfig';
import {
  BarsOutlined,
  ExportOutlined,
  FileTextOutlined,
  GithubOutlined,
  WechatOutlined
} from '@ant-design/icons';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { FloatButton, message } from 'antd';
import Settings from '../config/defaultSettings';
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';

const loginPath = '/user/login';
const whiteList = [loginPath, '/', '/account/center'];
// const isDev = process.env.NODE_ENV === 'development';
const stats: InitialState = {
  loginUser: undefined,
  settings: Settings,
  open: false
};

const baiduStatistics = () => {
  const hm = document.createElement('script');
  hm.src = 'https://hm.baidu.com/hm.js?1c3c7a064d6a39da5a90bf71821b4a9a';
  const s = document.getElementsByTagName('script')[0];
  // @ts-ignore
  s.parentNode.insertBefore(hm, s);
};

/**
 * 从 localStorage 取用户状态
 * 1. 如果没有没有过期，更新 loginUser
 * 2. 如果过期了，移除 localStorage 并让用户登录
 */
export async function getInitialState(): Promise<InitialState> {
  try {
    const loginStatusStr = localStorage.getItem('loginUserStatus');
    if (loginStatusStr) {
      const { userInfo, expirationDate } = JSON.parse(loginStatusStr);
      // 获取当前日期的 ISO 格式前 10 位，即"YYYY-MM-DD"
      const now = new Date().toISOString();
      if (now <= expirationDate) {
        // 登录状态有效，设置到 initialState 中
        stats.loginUser = userInfo;
      } else {
        // 登录状态过期，从 localStorage 中移除
        localStorage.removeItem('loginUserStatus');
        history.push(loginPath);
      }
    }
  } catch (error) {
    // @ts-ignore
    message.error(error.message);
    history.push(loginPath);
  }
  return stats;
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [<Docs key="doc" />],
    waterMarkProps: {
      content: initialState?.loginUser?.userAccount
    },
    logo: LOGO,
    footerRender: () => (
      <>
        <Footer />
        <FloatButton.Group trigger="hover" style={{ right: 94 }} icon={<BarsOutlined />}>
          <FloatButton
            tooltip={<img src={WECHAT} alt="微信 code_nav" width="120" />}
            icon={<WechatOutlined />}
          />
          <FloatButton
            tooltip={'📘接口在线文档'}
            icon={<FileTextOutlined />}
            onClick={() => {
              location.href = INTERFACE_DEV_DOC;
            }}
          />
          <FloatButton
            tooltip={'分享此网站'}
            icon={<ExportOutlined />}
            onClick={() => {
              if (!initialState?.loginUser && location.pathname !== loginPath) {
                message.error('请先登录');
                history.push(loginPath);
                return;
              }
              setInitialState({
                loginUser: initialState?.loginUser,
                settings: Settings,
                open: true
              });
            }}
          />
          <FloatButton
            tooltip={'查看本站技术及源码，欢迎 star'}
            icon={<GithubOutlined />}
            onClick={() => {
              location.href = GITHUB_LINK;
            }}
          />
          <FloatButton
            tooltip={'切换主题'}
            icon={<LightColor />}
            onClick={() => {
              if (initialState?.settings.navTheme === 'light') {
                setInitialState({
                  loginUser: initialState?.loginUser,
                  settings: { ...Settings, navTheme: 'realDark' }
                });
              } else {
                setInitialState({
                  loginUser: initialState?.loginUser,
                  settings: { ...Settings, navTheme: 'light' }
                });
              }
            }}
          />
        </FloatButton.Group>
        <SendGift
          invitationCode={initialState?.loginUser?.invitationCode}
          open={initialState?.open}
          onCancel={() =>
            setInitialState({ loginUser: initialState?.loginUser, settings: Settings, open: false })
          }
        ></SendGift>
      </>
    ),
    avatarProps: {
      src: valueLength(initialState?.loginUser?.userAvatar)
        ? initialState?.loginUser?.userAvatar
        : '',
      title: initialState?.loginUser ? <AvatarName /> : '游客',
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      }
    },
    onPageChange: () => {
      // 百度统计
      baiduStatistics();
      const { location } = history;
      if (!whiteList.includes(location.pathname)) {
        getInitialState();
      }
      // 如果没有登录，重定向到 login
      if (
        !initialState?.loginUser &&
        !/^\/\w+\/?$/.test(location.pathname) &&
        location.pathname !== '/' &&
        location.pathname !== '/interface/list' &&
        !location.pathname.includes('/interface_info/')
      ) {
        history.push(loginPath);
      }
    },
    // 自定义 403 页面
    unAccessible: <NoFoundPage />,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading/>;
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = requestConfig;
