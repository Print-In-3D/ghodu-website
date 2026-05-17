import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        // Include customizationText in the unique key so same product with different text = separate item
        const itemKey = product.customizationText
            ? `${product.id}__${product.customizationText.trim().toLowerCase()}`
            : product.id;

        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.cartKey === itemKey);
            if (existingItem) {
                return prevItems.map(item =>
                    item.cartKey === itemKey ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, cartKey: itemKey, quantity: 1 }];
        });

        setNotification({ title: product.title || product.name, image: product.image });
        setTimeout(() => setNotification(null), 4000);
    };

    const removeFromCart = (cartKey) => {
        setCartItems(prevItems => prevItems.filter(item => item.cartKey !== cartKey));
    };

    const updateQuantity = (cartKey, delta) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.cartKey === cartKey) {
                    const newQty = item.quantity + delta;
                    return newQty > 0 ? { ...item, quantity: newQty } : item;
                }
                return item;
            })
        );
    };

    const clearCart = () => setCartItems([]);

    const toggleCart = () => setIsCartOpen(prev => !prev);

    const getCartCount = () => cartItems.reduce((count, item) => count + item.quantity, 0);
    const getCartTotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart: cartItems, // Keeping 'cart' name if it was used
            cartItems, 
            addToCart, 
            removeFromCart, 
            updateQuantity,
            clearCart, 
            isCartOpen, 
            setIsCartOpen, // Keeping original state setter if used
            toggleCart, 
            cartTotal: getCartTotal(), 
            cartCount: getCartCount(),
            getCartCount,
            getCartTotal,
            notification, 
            setNotification
        }}>
            {children}
        </CartContext.Provider>
    );
};
