import React, { Component } from 'react';
import { TIMER_STATE } from '../enums/TimerState.js';

export default class Timer extends Component {
    constructor(props){
        super(props);



        this.state = {
            now: new Date(),
        };
    }
    getTimeSeconds() {
        if(this.props.timerState === TIMER_STATE.PAUSED) {
            return ( this.props.timerEndTime - this.props.pausedTime)/1000; 
        }
        return (this.props.timerEndTime - this.state.now)/1000;
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
        this.setState({
            now: new Date()
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
        let displayTime;
        if(this.props.timerState === TIMER_STATE.RUNNING || this.props.timerState === TIMER_STATE.PAUSED){
            displayTime = this.getMinutesAndSeconds(this.getTimeSeconds());
        } else  {
            displayTime = this.getMinutesAndSeconds(this.props.timerLength/1000);
        }

        let minutes = displayTime.minutes.toString().padStart(2,"0");
        let seconds = displayTime.seconds.toString().padStart(2,"0"); 
        let symbol = displayTime.isNegative ? '-' : ''; 
        return (
            <div className="timer">
                <h2>{symbol}{minutes}:{seconds}</h2>
            </div>
        );
    }
}

