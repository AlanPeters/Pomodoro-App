export const ACTIVITY_TYPES = {
    POMODORO: 'Pomodoro',
    SHORT_BREAK: 'Short Break',
    LONG_BREAK: 'Long Break',
};


export default class Configuration {
    constructor() {
        this.pomodoroLength = 25 * 60 * 1000;
        this.shortBreakLength = 5 * 60 * 1000;
        this.longBreakLength = 15 * 60 * 1000;
        this.longBreakFrequency = 4;
        this.currentActivity = ACTIVITY_TYPES.POMODORO;
        this.currentPomodoroCount = 0;
    }

    setPomodoroDuration(lengthMs) {
        this.pomodoroLength = lengthMs;
    }

    setShortBreakDuration(lengthMs) {
        this.shortBreakLength = lengthMs;
    }

    setLongBreakDuration(lengthMs) {
        this.longBreakLength = lengthMs;
    }

    setLongBreakFrequency(interval) {
        this.longBreakFrequency = interval;
    }

    stepToNextActivity() {
        if (this.currentActivity === ACTIVITY_TYPES.POMODORO) {
            this.currentPomodoroCount++;
            this.currentPomodoroCount %= this.longBreakFrequency;
            if (this.currentPomodoroCount == 0) {
                this.currentActivity = ACTIVITY_TYPES.LONG_BREAK;
            } else {
                this.currentActivity = ACTIVITY_TYPES.SHORT_BREAK;
            }
        } else {
            this.currentActivity = ACTIVITY_TYPES.POMODORO
        }
    }

    getPomodoroDuration(){
        return this.pomodoroLength;
    }

    getShortBreakDuration(){
        return this.shortBreakLength;
    }

    getLongBreakDuration(){
        return this.longBreakLength;
    }

    getLongBreakFrequency(){
        return this.longBreakFrequency;
    }

}