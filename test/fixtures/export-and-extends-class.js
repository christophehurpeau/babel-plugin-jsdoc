exports.actual = `
/**
 * This is class G
 */
let ClassG = class G {
    /**
     * Constructs a class G.
     */
    constructor() {

    }

    /**
     * Method1.
     */
    method1() {

    }
}

/**
 * This is class H
 */
export default class H extends G {
    /**
     * Constructs a class H.
     *
     * @param {string} name
     */
    constructor(name) {

    }
}
`;

exports.expected = `
/**
 * This is class G
 */
let ClassG = class G {
  /**
   * Constructs a class G.
   */
  constructor() {}

  /**
   * Method1.
   */
  method1() {}
};

/**
 * This is class H
 */
export default class H extends G {
  /**
   * Constructs a class H.
   *
   * @param {string} name
  */
  constructor(name) {}
}
`;
