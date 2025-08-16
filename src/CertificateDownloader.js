import React from 'react';

const CertificateDownloader = ({ certificate }) => {
  const downloadCertificate = () => {
    // this implements the logic to download the certificate of the student
    window.open(certificate.url, '_blank');
  };

  return (
    <div className="certificate-downloader">
      <h3>{certificate.course.title}</h3>
      <p>Completion Date: {certificate.completionDate}</p>
      <button onClick={downloadCertificate}>Download Certificate</button>
    </div>
  );
};

export default CertificateDownloader;