export const fetchProgress = async (courseId, userId) => {
  const res = await fetch(`/api/progress?courseId=${courseId}&userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch progress');
  return res.json();
};
