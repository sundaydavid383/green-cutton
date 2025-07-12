import React from "react";
import { useNavigate } from "react-router-dom";
import Hero from '../../components/hero/Hero';
import Categories from "../../components/categories/Categories";
import "./home.css";
import Products from "../../components/product/Product";
import Features from "../../components/features/Features";
import Testimonials from "../../components/testimonials/Testimonials";
   
// Web structure that we are following https://getmasum.com/html-preview/rapidshop/?storefront=envato-elements#
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Hero/>
      <Categories />
      <Products/>
      <Testimonials/>
      <Features/>
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Suitify</h1>
        <p>Your one-stop destination for premium custom and ready-to-wear suits.</p>
        <div className="hero-buttons">
          <button onClick={() => navigate("/customizer")}>Customize Your Suit</button>
          <button onClick={() => navigate("/shop")}>Explore Ready-to-Wear</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Suitify?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <img src="/fabric-icon.png" alt="Fabric" />
            <h3>Premium Fabrics</h3>
            <p>We offer high-quality, durable, and elegant fabrics for every season.</p>
          </div>
          <div className="feature-card">
            <img src="/custom-icon.png" alt="Customize" />
            <h3>Full Customization</h3>
            <p>Design your suit — lapels, buttons, linings, and more — your style, your way.</p>
          </div>
          <div className="feature-card">
            <img src="/delivery-icon.png" alt="Fast Delivery" />
            <h3>Nationwide Delivery</h3>
            <p>Enjoy quick delivery across Nigeria and beyond. Your suit, delivered with care.</p>
          </div>
        </div>
      </section>

      {/* Testimonials or Highlight Section */}
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <blockquote>
          “I never thought designing a suit could be this easy. Suitify changed my look and confidence.”
        </blockquote>
        <p>– Emmanuel, Lagos</p>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to Look Your Best?</h2>
        <button onClick={() => navigate("/signup")}>Get Started</button>
      </section>
    </div>
  );
};

export default Home;