import 'better-log/install';
import jsdoc from './jsdoc';
import typeAnnotationToJsdocType from './typeAnnotationToJsdocType';
import jsdocParam from './jsdocParam';


module.exports = function pluginAddJsdocAnnotations({ types: t }) {
    return {
        visitor: {
            'FunctionDeclaration|FunctionExpression|ClassMethod'(path, state) {
                const { node } = path;
                const tags = [];

                if (node.params) {
                    node.params.forEach((param, i) => {
                        jsdocParam(param, i, tags);
                    });
                }

                if (node.kind === 'get') {
                    const type = node.returnType
                                 && typeAnnotationToJsdocType(node.returnType.typeAnnotation);
                    tags.push({
                        title: 'type',
                        type,
                    });
                } else if (node.returnType) {
                    tags.push({
                        title: 'returns',
                        type: typeAnnotationToJsdocType(node.returnType.typeAnnotation),
                    });
                }

                if (path.parentPath && (path.parentPath.isExportDefaultDeclaration() || path.parentPath.isExportNamedDeclaration())) {
                    jsdoc(path.parentPath, tags);
                } else {
                    jsdoc(path, tags);
                }
            },
        },
    };
};
