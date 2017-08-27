/**
 * Created a gulp build.
 *
 * @package build
 * @authors opensmarty (opensmarty@163.com)
 * @github  https://github.com/opensmarty
 * @date    2017-08-20 23:23:38
 * @version v1.0.0
 */

/*
 // 标准的node模块编写
 function require(/!* ... *!/) {
 const module = { exports: {} };
 ((module, exports) => {
 // Your module code here. In this example, define a function.
 function someFunc() {}
 exports = someFunc;
 // At this point, exports is no longer a shortcut to module.exports, and
 // this module will still export an empty default object.
 module.exports = someFunc;
 // At this point, the module will now export someFunc, instead of the
 // default object.
 })(module, module.exports);
 return module.exports;
 }
 */
const config = require('./../config'),
    gulp = require('gulp'),
    gulpSequence = require('gulp-sequence');

module.exports = function () {
    // 编译
    gulp.task('build', gulpSequence('clean', ['images', 'scripts', 'scss', 'fonts', 'html'], 'rev'));
}



