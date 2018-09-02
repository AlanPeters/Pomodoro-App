import React from 'react';
import Favicon from 'react-favicon';
import Timer from '../JSObjects/Timer';
import 'react-dom';

const TimerUpdater = ({ timeMs, timerDisplayState }) => {
  const {
    hours,
    minutes,
    seconds,
    isNegative,
  } = Timer.convertMsToHoursMinsSecs(timeMs);
  const displayMinutes = minutes.toString().padStart(2, '0');
  const displaySeconds = seconds.toString().padStart(2, '0');
  const displayHours = hours > 0 ? `${hours}:` : '';
  const symbol = isNegative ? '-' : '';
  const timeString = `${symbol}${displayHours}${displayMinutes}:${displaySeconds}`;
  document.title = timeString;
  return (
    <Favicon url={`/images/favicons/${timerDisplayState.FAVICON}`} />
  );
};

export default TimerUpdater;
