'use strict';

export {
    getNodes,
    topologicalSort
}

type NodeItem = {
    id: string;
    afters: Array<string>;
};
type NodesMap = {
    [id: string]: NodeItem;
};

function getNodes(links: Array<[string, string]>): NodesMap  {
    const node = (id) => ({id, afters: []});
    return links.reduce((nodes, [from, to]) => {
        if (!nodes[from]) {
            nodes[from] = node(from);
        }
        if (!nodes[to]) {
            nodes[to] = node(to);
        }
        nodes[from].afters.push(to);
        return nodes;
    }, {});
}

function topologicalSort(links: Array<[string, string]>) {
    const nodes = getNodes(links);
    const sorted  = [];
    const visited = {};
    let closed = false;

    Object.keys(nodes)
        .forEach((key) => visit(key, []));

    return closed ? [] : sorted;

    function visit(key: string, ancestors: Array<string>) {
        const node = nodes[key];
        if (visited[key]) {
            return;
        }
        if (!Array.isArray(ancestors)) {
            ancestors = [];
        }
        ancestors.push(node.id);
        visited[key] = true;

        let i = node.afters.length;
        while (i--) {
            let afterID = node.afters[i];
            if (ancestors.includes(afterID)) {
                closed = true;
                break;
            }
            visit(afterID.toString(), ancestors.slice()); // recursive call
        }
        sorted.unshift(node.id);
    }
}