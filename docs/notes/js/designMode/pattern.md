# JavaScript 中的设计模式

> 动态语言中实现的一个原则： **面向接口编程**

### 你要弄懂的几个要点？

1. 工厂方法模式
2. 高阶函数
3. AOP 函数
4. Object.create

```js
// Object.create 的实现
Object.create =
  Object.create ||
  function (obj) {
    var F = function () {};
    F.prototype = obj;
    return new F();
  };
```

5. this （在 es5 中的 严格模式中，this 已经被规定为不会指向全局对象，而是 undefined）
   > javascript 中的 this 总是指着一个对象，而具体指向哪个对象是在运行时基于函数的执行环境动态绑定的，而非函数声明时的环境。

```js
// 如果构造器显式地返回了一个object类型的对象，那么此次运算结果最终会返回这个对象，而不是我们之前期待的this
var MyClass = function () {
  this.name = 'name'
  return {
    name: 'anne'
  }
}

var obj = new MyClass()
console.log(obj.name) //输出： anne

// 如果构造器不显式地返回任何数据，或者返回一个非对象类型的数据，就不会造成上述问题：
var MyClass = function () {
  this.name = 'name'
  return 'anne' //返回非对象类型
}
var obj = new MyClass()
console.log(this.name) //输出 name

/*
*--------------------this丢失的问题(其实this是被劫持)------------------------
*/
var obj = {
  myName = 'sevn',
  getName: function () {
    return this.myName
  }
}

console.log(obj.getName()) //输出 sevn
var getName2 = obj.getName
console.log(getName2()) // 输出 undefined

// 例子2
document.getElementById('id')

var getId = document.getElementById
getId('id') //报错，this被劫持

// 修正：
document.getElementById = (function (func) {
  return function () {
    return func.apply(document,arguments)
  }
})(document.getElementById)

var getId = document.getElementById
getId('id') // 输出dom
```

6. Function.prototype.call 和 Function.prototype.apply
   > Function.prototype.call 和 Function.prototype.apply 可以动态地改变传入函数的 this
7. new

```js
// 手动实现一个new操作
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

var objectFactory = function () {
  var obj = new Object(); // 从Object.prototype上克隆一个空的对象
  var Constructor = [].shift.call(arguments); // 取得外部传入的构造器
  obj.__proto__ = Constructor.prototype; // 指向正确的原型
  var ret = Constructor.apply(obj, arguments); // 借用外部传入的构造器给obj设置属性
  return typeof ret === 'object' && ret !== null ? ret : obj; //确保构造器总是返回一个对象
};

var a = objectFactory(Person, 'sevn');
console.log(a.name); // sevn
console.log(a.getName()); // sevn
console.log(Object.getPrototypeOf(a) === Person.prototype); // true

// Object.getPrototypeOf(a) 查看对象的原型
```

```js
// ==============================================================================
// 抽象类
// 何为抽象类？ 就是不能被实例化出来的类。
// ==============================================================================

// ==============================================================================
// JavaScript 中的多态
// 多态的好处在于，你不必再向对象询问'你是什么类型'而后根据得到的答案调用对象的某个行为--你只管调用该行为就是了，其他的一切多态机制都会为你安排妥当。
// 根本作用：通过把过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句
// ==============================================================================

// ==============================================================================
// 面向对象的设计技巧： 封装，继承，多态，组合
// 封装的目的: 将信息隐藏
/*
  1.封装数据
  2.封装实现
  3.封装类型
  4.封装变化
*/
// ==============================================================================
var myObject = (function () {
  var _name = 'sevn'; // 私有（private）变量
  return {
    getName: function () {
      // 公开（public）方法
      return _name;
    }
  };
})();
console.log(myObject.getName()); // sevn
console.log(myObject._name); // undefined
```

- 鸭子类型
- 高阶函数之动态植入

