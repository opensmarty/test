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