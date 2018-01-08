import React, { Component } from 'react';

export default class TimerControls extends Component {
    constructor(props){
        super(props);

        this.onStartStop = this.onStartStop.bind(this);
        this.onPause = this.onPause.bind(this);
        this.state = {
            running: this.props.timer.isRunning(),
        }
    }


    componentWillReceiveProps(nextProps){
       this.setState({ running: nextProps.timer.isRunning()})
    }

    render(){
        const showStop = this.state.running;
        const startStopText = showStop ? "Stop Pomodoro" : "Start Pomodoro";

        const pauseText = "Pause";

        return (
           <div>
                <button name="startStopButton" onClick={this.onStartStop}>
                    {startStopText}
                </button>
                <button name="pauseButton" onClick={this.props.onPause}>
                    {pauseText}
                </button>
            </div>
        );
    }

    onStartStop(){
        if(this.props.timer.isRunning()){
            this.props.timer.stop();
        } else {
            this.props.timer.start();
        }
        this.setState({
            running: this.props.timer.isRunning(),
        });
    }

    onPause(){

    }
}

