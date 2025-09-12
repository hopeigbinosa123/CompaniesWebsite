import React from 'react';
import SoftwareServicesForm from '../components/contact/SoftwareServicesForm';

const RequestServicePage = () => {
  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Request Software Services</h1>
            <p className="text-lg text-gray-600">
              Fill out the form below to submit your software service request. We'll get back to you within 24 hours.
            </p>
          </div>
          <SoftwareServicesForm />
        </div>
      </div>
    </div>
  );
};

export default RequestServicePage;
