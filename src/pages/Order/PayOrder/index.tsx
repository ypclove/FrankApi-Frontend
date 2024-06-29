import Alipay from '@/components/Icon/Alipay';
import WxPay from '@/components/Icon/WxPay';
import { USER_AGREEMENT } from '@/constant';
import { valueLength } from '@/pages/User/UserInfo';
import {
  createOrderUsingPost,
  getProductOrderByIdUsingGet,
  queryOrderStatusUsingPost
} from '@/services/FrankApi/productOrderController';
import { useParams } from '@@/exports';
import ProCard from '@ant-design/pro-card';
import { history } from '@umijs/max';
import { Card, message, QRCode, Radio, Spin, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import wechat from '../../../../public/assets/WeChat.jpg';

const PayOrder: React.FC = () => {
  // state: 当前状态的值
  // setState: 用于更新状态的函数
  // initialState: 状态的初始值，可以是任何类型（字符串、数字、对象、数组等）
  // const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<API.ProductOrderVo>();
  const [total, setTotal] = useState<any>('0.00');
  const [status, setStatus] = useState<string>('active');
  const [payType, setPayType] = useState<number>();
  // window.location.href 表示获取当前页面的完整 URL
  // .searchParams 表示获取 URL 中的查询参数部分
  const urlParams = new URL(window.location.href).searchParams;
  const codeUrl = urlParams.get('codeUrl');
  const urlPayType = urlParams.get('payType');
  const [qrCode, setQrCode] = useState<any>('暂未选择支付方式');
  // useParams() 表示获取当前 URL 的动态参数（路径参数）
  // 注意：路径参数解析出来都是字符串（string）类型
  const params = useParams();

  /**
   * 创建订单
   */
  const createOrder = async () => {
    setLoading(true);
    setStatus('loading');

    // 默认解析出的 params.id 是 string 类型，需要转换为 number 类型
    console.log('params: ', params);
    console.log('productId: ', params.id);
    console.log('productId: ', typeof params.id);
    console.log('payType: ', payType);
    console.log('payType: ', typeof payType);
    console.log('Number(params.id): ', Number(params.id));
    console.log('typeof Number(params.id): ', typeof Number(params.id));

    const res = await createOrderUsingPost({ productId: Number(params.id), payType: payType });
    console.log('res=====', res);
    if (res.code === 20000 && res.data) {
      setOrder(res.data);
      console.log('total: ', typeof res.data.total);
      setTotal(res.data.total / 100);
      setStatus('active');
      setLoading(false);
      setQrCode(res.data.codeUrl);
    } else {
      message.error(res.msg);
    }
    if (res.code === 50001) {
      history.back();
    }
  };

  /**
   * 查询订单状态
   */
  const queryOrderStatus = async () => {
    const currentTime = new Date();
    const expirationTime = new Date(order?.expirationTime as any);
    if (currentTime > expirationTime) {
      setStatus('expired');
    }
    return await queryOrderStatusUsingPost({ orderNo: order?.orderNo });
  };

  /**
   * Alipay
   */
  const toAlipay = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    const res = await createOrderUsingPost({ productId: Number(params.id), payType: 1 });
    console.log('params: ', params);
    if (res.code === 20000 && res.data) {
      message.loading('正在前往收银台，请稍后....');
      setTimeout(() => {
        document.write(res?.data?.formData as string);
        setLoading(false);
      }, 2000);
    } else {
      setLoading(false);
    }
  };
  const changePayType = (value: number) => {
    setPayType(value);
  };

  /**
   * 根据订单 Id 获取订单
   */
  const getOrder = async (orderId: string | undefined) => {
    const res = await getProductOrderByIdUsingGet(orderId);
    console.log('根据订单 Id 获取订单', res);
    if (res.code === 20000 && res.data) {
      const data = {
        productInfo: res.data,
        orderNo: res.data.orderNo,
        codeUrl: res.data.codeUrl
      };
      // @ts-ignore
      setOrder(data);
      // @ts-ignore
      setTotal(res.data.total);
      setStatus('active');
      setLoading(false);
      setQrCode(res.data.codeUrl);
    }
  };

  useEffect(() => {
    if (urlPayType) {
      setPayType(urlPayType);
      getOrder();
    }
  }, []);

  useEffect(() => {
    if (payType === 2) {
      toAlipay();
    }
    if (payType === 1 && !codeUrl) {
      createOrder();
    }
  }, [payType]);

  useEffect(() => {
    if (order && order.orderNo && order.codeUrl) {
      const intervalId = setInterval(async () => {
        // 定时任务逻辑
        const res = await queryOrderStatus();
        if (res.data && res.code === 20000) {
          setLoading(true);
          message.loading('支付成功,打款中....');
          clearInterval(intervalId);
          setTimeout(function () {
            setLoading(false);
            const urlParams = new URL(window.location.href).searchParams;
            history.push(urlParams.get('redirect') || '/account/center');
          }, 2000);
        } else {
          console.log('支付中...');
        }
      }, 3000);
      if (status === 'expired') {
        clearInterval(intervalId);
      }
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [order, status]);

  useEffect(() => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    // 判断是否为手机设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (codeUrl) {
      if (isMobile) {
        window.location.href = codeUrl;
        return;
      }
      setQrCode(codeUrl);
      setStatus('active');
      setPayType(1);
      return;
    }
    if (!urlPayType && !payType) {
      setPayType(1);
      setStatus('loading');
      return;
    }
    if (urlPayType) {
      setPayType(urlPayType);
      return;
    }
    createOrder();
  }, []);
  return (
    <>
      <Card style={{ minWidth: 385 }}>
        <Spin spinning={loading}>
          <Card title={<strong>商品信息</strong>}>
            <div style={{ marginLeft: 10 }}>
              <h3>{order?.productInfo?.name}</h3>
              <h4>
                {valueLength(order?.productInfo?.description)
                  ? order?.productInfo?.description
                  : '暂无商品描述信息'}
              </h4>
            </div>
          </Card>
          <br />
          <ProCard bordered headerBordered layout={'center'} title={<strong>支付方式</strong>}>
            <Radio.Group name="payType" value={payType}>
              <ProCard wrap gutter={18}>
                <ProCard
                  onClick={() => {
                    changePayType(1);
                  }}
                  hoverable
                  style={{
                    border:
                      payType === 1 ? '1px solid #1890ff' : '1px solid rgba(128, 128, 128, 0.5)',
                    maxWidth: 260,
                    minWidth: 210,
                    margin: 10
                  }}
                  colSpan={{
                    xs: 24,
                    sm: 12,
                    md: 12,
                    lg: 12,
                    xl: 12
                  }}
                >
                  <Radio value={1} style={{ fontSize: '1.12rem' }}>
                    <WxPay /> 微信支付
                  </Radio>
                </ProCard>
                <ProCard
                  onClick={() => {
                    changePayType(2);
                  }}
                  hoverable
                  style={{
                    margin: 10,
                    maxWidth: 260,
                    minWidth: 210,
                    border:
                      payType === 2 ? '1px solid #1890ff' : '1px solid rgba(128, 128, 128, 0.5)'
                  }}
                  colSpan={{
                    xs: 24,
                    sm: 12,
                    md: 12,
                    lg: 12,
                    xl: 12
                  }}
                >
                  <Radio value={2} style={{ fontSize: '1.2rem' }}>
                    <Alipay /> 支付宝
                  </Radio>
                </ProCard>
              </ProCard>
            </Radio.Group>
          </ProCard>
          <br />
          <Card title={'支付二维码'}>
            <br />
            <ProCard style={{ marginTop: -30 }} layout={'center'}>
              <QRCode
                errorLevel="H"
                size={240}
                value={qrCode}
                // @ts-ignore
                status={status}
                onRefresh={() => {
                  if (!payType) {
                    message.error('请先选择支付方式');
                    return;
                  }
                  createOrder();
                }}
              />
            </ProCard>
            <ProCard
              style={{
                marginTop: -30,
                color: '#f55f4e',
                fontSize: 22,
                display: 'flex',
                fontWeight: 'bold'
              }}
              layout={'center'}
            >
              ￥{total}
            </ProCard>
            <ProCard style={{ marginTop: -20 }} layout={'center'}>
              <span>
                本产品为虚拟产品，购买后<strong style={{ color: 'red' }}>不支持退换</strong>
                。确认支付表示您已阅读并接受
                <a target={'_blank'} href={USER_AGREEMENT} rel="noreferrer">
                  {' '}
                  用户协议{' '}
                </a>
                如付款成功后 10 分钟后未到账，请联系站长微信：
                <Tooltip
                  placement="bottom"
                  title={<img src={wechat} alt="微信 code_nav" width="120" />}
                >
                  <a>Frank</a>
                </Tooltip>
              </span>
            </ProCard>
          </Card>
        </Spin>
      </Card>
    </>
  );
};

export default PayOrder;
