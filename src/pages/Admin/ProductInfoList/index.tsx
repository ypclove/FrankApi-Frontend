import ProductInfoModalFormColumns, {
  ProductInfoColumns
} from '@/pages/Admin/Columns/ProductInfoColumns';
import ModalForm from '@/pages/Admin/Components/ModalForm';
import {
  addProductUsingPost,
  deleteProductUsingPost,
  getProductListByPageUsingGet,
  offlineProductInfoUsingPost,
  onlineProductInfoUsingPost,
  updateProductUsingPost
} from '@/services/FrankApi/productInfoController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Card, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';

const ProductInfoList: React.FC = () => {
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ProductInfo>();

  /**
   * 创建产品
   * @param fields 创建产品请求
   */
  const handleAdd = async (fields: API.ProductInfoAddRequest) => {
    const hide = message.loading('正在添加中...');
    try {
      const res = await addProductUsingPost({
        ...fields
      });
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
   * 更新产品
   * @param fields 更新产品请求
   */
  const handleUpdate = async (fields: API.ProductInfoUpdateRequest) => {
    const hide = message.loading('正在修改中...');
    try {
      const res = await updateProductUsingPost({ id: currentRow?.id, ...fields });
      hide();
      if (res.data && res.code === 20000) {
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
      return false;
    }
  };

  /**
   * 上架产品
   * @param productId 产品 Id
   */
  const handleOnline = async (productId: number | undefined) => {
    const hide = message.loading('上架中...');
    try {
      const res = await onlineProductInfoUsingPost(productId);
      hide();
      if (res.data) {
        message.success('上架成功');
        actionRef.current?.reload();
      } else {
        message.error(res.msg);
      }
    } catch (error: any) {
      hide();
      message.error('上架失败', error.message);
    }
  };

  /**
   * 下架产品
   * @param productId 产品 Id
   */
  const handleOffline = async (productId: number | undefined) => {
    const hide = message.loading('下架中...');
    try {
      const res = await offlineProductInfoUsingPost(productId);
      hide();
      if (res.data) {
        message.success('下架成功');
        actionRef.current?.reload();
      } else {
        message.error(res.msg);
      }
    } catch (error: any) {
      hide();
      message.error('下架失败', error.message);
    }
  };

  /**
   * 删除产品
   * @param productId 产品 Id
   */
  const handleRemove = async (productId: number | undefined) => {
    const hide = message.loading('正在删除...');
    try {
      const res = await deleteProductUsingPost(productId);
      hide();
      if (res.data) {
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

  const columns: ProColumns<API.ProductInfo>[] = [
    ...ProductInfoColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      // 设置列宽度
      width: 150,
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
            title="请确认是否上架该产品？"
            onConfirm={() => handleOnline(record.id)}
            onCancel={cancel}
            okText="是"
            cancelText="否"
          >
            <Button
              type="primary"
              danger
              size={'small'}
              key="auditing"
              onClick={async () => {
                setCurrentRow(record);
              }}
            >
              上架
            </Button>
          </Popconfirm>
        ) : null,
        record.status === 1 ? (
          <Popconfirm
            key={'Normal'}
            title="请确认是否下架该产品？"
            onConfirm={() => handleOffline(record.id)}
            onCancel={cancel}
            okText="是"
            cancelText="否"
          >
            <Button
              type="dashed"
              size={'small'}
              key="offline"
              style={{ color: 'red' }}
              onClick={async () => {
                setCurrentRow(record);
              }}
            >
              下架
            </Button>
          </Popconfirm>
        ) : null,
        <Popconfirm
          key={'Delete'}
          title="请确认是否删除该产品？"
          onConfirm={() => handleRemove(record.id)}
          onCancel={cancel}
          okText="是"
          cancelText="否"
        >
          <Button
            key="Remove"
            type="primary"
            danger
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
  // @ts-ignore
  return (
    <Card>
      <ProTable<API.ProductInfo>
        headerTitle={'商品管理'}
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
          const res = await getProductListByPageUsingGet({ ...params });
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
        title={'添加商品'}
        value={{}}
        open={() => {
          return createModalOpen;
        }}
        onOpenChange={handleModalOpen}
        onSubmit={async (value) => {
          const success = await handleAdd(value as API.ProductInfo);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef?.current.reload();
            }
          }
        }}
        onCancel={() => handleModalOpen(false)}
        columns={ProductInfoModalFormColumns}
        width={'480px'}
        size={'large'}
      />
      <ModalForm
        title={'修改商品信息'}
        open={() => {
          return updateModalOpen;
        }}
        value={currentRow}
        onOpenChange={handleUpdateModalOpen}
        onSubmit={async (value) => {
          const success = await handleUpdate(value as API.ProductInfo);
          if (success) {
            handleUpdateModalOpen(false);
            if (actionRef.current) {
              actionRef?.current.reload();
            }
          }
        }}
        onCancel={() => handleUpdateModalOpen(false)}
        columns={ProductInfoModalFormColumns}
        width={'480px'}
        size={'large'}
      />
    </Card>
  );
};
export default ProductInfoList;