```js
Function.prototype.before = function (beforeFn) {
  var _self = this;
  return function () {
    beforeFn.apply(this, arguments);
    return _self.apply(this, arguments);
  };
};

Function.prototype.after = function (afterFn) {
  var _self = this;
  return function () {
    var ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  };
};

var func = function () {
  console.log(2);
};

func = func
  .before(function () {
    console.log(1);
  })
  .after(function () {
    console.log(3);
  });

func();
console.log(Function.prototype);
```

## 单例模式

## 策略模式

> 特点： 定义一系列算法，把它们一个个封装起来，并且使它们可以相互替换

- 优点：
  - 利用组合，委托和多态等技术思想，可以有效地避免多重条件语句。
  - 提供了对开放-封闭原则的完美支持，将算法封装在独立的 strategy 中，使得他们易于切换，易于理解，易于扩展
  - 策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。
  - 在策略模式中利用组合和委托来让 Context 拥有执行算法的能力，这也是继承的一种更轻便的代替方案
- 缺点：
  - 策略模式会在程序中添加了许多策略类或者策略对象，但实际上这比把它们负责的逻辑堆砌在 context 中要好。
  - 要使用策略模式，必须了解所有的 strategy ，必须要了解各个 stragegy 之间的不同点，这样才能选择一个合适的 strategy。
- 通过策略模式实现一个表单校验

```js
/* 策略对象 */
var strategies = {
  isNonEmpty: function (value, errorMsg) {
    if (value === '') {
      return errorMsg;
    }
  },
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile: function (value, errorMsg) {
    if (!/^(1[3|5|8][0-9]{9})$/.test(value)) {
      return errorMsg;
    }
  }
};

/* Validator 类 */
var Validator = function () {
  this.cache = [];
};

Validator.prototype.add = function (dom, rules) {
  var self = this;

  for (var i = 0, rule; (rule = rules[i++]); ) {
    (function (rule) {
      var strategyAry = rule.strategy.split(':');
      var errorMsg = rule.errorMsg;

      self.cache.push(function () {
        var strategy = strategyAry.shift();
        strategyAry.unshift(dom.value);
        strategyAry.push(errorMsg);
        return strategies[strategy].apply(dom, strategyAry);
      });
    })(rule);
  }
};

Validator.prototype.start = function () {
  for (var i = 0, validatorFunc; (validatorFunc = this.cache[i++]); ) {
    var errorMsg = validatorFunc();
    if (errorMsg) {
      return errorMsg;
    }
  }
};

/* 客户端调用代码 */
var registerForm = document.getElementById('registerForm');
var validataFunc = function () {
  var validator = new Validator();

  validator.add(registerForm.userName, [
    {
      strategy: 'isNonEmpty',
      errorMsg: '用户名不能为空'
    },
    {
      strategy: 'minLength:10',
      errorMsg: '用户名长度不能小于10位'
    }
  ]);

  validator.add(registerForm.password, [
    {
      strategy: 'minLength:6',
      errorMsg: '密码长度不能小于6位'
    }
  ]);

  validator.add(registerForm.phoneNumber, [
    {
      strategy: 'isMobile',
      errorMsg: '手机号码格式不正确'
    }
  ]);
  var errorMsg = validator.start();
  return errorMsg;
};

document.querySelector('.submit').onclick = function () {
  var errorMsg = validataFunc();
  if (errorMsg) {
    alert(errorMsg);
    return false;
  }
};
```

## 代理模式

- _在编写业务代码的时候，往往不需要去预先猜测是否需要使用代理模式。当真正发现不方便直接访问某个对象的时候，再编写代理也不迟_

- 保护代理
- 虚拟代理
- 缓存代理
  > mult 函数只关注计算乘积，缓存的功能由 proxyMult 函数来完成

