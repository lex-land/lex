# Maybe Good Idea

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
