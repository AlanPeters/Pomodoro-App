import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.myTick = this.myTick.bind(this);


    this.state = {
      displayTime: this.props.timer.getHoursMinutesSeconds(),
    };
  }

  componentDidMount() {
    this.setupTimer();
  }

  componentWillReceiveProps(nextProps) {
    this.props.timer.removeTickListener();
    nextProps.timer.setTickListener(this.myTick);
    this.setState({ displayTime: nextProps.timer.getHoursMinutesSeconds() });
  }

  componentWillUnmount() {
    this.tearDownTimer();
  }

  setupTimer() {
    this.props.timer.setTickListener(this.myTick);
  }

  tearDownTimer() {
    this.props.timer.removeTickListener();
  }

  myTick() {
    const displayTime = this.props.timer.getHoursMinutesSeconds();
    this.setState({
      displayTime,
    });
  }

  render() {
    const { displayTime } = this.state;
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
