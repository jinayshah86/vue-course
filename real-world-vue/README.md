# Real World Vue.js

### This is the codebase for Intro to Real World Vue.js

#### Topics Included

- Vue CLI
- Vue UI
- Vue Routers
- Vue Components
- API Calls

### Why a CLI?

#### As you probably know, CLI stands for Command Line Interface, and the Vue CLI provides a full system for rapid Vue.js development. This means it does a lot of tedious work for us and provides us with valuable features out-of-the-box.

- It allows us to select which libraries our project will be using Then it automatically plugs them into the project.
- It Configures Webpack When we build our app with Webpack, all of our JavaScript files, our CSS, and our dependencies get properly bundled together, minified and optimized.
- It allows us to write our HTML, CSS & JavaScript however we like We can use single-file .vue components, TypeScript, SCSS, Pug, the latest versions of ECMAScript, etc.
- It enables Hot Module Replacement (HMR) So when you save your project, changes appear instantly in the browser. This configuration is based on webpack-dev-server.

## Project setup

```
npm install
npm i -g json-serve
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Run Mock API Server

```
json-serve --watch db.json
```

### Run Mock API Server with delay

```
json-serve -d 1500 --watch db.json
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

`Jinay Shah`
