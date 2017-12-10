import React, { Component } from 'react';

import Timer from './Timer.jsx';
import TimerControls from './TimerControls.jsx';
import TaskList from './TaskList.jsx';
import { TIMER_STATE } from '../enums/TimerState.js';
import JSTimer from '../Timer.js';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

            timerLength: 1000 * 60 * 2,
            
        }
        this.handlePauseClick = this.handlePauseClick.bind(this);
        this.handleStartStopClick = this.handleStartStopClick.bind(this);
    }

    render() {
        return (
            <div className="app">
                <h1>hello</h1>
                <Timer
                    timerLength={this.state.timerLength}
                    />

                {/* <TimerControls
                    timerState={this.state.timerState}
                    onStartStop={this.handleStartStopClick}
                    onPause={this.handlePauseClick} /> */}

                <TaskList tasks={this.getTasks()} />
            </div>
        );
    }

    handlePauseClick() {
        if( this.state.timerState === TIMER_STATE.PAUSED){
            const originalLength = this.state.timerEnd - this.state.timerStart;
            const remainingTime = originalLength - ( this.state.timerPause - this.state.timerStart );
            const newStartTime = new Date();
            const newTimerEnd = new Date( newStartTime.getTime() + remainingTime);
            this.setState({
                timerState: TIMER_STATE.RUNNING,
                timerStart: newStartTime,
                timerEnd: newTimerEnd,
            });

        } else if ( this.state.timerState === TIMER_STATE.RUNNING) {
            this.setState({
                timerState: TIMER_STATE.PAUSED,
                timerPause: new Date(),
            })

        }
    }

    handleStartStopClick() {
        if( this.state.timerState === TIMER_STATE.STOPPED){
            const newStart = new Date();
            const newEnd = new Date(newStart.getTime() + this.state.timerLength);
            this.setState({
                timerState: TIMER_STATE.RUNNING,
                timerStart: newStart,
                timerEnd: newEnd,
            });
        } else if ( this.state.timerState === TIMER_STATE.RUNNING) {
            this.setState({
                timerState: TIMER_STATE.STOPPED,
                timerStart: null,
                timerEnd: null
            })
        }
    }

    getTasks(){
        return [ 'Task 1', 'Task 2', 'Task 3' ];
    }
}
