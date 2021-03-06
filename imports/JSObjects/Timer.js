
export const TIMER_STATE = {
  STOPPED: 'Stopped',
  RUNNING: 'Running',
  PAUSED: 'Paused',
};

export default class Timer {
  constructor(timerState = {}) {
    this.length = timerState.length || 0;
    this.state = timerState.state || TIMER_STATE.STOPPED;
    this.startTime = timerState.startTime;
    if (this.state === TIMER_STATE.RUNNING && !this.startTime) {
      this.startTime = new Date();
    }
  }

  setTickListener(tickListener) {
    if (!tickListener) return;
    this.tickListener = tickListener;
    if (this.isRunning()) {
      this.startInterval();
    }
  }

  removeTickListener() {
    this.stopInterval();
    delete (this.tickListener);
  }

  start() {
    if (this.isRunning()) {
      return;
    }
    this.state = TIMER_STATE.RUNNING;
    this.startTime = new Date();
    this.startInterval();
  }

  stop() {
    this.stopInterval();
    this.length = this.getRemainingTimeMs();
    this.state = TIMER_STATE.STOPPED;
    delete (this.startTime);
  }

  destroy() {
    this.stopInterval();
  }

  startInterval() {
    if (!this.timerInterval && this.tickListener) {
      this.timerInterval = setInterval(() => {
        this.stopInterval();
        this.timerInterval = setInterval(
          () => this.tick(),
          200,
        );
        this.tick();
      }, 10);
      this.tick();
    }
  }

  stopInterval() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      delete (this.timerInterval);
    }
  }

  tick() {
    const curSeconds = this.getRemainingTimeSeconds();
    if (this.lastSeconds !== curSeconds) {
      this.tickListener();
    }
    this.lastSeconds = curSeconds;
  }

  getRemainingTimeSeconds() {
    return Timer.convertMsToSeconds(this.getRemainingTimeMs());
  }

  getRemainingTimeMs() {
    if (!this.isRunning()) return this.length;
    return this.getLength() - this.getElapsedTimeMs();
  }

  getElapsedTimeMs() {
    const startTime = this.getStartTime();
    if (!startTime) return 0;
    return new Date().getTime() - startTime.getTime();
  }

  toJSON() {
    return {
      state: this.getState(),
      startTime: this.getStartTime(),
      length: this.getLength(),
    };
  }

  isRunning() {
    return this.getState() === TIMER_STATE.RUNNING;
  }

  getLength() {
    return this.length;
  }

  getState() {
    return this.state;
  }

  getStartTime() {
    return this.startTime;
  }

  static convertMsToHoursMinsSecs(timeMs) {
    const seconds = Timer.convertMsToSeconds(timeMs);
    const isNegative = seconds <= 0;
    const hours = Math.floor(Math.abs(seconds) / (60 * 60));
    const minutes = Math.floor(Math.abs(seconds) / 60) % 60;
    const remainingSeconds = Math.abs(seconds) % 60;
    return {
      isNegative,
      hours,
      minutes,
      seconds: remainingSeconds,
    };
  }

  static convertMsToSeconds(timeMs) {
    return Math.floor(timeMs / 1000);
  }
}
