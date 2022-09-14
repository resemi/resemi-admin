<div align="center">

<h1>Resemi Admin</h1>

</div>

**中文** | [English](./README.md)

## 简介

Resemi Admin 是一个免费开源的中后台模版, 使用了最新的`NextJS 12`，`React 18`，`TypeScript`等主流技术开发。


## 特性
- 最新技术栈：使用最新的`NextJS 12`，`React 18`等前沿技术开发
- TypeScript：更安全的类型检查
- 主题定制：内置暗黑模式的支持，以及可定制化主题
- 国际化：内置国际化支持
- 组件：丰富的高阶组件和对常用组件的二次封装


## 准备
- [Semi Design](https://semi.design/) - 一个现代化、全面、灵活的设计系统和UI库
- [Next.js](https://nextjs.org/) - React 框架
- [React](https://reactjs.org/) - 用于构建用户界面的 JavaScript 库
- [Recoil](https://recoiljs.org/zh-hans/) - React 状态管理库
- [TypeScript](https://www.typescriptlang.org/) - JavaScript的超集
- [WindiCSS](https://cn.windicss.org/) - 下一代工具类 CSS 框架


## 安装使用

```bash
# 获取项目代码
git clone https://github.com/resemi/resemi-admin.git

# 安装依赖
cd resemi-admin && pnpm install

# 运行
pnpm dev

# 构建打包
pnpm build
```


## 使用 Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/resemi/resemi-admin)


## 如何贡献

欢迎你的加入！[提一个 Issue](https://github.com/resemi/resemi-admin/issues/new/choose) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码！
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`


## Git 贡献提交规范

> 参考 [Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `ci` 持续集成
- `types` 类型定义文件更改


## 更新日志

[CHANGELOG](./CHANGELOG.md)


## License

[MIT](./LICENSE)