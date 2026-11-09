import { useClock } from '../hooks';

const pad = (value: number) => String(value).padStart(2, '0');

function Face({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) {
  const hourAngle = ((hours % 12) + minutes / 60) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const secondAngle = seconds * 6;
  return (
    <svg viewBox="-40 -40 80 80" aria-hidden="true">
      <circle r="36" fill="var(--surface)" stroke="var(--fg)" strokeWidth="1.6" />
      {Array.from({ length: 12 }, (_, index) => (
        <line key={index} y1="-31" y2={index % 3 === 0 ? -25 : -28} stroke="var(--fg)" strokeWidth={index % 3 === 0 ? 1.8 : 1} transform={`rotate(${index * 30})`} />
      ))}
      <line y2="-17" stroke="var(--fg)" strokeWidth="3" strokeLinecap="square" transform={`rotate(${hourAngle})`} />
      <line y2="-26" stroke="var(--fg)" strokeWidth="2" strokeLinecap="square" transform={`rotate(${minuteAngle})`} />
      <g transform={`rotate(${secondAngle})`}>
        <line y1="6" y2="-24" stroke="var(--fg)" strokeWidth="1" />
        <circle cy="-24" r="3.2" fill="var(--hn-accent)" stroke="var(--fg)" strokeWidth="1" />
      </g>
      <circle r="2.6" fill="var(--fg)" />
    </svg>
  );
}

export default function Clocks() {
  const mine = useClock('Asia/Karachi');
  const yours = useClock();
  const mineMinutes = mine.hours * 60 + mine.minutes;
  const yourMinutes = yours.hours * 60 + yours.minutes;
  let gap = mineMinutes - yourMinutes;
  if (gap > 720) gap -= 1440;
  if (gap < -720) gap += 1440;
  const hoursApart = Math.abs(gap) / 60;
  const label = hoursApart % 1 ? hoursApart.toFixed(1) : String(hoursApart);
  const sentence = gap === 0
    ? 'Same time zone. That makes it easy.'
    : `I'm ${label} hour${hoursApart === 1 ? '' : 's'} ${gap > 0 ? 'ahead of' : 'behind'} you. I plan the overlap around your day.`;

  return (
    <div>
      <div className="hn-clocks">
        <div className="hn-clock">
          <Face {...mine} />
          <div><span className="hn-mono">Islamabad</span><b>{pad(mine.hours)}:{pad(mine.minutes)}</b></div>
        </div>
        <div className="hn-clock">
          <Face {...yours} />
          <div><span className="hn-mono">You</span><b>{pad(yours.hours)}:{pad(yours.minutes)}</b></div>
        </div>
      </div>
      <p className="hn-clock-gap">{sentence}</p>
    </div>
  );
}
