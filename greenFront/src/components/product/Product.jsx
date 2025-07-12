import React from "react";
import "./product.css";
import { FaHeart, FaEye, FaShoppingCart } from "react-icons/fa";

// Import your 16 images
import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";
import product4 from "../../assets/product4.jpg";
import product5 from "../../assets/product5.jpg";
import product6 from "../../assets/product6.jpg";
import product7 from "../../assets/product7.jpg";
import product8 from "../../assets/product8.jpg";
import product9 from "../../assets/product9.jpg";
import product10 from "../../assets/product10.jpg";
import product11 from "../../assets/product11.jpg";
import product12 from "../../assets/product12.jpg";
import product13 from "../../assets/product13.jpg";
import product14 from "../../assets/product14.jpg";
import product15 from "../../assets/product15.jpg";
import product16 from "../../assets/product16.jpg";

const products = [
  { id: 1, title: "Agbada Supreme", price: "$120", discount: "$160", image: product1 },
  { id: 2, title: "Royal Suit", price: "$110", discount: "$150", image: product2 },
  { id: 3, title: "Modern Polo", price: "$50", discount: "$70", image: product3 },
  { id: 4, title: "Casual Fit", price: "$60", discount: "$90", image: product4 },
  { id: 5, title: "Senator Classic", price: "$140", discount: "$180", image: product5 },
  { id: 6, title: "Luxury Blazer", price: "$130", discount: "$170", image: product6 },
  { id: 7, title: "Urban Polo", price: "$45", discount: "$60", image: product7 },
  { id: 8, title: "Office Suit", price: "$100", discount: "$130", image: product8 },
  { id: 9, title: "Evening Agbada", price: "$150", discount: "$190", image: product9 },
  { id: 10, title: "Smart Polo", price: "$55", discount: "$75", image: product10 },
  { id: 11, title: "Formal Suit", price: "$120", discount: "$160", image: product11 },
  { id: 12, title: "Traditional Agbada", price: "$130", discount: "$170", image: product12 },
  { id: 13, title: "Bold Polo", price: "$48", discount: "$65", image: product13 },
  { id: 14, title: "Dapper Suit", price: "$115", discount: "$150", image: product14 },
  { id: 15, title: "Cultural Agbada", price: "$135", discount: "$175", image: product15 },
  { id: 16, title: "Street Polo", price: "$52", discount: "$68", image: product16 }
];

const Products = () => {
  return (
    <section className="products-section">
      <div className="title">
        <h2>Featured Products</h2>
        <p>Discover styles that match your vibe</p>
      </div>
      <div className="product-grid container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}>
              <div className="hover-icons">
                <button className="view-btn"><FaEye /></button>
                <div className="like-icon"><FaHeart /></div>
                <div className="cart-icon"><FaShoppingCart /></div>
              </div>
              <div className="discount-tag">-{(
                ((parseFloat(product.discount.replace("$", "")) - parseFloat(product.price.replace("$", ""))) /
                  parseFloat(product.discount.replace("$", ""))) *
                100
              ).toFixed(0)}%</div>
            </div>
            <div className="product-info">
              <h3>{product.title}</h3>
              <p className="price">
                <span className="current">{product.price}</span>
                <span className="old">{product.discount}</span>
              </p>
              <button className="btn">
                <FaShoppingCart style={{ marginRight: "8px" }} /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
