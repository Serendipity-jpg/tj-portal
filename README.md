# 天机学堂 - 智汇云课堂
#### 项目简介
> 由学成在线项目升级 为智慧云课堂 主要包含课程录播、销售（优惠券）、评论、笔记、等相关功能实现。升级之后包含用户端和管理后台两个部分

#### 项目迭代日志：
    - v1 迭代时间2022.7月11日 - 2022.7.31号
    - 主要实现主要流程 包含用户（老师）、课程、搜索、购买、课程学习、优惠券 、财务 等相关功能
    - v2 迭代时间2022.8.4 - 2022.8.12
    - 主要实现 免费课程课程播放 包含点击课程购买(免费-加入学习计划)、视频播放（目录-实现学习计划及目录对应、问答、笔记-随着播放时间记录当前笔记）
#### 产品原型及设计

- 产品原型
    - 用户端 - 魏帅明： https://codesign.qq.com/app/design/ALwE9V58VljX1Dp/axure/O6ym7ZRVvqZAYED
    - 管理后台 - 刘烁：https://codesign.qq.com/s/zm5q0XqWX7ZRBb6/preview/prototype/bOEvq0r2Bm03PAY

- 设计稿：
    - 用户端 - 李芳华： https://codesign.qq.com/app/design/ALwE9V58VljX1Dp/Yyg5Zp2QdxN92lK/inspect

    - 管理后台 - 王静： https://codesign.qq.com/s/zm5q0XqWX7ZRBb6/GPEpZGAprra9w3z/inspect

#### 访问地址
- 用户端 
    - 测试地址一：http://172.17.2.134/tianji-test 松松（自己申请服务器部署）项目结束释放
    - 测试地址二：https://tjxt-user-t.itheima.net 运维部署
- 管理后台
    - 测试地址一：http://172.17.2.134/tianji-admin-test
    - 测试地址二：https://tjxt-admin-t.itheima.net 运维部署

#### 运行环境 - 初始开发环境及工具

- 项目开发环境: Mac + node: v17.8.0 + npm: 8.5.5 || pnpm: 6.32.8

#### 技术栈应用

- Vue3 + vite + Tdesign + pinia + vue-router

#### 项目结构
```html
java-eaglemap  
│
└───build - 打包目录
│   
└───public - 公共资源目录
│     
└───src - 源代码
│   ├── api 请求相关
│   ├── assets 公共资源
│   │   ├── images 图片资源
│   │   ├── scss 样式文件 - 对应页面、模块文件
│   │   │   ├── _fence.scss         
│   │   │   ├── _login.scss
│   │   │   ├── _search_comp.scss
│   │   │   ├── _server.scss
│   │   │   ├── _systemSet.scss
│   │   │   ├── _theme.scss                 - 主题样式 - 包含全局变量的样式 
│   │   │   ├── _trajectory_details.scss
│   │   │   ├── _trajectory.scss
│   │   │   └── style.scss                  - 样式入口
│   ├── api
│   ├── conponents                          公用组件
│   │   ├── Footer.tsx                      - 底部组件
│   │   ├── Header.tsx                      - 头部组件 包含log、导航、公用信息
│   │   ├── NoData.tsx                      - 无数据的展示组件
│   │   ├── React-CMap.tsx                  - 地图配置组件
│   │   └── Starch.tsx                      - 搜索组件
│   ├── pages                               页面展示目录
│   │   ├── fence 
│   │   │   ├── index.tsx                   - 电子围栏挂你首页 列表展示
│   │   │   └── details.tsx                 - 电子围栏挂详情  展示围栏地图及
│   │   ├── login                           登录页面
│   │   ├── server
│   │   │   ├── index.tsx                   - 服务端管理首页
│   │   │   └── details.tsx                 - 服务端管理详情页面 - 展示该服务下的终端列表
│   │   ├── systemSet                       - 系统配置页面
│   │   └── trajectory
│   │       ├── index.tsx                   - 轨迹管理首页
│   │       └── details.tsx                 - 轨迹管理详情页面 - 展示轨迹详情及地图展示该轨迹
│   ├── routers     路由页面
│   │   ├── index.tsx                   - 轨迹管理首页
│   │   └── PrivateRoute.tsx 
│   ├── utils       封装工具目录
│   │   ├── cookie.ts                   封装cookie 全局存储       
│   │   ├── request.ts                  封装请求模块
│   │   └── tool.ts                     相关公用函数  
│   ├── images      README.md的图片资源
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│    └── README.md

```
#### 数据结构设计
#### 安装运行

``` bash
## 安装依赖 
npm install || yarn 

## 启动项目 

# 启动链接mock
npm run dev
# 启动链接测试环境
npm run start

## 构建正式环境 - 打包 松松的环境打包 配置文件子啊config > proxy
npm run build 

```
#### 相关资料
Vue3: https://cn.vuejs.org/guide/introduction.html
#### 参考文档（项目开发过程中用到的所有技术难点 涉及到的相关参考）
- vite配置: https://vitejs.dev/config/
#### 包含的三方技术 简介（如果有的话需要写明）
- 腾讯视频播放器：https://cloud.tencent.com/document/product/266/58773
- https://tcplayer.vcube.tencent.com/
