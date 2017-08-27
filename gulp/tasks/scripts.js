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
// gulp常;用插件
const config = require('./../config'),
    gulp = require('gulp'),

    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    order = require("gulp-order"),

    gulpif = require('gulp-if'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    // sourcemaps = require('gulp-sourcemaps'),

    rev = require('gulp-rev'),
    revQ = require('gulp-rev-query'),
    notify = require("gulp-notify");
module.exports = function () {
// release scripts
    gulp.task('scripts', function () {
        return gulp.src(config.watch.js)
            .pipe(order(config.order))
            //.pipe(jshint('.jshintrc'))
            //.pipe(jshint.reporter('default'))
            // .pipe(sourcemaps.init())
            .pipe(gulpif(config.params.APP_ENV === 'production', concat('main.js')))
            .pipe(gulp.dest(config.deploy.js))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(config.deploy.js))
            .pipe(gulpif(config.params.APP_ENV === 'production', uglify()))
            .pipe(gulp.dest(config.deploy.js))
            .pipe(rev())
            .pipe(gulp.dest(config.deploy.js))
            .pipe(rev.manifest())
            .pipe(revQ('v')) // ?v=xxxxxxxxx
            // .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.deploy.js))
            .pipe(notify({message: 'Scripts task release'}));
    });
}



