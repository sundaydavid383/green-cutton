// Register.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext'; // ✅ AuthContext hook for registration logic
import './register.css';

const Register = ({ showAlert }) => {
  const { register } = useAuth(); // ✅ pull the register function from context
  const containerRef = useRef(null); // reference for visibility animation
  const [isVisible, setIsVisible] = useState(false); // controls entry animation visibility

  // 👁️ Intersection Observer for entrance animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Country list and codes
  const countries = [
    { name: "Nigeria", code: "+234", flag: "🇳🇬" },
    { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
    { name: "Ghana", code: "+233", flag: "🇬🇭" },
    { name: "Kenya", code: "+254", flag: "🇰🇪" },
  ];

  const countryDialCodes = {
  ng: "+234", // Nigeria
  us: "+1",   // United States
  gb: "+44",  // United Kingdom
  ke: "+254", // Kenya
  in: "+91",  // India
  gh: "+233", // Ghana
  za: "+27",  // South Africa
  eg: "+20",  // Egypt
  cm: "+237", // Cameroon
  tz: "+255", // Tanzania
  ug: "+256", // Uganda
  rw: "+250", // Rwanda
  sn: "+221", // Senegal
  dz: "+213", // Algeria
  ma: "+212", // Morocco
  ao: "+244", // Angola
  cd: "+243", // DR Congo
  et: "+251", // Ethiopia
  ci: "+225", // Ivory Coast
  bd: "+880", // Bangladesh
  pk: "+92",  // Pakistan
  ph: "+63",  // Philippines
  id: "+62",  // Indonesia
  cn: "+86",  // China
  de: "+49",  // Germany
  fr: "+33",  // France
  it: "+39",  // Italy
  es: "+34",  // Spain
  ca: "+1",   // Canada (same as US)
  au: "+61",  // Australia
  br: "+55",  // Brazil
  mx: "+52",  // Mexico
  sa: "+966", // Saudi Arabia
  ae: "+971", // UAE
  tr: "+90",  // Turkey
  ru: "+7",   // Russia
  jp: "+81",  // Japan
  kr: "+82",  // South Korea
};

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'Nigeria',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("");

  // 🌍 Automatically fetch user country for phone prefix
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const code = data.country_code?.toLowerCase();
        setCountryCode(code);
        setFormData({ ...formData, phone: countryDialCodes[code] || "+1" });
      } catch (error) {
        console.error("Failed to fetch location", error);
        setFormData({ ...formData, phone: "+1" });
      }
    };

    fetchCountry();
  }, []);

  // Handle country dropdown change
  const handleCountryChange = (e) => {
    const selectedCountry = countries.find(c => c.name === e.target.value);
    setFormData({ ...formData, country: selectedCountry.name, phone: selectedCountry.code });
  };

  // 🛡️ Validate form input fields
  const validateInputs = () => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+[1-9]\d{8,14}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).{12,}$/;

    if (!formData.name.trim() || !nameRegex.test(formData.name)) {
      return 'Name is required and must only contain letters (2–50 characters).';
    }

    if (!emailRegex.test(formData.email)) {
      return 'Invalid email format.';
    }

    if (!passwordRegex.test(formData.password)) {
      return 'Password must be at least 12 characters and include upper & lowercase letters, numbers, and symbols.';
    }

    if (!phoneRegex.test(formData.phone)) {
      return 'Phone number must be in international format (e.g., +2348012345678) with 9 to 15 digits and no spaces.';
    }

    if (!formData.country.trim()) {
      return 'Country is required.';
    }

    return null;
  };

// 🔁 Input change handler
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: name === "phone" ? `${formData[name] || ""}${value}` : value,
  });
};

  // 🚀 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const validationError = validateInputs();
    if (validationError) {
      showAlert('error', validationError);
      return;
    }

    setLoading(true);

    // 🧼 Sanitize user inputs
    const sanitize = (value) => {
      const div = document.createElement("div");
      div.textContent = value;
      return div.innerHTML.trim();
    };

    // Payload to be sent
    const payload = {
      name: sanitize(formData.name.trim()),
      email: sanitize(formData.email.trim().toLowerCase()),
      password: sanitize(formData.password),
      phone: sanitize(formData.phone),
      address: {
        street: sanitize(formData.street.trim()),
        city: sanitize(formData.city.trim()),
        state: sanitize(formData.state.trim()),
        zip: sanitize(formData.zip.trim()),
        country: sanitize(formData.country.trim()),
      },
    };
    
    const res = await register(payload);
    setLoading(false);

    if (res.success) {
      showAlert('success', 'Registration successful!');
      // Reset form
      setFormData({
        name: '', email: '', password: '', phone: '',
        street: '', city: '', state: '', zip: '', country: 'Nigeria',
      });
    } else {
      showAlert('error', res.message);
    }
  };

  // 🌀 Loading spinner UI
  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="dot-loader">
          <span></span><span></span><span></span>
        </div>
        <p className="loading-text">Registering your account...</p>
      </div>
    );
  }

  // 📦 Form UI
  return (
    <div className={`register-container ${isVisible ? 'visible' : ''}`} ref={containerRef}>
      <h2>Create an Account</h2>

      {/* Success/Error Messages */}
      {message && (
        <div className="alert success-alert">
          <strong>Success:</strong> {message}
        </div>
      )}
      {error && (
        <div className="alert error-alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="register-form" noValidate>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

        {/* Toggleable password input */}
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <small onClick={() => setShowPassword(!showPassword)} className="toggle-password">
            {showPassword ? 'Hide' : 'Show'}
          </small>
        </div>

        {/* Country select dropdown */}
        <label>
          <select value={formData.country} onChange={handleCountryChange} className="country-select">
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.flag} {country.name} ({country.code})
              </option>
            ))}
          </select>
        </label>

        <input
          type="tel"
          name="phone"
          placeholder="Enter full number e.g. +2348012345678"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        {/* Address Fields */}
        <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
        <input type="text" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} />

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
