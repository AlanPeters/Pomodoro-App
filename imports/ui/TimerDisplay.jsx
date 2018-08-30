import React from 'react';
import 'react-dom';
import PropTypes from 'prop-types';

import Timer from '../JSObjects/Timer';

const TimerDisplay = ({ timeMs }) => {
  const {
    hours,
    minutes,
    seconds,
    isNegative,
  } = Timer.convertMsToHoursMinsSecs(timeMs);
  const displayMinutes = minutes.toString().padStart(2,'0');
  const displaySeconds = seconds.toString().padStart(2,'0');
  const displayHours = hours > 0 ? `${hours}:` : '';
  const symbol = isNegative ? '-' : '';
  const timeString = `${symbol}${displayHours}${displayMinutes}:${displaySeconds}`;
  return (
    <div className="timerDisplay">
      <h1>
        {timeString}
      </h1>
    </div>
  );
};

TimerDisplay.propTypes = {
  timeMs: PropTypes.number.isRequired,
};

export default TimerDisplay;
