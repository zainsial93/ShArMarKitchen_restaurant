import React, { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/currency';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                // Hardcoded API Base because of env issues
                const API_BASE = 'https://sharmarkitchenrestaurant-production.up.railway.app';
                const res = await fetch(`${API_BASE}/api/orders/${user.id}`);
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading orders...</div>;

    if (orders.length === 0) {
        return (
            <div className="container" style={{ padding: '2rem', textAlign: 'center', minHeight: '60vh' }}>
                <h2>My Orders</h2>
                <p style={{ marginTop: '1rem', color: '#666' }}>You haven't placed any orders yet.</p>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem', minHeight: '80vh' }}>
            <h2 style={{ marginBottom: '2rem', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem' }}>My Orders</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {orders.map(order => (
                    <div key={order.id} className="card" style={{ padding: '1.5rem', borderLeft: '5px solid var(--accent)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                            <div>
                                <h4 style={{ margin: 0 }}>Order #{order.id}</h4>
                                <span style={{ fontSize: '0.9rem', color: '#888' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                                    {formatCurrency(order.totalAmount)}
                                </div>
                                <span style={{
                                    background: order.status === 'completed' ? '#dcfce7' : '#fef9c3',
                                    color: order.status === 'completed' ? '#166534' : '#854d0e',
                                    padding: '2px 8px', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 500
                                }}>
                                    {order.status.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <h5 style={{ marginBottom: '0.5rem' }}>Items:</h5>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                {order.OrderItems && order.OrderItems.map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', background: '#f9f9f9', padding: '0.5rem', borderRadius: '4px' }}>
                                        <span>
                                            <span style={{ fontWeight: 'bold' }}>{item.quantity}x</span> Product ID: {item.productId}
                                            {item.variantLabel && <span style={{ color: '#666', fontSize: '0.85rem' }}> ({item.variantLabel})</span>}
                                        </span>
                                        <span>{formatCurrency(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
