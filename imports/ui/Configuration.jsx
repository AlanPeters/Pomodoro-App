import React, { Component } from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl
    } from 'react-bootstrap';

export default class Configuration extends Component {
    constructor(props){
        super(props);

        this.state = {
            time: this.props.time / (60 * 1000),
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
        this.props.setTime(this.state.time * 60 * 1000)
        event.preventDefault();
    }

    handleChange(event){
        const {target: {value, name}} = event;
        this.setState({
            [name]:value,
        });
    }

    render(){
        return (
            <div>
                <h2>Configuration</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <ControlLabel>Pomodoro Lenth</ControlLabel>
                        <FormControl
                            type="number"
                            name="time"
                            value={this.state.time}
                            onChange={this.handleChange}/>
                    </FormGroup>
                </form>
            </div>
        )
    }
}