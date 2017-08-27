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


var gulp = require('gulp'),

    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-minify-css'),

    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    order = require("gulp-order"),

    htmlmin = require('gulp-htmlmin'),
    fileinclude = require('gulp-file-include'),

    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),

    concat = require('gulp-concat'),
    rename = require('gulp-rename'),

    rev = require('gulp-rev'),
    revQ = require('gulp-rev-query'),
    revCollector = require('gulp-rev-collector'),

    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),

    gulpSequence = require('gulp-sequence'),

    paths = {
        'src': process.cwd() + '/src',
        'dist': process.cwd + '/dist',
        'static': process.cwd + '/static'
    };


// compress styles
gulp.task('styles', function () {
    return sass('src/css/*.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({message: 'Styles task complete'}));
});

// release styles
gulp.task('rev:styles', function () {
    return sass('src/css/*.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(rev())
        .pipe(gulp.dest('static/css'))
        .pipe(rev.manifest())
        .pipe(revQ('v')) // ?v=xxxxxxxxx
        .pipe(gulp.dest('static/css'))
        .pipe(notify({message: 'Styles task release'}));
});

// 脚本
// gulp.task('scripts', function(callback) {
//     return gulp.src('src/entry.js')
//         .pipe(webpack( require('./webpack.config.js') ))
//         .pipe(gulp.dest('dist/js'));
// });

// compress scripts
gulp.task('scripts', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(order([
            'src/js/lib/jquery.js',
            'src/js/lib/*.js',
            'src/js/helpers/*.js',
            'src/js/utils/*.js',
            'src/js/*.js',
        ]))
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({message: 'Scripts task complete'}));
});

// release scripts
gulp.task('rev:scripts', function () {
    return gulp.src(['src/**/*.js'])
        .pipe(order([
            'src/js/lib/jquery.js',
            'src/js/lib/*.js',
            'src/js/helpers/*.js',
            'src/js/utils/*.js',
            'src/js/*.js',
        ]))
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev())
        .pipe(gulp.dest('static/js'))
        .pipe(rev.manifest())
        .pipe(revQ('v')) // ?v=xxxxxxxxx
        .pipe(gulp.dest('static/js'))
        .pipe(notify({message: 'Scripts task release'}));
});

// optimize images
gulp.task('images', function () {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
        })))
        .pipe(gulp.dest('dist/img'))
        .pipe(notify({message: 'Images task complete'}));
});


// release images
gulp.task('rev:images', function () {
    return gulp.src('src/img/**/*.+(jpg|jpeg|ico|png|gif|svg)')
        .pipe(cache(imagemin({
            optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
        })))
        .pipe(gulp.dest('static/img'))
        .pipe(rev())
        .pipe(gulp.dest('static/img'))
        .pipe(rev.manifest())
        .pipe(revQ('v'))
        .pipe(notify({message: 'Images task release'}));
});


// html
gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'))
        // .pipe(rename({suffix: '.mix'}))
        // .pipe(htmlmin())
        // .pipe(gulp.dest('dist'))
        .pipe(notify({message: 'html task complete'}));
});

// release html
gulp.task('rev:html', function () {
    return gulp.src(['dist/**/*.json', 'dist/**/*.html'])
        .pipe(revCollector({
            revSuffix: '\\\?v=[0-9a-f]{8,10}',
            replaceReved: true,
            // dirReplacements: {
            //     'css': '/dist/css/',
            //     'js/': '/dist/js/',
            //     'cdn/': function(manifest_value) {
            //         return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
            //     }
            // }
        }))
        .pipe(htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        }))
        .pipe(gulp.dest('static'))
        .pipe(notify({message: 'html task release'}));
});

// 清理
gulp.task('clean', function () {
    return gulp.src(['dist/*', 'static/*'], {read: false})
        .pipe(clean());
});

// 测试
gulp.task('test', function () {
    console.log('This program is used to test.');
});

// 编译
gulp.task('build', gulpSequence('clean', 'styles', 'scripts', 'html', 'images'));

// 加md5
gulp.task('modifyRef', gulpSequence('rev:styles', 'rev:scripts', 'rev:html', 'rev:images'));

// 发布
gulp.task('release', gulpSequence('modifyRef'));

// 预设任务
gulp.task('default', ['clean'], function () {
    gulp.start('styles', 'scripts', 'images', 'html');
});

gulp.task('watch', function () {

    // 看守所有.scss档
    gulp.watch('src/css/**/*.scss', ['styles']);

    // 看守所有.js档
    gulp.watch('src/js/**/*.js', ['scripts']);

    // 看守所有图片档
    gulp.watch('src/img/**/*', ['images']);

    //看守html
    gulp.watch('src/**/*.html', ['html']);

    livereload.listen();
    gulp.watch(['dist/**']).on('change', livereload.changed);

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