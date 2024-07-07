import { UserGenderEnum } from '@/enum/commonEnum';
import { ProColumns, ProFormColumnsType } from '@ant-design/pro-components';
import { Tag } from 'antd';

export const UserAddModalFormColumns: ProFormColumnsType<API.UserVO, 'text'>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: 'id'
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    key: 'userAccount',
    formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (!value || value.length < 0) {
              return Promise.reject(new Error('账号不能为空'));
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
    title: '密码',
    key: 'userPassword',
    dataIndex: 'userPassword',
    width: 'lg',
    colProps: {
      span: 24
    },
    formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (!value || value.length < 0) {
              return Promise.reject(new Error('密码不能为空'));
            }
            return Promise.resolve();
          },
          required: true
        })
      ]
    }
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    valueType: 'radio',
    valueEnum: {
      0: {
        text: '女'
      },
      1: {
        text: '男'
      }
    },
    width: 'lg',
    colProps: {
      span: 24
    }
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'radio',
    key: 'userRole',
    valueEnum: {
      0: {
        text: '管理员'
      },
      1: {
        text: '普通用户'
      }
    }
  }
];
export const UserUpdateModalFormColumns: ProFormColumnsType<API.UserVO, 'text'>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: 'id'
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    key: 'userAccount',
    width: 'lg',
    colProps: {
      span: 24
    }
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    valueType: 'radio',
    valueEnum: {
      1: {
        text: '男'
      },
      0: {
        text: '女'
      }
    },
    width: 'lg',
    colProps: {
      span: 24
    }
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'radio',
    key: 'userRole',
    valueEnum: {
      0: {
        text: '管理员'
      },
      1: {
        text: '普通用户'
      }
    }
  },
  {
    title: '积分',
    key: 'balance',
    dataIndex: 'balance',
    width: 'lg',
    colProps: {
      span: 24
    },
    formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (value && value < 0) {
              return Promise.reject(new Error('积分设置不正确'));
            }
            return Promise.resolve();
          }
        })
      ]
    }
  }
  // {
  //   title: '密码',
  //   key: 'userPassword',
  //   dataIndex: 'userPassword',
  //   width: 'lg',
  //   colProps: {
  //     span: 24
  //   },
  //   formItemProps: {
  //     rules: [
  //       () => ({
  //         validator(_, value) {
  //           if (value && value.length < 0) {
  //             return Promise.reject(new Error('密码不能为空'));
  //           }
  //           return Promise.resolve();
  //         }
  //       })
  //     ]
  //   }
  // }
];
export const UserColumns: ProColumns<API.UserVO>[] = [
  {
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: 'id'
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    valueType: 'text',
    copyable: true,
    key: 'userAccount',
    align: 'center',
    width: 70
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
    valueType: 'image',
    key: 'userAvatar',
    search: false,
    align: 'center'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    valueType: 'text',
    copyable: true,
    key: 'email',
    align: 'center'
  },
  {
    title: '积分',
    dataIndex: 'balance',
    valueType: 'text',
    copyable: true,
    key: 'balance',
    align: 'center',
    // @ts-ignore
    sorter: (a, b) => a.balance - b.balance
  },
  {
    title: '邀请码',
    dataIndex: 'invitationCode',
    valueType: 'text',
    copyable: true,
    key: 'invitationCode',
    search: false,
    align: 'center'
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    key: 'userRole',
    filters: true,
    onFilter: true,
    align: 'center',
    valueEnum: {
      0: {
        text: '管理员',
        status: 'success'
      },
      1: {
        text: '普通用户',
        status: 'default'
      }
    }
  },
  {
    title: '状态',
    align: 'center',
    filters: true,
    onFilter: true,
    width: 60,
    dataIndex: 'status',
    key: 'status',
    valueEnum: {
      0: {
        text: '正常',
        status: 'Success'
      },
      1: {
        text: '封禁',
        status: 'Error'
      }
    }
  },
  {
    title: '性别',
    align: 'center',
    dataIndex: 'gender',
    filters: true,
    onFilter: true,
    key: 'gender',
    valueType: 'text',
    render: (_, record) => (
      <Tag color={UserGenderEnum[record.gender]?.color}>{UserGenderEnum[record.gender]?.text}</Tag>
    )
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    key: 'createTime',
    search: false,
    align: 'center',
    width: 100
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
    key: 'updateTime',
    search: false,
    align: 'center',
    width: 100
  }
];

export default UserColumns;
