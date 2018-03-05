'use strict';

import * as React from 'react';
import { Card, CardTitle, CardText, Button, CardActions } from 'react-md';
import { observer } from 'mobx-react';

import { LinksStore } from '../../stores';

interface LinksProps {
    linksStore: LinksStore;
}

const Links: React.SFC<LinksProps> = ({linksStore}) => {
    
    return (
        <div className="Functions">
            <Card>
                <CardTitle title="Links Relationships"/>
                <CardText>
                    <ol>
                        {linksStore.linksData.map((item, i) => getFunctionCallerItem(item, i))}    
                    </ol>
                </CardText>
                <CardText>
                    <h5>Tolopogical Output</h5>
                    <div>
                        {linksStore.topologicalOutput}
                    </div>
                </CardText>
                <CardActions>
                    <Button raised primary onClick={() => linksStore.clearAll()}>Clear All</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default observer(Links);

function getFunctionCallerItem(links, idx) {
    return (
        <li key={idx}>{links.join(' - ')}</li>
    )
}