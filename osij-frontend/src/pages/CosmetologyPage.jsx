import React from 'react';

import { Link } from 'react-router-dom';

import ServiceList from './Cosmetology/ServiceList';
import CosmetologyList from './Cosmetology/List';
import CosmetologyBookingForm from './Cosmetology/BookingForm';


export default function CosmetologyPage() {
  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold text-pink-700">Cosmetology Services</h1>
      <p className="mt-4 text-gray-600">
        This page will highlight our beauty and wellness services, including booking options.
      </p>

      <Link
        to="/cosmetology/book"
        className="inline-block mt-6 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
      >
        Book Now
      </Link>

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