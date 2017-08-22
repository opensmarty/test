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
        console.log('beforeExe');
    },
    doExecute: function () {
        console.log('doExe');
    },
    afterExecute: function () {
        console.log('afterExe');
    },
    extra: function () {

    },
    doSomething: function () {
        return "This is a " + this.description + " for us to do something.";
    }
};

// create a System for executing everything.
var System = function () {
    // 系统运行数据
    this.data = arguments;

    // 初始化系统参数
    this.initialize = function () {
        console.log('Initialize system');
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
    console.log("This is a " + this.description + " for us to do something.");
}

// create a Application and run it.
var Application = {
    name: '应用系统',
    type: 'app',
    description: 'Application Service',
    run: function () {
        var data = {"success": false, "data": [], "code": 100001, "type": "application/json", "message": "System error | 系统错误"};
        var SystemInstance = new System(data);
        console.log(SystemInstance.enableLauncher());
    },
    extra: function () {

    },
    doSomething : function () {
        console.log("This is a " + this.description + " for us to do something.");
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
