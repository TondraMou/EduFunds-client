import { Slide } from "react-awesome-reveal";

const Statics = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute w-96 h-96 opacity-20 top-10 left-10 z-0"></div>
      <div className="absolute w-72 h-72 opacity-20 bottom-10 right-10 z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        <h2 className="text-center text-3xl md:text-5xl font-extrabold font-cinzel mb-12 leading-tight">
          Notable Achievements
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         
          <Slide direction="right" duration={1200} triggerOnce>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300 rounded-xl text-center p-6 shadow-lg">
              <h3 className="text-4xl font-extrabold">500+</h3>
              <p className="text-lg mt-2">Scholarships Awarded</p>
            </div>
          </Slide>

          
          <Slide direction="left" duration={1200} triggerOnce>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300 rounded-xl text-center p-6 shadow-lg">
              <h3 className="text-4xl font-extrabold ">100+</h3>
              <p className="text-lg mt-2 ">Partner Universities</p>
            </div>
          </Slide>

         
          <Slide direction="right" duration={1200} triggerOnce>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300 rounded-xl text-center p-6 shadow-lg">
              <h3 className="text-4xl font-extrabold ">30+</h3>
              <p className="text-lg mt-2 ">Countries Covered</p>
            </div>
          </Slide>

        
          <Slide direction="left" duration={1200} triggerOnce>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300 rounded-xl text-center p-6 shadow-lg">
              <h3 className="text-4xl font-extrabold ">1k+</h3>
              <p className="text-lg mt-2 ">Students Helped</p>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Statics;