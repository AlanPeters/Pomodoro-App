import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import JSTimer from '../JSObjects/SynchronizedTimer';
import { Timer as TimerState } from '../api/Timer';
import { Configuration as ConfigState } from '../api/Configuration';
import { TIMER_STATE } from '../JSObjects/Timer';
import Configuration, { ACTIVITY_TYPES } from '../JSObjects/Configuration';

export const TIMER_DISPLAY_STATES = {
  TIMER_GOOD: {
    NAME: 'Timer Good',
    CSS_CLASS: 'timerGood',
    FAVICON: 'timer_good.ico',
  },
  TIMER_WARNING: {
    NAME: 'Timer Warning',
    CSS_CLASS: 'timerWarning',
    FAVICON: 'timer_warning.ico',
  },
  TIMER_OVER: {
    NAME: 'Timer Over',
    CSS_CLASS: 'timerOver',
    FAVICON: 'timer_over.ico',
  },
  BREAK: {
    NAME: 'Break',
    CSS_CLASS: 'break',
    FAVICON: 'timer_break.ico',
  },
};

export default function (WrappedComponent) {
  const injectorClass = class extends Component {
    static tearDownOldTimer(oldTimer) {
      oldTimer.destroy();
    }

    constructor (props) {
      super(props);
      this.tick = this.tick.bind(this);
      this.state = {};
    }

    componentWillMount() {
      const { timer, configuration } = this.props;
      this.setupNewTimer(timer);
      this.updateState(timer, configuration);
    }

    componentWillReceiveProps({ timer: newTimer, configuration }) {
      const { timer: oldTimer } = this.props;
      injectorClass.tearDownOldTimer(oldTimer);
      this.setupNewTimer(newTimer);
      this.updateState(newTimer, configuration);
    }

    componentWillUnmount() {
      const { timer: oldTimer } = this.props;
      injectorClass.tearDownOldTimer(oldTimer);
    }

    setupNewTimer(newTimer) {
      newTimer.setTickListener(this.tick);
    }

    static getTimerCssClass(timeMs, activity) {
      if (timeMs <= 0) return TIMER_DISPLAY_STATES.TIMER_OVER;
      if (activity === ACTIVITY_TYPES.POMODORO) {
        if (timeMs < 2 * 60 * 1000) {
          return TIMER_DISPLAY_STATES.TIMER_WARNING;
        }
        return TIMER_DISPLAY_STATES.TIMER_GOOD;
      } if (activity === ACTIVITY_TYPES.SHORT_BREAK || ACTIVITY_TYPES.LONG_BREAK) {
        if (timeMs < 2 * 60 * 1000) {
          return TIMER_DISPLAY_STATES.TIMER_WARNING;
        }
        return TIMER_DISPLAY_STATES.BREAK;
      }
      return null;
    }

    tick() {
      const { timer, configuration } = this.props;
      this.updateState(timer, configuration);
    }

    updateState(timer, configuration) {
      const timeMs = timer.getRemainingTimeMs();
      const currentActivity = configuration.getCurrentActivity();
      const timerDisplayState = injectorClass.getTimerCssClass(timeMs, currentActivity);
      this.setState({
        timeMs,
        timerDisplayState,
      });
    }

    render() {
      const {
        timer,
        configuration: unusedConfiguration,
        ...passThroughProps
      } = this.props;

      const { timeMs, timerDisplayState } = this.state;

      return (
        <WrappedComponent
          timeMs={timeMs}
          startTimer={timer.start}
          endTimer={timer.stop}
          timerDisplayState={timerDisplayState}
          {...passThroughProps}
        />
      );
    }
  };

  injectorClass.propTypes = {
    timer: PropTypes.instanceOf(JSTimer).isRequired,
    configuration: PropTypes.instanceOf(Configuration).isRequired,
  };

  return withTracker(() => {
    Meteor.subscribe('timer');
    Meteor.subscribe('configuration');
    const configState = ConfigState.findOne();
    const configuration = new Configuration(configState);
    const timerResult = TimerState.findOne();
    const timerState = timerResult ? timerResult.timerState
      : { length: configuration.getCurrentDuration(), state: TIMER_STATE.STOPPED };
    const timer = new JSTimer(timerState);
    return {
      timer,
      configuration,
    };
  })(injectorClass);
}
