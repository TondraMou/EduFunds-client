import { Link } from 'react-router-dom';

const JoinUs = () => {
  return (
    <div className="bg-gradient-to-r from-white to-blue-50 p-8 md:p-16 text-center mb-24 mt-24">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Empower Your Education with EduFunds</h2>
        <p className="text-lg text-gray-700 mb-6">
          Join our scholarship community today! Explore funding opportunities, apply for scholarships, and take a step closer to your dreams.
        </p>
        <Link
          to="/register"
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default JoinUs;