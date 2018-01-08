import React, { Component } from 'react';

import TimerControls from './TimerControls.jsx';
import Timer from './Timer.jsx';

export default class TimerWithControls extends Component {
    constructor(props){
        super(props);

        this.handleStartStopClick = this.handleStartStopClick.bind(this);
        this.handlePauseClick = this.handlePauseClick.bind(this);
    }

    componentWillReceiveProps(nextProps){
    }

    handleStartStopClick(){
        if(!this.props.timer.isRunning()) {
           this.props.timer.start();
        } else {
            this.props.timer.stop();
        }
    }

    handlePauseClick(){
    };


    render(){
        return (
            <div className="timer">
                <Timer
                    timer={this.props.timer}
                />
                <TimerControls
                    timer={this.props.timer}
                    onStartStop={this.handleStartStopClick}
                    onPause={this.handlePauseClick} />
            </div>
        );
    }

}


