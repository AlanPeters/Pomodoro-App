import React, { Component } from 'react';

import TimerInjector from './TimerInjector.jsx';
import UiTaskList from './TaskList.jsx';
import TimerWithControls from './TimerWithControls.jsx';
import Timer from '../Timer.js';
import {
    Grid,
    Row,
    Col,
    Jumbotron,
    Tabs,
    Tab
    } from 'react-bootstrap';
import SynchronizedTask from '../SynchronizedTask.js';
import TaskForm from './TaskForm.jsx';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timerLength: 1000 * 60 * 2,
        };

        this.setCurrentTask = this.setCurrentTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.addTask = this.addTask.bind(this);
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
                        <Col lg={12}>
                            <Timer
                                timerLength={this.state.timerLength}
                                finishedHandler={this.completeTask}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <h2 className={'text-center'}>Current Task: {currentTaskDescription}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <TaskForm addTask={this.addTask} />
                        </Col>
                    </Row>
                    <Row>
                        <Col ml={12}>
                            <Tabs defaultActiveKey={1}>
                                <Tab eventKey={1} title="Tasks">
                                    <Row>
                                        <Col md={6}>
                                            <UiTaskList
                                                type={'current'}
                                                currentTaskHandler={this.setCurrentTask}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <UiTaskList type={'past'} />
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey={2} title="Configuration">
                                </Tab>
                            </Tabs>
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

    addTask(taskDescription){
        SynchronizedTask.addTask(taskDescription);
    }
}
