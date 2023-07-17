/** 量词 */
const reg = /a{2,5}/;

console.log('量词匹配', 'aaafss'.match(reg));


/** 惰性匹配 */

const reg1 = /a{2,5}?/;
console.log('惰性匹配', 'aaafss'.match(reg1));