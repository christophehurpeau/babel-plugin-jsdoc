import typeAnnotationToJsdocType from './typeAnnotationToJsdocType';
import recursiveTag from './recursiveTag';

export default function (param, i, tags) {
  if (param.type === 'RestElement') {
    tags.push({
      title: 'param',
      name: param.argument.name,
      type: '...*',
    });
  } else if (param.type === 'AssignmentPattern') {
    const jsdocType = typeAnnotationToJsdocType(
      param.left.typeAnnotation
            && param.left.typeAnnotation.typeAnnotation,
    );
    tags.push({
      title: 'param',
      name: param.left.name,
      default: param.right.value,
      type: jsdocType,
    });
  } else {
    recursiveTag('param', param.name || `param${i + 1}`, tags, param);
  }
}
