import { Slide } from "react-awesome-reveal";

const Statics = () => {
  return (
    <div className="relative mt-24 py-16 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-800 text-white overflow-hidden rounded-2xl shadow-xl">
      <div className="absolute w-96 h-96 bg-purple-400 opacity-20 blur-3xl top-10 left-10 z-0"></div>
      <div className="absolute w-72 h-72 bg-blue-500 opacity-20 blur-3xl bottom-10 right-10 z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <h2 className="text-center text-3xl md:text-5xl font-extrabold font-cinzel mb-12 leading-tight">
          Notable Achievements
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         
          <Slide direction="right" duration={1200} triggerOnce>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300 rounded-xl text-center p-6 shadow-lg">
              <h3 className="text-4xl font-extrabold text-white">500+</h3>
              <p className="text-lg mt-2 text-gray-200">Scholarships Awarded</p>
            </div>
          </Slide>

          
          <Slide direction="left" duration={1200} triggerOnce>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300 rounded-xl text-center p-6 shadow-lg">
              <h3 className="text-4xl font-extrabold text-white">100+</h3>
              <p className="text-lg mt-2 text-gray-200">Partner Universities</p>
            </div>
          </Slide>

         
          <Slide direction="right" duration={1200} triggerOnce>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300 rounded-xl text-center p-6 shadow-lg">
              <h3 className="text-4xl font-extrabold text-white">30+</h3>
              <p className="text-lg mt-2 text-gray-200">Countries Covered</p>
            </div>
          </Slide>

        
          <Slide direction="left" duration={1200} triggerOnce>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300 rounded-xl text-center p-6 shadow-lg">
              <h3 className="text-4xl font-extrabold text-white">1k+</h3>
              <p className="text-lg mt-2 text-gray-200">Students Helped</p>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Statics;