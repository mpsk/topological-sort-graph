'use strict';

import {find, uniq} from 'lodash';
import {observable, action, computed, IObservableArray} from 'mobx';

import { getNodes, topologicalSort } from '../utils/utils';

const mockData = () => ['foo bar', 'foo baz', 'bar baz'];

export default class LinksStore {

    static isLinkValid = isLinkValid;
    
    @observable links: IObservableArray<string> = observable([].concat(mockData()));

    @action addLink(link: string): void {
        if (isLinkValid(link)) {
            this.links.push(link);
        }
    }

    @action clearAll() {
        this.links.replace([]);
    }

    @computed get linksData() {
        return getLinks(this.links.slice());
    }

    @computed get nodes() {
        return buildGraph(this.links.slice());
    }

    @computed get topologicalOutput() {
        return topologicalOutput(this.links.slice());
    }

}

function isLinkValid(link: string): boolean {
    const separator = !!link.match('-') ? '-' : ' ';
    return link.split(separator).length === 2;
}

function getLinks(arr): Array<[string, string]> {
    return arr.map(item => {
        const separator = !!item.match('-') ? '-' : ' ';
        return item.split(separator).map(f => f.trim());
    });
}

function topologicalOutput(links) {
    const sorted = topologicalSort(getLinks(links));
    return sorted[0] ? sorted.join(' - ') : 'Impossible';
}

type GraphConfig = {
    nodes: Array<{id: string; label: string}>;
    edges: Array<{from: string; to: string}>;
};
function buildGraph(links): GraphConfig {
    return getLinks(links)
        .reduce((res, links, i) => {
            const {nodes, edges} = res;
            const items = links.reduce((res, link) => {
                const exist = find(nodes, {label: link});
                const item = exist || {id: nodes.length + 1, label: link};
                if (!exist) {
                    nodes.push(item);
                }
                res.push(item);
                return res;
            }, []);
            edges.push({from: items[0].id, to: items[1].id});
            return res;
        }, {nodes: [], edges: []});
}