import about from "../../assets/about.jpg";
import { Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:max-w-6xl mx-auto my-16 px-4 mt-32">
    
      <div className="w-full md:w-1/2 flex justify-center">
        <Slide direction="left" triggerOnce={true} duration={2000}>
          <img
            src={about}
            alt="About EduFunds"
            className="rounded-full shadow-md object-cover"
          />
        </Slide>
      </div>

     
      <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-8">
        <Slide direction="right" triggerOnce={true} duration={2000}>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-cinzel">
            Who We Are
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            At <strong>EduFunds</strong>, we believe in breaking financial barriers 
            to education. Since 2024, we've been dedicated to connecting students 
            with scholarships that turn aspirations into achievements.
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Our mission is to make scholarship applications effortless, providing 
            students with personalized opportunities to fund their academic journeys. 
            No matter where you're from, education should be within reach.
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            With <strong>EduFunds</strong>, you're not just searching for scholarships—
            you're unlocking your potential and paving the way for a brighter future.
          </p>
          <Link to="/about">
            <button className="px-6 py-2 bg-primary text-white font-bold rounded-md hover:rounded-2xl transition-all duration-300">
              Learn More
            </button>
          </Link>
        </Slide>
      </div>
    </div>
  );
};

export default About;