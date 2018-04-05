import TaskList from './TaskList.js';
import { Tasks }  from './api/Tasks.js';
import {Task} from "./TaskList";


export default class SynchronizedTask{
    // description: this.description,
    // isDone: this.doneStatus,
    // timeSpent: this.timeSpent,
    constructor(task){
        this.task = task;
    }

    setDescription(description) {
        Tasks.update(this.task._id, {
            $set: {description: description},
        });
    }
    getDescription() {
        return this.task.description;
    }

    isDone(){
        return this.task.isDone;
    }

    getTimeSpent(){
        return this.task.timeSpent;
    }

    addTime(time){
        Tasks.update(this.task._id, {
            $set: {timeSpent: this.task.timeSpent + time},
        });
    }

    finish(){
        Tasks.update(this.task._id,{
            $set:  {isDone:true},
        });
    }

    delete(){
        Tasks.remove(this.task._id);
    }
    static addTask(description){
        Tasks.insert({
            description: description,
            isDone: false,
            timeSpent: 0
        });
    }
}