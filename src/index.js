import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CourseCard from './components/ItTraining.js/CourseCard';
import CourseDetails from './components/ItTraining.js/Course.Details';
import EnrollmentForm from './components/ItTraining.js/EnrollmentForm';
import ProgressTracker from './components/ItTraining.js/ProgressTraining';
import VideoPlayer from './components/ItTraining.js/VideoPlayer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CourseCard/>
    <CourseDetails/>
    <EnrollmentForm/>
    <ProgressTracker/>
    <VideoPlayer/>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
