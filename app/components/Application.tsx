'use strict';

import * as React from 'react';
import { Toolbar, Divider, GridList, Button } from 'react-md';
import { Stores } from '../stores';

import AddLink from './AddLink/AddLink';
import Links from './Links/Links';
import GraphCalls from './GraphCalls/GraphCalls';

import './Application.scss';

interface AppProps {
    stores: Stores;
}

const Application: React.SFC<AppProps> = ({stores}) => {
    const onGenerate = () => stores.linksStore.generateLinks();
    return (
        <div className='Application'>
            <Toolbar>
                <AddLink linksStore={stores.linksStore}/>
                <Button className="generate-links-btn" onClick={onGenerate} raised primary>Generate Links</Button>
            </Toolbar>
            <Divider />
            <GridList className="GridList" size={1}>
                <Links linksStore={stores.linksStore}/>
                <GraphCalls linksStore={stores.linksStore}/>
            </GridList>
        </div>
    );
}

export default Application;
