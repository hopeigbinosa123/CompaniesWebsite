import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorMessage from '../components/shared/ErrorMessage';

// Helper to get YouTube video ID from URL
const getYouTubeID = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const LessonContent = ({ lesson, onMarkComplete, isCompleted }) => {
  if (!lesson) {
    return <div className="text-center text-gray-500">Select a lesson to begin.</div>;
  }

  const videoId = lesson.lesson_type === 'video' && lesson.youtube_url ? getYouTubeID(lesson.youtube_url) : null;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">{lesson.title}</h2>
      
      {lesson.lesson_type === 'video' && videoId && (
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe 
            className="w-full h-full rounded-lg shadow-md"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={lesson.title}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      )}

      {lesson.lesson_type === 'text' && (
        <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: lesson.content }} />
      )}

      <div className="mt-6">
        <button 
          onClick={onMarkComplete}
          disabled={isCompleted}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isCompleted ? '✓ Completed' : 'Mark as Complete'}
        </button>
      </div>
    </div>
  );
};

const CourseLessonsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkEnrollmentAndFetchData = async () => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      setLoading(true);
      try {
        // Check enrollment first
        const enrollmentsRes = await api.get('/education/my-enrollments/');
        const isEnrolled = enrollmentsRes.data.some(enrollment => enrollment.course.toString() === id);

        if (!isEnrolled) {
          setError('You are not enrolled in this course.');
          setLoading(false);
          // Optional: redirect after a delay
          setTimeout(() => navigate(`/education/courses/${id}`), 3000);
          return;
        }

        // Fetch course and lesson data
        const coursePromise = api.get(`/education/courses/${id}/`);
        const lessonsPromise = api.get(`/education/courses/${id}/lessons/`);
        const [courseRes, lessonsRes] = await Promise.all([coursePromise, lessonsPromise]);

        setCourse(courseRes.data);
        setLessons(lessonsRes.data);
        if (lessonsRes.data.length > 0) {
          setSelectedLesson(lessonsRes.data[0]);
        }

      } catch (err) {
        console.error(err);
        setError('Failed to load lesson data.');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      checkEnrollmentAndFetchData();
    }
  }, [id, isAuthenticated, authLoading, navigate]);

  const handleMarkComplete = async () => {
    if (!selectedLesson || selectedLesson.is_completed) return;

    try {
      await api.post(`/education/lessons/${selectedLesson.id}/complete/`);
      // Update the lesson state locally for immediate feedback
      const updatedLessons = lessons.map(l => 
        l.id === selectedLesson.id ? { ...l, is_completed: true } : l
      );
      setLessons(updatedLessons);
      setSelectedLesson(prev => ({ ...prev, is_completed: true }));
    } catch (err) {
      console.error('Failed to mark lesson as complete', err);
      alert('There was an error marking the lesson as complete.');
    }
  };
  
  const selectedLessonIsCompleted = useMemo(() => {
    return lessons.find(l => l.id === selectedLesson?.id)?.is_completed || false;
  }, [lessons, selectedLesson]);

  if (loading || authLoading) return <div className="min-h-screen flex justify-center items-center"><LoadingSpinner /></div>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-lg overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg text-gray-800 truncate">{course?.title}</h2>
        </div>
        <nav>
          <ul>
            {lessons.map(lesson => (
              <li key={lesson.id}>
                <button 
                  onClick={() => setSelectedLesson(lesson)}
                  className={`w-full text-left p-4 text-sm transition-colors flex justify-between items-center ${selectedLesson?.id === lesson.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50'}`}>
                  <span>{lesson.title}</span>
                  {lesson.is_completed && <span className="text-green-500">✓</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <LessonContent 
          lesson={selectedLesson} 
          onMarkComplete={handleMarkComplete} 
          isCompleted={selectedLessonIsCompleted}
        />
      </main>
    </div>
  );
};

export default CourseLessonsPage;