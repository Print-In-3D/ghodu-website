import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, X, Trash2, Plus, Minus, ShieldCheck, ArrowRight } from 'lucide-react';
import './CSS/Cart.css';

const Cart = ({ setIsCheckoutOpen }) => {
    const { 
        cartItems, 
        isCartOpen, 
        setIsCartOpen, 
        removeFromCart, 
        updateQuantity, 
        getCartTotal 
    } = useCart();

    const handleCheckoutClick = () => {
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
    };

    return (
        <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}>
            <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
                <header className="cart-header-premium">
                    <div className="cart-header-left">
                        <ShoppingCart size={20} />
                        <h2>Your Collection</h2>
                        <span className="cart-count-badge">{cartItems.length}</span>
                    </div>
                    <button className="cart-close-btn" onClick={() => setIsCartOpen(false)}>
                        <X size={24} />
                    </button>
                </header>

                <div className="cart-items-container">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item.cartKey} className="cart-item-premium">
                                <div className="cart-item-img-wrap">
                                    {item.image ? (
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/100x100?text=3D';
                                            }}
                                        />
                                    ) : (
                                        <div className="cart-item-placeholder">🎁</div>
                                    )}
                                </div>
                                <div className="cart-item-details">
                                    <h4 className="cart-item-title">{item.title}</h4>
                                    {item.customizationText && (
                                        <p className="cart-item-custom">"{item.customizationText}"</p>
                                    )}
                                    <div className="cart-item-footer">
                                        <div className="cart-quantity-stepper">
                                            <button onClick={() => updateQuantity(item.cartKey, -1)}>
                                                <Minus size={14} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.cartKey, 1)}>
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <div className="cart-item-price">
                                            ₹{item.price * item.quantity}
                                        </div>
                                    </div>
                                </div>
                                <button className="cart-item-remove" onClick={() => removeFromCart(item.cartKey)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="empty-cart-premium">
                            <div className="empty-cart-icon-wrap">
                                <ShoppingCart size={48} strokeWidth={1} />
                            </div>
                            <h3>Your collection is empty</h3>
                            <p>Discover our precision-engineered 3D creations and start building your custom collection.</p>
                            <button className="btn-continue-shop" onClick={() => setIsCartOpen(false)}>
                                Explore Catalog
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <footer className="cart-footer-premium">
                        <div className="cart-trust-bar">
                            <ShieldCheck size={14} />
                            <span>Verified WhatsApp Checkout</span>
                        </div>
                        <div className="cart-total-row">
                            <span className="total-label">Subtotal</span>
                            <span className="total-val">₹{getCartTotal()}</span>
                        </div>
                        <p className="shipping-hint">Shipping calculated at checkout</p>
                        <button className="btn-cart-checkout" onClick={handleCheckoutClick}>
                            Proceed to Checkout
                            <ArrowRight size={20} />
                        </button>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default Cart;
