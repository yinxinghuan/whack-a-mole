import guitaristImg from '../img/guitarist.png';
import hackerImg from '../img/hacker.png';
import ghostImg from '../img/ghost.png';
import coderImg from '../img/coder.png';
import './WamPopups.less';

const CHARS = [guitaristImg, coderImg, hackerImg, ghostImg];

interface Slot {
  xPct: number;
  yPct: number;
  charIdx: number;
  delay: number;
  duration: number;
  isDanger: boolean;
}

// Scattered around the modal so the focal area stays clear.
const SLOTS: Slot[] = [
  { xPct: 14, yPct: 6,  charIdx: 0, delay: 0.0, duration: 3.6, isDanger: false },
  { xPct: 78, yPct: 4,  charIdx: 2, delay: 1.4, duration: 3.2, isDanger: false },
  { xPct: 6,  yPct: 26, charIdx: 1, delay: 0.8, duration: 4.0, isDanger: false },
  { xPct: 88, yPct: 30, charIdx: 3, delay: 2.4, duration: 3.0, isDanger: true  },
  { xPct: 8,  yPct: 64, charIdx: 2, delay: 3.2, duration: 3.4, isDanger: false },
  { xPct: 90, yPct: 60, charIdx: 0, delay: 1.0, duration: 3.8, isDanger: false },
  { xPct: 24, yPct: 90, charIdx: 1, delay: 2.0, duration: 3.2, isDanger: false },
  { xPct: 70, yPct: 88, charIdx: 3, delay: 4.4, duration: 3.6, isDanger: true  },
];

export default function WamPopups() {
  return (
    <div className="wam-popups" aria-hidden>
      {SLOTS.map((slot, i) => (
        <div
          key={i}
          className={`wam-popup ${slot.isDanger ? 'wam-popup--danger' : ''}`}
          style={{
            left: `${slot.xPct}%`,
            top: `${slot.yPct}%`,
            ['--popup-delay' as string]: `${slot.delay}s`,
            ['--popup-duration' as string]: `${slot.duration}s`,
          }}
        >
          <div className="wam-popup__hole" />
          <img className="wam-popup__char" src={CHARS[slot.charIdx]} alt="" draggable={false} />
        </div>
      ))}
    </div>
  );
}
