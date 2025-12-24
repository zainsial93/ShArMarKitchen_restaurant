import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/currency';

const Cart = () => {
    const { cart, removeFromCart, getTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <h2>Your Cart is Empty</h2>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Browse Products</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h2>Shopping Cart</h2>
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cart.map(item => (
                    <div key={item.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src={item.imageUrl} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                            <div>
                                <h4>{item.name}</h4>
                                <p className="text-muted">{formatCurrency(item.price)} x {item.quantity}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontWeight: 'bold' }}>{formatCurrency(item.price * item.quantity)}</span>
                            <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'white', borderRadius: '0.5rem', boxShadow: 'var(--shadow)', textAlign: 'right' }}>
                <h3>Total: {formatCurrency(getTotal())}</h3>
                <Link to="/checkout" className="btn btn-primary" style={{ marginTop: '1rem' }}>Proceed to Checkout</Link>
            </div>
        </div>
    );
};

export default Cart;
