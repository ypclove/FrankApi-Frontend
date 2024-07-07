import EmailModal from '@/components/EmailModal';
import SendGiftModal from '@/components/Gift/SendGift';
import {API_SDK} from '@/constant';
import {requestConfig} from '@/requestConfig';
import {doDailyCheckInUsingPost} from '@/services/FrankApi/dailyCheckInController';
import {
  getLoginUserUsingGet,
  updateDevCredUsingPost,
  updateUserUsingPost,
  userBindEmailUsingPost,
  userUnBindEmailUsingPost
} from '@/services/FrankApi/userController';
import {EditOutlined, PlusOutlined, VerticalAlignBottomOutlined} from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import {history, useModel} from '@umijs/max';
import {
  Button,
  Descriptions,
  message,
  Modal,
  Spin,
  Tooltip,
  Tour,
  TourProps,
  Upload,
  UploadFile,
  UploadProps
} from 'antd';
import ImgCrop from 'antd-img-crop';
import {RcFile} from 'antd/es/upload';
import Paragraph from 'antd/lib/typography/Paragraph';
import React, {useEffect, useRef, useState} from 'react';
import Settings from '../../../../config/defaultSettings';

/**
 * 检查值是否存在，并且去除首位控制之后长度大于 0
 * @param val
 */
export const valueLength = (val: any) => {
  return val && val.trim().length > 0;
};

