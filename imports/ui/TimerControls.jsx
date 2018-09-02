import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { ACTIVITY_TYPES } from '../JSObjects/Configuration';

export default class TimerControls extends Component {
  constructor(props) {
    super(props);

    this.onStartStop = this.onStartStop.bind(this);
  }

  onStartStop() {
    const {
      isRunning,
      finishedHandler,
      startTimer,
    } = this.props;
    if (isRunning) {
      finishedHandler();
    } else {
      startTimer();
    }
  }

  render() {
    const { activityType } = this.props;
    const startText = activityType === ACTIVITY_TYPES.POMODORO
      ? 'Start Pomodoro' : 'Start Break';
    const stopText = activityType === ACTIVITY_TYPES.POMODORO
      ? 'Finish Pomodoro' : 'Finish Break';

    const { isRunning: showStop } = this.props;
    const startStopText = showStop ? stopText : startText;

    return (
      <div className="timerControls">
        <Button name="startStopButton" onClick={this.onStartStop}>
          {startStopText}
        </Button>
      </div>
    );
  }
}

TimerControls.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  activityType: PropTypes.string.isRequired,
  finishedHandler: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
};
