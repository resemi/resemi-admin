import { Http, Transform } from '@potjs/http';
import { Toast } from '@douyinfe/semi-ui';

export interface Result<T = any> {
  errno: number;
  msg: string;
  data: T;
}

const transform: Transform = {
  /**
   * 请求拦截器处理
   * @param config
   */
  requestInterceptors: (config) => {
    // const userStore = useUserStoreWithOut();
    // if (userStore.token) {
    //   // 让每个请求携带自定义token 请根据实际情况自行修改
    //   (config as Recordable).headers[TOKEN_KEY] = userStore.token;
    // }

    return config;
  },
  /**
   * 响应拦截器处理
   * @param res
   */
  responseInterceptors: (res) => {
    // console.log('#responseInterceptors', res);
    return res;
  },
  responseInterceptorsCatch: (error) => {
    Toast.destroyAll();
    Toast.error(error.message);
    return Promise.reject(error);
  },
  /**
   * 处理请求数据。如果数据不是预期格式，可直接抛出错误
   * @param res
   * @param options
   */
  transformResponse: (res, options) => {
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }
    const result = res.data;
    if (!result) {
      // return '[HTTP] Request has no return value';
      throw new Error('Request failed');
    }

    // 这里 errno，data，msg 为后台统一的字段，需要在`new Http<R>()`时修改为项目自己的接口返回格式
    const { errno, data, msg } = result;

    const hasSuccess = result && Reflect.has(result, 'errno') && errno === 0;
    if (hasSuccess) {
      return data;
    }

    // 在此处根据自己项目的实际情况对不同的errno执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let errorMsg = '';
    switch (errno) {
      case 10003:
        errorMsg = msg;
        break;
      default:
        if (msg) {
          errorMsg = msg;
        }
    }

    // errorMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    if (options.errorMode === 'modal') {
      // createErrorModal({ title: 'error tip', content: errorMsg });
    } else if (options.errorMode === 'message' && errorMsg) {
      Toast.destroyAll();
      Toast.error(errorMsg);
    }

    throw new Error(errorMsg);
  },
};

export default new Http<Result>({
  baseURL: '/',
  withCredentials: true,
  timeout: 30000,
  // 配置项，下面的选项都可以在独立的接口请求中覆盖
  requestOptions: {
    // 消息提示类型
    errorMode: 'message',
    isTransformResponse: false,
  },
  transform,
});
