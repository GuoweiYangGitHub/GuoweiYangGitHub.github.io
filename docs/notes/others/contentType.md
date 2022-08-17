# 表单传输类型

- axios使用params接收数据时，默认为url传参方式，会自动将params对象序列化，一般用于get请求方式；

- axios使用data接收数据时，默认通过请求主体传参，一般用于post请求，默认content-type为json形式，会自动将params对象转为json字符串。

- 一般get请求用url传参，不设content-type;

### 表单形式

```js
headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'

Content-Type为表单形式，数据需进行序列化，后端通过键值对接收。
序列化示例：{ id: 1, name: Neo }   =>   id=1&name=Neo

Chrome调试显示 Form Data
```

### json形式

```js
headers['Content-Type'] = 'application/json; charset=utf-8'

Content-Type为json形式，数据需转为json字符串，后端通过json字符串接收

Chrome调试显示 Request Payload
```

### form-data形式

```js
headers['Content-Type'] = 'multipart/form-data'

Content-Type为form-data形式，数据通过new FormData()转化，文件部分以二进制数据传输，其他部分以键值对传输。

例如：
const files = document.querySelector('#file')
formData = new FormData()
formData.append('files', files[0])
uploadFile(formData).then().catch()

jquery需添加 processData: false, contentType: false 配置
```

