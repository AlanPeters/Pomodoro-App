import React, { Component } from 'react';
import JSTimer from '../SynchronizedTimer.js';

import { withTracker } from 'meteor/react-meteor-data';
import { Timer as TimerState } from '../api/Timer.js';
import { TIMER_STATE } from '../enums/TimerState.js';

class TimerInjector extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.setupTimer(this.getTimerState());
    }

    componentWillUnmount(){
        this.state.timer.destroy();
    }

    componentWillReceiveProps(nextProps) {
        this.setupTimer(nextProps.timerState || this.getDefaultTimerState());
    }

    setupTimer(timerState){
        if(this.state && this.state.timer){
            this.state.timer.destroy();
        }

        this.setState({
            timer: new JSTimer(timerState),
        });
    }

    getTimerState(){
        return this.props.timerState || this.getDefaultTimerState();
    }

    getDefaultTimerState(){
        return {
            state: TIMER_STATE.STOPPED,
            length: this.props.timerLength,
        }
    }

    render(){
        return this.props.render(this.state.timer);
    }
}

export default withTracker(() => {
    return {
        timerState:  TimerState.find().fetch()[0],
    };
})(TimerInjector);