```js
//利用缓存代理计算乘积
var mult = function () {
  var a = 1;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }
  return a;
};
//代理函数
var proxyMult = (function () {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    return (cache[args] = mult.apply(this, arguments));
  };
})();
proxyMult(1, 2, 3, 4, 5);
proxyMult(1, 2, 3, 4, 5);
```

- 创建缓存代理工厂

```js
/* 创建缓存代理工厂 */
var createProxyFactory = function (fn) {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    return (cache[args] = fn.apply(this, arguments));
  };
};

// 计算乘积
var mult = function () {
  var a = 1;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }
  return a;
};

// 计算家和
var plus = function () {
  var a = 1;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a + arguments[i];
  }
  return a;
};

var proxyMult = createProxyFactory(mult);
var proxyPlus = createProxyFactory(plus);

proxyMult(1, 2, 3, 4);
proxyPlus(1, 2, 3, 4);
```

## 迭代器模式

1. 内部迭代器
2. 外部迭代器
3. 倒序迭代器
4. 中止迭代器

- 外部迭代器

```js
//外部迭代器
var each = function (ary, callback) {
  for (var i = 0; i < ary.length; i++) {
    callback.call(ary[i], i, ary[i]);
  }
};

each([1, 2, 3], function (i, n) {
  alert([i, n]);
});
```

- 倒序迭代器

```js
// 倒序迭代器
var reverseEach = function (ary, callback) {
  for (var l = ary.length; l >= 0; l--) {
    callback(l, ary[l]);
  }
};

reverseEach([1, 2, 3], function (i, n) {
  console.log(n);
});
```

- 中止迭代器

```js
//中止迭代器
var each = function (ary, callback) {
  for (var i = 0, l = ary.length; i < l; i++) {
    if (callback(i, ary[i]) === false) {
      break;
    }
  }
};

each([1, 2, 3, 4, 5], function () {
  if (n > 3) {
    return false;
  }
  console.log(n);
});
```

## 发布-订阅模式（观察者模式）

> 通用的发布订阅者模式 【 p122 全局 Event 事件 】

```js
var event = {
  clientList = {},
  // 订阅
  listen: function(key, fn) {
    if(!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  // 触发
  trigger: function() {
    var key = Array.prototype.shift.call(arguments)
    var fns = this.clientList[key]
    if(!fns || fns.length === 0)  { // 如果没有绑定对应的消息
      return false
    }

    for(var i = 0,fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  },
  // 移除
  remove: function(key, fn) {
    var fns = this.clientList[key]

    if(!fns) { // 如果key对应的消息没有被人订阅，则直接返回
      return false
    }
    if(!fn) { // 如果没有传入具体的回调函数，表示需要 取消key 对应消息的所有订阅
      fns && (fns.length = 0)
    } else {
      for(var l = fns.length - 1; l >= 0; l--) { // 反向遍历订阅的回调函数列表
        var _fn = fns[l]
        if(_fn === fn) {
          fns.splice(l, 1) // 删除订阅者的回调函数
        }
      }
    }
  }
}

//installEvent函数
var installEvent = function (obj) {
  for (var i in event) {
    obj[i] = event[i]
  }
}

//使用
var salesOffices = {}
installEvent(salesOffices)

salesOffices.listen('squareMeter88', fn1 = function (price) {
  console.log('价格=',price)
})
salesOffices.listen('squareMeter110', fn2 = function (price) {
  console.log('价格=',price)
})
salesOffices.trigger('squareMeter88',200000)
salesOffices.trigger('squareMeter110',300000)
salesOffices.remove('squareMeter88', fn1) // 删除这个订阅
```

## 命令模式

> 命令模式中的命令（command）指的是一个执行某些特定事情的指令

- 命令模式可以完成撤销，排队等功能
- 撤销与重做
- 宏命令

