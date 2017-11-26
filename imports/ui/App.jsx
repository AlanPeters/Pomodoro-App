import React, { Component } from 'react';

import Timer from './Timer.jsx'

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <h1>hello</h1>
                <Timer timerStart={new Date()} />
            </div>
        );
    }
}
