import { useState, useEffect } from "react";
import Img1 from "../../../src/assets/Img-one.jpg";
import Img2 from "../../../src/assets/Img-two.jpg";
import Img3 from "../../../src/assets/Img-three.jpg";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [Img1, Img2, Img3];
  const texts = [
    { title: "Scholarships for 2025!", description: "Find the best scholarships to fund your studies." },
    { title: "Apply Now and Win a Scholarship!", description: "Apply for your dream scholarship today!" },
    { title: "Exclusive Offers on Scholarships", description: "Get access to exclusive scholarships!" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 3 seconds
    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, [images.length]);

  return (
    <div className="banner">
      <div className="carousel-container">
        <img src={images[currentIndex]} alt={`Offer ${currentIndex + 1}`} className="banner-image" />
        <div className="banner-content">
          <h2 className="text-4xl text-blue-500">{texts[currentIndex].title}</h2>
          <p>{texts[currentIndex].description}</p>
        </div>
      </div>

      {/* Navigation buttons */}
      <button onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)} className="prev-button">
        &#10094;
      </button>
      <button onClick={() => setCurrentIndex((currentIndex + 1) % images.length)} className="next-button">
        &#10095;
      </button>
    </div>
  );
};

export default Banner;