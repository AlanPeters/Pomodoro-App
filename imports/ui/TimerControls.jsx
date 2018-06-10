import React, {Component} from 'react';

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
        const showStop = this.state.running;
        const startStopText = showStop ? "Finish Pomodoro" : "Start Pomodoro";

        return (
            <div>
                <button name="startStopButton" onClick={this.onStartStop}>
                    {startStopText}
                </button>
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

