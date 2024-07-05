Function.prototype.myCall = function (ctx, ...args) {
    // console.log('this', this);// 谁调用 myCall this就是谁

    /**
     * 30分
     * 最简单版本
     * 存在的问题，method 测试方法中的console 打印的this为 { fn: [Function: method] } 2 3 (打印了这个临时的fn)
     */
    /*
    // 我们如何能将this 指向 ctx?
    ctx.fn = this;
    ctx.fn(...args);
    delete ctx.fn;
    */

    /**
     * 80分
     * 使用 symbol 解决上述问题
     */

    /*

    var key = Symbol('temp')
    // 解决打印时打印 [Symbol(temp)]: [Function: method] 的问题
    Object.defineProperty(ctx, key, {
        enumerable: false,
        value: this
    })
    // ctx[key] = this;
    var result = ctx[key](...args);//可能有返回值，所以要接收一下
    delete ctx[key]

    return result
    */


    /**
     * 解决调用myCall 时传入this为null/undefined的情况
     * 如果时null/undefined 那么ctx 就是全局对象， 如果是其他情况，应该使用Object 转换为普通对象， 
     * 因为如果传入基本值类型时，call 的表现是this指向对应的构造函数， 例如 传入 "123", 那么this默认
     * 指向 Number 构造函数
     */



    ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx)

    var key = Symbol('temp')
    Object.defineProperty(ctx, key, {
        enumerable: false,
        value: this
    })
    var result = ctx[key](...args);//可能有返回值，所以要接收一下
    delete ctx[key]

    return result


}

function method(a, b) {
    console.log(this, a, b);
    return a + b
}


method.myCall(null, 2, 3)