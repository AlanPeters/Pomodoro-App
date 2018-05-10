import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/Tasks.js';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';


import Task from './Task.jsx';
import SynchronizedTask from '../SynchronizedTask.js';

class UiTaskList extends Component {
    constructor(props) {
        super(props);
        this.reorderTasks = this.reorderTasks.bind(this);
    }

    render() {
        return (
            <div>
                <SortableList
                    items={this.props.tasks}
                    onSortEnd={this.reorderTasks}/>
            </div>
        );
    }

    componentDidMount(){
        if(this.props.tasks[0]) {
            if (this.props.currentTaskHandler) {
                this.props.currentTaskHandler(this.props.tasks[0]);
            }
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.tasks[0] && nextProps.currentTaskHandler){
            nextProps.currentTaskHandler(nextProps.tasks[0]);
        }
    }

    reorderTasks({oldIndex, newIndex}){
        const newList = arrayMove(this.props.tasks.slice(), oldIndex, newIndex);
        newList.map((task, index) => task.setOrder(index));

    }

}

const SortableItem = SortableElement(({task}) =>
    <Task task={task} />
);

const SortableList = SortableContainer(({items}) => {
    return (
        <ListGroup>
            {items.map((task, index) => (
                <SortableItem key={`item-${index}`} index={index} task={task} />
            ))}
        </ListGroup>
    );
});

export default withTracker(({type}) => {
    const isDone = type !== 'current';
    const tasks = Tasks.find({isDone:isDone}).fetch().sort((a, b) => a.order-b.order);

    return {
        tasks: tasks.map((task) => {
            return new SynchronizedTask(task);
        }
        )};
})(UiTaskList);

