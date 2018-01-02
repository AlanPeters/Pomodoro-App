import React, { Component } from 'react';
import { TIMER_STATE } from '../enums/TimerState.js';
import JSTimer from '../Timer.js'; 
import TimerControls from './TimerControls.jsx';

import { withTracker } from 'meteor/react-meteor-data';
import { Timer as TimerState } from '../api/Timer.js';

class Timer extends Component {
    constructor(props){
        super(props);
        this.tick = this.tick.bind(this);

        let timerState = this.props.timerState;
        console.log(timerState);
        if(timerState === undefined){
            timerState = {
                state: TIMER_STATE.STOPPED,
                length: this.props.timerLength,
            };
        }

        const timer = new JSTimer(timerState, this.tick);

        this.state = {
            timer: timer,
            remaining: timer.getMinutesAndSeconds(),
            timerState: timer.getTimerState(),
        };

        this.handleStartStopClick = this.handleStartStopClick.bind(this);
        this.handlePauseClick = this.handlePauseClick.bind(this);
    }

    tick() {
        const remainingTime = this.state.timer.getMinutesAndSeconds();
        this.setState({
            remaining: remainingTime,
        });
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
        this.state.timer.stop();
    }

    render(){
        console.log('render');
        console.log(this.props.timerState);
        return (
            <div className="timer">
                <TimeDisplay displayTime={this.state.remaining} />
                <TimerControls
                    timerState={this.state.timerState}
                    onStartStop={this.handleStartStopClick}
                    onPause={this.handlePauseClick} />
            </div>
        );
    }

    handleStartStopClick(){
        if(this.state.timer.getTimerState() === TIMER_STATE.STOPPED) {
            this.state.timer.start();
        } else {
            this.state.timer.stop();
        }
        this.setState({
            timerState: this.state.timer.getTimerState(),
        })
    }

    handlePauseClick(){
    }
}

function TimeDisplay(props){
    const displayTime = props.displayTime;
    let minutes = displayTime.minutes.toString().padStart(2,"0");
    let seconds = displayTime.seconds.toString().padStart(2,"0");
    let hours = displayTime.hours > 0 ? displayTime.hours.toString()+":" : "";
    let symbol = displayTime.isNegative ? '-' : '';
    return <h2>{symbol}{hours}{minutes}:{seconds}</h2>;
}

export default withTracker(() => {
    timerState = TimerState.find().fetch();
    console.log("In Tracker");
   
    console.log(timerState);
    return {
        timerState: timerState[0],
    };
})(Timer);
