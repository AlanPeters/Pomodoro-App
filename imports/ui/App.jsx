import React, { Component } from 'react';

import TimerInjector from './TimerInjector.jsx';
import TaskList from './TaskList.jsx';
import TimerWithControls from './TimerWithControls.jsx';
import Timer from '../Timer.js';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timerLength: 1000 * 60 * 2,
            currentTask: '',
        };

        this.setCurrentTask = this.setCurrentTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
    }

    render() {
        const Timer = TimerInjector(TimerWithControls);
        return (
            <div className="app">
                <h1>Pomodoro Tracker</h1>
                <Timer
                    timerLength={this.state.timerLength}
                    finishedHandler={this.completeTask}
                />
                <h2>Current Task: {this.state.currentTask}</h2>
                <TaskList newTaskHandler={this.setCurrentTask} />
            </div>
        );
    }

    setCurrentTask(currentTask){
        let taskText;
        if(currentTask) {
            taskText = currentTask.text;
        } else {
            taskText = '';
        }
        this.setState({
            currentTask: taskText,
        });
    }

    completeTask(msTimeElapsed){
        alert('task complete' + Math.ceil(msTimeElapsed/1000));
    }

}
