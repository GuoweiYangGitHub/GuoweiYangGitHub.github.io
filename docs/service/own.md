# 服务器

## 服务器相关

### 查看当前ip

```shell
curl cip.cc
```

### 配置nginx代理

- 配置nginx代理时,反向代理一定要放在nginx配置的`最前面`

```js
// 错误 ---- 接口会报404错误
server {
      location /node-fe {
            alias /html/website/node-fe-demo;
            index index.html index.htm;
      }

      location ^~ /api/ {
            proxy_pass http://124.222.190.75:19880/;
      }
}


// 正确
server {
      location ^~ /api/ {
            proxy_pass http://124.222.190.75:19880/;
      }

      location /node-fe {
            alias /html/website/node-fe-demo;
            index index.html index.htm;
      }
}




```

### 项目目录存放位置

```shell
# cd /html/website  存放的静态html资源
```

### 新建一个静态资源服务器

```shell
// 1. 将文件放置到 /home/web/下面

// 2.配置nginx代理

# 3. nginx -s reload   重新加载配置

// 4.在腾讯云上开启此端口  服务器 -> 防火墙 -> 添加规则

# 应用类型  自定义
# 限制来源 不启用 默认就是所有人都可以访问
# 协议  TCP
# 端口   配置的端口
# 策略   允许


# 5.访问

```

### 服务器自身防火墙

```shell
// 查看防火墙状态not running表示未开启，不需要额外暴漏端口。
# firewall-cmd --state
// 如果防火墙状态开启，开启nginx监听的端口
# firewall-cmd --query-port=996/tcp
```

#### mysql 新建数据库

```shell

# 字符集选择      utf8mb4
# 排序规则        utf8mb4_0900_ai_ci
```

#### mysql 报错解决方案

- 报错信息

```text
D:\projects\nodejs\blog-1\node_modules\_mysql@2.17.1@mysql\lib\protocol\Parser.js:437
      throw err; // Rethrow non-MySQL errors
      ^
Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
flush privileges;
```

- 解决方案

```js
// 1.执行语句
mysql> alter user 'root'@'%' identified with mysql_native_password by '密码';
// Query OK, 0 rows affected (0.43 sec)

// 2.再执行语句
mysql> flush privileges;
// Query OK, 0 rows affected (0.43 sec)

//3.成功后 退出
mysql> quit
// Bye


// nodejs环境重启下即可 npm run dev
```

### liunx 下载node

> 不能下版本太高的node，启动不起来，会报以下错误，建议走 14以下

```js
node: /lib64/libm.so.6: version `GLIBC_2.27' not found (required by node)
node: /lib64/libc.so.6: version `GLIBC_2.25' not found (required by node)
node: /lib64/libc.so.6: version `GLIBC_2.28' not found (required by node)
node: /lib64/libstdc++.so.6: version `CXXABI_1.3.9' not found (required by node)
node: /lib64/libstdc++.so.6: version `GLIBCXX_3.4.20' not found (required by node)
node: /lib64/libstdc++.so.6: version `GLIBCXX_3.4.21' not found (required by node)
```

- 下载node
- [node官网](https://nodejs.org/dist/)

```js
wget https://nodejs.org/dist/v12.18.4/node-v12.18.4-linux-x64.tar.gz
```

- 解压

```js
tar -xvf node-v12.18.4-linux-x64.tar.gz
```

- cd 到这个目录下（这个很重要）

```js
cd  nodev12.18.4/bin
```

- 加入全局环境/软链接

```js
ln -s /app/nodejs/nodev12.18.4/bin/node /usr/local/bin/node
ln -s /app/nodejs/nodev12.18.4/bin/npm /usr/local/bin/npm
ln -s /app/nodejs/nodev12.18.4/bin/npx /usr/local/bin/npx
```

- 如果要删除软链接

```js
rm -rf /usr/local/bin/node
```

### node 上使用pm2部署服务

- 先全局安装pm2

```js
npm install -g pm2
```

- 挂载全局

```js
ln -s /app/nodejs/nodev12.18.4/lib/node_modules/pm2/bin/pm2  /usr/local/bin
```

#### 启动

```shell
# pm2 start bin/www --time          # 输出的日志加时间
# pm2 start bin/www --name my-api   #my-api为PM2进程名称
# pm2 start bin/www -i 0           #根据CPU核数启动进程个数
# pm2 start bin/www --watch   #实时监控bin/www的方式启动，当bin/www文件有变动时，pm2会自动reload
```

#### 查看进程

```shell
# pm2 list
# pm2 show 0 或者 # pm2 info 0  #查看进程详细信息，0为PM2进程id
```

#### 监控

```shell
# pm2 monit
```

#### 停止

```shell
# pm2 stop all  #停止PM2列表中所有的进程
# pm2 stop 0    #停止PM2列表中进程为0的进程
```

#### 重载

```shell
# pm2 reload all    #重载PM2列表中所有的进程
# pm2 reload 0     #重载PM2列表中进程为0的进程
```

#### 重启

```shell
# pm2 restart all     #重启PM2列表中所有的进程
# pm2 restart 0      #重启PM2列表中进程为0的进程
```

#### 删除 pm2 进程

```shell
# pm2 delete 0     #删除PM2列表中进程为0的进程
# pm2 delete all   #删除PM2列表中所有的进程
```

#### 日志操作

```shell
# pm2 logs [--raw]   #Display all processes logs in streaming
# pm2 flush              #Empty all log file
# pm2 reloadLogs    #Reload all logs
```

#### 升级pm2

```shell
# npm install pm2@lastest -g   #安装最新的PM2版本
# pm2 updatePM2                    #升级pm2
```

#### 使用pm2 日志系统

- pm2 的日志 默认路径 `/root/.pm2/logs`

```shell

pm2 instal pm2-logrotate
pm2 set pm2-logrotate:rotateInterval '*/60 * * * *'
pm2 set pm2-logrotate:compress true    //压缩
pm2 set pm2-logrotate:retain 12  //备份最多12份，也就是备份最近12小时的日志

# 默认日志文件路径
/home/.pm2/logs
```
