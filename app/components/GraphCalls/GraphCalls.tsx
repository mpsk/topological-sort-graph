'use strict';

import * as React from 'react';
import { Card, CardTitle, CardText } from 'react-md';
import Graph from 'react-graph-vis';
import { observer } from 'mobx-react';

import { LinksStore } from '../../stores';
import './GraphCalls.scss';

interface FunctionsProps {
    linksStore: LinksStore;
}

const GraphCalls: React.SFC<FunctionsProps> = (props) => {

    const options = {
        edges: {
            color: "#000000"
        }
    };

    return (
        <div className="GraphCalls">
            <Card>
                <CardTitle title="Links Graph" />
                <CardText className="graph-body">
                    <Graph graph={props.linksStore.nodes} options={options} />
                </CardText>
            </Card>
        </div>
    )
}

export default observer(GraphCalls);

function getNodes() {
    return {
        nodes: [
            {id: 1, label: 'Node 1'},
            {id: 2, label: 'Node 2'},
            {id: 3, label: 'Node 3'},
            {id: 4, label: 'Node 4'},
            {id: 5, label: 'Node 5'}
          ],
        edges: [
            {from: 1, to: 2},
            {from: 1, to: 3},
            {from: 2, to: 4},
            {from: 2, to: 5}
          ]
      };
}