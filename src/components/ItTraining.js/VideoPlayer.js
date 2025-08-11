import React from 'react';
//Video player or live session component for IT training courses
const VideoPlayer = ({ video }) => {
  return (
    <div className="video-player">
      <h3>{video.title}</h3>
      <video controls>
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );


};

export default VideoPlayer;