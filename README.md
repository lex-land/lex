<p align="center">
  <a href="https://lex-land.online" target="blank"><img src="./public/images/logo.svg" width="150" alt="Lex Logo" /></a>
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

- [ ] Brand/UI/VI
  - [x] 使用[blueprint](https://blueprintjs.com/docs/#core)代替 bootstrap
  - [x] 使用一个更酷的名字代替 rap, 它叫[Lex](https://zh.wikipedia.org/wiki/%E9%9B%B7%E5%85%8B%E6%96%AF%C2%B7%E8%B7%AF%E7%91%9F)
  - [x] 重新设计 logo
- [ ] Tech/Arch
  - [x] 使用 nestjs 代替 koa
  - [x] 使用 nextjs 作为写 React 的姿势，代替 create-react-app
  - [x] 使用 typeorm 代替 sequelize-typescript
  - [x] 轻状态管理，使用 hooks 进行状态逻辑复用
  - [x] 使用 styled-component 进行组件样式重构，移除已有 less
  - [ ] 不断优化 helpers、components、core、pages 之间的关系
- [ ] Pruduct
  - [ ] 完成与 Rap 的功能
    - [x] 页面异常处理。
      - [x] 异常页面，包含 401、403、404、500、503 等
      - [x] nginx 的 502 页面
    - [x] join 页面
    - [x] login 页面
    - [ ] 优先完成 repo 仓库模块
      - [x] repo/new 页
        - [ ] 添加从 Rap2 迁移功能，方便用户从 Rap2 迁移至 Lex
          - [x] 新增从 JSON 创建仓库
      - [x] repo/show 页
      - [x] repo/modules 页
      - [ ] repo/settings 页
      - [ ] repo/members 页
      - [ ] 添加仓库 Wiki
        - [ ] 添加接口操作日志
        - [ ] 添加 mock 数据和接口数据的匹配
        - [ ] 添加接口返回码
        - [ ] 添加仓库内公共内容
        - [ ] 添加接口类型，用于复用那些[复杂数据接口](https://blueprintjs.com/docs/#core/components/control-group.props)
    - [ ] users 页
      - [ ] 添加用户角色，前端、后端、测试
    - [ ] orgs 页
    - [ ] settings 页
- [ ] CI/CD
  - [x] 使用 docker 运行项目的开发环境，为部署做无缝衔接
  - [x] 支持 Jenkins 的 Pipeline 进行 CI/CD
  - [x] 使用 docker 运行项目的生产环境
  - [ ] 支持 CicleCI

## Troubleshooting
