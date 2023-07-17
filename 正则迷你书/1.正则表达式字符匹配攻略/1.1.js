/** 1.1 两种模糊匹配 */
var regex = /hello/;

console.log('1.1', regex.test('hello'))

/** 1.1.1 */

var regex1 = /ac{2,5}/g;
var testStr1 = 'aaccadjf cadccaccccs accc acccccc';
console.log('1.1.1', testStr1.match(regex1));


/** 1.1.2 */
var regex2 = /a[bgc]c/g;
var testStr2 = 'acc adf abc agbabbcgb '
console.log('1.1.2', testStr2.match(regex2));