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
    htmlmin = require('gulp-htmlmin'),
    fileinclude = require('gulp-file-include'),
    gulpif = require('gulp-if'),

    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    notify = require('gulp-notify');

module.exports = function () {
    // html
    gulp.task('html', function () {
        return gulp.src(config.watch.html)
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest(config.deploy.html))
            .pipe(gulpif(config.params.APP_ENV === 'production', htmlmin({
                removeComments: true,//清除HTML注释
                collapseWhitespace: true,//压缩HTML
                collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
                removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
                removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
                removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
                minifyJS: true,//压缩页面JS
                minifyCSS: true//压缩页面CSS
            })))
            .pipe(gulp.dest(config.deploy.html))
            .pipe(notify({message: 'html task complete'}));
    });

// release html
    gulp.task('rev', function () {
        return gulp.src(config.watch.rev)
            .pipe(revCollector({
                revSuffix: '\\\?v=[0-9a-f]{8,10}',
                replaceReved: true,
                // dirReplacements: {
                //     'css': '/dist/css/',
                //     'js/': '/dist/js/',
                //     'cdn/': function(manifest_value) {
                //         return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/images/' + manifest_value;
                //     }
                // }
            }))
            .pipe(gulp.dest(config.deploy.html))
            .pipe(notify({message: 'rev task complete'}));
    });
}



