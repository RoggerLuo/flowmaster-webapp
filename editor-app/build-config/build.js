var webpack = require('webpack')
var webpackConfig = require('./webpack.build.config.js')
var exec = require('child_process').exec
var copyFile = require('./copy.js')
var src = __dirname + '/..'

var dst = "/Users/roger/Work/流程大师/bpm-frontend/design/editor-app"

console.log('Webpacking...\n')
webpack(webpackConfig, function(err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
// return 
    copyFile(src, dst)

    // exec('gulp', function(err, stdout, stderr) {
    //     if (!err) {
    //         console.log('Gulp info:')
    //         console.log(stdout)
    //         console.log('Copying files to product env...')
    //         copyFile(src, dst)
    //     }
    //     if (err) console.log(err)
    // })
})