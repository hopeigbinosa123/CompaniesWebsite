import React from 'react';

const PrivatePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
      
      <p className="text-gray-600 mb-6">
        <strong>Last updated:</strong> October 1, 2025
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">1. Information We Collect</h2>
        
        <h3 className="text-xl font-medium text-gray-600 mb-3">1.1 Personal Information</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Name and contact information (email, phone number)</li>
          <li>Account credentials (username, password)</li>
          <li>Appointment booking details</li>
          <li>Service preferences and history</li>
          <li>Payment information (processed securely through third-party providers)</li>
        </ul>

        <h3 className="text-xl font-medium text-gray-600 mb-3">1.2 Automatically Collected Information</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>IP address and browser information</li>
          <li>Device information and operating system</li>
          <li>Pages visited and time spent on our website</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>To provide and manage our cosmetology services</li>
          <li>To process appointments and bookings</li>
          <li>To communicate with you about your appointments</li>
          <li>To improve our website and services</li>
          <li>To send promotional offers (with your consent)</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">3. Data Sharing and Disclosure</h2>
        <p className="text-gray-600 mb-4">
          We do not sell your personal information. We may share your data only with:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Service providers who assist in operating our website</li>
          <li>Payment processors for transaction handling</li>
          <li>Legal authorities when required by law</li>
          <li>Third parties with your explicit consent</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">4. Data Security</h2>
        <p className="text-gray-600 mb-4">
          We implement appropriate security measures to protect your personal information, including:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>SSL encryption for data transmission</li>
          <li>Secure storage of sensitive information</li>
          <li>Regular security assessments</li>
          <li>Employee training on data protection</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">5. Your Rights</h2>
        <p className="text-gray-600 mb-4">
          You have the right to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
          <li>Export your data in a readable format</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">6. Cookies</h2>
        <p className="text-gray-600 mb-4">
          Our website uses cookies to enhance your browsing experience. You can control cookie preferences through your browser settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">7. Children's Privacy</h2>
        <p className="text-gray-600 mb-4">
          Our services are not intended for individuals under 13 years of age. We do not knowingly collect personal information from children.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">8. Changes to This Policy</h2>
        <p className="text-gray-600 mb-4">
          We may update this privacy policy from time to time. The updated version will be indicated by a revised "Last updated" date.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">9. Contact Us</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions about this privacy policy, please contact us at:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-700"><strong>Email:</strong> privacy@yourcompany.com</p>
          <p className="text-gray-700"><strong>Phone:</strong> (555) 123-4567</p>
          <p className="text-gray-700"><strong>Address:</strong> 123 Beauty Street, City, State 12345</p>
        </div>
      </section>
    </div>
  );
};

export default PrivatePolicy;