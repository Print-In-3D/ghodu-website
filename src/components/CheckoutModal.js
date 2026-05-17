import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, MessageSquare, MapPin, User, ShieldCheck } from 'lucide-react';
import './CSS/CheckoutModal.css';

const CheckoutModal = ({ isOpen, onClose }) => {
    const { cart, getCartTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        pincode: ''
    });

    const modalRef = React.useRef(null);
    const formRef = React.useRef(null);

    // Lock body scroll when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.classList.add('body-checkout-open');
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.classList.remove('body-checkout-open');
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }
        return () => {
            document.body.classList.remove('body-checkout-open');
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle input focus to scroll into view (Mobile Keyboard Fix)
    const handleInputFocus = (e) => {
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleWhatsAppCheckout = (e) => {
        e.preventDefault();
        
        const phoneNumber = "917043591952"; 
        
        const orderItemsText = cart.map((item, idx) => {
            let line = `${idx + 1}. ${item.title} × ${item.quantity} = ₹${item.price * item.quantity}`;
            if (item.customizationText && item.customizationText.trim()) {
                line += `\n   ✨ Customization: "${item.customizationText.trim()}"`;
            }
            return line;
        }).join('\n\n');

        const message = 
            `🛒 New Order — Print-IN 3D Creations\n\n` +
            `👤 Customer Details\n` +
            `Name: ${formData.name}\n` +
            `Phone: ${formData.phone}\n\n` +
            `📍 Delivery Address\n` +
            `${formData.address}\n` +
            `${formData.city} — ${formData.pincode}\n\n` +
            `📦 Order Items\n\n` +
            `${orderItemsText}\n\n` +
            `━━━━━━━━━━━━━━━\n` +
            `Total: ₹${getCartTotal()}\n\n` +
            `Please confirm my order. Thank you! 💙`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        clearCart();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="checkout-overlay" onClick={onClose}>
            <div className="checkout-modal-premium" onClick={(e) => e.stopPropagation()} ref={modalRef}>
                <header className="checkout-header-premium">
                    <div className="checkout-header-title">
                        <ShieldCheck size={24} className="checkout-trust-icon" />
                        <div>
                            <h2>Checkout</h2>
                            <p>Complete your order via WhatsApp</p>
                        </div>
                    </div>
                    <button className="checkout-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </header>

                <form className="checkout-form-premium" onSubmit={handleWhatsAppCheckout} ref={formRef}>
                    <div className="checkout-sections-scroll">
                        <div className="checkout-sections">
                            {/* Personal Info */}
                            <div className="checkout-section">
                                <h3 className="checkout-section-title">
                                    <User size={18} />
                                    Personal Information
                                </h3>
                                <div className="checkout-input-row">
                                    <div className="checkout-input-group">
                                        <label>Full Name</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={handleInputFocus}
                                            required 
                                        />
                                    </div>
                                    <div className="checkout-input-group">
                                        <label>Phone Number</label>
                                        <input 
                                            type="tel" 
                                            name="phone" 
                                            placeholder="Mobile number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            onFocus={handleInputFocus}
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Info */}
                            <div className="checkout-section">
                                <h3 className="checkout-section-title">
                                    <MapPin size={18} />
                                    Shipping Address
                                </h3>
                                <div className="checkout-input-group">
                                    <label>House No. / Building / Street</label>
                                    <textarea 
                                        name="address" 
                                        placeholder="Complete address details"
                                        value={formData.address}
                                        onChange={handleChange}
                                        onFocus={handleInputFocus}
                                        required 
                                    />
                                </div>
                                <div className="checkout-input-row">
                                    <div className="checkout-input-group">
                                        <label>City / Town</label>
                                        <input 
                                            type="text" 
                                            name="city" 
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={handleChange}
                                            onFocus={handleInputFocus}
                                            required 
                                        />
                                    </div>
                                    <div className="checkout-input-group">
                                        <label>Pincode</label>
                                        <input 
                                            type="text" 
                                            name="pincode" 
                                            placeholder="6-digit PIN"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            onFocus={handleInputFocus}
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="checkout-footer-premium">
                        <div className="checkout-summary-mini">
                            <span className="mini-total-label">Total Amount</span>
                            <span className="mini-total-val">₹{getCartTotal()}</span>
                        </div>
                        <button type="submit" className="btn-whatsapp-checkout">
                            <MessageSquare size={20} />
                            Place Order via WhatsApp
                        </button>
                        <p className="checkout-privacy-hint">
                            Your data is used only for processing this order.
                        </p>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default CheckoutModal;
