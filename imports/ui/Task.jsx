import React, {Component} from 'react';
import Timer from '../Timer.js';
import {Label, Grid, Row, Col, ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.finishTask = this.finishTask.bind(this);
    }

    finishTask() {
        alert('test');
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
                    finishTask={this.finishTask}
                />
            );
        }
    }
}



function FinishedTask(props){
    return (
        <ListGroupItem header={<del><h4>{props.description}</h4></del>}>
            <Button disabled>Finished</Button>
            <Label>{props.hours}{props.minutes}:{props.seconds}</Label>
        </ListGroupItem>
    );
}

function CurrentTask(props) {
    return (
        <ListGroupItem header={<h4>{props.description}</h4>}>
            <Button onClick={props.finishTask}>Finish</Button>
            <Label>{props.hours}{props.minutes}:{props.seconds}</Label>
        </ListGroupItem>
    );
}

