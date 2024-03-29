# main
- 正则表达式是匹配模式，要么匹配字符，要么匹配位置。

## 1.1
 两种模糊匹配

### 1.1.1 横向模糊
  一个正则可匹配的字符串的长度不是固定的，可以是多种情况的。
  其实现的方式是使用量词。譬如 {m,n}，表示连续出现最少 m 次，最多 n 次。

   g 是正则的一个修饰符。表示全局匹配，即，在目
标字符串中按顺序找到满足匹配模式的所有子串，强调的是“所有”，而不只是“第一个”
。g 是单词 global 的首字母。

### 1.1.2  纵向模糊
  一个正则匹配的字符串，具体到某一位字符时，它可以不是某个确定的字符，可以有多种
可能。
  

## 1.2. 字符组
  需要强调的是，虽叫字符组（字符类），但只是其中一个字符。

## 1.2.1. 范围表示法
   [123456abcdefGHIJKLM] -> [1-6a-fG-M]

## 1.2.3. 常见的简写形式
| 字符组 | 具体含义|助记|
|---|---|---|
|\d|[0-9] 0-9||
|\D|[^0-9] 非数字||
|\w|[0-9a-zA-Z_] 数字、字母、下划线|word|
|\W|[^0-9a-zA-Z_] 非单词字符||
|\s|[\t\v\n\r\f] 表示空白字符包括空格、水平制表符、垂直制表符、换行、回车、换页 |space|
|\S|[^\t\v\n\r\f] 表示非空白字符|
|.|[^\n\r\u2028\u2029]表示几乎任意字符。换行符、回车符、行分隔符和段分隔符
除外|

如果要匹配任意字符可用 [\w\W]、[\s\S]、[\d\D] 、[^]

## 1.3
  量词
### 1.3.1
|量词|具体含义|
|---|---|
|{m,}|表示至少出现m次|
|{m}|表示出现{m,m}m次之间|
|?|表示出现或者不出现|
|+|表示出现至少一次|
|*|表示出现任意次，有可能不出现|

### 1.3.2
贪婪匹配/惰性匹配
默认是贪婪匹配

### 1.3.3
|惰性量词|贪婪量词|
|---|---|
|{m,n}?|{m.n}|
|{m,}?|{m,}|
|??|?|
|+?|+|
|*?|*|

### 1.4 多选分支
  一个模式可以实现横向和纵向模糊匹配。而多选分支可以支持多个子模式任选其一。
具体形式如下：(p1|p2|p3)，其中 p1、p2 和 p3 是子模式，用 |（管道符）分隔，表示其中任何之一。

## 2 正则表达式位置
  正则表达式是匹配模式，要么匹配字符，要么匹配位置。

### 2.1 什么是位置呢？
  位置（锚 `mao二声`）在两个字符之间

### 2.2. 如何匹配位置呢？
  在 es5 中共用 6 个锚
  ^ $ \b \B (?=p) (?!p)

### 2.2.1. ^ 和 $
  ^（脱字符）匹配开头，在多行匹配中匹配行开头。
  $（美元符号）匹配结尾，在多行匹配中匹配行结尾。
  比如我们把字符串的开头和结尾用 "#" 替换（位置可以替换成字符的！）：
  ```js
  var result = "hello".replace(/^|$/g, '#');
  console.log(result);
  // => "#hello#"
  ```
    多行匹配模式 即修饰符m 则 前匹配、后匹配都是一行为单位
  ```js
  var result = "I\nlove\njavascript".replace(/^|$/gm, '#');
  console.log(result);
  /*
  #I#
  #love#
  #javascript#
  */
  ```