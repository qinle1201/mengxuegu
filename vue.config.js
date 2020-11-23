module.exports = {
    // 配置路径
    publicPath:  "./",
    // 开启服务器
    devServer: {
        // 配置端口号
        port: 9999,
        // 是否自动打开浏览器
        open: true,
        // 设置主机名
        host: 'localhost',
        // 是否开启https协议
        https: false,
        // 配置跨域
        proxy: {
            // 代理地址    需要代理的接口
            [process.env.VUE_APP_BASE_API]: {
                // 跨域地址    目标地址
                target: process.env.VUE_APP_SERVICE_URL,
                // 开启代理   是否跨域
                changeOrigin: true,
                // 重写路径
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
    // 是否开启ESlint语法
    lintOnSave: false,
    // 打包时不会生成.map文件， 加快打包速度
    productionSourceMap: false
}