import React, { Component } from 'react';

import TimerInjector from './TimerInjector.jsx';
import UiTaskList from './TaskList.jsx';
import TimerWithControls from './TimerWithControls.jsx';
import Timer from '../Timer.js';
import TaskList from "../TaskList";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timerLength: 1000 * 60 * 2,
        };

        this.setCurrentTask = this.setCurrentTask.bind(this);
        this.completeTask = this.completeTask.bind(this);

        //temporary until new injector
        this.taskList = new TaskList();
        this.taskList.addListener(this.taskListChanegListener.bind(this));
    }

    render() {
        const Timer = TimerInjector(TimerWithControls);
        let currentTaskDescription = '';
        if(this.state.currentTask){
            currentTaskDescription = this.state.currentTask.getDescription();
        }
        return (
            <div className="app">
                <h1>Pomodoro Tracker</h1>
                <Timer
                    timerLength={this.state.timerLength}
                    finishedHandler={this.completeTask}
                />
                <h2>Current Task: {currentTaskDescription}</h2>
                <UiTaskList
                    newTaskHandler={this.setCurrentTask}
                    taskList={this.taskList}
                />
            </div>
        );
    }

    setCurrentTask(){
        const task = this.taskList.getUnfinishedTasks()[0];
        this.setState({
            currentTask: task,
        });
    }

    completeTask(msTimeElapsed){
        if(this.state.currentTask){
            this.state.currentTask.addTime(msTimeElapsed);
        }
    }

    taskListChanegListener(){
        this.setCurrentTask();
    }

}
