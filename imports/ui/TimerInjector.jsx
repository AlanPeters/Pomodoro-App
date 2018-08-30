import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import JSTimer from '../JSObjects/SynchronizedTimer.js';
import { Timer as TimerState } from '../api/Timer.js';
import { TIMER_STATE } from '../JSObjects/Timer';

export default function (WrappedComponent) {
  const injectorClass = class extends Component {
    constructor (props) {
      super(props);
      this.tick = this.tick.bind(this);
      this.state = {};
    }

    componentWillMount() {
      this.setupTimer(this.getTimerState());
    }

    componentWillReceiveProps({ timerState }) {
      this.setupTimer(timerState || this.getDefaultTimerState());
    }

    componentWillUnmount() {
      const { timer } = this.state;
      timer.destroy();
    }

    setupTimer(timerState) {
      const { timer: oldTimer } = this.state;
      if (oldTimer) {
        oldTimer.destroy();
      }

      const timer = new JSTimer(timerState);
      timer.setTickListener(this.tick);

      this.setState({
        timer,
      });
    }

    getTimerState() {
      const { timerState } = this.props;
      return timerState || this.getDefaultTimerState();
    }

    getDefaultTimerState() {
      const { timerLength } = this.props;
      return {
        state: TIMER_STATE.STOPPED,
        length: timerLength,
      };
    }

    tick() {
      const { timer } = this.state;
      this.setState({
        timeMs: timer.getRemainingTimeMs(),
      });
    }

    render() {
      const { timerState, timerLength, ...passThroughProps } = this.props;
      const { timeMs, timer } = this.state;
      return (
        <WrappedComponent
          timeMs={timeMs}
          startTimer={timer.start}
          endTimer={timer.stop}
          {...passThroughProps}
        />
      );
    }
  };

  injectorClass.propTypes = {
    timerState: PropTypes.object,
    timerLength: PropTypes.number,
  };

  injectorClass.defaultProps = {
    timerLength: 0,
  };

  return withTracker(() => {
    Meteor.subscribe('timer');
    const result = TimerState.findOne();
    const timerState = result ? result.timerState : undefined;

    return {
      timerState,
    };
  })(injectorClass);
}
