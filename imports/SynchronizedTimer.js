import Timer from './Timer.js';
import { Timer as TimerState } from './api/Timer.js';

export default class SynchronizedTimer {
    constructor(timerState){
        this.timer = new Timer(timerState);
        this.timerID = timerState._id;
        this.setTickListener = this.timer.setTickListener.bind(this.timer);
        this.removeTickListener = this.timer.removeTickListener.bind(this.timer);
        this.getHoursMinutesSeconds = this.timer.getHoursMinutesSeconds.bind(this.timer);
        this.destroy = this.timer.destroy.bind(this.timer);
        this.getLength = this.timer.getLength.bind(this.timer);
        this.isRunning = this.timer.isRunning.bind(this.timer);
    }

    start(){
        this.timer.start();
        if(this.timerID) {
            TimerState.update(this.timerID, this.timer.toJSON());
        }else{
            TimerState.insert(this.timer.toJSON());
        }
    }

    stop(){
        this.timer.stop();
        TimerState.update(this.timerID, this.timer.toJSON());
    }

    finish(){
        this.timer.stop();
        TimerState.remove(this.timerID);
    }

}