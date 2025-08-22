import React, { useEffect, useState } from 'react';
import { fetchVideoById } from '../../api/videos';

const VideoPlayer = ({ videoId }) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVideoById(videoId)
      .then(setVideo)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [videoId]);

  if (loading) return <p>Loading video...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!video || !video.url) return <p>No video available.</p>;

  return (
    <div className="video-player bg-white p-6 rounded shadow">
  <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
  <video controls className="w-full rounded">
    <source src={video.url} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  {video.transcript && (
    <details className="mt-4">
      <summary className="text-sm text-blue-600 cursor-pointer">View Transcript</summary>
      <p className="mt-2 text-sm text-gray-700">{video.transcript}</p>
    </details>
  )}
</div>
  );
};

export default VideoPlayer;