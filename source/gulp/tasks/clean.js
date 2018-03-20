/**
 * Created a gulp config.
 *
 * @package config
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
clean = require('gulp-clean'),
    notify = require('gulp-notify');
module.exports = function () {

    // 清理
    gulp.task('clean', function () {
        return gulp.src([config.deploy.html, config.deploy.css, config.deploy.js, config.deploy.images, config.deploy.fonts], {read: false})
            .pipe(clean()).pipe(notify({message:'Clean deploy complete'}));
    });
}



