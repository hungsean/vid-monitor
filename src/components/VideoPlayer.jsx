import { useState, useRef } from 'react';
import useKeyboardControls from '../hooks/useKeyboardControls';
import { sortFileByTime } from '../utils/video_processor'

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
      const fileHandle = await window.showOpenFilePicker({
        types: [{
          description: 'Video Files',
          accept: {
            'video/*': ['.mp4']
          }
        }],
        multiple: true
      });
      console.log(fileHandle)
      let sorted_filehandle = sortFileByTime(fileHandle)
      // let merged_url = await mergeVideos(sorted_filehandle)

      const file = await sorted_filehandle[0].getFile();
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