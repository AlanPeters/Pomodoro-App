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
    return this.task.isDone;
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
}
