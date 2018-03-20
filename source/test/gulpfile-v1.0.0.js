/*

 安装gulp：　
 npm install --save-dev gulp -g
 npm install --save MD5　　两者都用
 npm install --save-dev grunt-contrib-concat 只在开发中用，发布时不用
 以上两种--save 和--save-dev 区别:
 npm install --production 使--save-dev不会自动安装到node_modules,　用npm install 也会把--save-dev安装到node_modules，而-save 的安装包必然安装到node_modules,
 即把开发后不用的包不会发布到生产node_modules. 使用原则: 运行时需要用到的包使用--save，否则使用--save-dev

 gulp插件及附加插件安装列表如下：
 sudo npm install gulp -g
 npm install gulp gulp-livereload --save-dev
 npm install --save-dev gulp-uglify gulp-concat gulp-minify-css gulp-htmlmin
 npm install --save-dev gulp-less gulp-ruby-sass gulp-autoprefixer gulp-rename
 npm install --save-dev gulp-imagemin gulp-file-include gulp-template gulp-notify
 npm install --save-dev gulp-if gulp-rev gulp-rev-replace gulp-clean gulp-order gulp-webserver
 npm install --save-dev gulp-add-src vinyl-paths run-sequence vinyl-source-stream vinyl-buffer
 npm install --save-dev gulp-jshint browserify　browser-sync　
 // gulp-shell　gulp-ssh del

 npm install --save-dev gulp-jade
 npm install gulp gulp-clean jshint gulp-jshint jshint-stylish gulp-sftp gulp-util minimist --save-dev

 npm install --save-dev yargs　path lodash

 给css文件里引用url加版本号
 gulp-make-css-url-version

 npm install --save-dev jshint gulp-jshint
 npm install gulp-cache --save-dev

 gulp.task('one', function() {
 console.log('one');
 });

 gulp.task('two', function() {
 console.log('two');
 });

 gulp.task('default', ['one', 'two'], function() {
 //  将你的默认任务代码放在这里
 console.log('default');
 });

 var gulp     = require('gulp'),
 imagemin = require('gulp-imagemin'),
 pump     = require('pump');

 gulp.task('testImagemin', function (cb) {
 pump([
 gulp.src('src/img/*.{png,jpg,gif,ico}'),
 imagemin({
 optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
 progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
 interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
 multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
 }),
 gulp.dest('dist/img')
 ], cb);
 });
 */

// gulp常用插件
var gulp = require('gulp');

var pump = require('pump');

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
var cssmin = require('gulp-minify-css');

var cssver = require('gulp-make-css-url-version');

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

// 清除文件
var clean = require('gulp-clean');

//
var order = require('gulp-order');

//
var jshint = require('gulp-jshint');

//图片压缩
var imagemin = require('gulp-imagemin');

var pngquant = require('imagemin-pngquant');

var cache = require('gulp-cache');

//if判断，用来区别生产环境还是开发环境的
var gulpif = require('gulp-if');

//加MD5后缀
var rev = require('gulp-rev');

//替换引用的加了md5后缀的文件名，修改过，用来加cdn前缀
var revReplace = require('gulp-rev-replace');

//pipeline中途添加文件夹，这里没有用到
var addsrc = require('gulp-add-src');

//也是个删除···
//var del = require('del');

//操作pipe中文件路径的，加md5的时候用到了
var vinylPaths = require('vinyl-paths');

//控制task顺序
var runSequence = require('run-sequence');

// 持久加载，便于测试
var livereload = require('gulp-livereload');

//一个简单的server，用python的SimpleHttpServer会锁文件夹
//var webserver = require('gulp-webserver');

//　附加插件
var argv = require('yargs').argv,
    _ = require('lodash'),
    path = require('path');

// 文件依赖路径
var src = {
    asset: {
        tpl: 'asset/**/*.tpl',
        css: 'asset/**/*.scss',
        js: ['asset/main.js', 'asset/common/*.js', 'asset/js/**/*.js'],
        img: 'asset/**/*.{png,jpg,gif,ico,svg}',
        html: 'asset/**/*.{html,htm}'
    },
    wgt: {
        tpl: 'asset/widget/**/*.tpl',
        css: 'asset/widget/**/*.scss',
        js: 'asset/widget/**/*.js',
        img: 'asset/widget/**/*.{png,jpg,gif,ico,svg}',
        html: 'asset/widget/**/*.{html,htm}'
    },
    dep: {
        tpl: 'dep/**/*.tpl',
        css: 'dep/**/*.scss',
        js: 'dep/**/*.js',
        html: 'dep/**/*.html',
        img: 'dep/**/*.{png,jpg,gif,ico,svg}',
    }
}

