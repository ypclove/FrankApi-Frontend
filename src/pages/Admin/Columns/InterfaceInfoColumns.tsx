import ParamsTable from '@/components/ParamsTable';
import { NewRequestColumn, NewResponseColumn } from '@/components/ParamsTable/components/type';
import { InterfaceRequestMethodEnum } from '@/enum/commonEnum';
import { Link } from '@@/exports';
import { ProColumns, ProFormColumnsType } from '@ant-design/pro-components';
import { Tag } from 'antd';

export const defaultNewRequestColumn: NewRequestColumn = {
  fieldName: '',
  required: '是',
  type: 'string',
  desc: ''
};

export const defaultNewResponseColumn: NewResponseColumn = {
  fieldName: '',
  type: 'string',
  desc: ''
};

export const requestParam: ProColumns[] = [
  {
    title: '参数名称',
    dataIndex: 'fieldName',
    formItemProps: {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '此项是必填项'
        }
      ]
    }
  },
  {
    title: '必填',
    valueType: 'select',
    dataIndex: 'required',
    valueEnum: {
      是: { text: '是' },
      否: { text: '否' }
    },
    formItemProps: {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '此项是必填项'
        }
      ]
    }
  },
  {
    title: '参数类型',
    dataIndex: 'type',
    valueEnum: {
      int: { text: 'int' },
      string: { text: 'string' },
      long: { text: 'long' },
      boolean: { text: 'boolean' },
      double: { text: 'double' },
      object: { text: 'object' }
    },
    valueType: 'select',
    formItemProps: {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '此项是必填项'
        }
      ]
    }
  },
  {
    title: '描述',
    dataIndex: 'desc'
  }
];

export const responseParam: ProColumns[] = [
  {
    title: '参数名称',
    dataIndex: 'fieldName',
    formItemProps: {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '此项是必填项'
        }
      ]
    }
  },
  {
    title: '参数类型',
    dataIndex: 'type',
    valueEnum: {
      int: { text: 'int' },
      string: { text: 'string' },
      long: { text: 'long' },
      boolean: { text: 'boolean' },
      double: { text: 'double' },
      object: { text: 'object' }
    },
    valueType: 'select',
    formItemProps: {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '此项是必填项'
        }
      ]
    }
  },
  {
    title: '描述',
    dataIndex: 'desc'
  }
];

export const InterfaceInfoModalFormColumns: ProFormColumnsType<API.ProductInfo, 'text'>[] = [
  {
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: 'id'
  },
  {
    title: '接口名称',
    dataIndex: 'name',
    tooltip: '接口名称',
    key: 'name',
    formItemProps: {
      rules: [
        // {
        //   required: true,
        //   message: '接口名称不能为空'
        // },
        // {
        //   max: 50,
        //   message: '接口名称长度不能超过 50 字符'
        // }
      ]
    },
    width: 'lg'
  },
  {
    title: '接口地址',
    dataIndex: 'url',
    tooltip: '接口地址',
    formItemProps: {
      rules: [
        // {
        //   required: true,
        //   message: '接口地址不能为空'
        // },
        // {
        //   type: 'url',
        //   message: '接口地址格式有误'
        // },
        // {
        //   max: 200,
        //   message: '接口地址长度长度不能超过 200 字符'
        // }
      ]
    },
    key: 'url',
    width: 'lg'
  },
  {
    title: '请求方法',
    dataIndex: 'method',
    tooltip: '请求方法',
    valueType: 'radio',
    key: 'method',
    valueEnum: {
      1: {
        text: 'GET'
      },
      2: {
        text: 'POST'
      },
      3: {
        text: 'PUT'
      },
      4: {
        text: 'DELETE'
      }
    },
    formItemProps: {
      rules: [
        // {
        //   required: true,
        //   message: '请求方法不能为空'
        // }
      ]
    },
    width: 'lg',
    colProps: {
      span: 12
    }
  },
  {
    title: '扣除积分个数',
    dataIndex: 'reduceScore',
    tooltip: '扣除积分个数',
    width: 'lg',
    key: 'reduceScore',
    colProps: {
      span: 12
    },
    formItemProps: {
      rules: [
        // () => ({
        //   validator(_, value) {
        //     if (!value) {
        //       return Promise.reject(new Error('扣除积分个数不能为空'));
        //     }
        //     if (value < 1) {
        //       return Promise.reject(new Error('扣除积分个数不能小于 1'));
        //     }
        //     return Promise.resolve();
        //   }
        // })
      ]
    }
  },
  {
    title: '请求示例',
    key: 'requestExample',
    dataIndex: 'description',
    width: 'lg',
    valueType: 'text',
    colProps: {
      span: 12
    }
  },
  {
    title: '返回格式',
    key: 'returnFormat',
    dataIndex: 'returnFormat',
    width: 'lg',
    valueType: 'text',
    colProps: {
      span: 12
    }
  },
  {
    title: '请求参数',
    dataIndex: 'requestParams',
    tooltip: '请求参数',
    key: 'requestParams',
    colProps: {
      span: 24
    },
    renderFormItem: () => (
      <ParamsTable column={requestParam} defaultNewColumn={defaultNewRequestColumn} />
    )
  },
  {
    title: '响应参数',
    dataIndex: 'responseParams',
    tooltip: '响应参数',
    key: 'responseParams',
    colProps: {
      span: 24
    },
    renderFormItem: () => (
      <ParamsTable column={responseParam} defaultNewColumn={defaultNewResponseColumn} />
    )
  },
  {
    title: '接口描述',
    key: 'description',
    dataIndex: 'description',
    tooltip: '接口描述',
    width: 'lg',
    valueType: 'jsonCode',
    formItemProps: {
      // rules: [
      //   {
      //     max: 100,
      //     message: '接口描述长度不能超过 100 字符'
      //   }
      // ]
    },
    colProps: {
      span: 12
    }
  },
  {
    title: '请求头',
    dataIndex: 'requestHeader',
    width: 'lg',
    valueType: 'jsonCode',
    colProps: {
      span: 12
    },
    key: 'requestHeader'
  }
];

