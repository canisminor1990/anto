module.exports = {
  parser       : "babel-eslint",
  extends      : [
    "standard",
    "plugin:flowtype/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/flowtype",
    "prettier/react",
    "prettier/standard"
  ],
  plugins      : [
    "flowtype",
    "react",
    "prettier",
    "standard"
  ],
  parserOptions: {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx"                         : true
    }
  },
  globals      : {
    "window"              : true,
    "location"            : true,
    "document"            : true,
    "navigator"           : true,
    "localStorage"        : true,
    "$isDev"              : true,
    "define"              : true,
    "fetch"              : true,
    "AppController"       : true,
    "MSSliceLayer"        : true,
    "MSLayerMovement"     : true,
    "NSBezierPath"        : true,
    "NSMakePoint"         : true,
    "MSShapePathLayer"    : true,
    "MSPath"              : true,
    "NSDocumentController": true,
    "NSWorkspace"         : true,
    "NSURL"               : true,
    "NSSavePanel"         : true,
    "NSString"            : true
  },
  env          : {
    "es6" : true,
    "node": true
  },
  rules        : {
    "prettier/prettier"          : [
      2, {
        "printWidth"   : 100,
        "singleQuote"  : true,
        "trailingComma": "es5",
        "parser"       : "flow"
      }
    ],
    "no-unused-vars"             : 1,
    "react/display-name"         : 0,
    "react/react-in-jsx-scope"   : 0,
    "react/prop-types"           : 0,
    "react/no-children-prop"     : 0,
    "react/no-string-refs"       : 0,
    "react/no-unescaped-entities": 0,
    "handle-callback-err"        : 1,
    "new-cap"                    : 0
  }
};