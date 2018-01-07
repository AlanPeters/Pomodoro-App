import React, {Component} from 'react';
import JSTimer from '../Timer.js';

export default class Timer extends Component {
    constructor(props){
        super(props);

        this.myTick = this.myTick.bind(this);

        this.setupTimer(this.props.timerState);

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
        this.setupTimer(nextProps.timerState);
        this.setState({ displayTime: this.timer.getHoursMinutesSeconds(), });
        console.log("Timer:new props received");
    }

    setupTimer(timerState){
        if(this.timer){
            this.timer.stop();
        }

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
