import {InterfaceRequestMethodEnum} from '@/enum/commonEnum';
import {ProColumns} from '@ant-design/pro-components';

/**
 * Axios 代码示例
 * @param url 请求地址
 * @param method 请求方法
 */
export const axiosExample = (url?: string, method?: number) => {
  // @ts-ignore
  const methodText = InterfaceRequestMethodEnum[method]?.text || '';
  return `axios.${methodText.toLowerCase()}('${url}')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('请求发生错误：', error);
    });`;
};

/**
 * Java 代码示例
 * @param url 请求地址
 * @param method 请求方法
 */
export const javaExample = (url?: string, method?: number) => {
  // @ts-ignore
  const methodText = InterfaceRequestMethodEnum[method]?.text || '';
  return `@Resource
private ApiService apiService;

public Object request() {
    BaseResponse baseResponse;
    try {
        CurrencyRequest currencyRequest = new CurrencyRequest();
        currencyRequest.setPath("${url}");
        currencyRequest.setMethod("${methodText.toLowerCase()}");
        currencyRequest.setRequestParams("请求参数详细请前往开发者在线文档📘查看");
        baseResponse = apiService.request(currencyRequest);
        System.out.println("data = " + baseResponse.getData());
    } catch (BusinessException e) {
        log.error(e.getMessage());
    }
    return baseResponse.getData();
}`;
};

/**
 * 返回示例
 */
export const returnExample =
  '{\n' + '    "code": 20000,\n' + '    "data": {} ,\n' + '    "msg": "success"\n' + '}';

export const responseParameters = [
  {
    fieldName: 'code',
    type: 'int',
    desc: '状态码',
    required: '是'
  },
  {
    fieldName: 'msg',
    type: 'string',
    desc: '提示消息',
    required: '是'
  },
  {
    fieldName: 'data',
    type: 'Object',
    desc: '返回数据',
    required: '是'
  }
];

export const requestParameters = [
  {
    fieldName: '无',
    type: 'string',
    desc: '无',
    required: '否'
  }
];

export const requestParam: ProColumns[] = [
  {
    title: '参数名称',
    dataIndex: 'fieldName',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项是必填项'
        }
      ]
    }
  },
  {
    title: '参数值',
    dataIndex: 'value',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项是必填项'
        }
      ]
    }
  }
];

export const DEFAULT_ADD_FIELD = {
  fieldName: '',
  value: ''
};

export const convertResponseParams = (params?: [API.RequestParamsField]) => {
  if (!params || params.length <= 0) {
    return returnExample;
  }
  const result = {};
  const codeObj = {};
  const messageObj = {};
  params.forEach((param) => {
    // @ts-ignore
    const keys = param.fieldName.split('.');
    // @ts-ignore
    let currentObj;
    if (keys[0] === 'code') {
      currentObj = codeObj;
    } else if (keys[0] === 'message') {
      currentObj = messageObj;
    } else {
      currentObj = result;
    }

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        if (param.type === 'int' && key === 'code') {
          // @ts-ignore
          currentObj[key] = 20000;
        } else {
          // @ts-ignore
          currentObj[key] = param.desc || '';
        }
      } else {
        // @ts-ignore
        currentObj[key] = currentObj[key] || {};
        // @ts-ignore
        currentObj = currentObj[key];
      }
    });
  });
  // @ts-ignore
  const mergedResult = { code: codeObj.code, ...result, message: messageObj.message };
  return JSON.stringify(mergedResult, null, 4);
};
