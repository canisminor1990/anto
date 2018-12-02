export default {
  entry             : "./panel/index.js",
  disableCSSModules  : true,
  hash               : true,
  ignoreMomentLocale : true,
  theme             : {
    "@primary-color": "#2A72FF",
    "@text-color": "#999",
    "@heading-color": "#999",
    "@border-color-base":"#444",
    "@input-bg":"#333",
    "@input-placeholder-color":"#666"
  },
  html              : {
    "template": "./panel/index.ejs"
  },
  define            : {
    "$dirname": __dirname,
    "$isDev"  : process.env.NODE_ENV === "development"
  },
  extraBabelPlugins : [
    'lodash',
    ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}]
  ],
  env               : {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        ["babel-plugin-styled-components", { displayName: true }]
      ]
    },
    production : {
      browserslist       : ['iOS >= 8', 'Android >= 4'],
    }
  }
};

