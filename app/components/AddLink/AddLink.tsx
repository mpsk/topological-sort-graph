'use strict';

import * as React from 'react';
import { TextField } from 'react-md';
import Icon from '../Icon/Icon';
import { LinksStore } from '../../stores';

import './AddLink.scss';

interface AddFunctionProps {
    linksStore: LinksStore;
}

export default class AddLink extends React.Component<AddFunctionProps, {value: string}> {

    constructor() {
        super();
        this.state = {value: ''};
    }

    onSubmit(e) {
        const { linksStore } = this.props;
        const { value } = this.state;
        if (e.key === 'Enter' && LinksStore.isLinkValid(value)) {
            linksStore.addLink(value);
            this.setState({value: ''});
        }
    }
    
    render() {
        const isValid = LinksStore.isLinkValid(this.state.value);
        const textProps = {
            id: 'add-function-field',
            className: 'add-column',
            label: this.state.value ? (isValid ? 'Press Enter' : 'Invalid' ): 'Describe Links here',
            placeholder: 'link1 link2',
            error: !isValid,
            value: this.state.value,
            onChange: (value) => this.setState({value}),
            onKeyPress: (e) => this.onSubmit(e)
        };
        return (
            <div className='AddLink'>
                <TextField {...textProps}/>
            </div>
        );
    }

}
