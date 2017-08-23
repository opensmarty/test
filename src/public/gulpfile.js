/*
 gulp.task('one', function() {
 console.log('one');
 });

 gulp.task('two', function() {
 console.log('two');
 });

 gulp.task('default', ['one', 'two'], function() {
 //  将你的默认任务代码放在这里
 console.log('default');
 });*/

// gulp常用插件
var gulp = require('gulp');

//这里用不上，管理js依赖的
// var　browserify = require('browserify');

//同样这里用不上，和上面那个一起的
var source = require('vinyl-source-stream');

//解析less, 这里用不上
var less = require('gulp-less');

//解析sass
var sass = require('gulp-ruby-sass');

//　混淆js
var uglify = require('gulp-uglify');

//增加私有变量前缀
var autoprefixer = require('gulp-autoprefixer');

//压缩css
var minifycss = require('gulp-minify-css');

//压缩html
var htmlmin = require('gulp-htmlmin');

//合并
var concat = require('gulp-concat');

//加控制台文字描述用的
var notify = require('gulp-notify');

var buffer = require('vinyl-buffer');

// lib 文件用
var fileinclude = require('gulp-file-include');

//替换变量以及动态html用
var template = require('gulp-template');

//重命名
var rename = require('gulp-rename');

//一个简单的server，用python的SimpleHttpServer会锁文件夹
var webserver = require('gulp-webserver');

//图片压缩
var imagemin = require('gulp-imagemin');

//if判断，用来区别生产环境还是开发环境的
var gulpif = require('gulp-if');

//加MD5后缀
var rev = require('gulp-rev');

//替换引用的加了md5后缀的文件名，修改过，用来加cdn前缀
var revReplace = require('gulp-rev-replace');

//pipeline中途添加文件夹，这里没有用到
var addsrc = require('gulp-add-src');

//也是个删除···
var del = require('del');

//操作pipe中文件路径的，加md5的时候用到了
var vinylPaths = require('vinyl-paths');

//控制task顺序
var runSequence = require('run-sequence');

// 清除文件
var clean = require('gulp-clean');


//　附加插件
var argv = require('yargs').argv,
    _ = require('lodash'),
    path = require('path');

// 环境信息
var source = 'source',
    develop = 'develop',
    production = 'production';

var src = {
    tpl: 'tpl/**',
    css: 'css/**/*.scss',
    js: ['lib/**/*.js', 'script/**/*.js'],
    html: 'html/**/*.html',
    img: 'image/**'
}

// 混淆js
gulp.task('jsmin', function () {
    gulp.src('src/public/static/script/core/system.js', {base: 'src/public/static'})
        .pipe(uglify())
        .pipe(gulp.dest('dist/static'));
});

// 清理文件
gulp.task('clean', function () {
});

// 自定义帮助文档
gulp.task('help', function () {
    console.log('   gulp build          文件打包');
    console.log('   gulp watch          文件监控打包');
    console.log('   gulp help           gulp参数说明');
    console.log('   gulp server         测试server');
    console.log('   gulp -p             生产环境（默认生产环境）');
    console.log('   gulp -d             开发环境');
    console.log('   gulp -m <module>        部分模块打包（默认全部打包）');
});

gulp.task('default', function () {
    //  将你的默认任务代码放在这里
    // gulp.start(['help']);
});