//确保已本地安装gulp-make-css-url-version [cnpm install gulp-make-css-url-version --save-dev]
gulp.task(' opz2css', function () {
    gulp.src(src.css, {base: env.asset})
        .pipe(rename({suffix: '.min'}))
        // 自动添加兼容浏览器前缀
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）
        // 压缩css
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest(env.dist));
});

// 先核心js，然后将其丑化。意义所在： 使用gulp-concat合并javascript文件，减少网络请求
gulp.task('asset2js', function () {
    gulp.src(src.asset.js, {base: 'asset'})
        .pipe(concat('all.js'))//合并后的文件名
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({
            //mangle: true,//类型：Boolean 默认：true 是否修改变量名
            mangle: {except: ['require', 'exports', 'module', '$', '_']}//排除混淆关键字
            // compress: true,//类型：Boolean 默认：true 是否完全压缩
            // preserveComments: 'all' //保留所有注释
        }))
        .pipe(gulp.dest('dist'));
});

// 先合并核心js，然后将其丑化。意义所在： 使用gulp-concat合并javascript文件，减少网络请求
gulp.task('wgt2js', function () {
    gulp.src(src.wgt.js)
        .pipe(concat('wgt.js'))//合并后的文件名
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({
            //mangle: true,//类型：Boolean 默认：true 是否修改变量名
            mangle: {except: ['require', 'exports', 'module', '$', '_']}//排除混淆关键字
            // compress: true,//类型：Boolean 默认：true 是否完全压缩
            // preserveComments: 'all' //保留所有注释
        }))
        .pipe(gulp.dest('dist/wgt'));
});

// 先合并核心js，然后将其丑化。意义所在： 使用gulp-concat合并javascript文件，减少网络请求
gulp.task('dep2js', function () {
    gulp.src(src.dep.js)
        .pipe(concat('dep.js'))//合并后的文件名
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({
            //mangle: true,//类型：Boolean 默认：true 是否修改变量名
            mangle: {except: ['require', 'exports', 'module', '$', '_']}//排除混淆关键字
            // compress: true,//类型：Boolean 默认：true 是否完全压缩
            // preserveComments: 'all' //保留所有注释
        }))
        .pipe(gulp.dest('dist/dep'));
});

//优化图片，确保本地已安装gulp-cache [cnpm install gulp-cache --save-dev]
gulp.task('all2img', function () {
    gulp.src([src.asset.img, src.wgt.img, src.dep.img])
        .pipe(cache(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            //   下面是深度压缩图片//
            //   progressive: true,
            //   svgoPlugins: [{removeViewBox: false}], //不要移除svg的viewbox属性
            //   use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest('dist'));
});

gulp.task('all2html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src([src.asset.html, src.wgt.html, src.dep.html], {base: '../'})
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});

// 生产创建
gulp.task('build', ['js', 'css', 'html', 'img']);

// 清理文件
gulp.task('clean', function () {
    gulp.src('dist').pipe(clean());
});

// localhost:3000
gulp.task('watch', function () {    // 这里的watch，是自定义的，写成live或者别的也行
    // app/**/*.*的意思是 app文件夹下的 任何文件夹 的 任何文件
    gulp.watch(['asset/**/*.*', 'dep/**/*.*'], function (file) {
        livereload().changed(file.path);
    });
});

// 自定义帮助文档
gulp.task('help', function () {
    console.log('   gulp build          文件打包');
    console.log('   gulp watch          文件监控打包');
    console.log('   gulp help           gulp参数说明');
    console.log('   gulp server         测试server');
    console.log('   gulp -p             生产环境（默认生产环境）');
    console.log('   gulp -d             开发环境');
    console.log('  gulp -m <module>    部分模块打包（默认全部打包）');
});

gulp.task('default', function () {
    //  将你的默认任务代码放在这里
    // gulp.start(['help']);
});