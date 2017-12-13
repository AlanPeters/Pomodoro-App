import React, {Component} from 'react';

import Task from './Task.jsx';
import TaskForm from './TaskForm.jsx';

export default class TaskList extends Component {
    constructor(props) {
        super(props);


        this.state = {
            tasks: this.props.tasks,
        };
        this.addTask = this.addTask.bind(this);
    }

    render() {
        const list = this.getTasks().map( (item, index) => {
            return <Task taskName={item} key={index} />
        });
        return (
            <div>
                <TaskForm addTask={this.addTask} />
                <table>
                    <tbody>
                        <tr>
                            <th>Task Name</th>
                            <th colSpan={2} />
                            <th >Pomodoro Number</th>
                            <th />
                        </tr>
                        { list }
                    </tbody>
                </table>
            </div>
        );
    }

    getTasks(){
        return this.state.tasks;
    }
    addTask(task){
        let taskList = this.state.tasks.slice();
        taskList.push(task);

        this.setState({
            tasks: taskList,
        });
    }

}
