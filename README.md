<p align="center">
  <a href="https://lex-land.online" target="blank"><img src="./public/images/logo.svg" width="150" alt="Lex Logo" /></a>
</p>

<p align="center">
<a href="http://jenkins-hlcx.sunmi.com/job/lex/job/master/" target="_blank"><img src="http://jenkins-hlcx.sunmi.com/buildStatus/icon?job=lex%2Fmaster" alt="Jenkins" /></a>
</p>

Lex 是一个接口文档管理工具，是在 Rap2 的想法上重新架构的一个产品。相比 Swagger UI、sosoApi、showDoc 等工具，Lex 主要做的不仅仅把接口呈现出来，更多的是提供结构化的接口定义去为前端的 mock 数据、自动化接口测试、批量测试用例覆盖等一系列配合上下游的协作。

## Environment

- node
- docker
- docker-compose
- mysql
- nginx

## Start

```shell
# 安装yarn
npm i -g yarn

# 安装依赖
yarn

# 使用server/migration/sql/init-db.sql进行数据库初始化并启动两个容器
# 一个是mysql5.6，它会把数据挂载在cache目录做持久化存储
# 另一个是phpmyadmin，会启动一个数据库管理工具
npm run database

# 运行开发环境，使用本地docker内的mysql
npm run start:dev
```

成功运行开发环境后

- 查看 [http://localhost:3000](http://localhost:3000)
- 查看 [http://localhost:8080](http://localhost:8080)，可以进入 phpmyadmin 进行数据库管理

## Deploy

```shell

# 目标机器按照nodejs
# https://github.com/nodesource/distributions/blob/master/README.md

npm run deploy
```

## Roadmap

- [x] 使用一个更酷的名字代替 rap, 它叫[Lex](https://zh.wikipedia.org/wiki/%E9%9B%B7%E5%85%8B%E6%96%AF%C2%B7%E8%B7%AF%E7%91%9F)
- [x] 重新设计 logo
- [x] 使用 nestjs 代替 koa
- [x] 使用 nextjs 作为写 React 的姿势，代替 create-react-app
- [x] 使用 typeorm 代替 sequelize-typescript
- [x] 使用 docker 运行项目的开发环境，为部署做无缝衔接
- [x] 轻状态管理，使用 hooks 进行状态逻辑复用
- [x] 支持 Jenkins 的 Pipeline 进行 CI/CD
- [x] 使用 docker 运行项目的生产环境
- [ ] 不断优化页面异常处理
- [ ] 不断优化 helpers、components、core、pages 之间的关系
- [ ] 重新思考 UI 呈现，使用[blueprint](https://blueprintjs.com/docs/#core)代替 bootstrap
- [ ] 优先完成 repo 仓库模块
- [ ] 使用 styled-component 进行组件样式重构
- [ ] 完成与 Rap 的功能
- [ ] 完成 Next Feature
- [ ] 表单完全校验
- [ ] 风格化
- [ ] 使用 algolia 全局接口搜索
- [ ] 支持 CicleCI
- [ ] SEO
- [ ] 支持[GraphQL](https://nec.is/writing/next-js-apollo-graphql-performance-tuning-from-lists-to-details/)

## Progress

- [ ] 异常页面，包含 401、403、404、500、503 等，现阶段已经一致化，还待风格化 （完成度 80%）
- [ ] join 页面 全名重复待校验 （完成度 70%）
- [ ] login 页面，登录页面已完成，待风格化 （完成度 80%）
- [ ] repo/new 页，
- [ ] repo/show 页，
- [ ] repo/members 页，
- [ ] repo/modules 页，
- [ ] repo/modules/show 页，
- [ ] repo/modules/edit 页，
- [ ] repo/settings 页，
- [ ] repo/wiki 页，
- [ ] users 页
- [ ] orgs 页
- [ ] settings 页
- [ ] 导航条里的全局搜索
- [ ] 近期浏览，类似[这样](https://developers.facebook.com/docs/accountkit)
- [ ] dashboard 页面 仪表盘只做了左侧的导航

## Maybe Good Idea

- 提取 quickform 组件用于表单的提交

  - 与 Button 组合产生 CURD
  - 与 Page.Card 组合产生 登录、注册、重新验证等 页面

- 使用 styled-components 基于模块进行组件拆分

  - 当我写页面的时候，就用 Page 上的组件进行页面布局，比如<Page.Container/>
  - 当我写 Repo 子页面的时候，就用 Repo 上的组件进行子页面布局，比如<Repo.SubPage/>
  - 相关样式基于上面的原则就会跟着模块走

- getInitialProps 的逻辑复用
  - [一些想法](https://github.com/zeit/next.js/issues/186)
  - [with-recompose](https://github.com/zeit/next.js/tree/canary/examples/with-recompose)
  - [next-compose-initial-props](https://www.npmjs.com/package/next-compose-initial-props)

## Next Feature

- [ ] 添加从 Rap2 迁移功能，方便用户从 Rap2 迁移至 Lex
- [ ] 添加接口操作日志
- [ ] 添加接口返回码
- [ ] 添加仓库内公共内容
- [ ] 添加仓库 Wiki
- [ ] 添加接口类型，用于复用那些[复杂数据接口](https://blueprintjs.com/docs/#core/components/control-group.props)
- [ ] 添加用户角色，前端、后端、测试
- [ ] 添加 mock 数据和接口数据的匹配

## Troubleshooting

- Q: macOS 下，docker 启动开发环境比直接用 node 启动慢
- A: [修改 host](https://www.google.com/search?newwindow=1&ei=WLj_XKKmN5Lj-Aa6k4GQAw&q=docker-compose+up+%E6%85%A2&oq=docker-compose+up+%E6%85%A2&gs_l=psy-ab.3..35i39.19786.20372..20872...0.0..0.608.1075.4-1j1......0....1..gws-wiz.nQxEVscW-Q4)
