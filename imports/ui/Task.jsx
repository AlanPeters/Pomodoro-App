import React, {Component} from 'react';
import { Tasks } from '../api/Tasks.js';

export default class Task extends Component {
    constructor(props){
        super(props);
        this.deleteTask = this.deleteTask.bind(this); 
    }

    deleteTask(){
        Tasks.remove(this.props.task._id);
    }

    render(){
        return (
            <tr>
                <td>{this.props.task.text}</td>
                <td>
                    <button onClick={this.deleteTask}>Delete</button>
                </td>
                <td colSpan={4} />
            </tr>
        )
    }
}
