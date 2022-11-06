
# 本地操作

### git 基本提交

```js
  git add . //添加到暂存区
  git commit -m '提交说明'  //提交本地仓库
  git reset '文件名' //将暂存区的这个文件恢复到工作区
  git checkout '文件名'  //取消暂存区中这个文件的修改,恢复到修改之前
  git checkout - b '分支名称' //创建并切换分支
  git branch //查看分支
  git branch '分支名' //创建分支
  git branch -d //删除分支
  git branch -v //查看所有分支的当前处在的版本
  git branch -a //查看所有分支
  git log //查看日志
  git log --oneline //简洁日志输出
  git reset --hard '版本号' //回退到某个版本
  git reflog // 查看所有版本号
  git diff //比较工作区 和 暂存区
  git merge '分支名称' //将其他分支内容合并到当前分支(要在父分支上进行合并分支)
```

### 保存暂存区

> 场景: 如果在一个分支中修改了一些内容,但是需要切到另一个分支中查看其它或修改其它. 你不想提交这个版本,但是也不想放弃更改

```js
  //1.存入临时暂存区
  git add .
  git stash

  //取出来的时候用
  git stash pop
```
### 修改commit信息

>场景: 如果你不小心提交了commit信息,想重新编辑

```js
  // 修改最近一次的记录
  git commit --amend
  // 然后进入编辑面板 1.esc 进入vi编辑模式 ,重新编写之后按下esc 退出编辑模式 shift + ; , wq 保存并退出 w 保存, q退出

```
### 变基
> rebase 命令将提交到某一分支上的所有修改都移至另一分支上，就好像“重新 播放”一样。翻译成通俗的话： 找到参照的仓库和当前的仓库的相同的提交，然后把当前分支后续的提交挪动到参照仓库的提交的最后，形成一条线性的提交顺序。
```js
  git checkout 'a分支'
  git rebase 'rebase分支'
  // 将 rebase分支上的所有修改都移动到a分支上
```

### 别人已经删除的远程分支，还能在本地看到时候

```js
// git remote prune origin
```

