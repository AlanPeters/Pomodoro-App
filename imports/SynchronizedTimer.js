import Timer from './Timer.js';
import {Timer as TimerState} from './api/Timer.js';
import {Meteor} from 'meteor/meteor';

export default class SynchronizedTimer {
    constructor(timerState) {
        this.timer = new Timer(timerState);
        this.timerID = timerState._id;
        this.setTickListener = this.timer.setTickListener.bind(this.timer);
        this.removeTickListener = this.timer.removeTickListener.bind(this.timer);
        this.getHoursMinutesSeconds = this.timer.getHoursMinutesSeconds.bind(this.timer);
        this.getElapsedTimeMs = this.timer.getElapsedTimeMs.bind(this.timer);
        this.destroy = this.timer.destroy.bind(this.timer);
        this.getLength = this.timer.getLength.bind(this.timer);
        this.isRunning = this.timer.isRunning.bind(this.timer);
    }

    start() {
        this.timer.start();
        Meteor.call('timer.insert', this.timer.toJSON());
    }

    stop() {
        this.timer.stop();
        Meteor.call('timer.insert', this.timer.toJSON());
    }

    finish() {
        this.timer.stop();
        Meteor.call('timer.remove');
    }

}