const UserInfo: React.FC = () => {
  // TODO: 放在常量类
  const unloadFileTypeList = [
    'image/jpeg',
    'image/jpg',
    'image/svg',
    'image/png',
    'image/webp',
    'image/jfif'
  ];
  const { initialState, setInitialState } = useModel('@@initialState');
  const { loginUser } = initialState || {};
  const [previewOpen, setPreviewOpen] = useState(false);
  const [voucherLoading, setVoucherLoading] = useState<boolean>(false);
  const [dailyCheckInLoading, setDailyCheckInLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleCancel = () => setPreviewOpen(false);
  const [userAccount, setUserAccount] = useState<string | undefined>('');
  const [open, setOpen] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const [openTour, setOpenTour] = useState<boolean>(false);

  /**
   * 新手引导
   */
  const steps: TourProps['steps'] = [
    {
      title: '个人信息设置',
      description: (
        <span>
          这里是你的账号信息，您可以便捷的查看您的基本信息。
          <br />
          您还可以修改和更新昵称和头像。
          <br />
          邮箱主要用于接收<strong>支付订单信息</strong>，如果不绑定无法接收，快去绑定吧！🥰
        </span>
      ),
      target: () => ref1.current
    },
    {
      title: '我的钱包',
      description: (
        <span>
          这里是您的钱包余额，金币用于平台接口的调用费用。
          <br />
          除了充值金币外，您还可以通过每日签到或者邀请好友注册来获得坤币！
        </span>
      ),
      target: () => ref2.current
    },
    {
      title: '接口调用凭证',
      description: '这里是您调用接口的凭证，没有凭证将无法调用接口',
      target: () => ref3.current
    },
    {
      title: '开发者 SDK',
      description: '您可以使用开发者 SDK，快速高效的接入接口到您的项目中，快动手试一下吧！',
      target: () => ref4.current
    }
  ];

  /**
   * 加载数据
   */
  const loadData = async () => {
    setLoading(true);
    const res = await getLoginUserUsingGet();
    if (res.data && res.code === 20000) {
      if (initialState?.settings.navTheme === 'light') {
        setInitialState({ loginUser: res.data, settings: { ...Settings, navTheme: 'light' } });
      } else {
        setInitialState({ loginUser: res.data, settings: { ...Settings, navTheme: 'realDark' } });
      }
      const updatedFileList = [...fileList];
      if (loginUser && loginUser.userAvatar) {
        updatedFileList[0] = {
          uid: loginUser?.userAccount || 'unknown', // 提供一个默认值
          name: loginUser?.userAvatar?.substring(loginUser?.userAvatar!.lastIndexOf('-') + 1),
          status: 'done',
          percent: 100,
          url: loginUser?.userAvatar
        };
        setFileList(updatedFileList);
      }
      // 使用新获取的 userAccount 更新组件状态
      setUserAccount(res.data?.userAccount);
      // setUserAccount(loginUser?.userAccount);
      setLoading(false);
    }
    // PC 端显示指引
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobile) {
      setOpenTour(false);
    } else {
      const tour = localStorage.getItem('tour');
      if (!tour) {
        setOpenTour(true);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /**
   * 将文件进行 Base64 编码
   * @param file 文件
   */
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  /**
   * 文件预览处理
   * @param file 文件
   */
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('-') + 1));
  };

  /**
   * 上传按钮
   */
  const uploadButton = () => {
    return (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
  };

  /**
   * 上传文件之间的校验
   * @param file 文件
   */
  const beforeUpload = async (file: RcFile) => {
    const fileType = unloadFileTypeList.includes(file.type);
    if (!fileType) {
      message.error('图片类型有误，请上传 jpg/png/svg/jpeg/webp 格式');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('文件大小不能超过 2M');
    }
    if (!isLt2M && !fileType) {
      const updatedFileList = [...fileList];
      updatedFileList[0] = {
        uid: loginUser?.userAccount || 'unknown', // 提供一个默认值
        name: 'error',
        status: 'error',
        percent: 100
      };
      setFileList(updatedFileList);
      return false;
    }
    return fileType && isLt2M;
  };

  /**
   * 上传文件
   */
  const props: UploadProps = {
    name: 'file',
    withCredentials: true,
    action: `${requestConfig.baseURL}api/file/upload?biz=user_avatar`,
    onChange: async function ({ file, fileList: newFileList }) {
      const { response } = file;
      console.log('response-------', response);
      if (file.response && response.data) {
        const {
          data: { status, url }
        } = response;
        console.log('response===========', response);
        const updatedFileList = [...fileList];
        if (response.code !== 0 || status === 'error') {
          message.error(response.message);
          file.status = 'error';
          updatedFileList[0] = {
            uid: loginUser?.userAccount ? loginUser?.userAccount : 'error',
            name: loginUser?.userAvatar
              ? loginUser?.userAvatar?.substring(loginUser?.userAvatar!.lastIndexOf('-') + 1)
              : 'error',
            status: 'error',
            percent: 100
          };
          setFileList(updatedFileList);
          return;
        }
        file.status = status;
        updatedFileList[0] = {
          // @ts-ignore
          uid: loginUser?.userAccount,
          // @ts-ignore
          name: loginUser?.userAvatar?.substring(loginUser?.userAvatar!.lastIndexOf('-') + 1),
          status: status,
          url: url,
          percent: 100
        };
        setFileList(updatedFileList);
      } else {
        setFileList(newFileList);
      }
    },
    listType: 'picture-circle',
    onPreview: handlePreview,
    fileList: fileList,
    beforeUpload: beforeUpload,
    maxCount: 1,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068'
      },
      size: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`
    }
  };

  /**
   * TODO: 更新失败弹出两次错误消息
   * 更新个人信息
   */
  const updateUserInfo = async () => {
    let avatarUrl = '';
    if (fileList && fileList[0] && valueLength(fileList[0].url)) {
      // @ts-ignore
      avatarUrl = fileList[0].url;
    }
    const res = await updateUserUsingPost({
      // @ts-ignore
      userAvatar: avatarUrl,
      id: loginUser?.id,
      userAccount: userAccount
    });
    if (res.data && res.code === 20000) {
      message.success('修改成功');
      await setInitialState({ loginUser: res.data, settings: Settings });
      await loadData();
    } else {
      message.error(res.msg);
    }
  };

  /**
   * 邮箱绑定请求
   * @param values 邮箱绑定请求
   */
  const handleBindEmailSubmit = async (values: API.UserBindEmailRequest) => {
    try {
      const res = await userBindEmailUsingPost({
        ...values
      });
      if (res.data && res.code === 20000) {
        if (initialState?.settings.navTheme === 'light') {
          setInitialState({ loginUser: res.data, settings: { ...Settings, navTheme: 'light' } });
        } else {
          setInitialState({ loginUser: res.data, settings: { ...Settings, navTheme: 'realDark' } });
        }
        setOpenEmailModal(false);
        message.success('绑定成功');
        await loadData();
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '操作失败！';
      message.error(defaultLoginFailureMessage);
    }
  };

  /**
   * 邮箱解绑
   * @param values 邮箱解绑请求
   */
  const handleUnBindEmailSubmit = async (values: API.UserUnBindEmailRequest) => {
    try {
      const res = await userUnBindEmailUsingPost({ ...values });
      if (res.data && res.code === 20000) {
        if (initialState?.settings.navTheme === 'light') {
          setInitialState({ loginUser: res.data, settings: { ...Settings, navTheme: 'light' } });
        } else {
          setInitialState({
            loginUser: res.data,
            settings: { ...Settings, navTheme: 'realDark' }
          });
        }
        setOpenEmailModal(false);
        message.success('解绑成功');
        await loadData();
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '操作失败！';
      message.error(defaultLoginFailureMessage);
    }
  };

  /**
   * 更新开发者凭证
   */
  const updateDevCred = async () => {
    setVoucherLoading(true);
    const res = await updateDevCredUsingPost();
    if (res.data && res.code === 20000) {
      setInitialState({
        loginUser: res.data,
        settings: Settings
      });
      setTimeout(() => {
        message.success('更新凭证成功');
        setVoucherLoading(false);
        loadData();
      }, 300);
    } else {
      setVoucherLoading(false);
      message.error(res.msg);
    }
  };

  return (
    <Spin spinning={loading}>
      <ProCard type="inner" bordered direction="column">
        <ProCard
          ref={ref1}
          extra={
            <>
              <Tooltip title={'用于接收订单信息'}>
                <Button
                  onClick={() => {
                    setOpenEmailModal(true);
                  }}
                >
                  {loginUser?.email ? '更新邮箱' : '绑定邮箱'}
                </Button>
              </Tooltip>
              <Tooltip title={'提交修改的信息'}>
                <Button style={{ marginLeft: 10 }} onClick={updateUserInfo}>
                  提交修改
                </Button>
              </Tooltip>
            </>
          }
          title={<strong>个人信息设置</strong>}
          type="inner"
          bordered
        >
          <Descriptions.Item>
            <ImgCrop
              rotationSlider
              quality={1}
              aspectSlider
              maxZoom={4}
              cropShape={'round'}
              zoomSlider
              showReset
            >
              <Upload {...props}>{fileList.length >= 1 ? undefined : uploadButton()}</Upload>
            </ImgCrop>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Descriptions.Item>
          <Descriptions column={1}>
            <div>
              <h4 style={{ marginTop: '20px' }}>账号：</h4>
              <Paragraph
                editable={{
                  icon: <EditOutlined />,
                  tooltip: '编辑',
                  onChange: (value) => {
                    setUserAccount(value);
                  }
                }}
              >
                {valueLength(userAccount) ? userAccount : '未设置账号'}
              </Paragraph>
            </div>
            <div>
              <Tooltip title={'邀请好友注册双方都可获得 100 积分'}>
                <h4>邀请码：</h4>
              </Tooltip>
              <Paragraph copyable={valueLength(loginUser?.invitationCode)}>
                {loginUser?.invitationCode}
              </Paragraph>
            </div>
            <div>
              <h4> id： </h4>
              <Paragraph copyable={valueLength(loginUser?.id)}>{loginUser?.id}</Paragraph>
            </div>
            <div>
              <h4>邮箱：</h4>
              <Paragraph copyable={valueLength(loginUser?.email)}>
                {valueLength(loginUser?.email) ? loginUser?.email : '未绑定邮箱'}
              </Paragraph>
            </div>
          </Descriptions>
        </ProCard>
        <br />
        <ProCard
          ref={ref2}
          type={'inner'}
          bordered
          tooltip={'用于平台接口调用'}
          title={<strong>我的钱包</strong>}
          extra={
            <>
              <Button
                onClick={() => {
                  history.push('/recharge/list');
                }}
              >
                充值余额
              </Button>
            </>
          }
        >
          <strong>金币💰：</strong>{' '}
          <span style={{ color: 'red', fontSize: 18 }}>{loginUser?.balance}</span>
          <br />
          <strong>获取更多：</strong>
          <br />
          <Button
            style={{ marginRight: 10, marginBottom: 10 }}
            type={'primary'}
            onClick={() => {
              setOpen(true);
            }}
          >
            邀请好友
          </Button>
          <Button
            loading={dailyCheckInLoading}
            style={{ marginRight: 10 }}
            type={'primary'}
            onClick={async () => {
              setDailyCheckInLoading(true);
              const res = await doDailyCheckInUsingPost();
              if (res.data && res.code === 20000) {
                const res = await getLoginUserUsingGet();
                if (res.data && res.code === 20000) {
                  message.success('签到成功');
                  setInitialState({ loginUser: res.data, settings: Settings });
                }
              }
              setTimeout(() => {
                setDailyCheckInLoading(false);
              }, 1000);
            }}
          >
            <Tooltip
              title={
                <>
                  <p>普通用户每日签到可获取 10 积分</p>
                  <p>VIP 用户每日签到可获取 50 积分</p>
                </>
              }
            >
              每日签到
            </Tooltip>
          </Button>
        </ProCard>
        <br />
        <ProCard
          ref={ref3}
          bordered
          type="inner"
          title={'开发者凭证（调用接口的凭证）'}
          extra={
            <Button loading={voucherLoading} onClick={updateDevCred}>
              {loginUser?.accessKey && loginUser?.secretKey ? '更新' : '生成'}凭证
            </Button>
          }
        >
          {loginUser?.accessKey && loginUser?.secretKey ? (
            <Descriptions column={1}>
              <Descriptions.Item label="AccessKey">
                <Paragraph copyable={valueLength(loginUser?.accessKey)}>
                  {loginUser?.accessKey}
                </Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="SecretKey">
                <Paragraph copyable={valueLength(loginUser?.secretKey)}>
                  {loginUser?.secretKey}
                </Paragraph>
              </Descriptions.Item>
            </Descriptions>
          ) : (
            '暂无凭证，请先生成凭证'
          )}
        </ProCard>
        <br />
        <ProCard
          ref={ref4}
          type="inner"
          title={<strong>开发者 SDK（快速接入 API 接口）</strong>}
          bordered
        >
          <Button size={'large'}>
            <a target={'_blank'} href={API_SDK} rel="noreferrer">
              <VerticalAlignBottomOutlined /> Java SDK
            </a>
          </Button>
        </ProCard>
      </ProCard>
      <SendGiftModal
        invitationCode={loginUser?.invitationCode}
        onCancel={() => {
          setOpen(false);
        }}
        open={open}
      />
      <EmailModal
        unbindSubmit={handleUnBindEmailSubmit}
        bindSubmit={handleBindEmailSubmit}
        data={loginUser}
        onCancel={() => setOpenEmailModal(false)}
        open={openEmailModal}
      />
      <Tour
        open={openTour}
        onClose={() => {
          setOpenTour(false);
          localStorage.setItem('tour', 'true');
        }}
        steps={steps}
      />
    </Spin>
  );
};

export default UserInfo;
