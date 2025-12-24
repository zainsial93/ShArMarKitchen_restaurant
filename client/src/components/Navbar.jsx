import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';
import SialMartLogo from './SialMartLogo';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart, openCheckout } = useCart();
    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav style={{ background: 'var(--primary)', color: 'white', padding: '1rem 0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 900 }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <SialMartLogo />
                </Link>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Link to="/" style={{ fontWeight: 500, fontSize: '0.9rem', opacity: 0.9 }}>Home</Link>
                    {user && <Link to="/my-orders" style={{ fontWeight: 500, fontSize: '0.9rem', opacity: 0.9 }}>My Orders</Link>}
                    <Link to="/contact" style={{ fontWeight: 500, fontSize: '0.9rem', opacity: 0.9 }}>Contact</Link>

                    {/* Cart Button with Checkout Trigger */}
                    <button
                        onClick={openCheckout}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                    >
                        <FaShoppingCart size={18} />
                        <span style={{ fontWeight: 600 }}>Cart</span>
                        {cartItemCount > 0 && (
                            <span style={{
                                background: 'var(--accent)',
                                color: 'white',
                                borderRadius: '50%',
                                minWidth: '20px',
                                height: '20px',
                                fontSize: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0 4px'
                            }}>
                                {cartItemCount}
                            </span>
                        )}
                    </button>

                    {user && (
                        <button
                            onClick={logout}
                            style={{
                                background: 'rgba(255, 0, 0, 0.2)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                padding: '0.5rem 1rem',
                                borderRadius: '2rem',
                                color: 'white',
                                cursor: 'pointer',
                                fontWeight: 500
                            }}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
