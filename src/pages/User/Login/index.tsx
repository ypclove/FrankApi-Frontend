import Footer from '@/components/Footer';
import { EMAIL_PATTERN, LOGO, USER_ACCOUNT_PATTERN } from '@/constant';
import {
  getCaptchaUsingGet,
  userEmailLoginUsingPost,
  userLoginUsingPost
} from '@/services/FrankApi/userController';
import { Link } from '@@/exports';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { ProFormCaptcha } from '@ant-design/pro-form';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';

const Login: React.FC = () => {
  const [type, setType] = useState<string>('email');
  const { setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%'
    };
  });

  /**
   * 登录
   * @param res 登录参数
   */
  const doLogin = (res: any) => {
    if (res.data && res.code === 20000) {
      message.success('登录成功');
      // 登录成功后将用户信息保存到 initialState 中
      setInitialState({ loginUser: res.data, settings: Settings });
      setTimeout(() => {
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
      }, 100);
    }
  };

  /**
   * 平台登录
   * @param values 平台登录请求参数
   */
  const handleSubmit = async (values: API.UserRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPost({
        ...values
      });
      doLogin(res);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
  };

  /**
   * 邮箱登录
   * @param values 邮箱登录请求参数
   */
  const handleEmailSubmit = async (values: API.UserRequest) => {
    try {
      // 登录
      const res = await userEmailLoginUsingPost({
        ...values
      });
      doLogin(res);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0'
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw'
          }}
          logo={<img alt="logo" src={LOGO} />}
          title="FrankAPI 接口开放平台"
          subTitle={'FrankAPI 接口开放平台致力于提供稳定、安全、高效的接口调用服务'}
          initialValues={{
            autoLogin: true
          }}
          onFinish={async (values) => {
            if (type === 'account') {
              await handleSubmit(values as API.UserRequest);
            } else {
              await handleEmailSubmit(values as API.UserRequest);
            }
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'email',
                label: '邮箱账号登录'
              },
              {
                key: 'account',
                label: '账户密码登录'
              }
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号不能为空'
                  },
                  {
                    min: 4,
                    message: '账号长度为 4-16 字符'
                  },
                  {
                    max: 16,
                    message: '账号长度为 4-16 字符'
                  },
                  {
                    pattern: RegExp(USER_ACCOUNT_PATTERN),
                    message: '账号由数字和字母组成'
                  }
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码不能为空'
                  },
                  {
                    min: 8,
                    message: '密码长度为 8-16 字符'
                  },
                  {
                    max: 16,
                    message: '密码长度为 8-16 字符'
                  }
                ]}
              />
            </>
          )}
          {type === 'email' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />
                }}
                name="emailAccount"
                placeholder={'请输入邮箱账号'}
                rules={[
                  {
                    required: true,
                    message: '邮箱不能为空'
                  },
                  {
                    max: 50,
                    message: '邮箱长度不能超过 50 个字符'
                  },
                  {
                    pattern: RegExp(EMAIL_PATTERN),
                    message: '邮箱格式不正确'
                  }
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />
                }}
                captchaProps={{
                  size: 'large'
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'秒后重新获取'}`;
                  }
                  return '获取验证码';
                }}
                phoneName={'emailAccount'}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '验证码不能为空'
                  },
                  {
                    len: 6,
                    message: '验证码长度必须为 6 字符'
                  }
                ]}
                onGetCaptcha={async (emailAccount) => {
                  const res = await getCaptchaUsingGet({ emailAccount });
                  if (res.data && res.code === 20000) {
                    message.success('验证码发送成功');
                    return;
                  }
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <Link
              to={'/user/register'}
              style={{
                float: 'right'
              }}
            >
              还没账号？点击前往注册
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
