import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import TimerInjector from './TimerInjector.jsx';
import UiTaskList from './TaskList.jsx';
import TimerWithControls from './TimerWithControls.jsx';
import Timer from '../JSObjects/Timer.js';
import {
    Grid,
    Row,
    Col,
    Jumbotron,
    Tabs,
    Tab
} from 'react-bootstrap';
import SynchronizedTask from '../JSObjects/SynchronizedTask.js';
import TaskForm from './TaskForm.jsx';
import Configuration from './Configuration.jsx';
import ConfigObject from '../JSObjects/Configuration';
import {Configuration as ConfigState} from '../api/Configuration';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // timerLength: this.props.configuration.defaultTimerLength || 25*60*1000,
        };

        this.setCurrentTask = this.setCurrentTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.addTask = this.addTask.bind(this);
        this.setTimerLength = this.setTimerLength.bind(this);
    }

    render() {
        const Timer = TimerInjector(TimerWithControls);
        let currentTaskDescription = '';
        if (this.state.currentTask) {
            currentTaskDescription = this.state.currentTask.getDescription();
        }
        return (
            <div className="app">
                <Grid>
                    <Jumbotron>
                        <h1 className="text-center">Pomodoro Tracker</h1>
                    </Jumbotron>
                    <Row>
                        <Col lg={12}>
                            <Timer
                                timerLength={this.getTimerLength()}
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
                            <TaskForm addTask={this.addTask}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Tabs defaultActiveKey={1} id="mainTabs">
                                <Tab eventKey={1} title="Tasks">
                                    <Row>
                                        <Col md={6}>
                                            <UiTaskList
                                                type={'current'}
                                                currentTaskHandler={this.setCurrentTask}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <UiTaskList type={'past'}/>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey={2} title="Configuration">
                                    <Configuration
                                        time={this.getTimerLength()}
                                        setTime={this.setTimerLength}/>
                                </Tab>
                                <Tab eventKey={3} title="Account">
                                    <AccountsUIWrapper/>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

    getTimerLength() {
        return this.props.configuration.getPomodoroDuration();
    }

    setCurrentTask(task) {
        this.setState({
            currentTask: task,
        });
    }

    completeTask(msTimeElapsed) {
        if (this.state.currentTask) {
            this.state.currentTask.addTime(msTimeElapsed);
        }
        this.props.configuration.stepToNextActivity();
    }

    setTimerLength(time) {
        Meteor.call('configuration.updateDefaultPomodoroLength', time);
        this.setState({
            timerLength: time,
        });
    }

    addTask(taskDescription) {
        SynchronizedTask.addTask(taskDescription);
    }

}

export default withTracker(() => {

    const configurationState = ConfigState.findOne(
        {owner: Meteor.userId()}
    );

    const configuration = new ConfigObject(configurationState);

    return {
        configuration,
    }
})(App);
