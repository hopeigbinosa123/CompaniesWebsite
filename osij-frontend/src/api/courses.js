export const fetchCourses = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}api/education/courses/`);
  if (!res.ok) throw new Error('Failed to fetch courses');
  return res.json();
};

export const fetchCourseById = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}education/courses/${id}/`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch course with ID ${id}`);
  }

  const data = await response.json();

  // Optional: Normalize or transform data here if needed
  return data;
};
