import CodeHighlighting from '@/components/CodeHighlighting';
import ParamsTable from '@/components/ParamsTable';
import { InterfaceRequestMethodEnum } from '@/enum/commonEnum';
import { DEFAULT_ADD_FIELD, requestParam } from '@/pages/InterfaceInfo/Components/CodeTemplate';
import '@umijs/max';
import { Button, Empty, Form, Select, Space, Spin } from 'antd';
import Search from 'antd/es/input/Search';
import React from 'react';

export type Props = {
  data?: API.InterfaceInfo;
  temporaryParams: any;
  requestExampleActiveTabKey: string;
  onSearch: (values: any) => void;
  paramsTableChange: (values: any) => void;
  result?: string;
  form: any;
  resultLoading: boolean;
};
const ToolsTab: React.FC<Props> = (props) => {
  const {
    onSearch,
    data,
    form,
    temporaryParams,
    paramsTableChange,
    result,
    resultLoading,
    requestExampleActiveTabKey
  } = props;
  const selectAfter = (
    <Select
      disabled
      // @ts-ignore
      defaultValue={InterfaceRequestMethodEnum[data?.method]?.text}
      style={{ width: 120 }}
      options={[
        { value: 'GET', label: 'GET', disabled: true },
        { value: 'POST', label: 'POST', disabled: true },
        { value: 'PUT', label: 'PUT', disabled: true },
        { value: 'DELETE', label: 'DELETE', disabled: true }
      ]}
    />
  );
  return (
    <>
      <Form
        form={form}
        className="form-input"
        onFinish={(values) => onSearch?.(values)}
        scrollToFirstError
        onReset={() => {
          form.resetFields(['requestParams']);
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
          <Search
            size={'large'}
            readOnly
            style={{ maxWidth: 600 }}
            value={data?.url}
            addonBefore={selectAfter}
            enterButton="发送"
            onSearch={form.submit}
          />
        </div>
        <p className="highlightLine" style={{ marginTop: 25 }}>
          请求参数设置
        </p>
        <Form.Item name={'requestParams'}>
          <ParamsTable
            value={temporaryParams}
            onChange={(value: any) => {
              paramsTableChange?.(value);
            }}
            defaultNewColumn={DEFAULT_ADD_FIELD}
            column={requestParam}
          />
        </Form.Item>
        <Form.Item>
          <Space size="large" wrap>
            <Button type="primary" htmlType="reset" style={{ width: 180 }}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <p className="highlightLine" style={{ marginTop: 25 }}>
        响应结果
      </p>
      <Spin spinning={resultLoading}>
        {result ? (
          <CodeHighlighting codeString={result} language={requestExampleActiveTabKey} />
        ) : (
          <Empty description={'未发起请求，暂无请求信息'} />
        )}
      </Spin>
    </>
  );
};
export default ToolsTab;
