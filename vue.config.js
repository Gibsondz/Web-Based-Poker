module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: process.env.HTTP_PROXY,
                ws: true,
                changeOrigin: true
            },
            '^/auth': {
                target: process.env.HTTP_PROXY,
                ws: true,
                changeOrigin: true
            }
        },
        //https:true
    },
    productionSourceMap: false
}