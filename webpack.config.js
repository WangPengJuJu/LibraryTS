// 引入一个包
const path = require("path");
// 引入html文件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");

const env = process.env;

// webpack中的所有配置信息，都应该写在这里
module.exports = {

    // 指定入口文件
    entry: env.NODE_ENV === "production" ? "./src/index.ts" : "./example/index.ts",

    // 指定打包文件所在目录
    output:{

        libraryTarget: "umd",
        libraryExport: "default",

        // 指定打包文件的目录
        path: path.resolve(__dirname,'dist'),

        // 打包后文件的文件名
        filename: "index.js",

        // 告诉webpack不适用箭头
        environment: {
            arrowFunction: false
        }
    },

    //指定webpack打包时要是用的模块
    module:{
        // 指定要加载的规则
        "rules":[
            {
                test: /\.vue$/,
                use: [
                    "vue-loader"
                ]
            },
            {
                // test指定的是规则生效的文件
                test:/\.ts$/,
                //要使用的loader
                use:[
                    // 配置babel
                    {
                        // 指定加載器
                        loader: "babel-loader",
                        // 设置babel
                        options: {

                            // 设置预定义的环境
                            presets:[
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",

                                    // 配置信息
                                    {

                                        // 要兼容的目标浏览器
                                        targets:{
                                            "chrome":"88",
                                        },

                                        // 指定corejs版本
                                        "corejs":"3", 

                                        // 使用corejs的方式  按需加载
                                        "useBuiltIns":"usage"

                                    }
                                ]
                            ]

                        }
                    },
                    {
                        loader: "ts-loader",
                        // options: {
                        //     compilerOptions: {
                        //         noEmit: false
                        //     }
                        // }
                    }
                ],
                // 要排除的文件
                exclude:/node-modules/

            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              },
            // 设置less文件的处理
            {
                test:/\.less$/,
                use:[//从下往上执行
                    "style-loader",
                    "css-loader",
                    // 引入postcss配置
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    "postcss-preset-env",
                                    {
                                        browsers:'last 2 versions'
                                    }
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },

    // 配置webpack插件
    plugins:[
        new webpack.DefinePlugin(
            {
                "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV) 
            }
        ),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title:"这是一个自定义的title"
            template:'./example/index.html'
        })
    ],

    // 用来设置那些后缀名可以设置引用模块
    resolve:{
        extensions:['.ts','.js'],
        alias: {
            "@": path.join(__dirname, 'src'),
        }
    },

    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
      },

}