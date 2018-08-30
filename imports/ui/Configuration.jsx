import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';

import ConfigObject from '../JSObjects/Configuration';

export default class Configuration extends Component {
  constructor(props) {
    super(props);
    const {
      configuration,
    } = this.props;

    this.state = {
      pomodoroLength: configuration.getPomodoroDuration() / (60 * 1000),
      shortBreakLength: configuration.getShortBreakDuration() / (60 * 1000),
      longBreakLength: configuration.getLongBreakDuration() / (60 * 1000),
      longBreakFrequency: configuration.getLongBreakFrequency(),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { configuration } = this.props;
    const {
      pomodoroLength,
      shortBreakLength,
      longBreakLength,
      longBreakFrequency,
    } = this.state;
    configuration.setPomodoroDuration(pomodoroLength * 60 * 1000);
    configuration.setShortBreakDuration(shortBreakLength * 60 * 1000);
    configuration.setLongBreakDuration(longBreakLength * 60 * 1000);
    configuration.setLongBreakFrequency(parseInt(longBreakFrequency, 10));

    event.preventDefault();
  }

  handleChange(event) {
    const { target: { value, name } } = event;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      pomodoroLength,
      shortBreakLength,
      longBreakLength,
      longBreakFrequency,
    } = this.state;
    return (
      <div>
        <h2>
          Configuration
        </h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>
              Pomodoro Length
            </ControlLabel>
            <FormControl
              type="number"
              name="pomodoroLength"
              value={pomodoroLength}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              Short Break Length
            </ControlLabel>
            <FormControl
              type="number"
              name="shortBreakLength"
              value={shortBreakLength}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              Long Break Length
            </ControlLabel>
            <FormControl
              type="number"
              name="longBreakLength"
              value={longBreakLength}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              Number of Pomodoros Before Long Break
            </ControlLabel>
            <FormControl
              type="number"
              name="longBreakFrequency"
              value={longBreakFrequency}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit">
            Save
          </Button>
        </form>
      </div>
    );
  }
}


Configuration.propTypes = {
  configuration: PropTypes.instanceOf(ConfigObject).isRequired,
};
