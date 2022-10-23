# 算法题

## 字节经典算法题目

> 输入一个正数N，输出所有和为N的连续正数序列
> 例如:输入15
> 结果:[[1,2,3,4,5],[4,5,6],[7,8]]

```js
function createArr(n,len){
    let arr=new Array(len).fill(null),
        temp=[];
    arr[0]=n;
    arr=arr.map((item,index)=>{
        if(item==null){
            item=temp[index-1]+1;
        }
        temp.push(item);
        return item;
    });
    return arr;
}
function fn(count){
    let result=[];
    //=>求出中间值
    let middle=Math.ceil(count/2);
    //从1开始累加
    for(let i=1;i<=middle;i++){
        //控制累加多少次
        for(let j=2;;j++){
            //求出累加多次的和
            let total=(i+(i+j-1))*(j/2);
            if(total>count){
                break;
            }else if(total==count){
                result.push(createArr(i,j));
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
function ListNode(x){
    this.val = x;
    this.next = null;
}
function EntryNodeOfLoop(pHead){
    if(pHead === null)
        return null;
    var fast = pHead;
    var slow = pHead;

    while(fast.next !==null && fast.next.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if(slow === fast)
            break;
    }

    if(fast === null || fast.next === null)
        return null;
    // 有环，slow重新回到链表头
    slow = pHead;

    // slow和fast重新相遇时，相遇节点就是入环节点
    while(slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow;
}
```

## 实现一个LinkedList类，类中有 insert、find、append 方法。

```js
class LinkedList {
  constructor(){
    this.size = 0;  // 单链表的长度
    this.head = new Node('head');  // 表头节点
    this.currNode = '';  // 当前节点的指向
  }

  insert(item, element){
    let itemNode = this.find(item);

    if(!itemNode) {  // 如果item元素不存在
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

  find(item){
    let currNode = this.head;

    while (currNode && (currNode.data !== item)) {
        currNode = currNode.next;
    }

    return currNode;
  }
  delete(item){
    if(!this.find(item)){  // item元素在单链表中不存在时
      return;
  }

  // 企图删除头结点
  if (item === 'head') {
      if (!(this.isEmpty())) {
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

## 二叉树找最左侧节点

> 现有一个斐波拉契数组集合（200个），二叉树结构，找出最左侧节点

![二叉树找最左边节点](https://clouds.guowei.link/二叉树找最左边节点.png)

```js
const map = new Map()
const list = []
function fn(num) {
  if(map.has(num)) {
    return map.get(num)
  }

  if(num === 1 || num === 2) {
    if(!map.has(num)) {
      list.push(1)
      map.set(num, 1)
    }
    return 1
  }

  const result = fn(num - 1 ) + fn(num - 2)
  map.set(num, result)
  list.push(result)
  return result
}

const resultList = fn(50)

console.log(list)

// 遍历 [1,1,2,3,5,8,13,21,34,....,n-2,n-1]
let index = 1
const newList = [list[0]]
list.forEach((item,i) => {
  if(index > i ) {
    return;
  }
  if(i === index) {
    newList.push(item)
    index = 2 * index + 1
  }
})

console.log(newList,'newList')
```
