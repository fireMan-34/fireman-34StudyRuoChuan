/*
 * @Description: Object 类型 知识小结
 * @Author: fireMan34
 * @LastEditors: fireMan34
 * @Date: 2022-08-08 22:40:48
 * @LastEditTime: 2022-08-09 14:20:23
 */
const AuthorClass=class {
    constructor(name,age){
        this.name=name;
        this.age=age;

        // [] 访问 可用 字符串 表达式 Symbol 值
        this[Symbol("symbolKey")]="SymbolKey";
        this["变量key"]="中文";
    }
    //prototype
    sayName(){
        console.log(this.name)
    }
};
AuthorClass.prototype.tools=["pen","computer"];

class ProgrameAuthorClass extends AuthorClass{
    constructor(...args){
        super(...args)
    }
    sayMyJob(){
        console.log(this.name+"is a programer");
    }
};
// 构造类 只能 通过这种方式 添加 原型属性
ProgrameAuthorClass.prototype[Symbol('programSymbol')]="programSymbol";

const fireObj=new ProgrameAuthorClass("fireman-34",22);

Object.defineProperties(fireObj,)

// 实例内部指针 所以访问是动态
ProgrameAuthorClass.prototype.newAttr="newAttr";

const LogMap=new Map();
const LogKey=["遍历包括原型的可迭代属性","这是实例的属性",'这是原型属性','这是实例的Symbol属性','Object key 枚举','Object entries 枚举','Object  values 枚举'];
const ArrayMapPush=(map,key,value)=>{
    if(map.has(key)){
        map.get(key).push(value);
        return;
    }
    else {
        map.set(key,[value]);
        return;
    }
};

//for in 循环 访问所有实例和原型的可枚举非Symbol类key的属性
for(const protoType in fireObj){
    ArrayMapPush(LogMap,LogKey[0],protoType)
    if(fireObj.hasOwnProperty(protoType)){
        ArrayMapPush(LogMap,LogKey[1],protoType);
    }
    else {
        ArrayMapPush(LogMap,LogKey[2],protoType);
    }
};
[...LogMap.entries()].forEach(([key,value])=>{
   console.log(key,value)
});

//for of 处理 符合迭代器接口标准 的对象
// 遍历实例可枚举非Symbol类key的属性
for(const protoType of Object.getOwnPropertyNames(fireObj)){
    console.log(LogKey[1],protoType)
};
//  返回自身所有可枚举的Symond类key的 迭代器 对象
for(const protoType of Object.getOwnPropertySymbols(fireObj)){
    console.log(LogKey[2],protoType)
};
for(const protoType of Object.keys(fireObj)){
    console.log(LogKey[4],protoType)
}
for(const protoType of Object.entries(fireObj)){
    console.log(LogKey[4],protoType)
}
for(const protoType of Object.values(fireObj)){
    console.log(LogKey[5],protoType)
}