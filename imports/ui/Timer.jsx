import React, { Component } from 'react';
import { TIMER_STATE } from '../enums/TimerState.js';
import JSTimer from '../Timer.js'; 
import TimerControls from './TimerControls.jsx';

export default class Timer extends Component {
    constructor(props){
        super(props);
        this.tick = this.tick.bind(this);

        const timer = new JSTimer(this.props.timerLength, this.tick);

        this.state = {
            timer: timer,
            remaining: timer.getMinutesAndSeconds(),
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

    componentDidMount() {
        /* this.timerID = setInterval(
         *     () => this.tick(),
         *     1000
         * );
         */
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
        this.state.timer.stop();
    }

    render(){
        let displayTime = this.state.remaining;

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

