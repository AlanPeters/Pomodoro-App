import React, {Component} from 'react';
import Timer from '../Timer.js';
import {
    Label,
    ListGroupItem,
    Button,
    Grid,
    Row,
    Col,
    } from 'react-bootstrap';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.finishTask = this.finishTask.bind(this);
    }

    finishTask() {
        this.props.task.finish();
    }

    render() {
        const displayTime = Timer.convertMsToHoursMinsSecs(this.props.task.getTimeSpent());
        const minutes = displayTime.minutes.toString().padStart(2, "0");
        const seconds = displayTime.seconds.toString().padStart(2, "0");
        const hours = displayTime.hours.toString() + ":";
        const isFinished = this.props.task.isDone();
        const description = this.props.task.getDescription();
        const button = <Button onClick={this.finishTask}>Finish</Button>;
        const time = <h5>Time: <Label>{hours}{minutes}:{seconds}</Label></h5>;
        if (isFinished) {
            return (
                <FinishedTask
                    time={time}
                    description={description}
                />

            );
        } else {
            return (
                <CurrentTask
                    time={time}
                    button={button}
                    description={description}
                />
            );
        }
    }
}

function FinishedTask(props){

    return (
        <RenderTask
            {...props}
            title={<del>{props.description}</del>}
        />);
}

function CurrentTask(props) {
    return (
        <RenderTask
            {...props}
            title={props.description}
        />

    );
}

function RenderTask(props){
    return (
        <div className="list-group-item" >
            <Grid fluid>
                <Row>
                    <Col md={9} sm={4} xs={8} className="text-left">
                        <h4>{props.title}</h4>
                    </Col>
                    <Col md={3} sm={2} xs={4} className="text-right">
                        {props.button || ""}
                    </Col>
                    <Col md={6} sm={3} xs={6} className="text-left">
                        {props.time}
                    </Col>
                    <Col md={6} sm={3} xs={6} className="text-right">
                        <h5>Pomodoros:</h5>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
}

