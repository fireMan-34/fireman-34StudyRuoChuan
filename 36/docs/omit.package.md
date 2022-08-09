<!--
 * @Description: package Study
 * @Author: fireMan34
 * @LastEditors: fireMan34
 * @Date: 2022-08-08 21:09:20
 * @LastEditTime: 2022-08-08 22:13:36
-->
# 部分我不懂的库
## Father
    打包库 [Github 地址](https://github.com/umijs/father)
    >   备注 UMD：同时支持 AMD\Commonjs 规范
- father doc dev --storybook 开启文档服务
    ``` shell
    # 这是复制别人的命令解释
    # 打包库
    $ father build
    
    # 开发环境下启动文档服务
    $ father doc dev
    
    # 打包编译文档
    $ father doc build
    
    # 将文档部署到github
    $ father doc deploy
    
    # 组件库测试及测试覆盖率
    $ father test
    $ father test --coverage
    ```
- father doc deploy 部署
- npm run compile && np --yolo --no-publish 预发布 不部署
## @umijs/fabric
    一个包含 prettier，eslint，stylelint 的配置文件合集
    相当于开源的编码规范和格式化
    [GitHub 地址](https://github.com/umijs/fabric)

## np
    自动发布到 npmjs 的 规范化 工作流
    [Github 地址](https://github.com/sindresorhus/np)
# 词汇
- compile vt.编译
> vt 及物动词 后面可直接加宾语
- prepublishOnly
> pre + publish + Only 预发布？
-   prefer 宁可，较喜欢
# eslint
1.  no-template-curly-in-string disallow template literal placeholder syntax in regular strings
不允许 模板字符串 在 常规字符内使用
2. prefer-promise-reject-errors
要求 使用error类型作为reject参数
3. react/no-array-index-key
数组组件不需要 key警告
4. react/sort-comp
顺序的生命周期
5. import/no-named-as-default
import/no-named-as-default-member
导出相关
## 测试配置
.travis.yml
# 参考
- [组件库搭建](http://www.javashuo.com/article/p-neicrxfw-kd.html)