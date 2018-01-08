import React, {Component} from 'react';

export default class Timer extends Component {
    constructor(props){
        super(props);

        this.myTick = this.myTick.bind(this);

        this.setupTimer();

        this.state = {
            displayTime: this.props.timer.getHoursMinutesSeconds(),
        };
    }

    componentWillMount(){

    }

    componentWillUnmount(){
        //cleanup timer
    }

    componentWillReceiveProps(nextProps){
        nextProps.timer.setTickListener(this.myTick);
        this.setState({ displayTime: this.props.timer.getHoursMinutesSeconds(), });
    }

    setupTimer(){
        this.props.timer.setTickListener(this.myTick);
    }

    myTick(){
        const displayTime = this.props.timer.getHoursMinutesSeconds();
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
