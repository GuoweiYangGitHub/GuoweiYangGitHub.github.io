# 小程序中的扫码

## 普通码

- 特点：不管从小程序内部还是使用微信扫一扫，扫出的结果都是一样的 类似`HTTP://CBG.PUB/G/L-LO$4YR:5H9B0:Z2Z2DR`
- 普通码的形态
  - 就只有一种普通链接的形式： `HTTP://CBG.PUB/G/L-LO$4YR:5H9B0:Z2Z2DR`

## U 码（微信一物一码）

- 特点 ： 唯一性（每次扫码出来的 code_ticket 都不一样）
- U 码的形态：

  - 原始码形态：`044GZ*J10`
  - 普通码形态： `P.URL.CN/0ALL$V2QCNVRHYPO:K3`
  - 二进制形态： `10010101100010010110011001010110101010100001010110100100111011110001`

- U 码扫出的结果
  - code_ticket
    - 还需要拿`code_ticket`去换`原始code`
  - 原始 code（9 位数字符）

## 扫码描述

1. 使用`微信扫一扫`扫 U 码，扫出的结果为 code_ticket,通过参数的形式带入小程序。
   1. 前端取到 code_ticket 后，调取后台的接口，后台拿到 code_ticket 去调用微信接口去换 9 位字符原始码 code。
   2. 后端拿到原始码 code，再调微信接口，拿到扫码结果

2. 在`小程序内使用扫码`扫 U 码
   1. 如果是 U 码普通码形式`P.URL.CN/0ALL$V2QCNVRHYPO:K3` 类似这种
      1. 在开发者工具中扫不出来，在真机中模拟，会在扫码结果的 path 中将`code_ticket`以参数的形式带在 url 后面
         - 例如：

           ```js
           const scanResult = {
              result:'http://P.URL.CN/0ALL$V2QCNVRHYPO:K3'
              path：'/pages/index/index?code_ticket=920cfaedca912bf83e2370fe81d419b3'
           }
           ```

   2. 如果 U 码 以原始码的形式或（二进制）形式展示的时候，扫出的结果 `044GZ*J10` 类似这种九位数原始码
      1. 后台拿到原始 code，请求微信的扫码接口，返回扫码结果
         - 例如

           ```js
           const scanResult = {
             result: "044GZ*J10",
             //path：'/pages/index/index?code_ticket=920cfaedca912bf83e2370fe81d419b3' //扫出的结果 无这个字段
           };
           ```
