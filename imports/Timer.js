import { TIMER_STATE } from './enums/TimerState.js';

export default class Timer {
    constructor(timerState){
        timerState = timerState || {};
        this.length = timerState.length || 0;
        this.state = timerState.state || TIMER_STATE.STOPPED;
        this.startTime = timerState.startTime;
        if(this.state === TIMER_STATE.RUNNING && !this.startTime){
            this.startTime = new Date();
        }
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

    stop(){

        this.stopInterval();
        this.length = this.getRemainingTimeMs();
        this.state = TIMER_STATE.STOPPED;
        delete(this.startTime);
    }

    destroy(){
        this.stopInterval();
    }

    startInterval(){
        if(!this.timerInterval && this.tickListener){
            setTimeout(() => {
                this.timerInterval = setInterval(
                    () => this.tick(),
                    200);
                this.tick();
            }, 10);
            this.tick();
        }
    }

    stopInterval(){
        if(this.timerInterval){
            clearInterval(this.timerInterval);
            delete(this.timerInterval);
        }
    }

    tick() {
        const curSeconds = this.getRemainingTimeSeconds();
        if(this.lastSeconds !== curSeconds){
            this.tickListener();
        }
        this.lastSeconds = curSeconds;
    }

    getHoursMinutesSeconds(){
        const seconds = this.getRemainingTimeSeconds();
        const isNegative = seconds <= 0;
        const hours = Math.floor(Math.abs(seconds)/(60*60));
        const mins = Math.floor(Math.abs(seconds) / 60)%60;
        const secs = Math.abs(seconds) % 60;
        return {
            isNegative: isNegative,
            hours: hours,
            minutes: mins,
            seconds: secs,
        };
    }

    getRemainingTimeSeconds(){
        return Math.floor(this.getRemainingTimeMs() / 1000);
    }

    getRemainingTimeMs(){
        if(!this.isRunning()) return this.length;
        return this.getLength() - this.getElapsedTimeMs();
    }

    getElapsedTimeMs(){
        return new Date().getTime() - this.getStartTime().getTime();
    }

    toJSON(){
        return {
            state: this.getState(),
            startTime: this.getStartTime(),
            length: this.getLength(),
        };
    }

    isRunning(){
        return this.getState() === TIMER_STATE.RUNNING;
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
