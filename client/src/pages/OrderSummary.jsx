import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { formatCurrency } from '../utils/currency';

const OrderSummary = () => {
    const location = useLocation();
    const order = location.state;

    if (!order) return <div className="container">No order details found.</div>;

    return (
        <div className="container" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ color: 'var(--secondary)' }}>Order Placed Successfully!</h2>
                <p>Order ID: #{order.orderId}</p>
                <div style={{ textAlign: 'left', marginTop: '2rem' }}>
                    <h4>Shipping To:</h4>
                    <p>{order.customerName}</p>
                    <p>{order.customerAddress}</p>
                </div>
                <div style={{ textAlign: 'left', marginTop: '2rem' }}>
                    <h4>Items:</h4>
                    <ul>
                        {order.items.map((item, idx) => (
                            <li key={idx}>{item.name} - Qty: {item.quantity} - {formatCurrency(item.price)}</li>
                        ))}
                    </ul>
                    <h3 style={{ marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
                        Total: {formatCurrency(order.totalAmount)}
                    </h3>
                    <p style={{ textAlign: 'right', color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        Payment Method: Cash on Delivery (COD)
                    </p>
                </div>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>Continue Shopping</Link>
            </div>
        </div>
    );
};

export default OrderSummary;
