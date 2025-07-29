// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

// Hook to use auth context in components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
  try { 
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true); // ✅ Add this
    } else {
      setIsAuthenticated(false); // ✅ If no user
    }
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
    setIsAuthenticated(false);
  }
  setLoading(false);
}, []);


  // Register function
  const register = async (formData) => {
    try {
      console.log("this is the form data", formData);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL||'http://localhost:3000'}/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newUser = response.data.user;
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      console.log(newUser)
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      const errMsg =
        error.response?.data?.msg || error.message || "Registration failed";
      console.error("Registration error:", errMsg);
      return { success: false, message: errMsg };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setIsAuthenticated(false)
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
  
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        register,
        loading,
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
