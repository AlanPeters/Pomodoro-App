import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/Tasks.js';


export default class SynchronizedTask {
  // description: this.description,
  // isDone: this.doneStatus,
  // timeSpent: this.timeSpent,
  constructor(task) {
    this.task = task;
  }

  getDescription() {
    return this.task.description;
  }

  isDone() {
    return this.task.doneTime !== undefined;
  }

  getTimeSpent() {
    return this.task.timeSpent;
  }

  getPomodorosCompleted() {
    return this.task.pomodoros;
  }

  addTime(time) {
    Meteor.call('tasks.addTime', this.task._id, time);
  }

  finish() {
    Meteor.call('tasks.complete', this.task._id);
  }

  setOrder(order) {
    Meteor.call('tasks.setOrder', this.task._id, order);
  }

  static addTask(description) {
    Meteor.call('tasks.add', description);
  }

  static getCurrentTasks() {
    return Tasks.find({ doneTime: null }).fetch().sort((a, b) => a.order - b.order);
  }

  static getTodaysFinishedTasks() {
    const today = new Date(new Date().setHours(0,0,0,0));
    return Tasks.find({ doneTime: { $gt: today } }).fetch().sort((a, b) => a.doneTime - b.doneTime);
  }
}
