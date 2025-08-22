import React, { useEffect, useState } from 'react';
import { fetchCertificate } from '../../api/certificates';

const CertificateDownloader = ({ courseId, userId }) => {
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificate(courseId, userId)
      .then(setCertificate)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [courseId, userId]);

  const downloadCertificate = () => {
    if (certificate?.url) {
      window.open(certificate.url, '_blank');
    }
  };

  if (loading) return <p>Loading certificate...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!certificate) return <p>No certificate available.</p>;

  return (
    <div className="certificate-downloader bg-white p-6 rounded shadow text-center">
  <h3 className="text-xl font-semibold">🎓 {certificate.course.title}</h3>
  <p className="text-sm text-gray-600 mt-1">Completion Date: {certificate.completionDate}</p>
  <button onClick={downloadCertificate}
    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
    Download Certificate
  </button>
</div>
  );
};

export default CertificateDownloader;