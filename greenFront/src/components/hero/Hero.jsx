import React, { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Hero.css";
import heroVideo from "../../assets/suit.mp4";
import fallback from "../../assets/suit1.jpg";
import slideSound from "../../assets/hero-slide.wav";

const heroSlides = [
  {
    tag: "Premium Deals Everyday",
    title: "Your One Stop Tech & Gadget Shop",
    subtitle:
      "Explore amazing deals and new arrivals in tech, fashion, accessories, and more.",
    highlights: [
      "✔ 100% Secure Shopping",
      "✔ Free Delivery on Orders Over ₦10,000",
      "✔ 24/7 Customer Support",
    ],
    animation: "fade-in-up",
  },
  {
    tag: "Customize Your Style",
    title: "Tailored Clothing for Every Occasion",
    subtitle:
      "Design your suit, choose fabrics, and see it come to life in real-time.",
    highlights: [
      "✔ Custom Suit Builder",
      "✔ Instant Fabric Previews",
      "✔ Delivered to Your Doorstep",
    ],
    animation: "slide-in-left",
  },
  {
    tag: "New Arrivals Weekly",
    title: "Stay Ahead with the Latest Trends",
    subtitle:
      "Never miss a drop—shop trending gadgets, fashion, and accessories every week.",
    highlights: [
      "✔ Fresh Stock Every Monday",
      "✔ Verified Quality Brands",
      "✔ Fast & Reliable Delivery",
    ],
    animation: "zoom-in",
  },
];

const Hero = ({ error }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);
  const currentSlide = heroSlides[currentIndex];

  // 🔁 Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval); // cleanup on unmount
  }, [currentIndex]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    playSound();
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % heroSlides.length;
    setCurrentIndex(nextIndex);
    playSound();
  };

  const prevSlide = () => {
    const prevIndex =
      currentIndex === 0 ? heroSlides.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    playSound();
  };

  if (error) {
    return (
      <div className="hero-error">
        <h2>Oops! Something went wrong.</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="hero-section">
      <audio ref={audioRef} src={slideSound} preload="auto" />

      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster={fallback}
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
             {/* Navigation Arrows */}
      <div className="hero-nav">
  <button className="hero-icon-left  icon" onClick={prevSlide}>
    <FaChevronLeft />
  </button>
  <button className="hero-icon-right icon" onClick={nextSlide}>
    <FaChevronRight />
  </button>
</div>
      <div className="hero-overlay"></div>
 

      <div className={`hero-content ${currentSlide.animation}`}>
        <span className="hero-tag">{currentSlide.tag}</span>
        <h1 className="hero-title">{currentSlide.title}</h1>
        <p className="hero-subtitle">{currentSlide.subtitle}</p>

        <div className="hero-buttons">
          <a href="#shop" className="btn">
            Start Shopping
          </a>
          <a href="#deals" className="btn-secondary">
            View Deals
          </a>
        </div>

        <div className="hero-highlights">
          {currentSlide.highlights.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>



        {/* Dots Navigation */}
        <div className="hero-dots">
          {heroSlides.map((_, index) => (
            <span
              key={index}
              onClick={() => goToSlide(index)}
              className={`dot ${index === currentIndex ? "active" : ""}`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;