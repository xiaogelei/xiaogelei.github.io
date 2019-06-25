
// webpack 配置文件 

console.log("webpack");

var path=require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");  // 处理 html 文件 
var openBrowserWebpackPlugin = require("open-browser-webpack-plugin");
var extractTextPlugin = require("extract-text-webpack-plugin");  // 抽离样式
var webpack = require("webpack");

module.exports={
    entry:["./src/main.js"],
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"js/[name].[hash:8].js",
        publicPath:"",
    },
    devtool:"source-map", // 方便在线调试 

    resolve:{
        alias:{
            "@":path.resolve("src")
        }
    },

    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:["babel-loader"]
            },
            {
                test:/\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:8192,
                            name:"imgs/[name].[hash:8].[ext]"
                        }
                    }
                ]
            },
            {
                test:/\.(css|scss)/,
                use:extractTextPlugin.extract({
                    fallback:"style-loader",   //  把 node字符串代码转为 style 节点 
                    use:[
                        "css-loader" ,   // 转换为 commonJS 规范的模块 
                        {
                            loader:"postcss-loader",  // css 代码转化 
                            options:{
                                plugins:function(){
                                    return [
                                        require("cssgrace"),  // 代码美化 
                                        require("autoprefixer"), // 自动补全 
                                        require("postcss-px2rem-exclude")(
                                            {
                                                remUnit:100,   // 200px / 100  = 2rem
                                                exclude:/antd-mobile/i    // 排除UI库适配 
                                            }
                                        )
                                    ]
                                }
                            }
                        },
                        "sass-loader"
                    ]
                })
            },
            {
                test:/\.(css|less)/,
                use:extractTextPlugin.extract({
                    fallback:"style-loader",   //  把 node字符串代码转为 style 节点 
                    use:[
                        "css-loader" ,   // 转换为 commonJS 规范的模块 
                        {
                            loader:"postcss-loader",  // css 代码转化 
                            options:{
                                plugins:function(){
                                    return [
                                        require("cssgrace"),  // 代码美化 
                                        require("autoprefixer"), // 自动补全 
                                        require("postcss-px2rem-exclude")(
                                            {
                                                remUnit:100,   // 200px / 100  = 2rem
                                                exclude:/antd-mobile/i    // 排除UI库适配 
                                            }
                                        )
                                    ]
                                }
                            }
                        },
                        "less-loader"
                    ]
                })
            }
        ]
    },

    devServer:{
        contentBase:path.join(__dirname,"dist"),
        host:"0.0.0.0",
        port:8000,
        compress:true,
        hot:true,
        inline:true,
        // open:true,
        publicPath:"",
        proxy:{   // 代理
            "/vue": {
                target:"http://localhost:1901/",
                changeOrigin: true,
            },
            "/react": {
                target:"http://localhost:1901/",
                changeOrigin: true,
            }
        }
    },

    plugins:[ // 声明使用的插件 
        new openBrowserWebpackPlugin({url:"http://localhost:8000"}),

        new htmlWebpackPlugin({
            template:"./public/index.html",
            inject:true
        }),

        new extractTextPlugin({
            filename:"css/app.[hash:8].css",
            allChunks:true,
            disable:false
        }),

        // 自动引入 
        new webpack.ProvidePlugin({
            React:"React",
            Component:['react','Component']
        })
    ]
}