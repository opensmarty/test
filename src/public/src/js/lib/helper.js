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
if (!Function.prototype.bind()) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            throw new TypeError('What is trying to be bound is not callable');
        }
        var args = Array.prototype.slice.call(arguments, 1),
            fTobind = this,  //指向调用bind的函数
            fNOP = function () {
            },  //创建一个空函数，为了下面的继承
            fBound = function () {
                return fTobind.apply(this instanceof fNOP ? this : oThis,  //改变this的指向
                    args.concat(Array.prototype.slice.call(arguments)));  //将通过bind传递的参数与调用时传的参数合并
            };
        fNOP.prototype = this.prototype;  //将目标函数的原型传递到新函数中
        fBound.prototype = new fNOP;  //这两条相当于Object.create的作用
        return fBound;
    }
}

if (!Function.prototype.doSomething()) {
    Function.prototype.doSomething = function () {
        if (typeof this !== 'function') {
            throw new TypeError('What is trying to be doSomething is not callable');
        }
        var args = Array.prototype.slice.call(arguments, 1);

    }
}