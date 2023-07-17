/** 匹配颜色 */

const test = [
  '#ffbbad',
  '#Fc01DF',
  '#FFF',
  '#ffE',
];

const regs = /^#[\d\w]{3}|[\d\w]{6}$/;

test.forEach(
  str => {
    console.log('str', regs.test(str))
  }
)

/** 匹配时间 */

const test1 = [
  '23:59',
  '02:07',
];

const regs1 = /^((0?\d)|1\d|[2][0-3]):([0-5]\d)$/;

test1.forEach(
  str => {
    console.log('str1', regs1.test(str))
  }
)

/** 匹配日期 */

const test2 = [
  '2017-06-10',
  '2022-03-25'
];

const regs2 = /^(([0-1]\d|20)\d{2})-((0\d|1[0-2]))-([0-2]\d|3[0-1])$/;

test2.forEach(
  str => {
    console.log('str2', regs2.test(str))
  }
)

/** 匹配 window 路径 */
const test3 = [
  'F:\\study\\javascript\\regex\\regular expression.pdf',
  'F:\\study\\javascript\\regex\\',
  'F:\\study\javascript',
  'F:\\',
];

const reg3 = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n]+\\)*([^\\:*<>|"?\r\n]+)?/;

test3.forEach(
  str => {
    console.log('str3', reg3.test(str))
    // console.log('str3 -> ', str.match(/\\/g))
  }
)

/** 匹配 ID */

const test4 = [
  '<div id="container" class="main"></div>'
];

const reg4 = /id=["'][\w\d]+?["']/g; // 涉及回溯，性能问题
const reg4_1 = /id=["'][^"']+?["']/g; // 优化

test4.forEach(
  str => {
    console.log('str4', reg4.test(str))
  }
)

/*** 第一章完结撒花 */