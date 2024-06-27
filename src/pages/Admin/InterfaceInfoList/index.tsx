import InterfaceInfoColumns, {
  InterfaceInfoModalFormColumns
} from '@/pages/Admin/Columns/InterfaceInfoColumns';

import ModalForm from '@/pages/Admin/Components/ModalForm';
import {
  addInterfaceUsingPost,
  deleteInterfaceUsingDelete,
  getInterfaceListByPageUsingGet,
  offlineInterfaceInfoUsingPost,
  onlineInterfaceInfoUsingPost,
  updateInterfaceUsingPost
} from '@/services/FrankApi/interfaceInfoController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Card, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';

const InterfaceInfoList: React.FC = () => {
  /**
   * 新建窗口的弹窗
   */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * 分布更新窗口的弹窗
   */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();

  /**
   * 创建接口
   * TODO: 创建失败会连续报两次错
   * @param fields 接口创建请求
   */
  const handleAdd = async (fields: API.InterfaceInfoAddRequest) => {
    const hide = message.loading('正在创建');
    try {
      const res = await addInterfaceUsingPost({
        ...fields
      });
      // 确保在返回消息之前隐藏加载提示
      hide();
      if (res.data && res.code === 20000) {
        message.success('添加成功');
        actionRef.current?.reload();
        return true;
      } else {
        message.error(res.msg);
        return false;
      }
    } catch (error: any) {
      hide();
      message.error('添加失败' + error.message);
      return false;
    }
  };

  /**
   * 更新接口
   * TODO: 更新失败会连续报两次错
   * @param fields 接口更新请求
   */
  const handleUpdate = async (fields: API.InterfaceInfoUpdateRequest) => {
    const hide = message.loading('修改中');
    try {
      if (fields) {
        if (fields.responseParams) {
          if (typeof fields.responseParams === 'string') {
            const parseValue = JSON.parse(fields.responseParams);
            fields.responseParams = [...parseValue];
          }
        } else {
          fields.responseParams = [];
        }
        if (fields.requestParams) {
          if (typeof fields.requestParams === 'string') {
            const parseValue = JSON.parse(fields.requestParams);
            fields.requestParams = [...parseValue];
          }
        } else {
          fields.requestParams = [];
        }
        const res = await updateInterfaceUsingPost({ id: currentRow?.id, ...fields });
        hide();
        if (res.data && res.code === 20000) {
          message.success('修改成功');
          actionRef.current?.reload();
          return true;
        } else {
          message.error(res.msg);
          return false;
        }
      }
    } catch (error: any) {
      hide();
      message.error('修改失败' + error.message);
    }
  };

  /**
   * 开启接口
   * @param interfaceId 接口 Id
   */
  const handleOnline = async (interfaceId: number | undefined) => {
    const hide = message.loading('开启中');
    try {
      const res = await onlineInterfaceInfoUsingPost(interfaceId);
      hide();
      if (res.data && res.code === 20000) {
        message.success('开启成功');
        actionRef.current?.reload();
      } else {
        message.error(res.msg);
      }
    } catch (error: any) {
      hide();
      message.error(error.message);
    }
  };

  /**
   * 关闭接口
   * @param interfaceId 接口 Id
   */
  const handleOffline = async (interfaceId: number | undefined) => {
    const hide = message.loading('关闭中');
    try {
      const res = await offlineInterfaceInfoUsingPost(interfaceId);
      hide();
      if (res.data && res.code === 20000) {
        message.success('关闭成功');
        actionRef.current?.reload();
      } else {
        message.error(res.msg);
      }
    } catch (error: any) {
      hide();
      message.error(error.message);
    }
  };

  /**
   * 删除接口
   * @param interfaceId 接口 Id
   */
  const handleRemove = async (interfaceId: number | undefined) => {
    const hide = message.loading('正在删除');
    try {
      const res = await deleteInterfaceUsingDelete(interfaceId);
      hide();
      if (res.data && res.code === 20000) {
        message.success('删除成功');
        actionRef.current?.reload();
      } else {
        message.error(res.msg);
      }
    } catch (error: any) {
      hide();
      message.error('删除失败', error.message);
    }
  };

  const cancel = () => {
    message.success('取消成功');
  };

  const columns: ProColumns<API.InterfaceInfo>[] = [
    ...InterfaceInfoColumns,
    {
      title: '操作',
      align: 'center',
      width: 180, // 设置列宽度
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="update"
          type="primary"
          size={'small'}
          onClick={() => {
            setCurrentRow(record);
            handleUpdateModalOpen(true);
          }}
        >
          修改
        </Button>,
        record.status === 0 ? (
          <Popconfirm
            key={'Normal'}
            title="请确认是否开启该接口？"
            onConfirm={() => handleOnline(record.id)}
            onCancel={cancel}
            okText="是"
            cancelText="否"
          >
            <Button
              danger
              key="auditing"
              type="dashed"
              size={'small'}
              onClick={async () => {
                setCurrentRow(record);
              }}
            >
              开启
            </Button>
          </Popconfirm>
        ) : null,
        record.status === 1 ? (
          <Popconfirm
            key={'Normal'}
            title="请确认是否关闭该接口？"
            onConfirm={() => handleOffline(record.id)}
            onCancel={cancel}
            okText="是"
            cancelText="否"
          >
            <Button
              danger
              key="online"
              type="primary"
              size={'small'}
              onClick={async () => {
                setCurrentRow(record);
              }}
            >
              关闭
            </Button>
          </Popconfirm>
        ) : null,
        <Popconfirm
          key={'Delete'}
          title="请确认是否删除该接口？"
          onConfirm={() => handleRemove(record.id)}
          onCancel={cancel}
          okText="是"
          cancelText="否"
        >
          <Button
            danger
            key="Remove"
            type="primary"
            size={'small'}
            onClick={async () => {
              setCurrentRow(record);
            }}
          >
            删除
          </Button>
        </Popconfirm>
      ]
    }
  ];
  return (
    <Card>
      <ProTable<API.InterfaceInfo>
        headerTitle={'接口管理'}
        actionRef={actionRef}
        rowKey="key"
        loading={loading}
        search={{
          labelWidth: 120
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>
        ]}
        pagination={{
          defaultPageSize: 10,
          position: ['bottomCenter']
        }}
        request={async (params) => {
          setLoading(true);
          const res = await getInterfaceListByPageUsingGet({ userId: 0, ...params });
          if (res.data) {
            setLoading(false);
            return {
              data: res.data.records || [],
              success: true,
              total: res.data.total
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0
            };
          }
        }}
        columns={columns}
      />
      <ModalForm
        title={'添加接口'}
        value={{}}
        open={() => {
          return createModalOpen;
        }}
        onOpenChange={handleModalOpen}
        onSubmit={async (value) => {
          const success = await handleAdd(value as API.InterfaceInfoAddRequest);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current?.reload();
            }
          }
        }}
        onCancel={() => handleModalOpen(false)}
        columns={InterfaceInfoModalFormColumns}
        width={'840px'}
      />
      <ModalForm
        title={'修改接口'}
        open={() => {
          return updateModalOpen;
        }}
        value={currentRow}
        onOpenChange={handleUpdateModalOpen}
        onSubmit={async (value) => {
          const success = await handleUpdate(value as API.InterfaceInfoUpdateRequest);
          if (success) {
            handleUpdateModalOpen(false);
            if (actionRef.current) {
              actionRef.current?.reload();
            }
          }
        }}
        onCancel={() => handleUpdateModalOpen(false)}
        columns={InterfaceInfoModalFormColumns}
        width={'840px'}
      />
    </Card>
  );
};
export default InterfaceInfoList;
