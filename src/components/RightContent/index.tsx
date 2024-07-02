import { INTERFACE_DEV_DOC } from '@/constant';
import { PlusOutlined } from '@ant-design/icons';
import '@umijs/max';
import { Button } from 'antd';

export type SiderTheme = 'light' | 'dark';
export const Release = () => {
  return (
    <Button shape="round" key="1">
      <PlusOutlined /> 发布接口{' '}
    </Button>
  );
};
export const Docs = () => {
  return (
    <span
      className="anticon"
      style={{ fontSize: 14, fontWeight: 'bold' }}
      onClick={() => {
        window.open(INTERFACE_DEV_DOC, '_blank');
      }}
    >
      📘接口开发文档
    </span>
  );
};

export const helloWord = `
 ______               _                    _
|  ____|             | |       /\\         (_)
| |__ _ __ __ _ _ __ | | __   /  \\   _ __  _
|  __| '__/ _\` | '_ \\| |/ /  / /\\ \\ | '_ \\| |
| |  | | | (_| | | | |   <  / ____ \\| |_) | |
|_|  |_|  \\__,_|_| |_|_|\\_\\/_/    \\_\\ .__/|_|
                                    | |
                                    |_|      
`;
