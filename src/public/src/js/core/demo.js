/**
 * Created a demo class for testing program.
 *
 * @package demo
 * @authors opensmarty (opensmarty@163.com)
 * @github  https://github.com/opensmarty
 * @date    2017-08-20 23:23:38
 * @version v1.0.0
 */

//　for(key in object) 与forEach(function(){}) 两者用法
var a1 = ['first', 'second', , 'fourth'];

// #1
for (var key in a1) {
    var ele = a1[key];
    //cmd(ele);
}

a1.forEach(function (ele) {
    //cmd(ele);
});

// #2
var a2 = a1.map(function (ele) {
    return ele.toUpperCase();
});

// #3
var a1 = ['a', 10, 'b', 20, 'c', 30];
var a2 = a1.filter(function (ele) {
    return typeof ele == 'number';
});

// #4
function isNumber(val) {
    return typeof val == 'number';
}

var a2 = a1.every(isNumber);

// #5
var a1 = [10, 20, 30];
var a2 = a1.reduce(function (v1, v2) {
    return v1 + v2;
});

var a2 = Array.isArray(a1);  // output: false

//cmd(a2);

// #6
var sayings = new Map();
sayings.set('dog', 'woof');
sayings.set('cat', 'meow');
sayings.set('elephant', 'toot');
sayings.get("fox"); // undefined
sayings.has("bird"); // false
// cmd(sayings.size + '\n');
// cmd(sayings);
// cmd('get a dog\'s saying: ' + sayings.get('dog')+ '\n');

// for(var [key, val] of sayings) {
// cmd('key: ' + key + ',val: ' + val + '\n');
// }

// #7
const privates = new WeakMap();

function Public() {
    const me = {
        // Private data goes here
        saying: function () {
            return 'hello world, everyone~';
        }
    };
    privates.set(this, me);
}

Public.prototype.method = function () {
    const me = privates.get(this);
    // Do stuff with private data in `me`...
    return this.me.saying();
};

module.exports = Public;

// #8
var mySet = new Set();
mySet.add(1);
mySet.add("some text");
mySet.add("foo");

// mySet.has(1); // true
// mySet.delete("foo");
// mySet.size; // 2
// cmd(mySet);

// for (let item of mySet) console.log(item);
// 1
// "some text"

// #9 将iterator类型的对象（如set,map）、数组、字符串转换数组
Array.from(mySet);

// #10 将一组值转换成数组
var a1 = Array.of(1, 2, 3);

// cmd(a1);
// output: [ 1, 2, 3 ]

/*
 #11 js中arguments用法　Arguments对象与Function关系密切，有参数，arguments.length, arguments.celle(注：arguments.celler已经过时，被废弃)
 case: arr.splice(start, end);
 转化为数组：
 var args = Array.prototype.slice.call( arguments, 0 );
 var args = [].splice.call( arguments, 0 );
 */

var arrayOf = function () {
    var args = Array.prototype.slice.call(arguments);
    // cmd(arguments.length + '\n');
    // cmd(arguments[1]);

    // cmd(arguments.callee.toString());
    // cmd(arrayOf.celler); output:undefined 已废弃

    // cmd(arguments instanceof Array);
    // output: false

    // cmd(arguments instanceof Object);
    //output: true

    // cmd(args);
    return args;
}

//arrayOf('helloworld', 2, 'test');

// #12 create javascript class.
//var o = new Object();
// var Factory = Object.create(o);



/*var Factory = function () {
 if (arguments.length == 1 && arguments[0] instanceof Object) {
 var instance = Object.create(arguments[0]);
 return instance;
 }


 }

 var person = {};
 cmd(Factory(person));*/