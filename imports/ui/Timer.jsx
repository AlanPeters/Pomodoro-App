import React, { Component } from 'react';


export default class Timer extends Component {
    constructor(props){
        super(props);



        const testDate = new Date();
        this.state = {
            now: new Date(),
            timerIsStarted: false,
        };
    }
    getTimeSeconds() {
        /* return now.getMilliseconds();*/
        return ( this.state.now - this.props.timerStart)/1000;
    }
    getMinutesAndSeconds(seconds){
        const mins = Math.floor(seconds/60);
        const secs = Math.floor(seconds % 60);
        const ret = {
            minutes: mins,
            seconds: secs,
        };
        return ret;
    }

    tick() {
        this.setState({
            now: new Date()
        });
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );

    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    render(){
        let displayTime;
        if(this.state.timerIsStarted){
            displayTime = this.getMinutesAndSeconds(this.getTimeSeconds());
        } else {
            displayTime = { minutes: 25, seconds: 0 };
        }

        let minutes = displayTime.minutes.toString().padStart(2,"0");
        let seconds = displayTime.seconds.toString().padStart(2,"0"); 
        return (
            <div className="timer">
                <h2>{minutes}:{seconds}</h2>
                <div className="controls">
                    <Controls timerIsStarted={this.state.timerIsStarted} />
                </div>
            </div>
        );
    }
}



function StartStopButton(props){
    let text = props.timerIsStarted ? "Stop Pomodoro" : "Start Pomodoro";
    return (
        <button>{text}</button>
    );
}

function Controls(props){
    return (
        <StartStopButton timerIsStarted={props.timerIsStarted} />
    );
}    
