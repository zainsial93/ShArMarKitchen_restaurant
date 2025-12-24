import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [toasts, setToasts] = useState([]);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [hasOrdered, setHasOrdered] = useState(false);

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error("Failed to load cart from local storage", error);
            localStorage.removeItem('cart');
        }

        try {
            const sessionOrdered = sessionStorage.getItem('hasOrdered');
            if (sessionOrdered) setHasOrdered(true);
        } catch (e) {
            // Ignore session storage errors
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error("Failed to save cart", error);
        }
    }, [cart]);

    const addToast = (message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    const addToCart = (product, variant = null) => {
        setCart((prev) => {
            const variantKey = variant ? `${product.id}-${variant.label}` : `${product.id}`;
            const existing = prev.find((item) => item.uniqueKey === variantKey);

            if (existing) {
                return prev.map((item) =>
                    item.uniqueKey === variantKey ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...prev, {
                ...product,
                id: product.id,
                uniqueKey: variantKey,
                quantity: 1,
                price: variant ? variant.price : product.price,
                name: variant ? `${product.name} (${variant.label})` : product.name,
                variantLabel: variant ? variant.label : null
            }];
        });
        addToast('Item added to cart');
    };

    const removeFromCart = (uniqueKey, decreaseOne = false) => {
        setCart((prev) => {
            if (decreaseOne) {
                return prev.map(item => {
                    if (item.uniqueKey === uniqueKey) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                }).filter(item => item.quantity > 0);
            }
            return prev.filter((item) => item.uniqueKey !== uniqueKey);
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const markOrderAsPlaced = () => {
        setHasOrdered(true);
        sessionStorage.setItem('hasOrdered', 'true');
    };

    const getTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const openCheckout = () => setIsCheckoutOpen(true);
    const closeCheckout = () => setIsCheckoutOpen(false);

    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart, clearCart, getTotal,
            toasts, addToast,
            isCheckoutOpen, openCheckout, closeCheckout,
            hasOrdered, markOrderAsPlaced
        }}>
            {children}
        </CartContext.Provider>
    );
};
