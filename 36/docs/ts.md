<!--
 * @Description: 
 * @Author: fireMan34
 * @LastEditors: fireMan34
 * @Date: 2022-08-09 14:26:26
 * @LastEditTime: 2022-08-09 14:40:56
-->
# extends 关键字
    - 表示类的继承，能够继承父类方法
    - 泛型约束
    对 泛型 进行 描述
    ```typescript
    //车子要轮子
        function seeCars<T extends {wheel:number}>(cars:T[]){
            
        }
    ```
# keyof
# 类型断言
    - 类型断言有两种形式。 其一是“尖括号”语法：
    - as 语法
# 泛型