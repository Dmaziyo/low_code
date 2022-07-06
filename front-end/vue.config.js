module.exports = {
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/luban-h' : '/',
  devServer: {
    proxy: 'http://localhost:1337'
  }
}
