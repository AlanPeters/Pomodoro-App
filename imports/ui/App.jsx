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

    getTasks(){
        return [ 'Task 1', 'Task 2', 'Task 3' ];
    }
}
