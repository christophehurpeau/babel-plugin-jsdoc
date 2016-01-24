import 'better-log/install';
import jsdoc from './jsdoc';
import { findJsdoc } from './jsdocNodeComment';
import typeAnnotationToJsdocType from './typeAnnotationToJsdocType';

module.exports = function pluginAddJsdocAnnotations({ types: t }) {
    return {
        visitor: {
            'ClassDeclaration|ClassExpression'(path, state) {
                if (path.parent && path.parent.type === 'ExportDefaultDeclaration') {
                    const jsdocComment = findJsdoc(path.node);

                    if (!jsdocComment) {
                        const parentJsdocComment = findJsdoc(path.parent);

                        if (parentJsdocComment) {
                            path.addComment('leading', parentJsdocComment.value);
                            parentJsdocComment.value = '*';
                        }
                    }
                }

                jsdoc(path, [
                    {
                        title: 'class',
                        name: path.node.id.name,
                    },
                ]);
            },

            'FunctionDeclaration|FunctionExpression|ClassMethod'(path, state) {
                const { node } = path;
                const tags = [];

                if (!t.isClassMethod(node)) {
                    tags.push({
                        title: 'function',
                        name: node.key && node.key.name,
                    });
                } else {
                    const classDeclarationId = path.parentPath.parent.id;
                    if (classDeclarationId.name) {
                        if (node.kind !== 'constructor') {
                            tags.push({
                                title: 'memberof',
                                name: classDeclarationId.name,
                            });
                            if (node.static) {
                                tags.push({ title: 'static' });
                            } else {
                                tags.push({ title: 'instance' });
                            }

                            if (node.key.name) {
                                if (node.kind === 'method') {
                                    tags.push({
                                        title: 'method',
                                        name: node.key.name,
                                    });
                                }
                            }
                        } else {
                            if (!findJsdoc(node)) {
                                // add tags in ClassDeclaration
                                path = path.parentPath.parentPath;
                            }
                        }
                    }
                }

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
                                optional: param.optional,
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

                jsdoc(path, tags);
            },
        },
    };
};
