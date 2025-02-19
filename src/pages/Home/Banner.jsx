import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 to-purple-900 overflow-hidden">
      
      {/* Background Animated Waves */}
      <div className="absolute inset-0">
        <img 
          src="/wave.svg" 
          alt="wave" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Floating Glow Effects */}
      <div className="absolute w-64 h-64 bg-blue-400 opacity-40 rounded-full blur-3xl top-10 left-20 animate-pulse"></div>
      <div className="absolute w-48 h-48 bg-purple-500 opacity-40 rounded-full blur-3xl bottom-10 right-20 animate-bounce"></div>


      {/* Main Content Card */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-3xl p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 transform hover:scale-105 transition duration-500"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
          Your Future Starts Here!
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-4 mb-6 drop-shadow-md">
          Explore thousands of scholarships and fund your dreams.
        </p>

        {/* Button with Glow Effect */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link 
            to="/all-scholarship"
            className="relative inline-block bg-gradient-to-r from-white to-gray-500 text-blue-900 font-semibold py-4 px-12 rounded-full shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-110"
          >
            <span className="absolute inset-0 bg-white opacity-20 rounded-full blur-xl"></span>
            <span className="relative font-bold">Find Scholarships</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;