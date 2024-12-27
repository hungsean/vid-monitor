import { useState, useRef } from 'react';
import useKeyboardControls from '../hooks/useKeyboardControls';

const VideoPlayer = () =>
{
  const [videoUrl, setVideoUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  useKeyboardControls(videoRef, setIsPlaying)

  const handleOpenVideo = async () =>
  {
    try
    {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [{
          description: 'Video Files',
          accept: {
            'video/*': ['.mp4']
          }
        }],
        multiple: false
      });

      const file = await fileHandle.getFile();
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    } catch (err)
    {
      if (err.name !== 'AbortError')
      {
        console.error('Error opening file:', err);
      }
    }
  };

  return (
    <div className="video-player">
      <button
        onClick={handleOpenVideo}
        className="open-video-btn"
      >
        Open Video
      </button>

      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          style={{ maxWidth: '100%' }}
        />
      )}
    </div>
  );
};

export default VideoPlayer;