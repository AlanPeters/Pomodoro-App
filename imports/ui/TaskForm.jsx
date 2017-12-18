import React, { Component } from 'react'; 

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
            <form onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
            </form>
        );
    }

    handleSubmit(event){
        this.props.addTask({
            text: this.state.name,
            createdOn: new Date(),
        });
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
