import { Slide } from "react-awesome-reveal";

const Statics = () => {
  return (
    <div className="bg-primary text-white py-8 mt-32 rounded-md">
      <div className="md:max-w-5xl mx-auto px-0">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8 font-cinzel">
        Notable Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <Slide direction="right" duration={2000}>
            <div className="bg-white text-primary p-3 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-lg mt-2">Scholarships Awarded</p>
            </div>
          </Slide>
          {/* Card 2 */}
          <Slide direction="left" duration={2000}>
            <div className="bg-white text-primary p-3 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold">100+</h3>
              <p className="text-lg mt-2">Partner Universities</p>
            </div>
          </Slide>
          {/* Card 3 */}
          <Slide direction="right" duration={2000}>
            <div className="bg-white text-primary p-3 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold">30+</h3>
              <p className="text-lg mt-2">Countries Covered</p>
            </div>
          </Slide>
          {/* Card 4 */}
          <Slide direction="left" duration={2000}>
            <div className="bg-white text-primary p-3 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold">1k+</h3>
              <p className="text-lg mt-2">Students Helped</p>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Statics;