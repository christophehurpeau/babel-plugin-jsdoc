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
    
    methodWithFlowParameters(arg1: string, arg2: number, arg3: ?boolean): string {
    }
    
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
     * @type prop
    */ get prop() {}
    /**
     * @param value
    */ set prop(value) {}
    /**
     * @type {number} propWithFlow
    */ get propWithFlow() {}
              
    /**
     * @param {string} arg1
     * @param {number} arg2
     * @param {boolean} [arg3]
     * @returns {string}
    */ methodWithFlowParameters(arg1, arg2, arg3) {}
    
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
