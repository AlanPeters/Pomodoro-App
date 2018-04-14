import React, { Component } from 'react';

import TimerInjector from './TimerInjector.jsx';
import UiTaskList from './TaskList.jsx';
import TimerWithControls from './TimerWithControls.jsx';
import Timer from '../Timer.js';
import TaskList from "../TaskList";
import {button} from 'react-bootstrap';
import { Grid, Row, Col, Jumbotron} from 'react-bootstrap';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timerLength: 1000 * 60 * 2,
        };

        this.setCurrentTask = this.setCurrentTask.bind(this);
        this.completeTask = this.completeTask.bind(this);

        //temporary until new injector
        this.taskList = new TaskList();
        this.taskList.addListener(this.taskListChanegListener.bind(this));
    }

    render() {
        const Timer = TimerInjector(TimerWithControls);
        let currentTaskDescription = '';
        if(this.state.currentTask){
            currentTaskDescription = this.state.currentTask.getDescription();
        }
        return (
            <div className="app">
                <Grid>
                        <Jumbotron>
                            <h1>Pomodoro Tracker</h1>
                        </Jumbotron>
                    <Row>
                        <Col lg={6}>
                            <Timer
                                timerLength={this.state.timerLength}
                                finishedHandler={this.completeTask}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <h2>Current Task: {currentTaskDescription}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <UiTaskList
                                currentTaskHandler={this.setCurrentTask}
                                taskList={this.taskList}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

    setCurrentTask(task){
        this.setState({
            currentTask: task,
        });
    }

    completeTask(msTimeElapsed){
        if(this.state.currentTask){
            this.state.currentTask.addTime(msTimeElapsed);
        }
    }

    taskListChanegListener(){
        this.setCurrentTask();
    }

}
