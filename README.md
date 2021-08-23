# Exness Roofbar frontend Application

## <a name="inside">What’s Inside?</a>

- [Next.js 10](https://nextjs.org/) as a framework
- [MobX](https://mobx.js.org/) and [MobX State Tree](https://mobx-state-tree.js.org/) for application state management
- [SCSS](https://sass-lang.com/documentation) with [CSS Modules](https://github.com/css-modules/css-modules)
- [ESLint](https://eslint.org/) with [import](https://www.npmjs.com/package/eslint-plugin-import) and [jsx-a11y](https://www.npmjs.com/package/eslint-plugin-import) plugins
- [Prettier](https://prettier.io/) (does not conflict with eslint and stylelint rules)
- [Templateman](https://github.com/adlite/templateman) for fast components creation
- Production assets optimization: [SVGO](https://github.com/Klathmon/imagemin-webpack-plugin#optionssvgo)
- Webpack [react-svg-loader](https://github.com/boopathi/react-svg-loader)
- Prepared basic Gitlab CI/CD configuration

## <a name="get-started">Getting Started</a>

### Environment

Prerequisites:

- Node.js v14.x.x
- Npm v6.x.x

### Installing dependencies

To initialize project you should install dependencies from `package-lock.json` file via:

```
npm ci
```

### Set up environment variables
To make app working, copy `.env.example` file to `.env.local` and define all necessary variable values.

See [Next.js Environment Variables docs](https://nextjs.org/docs/basic-features/environment-variables) for more info.

### HTTP Basic Auth
To disable Basic Authorization remove `BASIC_AUTH_ENABLED` string from `.env.local` file.


### Launch development version

To start Next development server:

```
npm run app:dev
```

Then open `http://localhost:3000`.

You can specify dev port in package.json `app:dev` script.

### Launch production version
1. Install dependencies with `npm ci`
1. Copy `.env.example` file to `.env.local` and define all necessary variable values
1. Build production app version with command `npm run app:build`
1. You can specify app port in `.env.local` file modifying `PORT` variable
1. Start production server with command `npm run app:start`

### Linters

You can inspect all you code in parallel running:

```
npm run linters:inspect
```

If it's possible you can inspect and autofix issues by linters running:

```
npm run linters:fix
```

