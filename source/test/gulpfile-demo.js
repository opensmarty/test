/**
 * Created by opensmarty on 17-8-26.
 * 　
 * gulp顺序执行任务
 *
 * refer links: http://zhangruojun.com/gulpshun-xu-zhi-xing-ren-wu/
 *
 * 1.gulp-if-else
 *
 * var ifElse = require('gulp-if-else');
 *
 * // your code ...
 *
 * gulp.src(source)
 * .pipe( ifElse(condition, ifCallback, elseCallback) )
 *
 * if(condition) {
 *
 * // condition is truthy
 *
 * return ifCallback();
 *   }else{
 *
 * // condition is falsy
 *
 * // if "elseCallback" is provided
 * if(elseCallback) {
 *   return elseCallback();
 * }
 *
 * // if not "elseCallback" returns the stream
 * return stream;
 *   }
 *
 *  // process.env.NODE_ENV === 'production'
 *
 *  gulp-if
 *
 *
 *
 *
 */

// 基础任务
gulp.task('clean', function() {/* coding */});
gulp.task('compass', function() {/* coding */});
gulp.task('image', function() {/* coding */})
gulp.task('style', function() {/* coding */});
gulp.task('html', function() {/* coding */});
gulp.task('ftp', function() {/* coding */});
//创建一个执行以上所有任务的任务链
gulp.task('prod', ['clean', 'compass', 'image', 'style', 'html', 'ftp']);


// var gulp        = require('gulp'),
//     runSequence = require('gulp-run-sequence'),
//     pump        = require('pump');
//
// gulp.task('default', function(cb) {
//     runSequence(
//         'clean',
//         ['js', 'css', 'html', 'image'],
//         'watch',
//         cb
//     );
// });
//
// gulp.task('clean', function(cb) {...});
//
// gulp.task('js', function(cb) {...});
// gulp.task('css', function(cb) {...});
// gulp.task('html', function(cb) {...});
// gulp.task('image', function(cb) {...});
//
// gulp.task('watch', ['browser'], function(cb) {...});


// https://github.com/teambition/gulp-sequence
var runSequence = require('gulpSequence');
gulp.task('prod', function(cb) {
    runSequence('clean', 'compass', ['image', 'style', 'html'], 'ftp')(cb);
});



// npm install gulp-rev-loader
var rev = require('gulp-rev');
var revQ = require('gulp-rev-query');
var revCollector = require('revCollector');

gulp.task('revCss', function() {
    return gulp.src('src/static/**/*.css')
        .pipe(rev())
        .pipe(gulp.dest('static'))
        .pipe(rev.manifest())
        .pipe(revQ('v')) // ?v=xxxxxxxxx
        .pipe(gulp.dest('static/css'))
});

gulp.task('revCollectorCss', function(){
    return gulp.src(['static/css/**/*.json', 'views/**/*.{html,ejs,jade}'])
        .pipe(revCollector({
            revSuffix: '\\\?v=[0-9a-f]{8,10}',//required
            replaceReved: true,
        }))
        .pipe(gulp.dest('views'))
});

//https://github.com/robrich/gulp-if
// gulp-if
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var beautify = require('gulp-beautify');

var condition = function (file) {
    // TODO: add business logic
    return true;
}

gulp.task('gulpif', function() {
    gulp.src('./src/*.js')
        .pipe(gulpif(condition, uglify(), beautify()))
        .pipe(gulp.dest('./dist/'));
});

// gulpIgnore
var gulpIgnore = require('gulp-ignore');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

var condition = './gulpfile.js';

gulp.task('task', function() {
    gulp.src('./*.js')
        .pipe(jshint())
        .pipe(gulpIgnore.exclude(condition))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});


// lazypipe
var gulpif = require('gulp-if');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var lazypipe = require('lazypipe');

var linting = false;
var compressing = false;

var jshintChannel = lazypipe()
// adding a pipeline step
    .pipe(jshint) // notice the stream function has not been called!
    .pipe(jshint.reporter)
    // adding a step with an argument
    .pipe(jshint.reporter, 'fail');

gulp.task('scripts', function () {
    return gulp.src(paths.scripts.src)
        .pipe(gulpif(linting, jshintChannel()))
        .pipe(gulpif(compressing, uglify()))
        .pipe(gulp.dest(paths.scripts.dest));
})

//sourcemaps
// cnpm install gulp-sourcemaps --save-dev
var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    sourcemaps  = require('gulp-sourcemaps')
pump        = require('pump');

gulp.task('jsmin', function(cb) {
    pump([
            gulp.src('src/js/*.js'),
            sourcemaps.init(),
            concat('demo.js'),
            uglify(),
            sourcemaps.write(),
            gulp.dest('dist/js')
        ], cb
    )
});

gulp.task('javascript', function() {
    var stream = gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(plugin1())
        .pipe(plugin2())
        .pipe(sourcemaps.write('../maps', {
            addComment: false,
            includeContent: false,
            sourceRoot: '/src',
            sourceMappingURLPrefix: 'https://asset-host.example.com/assets',
            sourceMappingURL: function(file) {
                return 'https://asset-host.example.com/' + file.relative + '.map';
            },
            mapFile: function(mapFilePath) {
                // source map files are named *.map instead of *.js.map
                return mapFilePath.replace('.js.map', '.map');
            }
        }))
        .pipe(gulp.dest('dist'));
});

// cnpm install browser-sync --save-dev
// 开启浏览器，并定义dist目录下的html/css/js发生变化直接同步至浏览器
var gulp         = require('gulp'),
    browserSync  = require('browser-sync').create();

gulp.task('browser', function() {
    browserSync.init([
        './dist/**/*.html',
        './dist/**/*.css',
        './dist/**/*.js'
    ], {
        server: {
            baseDir: "./"
        }
    });
});

// 监控src目录下css文件，发生变化则执行css任务
// 监控src目录下js文件，发生变化则执行js任务
// 监控src目录下html文件，发生变化则执行html任务
gulp.task('watch', ['browser'], function() {
    gulp.watch('./src/**/*.css', ['css']);
    gulp.watch('./src/**/*.js', ['js']);
    gulp.watch('./src/**/*.html', ['html']);
})

// cnpm install require-dir --save-dev
// 使用gulpfile.js单文件编写任务，会造成文件过大，通过使用 require-dir 模块将任务分离到多个文件
/*
gulpfile.js
tasks/
├── dev.js
├── release.js
└── test.js
*/
var requireDir = require('require-dir');
requireDir('./tasks', { recurse: true });
// gulp会自动加载tasks目录下所有文件中定义的任务，并执行default任务

// npm install --save-dev gulp-babel babel-preset-env
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () =>
    gulp.src('src/app.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
);

