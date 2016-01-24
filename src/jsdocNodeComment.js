import doctrine from 'doctrine';

export function findJsdoc(node) {
    if (!node.leadingComments) {
        return undefined;
    }

    return node.leadingComments.find(comment => /^\*(?:$|[^*])/.test(comment.value));
}

export function findOrCreateJsdoc(path) {
    const jsdoc = findJsdoc(path.node);

    if (jsdoc) {
        return jsdoc;
    }

    path.addComment('leading', '*');
    return findJsdoc(path.node);
}

export function parseJsdoc(comment) {
    if (!comment) {
        return null;
    }

    return doctrine.parse(comment || '', {
        unwrap: true,
        loose: true,
        sloppy: true,
    });
}