```js
var closeDoorCommand = {
  execute: function () {
    console.log('关门');
  }
};

var openPcCommand = {
  execute: function () {
    console.log('开电脑');
  }
};

var openQQCommand = {
  execute: function () {
    console.log('登录QQ');
  }
};

//依次执行他们的 execute方法
var macroCommand = function () {
  return {
    commandList: [],
    add: function (command) {
      this.commandList.push(command);
    },
    execute: function () {
      for (var i = 0, command; (command = this.commandList[i++]); ) {
        command.execute();
      }
    }
  };
};

// 使用
var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);

macroCommand.execute();
```

## 组合模式

1. 组合模式不是父子关系
2. 对叶对象操作的一致性
3. 双向映射关系
4. 用职责链模式提高组合模式性能

## 模板方法模式

> 好莱坞原则: 当我们用模板方法模式编写一个程序时，就意味着子类放弃了对自己的控制权，而是改为父类通知子类，哪些方法应该在什么时候被调用。作为子类，只负责提供一些设计上的细节。

- 模板方法的构成
  - 抽象父类
  - 具体的实现子类

```js
// 好莱坞原则
var Beverage = function (param) {
  var boilWater = function () {
    console.log('把水煮沸');
  };
  var brew =
    param.brew ||
    function () {
      throw new Error('必须传递brew方法');
    };
  var pourInCup =
    param.pourInCup ||
    function () {
      throw new Error('必须传递pourInCup方法');
    };
  var addCondiments =
    param.addCondiments ||
    function () {
      throw new Error('必须传递addCondiments方法');
    };
  var F = function () {};
  F.prototype.init = function () {
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  };
  return F;
};

var Coffee = Beverage({
  brew: function () {
    console.log('用沸水冲泡咖啡');
  },
  pourInCup: function () {
    console.log('把咖啡倒进杯子');
  },
  addCondiments: function () {
    console.log('加糖和牛奶');
  }
});

var Tea = Beverage({
  brew: function () {
    console.log('用沸水浸泡茶叶');
  },
  pourInCup: function () {
    console.log('把茶倒进杯子');
  },
  addCondiments: function () {
    console.log('加柠檬');
  }
});

var coffee = new Coffee();
coffee.init();

var tea = new Tea();
tea.init();
```

## 享元模式

- 享元（flyweight）模式是一种用于性能优化的模式。享元模式的核心是运用共享技术来有效支持大量细粒度的对象。
- 使用场景：在系统中因为创建了大量类似的对象而导致内存占用过高时，享元模式就非常有用了。
- 什么时候可以使用享元对象
  - 一个程序中使用了大量相似的对象
  - 由于使用了大量对象，造成很大的内存开销
  - 对象的大多数状态都可以变为外部状态
  - 剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象
- 怎么去划分享元模式中的内部状态和外部状态
  - 内部状态储存在对象内部
  - 内部状态可以被一些对象共享
  - 内部状态独立于具体的场景，通常不会变化
  - 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享

```js
// 通用对象池
var objectPoolFactory = function (createObjFn) {
  var objectPool = [];
  return {
    create: function () {
      // 创建对象
      var obj =
        objectPool.length === 0
          ? createObjFn.apply(this, arguments)
          : objectPool.shift();
      return obj;
    },
    recover: function (obj) {
      // 回收对象
      objectPool.push(obj);
    }
  };
};
// 利用 objectPoolFactory装载 iframe对象池
var iframeFactory = objectPoolFactory(function () {
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);

  iframe.onload = function () {
    iframe.onload = null; //防止iframe重复加载的bug
    iframeFactory.recover(iframe); // iframe加载完成之后回收节点
  };

  return iframe;
});

var iframe1 = iframeFactory.create();
iframe1.src = 'http://baidu.com';

var iframe2 = iframeFactory.create();
iframe2.src = 'http://QQ.com';

setTimeout(function () {
  var iframe3 = iframeFactory.create();
  iframe3.src = 'http://163.com';
}, 3000);
```

## 职责链模式

