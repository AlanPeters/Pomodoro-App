import React, { Component } from 'react';
import { Panel, Well } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { ACTIVITY_TYPES } from '../JSObjects/Configuration';

import TimerControls from './TimerControls.jsx';
import Timer from './Timer.jsx';


export default class TimerWithControls extends Component {
  constructor(props) {
    super(props);

    this.finishedHandler = this.finishedHandler.bind(this);
    this.state = { displayTime: this.props.timer.getHoursMinutesSeconds() };

    this.myTick = this.myTick.bind(this);
  }

  finishedHandler() {
    const timeSpent = this.props.timer.getElapsedTimeMs();
    this.props.timer.finish();
    this.props.finishedHandler(timeSpent);
  }

  myTick() {
    const displayTime = this.props.timer.getHoursMinutesSeconds();
    this.setState({
      displayTime,
    });
  }

  setupTimer() {
    this.props.timer.setTickListener(this.myTick);
  }

  tearDownTimer() {
    this.props.timer.removeTickListener();
  }

  componentDidMount() {
    this.setupTimer();
  }

  componentWillReceiveProps(nextProps) {
    this.props.timer.removeTickListener();
    nextProps.timer.setTickListener(this.myTick);
    this.setState({ displayTime: nextProps.timer.getHoursMinutesSeconds() });
  }

  componentWillUnmount() {
    this.tearDownTimer();
  }

  getTimerCssClass({ minutes, isNegative }, activity) {
    if (isNegative) return 'timerOver';
    if (activity === ACTIVITY_TYPES.POMODORO) {
      if (minutes < 2) {
        return 'timerWarning';
      }
      return 'timerGood';
    } if (activity === ACTIVITY_TYPES.SHORT_BREAK || ACTIVITY_TYPES.LONG_BREAK) {
      if (minutes < 2) {
        return 'timerWarning';
      }
      return 'timerGood';
    }
    return 'timerNone';
  }

  render() {
    const { activityType } = this.props;
    const timerCssClass = this.getTimerCssClass(this.state.displayTime, activityType);
    const panelClass = classnames({
      timer: true,
      [timerCssClass]: true,
    });
    return (
      <Panel className={panelClass}>
        <Panel.Body>
          <Timer
            time={this.state.displayTime}
          />
          <TimerControls
            timer={this.props.timer}
            finishedHandler={this.finishedHandler}
            activityType={activityType}
          />
        </Panel.Body>
      </Panel>
    );
  }
}

TimerWithControls.propTypes = {
  activityType: PropTypes.string.isRequired,
};
