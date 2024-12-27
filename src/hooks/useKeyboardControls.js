import { useEffect, useRef } from 'react';
import realtimeToVideotime from '../utils/time';

const useKeyboardControls = (videoRef, setIsPlaying) =>
{
  const activeSpeedKey = useRef(null);
  useEffect(() => {
    const handleKeyDown = (e) =>
    {
      e.preventDefault();

      // 速度控制
      const speedControls = {
        '1': 0.5,
        '2': 2.0,
        '3': 4.0,
        '4': 6.0
      };

      if (speedControls.hasOwnProperty(e.key) && !activeSpeedKey.current)
      {
        activeSpeedKey.current = e.key;
        if (videoRef.current)
        {
          videoRef.current.playbackRate = speedControls[e.key];
          console.log(`Speed set to ${speedControls[e.key]}x`);
        }
      }
      if (e.key === 'Alt') {
        
        if (videoRef.current)
        {
          videoRef.current.play();
          setIsPlaying(true);
        }
      }
      else if (e.key === 'w')
      {
        console.log("add 1s")
        const one_second = realtimeToVideotime(30 * 60, videoRef.current.duration, 1);
        videoRef.current.currentTime += one_second;
      }
      else if (e.key === 'a')
      {
        console.log("sub 10s")
        const ten_second = realtimeToVideotime(30 * 60, videoRef.current.duration, 10);
        videoRef.current.currentTime -= ten_second;
      }
      else if (e.key === 's')
      {
        console.log("sub 1s")
        const one_second = realtimeToVideotime(30 * 60, videoRef.current.duration, 1);
        videoRef.current.currentTime -= one_second;
      }
      else if (e.key === 'd')
      {
        console.log("add 10s")
        const ten_second = realtimeToVideotime(30 * 60, videoRef.current.duration, 10);
        videoRef.current.currentTime += ten_second;
      }
    };

    const handleKeyUp = (e) =>
    {
      e.preventDefault();

      const speedControls = ['1', '2', '3', '4'];
      if (speedControls.includes(e.key) && activeSpeedKey.current === e.key)
      {
        activeSpeedKey.current = null;
        videoRef.current.playbackRate = 1.0;
      }

      if (e.key === 'Alt') {
        
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [videoRef, setIsPlaying]);
};

export default useKeyboardControls;
