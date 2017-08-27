/**
 * Created a gulp sytles.
 *
 * @package styles
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
// gulp常;用插件
const config = require('./../config'),
    gulp = require('gulp'),

    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    gulpif = require('gulp-if'),

    rev = require('gulp-rev'),
    revQ = require('gulp-rev-query'),
    notify = require('gulp-notify');


module.exports = function () {
    // release styles
    gulp.task('scss', function () {
        return sass(config.watch.scss)
            .pipe(autoprefixer({
                browsers: ['last 2 versions', 'Android >= 4.0'],
                cascade: true, //是否美化属性值 默认：true 像这样：
                //-webkit-transform: rotate(45deg);
                //        transform: rotate(45deg);
                remove: true //是否去掉不必要的前缀 默认：true
            }))
            .pipe(gulp.dest(config.deploy.css))
            .pipe(gulpif(config.params.APP_ENV === 'production', concat('main.css')))
            .pipe(gulp.dest(config.deploy.css))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulpif(config.params.APP_ENV === 'production', cssmin({
                advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
                keepSpecialComments: '*'
                //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            })))
            .pipe(gulp.dest(config.deploy.css))
            .pipe(rev())
            .pipe(gulp.dest(config.deploy.css))
            .pipe(rev.manifest())
            .pipe(revQ('v')) // ?v=xxxxxxxxx
            .pipe(gulp.dest(config.deploy.css))
            .pipe(notify({message: 'Scss task complete'}));
    });
}
