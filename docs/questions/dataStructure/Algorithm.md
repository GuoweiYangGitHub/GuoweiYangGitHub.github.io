# 算法题

## 字节经典算法题目

> 输入一个正数 N，输出所有和为 N 的连续正数序列
> 例如:输入 15
> 结果:[[1,2,3,4,5],[4,5,6],[7,8]]

```js
function createArr(n, len) {
  let arr = new Array(len).fill(null),
    temp = [];
  arr[0] = n;
  arr = arr.map((item, index) => {
    if (item == null) {
      item = temp[index - 1] + 1;
    }
    temp.push(item);
    return item;
  });
  return arr;
}
function fn(count) {
  let result = [];
  //=>求出中间值
  let middle = Math.ceil(count / 2);
  //从1开始累加
  for (let i = 1; i <= middle; i++) {
    //控制累加多少次
    for (let j = 2; ; j++) {
      //求出累加多次的和
      let total = (i + (i + j - 1)) * (j / 2);
      if (total > count) {
        break;
      } else if (total == count) {
        result.push(createArr(i, j));
        break;
      }
    }
  }
  return result;
}
console.log(fn(15));
```

![结果](https://img-blog.csdnimg.cn/20200319105351250.png)

## 判断一个单链表中是否有环？

```js
// 判断一个链表中是否有环

// 例如：A->B->C->D->B->C->D

// D指向B形成环

// 要求：在空间复杂度O(1)的情况下，时间复杂度最小

// 思路： 做一个快指针，做一个慢指针，快指针每次走两步，慢指针每次走一步；如果有环的话，就慢指针就会追上快指针。
function ListNode(x) {
  this.val = x;
  this.next = null;
}
function EntryNodeOfLoop(pHead) {
  if (pHead === null) return null;
  var fast = pHead;
  var slow = pHead;

  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }

  if (fast === null || fast.next === null) return null;
  // 有环，slow重新回到链表头
  slow = pHead;

  // slow和fast重新相遇时，相遇节点就是入环节点
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
}
```

## 实现一个 LinkedList 类，类中有 insert、find、append 方法。

```js
class LinkedList {
  constructor() {
    this.size = 0; // 单链表的长度
    this.head = new Node("head"); // 表头节点
    this.currNode = ""; // 当前节点的指向
  }

  insert(item, element) {
    let itemNode = this.find(item);

    if (!itemNode) {
      // 如果item元素不存在
      return;
    }

    let newNode = new Node(element);

    newNode.next = itemNode.next; // 若currNode为最后一个节点，则currNode.next为空
    itemNode.next = newNode;

    this.size++;
  }

  isEmpty() {
    return this.size === 0;
  }

  findLast() {
    let currNode = this.head;

    while (currNode.next) {
      currNode = currNode.next;
    }

    return currNode;
  }

  find(item) {
    let currNode = this.head;

    while (currNode && currNode.data !== item) {
      currNode = currNode.next;
    }

    return currNode;
  }
  delete(item) {
    if (!this.find(item)) {
      // item元素在单链表中不存在时
      return;
    }

    // 企图删除头结点
    if (item === "head") {
      if (!this.isEmpty()) {
        return;
      } else {
        this.head.next = null;
        return;
      }
    }

    let currNode = this.head;

    while (currNode.next.data !== item) {
      // 企图删除不存在的节点
      if (!currNode.next) {
        return;
      }
      currNode = currNode.next;
    }

    currNode.next = currNode.next.next;
    this.size--;
  }
}
```

## 二叉树

### 将数组变为二叉树形式

```js
class Node {
  // 定义节点
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

const createTree = (arr) => {
  // 创建二叉树
  let tree = new Node(arr[0]);
  let Nodes = [tree];
  let i = 1;
  for (let node of Nodes) {
    Nodes.push((node.left = new Node(arr[i])));
    i += 1;
    if (i == arr.length) return tree;
    Nodes.push((node.right = new Node(arr[i])));
    i += 1;
    // 利用 for of 当Nodes 改变的时候，会重新执行 for of
    if (i == arr.length) return tree;
  }
};
```

### 二叉树找最左侧节点

> 现有一个斐波拉契数组集合（200 个），二叉树结构，找出最左侧节点

![二叉树找最左边节点](https://clouds.guowei.link/二叉树找最左边节点.png)

```js
const map = new Map();
const list = [];
function fn(num) {
  if (map.has(num)) {
    return map.get(num);
  }

  if (num === 1 || num === 2) {
    if (!map.has(num)) {
      list.push(1);
      map.set(num, 1);
    }
    return 1;
  }

  const result = fn(num - 1) + fn(num - 2);
  map.set(num, result);
  list.push(result);
  return result;
}

const resultList = fn(50);

console.log(list);

// 遍历 [1,1,2,3,5,8,13,21,34,....,n-2,n-1]
let index = 1;
const newList = [list[0]];
list.forEach((item, i) => {
  if (index > i) {
    return;
  }
  if (i === index) {
    newList.push(item);
    index = 2 * index + 1;
  }
});

console.log(newList, "newList");
```

### 二叉树获取节点最大深度

```js
const arr = createTree([3, 9, 20, null, null, 15, 7]);
/**
 * arr 的值为：
  Node {
    data: 3,
    left: Node {
      data: 9,
      left: Node { data: null, left: null, right: null },
      right: Node { data: null, left: null, right: null }
    },
    right: Node {
      data: 20,
      left: Node { data: 15, left: null, right: null },
      right: Node { data: 7, left: null, right: null }
    }
  }
 */

function TreeDepth(pRoot) {
  return !pRoot
    ? 0
    : Math.max(TreeDepth(pRoot.left), TreeDepth(pRoot.right)) + 1;
}
const result = TreeDepth(arr);
console.log(result); // 深度为： 3
```

### 翻转二叉树

#### 自顶向下

```js
//先交换顶层节点，再交换底层节点
var invertTree = function (root) {
  if (root === null) return null;
  //交换左右结点
  var tmp = root.left;
  root.left = root.right;
  root.right = tmp;
  if (root.left) {
    invertTree(root.left);
  }
  if (root.right) {
    invertTree(root.right);
  }
  return root;
};
```

#### 自底向上

```js
//先交换底层节点，再交换顶层节点
var invertTree = function (root) {
  //定义递归返回的条件
  if (!root) return null;
  //先使用递归找到最底层的左右子树
  let left = invertTree(root.left);
  let right = invertTree(root.right);
  //分别交换左右子树
  root.right = left;
  root.left = right;
  return root;
};
```

#### 迭代

> 思路：维护一个数组，这个数组里面存放的是没有交换过左右子树的节点

```js
//思路：维护一个数组，这个数组里面存放的是没有交换过左右子树的节点
//自顶向下
var invertTree = function (root) {
  if (!root) return null;
  //这个数组一开始存放的只有根结点
  var arr = [root];
  while (arr.length) {
    let current = arr.pop();
    //分别交换current节点的左右子树
    let temp = current.left;
    current.left = current.right;
    current.right = temp;

    //再判断current节点的左右子树是否存在，如果存在则放进数组
    if (current.left) arr.push(current.left);
    if (current.right) arr.push(current.right);
  }
  return root;
};
```
