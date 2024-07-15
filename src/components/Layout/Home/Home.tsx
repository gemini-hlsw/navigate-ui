import React, { useCallback, useEffect, useState } from 'react';
import { Telescope } from '@Telescope/Telescope';
import { WavefrontSensors } from '@WavefrontSensors/WavefrontSensors';
import { Guider } from '@Guider/Guider';
import { PanelType } from '@/types';
import './Home.scss';
import { useGetAllInformation } from '@gql/configs/AllConfiguration';
import {
  useSetBaseTargets,
  useSetConfiguration,
  useSetOiTargets,
  useSetP1Targets,
  useSetP2Targets,
  useSetRotator,
} from '@/components/atoms/configs';
import { useSetSlewFlags } from '@/components/atoms/slew';

export default function Home() {
  const TOUCH_THRESHOLD = 50;
  const [panelDisplay, setPanelDisplay] = useState<PanelType>('Telescope');
  const [touchPos, setTouchPos] = useState<number>(0);

  const getAllInfo = useGetAllInformation();

  const setConfiguration = useSetConfiguration();
  const setBaseTargets = useSetBaseTargets();
  const setOiTargets = useSetOiTargets();
  const setP1Targets = useSetP1Targets();
  const setP2Targets = useSetP2Targets();
  const setRotator = useSetRotator();

  const setSlewFlags = useSetSlewFlags();

  useEffect(() => {
    // Initialize states
    getAllInfo({
      onCompleted({ configuration, rotator, slewFlags, targets }) {
        setConfiguration(configuration!);
        setRotator(rotator!);
        setSlewFlags(slewFlags!);
        setBaseTargets(
          targets.filter((t) => t?.type === 'SCIENCE' || t?.type === 'BLINDOFFSET' || t?.type === 'FIXED'),
        );
        setOiTargets(targets.filter((t) => t?.type === 'OIWFS'));
        setP1Targets(targets.filter((t) => t?.type === 'PWFS1'));
        setP2Targets(targets.filter((t) => t?.type === 'PWFS2'));
      },
    });
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setTouchPos(e.touches[0].pageX);
    },
    [setTouchPos],
  );

  const nextPanel = useCallback(() => {
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
  }, [panelDisplay, setPanelDisplay]);

  const prevPanel = useCallback(() => {
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
  }, [panelDisplay, setPanelDisplay]);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const movement = e.changedTouches[0].pageX - touchPos;
      if (movement > TOUCH_THRESHOLD) {
        prevPanel();
      } else if (movement < -TOUCH_THRESHOLD) {
        nextPanel();
      }
    },
    [prevPanel, nextPanel],
  );

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
