import React, {Component} from 'react';
import Timer from '../Timer.js';
import {Button} from 'react-bootstrap';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.deleteTask = this.deleteTask.bind(this);
    }

    deleteTask() {
        this.props.task.finish();
    }

    render() {
        const displayTime = Timer.convertMsToHoursMinsSecs(this.props.task.getTimeSpent());
        const minutes = displayTime.minutes.toString().padStart(2, "0")
        const seconds = displayTime.seconds.toString().padStart(2, "0");
        const hours = displayTime.hours.toString() + ":";
        const isFinished = this.props.task.isDone();
        const description = this.props.task.getDescription();
        if (isFinished) {
            return (
                <FinishedTask
                    hours={hours}
                    minutes={minutes}
                    seconds={seconds}
                    description={description}/>
            );
        } else {
            return (
                <CurrentTask
                    hours={hours}
                    minutes={minutes}
                    seconds={seconds}
                    description={description}
                    finishTask={this.deleteTask}
                />
            );
        }
    }
}

function FinishedTask(props){
    return (
        <tr>
            <td>
                <del>{props.description}</del>
            </td>
            <td>
                <Button disabled>Finished</Button>
            </td>
            <td>{props.hours}{props.minutes}:{props.seconds}</td>
            <td colSpan={3} />
        </tr>
    );
}

function CurrentTask(props) {
    return (
        <tr>
            <td>
                <p>{props.description}</p>
            </td>
            <td>
                <Button onClick={props.finishTask}>Finish</Button>
            </td>
            <td>{props.hours}{props.minutes}:{props.seconds}</td>
            <td colSpan={3} />
        </tr>
    );
}

