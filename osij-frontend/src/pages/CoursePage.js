import React from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import CourseDetails from '../components/ittraining/CourseDetails';
import EnrollmentForm from '../components/ittraining/EnrollmentForm';
import ProgressTracker from '../components/ittraining/ProgressTracker';
import VideoPlayer from '../components/ittraining/VideoPlayer';
import CertificateDownloader from '../components/ittraining/CertificateDownloader';

const CoursePage = () => {
  const { id: courseId } = useParams();
  const { id: userId } = useUser() || {};

  return (
    <div className="course-page">
      <CourseDetails courseId={courseId} />
      <EnrollmentForm courseId={courseId} />
      <ProgressTracker courseId={courseId} userId={userId} />
      <VideoPlayer videoId={`vid-${courseId}`} />
      <CertificateDownloader courseId={courseId} userId={userId} />
    </div>
  );
};

export default CoursePage;
