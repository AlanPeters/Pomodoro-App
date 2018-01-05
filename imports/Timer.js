import { TIMER_STATE } from './enums/TimerState.js';

export default class Timer {
    constructor(timerState, tickListener){
        this.length = timerState.length;
        this.state = timerState.state;
        this.tickListener = tickListener;
        
        if(this.state === TIMER_STATE.RUNNING) {
            this.startTime = timerState.startTime;
            this.start();
        }
    }

    start(){
        this.timerInterval = setInterval(
            () => this.tick(),
            200);
    }

    stop(){
        clearInterval(this.timerInterval);
    }

    getRemainingTimeMs(){
        if(this.state === TIMER_STATE.STOPPED) return this.length;
        let now = new Date();
        return this.length - (now.getTime() - this.startTime.getTime());
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

    tick() {
        const curSeconds = this.getRemainingTimeSeconds();
        if(this.lastSeconds !== curSeconds){
            console.log(this.lastSeconds);
            this.tickListener();
        }
        this.lastSeconds = curSeconds;
    }

}
