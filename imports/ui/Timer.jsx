import React, {Component} from 'react';
import JSTimer from '../Timer.js';
import TIMER_STATE from '../enums/TimerState.js';

export default class Timer extends Component {
    constructor(props){
        super(props);

        this.myTick = this.myTick.bind(this);

        this.setupTimer(this.props.length, this.props.startTime, this.props.state);

        this.state = {
            displayTime: this.timer.getHoursMinutesSeconds(),
        };
    }

    componentWillMount(){

    }

    componentWillUnmount(){
        this.timer.stop();
    }

    componentWillReceiveProps(nextProps){
        this.setupTimer(nextProps.length, nextProps.startTime, nextProps.state);
        this.setState({ displayTime: this.timer.getHoursMinutesSeconds(), });
        console.log("Timer:new props received");
    }

    setupTimer(length, startTime, state){
        if(this.timer){
            this.timer.stop();
        }

        const timerState = {
            length: length,
            startTime: startTime,
            state: state,
        };

        this.timer = new JSTimer(timerState, this.myTick);
    }

    myTick(){
        const displayTime = this.timer.getHoursMinutesSeconds();
        console.log(displayTime);
        this.setState({
            displayTime: displayTime,
        });
    }

    render(){
        const displayTime = this.state.displayTime;
        let minutes = displayTime.minutes.toString().padStart(2,"0")
        let seconds = displayTime.seconds.toString().padStart(2,"0");
        let hours = displayTime.hours > 0 ? displayTime.hours.toString()+":" : "";
        let symbol = displayTime.isNegative ? '-' : '';
        return <h2>{symbol}{hours}{minutes}:{seconds}</h2>;
    }

}
