/**
 * Templateman config
 * @see https://github.com/adlite/templateman
 */
module.exports = {
  templates: [
    {
      name: 'React Component Function',
      files: [
        {
          from: './templates/react-func.js.tm',
          to: './components/${TM:COMPONENT_NAME}/${TM:COMPONENT_NAME}.js',
        },
        {
          from: './templates/export-module.js.tm',
          to: './components/${TM:COMPONENT_NAME}/index.js',
        },
      ],
    },
    {
      name: 'React Page',
      files: [
        {
          from: './templates/react-page.js.tm',
          to: './pages/${TM:URL}/index.js',
        },
      ],
    },
    {
      name: 'App Section',
      files: [
        {
          from: './templates/app-section-export-module.js.tm',
          to: './sections/${TM:PAGE_ROUTE}/${TM:COMPONENT_NAME}Section/index.js',
        },
        {
          from: './templates/app-section.js.tm',
          to: './sections/${TM:PAGE_ROUTE}/${TM:COMPONENT_NAME}Section/${TM:COMPONENT_NAME}Section.js',
        },
      ],
    },
    {
      name: 'MobX State Tree Model',
      files: {
        from: './templates/mobx-state-tree-model.js.tm',
        to: './mobx/stores/${TM:MODEL_NAME}.js',
      },
    },
    {
      name: 'React Component Function (partial)',
      files: {
        from: './templates/react-func.js.tm',
        to: './components/${TM:PARENT_COMPONENT_NAME}/${TM:COMPONENT_NAME}.js',
      },
    },
  ],
};
