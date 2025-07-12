import { useState, useEffect } from "react"; 
import "./navbar.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"; // ✅ Icons for user & cart

const Navbar = ({ onUserIconClick, cartItemCount = 0 }) => {
  const [isFixed, setIsFixed] = useState(false);
  const { isAuthenticated, user, setIsAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
   const [countryCode, setCountryCode] = useState("");
  const countryDialCodes = {
  ng: "+234",
  us: "+1",
  gb: "+44",
  ke: "+254",
  in: "+91",
  // Add more as needed
};

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsFixed(scrollTop > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  const fetchCountry = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      setCountryCode(data.country_code?.toLowerCase()); // 'ng', 'us', etc.
    } catch (error) {
      console.error("Failed to fetch location", error);
    }
  };

  fetchCountry();
}, []);


  const handleUserIconClick = () => {
    if (isAuthenticated) {
      onUserIconClick();
    } else {
      navigate("/login");
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <nav className={`navbar ${isFixed ? "fixed" : ""}`}>
      <div className="navbar-logo" onClick={() => navigate("/")}>
        Suitify
      </div>

      <button className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <i class="fa-solid fa-bars-staggered"></i>
      </button>

      <ul className={`navbar-links ${isMenuOpen ? "show" : "hide"}`}>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/customizer")}>Customize</li>
        <li onClick={() => navigate("/shop")}>Shop</li>
        <li onClick={() => navigate("/about")}>About</li>
        <li onClick={() => navigate("/about")}>About</li>
      </ul>

<div className="navbar-user-wrapper">
  {isAuthenticated && user?.isVerified ? (
    <>
      <div className="navbar-user" onClick={handleUserIconClick} title={user?.name}>
        {user?.profile ? (
          <img src={user.profile} alt="User" className="user-icon" />
        ) : (
          <div className="user-initials">{getInitials(user?.name)}</div>
        )}
        <span className="user-name">{user?.name}</span>
      </div>

      <div className="navbar-cart" onClick={() => navigate("/cart")}>
        <FaShoppingCart className="cart-icon" />
        {cartItemCount > 0 && (
          <span className="cart-count">{cartItemCount}</span>
        )}
      </div>

      {countryCode && (
        <img
          src={`https://flagcdn.com/24x18/${countryCode}.png`}
          alt="Country flag"
          className="country-flag"
          title={countryCode.toUpperCase()}
        />
      )}
    </>
  ) : (
    <>
      <button className="btn" onClick={()=>navigate("/login")}>Login</button>
      <button className="btn" onClick={(e) => {
        e.stopPropagation();
        handleSignupClick();
      }}>SignUp</button>

      {countryCode && (
        <img
          src={`https://flagcdn.com/24x18/${countryCode}.png`}
          alt="Country flag"
          className="country-flag"
          title={countryCode.toUpperCase()}
        />
      )}
    </>
  )}
</div>
    </nav>
  );
};

export default Navbar;