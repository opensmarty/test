/**
 * Created a base class for this system.
 *
 * @package base
 * @authors opensmarty (opensmarty@
 * @github  https://github.com/opensmarty
 * @date    2017-08-20 23:23:38
 * @version v1.0.0
 */
// 错误级别
var ERROR_LEVEL = ['log', 'info', 'error', 'warn', 'time', 'timeEnd', 'trace', 'debug'];
function cmd() {
    if (arguments.length < 1) {
        console.warn('参数未定义！\n');
        return false;
    }
    var message = arguments[0];
    var level = arguments[1];
    if (level == '' || level == null || typeof(value) == "undefined") level = "log";

    if (ERROR_LEVEL.indexOf(level) > -1) {
        eval('console.' + level + '(\'' + message + '\\n\')');
    }

}

cmd('Welcome to use javascripts application for everyone！');

/*
 * 返回信息格式　{success:true|false, data:[]|{} [, "code":, type:, "message":]}
 *
 *  统一格式：A-BB-CCC
 * A:错误级别，如1代表系统级错误，2代表服务级错误；
 * B:项目或模块名称，一般公司不会超过99个项目；
 * C:具体错误编号，自增即可，一个项目999种错误应该够用；
 */
var statusWithSys = [
    {"success": false, "data": [], "code": 100001, "type": "application/json", "message": "System error | 系统错误"},
    {"success": true, "data": [], "code": 100200, "type": "application/json", "message": "Success｜请求成功"},
    {"success": false, "data": [], "code": 101400, "type": "application/json", "message": "Client Error | 请求错误"},
    {"success": false, "data": [], "code": 101401, "type": "application/json", "message": " | 操作未授权"},
    {"success": false, "data": [], "code": 101501, "type": "application/json", "message": "Server Error | 服务器错误 "},
    {"success": false, "data": [], "code": 200001, "type": "application/json", "message": "Login Error | 登录失败"}
];


function output() {
    var message = '';
    var code = 101501;
    var hasCode = false;
    if (arguments.length > 0) {
        code = arguments[0]["code"];
        message = arguments[0]["message"];

        for (index in  statusWithSys) {
            if (statusWithSys[index]["code"] == code) {
                cmd("code: " + code + '\\n' + "message: " + statusWithSys[index]['message']);
                hasCode = true;
            }
        }

        if (!hasCode) {
            // message = "没信息，自定义用户错误";
            cmd("code: " + code + '\\n' + "message: " + message, "info");
        }
    }
}

// 系统默认root全局变量
var root = typeof self == 'object' && self.self === self && self || typeof global == 'object' && global.global === global && global || this;

// 检测系统环境变量
function checkSystemEnvironment() {

}

// 是否是浏览器端
function isServer() {
    return !isBrowser();
}

function isBrowser() {
    var flag = false;
    if (typeof window !== "undefined" && root === window) {
        flag = true;
    }

    return flag
}

if (isServer()) {
    output({
        "success": false,
        "data": [],
        "code": 100001,
        "type": "application/json",
        "message": "System error | 系统错误"
    });

    output({
        "success": true,
        "data": [],
        "code": 100200,
        "type": "application/json",
        "message": "Success｜请求成功"
    });

    output({
        "success": true,
        "data": [],
        "code": 300001,
        "type": "application/json",
        "message": "Other Error｜其它错误"
    });
}


function response() {

}

/**
 * Created a lot of const values for this system.
 *
 * @package const
 * @authors opensmarty (opensmarty@163.com)
 * @github  https://github.com/opensmarty
 * @date    2017-08-20 23:23:38
 * @version v1.0.0
 */
/**
 * Created some functions for this framework.
 *
 * @package system
 * @authors opensmarty (opensmarty@163.com)
 * @github  https://github.com/opensmarty
 * @date    2017-08-20 23:23:38
 * @version v1.0.0
 *
 * @example 如果函数不存在，则创建该函数.
 * if (!Function.prototype.demo()) {
 *   Function.prototype.demo = function () {
 *
 *   }
 * }
 */

/**
 * Created by opensmarty on 17-8-23.
 */

/**
 * Created a system class for execution.
 *
 * @package system
 * @authors opensmarty (opensmarty@163.com)
 * @github  https://github.com/opensmarty
 * @date    2017-08-20 23:23:38
 * @version v1.0.0
 */
var Config = {};
Config.environment = {};
Config.environment.development = false;
Config.environment.production = !Config.environment.development;

// create a construct function for the system.
function Engine() {
}

// create a useful prototype of Engine as supper class.
Engine.prototype = {
    constructor: Engine,
    name: '起源引擎',
    type: 'engine',
    description: 'Engine Service',
    execute: function () {
        this.beforeExecute();
        this.doExecute();
        this.afterExecute();
        this.doSomething();
    },
    beforeExecute: function () {
        if (Config.environment.development) {
            console.log('beforeExe');
        }
    },
    doExecute: function () {
        if (Config.environment.development) {
            console.log('doExe');
        }
    },
    afterExecute: function () {
        if (Config.environment.development) {
            console.log('afterExe');
        }
    },
    extra: function () {

    },
    doSomething: function () {
        if (Config.environment.development) {
            console.log("This is a " + this.description + " for us to do something.");
        }
    }
};

// create a System for executing everything.
var System = function () {
    // 系统运行数据
    this.data = arguments;

    // 初始化系统参数
    this.initialize = function () {
        if (Config.environment.development) {
            console.log('Initialize system');
        }
    }

    // 系统启动器
    this.enableLauncher = function () {
        this.initialize();
        this.execute();
        this.doSomething();
        return JSON.stringify(this.data);
    }
}

System.prototype = Object.create(Engine.prototype);
System.prototype.constructor = System;
// 系统名称
System.prototype.name = '欧鹏斯玛特系统';
System.prototype.type = 'system';
System.prototype.description = 'System Service';
System.prototype.extra = function () {
    // 附加函数,用于扩展系统其他功能,选择函数或JSON格式对象操作
}
System.prototype.doSomething = function () {
    if (Config.environment.development) {
        console.log("This is a " + this.description + " for us to do something.");
    }
}

// create a Application and run it.
var Application = {
    name: '应用系统',
    type: 'app',
    description: 'Application Service',
    run: function () {
        var data = {
            "success": false,
            "data": [],
            "code": 100001,
            "type": "application/json",
            "message": "System error | 系统错误"
        };
        var SystemInstance = new System(data);
        var ResponseResult = SystemInstance.enableLauncher();
        if(Config.environment.development){
            console.log(ResponseResult);
        }
    },
    extra: function () {

    },
    doSomething: function () {
        if (Config.environment.development) {
            console.log("This is a " + this.description + " for us to do something.");
        }
    }
};

// 系统运行模块
(function () {
    // 系统开始运行时间
    console.time('system');

    // 应用系统运行
    Application.run();

    // 系统结束运行时间
    console.timeEnd('system');
})()


/**
 * Created a demo javascrit for testing program.
 *
 * @package demo
 * @authors opensmarty (opensmarty@163.com)
 * @github  https://github.com/opensmarty
 * @date    2017-08-20 23:23:38
 * @version v1.0.0
 */