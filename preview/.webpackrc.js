export default {
  entry             : "./src/index.js",
  disableCSSModules  : true,
  ignoreMomentLocale : true,
  theme             : {
    "@primary-color": "#2A72FF",
    "@text-color": "#999",
    "@heading-color": "#999",
    "@border-color-base":"rgba(100,100,100,.3)",
    "@input-bg":"rgba(255,255,255,.03)",
    "@input-placeholder-color":"rgba(100,100,100,.5)"
  },
  html              : {
    "template": "./src/index.ejs"
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

