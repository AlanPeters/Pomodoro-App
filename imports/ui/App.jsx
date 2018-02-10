import React, { Component } from 'react';

import Timer from './TimerInjector.jsx';
import TaskList from './TaskList.jsx';

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
                <h1>Pomodoro Tracker</h1>
                <Timer
                    timerLength={this.state.timerLength}
                />
                <TaskList
                />
            </div>
        );
    }

}
