/**
 * Created a gulp help.
 *
 * @package help
 * @authors opensmarty (opensmarty@163.com)
 * @github  https://github.com/opensmarty
 * @date    2017-08-20 23:23:38
 * @version v1.0.0
 */

module.exports = function () {
    // gulp常用插件
    const gulp = require('gulp');

    return gulp.task('help', function () {
        console.log('   gulp build          文件打包');
        console.log('   gulp release          文件发布');
        console.log('   gulp watch          文件监控打包');
        console.log('   gulp help           gulp参数说明');
        console.log('   gulp server         测试server');
        console.log('   gulp -p             生产环境（默认生产环境）');
        console.log('   gulp -d             开发环境');
        console.log('  gulp -m <module>    部分模块打包（默认全部打包）');
    });
}