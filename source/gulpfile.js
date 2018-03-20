0/*

 安装gulp：　
 npm install --save-dev gulp -g
 npm install --save MD5　　两者都用
 npm install --save-dev grunt-contrib-concat 只在开发中用，发布时不用
 以上两种--save 和--save-dev 区别:
 npm install --production 使--save-dev不会自动安装到node_modules,　用npm install 也会把--save-dev安装到node_modules，而-save 的安装包必然安装到node_modules,
 即把开发后不用的包不会发布到生产node_modules. 使用原则: 运行时需要用到的包使用--save，否则使用--save-dev

 gulp插件及附加插件安装列表如下：
 sudo npm install gulp -g
 npm install gulp --save-dev

 // scripts
 npm install --save-dev jshint gulp-jshint jshint-stylish
 npm install --save-dev gulp-order
 npm install --save-dev gulp-uglify

// styles
 //npm install --save-dev gulp-less
 npm install --save-dev gulp-ruby-sass
 npm install --save-dev gulp-minify-css
 npm install --save-dev gulp-autoprefixer
 npm install --save-dev gulp-sourcemaps


// html
 npm install --save-dev gulp-file-include
 npm install --save-dev gulp-htmlmin
 // npm install --save-dev gulp-template
 npm install --save-dev gulp-jade

// images
 npm install --save-dev gulp-imagemin
 npm install --save-dev gulp-cache

 npm install --save-dev gulp-concat
 npm install --save-dev gulp-rename
 npm install --save-dev gulp-notify
 npm install --save-dev gulp-if-else
 // npm install --save-dev gulp-if
 // gulp-shell　gulp-ssh del

// rev
 npm install --save-dev gulp-rev
 // npm install --save-dev gulp-rev-replace
 npm install --save-dev gulp-rev-collector
 npm install --save-dev gulp-rev-query

 npm install --save-dev gulp-clean
 // npm install --save-dev gulp-add-src
 npm install --save-dev browser-sync　
 npm install --save-dev gulp-sequence　

 //npm install --save-dev vinyl-paths
 //npm install --save-dev run-sequence
 //npm install --save-dev vinyl-source-stream
 //npm install --save-dev vinyl-buffer
 //npm install --save-dev browserify
 //npm install --save-dev gulp-sftp gulp-util minimist
 //npm install --save-dev yargs　path lodash

 //给css文件里引用url加版本号
 //gulp-make-css-url-version
 // gulp-flatten
 // 任务流程
 var gulp        = require('gulp'),
 gulpSequence = require('gulp-sequence'),

 gulp.task('default', function(cb) {
 gulpSequence(
 'clean',
 ['images', 'fonts', 'scripts', 'styles', 'html'],
 'watch',
 cb
 );
 });

 gulp.task('clean', function(cb) {...});

 gulp.task('images', function(cb) {...});
 gulp.task('fonts', function(cb) {...});
 gulp.task('scripts', function(cb) {...});
 gulp.task('styles', function(cb) {...});
 gulp.task('html', function(cb) {...});

 gulp.task('server', function(cb) {...});

 gulp.task('watch', ['browser'], function(cb) {...});

 //创建一个执行以上所有任务的任务链
 gulp.task('build', ['clean', 'images', 'fonts', 'scripts', 'styles', 'html', 'ftp']);

 */

const config = require('./gulp/config');
require(config.task.help)();
require(config.task.clean)();
require(config.task.scripts)();
require(config.task.scss)();
require(config.task.css)();
require(config.task.images)();
require(config.task.fonts)();
require(config.task.html)();
require(config.task.build)();
require(config.task.release)();
require(config.task.default)();