> 职责链模式可以很好的帮助我们管理代码，降低发起请求的对象和处理请求对象之间的耦合性。职责链中的节点数量和顺序是可以自由变化的，我们可以在运行时决定链中包含哪些节点

```js
// 职责链函数
// Chain.prototype.setNextSuccessor 指定在链中的下一个节点
// Chain.prototype.passRequest 传递请求给某个节点

var Chain = function (fn) {
  this.fn = fn;
  this.successor = null;
};

Chain.prototype.setNextSuccessor = function (successor) {
  return (this.successor = successor);
};

Chain.prototype.passRequest = function () {
  var ret = this.fn.apply(this, arguments);

  if (ret === 'nextSuccessor') {
    return (
      this.successor &&
      this.successor.passRequest.apply(this.successor, arguments)
    );
  }

  return ret;
};

// 为了解决异步职责链
Chain.prototype.next = function () {
  return (
    this.successor &&
    this.successor.passRequest.apply(this.successor, arguments)
  );
};

/*
  ------------------同步职责链----------------------
*/
var chainOrder500 = new Chain(function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('111');
  } else {
    return 'nextSuccessor';
  }
});

var chainOrder200 = new Chain(function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('222');
  } else {
    return 'nextSuccessor';
  }
});

var chainOrderNormal = new Chain(function (orderType, pay, stock) {
  if (stock > 0) {
    console.log('333');
  } else {
    console.log('444');
  }
});
// 指定节点在职责链的顺序
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 500);
chainOrder500.passRequest(2, false, 500);

/*
  ------------------异步职责链----------------------
*/
var fn1 = new Chain(function () {
  console.log(1);
  return 'nextSuccessor';
});

var fn2 = new Chain(function () {
  var self = this;
  setTimeout(function () {
    console.log(2);
    self.next();
  }, 3000);
});

var fn3 = new Chain(function () {
  console.log(3);
});

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();
```

- 通过 AOP 函数实现职责链

```js
Function.prototype.after = function (fn) {
  var self = this;
  return function () {
    var ret = self.apply(this, arguments);
    if (ret === 'nextSuccessor') {
      return fn.apply(this, arguments);
    }

    return ret;
  };
};

var order = order500yuan.after(order200yuan).after(orderNormal);

order(1, true, 500);
order(2, true, 500);
```

## 中介者模式

> 中介者模式 是指一个对象应尽可能少地了解另一个对象。如果对象之间的耦合性太高，一个对象发生改变后，难免会影响到其他的对象。

- 商城购物中介者例子

```js
var goods = {
  'red|32G': 3,
  'red|16G': 0,
  'blue|32G': 1,
  'red|16G': 18
};

var mediator = (function () {
  var colorSelect = document.getElementById('colorSelect');
  var memorySelect = document.getElementById('memorySelect');
  var numberInput = document.getElementById('numberInput');
  var colorInfo = document.getElementById('colorInfo');
  var memoryInfo = document.getElementById('memoryInfo');
  var nextBtn = document.getElementById('nextBtn');

  return {
    changed: function (obj) {
      var color = colorSelect.value;
      var memory = memorySelect.value;
      var number = numberInput.value;
      var stock = goods[color + '|' + memory];

      if (obj === colorSelect) {
        colorInfo.innerHTML = color;
      } else if (obj === memorySelect) {
        memoryInfo.innerHTML = memory;
      } else if (obj === numberInput) {
        numberInfo.innerHTML = number;
      }

      if (!color) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = '请选择手机颜色';
        return;
      }

      if (!memory) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = '请选择内存大小';
        return;
      }

      if (!Number.isInteger(number - 0) && number > 0) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = '请输入正确购买数量';
        return;
      }

      nextBtn.disabled = false;
      nextBtn.innerHTML = '放入购物车';
    }
  };
})();

// 事件函数
colorSelect.onchange = function () {
  mediator.changed(this);
};

memorySelect.onchange = function () {
  mediator.changed(this);
};

numberInput.onchange = function () {
  mediator.changed(this);
};
```

