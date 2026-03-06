import React, { forwardRef } from 'react';
import posterImg from '../img/poster.png';
import './SplashScreen.less';

export interface SplashScreenProps {
  onDone: () => void;
}

const SplashScreen = React.memo(
  forwardRef<HTMLDivElement, SplashScreenProps>(function SplashScreen({ onDone }, ref) {
    return (
      <div className="wam-splash" ref={ref}>
        <img
          className="wam-splash__img"
          src={posterImg}
          alt="Whack-A-Mole"
          draggable={false}
          onAnimationEnd={onDone}
        />
      </div>
    );
  })
);

SplashScreen.displayName = 'SplashScreen';
export default SplashScreen;
