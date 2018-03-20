/**
 * Created a gulp config.
 *
 * @package config
 * @authors opensmarty (opensmarty@163.com)
 * @github  https://github.com/opensmarty
 * @date    2017-08-20 23:23:38
 * @version v1.0.0
 */

    // gulp常用插件
const config = require('./../config'),
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    rev = require('gulp-rev'),
    revQ = require('gulp-rev-query'),
    notify = require("gulp-notify");

module.exports = function () {
    // release images
    gulp.task('images', function () {
        return gulp.src(config.watch.images)
            .pipe(cache(imagemin({
                optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            })))
            .pipe(gulp.dest(config.deploy.images))
            .pipe(rev())
            .pipe(gulp.dest(config.deploy.images))
            .pipe(rev.manifest())
            .pipe(revQ('v'))
            .pipe(gulp.dest(config.deploy.images))
            .pipe(notify({message: 'Images task complete'}));
    });
}


