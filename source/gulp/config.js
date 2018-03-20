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

// module.exports = function(){}

const APP_PATH = process.cwd(),
    GULP_PATH = APP_PATH + '/gulp',
    WEB_PATH = APP_PATH + '/web',
    REV_PATH = APP_PATH + '/public',
    APP_ENV = process.env.NODE_ENV || 'production';
//APP_ENV = process.env.NODE_ENV || 'develop';
module.exports = {
    path: {
        APP_PATH: APP_PATH,
        GULP_PATH: GULP_PATH,
        WEB_PATH: WEB_PATH,
        REV_PATH: REV_PATH,
    },
    params: {
        APP_ENV: APP_ENV
    },
    task: {
        help: GULP_PATH + '/tasks/help.js',
        test: GULP_PATH + '/tasks/test.js',
        images: GULP_PATH + '/tasks/images.js',
        fonts: GULP_PATH + '/tasks/fonts.js',
        scripts: GULP_PATH + '/tasks/scripts.js',
        scss: GULP_PATH + '/tasks/scss.js',
        css: GULP_PATH + '/tasks/css.js',
        html: GULP_PATH + '/tasks/html.js',
        clean: GULP_PATH + '/tasks/clean.js',
        build: GULP_PATH + '/tasks/build.js',
        release: GULP_PATH + '/tasks/release.js',
        serve: GULP_PATH + '/tasks/serve.js',
        default: GULP_PATH + '/tasks/default.js',

    },
    util: {
        notify: GULP_PATH + '/util/notify.js'
    },
    // source/release
    web: {
        css: WEB_PATH + '/css/**/*.css',
        scss: WEB_PATH + '/scss/**/*.scss',
        less: WEB_PATH + '/css/**/*.css',
        js: WEB_PATH + '/js/**/*.js',
        images: WEB_PATH + '/images/**/*.+(jpg|jpeg|ico|png|gif|svg)',
        fonts: WEB_PATH + '/fonts/**/*',
        swf: WEB_PATH + '/swf/**/*',
        tpl: WEB_PATH + '/tpl/**/*.{html,htm}'
    },
    ui: {
        css: WEB_PATH + '/ui/**/*.css',
        scss: WEB_PATH + '/ui/**/*.scss',
        js: WEB_PATH + '/ui/**/*.js',
        images: WEB_PATH + '/ui/**/*.+(jpg|jpeg|ico|png|gif|svg)',
        tpl: WEB_PATH + '/ui/**/*.{html,htm}',

    },
    order: [
        WEB_PATH + '/js/lib/jquery.js',
        WEB_PATH + '/js/lib/*.js',
        WEB_PATH + '/js/helpers/*.js',
        WEB_PATH + '/js/utils/*.js',
        WEB_PATH + '/js/*.js',
        WEB_PATH + '/ui/js/*.js',
    ],
    watch: {
        scss: [WEB_PATH + '/scss/**/*.scss', WEB_PATH + '/ui/**/*.scss'],
        css: [WEB_PATH + '/css/**/*.css', WEB_PATH + '/ui/**/*.css'],
        js: [WEB_PATH + '/js/**/*.js', WEB_PATH + '/ui/**/*./js'],
        images: [WEB_PATH + '/images/**/*.+(jpg|jpeg|ico|png|gif|svg)', WEB_PATH + '/ui/**/*.+(jpg|jpeg|ico|png|gif|svg)'],
        fonts: [WEB_PATH + '/fonts/**/*'],
        html: [WEB_PATH + '/tpl/**/*.{html,htm}', WEB_PATH + '/ui/**/*.{html,htm}'],
        rev: [REV_PATH + '/html/**/*.{html,htm}', REV_PATH + '/**/*.json']
    },
    deploy: {
        css: REV_PATH + '/css',
        js: REV_PATH + '/js',
        images: REV_PATH + '/images',
        fonts: REV_PATH + '/fonts',
        html: REV_PATH + '/html',
        upload: REV_PATH + '/upload'
    }
};
