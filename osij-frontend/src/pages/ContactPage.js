import { useState } from 'react';
import GeneralContactForm from '../components/contact/GenralContactForm';
import SoftwareServicesForm from '../components/contact/SoftwareServicesForm';
import GraphicDesignForm from '../components/contact/GraphicDesignForm';
import CosmetologyBookingForm from '../components/contact/CosmetologyBookingForm';

const ContactPage = () => {
  const [activeForm, setActiveForm] = useState('general');

  const formTypes = [
    { id: 'general', label: 'General Inquiry', component: GeneralContactForm },
    { id: 'software', label: 'Software Services', component: SoftwareServicesForm },
    { id: 'design', label: 'Graphic Design', component: GraphicDesignForm },
    { id: 'cosmetology', label: 'Book Appointment', component: CosmetologyBookingForm },
  ];

  const ActiveFormComponent = formTypes.find(form => form.id === activeForm)?.component;

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        
        {/* Form Type Selector */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">What would you like to discuss?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {formTypes.map((form) => (
                <button
                  key={form.id}
                  onClick={() => setActiveForm(form.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeForm === form.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {form.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            {ActiveFormComponent && <ActiveFormComponent />}
          </div>
        </div>

        {/* Contact Information */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                📧
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@osijgroup.com</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                📞
              </div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                🏢
              </div>
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-gray-600">123 Business Ave, City, State 12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;