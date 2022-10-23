## 手写Axios

- axios 特性
  - 从浏览器中创建 XMLHttpRequests
  - 从 node 中创建 http 请求
  - 支持 Promise
  - 拦截请求和响应
  - 转换请求数据和响应数据
  - 取消请求
  - 自动转换 JSON 数据
  - 客户端支持防御 XSRF
- axios 原理:
  - axios 属于 XMLHttpRequest, 因此需要实现一个 ajax.或基于 http
  - 需要一个 promise 对象来对结果进行处理
- axios 基本使用方法:
  - axios(config)
  - axios.method(url,data,config)

```js
//从axios(config)的使用上可以看出导出的axios是一个方法。从axios.method(url, data , config)的使用可以看出导出的axios上或者原型上挂有get，post等方法。

//实际上导出的axios就是一个Axios类中的一个方法。

//如代码所以，核心代码是request。我们把request导出，就可以使用axios(config)这种形式来调用axios了
class Axios {
  constructor() {}
  request(config) {
    return new Promise((resolve) => {
      const { url = '', method = 'get', data = {} } = config;
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.onload = function () {
        console.log(xhr, responseText);
        resolve(xhr.responseText);
      };
      xhr.send(data);
    });
  }
}
function CreateAxiosFn() {
  let axios = new Axios();
  let req = axios.request.bind(axios);
  return req;
}
let axios = CreateAxiosFn();

// 定义get post等方法,挂在Axios原型上
const methodArr = ['get', 'delete', 'head', 'options', 'put', 'patch', 'post'];
methodsArr.forEach((met) => {
  Axios.prototype[met] = function () {
    if (['get', 'delete', 'head', 'options'].includes(met)) {
      return this.request({
        method: met,
        url: arguments[0],
        ...(arguments[1] || {}),
      });
    } else {
      return this.request({
        method: met,
        url: arguments[0],
        data: arguments[1] || {},
        ...arguments[2],
      });
    }
  };
});
```
