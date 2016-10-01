export default function typeAnnotationToJsdocTag(annotation) {
    if (!annotation) {
        return undefined;
    }
    switch (annotation.type) {
        case 'NullableTypeAnnotation':
            return typeAnnotationToJsdocTag(annotation.typeAnnotation);

        case 'Identifier':
            return annotation.id.name;
        case 'StringTypeAnnotation':
            return 'string';
        case 'NumberTypeAnnotation':
            return 'number';
        case 'BooleanTypeAnnotation':
            return 'boolean';
        case 'VoidTypeAnnotation':
            return undefined;
        case 'GenericTypeAnnotation':
            if (annotation.id.name === 'Class') {
                return 'Function';
            }
            if (annotation.typeParameters) {
                const childTypes = annotation.typeParameters.params
                    .map(typeAnnotationToJsdocTag)
                    .join(', ');
                return `${annotation.id.name}.<${childTypes}>`;
            }
            return annotation.id.name;
        case 'ObjectTypeAnnotation':
            return annotation.properties;
        case 'TupleTypeAnnotation':
            return 'Array.<*>';
        case 'TypeParameterInstantiation':
        case 'FunctionTypeAnnotation':
            return 'Function';
        case 'UnionTypeAnnotation':
            return `(${annotation.types.map(typeAnnotationToJsdocTag).join('|')})`;
        case 'AnyTypeAnnotation':
        case 'MixedTypeAnnotation':
            return '*';
        default:
            console.log(`[Warn] unknown type: ${annotation.type}`);
            return '*';
    }
}
