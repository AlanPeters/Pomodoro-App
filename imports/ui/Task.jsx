import React, {Component} from 'react';

export default class Task extends Component {
    constructor(props){
        super(props);
        this.deleteTask = this.deleteTask.bind(this); 
    }

    deleteTask(){
        this.props.task.finish();
    }

    render(){
        return (
            <tr>
                <td>{this.props.task.getDescription()}</td>
                <td>
                    <button onClick={this.deleteTask}>Finish</button>
                </td>
                <td>{this.props.task.getTimeSpent()}</td>
                <td colSpan={3} />
            </tr>
        )
    }
}
