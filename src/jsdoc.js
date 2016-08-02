import normalizeTag from './tagNormalizer';
import { findOrCreateJsdoc, parseJsdoc } from './jsdocNodeComment';


function tagNameToString(tag) {
    if (!tag.name) {
        return tag.name;
    }

    if (tag.optional || tag.default !== undefined) {
        return `[${tag.name}${tag.default !== undefined ? `=${tag.default}` : ''}]`;
    }

    return tag.name;
}

function tagToString(tag) {
    return [
        `@${tag.title}`,
        tag.type && `{${tag.type}}`,
        tagNameToString(tag),
        tag.name && tag.description && '-',
        tag.description,
    ].filter(Boolean).join(' ');
}


export default function jsdoc(path, tags) {
    if (tags.length === 0) {
        return;
    }

    const jsdocComment = findOrCreateJsdoc(path);
    jsdocComment.value = jsdocComment.value.trim();
    const parsedJsdoc = parseJsdoc(jsdocComment.value);
    const parsedTags = parsedJsdoc && parsedJsdoc.tags.map(normalizeTag);

    tags.forEach(tag => {
        tag = normalizeTag(tag);

        const keys = ['title'];
        switch (tag.title) {
            case 'param':
                keys.push('name');
                break;
        }

        const existingTag = parsedTags
            .some(existingTag => keys.every(key => existingTag[key] === tag[key]));

        if (!existingTag) {
            const stringTag = tagToString(tag);
            jsdocComment.value += `\r\n * ${stringTag}`;
        }
    });
    jsdocComment.value += '\r\n';
}
