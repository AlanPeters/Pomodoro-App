import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Timer from './Timer.jsx';
import TimerControls from './TimerControls.jsx';
import TaskList from './TaskList.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timerLength: 1000 * 60 * 2,
        }
        this.addTask = this.addTask.bind(this);
    }

    render() {
        return (
            <div className="app">
                <h1>hello</h1>
                <Timer
                    timerLength={this.state.timerLength}
                />
                <TaskList
                    tasks={this.getTasks()}
                    addTask={this.addTask}
                />
            </div>
        );
    }

    getTasks(){
        return this.props.tasks; 
    }

    addTask(task){
       Tasks.insert(task);
    }

}
export default withTracker(() => {
    return {
        tasks: Tasks.find({}).fetch(),
    };
})(App);
