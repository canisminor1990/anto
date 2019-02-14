export default {
  history: 'hash',
  publicPath:" ",
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
    }],
  ],
  disableCSSModules  : true,
  theme             : {
    "@primary-color": "#2A72FF",
    "@text-color": "#999",
    "@heading-color": "#999",
    "@border-color-base":"rgba(100,100,100,.3)",
    "@input-bg":"rgba(255,255,255,.03)",
    "@input-placeholder-color":"rgba(100,100,100,.5)"
  },
};