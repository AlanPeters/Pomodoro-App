import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { time: displayTime } = this.props;
    const minutes = displayTime.minutes.toString().padStart(2, '0');
    const seconds = displayTime.seconds.toString().padStart(2, '0');
    const hours = displayTime.hours > 0 ? `${displayTime.hours}:` : '';
    const symbol = displayTime.isNegative ? '-' : '';
    return (
      <div className="timerDisplay">
        <h1>
          {`${symbol}${hours}${minutes}:${seconds}`}
        </h1>
      </div>
    );
  }
}
