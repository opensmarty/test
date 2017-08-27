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
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

module.exports = function () {

    gulp.task('serve', function () {
        browserSync.init({
            server: config.path.devPath
        });
        // 看守所有.scss档
        gulp.watch(config.watch.scss, ['scss']);
        // 看守所有.css档
        gulp.watch(config.watch.css, ['css']);
        // 看守所有.js档
        gulp.watch(config.watch.js, ['scripts']);
        // 看守所有图片档
        gulp.watch(config.watch.img, ['images']);
        // 看守所有图片档
        gulp.watch(config.watch.fonts, ['fonts']);
        //看守html
        gulp.watch(config.src.tpl, ['html']);
        gulp.watch(config.deploy).on('change', reload);
    });
}



