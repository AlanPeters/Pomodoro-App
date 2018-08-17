import React, { Component } from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';

export default class Configuration extends Component {
  constructor(props) {
    super(props);
    const {
      pomodoroLength,
      shortBreakLength,
      longBreakLength,
      longBreakFrequency,
    } = this.props.configuration;

    this.state = {
      pomodoroLength: pomodoroLength / (60 * 1000),
      shortBreakLength: shortBreakLength / (60 * 1000),
      longBreakLength: longBreakLength / (60 * 1000),
      longBreakFrequency,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const {
      setPomodoroDuration,
      setShortBreakDuration,
      setLongBreakDuration,
      setLongBreakFrequency,
    } = this.props.configuration;
    setPomodoroDuration(this.state.pomodoroLength * 60 * 1000);
    setShortBreakDuration(this.state.shortBreakLength * 60 * 1000);
    setLongBreakDuration(this.state.longBreakLength * 60 * 1000);
    setLongBreakFrequency(parseInt(this.state.longBreakFrequency, 10));

    event.preventDefault();
  }

  handleChange(event) {
    const { target: { value, name } } = event;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <h2>
          Configuration
        </h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>
              Pomodoro Lenth
            </ControlLabel>
            <FormControl
              type="number"
              name="pomodoroLength"
              value={this.state.pomodoroLength}
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
              value={this.state.shortBreakLength}
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
              value={this.state.longBreakLength}
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
              value={this.state.longBreakFrequency}
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
