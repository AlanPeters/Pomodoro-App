import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import 'react-dom';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import {
  Grid,
  Row,
  Col,
  PageHeader,
  Tabs,
  Tab,
} from 'react-bootstrap';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import UiTaskList from './TaskList.jsx';
import TimerWithControls from './TimerWithControls.jsx';
import SynchronizedTask from '../JSObjects/SynchronizedTask.js';
import TaskForm from './TaskForm.jsx';
import Configuration from './Configuration.jsx';
import ConfigObject, { ACTIVITY_TYPES } from '../JSObjects/Configuration';
import { Configuration as ConfigState } from '../api/Configuration';
import { Timer as TimerState } from '../api/Timer';
import Timer from '../JSObjects/SynchronizedTimer';
import TimerInjector from './TimerInjector';
import TitleUpdator from './TitleUpdator';

const TitleBar = new TimerInjector(TitleUpdator);

class App extends Component {
  static addTask(taskDescription) {
    SynchronizedTask.addTask(taskDescription);
  }

  constructor(props) {
    super(props);
    this.state = {
    };

    this.setCurrentTask = this.setCurrentTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
  }

  setCurrentTask(task) {
    this.setState({
      currentTask: task,
    });
  }

  completeTask(msTimeElapsed) {
    const { currentTask } = this.state;
    const { configuration } = this.props;
    if (currentTask
        && configuration.getCurrentActivity() === ACTIVITY_TYPES.POMODORO) {
      currentTask.addTime(msTimeElapsed);
    }
    configuration.stepToNextActivity();
  }

  render() {
    let currentTaskDescription = '';
    const { currentTask } = this.state;
    if (currentTask) {
      currentTaskDescription = currentTask.getDescription();
    }

    const { configuration, timer } = this.props;
    const currentActivity = configuration.getCurrentActivity();
    let activityHeader;
    if (currentActivity === ACTIVITY_TYPES.POMODORO) {
      activityHeader = `Current Task: ${currentTaskDescription}`;
    } else if (currentActivity === ACTIVITY_TYPES.SHORT_BREAK) {
      activityHeader = 'Short Break';
    } else if (currentActivity === ACTIVITY_TYPES.LONG_BREAK) {
      activityHeader = 'Long Break';
    }

    return (
      <div className="app">
        <TitleBar />
        <Grid>
          <PageHeader>
                        Pomodoro Tracker
          </PageHeader>
          <Row>
            <Col lg={12}>
              <TimerWithControls
                activityType={currentActivity}
                timer={timer}
                finishedHandler={this.completeTask}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <h2 className="text-center">
                {activityHeader}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <TaskForm addTask={App.addTask} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Tabs defaultActiveKey={1} id="mainTabs">
                <Tab eventKey={1} title="Tasks">
                  <Row>
                    <Col md={6}>
                      <UiTaskList
                        type="current"
                        currentTaskHandler={this.setCurrentTask}
                      />
                    </Col>
                    <Col md={6}>
                      <UiTaskList type="past" />
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey={2} title="Configuration">
                  <Configuration
                    configuration={configuration}
                  />
                </Tab>
                <Tab eventKey={3} title="Account">
                  <AccountsUIWrapper />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('configuration');
  Meteor.subscribe('timer');

  const configurationState = ConfigState.findOne(
    { owner: Meteor.userId() },
  );

  const configuration = new ConfigObject(configurationState);

  const { timerState = { length: configuration.getCurrentDuration() } } = TimerState.findOne() || {};
  const timer = new Timer(timerState);

  return {
    configuration,
    timer,
  };
})(App);

App.propTypes = {
  configuration: PropTypes.instanceOf(ConfigObject).isRequired,
  timer: PropTypes.instanceOf(Timer).isRequired,
};