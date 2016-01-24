function normalizeTitle(tagTitle) {
    switch (tagTitle) {
        case 'arg':
        /* falls through */
        case 'argument':
        /* falls through */
        case 'param':
            return 'param';

        case 'constructor':
        /* falls through */
        case 'class':
            return 'class';

        case 'method':
            return 'method';
        case 'func':
        /* falls through */
        case 'function':
            return 'function';
    }
    return tagTitle;
}


export default function normalize(tag) {
    const normalizedTitle = normalizeTitle(tag.title);
    if (tag.title === normalizedTitle) {
        return tag;
    }

    return Object.assign({}, tag, { title: normalizedTitle });
}
