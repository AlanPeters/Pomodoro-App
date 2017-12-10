import React, {Component} from 'react';

import Task from './Task.jsx';

export default class TaskList extends Component {
    constructor(props) {
        super(props);



    }

    render() {
        const list = this.getTasks().map( (item, index) => {
            return <Task taskName={item} key={index} />
        });
        return (
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
        );
    }

    getTasks(){
        return this.props.tasks;
    }
}
