import React, {Component} from 'react';
import JSTimer from '../JSObjects/SynchronizedTimer.js';
import {withTracker} from 'meteor/react-meteor-data';
import {Timer as TimerState} from '../api/Timer.js';
import {TIMER_STATE} from '../JSObjects/Timer';
// import JSTimer from '../Timer.js';


export default function (WrappedComponent) {
    const injectorClass =
        class extends Component {

            constructor(props) {
                super(props);
            }

            componentWillMount() {
                this.setupTimer(this.getTimerState());
            }

            componentWillUnmount() {
                this.state.timer.destroy();
            }

            componentWillReceiveProps(nextProps) {
                this.setupTimer(nextProps.timerState || this.getDefaultTimerState());
            }

            setupTimer(timerState) {
                if (this.state && this.state.timer) {
                    this.state.timer.destroy();
                }

                this.setState({
                    timer: new JSTimer(timerState),
                });
            }

            getTimerState() {
                return this.props.timerState || this.getDefaultTimerState();
            }

            getDefaultTimerState() {
                return {
                    state: TIMER_STATE.STOPPED,
                    length: this.props.timerLength,
                }
            }

            render() {
                const {timerState, timerLength, ...passThroughProps} = this.props;
                return (
                    <WrappedComponent
                        timer={this.state.timer}
                        {...passThroughProps} />
                );
            }
        };
    return withTracker(() => {
        Meteor.subscribe('timer');
        const result = TimerState.findOne();
        const timerState = result ? result.timerState : undefined;

        return {
            timerState
        };
    })(injectorClass);
}
