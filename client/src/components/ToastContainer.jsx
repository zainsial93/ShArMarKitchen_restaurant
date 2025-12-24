import React from 'react';
import { useCart } from '../context/CartContext';

const ToastContainer = () => {
    const { toasts } = useCart();

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            left: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 2000
        }}>
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="toast-enter"
                    style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '1rem 1.5rem',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        minWidth: '250px'
                    }}
                >
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                    {toast.message}
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
