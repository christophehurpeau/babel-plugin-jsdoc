/** This is class A */
class A {
    /**
     * @memberof A
     * @arg arga0
     * @param arga1
     */
    methoda(arga0, arga1) {}

    /**
     * @memberof A
     * @arg arga0 description of the arg a 0
     * @param arga1
     */
    methoda2(arga0, arga1) {}
}

class B {
    /**
     * @param {number} n
     */
    constructor(n) {}
    methodb() {}
    /**
     * @returns {string}
     */ methodb2() {}

    /**
     * @member prop
     */ get prop() {}
    /**
     * @param prop
     */ set prop(prop) {}

    /**
     * @member {number} prop2
     */ get prop2() {}
}

/* @class */
class C {
    methodc() {}
}

/** This is class D */
class D {
    /**
     * @param {number} n
     */
    constructor(n) {}
    methodd() {}
    /**
     * @param {string} arg1
     * @param {number} arg2
     * @param {boolean} arg3
     * @param {*} arg4
     * @param {Array.<string>} arg5
     * @param {Function} arg6
     * @param {Function} arg7
     * @param {Map.<string, number>} arg8
     * @param {Set.<string>} arg9
     * @param {Promise.<string>} arg10
     * @param [arg11]
     * @param {int} [arg12]
     * @param {int} [arg13=0]
     * @param {string} [arg14=test]
     * @returns {string}
     */ methodd2(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13 = 0, arg14 = 'test') {}

    /** @method method3 */
    ['method' + 3]() {}
    /** @method @@iterator */
    [Symbol.iterator]() {}
}

/**
* This is class E
*/
export default class E {
    /**
     * @param i
     */
    static methode0(i) {}

    /**
     * @param first
     * @param {...*} args
     */ methode1(first, ...args) {}

    constructor() {}
}
