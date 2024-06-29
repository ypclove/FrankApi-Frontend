import { EMAIL_PATTERN } from '@/constant';
import { valueLength } from '@/pages/User/UserInfo';
import { getCaptchaUsingGet } from '@/services/FrankApi/userController';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { LoginForm } from '@ant-design/pro-components';
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-form';
import { ProFormInstance } from '@ant-design/pro-form/lib';
import { Button, message, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

export type Props = {
  open: boolean;
  onCancel: () => void;
  data?: API.UserVO;
  bindSubmit: (values: API.UserBindEmailRequest) => Promise<void>;
  unbindSubmit: (values: API.UserUnBindEmailRequest) => Promise<void>;
};

const EmailModal: React.FC<Props> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const [key, setKey] = useState<'bind' | 'unbind'>();
  const { open, data, onCancel, bindSubmit, unbindSubmit } = props;
  useEffect(() => {
    // 关闭表单时刷新form
    if (!open) {
      formRef.current?.resetFields();
    }
  }, [open]);
  return (
    <Modal footer={null} centered open={open} width={500} onCancel={onCancel}>
      <LoginForm
        formRef={formRef}
        contentStyle={{
          minWidth: 280,
          maxWidth: '75vw'
        }}
        submitter={{
          render: () => {
            return [
              <>
                <Button
                  type={'primary'}
                  key="submit"
                  block
                  onClick={() => {
                    setKey('bind');
                    formRef.current?.submit();
                  }}
                >
                  {data?.email ? '更新邮箱' : '绑定邮箱'}
                </Button>
                {valueLength(data?.email) && (
                  <Button
                    style={{ marginTop: 10 }}
                    key="Unbinding"
                    block
                    danger
                    onClick={() => {
                      setKey('unbind');
                      formRef.current?.submit();
                    }}
                  >
                    解绑邮箱
                  </Button>
                )}
              </>
            ];
          }
        }}
        onFinish={async (values) => {
          if (key === 'bind') {
            bindSubmit?.(values);
          } else {
            unbindSubmit?.(values);
          }
        }}
      >
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
      </LoginForm>
    </Modal>
  );
};

export default EmailModal;
