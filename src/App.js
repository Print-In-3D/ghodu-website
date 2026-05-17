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
import AdminLayout from './components/Admin/AdminLayout';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminTopics from './components/Admin/AdminTopics';
import AdminProducts from './components/Admin/AdminProducts';
import { useLocation } from 'react-router-dom';

function AppContent({ isCheckoutOpen, setIsCheckoutOpen }) {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');

    return (
        <div className="App">
            {!isAdmin && <Navbar />}
            {!isAdmin && <Cart setIsCheckoutOpen={setIsCheckoutOpen} />}
            <CheckoutModal 
                isOpen={isCheckoutOpen} 
                onClose={() => setIsCheckoutOpen(false)} 
            />
            <Routes>
                {/* Customer-facing Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/product/:topicId" element={<ProductDetails />} />
                <Route path="/product/:topicId/:productId" element={<SubProductDetails />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/return-policy" element={<ReturnPolicy />} />
                <Route path="/faq" element={<FAQ standalone={true} />} />
                <Route path="/search" element={<SearchPage />} />

                {/* Velzon-themed Admin Control Studio Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="categories" element={<AdminTopics />} />
                    <Route path="products" element={<AdminProducts />} />
                </Route>
            </Routes>

            {!isAdmin && <Footer />}
            {!isAdmin && <SupportWidget />}
        </div>
    );
}

function App() {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    return (
        <Router>
            <ScrollToTop />
            <CartProvider>
                <AppContent 
                    isCheckoutOpen={isCheckoutOpen} 
                    setIsCheckoutOpen={setIsCheckoutOpen} 
                />
            </CartProvider>
        </Router>
    );
}

export default App;
