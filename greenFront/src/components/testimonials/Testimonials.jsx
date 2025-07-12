import React, { useState } from "react";
import "./testimonials.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import image1 from "../../assets/user1.jpg"
import image2 from '../../assets/user2.jpg'
import image3 from "../../assets/user3.jpg"
import image4 from "../../assets/user4.jpg"
import image5 from '../../assets/user5.jpg'
import image6 from "../../assets/user6.jpg"

// Import your background image
import bgImage from "../../assets/testimonybg.jpg"; // Replace with your image path

const testimonies = [
  {
    id: 1,
    name: "Daniel Johnson",
    date: "May 5, 2025",
    image: image1,
    text: "I had never felt so welcomed in my life! This ministry helped me find hope again. Glory to God!"
  },
  {
    id: 2,
    name: "Esther Ama",
    date: "May 8, 2025",
    image: image2,
    text: "After hearing the word here, my life turned around. I'm grateful for the fellowship and love I found."
  },
  {
    id: 3,
    name: "Chinedu Paul",
    date: "May 10, 2025",
    image: image3,
    text: "From depression to joy — I found peace and purpose through the Word shared with us!"
  },
    {
    id: 4,
    name: "Mark Vestepen",
    date: "May 15, 2025",
    image: image4,
    text: "I thank God that i found my place to Green cutton praise be to God"
  },
  {
    id: 5,
    name: "Oliver chika",
    date: "July 28, 2025",
    image: image5,
    text: "I am happy for finding the place i am so happy that Green Cutton are located in my area they served me well"
  },
  {
    id: 6,
    name: "Benjamin Abebayo",
    date: "March 14, 2025",
    image: image6,
    text: "From fustration in tailoring service to a persistant customer of Green Cutton !"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonies.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonies.length - 1 : prevIndex - 1
    );
  };

  const { name, date, image, text } = testimonies[currentIndex];

  return (
<section
  className="testimonials-section"
  style={{ backgroundImage: `url(${bgImage})` }} // import your image above
>
  <div className="testimonials-content">
        <h2 className="testimonials-title">Testimonies of Transformation</h2>
        <div className="testimonial-card">
          <img src={image} alt={name} className="testifier-img" />
          <p className="testimonial-text">"{text}"</p>
          <h4 className="testifier-name">{name}</h4>
          <span className="testimonial-date">{date}</span>

          <div className="testimonial-nav">
            <button onClick={handlePrev}><FaArrowLeft /></button>
            <button onClick={handleNext}><FaArrowRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
