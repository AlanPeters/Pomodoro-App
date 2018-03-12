import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Task from './Task.jsx';
import TaskForm from './TaskForm.jsx';

export default class UiTaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: this.props.taskList.getUnfinishedTasks(),
        };

        this.addTask = this.addTask.bind(this);
        this.taskListListener = this.taskListListener.bind(this);
    }

    render() {
        const list = this.state.tasks.map( (item, index) => {
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
        this.props.taskList.addListener(this.taskListListener);
    }

    componentWillUnmount(){
        this.props.taskList.removeListener(this.taskListListener);
    }

    addTask(taskDescription){
        this.props.taskList.createTask(taskDescription);
    }

    taskListListener(){
        this.setState({
            tasks: this.props.taskList.getUnfinishedTasks(),
        });
    }
}
