import typeAnnotationToJsdocType from './typeAnnotationToJsdocType';

function recursiveTag(title, paramName, tags, jsdocType, optional) {
  if (Array.isArray(jsdocType)) {
    tags.push({ title, name: paramName, optional, type: 'Object' });
    jsdocType.forEach(objectTypeProperty => (
      recursiveTag(
        `${paramName === '' ? '' : `${paramName}.`}${objectTypeProperty.key.name}`,
        tags,
        typeAnnotationToJsdocType(objectTypeProperty.value),
        optional || objectTypeProperty.value.type === 'NullableTypeAnnotation',
      )
    ));
  } else {
    tags.push({ title, name: paramName, optional, type: jsdocType });
  }
}

export default (title, paramName, tags, type) => {
  const jsdocType = typeAnnotationToJsdocType(
    type.typeAnnotation && type.typeAnnotation.typeAnnotation,
  );
  const optional = type.optional ||
     (type.typeAnnotation &&
      type.typeAnnotation.typeAnnotation.type === 'NullableTypeAnnotation');


  recursiveTag(title, paramName, tags, jsdocType, optional);
};
