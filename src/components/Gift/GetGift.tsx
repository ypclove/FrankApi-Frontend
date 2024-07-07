import { NOT_LOGIN_AVATAR } from '@/constant';
import ProCard from '@ant-design/pro-card';
import { history } from '@umijs/max';
import { Button, Divider, Modal } from 'antd';
import React from 'react';

export type Props = {
  open: boolean;
  onCancel: () => void;
  data?: API.UserVO;
};

const GetGiftModal: React.FC<Props> = (props) => {
  const { open, data, onCancel } = props;

  return (
    <Modal footer={null} centered open={open} width={580} onCancel={onCancel}>
      <ProCard direction="column" style={{ textAlign: 'center' }}>
        <ProCard layout="center">
          <div style={{ borderRadius: '50%', padding: '2px' }}>
            <img
              style={{ width: 80, height: 80, borderRadius: '50%' }}
              src={data?.userAvatar ?? NOT_LOGIN_AVATAR}
              alt={data?.userAccount}
            />
          </div>
        </ProCard>
        <ProCard layout="center">
          <Divider style={{ marginTop: -25 }}>
            来自“<strong>{data?.userAccount}</strong>”的邀请
          </Divider>
        </ProCard>
        <ProCard layout="center">
          <p style={{ marginTop: -25 }}>请收下我的礼物</p>
        </ProCard>
        <ProCard layout="center">
          <p
            style={{
              marginTop: -30,
              height: 40,
              fontWeight: 'bold',
              fontSize: 20,
              color: 'red'
            }}
          >
            100 积分
          </p>
        </ProCard>
        <ProCard layout="center">
          <Button
            size={'large'}
            style={{ marginTop: -30, backgroundColor: 'rgba(131,130,255,0.31)' }}
            onClick={() => {
              history.push(`/user/register/${data?.invitationCode}`);
            }}
          >
            注册并领取
          </Button>
        </ProCard>
      </ProCard>
    </Modal>
  );
};

export default GetGiftModal;
