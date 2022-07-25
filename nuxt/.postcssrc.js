// eslint忽视该文件
// eslint-ignore-file
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 32,
      propList: ['*'],
      selectorBlackList: ['html', 'weui'],
      minPixelValue: 1,
    },
  },
}
