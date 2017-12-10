import { TIMER_STATE } from './enums/TimerState.js';

export default class Timer {
    constructor(timerLength){
        this.length = timerLength;
        this.state = TIMER_STATE.STOPPED; 
        this.totalPauseTime = 0;
    }

    start(){
        if(this.state === TIMER_STATE.STARTED) return;

        this.startTime = new Date();
        this.state = TIMER_STATE.STARTED;
    }

    stop(){
        this.length = this.getRemainingTimeMs();
        this.state = TIMER_STATE.STOPPED;

    }

    pause(){
        this.length = this.getRemainingTimeMs();
        this.state = TIMER_STATE.PAUSED;
    }

    getRemainingTimeMs(){
        if(this.state === TIMER_STATE.STOPPED) return this.length;
        let now = new Date();
        return this.length - (now.getTime() - this.startTime.getTime());
    }

    getTimerState(){
        return this.state;
    }
}
