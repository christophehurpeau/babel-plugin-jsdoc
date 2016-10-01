exports.actual = `
class ClassTest {
    _test() {
    }
}
`;

exports.expected = `  
class ClassTest {
    /**
     * @private
    */ _test() {}
}
`;
