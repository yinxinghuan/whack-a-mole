import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import posterImg from '../img/poster.png';

// Game images to preload
import guitaristImg from '../img/guitarist.png';
import guitaristSurprisedImg from '../img/guitarist_surprised.png';
import hackerImg from '../img/hacker.png';
import hackerSurprisedImg from '../img/hacker_surprised.png';
import ghostImg from '../img/ghost.png';
import ghostSurprisedImg from '../img/ghost_surprised.png';
import coderImg from '../img/coder.png';
import coderSurprisedImg from '../img/coder_surprised.png';
import backgroundImg from '../img/background.png';
import aigramLogo from '../img/aigram.svg';

import './SplashScreen.less';

const GAME_IMAGES: string[] = [
  guitaristImg,
  guitaristSurprisedImg,
  hackerImg,
  hackerSurprisedImg,
  ghostImg,
  ghostSurprisedImg,
  coderImg,
  coderSurprisedImg,
  backgroundImg,
  aigramLogo,
];

const MIN_MS = 2200;
const MAX_ASSET_MS = 10000;

export interface SplashScreenProps {
  onDone: () => void;
}

const SplashScreen = React.memo(
  forwardRef<HTMLDivElement, SplashScreenProps>(function SplashScreen({ onDone }, ref) {
    const [posterReady, setPosterReady] = useState(false);
    const [progress, setProgress] = useState(0);
    const [fading, setFading] = useState(false);
    const [minDone, setMinDone] = useState(false);
    const [assetsDone, setAssetsDone] = useState(false);
    const calledRef = useRef(false);

    // Min timer — starts when poster is ready
    useEffect(() => {
      if (!posterReady) return;
      const id = setTimeout(() => setMinDone(true), MIN_MS);
      return () => clearTimeout(id);
    }, [posterReady]);

    // Preload game images — starts when poster is ready
    useEffect(() => {
      if (!posterReady) return;

      let loaded = 0;
      const total = GAME_IMAGES.length;

      const timeout = setTimeout(() => setAssetsDone(true), MAX_ASSET_MS);

      const tick = () => {
        loaded++;
        setProgress(loaded / total);
        if (loaded >= total) {
          clearTimeout(timeout);
          setAssetsDone(true);
        }
      };

      GAME_IMAGES.forEach((src) => {
        const img = new Image();
        img.onload = tick;
        img.onerror = tick;
        img.src = src;
      });

      return () => clearTimeout(timeout);
    }, [posterReady]);

    // Fade out when both conditions met
    useEffect(() => {
      if (minDone && assetsDone && !calledRef.current) {
        calledRef.current = true;
        setFading(true);
        setTimeout(onDone, 500);
      }
    }, [minDone, assetsDone, onDone]);

    const handlePosterLoad = useCallback(() => setPosterReady(true), []);

    return (
      <div className={`wam-splash${fading ? ' wam-splash--fading' : ''}`} ref={ref}>
        <img
          className={`wam-splash__img${posterReady ? ' wam-splash__img--visible' : ''}`}
          src={posterImg}
          alt="Whack-A-Mole"
          draggable={false}
          onLoad={handlePosterLoad}
        />
        <div className="wam-splash__bar-track">
          <div
            className="wam-splash__bar-fill"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
    );
  })
);

SplashScreen.displayName = 'SplashScreen';
export default SplashScreen;
