import { useEffect, useMemo } from 'react';
import { useAlarmValue } from '../atoms/alarm';
import alarmSoundMp3 from '@assets/sounds/alarm.mp3';
import alarmSoundWebm from '@assets/sounds/alarm.webm';

export function AlarmAudio() {
  const alarm = useAlarmValue();

  const alarmAudio = useMemo(() => {
    const audio = selectPlayableAlarm();
    audio.loop = true;

    // Be nicer to developers' ears
    if (import.meta.env.DEV) audio.volume = 0.3;

    return audio;
  }, []);

  useEffect(() => {
    const checkAlarm = () => {
      if (alarm)
        alarmAudio
          .play()
          .then(() => clearInterval(AudioRetryInterval))
          .catch((err) => {
            console.log('waiting for user interaction to play first notification', err);
          });
      else {
        clearInterval(AudioRetryInterval);
        alarmAudio.pause();
      }
    };

    // Retry playing the alarm every 500ms until it plays, and start immediately
    const AudioRetryInterval = setInterval(checkAlarm, 500);
    checkAlarm();

    // Stop the alarm when the component is unmounted
    return () => {
      clearInterval(AudioRetryInterval);
      alarmAudio.pause();
      alarmAudio.remove;
    };
  }, [alarm, alarmAudio]);

  return <></>;
}

/**
 * use mp3 if possible, otherwise use webm
 */
function selectPlayableAlarm(): HTMLAudioElement {
  const mp3 = new Audio(alarmSoundMp3);
  const webm = new Audio(alarmSoundWebm);

  if (mp3.canPlayType('audio/mpeg')) return mp3;
  else if (webm.canPlayType('audio/webm')) return webm;
  // If neither can play, at least we'll try mp3
  else return mp3;
}
