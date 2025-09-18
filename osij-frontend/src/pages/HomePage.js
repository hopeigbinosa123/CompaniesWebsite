import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import IT from '../images/it-training.jpg';
import Software from '../images/software.jpg';
import Graphic from '../images/graphic.jpg';
import Cosmetology from '../images/cosmetology.jpg';
import Business from '../images/Business.jpg';

const pageVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative">
        <div
          className="w-full h-96 bg-cover bg-center"
          style={{ backgroundImage: `url(${Business})` }}
        />
        <div className="absolute inset-0 w-full h-96 bg-black opacity-40"></div>
        <div className="container mx-auto text-center absolute top-0 left-0 right-0 h-96 flex flex-col justify-center items-center z-10">
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">Welcome to Osij Group</h1>
          <p className="text-xl mb-8 text-white drop-shadow-lg">Your one-stop platform for premium services</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100" onClick={() => navigate('/services')}>
            Explore Services
          </button>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Service Cards will go here later */}
          <div className="p-6 border rounded-lg text-center">
            <button className="text-xl font-semibold mb-2" onClick={() => navigate('/education')}>
            <img src={IT} alt='IT Training' className='w-full h-32 object-cover mb-4 rounded'/>
            <h3 className="text-xl font-semibold mb-2">IT Training</h3>
            <p>Learn cutting-edge technologies from experts</p>
            </button>
            
          </div>
          <div className="p-6 border rounded-lg text-center">
            <button className="text-xl font-semibold mb-2" onClick={() => navigate('/software-services')}>
            <img src={Software} alt='Software Services' className='w-full h-32 object-cover mb-4 rounded'/>
              <h3 className="text-xl font-semibold mb-2">Software Services</h3>
              <p>Custom software solutions for your business</p>
            </button>
            
          </div>
          <div className="p-6 border rounded-lg text-center">
            <button className="text-xl font-semibold mb-2" onClick={() => navigate('/graphic-design')}>
            <img src={Graphic} alt='Graphic Design' className='w-full h-32 object-cover mb-4 rounded'/>
            <h3 className="text-xl font-semibold mb-2">Graphic Design</h3>
            <p>Professional design services for your brand</p>
            </button>
          </div>
          <div className="p-6 border rounded-lg text-center">
            <button className="text-xl font-semibold mb-2" onClick={() => navigate('/cosmetology')}>
            <img src={Cosmetology} alt='Cosmetology' className='w-full h-32 object-cover mb-4 rounded'/>
              <h3 className="text-xl font-semibold mb-2">Cosmetology</h3>
              <p>Beauty and wellness services by experts</p>
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;