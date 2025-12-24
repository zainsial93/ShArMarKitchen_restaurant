import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FaChevronUp, FaChevronDown, FaShoppingBag } from 'react-icons/fa';
import { formatCurrency } from '../utils/currency';

const BottomCartBar = () => {
    const { cart, getTotal, openCheckout } = useCart();
    const [expanded, setExpanded] = useState(false);

    if (cart.length === 0) return null;

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 800
        }}>
            {/* Expanded List (Drawer) */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        style={{
                            background: 'white',
                            borderTop: '1px solid #ddd',
                            padding: '1rem',
                            maxHeight: '40vh',
                            overflowY: 'auto',
                            boxShadow: '0 -4px 6px -1px rgba(0,0,0,0.1)'
                        }}
                    >
                        <h4 style={{ marginBottom: '1rem' }}>Your Items</h4>
                        {cart.map(item => (
                            <div key={item.uniqueKey} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
                                <div>
                                    <span style={{ fontWeight: 600 }}>{item.quantity}x</span> {item.name}
                                </div>
                                <span>{formatCurrency(item.price * item.quantity)}</span>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Bar */}
            <div style={{
                background: 'var(--primary)',
                color: 'white',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 -4px 10px rgba(0,0,0,0.2)',
                cursor: 'pointer'
            }} onClick={() => setExpanded(!expanded)}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <FaShoppingBag size={24} />
                        <span style={{
                            position: 'absolute', top: -5, right: -8,
                            background: 'var(--accent)', color: 'white',
                            borderRadius: '50%', width: '20px', height: '20px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.75rem', fontWeight: 'bold'
                        }}>
                            {totalItems}
                        </span>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Total</div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{formatCurrency(getTotal())}</div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {expanded ? <FaChevronDown /> : <FaChevronUp />}

                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Don't expand
                            openCheckout();
                        }}
                        style={{
                            background: 'white',
                            color: 'var(--primary)',
                            border: 'none',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '2rem',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BottomCartBar;
