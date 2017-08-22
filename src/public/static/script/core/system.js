/**
 * Created a system class for execution.
 *
 * @package system
 * @authors opensmarty (opensmarty@163.com)
 * @github  https://github.com/opensmarty
 * @date    2017-08-20 23:23:38
 * @version v1.0.0
 */

// create a construct function for the system.
function Engine() {
}

// create a useful prototype of system as supper class.
Engine.prototype = {
    constructor: Engine,
    name: '起源引擎',
    type: 'engine',
    description: 'System Service',
    execute: function () {
        this.beforeExecute();
        this.doExecute();
        this.afterExecute();
        this.doSomething();
    },
    beforeExecute: function () {
        console.log('beforeExe');
    },
    doExecute: function () {
        console.log('doExe');
    },
    afterExecute: function () {
        console.log('afterExe');
    },
    doSomething: function () {
        return "This is a " + this.description + " for us to do something.";
    }
};

// create a application for executing everything.
var System = function () {
    // 系统名称
    this.name = '欧鹏斯玛特系统';
    // 系统运行数据
    this.data = arguments;

    this.initialize = function () {
        console.log('Initialize system');
    }

    // 系统启动器
    this.enableLauncher = function () {
        this.initialize();
        this.execute();
        return JSON.stringify(this.data);
    }
}

System.prototype = Object.create(Engine.prototype);
System.prototype.constructor = System;
System.prototype.demo = function () {

}

var Application = {
    name: '应用系统',
    type: 'app',
    run: function () {
        var SystemInstance = new System();
        SystemInstance.enableLauncher();
    }
};

// 系统运行模块
(function () {
    // 系统开始运行时间
    console.time('system');

    // 系统测试.
    //console.info(System.prototype.doSomething());

    // 应用系统运行
    Application.run();

    // 系统结束运行时间
    console.timeEnd('system');
})()
