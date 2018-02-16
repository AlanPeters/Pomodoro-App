import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/Tasks.js';

import Task from './Task.jsx';
import TaskForm from './TaskForm.jsx';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.addTask = this.addTask.bind(this);
        console.log(this.getTasks()[0]);
        this.props.newTaskHandler(this.getTasks()[0]);
    }

    render() {
        const list = this.getTasks().map( (item, index) => {
            return <Task task={item} key={index} />
        });
        return (
            <div>
                <TaskForm addTask={this.addTask} />
                <table>
                    <tbody>
                        <tr>
                            <th>Task Name</th>
                            <th colSpan={2} />
                            <th>Pomodoro Number</th>
                            <th />
                        </tr>
                        { list }
                    </tbody>
                </table>
            </div>
        );
    }

    getTasks(){
        return this.props.tasks;
    }

    addTask(task){
        Tasks.insert(task);
    }

    componentWillReceiveProps(nextProps){
        nextProps.newTaskHandler(nextProps.tasks[0]);
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}).fetch(),
    };
})(TaskList);
