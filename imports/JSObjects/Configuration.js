import {Meteor} from 'meteor/meteor';

export const ACTIVITY_TYPES = {
    POMODORO: 'Pomodoro',
    SHORT_BREAK: 'Short Break',
    LONG_BREAK: 'Long Break',
};


export default class Configuration {
    constructor(configState) {
        configState = configState || {};
        this.pomodoroLength = configState.pomodoroLength || 25 * 60 * 1000;
        this.shortBreakLength = configState.shortBreakLength || 5 * 60 * 1000;
        this.longBreakLength = configState.longBreakLength || 15 * 60 * 1000;
        this.longBreakFrequency = configState.longBreakFrequency || 4;
        this.currentActivity = configState.currentActivity || ACTIVITY_TYPES.POMODORO;
        this.currentPomodoroCount = configState.currentPomodoroCount || 0;
    }

    setPomodoroDuration(lengthMs) {
        Meteor.call('configuration.updatePomodoroDuration', lengthMs);
    }

    setShortBreakDuration(lengthMs) {
        Meteor.call('configuration.updateShortBreakDuration', lengthMs);
    }

    setLongBreakDuration(lengthMs) {
        Meteor.call('configuration.updateLongBreakDuration', lengthMs);
    }

    setLongBreakFrequency(numPomodoros) {
        Meteor.call('configuration.updateLongBreakFrequency', numPomodoros);
    }

    stepToNextActivity() {
        let newPomodoroCount = this.currentPomodoroCount;
        let nextActivity;

        if (this.currentActivity === ACTIVITY_TYPES.POMODORO) {
            newPomodoroCount++;
            newPomodoroCount %= this.longBreakFrequency;
            if (newPomodoroCount == 0) {
                nextActivity = ACTIVITY_TYPES.LONG_BREAK;
            } else {
                nextActivity = ACTIVITY_TYPES.SHORT_BREAK;
            }
        } else {
            nextActivity = ACTIVITY_TYPES.POMODORO
        }

        Meteor.call('configuration.setCurrentAction', nextActivity);
        Meteor.call('configuration.setCurrentPomodoroCount', newPomodoroCount);
    }

    getPomodoroDuration() {
        return this.pomodoroLength;
    }

    getShortBreakDuration() {
        return this.shortBreakLength;
    }

    getLongBreakDuration() {
        return this.longBreakLength;
    }

    getLongBreakFrequency() {
        return this.longBreakFrequency;
    }

    getCurrentActivity(){
        return this.currentActivity;
    }
}