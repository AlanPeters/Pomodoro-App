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
    PageHeader,
    Tabs,
    Tab
} from 'react-bootstrap';
import SynchronizedTask from '../JSObjects/SynchronizedTask.js';
import TaskForm from './TaskForm.jsx';
import Configuration from './Configuration.jsx';
import ConfigObject, { ACTIVITY_TYPES } from '../JSObjects/Configuration';
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


        const currentActivity = this.props.configuration.getCurrentActivity();
        let activityHeader;
        let timerLength;
        if (currentActivity === ACTIVITY_TYPES.POMODORO) {
            activityHeader = "Current Task: " + currentTaskDescription;
            timerLength = this.props.configuration.getPomodoroDuration();
        } else if (currentActivity === ACTIVITY_TYPES.SHORT_BREAK) {
            activityHeader = "Short Break";
            timerLength = this.props.configuration.getShortBreakDuration();
        } else if (currentActivity === ACTIVITY_TYPES.LONG_BREAK){
            activityHeader = "Long Break";
            timerLength = this.props.configuration.getLongBreakDuration();
        }

        return (
            <div className="app">
                <Grid>
                    <PageHeader>
                        Pomodoro Tracker
                    </PageHeader>
                    <Row>
                        <Col lg={12}>
                            <Timer
                                timerLength={timerLength}
                                finishedHandler={this.completeTask}
                                activityType={currentActivity}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <h2 className={'text-center'}>{activityHeader}</h2>
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
        if (this.state.currentTask
            && this.props.configuration.currentActivity === ACTIVITY_TYPES.POMODORO) {
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

    Meteor.subscribe('configuration');

    const configurationState = ConfigState.findOne(
        {owner: Meteor.userId()}
    );

    const configuration = new ConfigObject(configurationState);

    return {
        configuration,
    }
})(App);
