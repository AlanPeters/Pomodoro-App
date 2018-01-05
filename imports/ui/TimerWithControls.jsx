import React, { Component } from 'react';
import { TIMER_STATE } from '../enums/TimerState.js';
import JSTimer from '../Timer.js';
import TimerControls from './TimerControls.jsx';
import Timer from './Timer.jsx';

import { withTracker } from 'meteor/react-meteor-data';
import { Timer as TimerState } from '../api/Timer.js';

class TimerWithControls extends Component {
    constructor(props){
        super(props);

        this.handleStartStopClick = this.handleStartStopClick.bind(this);
        this.handlePauseClick = this.handlePauseClick.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }

    handleStartStopClick(){
        if(this.getTimerState().state === TIMER_STATE.STOPPED) {
            TimerState.insert({
                state: TIMER_STATE.RUNNING,
                length: this.props.timerLength,
                startTime: new Date(),
            });
        } else {
            TimerState.remove(this.props.timerState._id);
        }

    }

    getTimerState(){
        return this.props.timerState || {
            state: TIMER_STATE.STOPPED,
            length: this.props.timerLength,
        };
    }

    handlePauseClick(){};

    render(){
        const timerState = this.getTimerState();
        return (
            <div className="timer">
                <Timer
                    length={timerState.length}
                    startTime={timerState.startTime}
                    state={timerState.state} />
                <TimerControls
                    timerState={timerState.state}
                    onStartStop={this.handleStartStopClick}
                    onPause={this.handlePauseClick} />
            </div>
        );
    }

}


export default withTracker(() => {
    const timerStateResult = TimerState.find().fetch();
    console.log("In Tracker");
    const timerState = timerStateResult[0];
    console.log(timerState);
    return {
        timerState: timerState,
    };
})(TimerWithControls);
