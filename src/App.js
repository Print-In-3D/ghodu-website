import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import SubProductDetails from './components/SubProductDetails';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import AboutUs from './components/AboutUs';
import TermsAndConditions from './components/TermsAndConditions';
import ReturnPolicy from './components/ReturnPolicy';
import FAQ from './components/FAQ';
import SearchPage from './components/SearchPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import './index.css';

import SupportWidget from './components/SupportWidget';

function App() {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    return (
        <Router>
            <ScrollToTop />
            <CartProvider>
                <div className="App">
                    <Navbar />
                    <Cart setIsCheckoutOpen={setIsCheckoutOpen} />
                    <CheckoutModal 
                        isOpen={isCheckoutOpen} 
                        onClose={() => setIsCheckoutOpen(false)} 
                    />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/product/:topicId" element={<ProductDetails />} />
                        <Route path="/product/:topicId/:productId" element={<SubProductDetails />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/terms" element={<TermsAndConditions />} />
                        <Route path="/return-policy" element={<ReturnPolicy />} />
                        <Route path="/faq" element={<FAQ standalone={true} />} />
                        <Route path="/search" element={<SearchPage />} />
                    </Routes>

                    <Footer />

                    <SupportWidget />
                </div>
            </CartProvider>
        </Router>
    );
}

export default App;
