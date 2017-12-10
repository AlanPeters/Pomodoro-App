import { TIMER_STATE } from './enums/TimerState.js';

export default class Timer {
    constructor(timerLength, tickListener){
        this.length = timerLength;
        this.state = TIMER_STATE.STOPPED; 
        this.totalPauseTime = 0;
        this.tickListener = tickListener;
    }

    start(){
        if(this.state === TIMER_STATE.STARTED) return;

        this.startTime = new Date();
        this.state = TIMER_STATE.STARTED;
        this.timerInterval = setInterval(
            () => this.tick(),
            200);
    }

    stop(){
        this.length = this.getRemainingTimeMs();
        this.state = TIMER_STATE.STOPPED;

        clearInterval(this.timerInterval);
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

    getRemainingTimeSeconds(){
        return Math.floor(this.getRemainingTimeMs() / 1000);
    }
    getMinutesAndSeconds(){
        const seconds = this.getRemainingTimeSeconds();
        const isNegative = seconds <= 0;
        const mins = Math.floor(Math.abs(seconds) / 60);
        let secs = Math.abs(seconds) % 60;
        return {
            isNegative: isNegative,
            minutes: mins,
            seconds: secs,
        };
    }

    tick() {
        const curSeconds = this.getRemainingTimeSeconds();
        if(this.lastSeconds !== curSeconds){
            this.tickListener();
        }
        this.lastSeconds = curSeconds;
    }

}
