import 'better-log/install';
import jsdoc from './jsdoc';
import typeAnnotationToJsdocType from './typeAnnotationToJsdocType';


module.exports = function pluginAddJsdocAnnotations({ types: t }) {
    return {
        visitor: {
            'FunctionDeclaration|FunctionExpression|ClassMethod'(path, state) {
                const { node } = path;
                const tags = [];

                if (node.params) {
                    node.params.forEach(param => {
                        if (param.type === 'RestElement') {
                            tags.push({
                                title: 'param',
                                name: param.argument.name,
                                type: '...*',
                            });
                        } else if (param.type === 'AssignmentPattern') {
                            const jsdocType = typeAnnotationToJsdocType(
                                param.left.typeAnnotation
                                && param.left.typeAnnotation.typeAnnotation
                            );
                            tags.push({
                                title: 'param',
                                name: param.left.name,
                                default: param.right.value,
                                type: jsdocType,
                            });
                        } else {
                            const jsdocType = typeAnnotationToJsdocType(
                                param.typeAnnotation && param.typeAnnotation.typeAnnotation
                            );
                            tags.push({
                                title: 'param',
                                name: param.name,
                                optional: param.optional || (param.typeAnnotation && param.typeAnnotation.typeAnnotation.type === 'NullableTypeAnnotation'),
                                type: jsdocType,
                            });
                        }
                    });
                }

                if (node.kind === 'get') {
                    const type = node.returnType
                                 && typeAnnotationToJsdocType(node.returnType.typeAnnotation);
                    tags.push({
                        title: 'member',
                        name: node.key.name,
                        type,
                    });
                } else if (node.returnType) {
                    tags.push({
                        title: 'returns',
                        type: typeAnnotationToJsdocType(node.returnType.typeAnnotation),
                    });
                }

                if (path.parentPath && path.parentPath.isExportDefaultDeclaration()) {
                    jsdoc(path.parentPath, tags);
                } else {
                    jsdoc(path, tags);
                }
            },
        },
    };
};
