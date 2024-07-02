import Footer from '@/components/Footer';
import {
  EMAIL_PATTERN,
  LOGO,
  PRIVACY_AGREEMENT,
  USER_ACCOUNT_PATTERN,
  USER_AGREEMENT
} from '@/constant';
import {
  getCaptchaUsingGet,
  userEmailRegisterUsingPost,
  userRegisterUsingPost
} from '@/services/FrankApi/userController';
import { useParams } from '@@/exports';
import { LinkOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { ProFormCaptcha } from '@ant-design/pro-form';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, Link } from '@umijs/max';
import { Form, message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import Settings from '../../../../config/defaultSettings';

const Register: React.FC = () => {
  const [type, setType] = useState<string>('email');
  const [invitationCode, setInvitationCode] = useState<string>('');
  const [form] = Form.useForm();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setInvitationCode(params.id);
      form.setFieldsValue(invitationCode);
    }
  }, [params.id]);

  useEffect(() => {
    form.setFieldsValue({ invitationCode });
  }, [invitationCode]);

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

  const doRegister = (res: any) => {
    if (res.data && res.code === 20000) {
      console.log('成功');
      message.success('注册成功');
      setTimeout(() => {
        history.push('/user/login');
      }, 100);
    }
  };

  const handleSubmit = async (values: API.UserRequest) => {
    // try {
    // 登录
    const res = await userRegisterUsingPost({
      ...values
    });
    doRegister(res);
    // }
    // catch (error) {
    //   const defaultLoginFailureMessage = '注册失败，请重试！';
    //   message.error(defaultLoginFailureMessage);
    // }
  };

  const handleEmailSubmit = async (values: API.UserRequest) => {
    try {
      // 登录
      const res = await userEmailRegisterUsingPost({
        ...values
      });
      doRegister(res);
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册账号'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0'
        }}
      >
        <LoginForm
          form={form}
          submitter={{
            searchConfig: {
              submitText: '注册'
            }
          }}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw'
          }}
          logo={<img alt="logo" src={LOGO} />}
          title="FrankAPI 接口开放平台"
          subTitle={'FrankAPI 接口开放平台致力于提供稳定、安全、高效的接口调用服务'}
          initialValues={{
            invitationCode: invitationCode
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
                label: '邮箱账号注册'
              },
              {
                key: 'account',
                label: '平台账号注册'
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
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />
                }}
                placeholder={'请确认密码'}
                rules={[
                  {
                    required: true,
                    message: '确认密码不能为空'
                  },
                  {
                    min: 8,
                    message: '确认密码长度为 8-16 字符'
                  },
                  {
                    max: 16,
                    message: '确认密码长度为 8-16 字符'
                  }
                ]}
              />
              <ProFormText
                name="invitationCode"
                fieldProps={{
                  size: 'large',
                  prefix: <LinkOutlined />
                }}
                placeholder={'邀请码（可选）'}
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
              <ProFormText
                name="invitationCode"
                fieldProps={{
                  size: 'large',
                  prefix: <LinkOutlined />
                }}
                placeholder={'邀请码（可选）'}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24
            }}
          >
            <ProFormCheckbox
              initialValue={true}
              name="agreeToAnAgreement"
              rules={[
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(new Error('同意协议后才可以注册'));
                    }
                    return Promise.resolve();
                  },
                  required: true
                })
              ]}
            >
              同意并接受
              <a target={'_blank'} href={PRIVACY_AGREEMENT} rel="noreferrer">
                隐私协议
              </a>
              |
              <a target={'_blank'} href={USER_AGREEMENT} rel="noreferrer">
                用户协议
              </a>
            </ProFormCheckbox>
            <div
              style={{
                marginTop: -18
              }}
            >
              <Link
                to={'/user/login'}
                style={{
                  float: 'right'
                }}
              >
                已有账号？前往登录
              </Link>
            </div>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
