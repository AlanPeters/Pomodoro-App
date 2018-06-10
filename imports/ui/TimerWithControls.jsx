import React, {Component} from 'react';
import {Panel} from "react-bootstrap";

import TimerControls from './TimerControls.jsx';
import Timer from './Timer.jsx';

export default class TimerWithControls extends Component {
    constructor(props) {
        super(props);

        this.finishedHandler = this.finishedHandler.bind(this);
    }

    finishedHandler() {
        const timeSpent = this.props.timer.getElapsedTimeMs();
        this.props.timer.finish();
        this.props.finishedHandler(timeSpent);
    }

    render() {
        return (
            <Panel>
                <Panel.Body>
                    <Timer
                        timer={this.props.timer}
                    />
                    <TimerControls
                        timer={this.props.timer}
                        finishedHandler={this.finishedHandler}
                        activityType={this.props.activityType}
                    />
                </Panel.Body>
            </Panel>
        );
    }

}


