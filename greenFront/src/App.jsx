import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlertBox from './components/common/AlertBox';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AuthStatus from './components/AuthStatus/AuthStatus';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
// import SuitCustomizer from './pages/SuitCustomizer/SuitCustomizer';
// import ReadyToWear from './pages/ReadyToWear/ReadyToWear';
// import ProductDetails from './pages/ProductDetails/ProductDetails';
// import Checkout from './pages/Checkout/Checkout';
import NotFound from './pages/NotFound/NotFound';


function App() {
    const [showAuthStatus, setShowAuthStatus] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' });
      const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), 125000); // auto close after 5s
  };
  return (
  
      <div className="app-container">
        <AlertBox
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: '', message: '' })}
      />
       <Navbar onUserIconClick={() => setShowAuthStatus(prev => !prev)} />
      {showAuthStatus && <AuthStatus onUserIconClick={() => setShowAuthStatus(prev => !prev)} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register showAlert={showAlert} />} />
          
          {/* 🔹 New suit-related routes */}
          {/* <Route path="/customize" element={<SuitCustomizer />} />
          <Route path="/ready-to-wear" element={<ReadyToWear />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} /> */}

          {/* 🔸 Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    
  );
}

export default App;