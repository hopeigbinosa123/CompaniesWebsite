const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p>&copy; 2025 Osij Group. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <a href="/about" className="hover:text-blue-300">About</a>
            <a href="/services" className="hover:text-blue-300">Services</a>
            <a href="/contact" className="hover:text-blue-300">Contact</a>
            <a href="/privacy-policy" className="hover:text-blue-300">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-blue-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;