## 装饰者模式

> 这种给对象动态地增加职责的方式称为装饰者（decorator）模式。装饰者模式能够在不改变对象自身的基础上，在程序运行期间给对象动态地添加职责。跟继承相比，装饰者是一种更轻便灵活的做法

### AOP 装饰函数

```js
Function.prototype.before = function (beforeFn) {
  var _self = this; // 保存原函数的引用
  return function () {
    //返回包含了原函数和新函数的“代理”函数
    // 执行新函数，且保证this不被劫持，新函数接受的参数也会被原封不动的传入原函数，新函数在原函数之前执行
    beforeFn.apply(this, arguments);
    // 执行原函数并返回原函数的执行结果，并且保证this不被劫持
    return _self.apply(this, arguments);
  };
};

Function.prototype.after = function (afterFn) {
  var _self = this;
  return function () {
    var ret = _self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return ret;
  };
};
```

### AOP 动态改变函数参数

```js
Function.prototype.before = function (beforeFn) {
  var _self = this;
  return function () {
    beforeFn.apply(this, arguments);
    return _self.apply(this, arguments);
  };
};
```

- 将原函数和新函数作为参数传入 before 或 after 方法

```js
var before = function (fn, beforefn) {
  return function () {
    beforefn.apply(this, arguments);
    return fn.apply(this, arguments);
  };
};

var a = before(
  function () {
    console.log(3);
  },
  function () {
    console.log(2);
  }
);

a = before(a, function () {
  console.log(1);
});

a();
```

### 插件式表单验证

```js
Function.prototype.before = function (beforefn) {
  var _self = this;
  return function () {
    if (before.apply(this, arguments) === false) {
      return;
    }
    return _self.apply(this, arguments);
  };
};

var validata = function () {
  if (username.value === '') {
    alert('用户名不能为空');
    return false;
  }

  if (password.value === '') {
    alert('密码不能为空');
    return false;
  }
};

var formSubmit = function () {
  var param = {
    username: username.value,
    password: password.value
  };
  ajax('http://baidu.com', param);
};

// 此段代码中，校验输入和提交表单的代码完全分离开来，它们不再有任何耦合关系
formSubmit = formSubmit.before(validata);

submitBtn.onclick = function () {
  formSubmit();
};

// ===========================注意===================================

// 因为函数通过Function.prototype.before或者Function.prototype.after被装饰之后，返回的实际上是一个新的函数，如果在原函数上保存一些属性，那么这些属性会丢失
var func = function () {
  alert(1);
};
func.a = 'a';
func = func.after(function () {
  alert(2);
});
alert(func.a); // 输出： undefined

// 另外，这种装饰方式也叠加了函数的作用域，如果装饰的链条过长，性能也会受到一些影响
```

## 状态模式

- 优点：
  - 状态模式定义了状态与行为之间的关系，并将它们封装在一个类里。通过新的状态类，很容易增加新的状态和转换。
  - 避免 Context 无限膨胀，状态切换的逻辑被分布在状态类中，也去掉了 Context 中原本过多的条件分支
  - 用对象代理字符串来记录当前状态，是的状态的切换一目了然
  - Context 中的请求动作和状态类中封装的行为可以非常容易地独立变化而互不影响
- 缺点：
  - 会在系统中定义许多状态类
  - 逻辑分散，我们无法在一个地方中看出整个状态机的逻辑

## 适配器模式

> 一般不会用在程序设计之初。

- 适配器模式主要用来解决两个已有接口之间不匹配的问题，它不考虑这些接口是怎样实现的，也不考虑它们将来可能会如何演化。适配器模式不需要改变已有的接口，就能够使它们协同作用

## 设计原则和技巧

> 单一职责原则 ，里氏替换原则，依赖倒置原则，接口隔离原则，合成复用原则，最少知识原则。
