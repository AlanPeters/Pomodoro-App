import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Panel
} from 'react-bootstrap';

export default class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render(){
        return (
            <Panel>
                <Panel.Body>
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <ControlLabel>New Task Name</ControlLabel>{' '}
                            <FormControl
                                type='text'
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </Form>
                </Panel.Body>
            </Panel>
        );
    }

    handleSubmit(event){
        this.props.addTask(this.state.name);
        this.setState({name: ""});
        event.preventDefault();
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }
}
