export const fetchCertificate = async (courseId, userId) => {
  const res = await fetch(`/api/certificates?courseId=${courseId}&userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch certificate');
  return res.json();
};