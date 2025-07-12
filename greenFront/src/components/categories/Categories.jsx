import React from "react";
import "./categories.css";
import image1 from "../../assets/polo.jpg";
import image2 from "../../assets/suit1.jpg";
import image3 from "../../assets/agbada.jpg";

const categories = [
  {
    title: "Agbada",
    desc: "Elegant traditional wear for kings and special events.",
    btn: "Shop Agbada",
    image: image3,
  },
  {
    title: "Suit",
    desc: "Tailored suits to elevate your style and confidence.",
    btn: "Shop Suits",
    image: image2,
  },
  {
    title: "Polo",
    desc: "Classic and casual polos for everyday elegance.",
    btn: "Shop Polos",
    image: image1,
  },
];

const Categories = () => {
  return (
    <section className="categories-section ">
      <div className="title">
        <h2>Popular Categories</h2>
        <p>Find the right service just for you</p>
      </div>
      <div className="categories-grid container">
        {categories.map((item, index) => (
          <div
            key={index}
            className="category-card"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="overlay">
              <span style={{ transitionDelay: "0.2s" }}></span>
              <span style={{ transitionDelay: "0.4s" }}></span>
              <span style={{ transitionDelay: "0.6s" }}></span>
            </div>
            <div className="category-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <button className="btn">{item.btn}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
