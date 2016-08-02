exports.actual = `
class A {
}

/** This is class B */
class B {

}

/* @class */
class C {
}
`;

exports.expected = `
class A {}

/** This is class B */
class B {}

/* @class */
class C {}
`;
