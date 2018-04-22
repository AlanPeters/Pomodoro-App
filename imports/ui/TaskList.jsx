import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/Tasks.js';

import Task from './Task.jsx';
import SynchronizedTask from '../SynchronizedTask.js';

class UiTaskList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const list = this.props.tasks.map( (item, index) => {
            return <Task task={item} key={index} />
        });

        return (
            <div>
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
        if(this.props.tasks[0]) {
            if (this.props.currencTaskHandler) {
                this.props.currentTaskHandler(this.props.tasks[0]);
            }
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.tasks[0] && nextProps.currentTaskHandler){
            nextProps.currentTaskHandler(nextProps.tasks[0]);
        }
    }

    componentWillUnmount(){
    }



}

export default withTracker(({type}) => {
    const isDone = type !== 'current';
    console.log(type);
    const tasks = Tasks.find({isDone:isDone}).fetch();

    return {
        tasks: tasks.map((task) => {
            return new SynchronizedTask(task);
        }
        )};
})(UiTaskList);

