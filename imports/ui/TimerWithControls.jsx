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

  render() {
    const { activityType } = this.props;
    const { minutes, isNegative } = this.state.displayTime;
    const panelClass = classnames({
      timer: true,
      timerGood: activityType === ACTIVITY_TYPES.POMODORO && minutes >= 2 && !isNegative,
      timerWarning: minutes < 2 && !isNegative,
      timerOver: isNegative,
      break: (activityType === ACTIVITY_TYPES.LONG_BREAK
          || activityType === ACTIVITY_TYPES.SHORT_BREAK)
          && minutes >= 2,
    });
    return (
      <Panel className={panelClass} >
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
