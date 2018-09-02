import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import TimerControls from './TimerControls.jsx';
import TimerDisplay from './TimerDisplay.jsx';


export default class TimerWithControls extends Component {
  constructor(props) {
    super(props);

    this.finishedHandler = this.finishedHandler.bind(this);
  }

  finishedHandler() {
    const {
      timeElapsed,
      endTimer,
      finishedHandler,
    } = this.props;
    endTimer();
    finishedHandler(timeElapsed);
  }

  render() {
    const {
      timeMs,
      timerDisplayState,
      currentActivity,
      startTimer,
      isRunning,
    } = this.props;
    const timerCssClass = timerDisplayState.CSS_CLASS;
    const panelClass = classnames({
      timer: true,
      [timerCssClass]: true,
    });
    return (
      <Panel className={panelClass}>
        <Panel.Body>
          <TimerDisplay
            timeMs={timeMs}
          />
          <TimerControls
            finishedHandler={this.finishedHandler}
            activityType={currentActivity}
            startTimer={startTimer}
            isRunning={isRunning}
          />
        </Panel.Body>
      </Panel>
    );
  }
}

TimerWithControls.propTypes = {
  finishedHandler: PropTypes.func.isRequired,
  endTimer: PropTypes.func.isRequired,
  timeElapsed: PropTypes.number.isRequired,
  timeMs: PropTypes.number.isRequired,
  timerDisplayState: PropTypes.shape({
    CSS_CLASS: PropTypes.string.isRequired,
  }).isRequired,
  currentActivity: PropTypes.string.isRequired,
  startTimer: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
};
