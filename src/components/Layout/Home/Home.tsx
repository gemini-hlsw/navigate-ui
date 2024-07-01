import React, { useState } from 'react';
import { Telescope } from '@Telescope/Telescope';
import { WavefrontSensors } from '@WavefrontSensors/WavefrontSensors';
import { Guider } from '@Guider/Guider';
import { PanelType } from '@/types';
import './Home.scss';

export default function Home() {
  const TOUCH_THRESHOLD = 50;
  const [panelDisplay, setPanelDisplay] = useState<PanelType>('Telescope');
  const [touchPos, setTouchPos] = useState<number>(0);

  function handleTouchStart(e: React.TouchEvent) {
    setTouchPos(e.touches[0].pageX);
  }

  function nextPanel() {
    switch (panelDisplay) {
      case 'Telescope':
        setPanelDisplay('WavefrontSensors');
        break;
      case 'WavefrontSensors':
        setPanelDisplay('Guider');
        break;
      case 'Guider':
        setPanelDisplay('Telescope');
        break;
      default:
        break;
    }
  }

  function prevPanel() {
    switch (panelDisplay) {
      case 'Telescope':
        setPanelDisplay('Guider');
        break;
      case 'WavefrontSensors':
        setPanelDisplay('Telescope');
        break;
      case 'Guider':
        setPanelDisplay('WavefrontSensors');
        break;
      default:
        break;
    }
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const movement = e.changedTouches[0].pageX - touchPos;
    if (movement > TOUCH_THRESHOLD) {
      prevPanel();
    } else if (movement < -TOUCH_THRESHOLD) {
      nextPanel();
    }
  }

  return (
    <div className={`main-body ${panelDisplay}`} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="panel Telescope">
        <Telescope prevPanel={prevPanel} nextPanel={nextPanel} />
      </div>
      <div className="panel WavefrontSensors">
        <WavefrontSensors prevPanel={prevPanel} nextPanel={nextPanel} />
      </div>
      <div className="panel Guider">
        <Guider prevPanel={prevPanel} nextPanel={nextPanel} />
      </div>
    </div>
  );
}
