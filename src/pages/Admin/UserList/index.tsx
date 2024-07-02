import ModalForm from '@/pages/Admin/Components/ModalForm';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Card, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';

import UserColumns, {
  UserAddModalFormColumns,
  UserUpdateModalFormColumns
} from '@/pages/Admin/Columns/UserColumns';

import {
  addUserUsingPost,
  banUserUsingPost,
  deleteUserUsingDelete,
  getUserListByPageUsingGet,
  normalUserUsingPost,
  updateUserUsingPost
} from '@/services/FrankApi/userController';

const UserList: React.FC = () => {
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserVO>();

  /**
   * 添加用户
   * @param fields 添加用户的字段
   */
  const handleAdd = async (fields: API.UserRequest) => {
    const hide = message.loading('正在添加');
    try {
      const res = await addUserUsingPost({
        ...fields
      });
      if (res.data && res.code === 20000) {
        hide();
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
   * 更新用户
   * @param fields 用户修改的字段
   */
  const handleUpdate = async (fields: API.UserRequest) => {
    const hide = message.loading('修改中');
    try {
      const res = await updateUserUsingPost({ id: currentRow?.id, ...fields });
      if (res.data && res.code === 20000) {
        hide();
        message.success('修改成功');
        actionRef.current?.reload();
        return true;
      } else {
        message.error(res.msg);
        return false;
      }
    } catch (error: any) {
      hide();
      message.error('修改失败' + error.message);
    }
  };

  /**
   * 删除用户
   * @param record 用户
   */
  const handleRemove = async (record: API.UserRequest) => {
    const hide = message.loading('正在删除');
    try {
      const res = await deleteUserUsingDelete({
        id: record.id
      });
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

  /**
   * 封号
   * @param record 用户
   */
  const handleBanUser = async (record: API.UserRequest) => {
    const hide = message.loading('封号中');
    try {
      const res = await banUserUsingPost({
        id: record.id
      });
      hide();
      if (res.data && res.code === 20000) {
        message.success('封号成功');
        actionRef.current?.reload();
        return true;
      } else {
        message.error('封禁失败');
        return false;
      }
    } catch (error: any) {
      hide();
      message.error(error.message);
      return false;
    }
  };

  /**
   * 解封
   * @param record 用户
   */
  const handleNormalUser = async (record: API.UserRequest) => {
    const hide = message.loading('解封中');
    try {
      const res = await normalUserUsingPost({
        id: record.id
      });
      hide();
      if (res.data && res.code === 20000) {
        message.success('解封成功');
        actionRef.current?.reload();
      } else {
        message.error(res.msg);
      }
    } catch (error: any) {
      hide();
      message.error(error.message);
    }
  };

  const cancel = () => {
    message.success('取消成功');
  };

  const columns: ProColumns<API.UserVO>[] = [
    ...UserColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      width: 180, // 设置列宽度
      render: (_, record: API.UserVO) => [
        <Button
          type="primary"
          key="update"
          size={'small'}
          onClick={() => {
            setCurrentRow(record);
            handleUpdateModalOpen(true);
          }}
        >
          修改
        </Button>,
        record.status === 1 ? (
          <Popconfirm
            key={'Normal'}
            title="请确认是否解封该用户？"
            onConfirm={() => handleNormalUser(record)}
            onCancel={cancel}
            okText="是"
            cancelText="否"
          >
            <Button
              danger
              key="normal"
              size={'small'}
              onClick={async () => {
                setCurrentRow(record);
              }}
            >
              解封
            </Button>
          </Popconfirm>
        ) : null,
        record.status === 0 ? (
          <Popconfirm
            key={'Ban'}
            title="请确认是否封禁该用户？"
            onConfirm={() => handleBanUser(record)}
            onCancel={cancel}
            okText="是"
            cancelText="否"
          >
            <Button
              type="primary"
              danger
              key="ban"
              size={'small'}
              onClick={async () => {
                setCurrentRow(record);
              }}
            >
              封号
            </Button>
          </Popconfirm>
        ) : null,
        <Popconfirm
          key={'Delete'}
          title="请确认是否删除该用户？"
          onConfirm={() => handleRemove(record)}
          onCancel={cancel}
          okText="是"
          cancelText="否"
        >
          <Button
            type="primary"
            danger
            key="Remove"
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
      <ProTable<API.UserVO>
        headerTitle={'用户管理'}
        actionRef={actionRef}
        rowKey="user"
        loading={loading}
        search={{
          labelWidth: 100
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
        pagination={{ defaultPageSize: 10, position: ['bottomCenter'] }}
        request={async (params) => {
          setLoading(true);
          const res = await getUserListByPageUsingGet({ ...params });
          if (res.data && res.code === 20000) {
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
        title={'添加用户'}
        value={{}}
        open={() => {
          return createModalOpen;
        }}
        onOpenChange={handleModalOpen}
        onSubmit={async (value) => {
          const success = await handleAdd(value as API.UserVO);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              await actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalOpen(false)}
        columns={UserAddModalFormColumns}
        width={'480px'}
      />
      <ModalForm
        title={'修改用户信息'}
        open={() => {
          return updateModalOpen;
        }}
        value={currentRow}
        onOpenChange={handleUpdateModalOpen}
        onSubmit={async (value) => {
          const res = await handleUpdate(value as API.UserVO);
          if (res) {
            handleUpdateModalOpen(false);
            if (actionRef.current) {
              await actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleUpdateModalOpen(false)}
        columns={UserUpdateModalFormColumns}
        width={'480px'}
      />
    </Card>
  );
};
export default UserList;
