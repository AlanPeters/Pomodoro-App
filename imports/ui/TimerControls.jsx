import React, {Component} from 'react';
import {ACTIVITY_TYPES} from "../JSObjects/Configuration";
import {Button} from "react-bootstrap";

export default class TimerControls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            running: this.props.timer.isRunning(),
        };

        this.onStartStop = this.onStartStop.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        this.setState({running: nextProps.timer.isRunning()})
    }

    render() {
        const startText = this.props.activityType === ACTIVITY_TYPES.POMODORO ?
            "Start Pomodoro" : "Start Break";
        const stopText = this.props.activityType === ACTIVITY_TYPES.POMODORO ?
            "Finish Pomodoro" : "Finish Break";

        const showStop = this.state.running;
        const startStopText = showStop ? stopText : startText;

        return (
            <div>
                <Button name="startStopButton" onClick={this.onStartStop}>
                    {startStopText}
                </Button>
            </div>
        );
    }

    onStartStop() {
        if (this.props.timer.isRunning()) {
            this.props.finishedHandler();
        } else {
            this.props.timer.start();
        }
        this.setState({
            running: this.props.timer.isRunning(),
        });
    }

}

