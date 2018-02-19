import React, {Component} from 'react';

export default class Timer extends Component {
    constructor(props){
        super(props);

        this.myTick = this.myTick.bind(this);


        this.state = {
            displayTime: this.props.timer.getHoursMinutesSeconds(),
        };
    }

    componentDidMount(){
        this.setupTimer();
    }

    componentWillUnmount(){
        this.tearDownTimer();
    }

    componentWillReceiveProps(nextProps){
        this.props.timer.removeTickListener();
        nextProps.timer.setTickListener(this.myTick);
        this.setState({ displayTime: nextProps.timer.getHoursMinutesSeconds(), });
    }

    setupTimer(){
        this.props.timer.setTickListener(this.myTick);
    }

    tearDownTimer(){
        this.props.timer.removeTickListener();
    }

    myTick(){
        const displayTime = this.props.timer.getHoursMinutesSeconds();
        this.setState({
            displayTime: displayTime,
        });
    }

    render(){
        const displayTime = this.state.displayTime;
        const minutes = displayTime.minutes.toString().padStart(2,"0")
        const seconds = displayTime.seconds.toString().padStart(2,"0");
        const hours = displayTime.hours > 0 ? displayTime.hours.toString()+":" : "";
        const symbol = displayTime.isNegative ? '-' : '';
        return <h2>{symbol}{hours}{minutes}:{seconds}</h2>;
    }

}
