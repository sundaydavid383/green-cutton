// ✅ Enhanced Footer.jsx with Animation on View
import React, { useEffect, useRef, useState } from "react";
import "./footer.css";

const Footer = () => {
  const footerRef = useRef(null);
  const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // only run once
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubscribe = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
    const res = await axios.post("http://localhost:4000/api/subscribe", { email });
    setMessage(res.data.message || "Subscribed successfully!");
    setEmail("");
  } catch (err) {
    setMessage(err.response?.data?.message || "Something went wrong.");
  }
};

  return (
    <footer
      ref={footerRef}
      className={`footer ${isVisible ? "footer-visible" : ""}`}
    >
      <div className="footer-top">
<div className="footer-section logo-section">
  <h2 className="footer-logo">Green Cutton</h2>
  <p>
    Fashion isn't just clothing — it's your statement. At Green Cutton, customize premium outfits that reflect your story and style.
  </p>

<form onSubmit={handleSubscribe} className="subscribe-form">
  <input
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <button className="btn" type="submit">Subscribe</button>
</form>

{message && (
  <p className={`subscribe-message ${messageType === "error" ? "error" : ""}`}>
    {message}
  </p>
)}
</div>

        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/press">Press</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/track-order">Track Order</a></li>
          </ul>
        </div>
<div className="footer-section contact-section">
  <h3>Contact Us</h3>
  <ul className="contact-list">
    <li>
      <a href="tel:+2349032197266">
        <i className="fas fa-phone"></i> +234 903 219 7266
      </a>
    </li>
    <li>
      <a href="https://wa.me/2349032197266" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i> Chat on WhatsApp
      </a>
    </li>
    <li>
      <a href="mailto:sundayudoh383@gmail.com">
        <i className="fas fa-envelope"></i> sundayudoh383@gmail.com
      </a>
    </li>
    <li>
      <a href="https://www.google.com/maps?q=RCCG+Newspring,+Ajah+Lagos" target="_blank" rel="noopener noreferrer">
        <i className="fas fa-map-marker-alt"></i> RCCG Newspring, Ajah, Lagos
      </a>
    </li>
  </ul>
</div>

      </div>

     
<div className="footer-bottom">
  <p>&copy; 2025 Green Cutton. All rights reserved.</p>
 <div className="social-icons">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-facebook-f"></i>
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-instagram"></i>
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-twitter"></i>
  </a>
  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-linkedin-in"></i>
  </a>
</div>
</div>
    </footer>
  );
};

export default Footer;
