export const enrollInCourse = async ({ courseId, userId }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}education/enrollments/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ course: courseId, user: userId }),
    }
  );

  if (!response.ok) {
    throw new Error('Enrollment failed');
  }

  return await response.json();
};
