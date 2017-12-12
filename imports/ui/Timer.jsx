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
        });
    }

    handlePauseClick(){
        /* if(this.state.timer*/
    }



}

function TimeDisplay(props){
    const displayTime = props.displayTime;
    let minutes = displayTime.minutes.toString().padStart(2,"0");
    let seconds = displayTime.seconds.toString().padStart(2,"0");
    let symbol = displayTime.isNegative ? '-' : '';
    return <h2>{symbol}{minutes}:{seconds}</h2>;
}
