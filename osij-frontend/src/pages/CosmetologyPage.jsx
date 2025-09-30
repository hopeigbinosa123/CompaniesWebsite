import React from 'react';
import ServiceList from './Cosmetology/ServiceList';
import CosmetologyList from './Cosmetology/List';
import CosmetologyBookingForm from './Cosmetology/BookingForm';

export default function CosmetologyPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">Cosmetology</h1>
      <div className="space-y-8">
        <ServiceList />
        <CosmetologyList />
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Book an Appointment</h2>
            <p className="text-lg text-gray-600 mt-2">Fill out the form below to book your appointment.</p>
          </div>
          <CosmetologyBookingForm />
        </div>
      </div>
    </div>
  );
}