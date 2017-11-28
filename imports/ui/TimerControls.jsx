import React, { Component } from 'react';
import { TIMER_STATE } from '../enums/TimerState.js';

export default class TimerControls extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount(){
    }

    render(){
        const showStop = this.props.timerState === TIMER_STATE.RUNNING || this.props.timerState === TIMER_STATE.PAUSED;
        const startStopText = showStop ? "Stop Pomodoro" : "Start Pomodoro";

        const pauseText = this.props.timerState === TIMER_STATE.PAUSED ? "Resume" : "Pause";

        return (
            <div>
                <button name="startStopButton" onClick={this.props.onStartStop}>
                    {startStopText}
                </button>
                <button name="pauseButton" onClick={this.props.onPause}>
                    {pauseText}
                </button>
            </div>
        );
    }
}

