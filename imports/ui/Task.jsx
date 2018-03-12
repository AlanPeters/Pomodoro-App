import React, {Component} from 'react';
import Timer from '../Timer.js';

export default class Task extends Component {
    constructor(props){
        super(props);
        this.deleteTask = this.deleteTask.bind(this); 
    }

    deleteTask(){
        this.props.task.finish();
    }

    render(){
        const displayTime = Timer.convertMsToHoursMinsSecs(this.props.task.getTimeSpent());
        const minutes = displayTime.minutes.toString().padStart(2,"0")
        const seconds = displayTime.seconds.toString().padStart(2,"0");
        const hours =displayTime.hours.toString()+":";
        return (
            <tr>
                <td>{this.props.task.getDescription()}</td>
                <td>
                    <button onClick={this.deleteTask}>Finish</button>
                </td>
                <td>{hours}{minutes}:{seconds}</td>
                <td colSpan={3} />
            </tr>
        )
    }
}
