import { ProColumns, ProFormColumnsType } from '@ant-design/pro-components';

export const ProductInfoModalFormColumns: ProFormColumnsType<API.ProductInfo, 'text'>[] = [
  {
    title: 'id',
    valueType: 'index',
    dataIndex: 'id',
    hideInTable: true,
    key: 'id'
  },
  {
    title: '产品名称',
    dataIndex: 'name',
    tooltip: '产品名称',
    key: 'name',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '产品名称不能为空'
        },
        {
          max: 50,
          message: '产品名称长度不能超过 50 字符'
        }
      ]
    },
    width: 'lg',
    colProps: {
      span: 24
    }
  },
  {
    title: '产品类型',
    dataIndex: 'productType',
    key: 'productType',
    valueEnum: {
      1: {
        text: 'VIP会员'
      },
      2: {
        text: '积分充值'
      },
      3: {
        text: '充值活动'
      }
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '产品类型不能为空'
        }
      ]
    }
  },
  {
    tooltip: '本产品购买后增加的积分数',
    title: '增加积分数',
    dataIndex: 'addPoints',
    key: 'addPoints',
    formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (!value) {
              return Promise.reject(new Error('增加积分数不能为空'));
            }
            if (value < 0) {
              return Promise.reject(new Error('增加积分不能为负数'));
            }
            return Promise.resolve();
          },
          required: true
        })
      ]
    },
    width: 'lg',
    colProps: {
      span: 24
    }
  },
  {
    tooltip: '本商品的售卖金额，1元等于100分',
    title: '产品金额（单位：分）',
    dataIndex: 'total',
    key: 'total',
    formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (!value) {
              return Promise.reject(new Error('产品金额不能为空'));
            }
            if (value < 0) {
              return Promise.reject(new Error('产品金额不能为负数'));
            }
            return Promise.resolve();
          },
          required: true
        })
      ]
    },
    width: 'lg',
    colProps: {
      span: 24
    }
  },
  {
    tooltip: '产品的描述信息',
    title: '产品描述',
    key: 'description',
    dataIndex: 'description',
    width: 'lg',
    formItemProps: {
      rules: [
        {
          max: 200,
          message: '产品描述长度不能超过 200 字符'
        }
      ]
    },
    colProps: {
      span: 24
    }
  }
];

export const ProductInfoColumns: ProColumns<API.ProductInfo>[] = [
  {
    dataIndex: 'id',
    align: 'center',
    valueType: 'index',
    hideInTable: true,
    key: 'id'
  },
  {
    title: '产品名称',
    dataIndex: 'name',
    align: 'center',
    copyable: true,
    valueType: 'text',
    ellipsis: true,
    key: 'name'
  },
  {
    title: '产品金额',
    align: 'center',
    dataIndex: 'total',
    valueType: 'text',
    key: 'total'
    // TODO: 设置金额单位为元
  },
  {
    title: '增加积分数',
    align: 'center',
    dataIndex: 'addPoints',
    valueType: 'text',
    key: 'addPoints'
  },
  {
    title: '产品描述',
    align: 'center',
    dataIndex: 'description',
    valueType: 'textarea',
    copyable: true,
    ellipsis: true,
    key: 'description'
  },
  {
    title: '产品状态',
    align: 'center',
    filters: true,
    onFilter: true,
    dataIndex: 'status',
    key: 'status',
    valueEnum: {
      0: {
        text: '下架',
        status: 'Error'
      },
      1: {
        text: '上架',
        status: 'Success'
      },
      2: {
        text: '审核中',
        status: 'Processing'
      }
    }
  },
  {
    title: '产品类型',
    align: 'center',
    dataIndex: 'productType',
    filters: true,
    onFilter: true,
    valueType: 'text',
    key: 'productType',
    valueEnum: {
      1: {
        text: 'VIP'
      },
      2: {
        text: '积分充值'
      },
      3: {
        text: '充值活动'
      }
    }
  },
  {
    title: '更新时间',
    align: 'center',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    search: false,
    key: 'updateTime'
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    search: false,
    key: 'createTime'
  }
];

export default ProductInfoModalFormColumns;
