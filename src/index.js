import 'better-log/install';
import jsdoc from './jsdoc';
import typeAnnotationToJsdocType from './typeAnnotationToJsdocType';
import recursiveTag from './recursiveTag';
import jsdocParam from './jsdocParam';


const addJsdocToPath = function (path, tags) {
  if (path.parentPath && (
    path.parentPath.isExportDefaultDeclaration()
       || path.parentPath.isExportNamedDeclaration()
  )) {
    jsdoc(path.parentPath, tags);
  } else {
    jsdoc(path, tags);
  }
};

module.exports = function pluginAddJsdocAnnotations({ types: t }) {
  return {
    visitor: {
      TypeAlias(path, state) {
        const { node } = path;
        console.log(node);

        const type = node.right.type === 'ObjectTypeAnnotation'
          ? 'Object'
          : typeAnnotationToJsdocType(node.right);

        if (type) {
          const tags = [];
          const name = node.id;

          tags.push({ title: 'typedef', type, name: name.name });

          if (type === 'Object' && node.right.properties) {
            recursiveTag('property', '', tags, node.right);
          }

          jsdoc(path.parentPath, tags);

          console.log(path);
        }
      },

      'FunctionDeclaration|FunctionExpression|ClassMethod': function (path, state) {
        const { node } = path;
        const tags = [];

        const name = node.key || node.id;
        if (name && name.name && name.name.startsWith('_')) {
          tags.push({ title: 'private' });
        }

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

        addJsdocToPath(path, tags);
      },
    },
  };
};
