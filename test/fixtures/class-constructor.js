exports.actual = `
class NoConstructor {
}

class EmptyConstructor {
    constructor() {
    }
}


class ClassWithConstructorAndJsdoc {
    /**
     * @param {number} n
     */
    constructor(n) {
    }
}

class ClassWithConstructorAndFlow {
    constructor(n: number) {
    }
}
    
class ClassWithConstructorAndJsdocAndFlow {  
    /**
     * @param {number} n
     */
    constructor(n: number) {
    }
}
`;

exports.expected = `
class NoConstructor {}

class EmptyConstructor {
    constructor() {}
}

class ClassWithConstructorAndJsdoc {
    /**
     * @param {number} n
    */ 
    constructor(n) {}
}

class ClassWithConstructorAndFlow {
    /**
     * @param {number} n
    */ constructor(n) {}
}
    
class ClassWithConstructorAndJsdocAndFlow {  
    /**
     * @param {number} n
    */ 
    constructor(n) {}
}
`;
