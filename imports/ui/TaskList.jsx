import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/Tasks.js';

import Task from './Task.jsx';
import TaskForm from './TaskForm.jsx';
import SynchronizedTask from '../SynchronizedTask.js';

class UiTaskList extends Component {
    constructor(props) {
        super(props);

        this.addTask = this.addTask.bind(this);
    }

    render() {
        const list = this.props.tasks.map( (item, index) => {
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

    componentDidMount(){
        if(this.props.tasks[0]){
            this.props.currentTaskHandler(this.props.tasks[0]);
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.tasks[0]){
            nextProps.currentTaskHandler(nextProps.tasks[0]);
        }
    }

    componentWillUnmount(){
    }

    addTask(taskDescription){
        SynchronizedTask.addTask(taskDescription);
    }

}

export default withTracker(() => {
    const tasks = Tasks.find({}).fetch();

    return {
        tasks: tasks.map((task) => {
            return new SynchronizedTask(task);
        }
        )};
})(UiTaskList);

