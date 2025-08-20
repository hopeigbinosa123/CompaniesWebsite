export const fetchVideoById = async (videoId) => {
  const res = await fetch(`/api/videos/${videoId}`);
  if (!res.ok) throw new Error('Failed to fetch video');
  return res.json();
};
