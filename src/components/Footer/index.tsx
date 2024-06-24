import wechat from '@/../public/assets/WeChat.jpg';
import { BLOG_LINK, DMS_LINK, GITHUB_LINK, NISMSP_LINK, POLICE_AVATAR } from '@/constant';
import {
  GithubOutlined,
  InfoCircleOutlined,
  ReadOutlined,
  WechatOutlined
} from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import { Tooltip } from 'antd';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'Frank工作室出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none'
      }}
      // @ts-ignore
      copyright={
        <>
          {`${currentYear} ${defaultMessage}`} |{' '}
          <a target={'_blank'} href={DMS_LINK} rel="noreferrer">
            {' '}
            豫ICP备2023004098号-1
          </a>
          {' | '}
          <a target={'_blank'} href={NISMSP_LINK} rel="noreferrer">
            <img src={POLICE_AVATAR} width="20" height="20" alt={'豫公网安备 41172702000163 号'} />{' '}
            豫公网安备 41172702000163 号
          </a>
        </>
      }
      links={[
        {
          key: 'github',
          title: (
            <Tooltip title="查看本站技术及源码，欢迎 star">
              <GithubOutlined /> 支持项目
            </Tooltip>
          ),
          href: GITHUB_LINK,
          blankTarget: true
        },
        {
          key: 'blog',
          title: (
            <Tooltip title="欢迎访问我的博客">
              <ReadOutlined /> 我的博客
            </Tooltip>
          ),
          href: BLOG_LINK,
          blankTarget: true
        },
        {
          key: 'contact',
          title: (
            <Tooltip title={<img src={wechat} alt="微信 code_nav" width="120" />}>
              <WechatOutlined /> 联系作者
            </Tooltip>
          ),
          // TODO: 添加联系作者链接
          href: '',
          blankTarget: true
        },
        {
          key: 'info',
          title: (
            <>
              <InfoCircleOutlined /> 免责声明
            </>
          ),
          // TODO: 添加免责声明链接
          href: '',
          blankTarget: true
        }
      ]}
    />
  );
};
export default Footer;
