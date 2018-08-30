import Timer from '../JSObjects/Timer';
import 'react-dom';

const TimerUpdater = ({ timeMs }) => {
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
  document.title = timeString;
  return null;
};

export default TimerUpdater;