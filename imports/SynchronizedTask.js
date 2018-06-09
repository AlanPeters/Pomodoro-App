import { Tasks }  from './api/Tasks.js';
import { Meteor } from 'meteor/meteor';


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

    getPomodorosCompleted(){
        return this.task.pomodoros;
    }


    addTime(time){
        Meteor.call('tasks.addTime', this.task._id, time);
    }

    finish(){
        Meteor.call('tasks.complete', this.task._id);
        // Tasks.update(this.task._id,{
        //     $set:  {isDone:true},
        // });
    }

    setOrder(order){
        Meteor.call('tasks.setOrder', this.task._id, order);
    }

    delete(){
        Tasks.remove(this.task._id);
    }

    static addTask(description){
        Meteor.call('tasks.add', description);
    }
}