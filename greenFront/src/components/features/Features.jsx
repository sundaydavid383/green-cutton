import React,{useEffect} from "react";
import "./features.css";
import { FaRocket, FaShieldAlt, FaHeart, FaCogs } from "react-icons/fa"; // You can use any icon library

const features = [
  {
    icon: <FaRocket />,
    title: "Fast Performance",
    text: "Seamless and quick across all devices.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Top Security",
    text: "We protect your data with latest standards.",
  },
  {
    icon: <FaHeart />,
    title: "User Friendly",
    text: "Designed to make users feel at home.",
  },
  {
    icon: <FaCogs />,
    title: "Fully Customizable",
    text: "Easily adjust to meet your specific needs.",
  },
];

const Features = () => {
    // Use this in useEffect inside features.jsx
useEffect(() => {
  const cards = document.querySelectorAll(".feature-card");
  window.addEventListener("scroll", () => {
    cards.forEach((card, index) => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < window.innerHeight - 100) {
        card.style.setProperty('--i', index); // controls delay
        card.classList.add("animated");
      }
    });
  });
}, []);
    return (
    <section className="features-section container"  id="features">
      <h2 className="features-title">Core Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index} style={{ "--i": index }}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-text">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;