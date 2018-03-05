'use strict';

import * as React from 'react';
import { TextField } from 'react-md';
import Icon from '../Icon/Icon';

import './AddLink.scss';

interface AddFunctionProps {
    funcsStore: any;
}

export default class AddLink extends React.Component<AddFunctionProps, {value: string}> {

    constructor() {
        super();
        this.state = {value: ''};
    }

    onSubmit(e) {
        const { funcsStore } = this.props;
        if (e.key === 'Enter' && this.state.value) {
            funcsStore.addLink(this.state.value);
            this.setState({value: ''});
        }
    }
    
    render() {
        const textProps = {
            id: 'add-function-field',
            className: 'add-column',
            label: this.state.value ? 'Press Enter' : 'Describe Links here',
            placeholder: 'link1 link2',
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
