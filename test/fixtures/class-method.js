exports.actual = `
class A {    
    emptyMethod() {}
    
    /**
     * @memberof A
     * @arg arg0
     */
    methodWithJsdoc(arg0, arg1) {}

    /**
     * @memberof A
     * @arg arg0 description of the arg a 0
     */
    methodWithPartialJsdocAndFlow(arg0: number, arg1) {}
    
    methodWithFlowReturn(): string {}
    
    get prop() {}
    set prop(value) {}
    get propWithFlow(): number {}
    
    methodWithFlowParameters(
        arg1: string,
        arg2: number,
        arg3: boolean,
        arg4: mixed,
        arg5: Array<string>,
        arg6: Class<SomeOtherClass>,
        arg7: Function,
        arg8: Map<string, number>,
        arg9: Set<string>,
        arg10: Promise<string>,
        arg11: ?any,
        arg12: ?number,
        arg13: number = 0,
        arg14: string = 'test'
    ): string {}
    
    /** @method method3 */    
    ['computedMethod'+3]() {}
    
    /** @method @@iterator */
    [Symbol.iterator]() {}
    
    static staticMethod(i) {}
    
    methodWithRest(first, ...args) {}
}
`;

exports.expected = `
class A {    
    emptyMethod() {}
    
    /**
     * @memberof A
     * @arg arg0       
    * @param arg1
    */
    methodWithJsdoc(arg0, arg1) {}

    /**
     * @memberof A
     * @arg arg0 description of the arg a 0
    * @param arg1
    */
    methodWithPartialJsdocAndFlow(arg0, arg1) {}
    
    /**
     * @returns {string}
    */ methodWithFlowReturn() {}
    
    /**
     * @member prop
    */ get prop() {}
    /**
     * @param value
    */ set prop(value) {}
    /**
     * @member {number} propWithFlow
    */ get propWithFlow() {}
              
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
     * @param {*} [arg11]
     * @param {*} [arg12]
     * @param {number} [arg13=0]
     * @param {string} [arg14=test]
     * @returns {string}
    */ methodWithFlowParameters(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13 = 0, arg14 = 'test') {}
    
    /** @method method3 */    
    ['computedMethod' + 3]() {}
    
    /** @method @@iterator */
    [Symbol.iterator]() {}

    /**
     * @param i
    */ static staticMethod(i) {}

    /** 
     * @param first
     * @param {...*} args 
    */ methodWithRest(first, ...args) {}
}
`;

/*
* @param [arg11]
     * @param {*} [arg12]
     * @param {*} [arg13=0]

 */
