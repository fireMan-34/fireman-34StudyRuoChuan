# 若川源码第一期学习

## 启动步骤

```bash
git clone git@github.com:jquery/jquery.git
cd jquery
npm run install
```

记得不要提前删除仓库下方的 .git 文件内容，有一些 install 相关的钩子关联到这个文件夹，我吃过这个亏。😓

## 认识命令

1. `babel:tests` 编译一个 `es6 + ` 的 Jqeury 代码，引入到 html 文件供测试。
2. `build` 启动 `./build/command.js` 的脚本，不过没有传入任何参数。
   1. 里面涉及到不少编译过程生成代码的逻辑，底层构建基于 `rollup`。
3. `build:all` 执行 `./build/tasks/bulid.js` 中的 `buildDefaultFiles` 方法。
   1. 学到了新知识，[node 命令行知识](#node-命令行知识)🤔。
   2. 提供了多种打包产出。
4. `qunit-fixture` 似乎是一个测试用的脚本，将 html 的内容输入的 JavaScript 脚本里面。
5. JSON.stringify 支持 string 类型，🤦‍，用了这么久都不知道，在浏览器后台试了一下基础类型，数组，对象都可以。
6. `npmcopy` 这似乎是一个处理外部文件的脚本， 会把 npm 模块下的文件拷到 `external`。
7. `pretest` 测试前执行脚本, 启动 `babel:tests`, `qunit-fixture`, `npmcopy`。
8. `"test:no-deprecated"` 里面这个方法学到了 `npm run build -- -e deprecate`
   1. 我一直以为是不能透传命令行参数，不知道为什么有这种直觉。😓

## 学习模块

### core

1. `export { jQuery, jQuery as $ }` 还有这种导出写法，学习了。
2. 单例模式

```js
jQuery = function (selector, context) {
  return new jQuery.fn.init(selector, context);
};
```

3. 链式赋值,学习了

```js
jQuery.fn = jQuery.prototype = {
  //...
};
```

4. extend 函数,这是我对 jQuery 逻辑的重写，原版 es5 + 动态参数让我最初理解起来挺困难的，我边重构边理解。可以想到如果没有 es6＋　和　ｔｓ　的出现理解动态参数和代码上下文难度会大很多。
```ts
function JQueryExtend(
  ...args: any[]
): Record<string, any> {
  let clone,
    target = args[0],
    i = 1,
    length = args.length,
    deep = false;

  function isPlainObject(obj: any): boolean {

    if (!obj || Object.toString.call(obj) !== '[object Object]') {
      return false;
    }
    const proto = Object.getPrototypeOf(obj);
    const topProptype = Object.prototype;
    const fnToString = topProptype.hasOwnProperty.toString;

    if (!proto) {
      return true;
    }

    const Ctor = topProptype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;


    return typeof Ctor === 'function' && fnToString.call(Ctor) === fnToString.call(Object);
  }

  // 处理深度赋值的情况
  if (typeof target === 'boolean') {
    deep = target;

    // 跳过首个参数
    target = args[1] || {};
    i += 1;
  }

  // 处理在 target 参数可能是数字或者其它情况下的深度复制场景
  if (typeof target !== 'object' && target !== 'function') {
    target = {};
  }

  // 在只有一个参数的情况下，或者两个参数，扩展 JQuery 自身
  if (i === length) {
    target = this;
  }

  for (; i < length; i++) {
		/** 当前扩展对象 */
    const options = args[i];
    if (!options) {
      continue;
    }
    for (const name in options) {
			/** 克隆扩展对象的属性值 */
      const copy = options[name];
			/**　扩展对象属性值 */
      const src = target[name];
      const copyIsArray = Array.isArray(copy);
      const srcIsArray = Array.isArray(src);
      const copyIsPlainObject = Array.isArray(copy);
      const srcIsPlainObject = isPlainObject(src);

      if (name === "__proto__" || target === copy) {
        continue;
      }

			/** 如果 深层复制 且 属性值存在 且 克隆为普通对象 或者 数组的时候生效 */
      if (deep && copy && copyIsPlainObject || copyIsArray) {

				
        if (copyIsArray && !srcIsArray) {
          clone = [];
        } else if (!copyIsArray && !srcIsPlainObject) {
          clone = {};
        } else {
          clone = src;
        }

        target[name] = JQueryExtend(deep, clone, copy);
      } else if (copy) {
        target[name] = copy;
      }
    }
  }

  return target;
}

```

5. 这是模仿若川大佬的脑图，画的很朴素。
   1. <img src="./Class JQuery.png" />



## Node 命令行知识

1. 命令行字符串引号冲突可以用 `\"` 来解决。
2. node -e "可用执行 nodejs 代码"
   1. 具体可用参考这里 https://nodejs.org/docs/latest-v18.x/api/cli.html
   2. 可用动手在命令行黏贴一下代码以下代码:

```bash
   node -e "const name ='前端小菜鸡';console.log(name + '：在线打码。');"
```

1. `npm run xxx` 任然可用透传命令行参数，而且添加的参数不会有 npm 相关的命令行参数。

## 部分依赖

1. [yargs 命令行库](https://yargs.js.org/)
   1. 命令行返回的 TS 类型比较有趣，值得学习。
2.

## 参考

- [若川源码共读第一期](https://juejin.cn/post/6844903902077272071)
- [jquery repo](https://github.com/jquery/jquery)
- [yargs 命令行库](https://yargs.js.org/)
- [ JSON.stringify ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- [链式赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment)

## 备注

- slim 指的是轻量模式，jQuery 会移除部分非主要块，如 axios ， callbacks, deferred, effects, queue 封装。
- somke 冒烟测试，指的是对构建产物的基础验证，只关注项目构建层面的异常，不对具体功能进行测试。
