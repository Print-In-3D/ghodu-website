import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import './CSS/Navbar.css';

const Navbar = ({ setIsCartOpen }) => {
    const { getCartCount, toggleCart } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();

    // Handle scroll effect for premium glass transition
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
    }, [location.pathname, location.hash]);

    // Enhanced Body Scroll Lock for Mobile Menu
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

        if (isMobileMenuOpen) {
            // Prevent background scrolling completely
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarWidth}px`; // Prevent layout shift
            document.documentElement.style.overflow = 'hidden'; // Force lock on html element too
        } else {
            document.body.style.overflow = originalStyle;
            document.body.style.paddingRight = '0px';
            document.documentElement.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
            document.documentElement.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const scrollToTop = () => {
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleHashLink = (e, hash) => {
        if (location.pathname === '/') {
            e.preventDefault();
            const element = document.getElementById(hash.replace('/#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
            }
        }
    };

    // Handle cart open (Support both original prop and new context toggle)
    const handleCartOpen = () => {
        if (setIsCartOpen) {
            setIsCartOpen(true);
        } else if (toggleCart) {
            toggleCart();
        }
    };

    return (
        <nav className={`navbar ${(scrolled || isMobileMenuOpen || location.pathname !== '/') ? 'navbar-scrolled' : ''}`}>
            <div className="nav-inner">
                {/* Mobile Menu Toggle */}
                <button
                    className="nav-icon-btn mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Left Logo */}
                <Link to="/" className="logo" onClick={scrollToTop}>
                    <span className="logo-text">Print-IN 3D</span>
                </Link>

                {/* Right Content */}
                <div className="nav-right">
                    {/* Desktop Navigation */}
                    <div className="nav-links desktop-only">
                        <Link to="/#products" className="nav-link" onClick={(e) => handleHashLink(e, 'products')}>Shop</Link>
                        <Link to="/about" className="nav-link">About</Link>
                        <Link to="/contact" className="nav-link">Contact</Link>
                    </div>

                    <div className="nav-icons" style={{ display: 'flex', gap: '8px' }}>

                        <button className="nav-icon-btn cart-btn" onClick={handleCartOpen} aria-label="View Cart">
                            <ShoppingCart size={20} />
                            {getCartCount() > 0 && (
                                <span className="cart-badge">{getCartCount()}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop Search Dropdown */}
            <div className={`search-dropdown desktop-only ${isSearchOpen ? 'open' : ''}`}>
                <div className="search-container-inner">
                    <form className="search-form" action="/search">

                        <input
                            type="text"
                            name="q"
                            placeholder="Search products, materials..."
                            className="search-input"
                            autoFocus={isSearchOpen}
                        />
                        <button type="button" className="search-close" onClick={() => setIsSearchOpen(false)}>
                            <X size={18} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Premium Fullscreen Mobile Menu */}
            <div
                className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content">
                    <form className="mobile-search-form" action="/search">

                        <input
                            type="text"
                            name="q"
                            placeholder="Search store..."
                            className="search-input"
                        />
                    </form>

                    <div className="mobile-nav-links">
                        <Link to="/" className="mobile-nav-link">Home</Link>
                        <Link to="/#products" className="mobile-nav-link" onClick={(e) => handleHashLink(e, 'products')}>Shop Catalog</Link>
                        <Link to="/about" className="mobile-nav-link">About Us</Link>
                        <Link to="/contact" className="mobile-nav-link">Contact & Support</Link>
                        <Link to="/faq" className="mobile-nav-link">FAQ & Shipping</Link>
                    </div>

                    <div className="mobile-menu-footer">
                        <a href="https://wa.me/917043591952" target="_blank" rel="noreferrer" className="btn-premium btn-primary-p" style={{ width: '100%', justifyContent: 'center' }}>
                            WhatsApp Support
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;