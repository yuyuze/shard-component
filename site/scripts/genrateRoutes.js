/* eslint-disable @typescript-eslint/no-var-requires */
const globby = require('globby');
const fs = require('fs');
// const path = require('path');
const matter = require('gray-matter');

function createComponents(paths, type, fileName) {
  const components = {};
  // 注册仅有的组件
  paths.forEach((path) => {
    const content = fs.readFileSync(path).toString();
    const componentName = path.split('/')[1];
    if (componentName) {
      const { data } = matter(content);
      components[componentName] = { ...components[componentName], ...data };
    }
  });

  const TEMPLATE = `
    export default [
      ${Object.keys(components).map(
    (component) => `
      {
        path: '${component}',
        meta: ${JSON.stringify(components[component])},
        component: () => import('../../../${type}/${component}/demo/index.vue'),
      }`,
  )}
    ];`;

  fs.writeFileSync(`site/src/router/${fileName}.js`, TEMPLATE);
}

// 异步写入 demoRoutes
(async () => {
  // 解析所有文件中带有 doc.md
  const componentsPaths = await globby('components/*/doc.md');
  const templatePaths = await globby('template/*/doc.md');
  createComponents(componentsPaths, 'components', 'demoRoutes');
  createComponents(templatePaths, 'template', 'temRoutes');
  // console.log(paths);
  // const components = {};
  // // 注册仅有的组件
  // componentsPaths.forEach((path) => {
  //   const content = fs.readFileSync(path).toString();
  //   const componentName = path.split('/')[1];
  //   if (componentName) {
  //     const { data } = matter(content);
  //     components[componentName] = { ...components[componentName], ...data };
  //   }
  // });

  // const TEMPLATE = `
  // export default [
  //   ${Object.keys(components).map(
  //   (component) => `
  //   {
  //     path: '${component}',
  //     meta: ${JSON.stringify(components[component])},
  //     component: () => import('../../../components/${component}/demo/index.vue'),
  //   }`,
  // )}
  // ];`;

  // fs.writeFileSync('site/src/router/demoRoutes.js', TEMPLATE);
})();
