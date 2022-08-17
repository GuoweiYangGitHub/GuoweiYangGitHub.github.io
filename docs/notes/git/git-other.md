# Git 不常用功能

## 字符集编码设置(防止中文乱码)

```sh
git config --global i18n.commitencoding utf-8
git config --global i18n.logoutputencoding utf-8
export LESSCHARSET=utf-8
```

## git不自动转换换行符

```sh
git config --global core.autocrlf false
```

## git设置会检测文件名大小写

```sh
git config --global core.ignorecase false
```

## 更改git仓库访问用户名和密码

```tex
Windows设置-搜索凭据-切换windows凭据
```

## git 右键突然消失解决办法

-  新建 `gitResgiter.txt`
- 写入

> 第五行： `\\Git` 前面替换为本机的git的安装目录\Git
>
> 第七行：同上↑

```js
Windows Registry Editor Version 5.00

[-HKEY_CLASSES_ROOT\Directory\Background\shell\open in git]

[HKEY_CLASSES_ROOT\Directory\Background\shell\open in git]

@="Git Bash Here"

"icon"="E:\\Program Files\\Git\\mingw64\\share\\git\\git-for-windows.ico"

[HKEY_CLASSES_ROOT\Directory\Background\shell\open in git\command]

@="E:\\Program Files\\Git\\git-bash.exe"
```

- 保存 将 `gitResgiter.txt` 重命名为 `gitResgiter.reg`
- 执行文件
