'use strict';

import * as React from 'react';
import { Divider, GridList } from 'react-md';
import { Stores } from '../stores';

import AddLink from './AddLink/AddLink';
import Links from './Links/Links';
import GraphCalls from './GraphCalls/GraphCalls';

import './Application.scss';

interface AppProps {
    stores: Stores;
}

const Application: React.SFC<AppProps> = ({stores}) => {
    return (
        <div className='Application'>
            <AddLink linksStore={stores.linksStore}/>
            <Divider />
            <GridList className="GridList" size={1}>
                <Links linksStore={stores.linksStore}/>
                <GraphCalls linksStore={stores.linksStore}/>
            </GridList>
        </div>
    );
}

export default Application;
