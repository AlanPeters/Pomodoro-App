import { TIMER_STATE } from './enums/TimerState.js';

export default class Timer {
    constructor(timerState){
        this.length = timerState.length || 0;
        this.state = timerState.state || TIMER_STATE.STOPPED;
        this.startTime = timerState.startTime;
    }

    setTickListener(tickListener){
        if(!tickListener) return;
        this.tickListener = tickListener;
        if(this.isRunning()) {
            this.startInterval();
        }
    }

    removeTickListener(){
        this.stopInterval();
        delete(this.tickListener);
    }

    start(){
        if(this.isRunning()){
            return;
        }
        this.state = TIMER_STATE.RUNNING;
        this.startTime = new Date();
        this.startInterval();
    }

    isRunning(){
        return this.getState() === TIMER_STATE.RUNNING;
    }

    startInterval(){
        if(!this.timerInterval && this.tickListener)
        this.timerInterval = setInterval(
            () => this.tick(),
            200);
    }

    tick() {
        const curSeconds = this.getRemainingTimeSeconds();
        if(this.lastSeconds !== curSeconds){
            this.tickListener();
        }
        this.lastSeconds = curSeconds;
    }



    stop(){
        this.stopInterval();
        this.state = TIMER_STATE.STOPPED;
        delete(this.startTime);
    }

    destroy(){
        this.stopInterval();
    }

    stopInterval(){
        if(this.timerInterval){
            clearInterval(this.timerInterval);
            delete(this.timerInterval);
        }
    }


    getRemainingTimeMs(){
        if(this.state === TIMER_STATE.STOPPED) return this.length;
        let now = new Date();
        return this.getLength() - (now.getTime() - this.getStartTime().getTime());
    }

    getRemainingTimeSeconds(){
        return Math.floor(this.getRemainingTimeMs() / 1000);
    }

    getHoursMinutesSeconds(){
        const seconds = this.getRemainingTimeSeconds();
        const isNegative = seconds <= 0;
        const hours = Math.floor(Math.abs(seconds)/(60*60));
        const mins = Math.floor(Math.abs(seconds) / 60)%60;
        let secs = Math.abs(seconds) % 60;
        return {
            isNegative: isNegative,
            hours: hours,
            minutes: mins,
            seconds: secs,
        };
    }

    toJSON(){
        return {
            state: this.getState(),
            startTime: this.getStartTime(),
            length: this.getLength(),
        };
    }

    getLength(){
        return this.length;
    }

    getState(){
        return this.state;
    }

    getStartTime(){
        return this.startTime;
    }

}
