import React, { Component } from 'react';
import { Panel, Well } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { ACTIVITY_TYPES } from '../JSObjects/Configuration';

import TimerControls from './TimerControls.jsx';
import TimerDisplay from './TimerDisplay.jsx';
import SynchronizedTimer from '../JSObjects/SynchronizedTimer';


export default class TimerWithControls extends Component {
  constructor(props) {
    super(props);

    this.finishedHandler = this.finishedHandler.bind(this);
    this.state = {
      timeMs: this.props.timer.getRemainingTimeMs(),
    };

    this.myTick = this.myTick.bind(this);
  }

  componentDidMount() {
    this.setupTimer();
  }

  componentWillReceiveProps(nextProps) {
    this.props.timer.removeTickListener();
    nextProps.timer.setTickListener(this.myTick);
    this.setState({ timeMs: nextProps.timer.getRemainingTimeMs() });
  }

  componentWillUnmount() {
    this.tearDownTimer();
  }

  setupTimer() {
    this.props.timer.setTickListener(this.myTick);
  }

  static getTimerCssClass(timeMs, activity) {
    if (timeMs <= 0) return 'timerOver';
    if (activity === ACTIVITY_TYPES.POMODORO) {
      if (timeMs < 2 * 60 * 1000) {
        return 'timerWarning';
      }
      return 'timerGood';
    } if (activity === ACTIVITY_TYPES.SHORT_BREAK || ACTIVITY_TYPES.LONG_BREAK) {
      if (timeMs < 2 * 60 * 1000) {
        return 'timerWarning';
      }
      return 'break';
    }
    return 'timerNone';
  }

  tearDownTimer() {
    this.props.timer.removeTickListener();
  }

  myTick() {
    const timeMs = this.props.timer.getRemainingTimeMs();
    this.setState({
      timeMs,
    });
  }

  finishedHandler() {
    const timeSpent = this.props.timer.getElapsedTimeMs();
    this.props.timer.finish();
    this.props.finishedHandler(timeSpent);
  }

  render() {
    const { activityType } = this.props;
    const { timeMs } = this.state;
    const timerCssClass = TimerWithControls.getTimerCssClass(timeMs, activityType);
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
  timer: PropTypes.instanceOf(SynchronizedTimer).isRequired,
  finishedHandler: PropTypes.func.isRequired,
};
