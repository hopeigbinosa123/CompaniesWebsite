import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Components
import CourseCard from './components/ItTraining.js/CourseCard';
import CourseDetails from './components/ItTraining.js/CourseDetails';
import EnrollmentForm from './components/ItTraining.js/EnrollmentForm';
import ProgressTracker from './components/ItTraining.js/ProgressTraining';
import VideoPlayer from './components/ItTraining.js/VideoPlayer';
import CourseList from './components/ItTraining.js/CourseList';

function App() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}education/courses/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header bg-gray-100 p-4">
          <nav className="flex gap-4">
            <Link to="/" className="text-blue-600 hover:underline">Courses</Link>
            <Link to="/enroll" className="text-blue-600 hover:underline">Enroll</Link>
            <Link to="/progress" className="text-blue-600 hover:underline">Progress</Link>
            <Link to="/video/1" className="text-blue-600 hover:underline">Video</Link>
          </nav>
        </header>

        <main className="p-6">
          {loading && <p>Loading courses...</p>}
          {error && <p>Error: {error.message}</p>}

          <Routes>
            <Route path="/" element={<CourseList courses={courses} />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/enroll" element={<EnrollmentForm />} />
            <Route path="/progress" element={<ProgressTracker />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;