const InterfaceInfoColumns: ProColumns<API.InterfaceInfo>[] = [
  {
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: 'id'
  },
  {
    title: '接口名称',
    align: 'center',
    dataIndex: 'name',
    copyable: true,
    valueType: 'text',
    render: (_, record) => (
      <Link key={record.id} to={`/interface_info/${record.id}`}>
        {record.name}
      </Link>
    ),
    ellipsis: true,
    key: 'name'
  },
  {
    title: '接口地址',
    align: 'center',
    dataIndex: 'url',
    valueType: 'text',
    ellipsis: true,
    copyable: true,
    key: 'url'
  },
  {
    title: '扣除积分个数',
    align: 'center',
    dataIndex: 'reduceScore',
    valueType: 'text',
    width: 80,
    key: 'reduceScore'
  },
  {
    title: '总调用次数',
    align: 'center',
    dataIndex: 'totalInvokes',
    valueType: 'text',
    search: false,
    key: 'totalInvokes'
  },
  {
    title: '请求参数',
    align: 'center',
    dataIndex: 'requestParams',
    valueType: 'text',
    search: false,
    width: 120,
    ellipsis: true,
    copyable: true,
    key: 'requestParams'
  },
  {
    title: '状态',
    align: 'center',
    filters: true,
    onFilter: true,
    width: 100,
    dataIndex: 'status',
    key: 'status',
    valueEnum: {
      0: {
        text: '关闭',
        status: 'Error'
      },
      1: {
        text: '开启',
        status: 'Success'
      },
      2: {
        text: '审核中',
        status: 'Processing'
      }
    }
  },
  {
    title: '请求类型',
    align: 'center',
    dataIndex: 'method',
    filters: true,
    width: 100,
    onFilter: true,
    valueType: 'text',
    key: 'method',
    render: (_, record) => (
      <Tag color={InterfaceRequestMethodEnum[record.method ?? 'default']}>
        {
          // @ts-ignore
          InterfaceInfoColumns.find((col) => col.dataIndex === 'method')?.valueEnum[record.method]
            ?.text
        }
      </Tag>
    ),
    valueEnum: {
      1: {
        text: 'GET'
      },
      2: {
        text: 'POST'
      },
      3: {
        text: 'PUT'
      },
      4: {
        text: 'DELETE'
      }
    }
  }
];

export default InterfaceInfoColumns;
