import React, { Component } from 'react';
import { TIMER_STATE } from '../enums/TimerState.js';
import JSTimer from '../Timer.js'; 
import TimerControls from './TimerControls.jsx';

export default class Timer extends Component {
    constructor(props){
        super(props);

        this.state = {
            timer: new JSTimer(this.props.timerLength),
        };
        this.handleStartStopClick = this.handleStartStopClick.bind(this);
        this.handlePauseClick = this.handlePauseClick.bind(this);
    }

    getTimeSeconds() {
        return (this.state.timer.getRemainingTimeMs())/1000;
    }

    getMinutesAndSeconds(seconds){
        const isNegative = seconds <= 0;
        const mins = Math.floor(Math.abs(seconds) / 60);
        const secs = Math.floor(Math.abs(seconds) % 60);
        const ret = {
            isNegative: isNegative,
            minutes: mins,
            seconds: secs,
        };
        return ret;
    }

    tick() {
        let remainingSecs = this.getTimeSeconds();
        this.setState({
            remaining: remainingSecs,
        });
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );

    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    render(){
        let displayTime = this.getMinutesAndSeconds(this.state.remaining);

        let minutes = displayTime.minutes.toString().padStart(2,"0");
        let seconds = displayTime.seconds.toString().padStart(2,"0"); 
        let symbol = displayTime.isNegative ? '-' : ''; 
        return (
            <div className="timer">
                <h2>{symbol}{minutes}:{seconds}</h2>
                <TimerControls
                    timerState={this.state.timer.getTimerState()}
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
    }

    handlePauseClick(){
        /* if(this.state.timer*/
    }



}

