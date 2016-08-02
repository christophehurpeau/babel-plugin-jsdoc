import typeAnnotationToJsdocType from './typeAnnotationToJsdocType';

function recursiveTag(paramName, tags, jsdocType, optional) {
    if (Array.isArray(jsdocType)) {
        tags.push({ title: 'param', name: paramName, optional, type: 'Object' });
        jsdocType.forEach(objectTypeProperty => (
            recursiveTag(
                `${paramName}.${objectTypeProperty.key.name}`,
                tags,
                typeAnnotationToJsdocType(objectTypeProperty.value),
                optional || objectTypeProperty.value.type === 'NullableTypeAnnotation'
            )
        ));
    } else {
        tags.push({ title: 'param', name: paramName, optional, type: jsdocType });
    }
}


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
        const optional = param.optional || (param.typeAnnotation && param.typeAnnotation.typeAnnotation.type === 'NullableTypeAnnotation');

        recursiveTag(param.name || `param${i+1}`, tags, jsdocType, optional);
    }
}
